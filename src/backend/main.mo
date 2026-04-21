import List "mo:core/List";
import Types "types/chat";
import ChatMixin "mixins/chat-api";

actor {
  let history = List.empty<Types.Message>();

  include ChatMixin(history);
};
