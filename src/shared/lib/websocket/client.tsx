"use client";

import React, { useEffect } from "react";

const WebSocketClient: React.FC = () => {
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:5000");

    ws.onopen = () => {
      console.log("Connected to WebSocket server");
      ws.send("Hello, dima!");
    };

    ws.onmessage = (event) => {
      console.log("Message from server:", event.data);
    };

    ws.onclose = () => {
      console.log("Disconnected from WebSocket server");
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    // Cleanup on unmount
    return () => ws.close();
  }, []);

  return <div>WebSocket Client is running! Check the console for messages.</div>;
};

export default WebSocketClient;
