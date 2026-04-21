import List "mo:core/List";
import Text "mo:core/Text";
import Types "../types/chat";
import CommonTypes "../types/common";

module {
  public type Message = Types.Message;
  public type ChatResult = Types.ChatResult;

  /// Escape a text value for safe embedding in JSON strings.
  func escapeJson(text : Text) : Text {
    var result = "";
    for (c in text.toIter()) {
      if (c == '\"') {
        result := result # "\\\"";
      } else if (c == '\\') {
        result := result # "\\\\";
      } else if (c == '\n') {
        result := result # "\\n";
      } else if (c == '\r') {
        result := result # "\\r";
      } else if (c == '\t') {
        result := result # "\\t";
      } else {
        result := result # Text.fromChar(c);
      };
    };
    result;
  };

  /// Return the JSON string for a MessageRole.
  func roleText(role : CommonTypes.MessageRole) : Text {
    switch (role) {
      case (#user) "user";
      case (#assistant) "assistant";
    };
  };

  /// Build the JSON payload for the AI API from the conversation history plus the new user message.
  public func buildRequestBody(history : List.List<Message>, userMessage : Text) : Text {
    var messagesJson = "";
    var first = true;

    history.forEach(func(msg : Message) {
      if (not first) { messagesJson := messagesJson # "," };
      messagesJson := messagesJson # "{\"role\":\"" # roleText(msg.role) # "\",\"content\":\"" # escapeJson(msg.content) # "\"}";
      first := false;
    });

    // Append the new user message
    if (not first) { messagesJson := messagesJson # "," };
    messagesJson := messagesJson # "{\"role\":\"user\",\"content\":\"" # escapeJson(userMessage) # "\"}";

    // llama3-8b-8192 is Groq's free-tier model (no credit card required)
    "{\"model\":\"llama3-8b-8192\",\"messages\":[" # messagesJson # "]}";
  };

  /// Parse a raw JSON response from the AI API and extract the assistant's reply text.
  /// Looks for the pattern: "content":"<reply>" in the response body.
  public func parseResponseText(rawJson : Text) : Text {
    let contentKey = "\"content\":\"";
    // Find the first occurrence of "content":"
    let parts = rawJson.split(#text contentKey);
    let iter = parts;
    // Skip the first part (before "content":"), then take what's between quotes
    switch (iter.next()) {
      case null { return "Sorry, I could not parse the response." };
      case (?_) {};
    };
    switch (iter.next()) {
      case null { return "Sorry, I could not parse the response." };
      case (?after) {
        // Extract up to the next unescaped quote
        var result = "";
        var prevBackslash = false;
        for (c in after.toIter()) {
          if (prevBackslash) {
            if (c == '\"') {
              result := result # "\"";
            } else if (c == 'n') {
              result := result # "\n";
            } else if (c == 't') {
              result := result # "\t";
            } else if (c == '\\') {
              result := result # "\\";
            } else {
              result := result # "\\" # Text.fromChar(c);
            };
            prevBackslash := false;
          } else if (c == '\\') {
            prevBackslash := true;
          } else if (c == '\"') {
            return result;
          } else {
            result := result # Text.fromChar(c);
          };
        };
        result;
      };
    };
  };

  /// Construct a new Message record.
  public func makeMessage(role : CommonTypes.MessageRole, content : Text, timestamp : CommonTypes.Timestamp) : Message {
    { role; content; timestamp };
  };
};
