const ClientManager = require("./socket/ClientManager");
const ChatroomManager = require("./socket/ChatroomManager");
const makeHandlers = require("./socket/handlers");

const clientManager = ClientManager();
const chatroomManager = ChatroomManager();

export const init = io => {
  io.on("connection", client => {
    const {
      handleRegister,
      handleMessage,
      handleGetChatrooms,
      handleGetAvailableUsers,
      handleDisconnect,
      handleSignUp,
      handleTyping
    } = makeHandlers(client, clientManager, chatroomManager);

    console.log("client connected...", client.id);
    clientManager.addClient(client);

    client.on("register", handleRegister);

    client.on("signUp", handleSignUp);

    client.on("message", handleMessage);

    client.on("typing", handleTyping);

    client.on("chatrooms", handleGetChatrooms);

    client.on("availableUsers", handleGetAvailableUsers);

    client.on("disconnect", function() {
      console.log("client disconnect...", client.id);
      handleDisconnect(client);
    });

    client.on("error", function(err) {
      console.log("received error from client:", client.id);
      console.log(err);
    });
  });
  return io;
};
