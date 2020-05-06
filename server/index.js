import http from "http";
import config from "./config";
import * as socket from "./socket";
import socketIo from "socket.io";

const { socketPort, socketUrl } = config;

const httpServer = http.createServer(httpServer);
const io = socketIo(httpServer); // socket.io와 서버 연결하는 부분

httpServer.listen(socketPort, socketUrl, () => {
  console.info(`Socket server started on ${socketUrl}:${socketPort}`);
});

const customIo = socket.init(io);

export default customIo;
