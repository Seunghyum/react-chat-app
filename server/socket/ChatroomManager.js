import Chatroom from "./Chatroom";
import chatroomTemplates from "../data/chatrooms";
import customIo from "../index";

module.exports = function() {
  // mapping of all available chatrooms
  const chatrooms = new Map(chatroomTemplates.map(c => [c.name, Chatroom(c)]));

  function removeClient(client) {
    chatrooms.forEach(c => c.removeUser(client));
    emitChatroomsStatusToAllSockets();
  }

  function getChatroomByName(chatroomName) {
    return chatrooms.get(chatroomName);
  }

  function serializeChatrooms() {
    return Array.from(chatrooms.values()).map(c => c.serialize());
  }

  function emitChatroomsStatusToAllSockets() {
    customIo.sockets.emit("chatrooms", serializeChatrooms());
  }

  return {
    removeClient,
    getChatroomByName,
    serializeChatrooms,
    emitChatroomsStatusToAllSockets
  };
};
