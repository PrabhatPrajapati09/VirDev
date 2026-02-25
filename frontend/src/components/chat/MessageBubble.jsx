import React from "react";

export default function MessageBubble({ msg, activeChat, onReply }) {
  // Logic to determine sender
  // If msg.sender is 'me' (optimistic) or doesn't match the activeChat ID, it's from current user
  const isMe = msg.sender === "me" || msg.temp === true || msg.sender !== activeChat?._id;

  const formatTime = (dateStr) => {
    if (!dateStr) return "";
    try {
      return new Date(dateStr).toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      });
    } catch (e) {
      return "";
    }
  };

  return (
    <div className={`flex flex-col ${isMe ? "items-end" : "items-start"} group w-full mb-2 px-2 transition-all`}>
      
      {/* Container for Bubble + Reply Button */}
      <div className={`relative flex items-end gap-2 ${isMe ? "flex-row-reverse" : "flex-row"}`}>
        
        {/* The Message Bubble */}
        <div
          className={`px-3 pt-2 pb-1 rounded-2xl shadow-sm relative flex flex-col
            
            ${isMe
              ? "bg-fuchsia-600 text-white rounded-br-none"
              : "bg-slate-800 text-slate-100 rounded-bl-none"
            }`}
        >
          {/* Quoted Message (The Reply Context) */}
          {msg.replyTo && (
            <div 
              className={`mb-2 p-2 rounded-lg border-l-4 text-xs flex flex-col gap-1 
              ${isMe ? "bg-fuchsia-700/50 border-fuchsia-300" : "bg-slate-900/50 border-fuchsia-500"}`}
            >
              <span className={`font-bold ${isMe ? "text-fuchsia-200" : "text-fuchsia-400"}`}>
                {/* DYNAMIC LABEL LOGIC:
                   1. If the sender of the original message is the same as the current message sender: "Themselves"
                   2. If I (isMe) am looking at a reply to a message I sent: "You"
                   3. If I am looking at a reply to a message the other person sent: Their Name
                */}
                {msg.replyTo.sender === msg.sender 
                  ? "Themselves" 
                  : (msg.replyTo.sender === (isMe ? "me" : activeChat?._id) 
                      ? "You" 
                      : activeChat?.firstname || "User")
                }
              </span>
              <p className="italic truncate opacity-80 max-w-[200px]">
                {msg.replyTo.text || "Message"}
              </p>
            </div>
          )}

          {/* Message Content Wrapper */}
          <div className="flex flex-col">
            <p className="text-sm leading-relaxed whitespace-pre-wrap break-words pr-2">
              {msg.text}
            </p>

            {/* Timestamp */}
            {msg.createdAt && (
              <div className={`text-[9px] mt-1 self-end opacity-70 font-medium tracking-tight`}>
                {formatTime(msg.createdAt)}
              </div>
            )}
          </div>
        </div>

        {/* Reply Button: Visible on Hover */}
        <button
          onClick={() => onReply?.(msg)}
          className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 text-slate-500 hover:text-fuchsia-400 shrink-0 cursor-pointer"
          title="Reply"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 17l-5-5 5-5M20 18v-2a4 4 0 0 0-4-4H4"/></svg>
        </button>
      </div>
    </div>
  );
}