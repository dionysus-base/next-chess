import { server as WebSocketServer, connection, request as WebSocketRequest } from "websocket";
import http from "http";

const PORT = process.env.WEBSOCKET_PORT || 5000;

export const createWebSocketServer = () => {
  const server = http.createServer();

  server.listen(PORT, () => {
    console.log(`WebSocket server is running on ws://localhost:${PORT}`);
  });

  const wsServer = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: false,
  });

  wsServer.on("request", (req: WebSocketRequest) => {
    const conn: connection = req.accept();

    console.log("New WebSocket connection established");

    conn.on("message", (message) => {
      if (message.type === "utf8") {
        console.log(`Received: ${message.utf8Data}`);
        conn.sendUTF(`You said: ${message.utf8Data}`);
      }
    });

    conn.on("close", () => {
      console.log("Client disconnected");
    });
  });
};
