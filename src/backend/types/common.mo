module {
  /// Timestamp in nanoseconds
  public type Timestamp = Int;

  /// Role of a message in a conversation
  public type MessageRole = { #user; #assistant };

  /// A single chat message
  public type Message = {
    role : MessageRole;
    content : Text;
    timestamp : Timestamp;
  };

  /// Result of a chat call
  public type ChatResult = { #ok : Text; #err : Text };
};
