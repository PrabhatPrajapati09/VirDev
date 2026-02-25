import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { AppContext } from "./appContext";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const { backendUrl, isLoggedin } = useContext(AppContext);
  // FIX: Use state instead of ref so the app re-renders when socket is ready
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Only connect if the user is logged in
    if (!isLoggedin) {
      if (socket) {
        socket.disconnect();
        setSocket(null);
      }
      return;
    }

    // Initialize socket connection
    const newSocket = io(backendUrl, {
      withCredentials: true,
      transports: ["websocket"],
    });

    newSocket.on("connect", () => {
      console.log("🔥 Socket Connected:", newSocket.id);
    });

    newSocket.on("connect_error", (err) => {
      console.error("❌ Socket Connection Error:", err.message);
    });

    newSocket.on("disconnect", () => {
      console.log("🔌 Socket Disconnected");
    });

    setSocket(newSocket);

    // Cleanup on unmount or logout
    return () => {
      newSocket.disconnect();
      setSocket(null);
    };
  }, [isLoggedin, backendUrl]);

  return (
    // Provide the socket state to the rest of the app
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};