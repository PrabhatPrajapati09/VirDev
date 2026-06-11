import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/appContext";
import { SocketContext } from "../context/socketContext";
import axios from "axios";
import Sidebar from "../components/chat/Sidebar";
import ChatWindow from "../components/chat/ChatWindow";

export default function Chat() {
  const { backendUrl } = useContext(AppContext);
  const { socket } = useContext(SocketContext);

  const [connections, setConnections] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [replyTo, setReplyTo] = useState(null);

  // NEW: State to manage mobile navigation
  const [isMobileChatOpen, setIsMobileChatOpen] = useState(false);

  const bumpToTop = (partnerId) => {
    setConnections((prev) => {
      const updatedList = [...prev];
      const index = updatedList.findIndex((c) => c._id === partnerId);
      if (index !== -1) {
        const [movedUser] = updatedList.splice(index, 1);
        return [movedUser, ...updatedList];
      }
      return updatedList;
    });
  };

  const loadConnections = async () => {
    const { data } = await axios.get(`${backendUrl}/api/connections/acceptedlist`, {
      withCredentials: true,
    });
    if (data.success) setConnections(data.connections);
  };

  const loadMessages = async (user) => {
    const { data } = await axios.get(
      `${backendUrl}/api/messages/conversation/${user._id}`,
      { withCredentials: true }
    );

    if (data.success) {
      setActiveChat(user);
      setMessages(data.messages);
      setTyping(false);
      setReplyTo(null);
      // NEW: Open chat window on mobile when a user is selected
      setIsMobileChatOpen(true);
    }
  };

  useEffect(() => {
    if (!socket) return;

    socket.on("getOnlineUsers", (userIds) => {
      setOnlineUsers(userIds);
    });

    socket.on("private-message", ({ message }) => {
      const partnerId = message.sender === activeChat?._id ? message.sender : message.receiver;
      bumpToTop(partnerId);

      if (activeChat && (message.sender === activeChat._id || message.receiver === activeChat._id)) {
        setMessages((prev) => {
          const filtered = prev.filter(
            (m) => !(m.temp && m.text === message.text)
          );
          return [...filtered, message];
        });
      }
    });

    socket.on("typing", ({ from, typing }) => {
      if (activeChat?._id === from) {
        setTyping(typing);
      }
    });

    return () => {
      socket.off("getOnlineUsers");
      socket.off("private-message");
      socket.off("typing");
    };
  }, [socket, activeChat]);

  const handleTyping = (e) => {
    setInput(e.target.value);
    if (!activeChat) return;

    socket.emit("typing", { toUserId: activeChat._id, typing: true });

    clearTimeout(window.typingTimeout);
    window.typingTimeout = setTimeout(() => {
      socket.emit("typing", { toUserId: activeChat._id, typing: false });
    }, 1500);
  };

  const sendMessage = () => {
    if (!input.trim() || !activeChat) return;

    const tempMsg = {
      _id: crypto.randomUUID(),
      sender: "me",
      text: input,
      createdAt: new Date().toISOString(),
      temp: true,
      replyTo: replyTo,
    };

    setMessages((prev) => [...prev, tempMsg]);
    bumpToTop(activeChat._id);

    socket.emit("private-message", {
      toUserId: activeChat._id,
      text: input,
      replyToId: replyTo?._id,
    });

    setInput("");
    setReplyTo(null);
    socket.emit("typing", { toUserId: activeChat._id, typing: false });
  };

  useEffect(() => {
    loadConnections();
  }, []);

  return (
    <div className="h-screen w-screen flex bg-slate-800 overflow-hidden">
      {/* Sidebar: Visible on desktop; on mobile hidden if chat is open */}
      <div className={`${isMobileChatOpen ? "hidden" : "block"} md:block w-full md:w-[320px] lg:w-[400px] h-full shrink-0`}>
        <Sidebar
          connections={connections}
          activeChat={activeChat}
          onSelect={loadMessages}
          onlineUsers={onlineUsers}
        />
      </div>

      {/* ChatWindow: Visible on desktop; on mobile hidden if chat is NOT open */}
      <div className={`${isMobileChatOpen ? "block" : "hidden"} md:block flex-1 h-full`}>
        <ChatWindow
          activeChat={activeChat}
          messages={messages}
          typing={typing}
          onlineUsers={onlineUsers}
          input={input}
          setInput={setInput}
          sendMessage={sendMessage}
          onTyping={handleTyping}
          replyTo={replyTo}
          setReplyTo={setReplyTo}
          // NEW: Handler to go back to list on mobile
          onBack={() => setIsMobileChatOpen(false)}
        />
      </div>
    </div>
  );
}