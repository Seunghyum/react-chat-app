function makeHandleEvent(client, clientManager, chatroomManager) {
  function ensureExists(getter, rejectionMessage) {
    return new Promise(function(resolve, reject) {
      const res = getter();
      return res ? resolve(res) : reject(rejectionMessage);
    });
  }

  function ensureUserSelected(clientId) {
    return ensureExists(
      () => clientManager.getUserByClientId(clientId),
      "select user first"
    );
  }

  function ensureValidChatroom(chatroomName) {
    return ensureExists(
      () => chatroomManager.getChatroomByName(chatroomName),
      `invalid chatroom name: ${chatroomName}`
    );
  }

  function ensureValidChatroomAndUserSelected(chatroomName) {
    return Promise.all([
      ensureValidChatroom(chatroomName),
      ensureUserSelected(client.id)
    ]).then(([chatroom, user]) => Promise.resolve({ chatroom, user }));
  }

  function handleMessageEvent(chatroomName, createEntry) {
    return ensureValidChatroomAndUserSelected(chatroomName).then(function({
      chatroom,
      user
    }) {
      // append event to chat history
      const entry = { user, ...createEntry() };
      chatroom.addEntry(entry);

      // notify other clients in chatroom
      chatroom.broadcastMessage({
        chat: chatroomName,
        ...entry
      });
      return chatroom;
    });
  }

  return handleMessageEvent;
}

module.exports = function(client, clientManager, chatroomManager) {
  const handleMessageEvent = makeHandleEvent(
    client,
    clientManager,
    chatroomManager
  );

  function handleRegister(userName, callback) {
    if (!clientManager.isUserAvailable(userName))
      return callback({ result: false, message: "user is not available" });

    const user = clientManager.getUserByName(userName);
    clientManager.registerClient(client, user);

    return callback(null, user);
  }

  function handleSignUp(userName, callback) {
    const user = clientManager.setUserByName(userName);
    clientManager.registerClient(client, user);

    return callback(null, user);
  }

  function handleMessage(
    { chatroomName, message, type, userName } = {},
    callback
  ) {
    if (type === "message") {
      const createEntry = () => ({ message, createdAt: new Date() });
      handleMessageEvent(chatroomName, createEntry)
        .then(() => callback(null))
        .catch(callback);
    } else if (type === "join") {
      const createEntry = () => ({
        event: `joined ${chatroomName}`,
        createdAt: new Date()
      });

      handleMessageEvent(chatroomName, createEntry)
        .then(function(chatroom) {
          // add member to chatroom
          const user = clientManager.getUserByName(userName);
          chatroom.addUser(client, user);
          // send chat history to client
          callback(null, chatroom.getChatHistory());
          // send chatroom status to client
          chatroomManager.emitChatroomsStatusToAllSockets();
        })
        .catch(callback);
    } else if (type === "leave") {
      const createEntry = () => ({
        event: `left ${chatroomName}`,
        createdAt: new Date()
      });

      handleMessageEvent(chatroomName, createEntry)
        .then(function(chatroom) {
          // remove member from chatroom
          chatroom.removeUser(client);

          callback(null);
        })
        .catch(callback);
    }
  }

  function handleTyping({ chatroomName, userName, typing } = {}, callback) {
    const chatroom = chatroomManager.getChatroomByName(chatroomName);
    if (typing) chatroom.addUserToTyping(userName);
    else chatroom.removeUserFromTyping(userName);
    const newTypings = chatroom.getWhoAreTyping();
    chatroom.broadcastWhoAreTyping(userName);
    return callback(null, newTypings);
  }

  function handleGetChatrooms(_, callback) {
    callback(null, chatroomManager.serializeChatrooms());
    clientManager.emitAvailableUsersToAllSockets();
  }

  function handleGetAvailableUsers(_, callback) {
    return callback(null, clientManager.getAvailableUsers());
  }

  function handleDisconnect(previousClient) {
    // remove user profile
    clientManager.removeClient(previousClient);
    // remove member from all chatrooms
    chatroomManager.removeClient(previousClient);
  }

  return {
    handleRegister,
    handleMessage,
    handleTyping,
    handleGetChatrooms,
    handleGetAvailableUsers,
    handleDisconnect,
    handleSignUp
  };
};
