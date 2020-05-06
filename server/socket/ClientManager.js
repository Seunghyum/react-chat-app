import userTemplates from "../data/users";
import customIo from "../index";
import ChatroomManager from "./ChatroomManager";

module.exports = function() {
  // mapping of all connected clients
  const clients = new Map();

  function addClient(client) {
    clients.set(client.id, { client });
  }

  function registerClient(client, user) {
    clients.set(client.id, { client, user });
    emitAvailableUsersToAllSockets();
  }

  function removeClient(client) {
    clients.delete(client.id);
    emitAvailableUsersToAllSockets();
  }

  function getAvailableUsers() {
    const usersTaken = new Set(
      Array.from(clients.values())
        .filter(c => c.user)
        .map(c => c.user.name)
    );
    return userTemplates.filter(u => !usersTaken.has(u.name));
  }

  function emitAvailableUsersToAllSockets() {
    customIo.sockets.emit("availableUsers", getAvailableUsers());
  }

  function isUserAvailable(userName) {
    return getAvailableUsers().some(u => u.name === userName);
  }

  function getUserByName(userName) {
    return userTemplates.find(u => u.name === userName);
  }

  function setUserByName(userName) {
    const user = {
      id: String(userTemplates.length + 1),
      name: userName,
      lastName: "신규 계정",
      statusText: "신규 계정",
      photo:
        "https://www.pngkey.com/png/detail/230-2301779_best-classified-apps-default-user-profile.png"
    };
    userTemplates.push(user);
    return user;
  }

  function getUserByClientId(clientId) {
    return (clients.get(clientId) || {}).user;
  }

  return {
    addClient,
    registerClient,
    removeClient,
    getAvailableUsers,
    emitAvailableUsersToAllSockets,
    isUserAvailable,
    getUserByName,
    setUserByName,
    getUserByClientId
  };
};
