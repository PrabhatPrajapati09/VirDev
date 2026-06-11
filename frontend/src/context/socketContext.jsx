// import { createContext, useContext, useEffect, useState } from "react";
// import { io } from "socket.io-client";
// import { AppContext } from "./appContext";

// export const SocketContext = createContext();

// export const SocketProvider = ({ children }) => {
//   const { backendUrl, isLoggedin } = useContext(AppContext);
//   // FIX: Use state instead of ref so the app re-renders when socket is ready
//   const [socket, setSocket] = useState(null);

//   useEffect(() => {
//     // Only connect if the user is logged in
//     if (!isLoggedin) {
//       if (socket) {
//         socket.disconnect();
//         setSocket(null);
//       }
//       return;
//     }

//     // Initialize socket connection
//     const newSocket = io(backendUrl, {
//       withCredentials: true,
//       transports: ["websocket"],
//     });

//     newSocket.on("connect", () => {
//       console.log("🔥 Socket Connected:", newSocket.id);
//     });

//     newSocket.on("connect_error", (err) => {
//       console.error("❌ Socket Connection Error:", err.message);
//     });

//     newSocket.on("disconnect", () => {
//       console.log("🔌 Socket Disconnected");
//     });

//     setSocket(newSocket);

//     // Cleanup on unmount or logout
//     return () => {
//       newSocket.disconnect();
//       setSocket(null);
//     };
//   }, [isLoggedin, backendUrl]);

//   return (
//     // Provide the socket state to the rest of the app
//     <SocketContext.Provider value={{ socket }}>
//       {children}
//     </SocketContext.Provider>
//   );
// };

import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { AppContext } from "./appContext";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const { backendUrl, isLoggedin } = useContext(AppContext);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // 1. Only connect if the user is logged in
    if (!isLoggedin) {
      if (socket) {
        socket.disconnect();
        setSocket(null);
      }
      return;
    }

    // 2. Merge connection options from both snippets
    const options = {
      forceNew: true, // Modern equivalent of "force new connection"
      reconnectionAttempts: Infinity, // Use actual Infinity rather than a string
      timeout: 10000,
      transports: ["websocket"],
      withCredentials: true, // Important for CORS/sessions if your backend requires it
    };

    // 3. Initialize socket connection dynamically using backendUrl
    const newSocket = io(backendUrl, options);

    // 4. Setup event listeners
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

    // 5. Cleanup on unmount or when dependencies change
    return () => {
      newSocket.disconnect();
      // Note: We don't need to call setSocket(null) here because the component 
      // is either unmounting, or the effect will immediately re-run and set a new socket.
    };
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedin, backendUrl]); 

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};