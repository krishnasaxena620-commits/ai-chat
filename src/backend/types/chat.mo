import CommonTypes "common";

module {
  public type Message = CommonTypes.Message;
  public type MessageRole = CommonTypes.MessageRole;
  public type ChatResult = CommonTypes.ChatResult;

  /// Session state holding conversation history
  public type Session = {
    history : [Message];
  };
};
