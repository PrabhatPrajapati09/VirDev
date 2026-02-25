import React from "react";
import { FaArrowLeft } from "react-icons/fa"; // Importing the back icon
import { useNavigate } from "react-router-dom"; // Hook to navigate back to Home

export default function Sidebar({ connections, activeChat, onSelect, onlineUsers = [] }) {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-slate-900 p-4 overflow-y-auto h-full border-r border-slate-700/50">
      
      {/* HEADER SECTION WITH BACK BUTTON */}
      <div className="flex items-center gap-2 mb-6 px-2">
        {/* Only visible on mobile (hidden on medium screens and up) */}
        <button 
          onClick={() => navigate("/home")} 
          className="md:hidden text-white p-2 hover:bg-white/10 rounded-full transition-all"
        >
          <FaArrowLeft size={18} />
        </button>
        
        <h2 className="text-xl font-bold text-white">Chats</h2>
      </div>

      <div className="space-y-2">
        {connections.length === 0 ? (
          <div className="text-center text-slate-500 py-10 text-sm">
            No connections yet.
          </div>
        ) : (
          connections.map((user) => {
            const isOnline = onlineUsers.includes(user._id);
            const isActive = activeChat?._id === user._id;

            return (
              <div
                key={user._id}
                onClick={() => onSelect(user)}
                className={`p-3 rounded-2xl cursor-pointer flex items-center gap-3 transition-all duration-200 group
                  ${isActive 
                    ? "bg-fuchsia-600 shadow-lg shadow-fuchsia-900/20" 
                    : "bg-slate-800/40 hover:bg-slate-800"}`}
              >
                {/* Profile Image with Online Dot */}
                <div className="relative shrink-0">
                  <div className={`h-12 w-12 rounded-full overflow-hidden border-2 
                    ${isActive ? "border-fuchsia-300" : "border-slate-700"}`}>
                    <img 
                      src={user.profilePic || "/user.png"} 
                      className="h-full w-full object-cover" 
                      alt="avatar"
                    />
                  </div>
                  {isOnline && (
                    <span className="absolute bottom-0 right-0 h-3.5 w-3.5 bg-green-500 border-2 border-slate-900 rounded-full" />
                  )}
                </div>

                {/* User Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline">
                    <p className={`font-semibold truncate ${isActive ? "text-white" : "text-slate-200"}`}>
                      {user.firstname} {user.lastname}
                    </p>
                  </div>
                  
                  <p className={`text-xs truncate ${isActive ? "text-fuchsia-100" : "text-slate-400"}`}>
                     {user.skills && user.skills.length > 0 
                       ? user.skills.slice(0, 2).join(", ") 
                       : "Click to chat"}
                  </p>
                </div>

                {/* Unread Badge */}
                {user.unread > 0 && (
                  <div className="bg-emerald-500 text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full shrink-0">
                    {user.unread}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}