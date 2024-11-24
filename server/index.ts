import next from "next";
import { createWebSocketServer } from "@/shared/lib/websocket/server"; 
import http from "http";

const PORT = process.env.PORT || 3000;

const app = next({ dev: process.env.NODE_ENV !== "production" });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  
  createWebSocketServer();


  const server = http.createServer((req, res) => {
    handle(req, res);
  });


  server.listen(PORT, () => {
    console.log(`Next.js app is running on http://localhost:${PORT}`);
  });
});
