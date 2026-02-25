import { useEffect, useRef } from "react";
import { io } from "socket.io-client";

let socket;

export function useSocket(backendUrl) {
  const socketRef = useRef();

  useEffect(() => {
    if (!socket) {
      socket = io(backendUrl, {
        withCredentials: true,
      });
    }
    socketRef.current = socket;

    socket.on("connect_error", (err) => {
      console.error("socket connect error", err);
    });

    return () => {
      // socket.disconnect();
    };
  }, [backendUrl]);

  return socketRef;
}
