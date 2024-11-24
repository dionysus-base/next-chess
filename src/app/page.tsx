import WebSocketClient from "@/shared/lib/websocket/client";


export default  async function Home() {
  
  return (
   <div>
     <h1>Next.js WebSocket Example</h1>
     <WebSocketClient />
   </div>
  );
}
