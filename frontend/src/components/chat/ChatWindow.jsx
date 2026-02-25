import React, { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";

export default function ChatWindow({
  activeChat,
  messages,
  typing,
  onlineUsers,
  input,
  setInput,
  sendMessage,
  onTyping,
  replyTo,
  setReplyTo,
  onBack, // Prop to handle going back to list on mobile
}) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing, replyTo]);

  // UPDATED: Empty state with Message Bubble Icon
  if (!activeChat) {
    return (
      <div className="flex-1 hidden md:flex flex-col items-center justify-center text-slate-400 bg-slate-900 h-full">
        <div className="mb-4 p-6 bg-slate-800/50 rounded-full">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-12 w-12 text-fuchsia-500 opacity-80" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" 
            />
          </svg>
        </div>
        <p className="text-xl font-semibold text-slate-200">Select a friend</p>
        <p className="text-sm text-slate-500 mt-2 text-center max-w-xs">
          Choose a connection from the left to start a conversation.
        </p>
      </div>
    );
  }

  const isOnline = onlineUsers?.includes(activeChat._id);
  const isTyping = typing;

  return (
    <div className="flex flex-col h-full bg-slate-900 border-l border-slate-700/50">
      
      {/* Header */}
      <div className="p-4 border-b border-slate-700/50 flex items-center gap-3 bg-slate-800/30">
        
        {/* Back Button: Visible on Mobile Only */}
        <button 
          onClick={onBack} 
          className="md:hidden p-2 -ml-2 text-slate-400 hover:text-white transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="relative">
          <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-slate-800">
            <img
              src={activeChat.profilePic || "/user.png"}
              className="h-full w-full object-cover"
              alt="profile"
            />
          </div>
          {isOnline && (
            <span className="absolute bottom-0 right-0 h-3.5 w-3.5 bg-green-500 border-2 border-slate-900 rounded-full" />
          )}
        </div>
        <div className="flex flex-col">
          <h3 className="text-white font-semibold">{activeChat.firstname} {activeChat.lastname}</h3>
          <p className={`text-xs font-medium ${isTyping ? "text-green-400 animate-pulse" : isOnline ? "text-purple-400" : "text-slate-500"}`}>
            {isTyping ? "Typing..." : isOnline ? "Online" : "Offline"}
          </p>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        {messages.map((msg) => (
          <MessageBubble
            key={msg._id}
            msg={msg}
            activeChat={activeChat}
            onReply={() => setReplyTo(msg)}
          />
        ))}
        
        {isTyping && (
          <div className="flex items-center gap-1.5 ml-2">
            <div className="bg-slate-800 rounded-2xl px-4 py-3 rounded-bl-none">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce"></span>
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Reply Preview Bar */}
      {replyTo && (
        <div className="mx-4 mb-0 p-3 bg-slate-800 border-l-4 border-fuchsia-500 rounded-t-lg flex justify-between items-center animate-in slide-in-from-bottom-2">
          <div className="flex flex-col overflow-hidden">
            <span className="text-fuchsia-400 text-xs font-bold uppercase tracking-wider">
              Replying to {replyTo.sender === "me" ? "yourself" : activeChat.firstname}
            </span>
            <p className="text-slate-300 text-sm truncate pr-4 italic">
              "{replyTo.text}"
            </p>
          </div>
          <button 
            onClick={() => setReplyTo(null)}
            className="text-slate-500 hover:text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      )}

      {/* Input Area */}
      <div className={`p-4 bg-slate-900 border-t border-slate-700/50 ${replyTo ? 'pt-2' : ''}`}>
        <MessageInput
          input={input}
          setInput={setInput}
          sendMessage={sendMessage}
          onTyping={onTyping}
        />
      </div>
    </div>
  );
}