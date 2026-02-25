import React from "react";

export default function MessageInput({ input, setInput, sendMessage, onTyping }) {
  return (
    <div className="p-2 border-t border-none flex gap-3 bg-slate-900">
      <input
        type="text"
        value={input}
        onChange={onTyping}
        placeholder="Type a message..."
        className="flex-1 p-3 rounded-xl bg-slate-700 text-white outline-none"
      />
      <button
        onClick={sendMessage}
        className="px-6 py-3 rounded-xl bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-500 text-white"
      >
        Send
      </button>
    </div>
  );
}
