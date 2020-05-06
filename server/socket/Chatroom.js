module.exports = function({ name, image, id, photo }) {
  const members = new Map();
  let chatHistory = [];
  let typings = [];

  function broadcastMessage(message) {
    members.forEach(m => {
      m.emit("message", message);
    });
  }

  function addEntry(entry) {
    chatHistory = chatHistory.concat(entry);
  }

  function addUserToTyping(userName) {
    if (typings.some(u => u === userName)) return typings;
    typings.push(userName);
  }

  function removeUserFromTyping(userName) {
    const userIndex = typings.findIndex(u => u === userName);
    if (userIndex > -1) typings.splice(userIndex, 1);
  }

  function getWhoAreTyping() {
    return typings;
  }

  function broadcastWhoAreTyping(userName) {
    members.forEach(m => {
      if (m.user.name == userName) return;
      m.emit("typing", typings);
    });
  }

  function getChatHistory() {
    return chatHistory.slice();
  }

  function addUser(client, user) {
    client.user = user;
    members.set(client.id, client);
  }

  function removeUser(client) {
    members.delete(client.id);
  }

  function serialize() {
    let users = [];
    members.forEach(m => {
      users.push(m.user);
    });
    return {
      name,
      image,
      id,
      photo,
      numMembers: members.size,
      users
    };
  }

  return {
    broadcastMessage,
    addEntry,
    addUserToTyping,
    removeUserFromTyping,
    getWhoAreTyping,
    broadcastWhoAreTyping,
    getChatHistory,
    addUser,
    removeUser,
    serialize
  };
};
