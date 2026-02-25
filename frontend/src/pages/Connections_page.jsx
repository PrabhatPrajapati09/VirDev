import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/appContext";
import Home_Navbar from "./Home_Navbar";
import { FaComments, FaTimes } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Chat from "./Chat"; 
import VerificationGuard from "../components/auth/VerificationGuard";

const Connections_Page = () => {
  const { userData, connections, getConnections, backendUrl, isLoggedin } = useContext(AppContext);
  const navigate = useNavigate();

  const [openChat, setOpenChat] = useState(false);
  const [chats, setChats] = useState([]); // Real-time chat list for the sidebar

  // Fetch accepted connections with unread counts for the sidebars
  const getChatList = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/connections/acceptedlist`, {
        withCredentials: true,
      });
      if (data.success) {
        setChats(data.connections);
      }
    } catch (err) {
      console.error("Error fetching chat list", err);
    }
  };

  useEffect(() => {
    if (isLoggedin) {
      getConnections();
      getChatList();
    }
  }, [isLoggedin]);

  // Reusable Chat List Component (Consistent with Home and Requests)
  const ChatList = () => (
    <div className="flex flex-col gap-2 overflow-y-auto h-full custom-scrollbar p-2">
      {chats.length > 0 ? (
        chats.map((chat) => (
          <div
            key={chat._id}
            onClick={() => navigate("/messages")}
            className="flex items-center gap-3 p-2 hover:bg-white/10 rounded-xl cursor-pointer transition-all border-b border-white/5"
          >
            <div className="relative shrink-0">
              <img
                src={chat.profilePic || "/user.png"}
                className="w-10 h-10 rounded-full object-cover bg-white/10 hover:border-violet-400"
                alt="avatar"
              />
              {/* {chat.unread > 0 && (
                <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-violet-950">
                  {chat.unread}
                </span>
              )} */}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-white text-sm font-medium truncate">
                {chat.firstname} {chat.lastname}
              </h4>
              <p className="text-gray-400 text-xs truncate italic">
                Click to view messages
              </p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-400 text-center text-sm mt-10">No messages yet</p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950">
      <Home_Navbar />

      <div className="pt-[15vh] w-full flex justify-center px-4">
        <div className="w-full flex justify-center gap-10">

          {/* ------------------------------
              LEFT PROFILE (Desktop Only)
          ------------------------------ */}
          <div className="hidden lg:flex w-[20vw] h-[50vh] bg-violet-950 rounded-3xl p-3 flex-col items-center justify-between text-white m-4 shadow-xl border border-white/5">
            <div className="relative mt-2 flex justify-center w-full">
              <img
                src={userData?.profilePic || "/user.png"}
                className="w-24 h-24 rounded-full border-2 border-yellow-400 object-cover"
              />
            </div>

            <div className="text-center">
              <h2 className="text-2xl font-semibold">{userData?.name}</h2>
              <p className="text-purple-300 text-sm">
                {Array.isArray(userData?.skills) ? userData.skills.join(", ") : userData?.skills}
              </p>
            </div>

            <p className="text-sm text-center px-3 text-white/80 line-clamp-3">
              {userData?.about}
            </p>

            <button className="text-xs px-3 py-1 bg-purple-600 rounded-md truncate max-w-full">
              {userData?.email}
            </button>
          </div>

          {/* CONNECTIONS LIST (Center Feed)*/}
          <div className="w-full lg:w-[60vw] h-[80vh] overflow-y-auto flex flex-col items-center gap-6 p-6 custom-scrollbar m-4 pb-10">
            <VerificationGuard isVerified={userData?.isUserVerified} title="Verify your account to access Connections" >

            <h2 className="text-white text-2xl font-bold self-start">Connections</h2>

            {connections.length === 0 ? (
              <div className="bg-violet-950/30 w-full p-10 rounded-2xl text-center border border-white/5">
                <p className="text-gray-400 text-lg italic">You haven't made any connections yet.</p>
              </div>
            ) : (
              connections.map((user, index) => (
                <div
                key={index}
                className="w-full bg-violet-950 rounded-2xl p-5 flex justify-between items-center gap-6 shadow-lg border border-white/5 hover:border-white/10 transition-all"
                >
                  <div className="flex gap-4 w-[70%]">
                    <div className="h-20 w-20 rounded-full overflow-hidden shrink-0 border-2 border-fuchsia-500/20">
                      <img
                        src={user.profilePic || "/user.png"}
                        className="w-full h-full object-cover"
                        alt="connection"
                        />
                    </div>

                    <div className="flex flex-col justify-center">
                      <p className="text-2xl font-bold text-white leading-tight">
                        {user.firstname} {user.lastname}
                      </p>
                      <p className="text-fuchsia-200 font-semibold text-sm">
                        {Array.isArray(user.skills) ? user.skills.join(" • ") : user.skills}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col justify-center w-[30%] max-w-[150px]">
                    <button
                      onClick={() => navigate("/messages")}
                      className="bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white rounded-3xl py-2 font-medium shadow-md hover:shadow-fuchsia-500/20 transition-all"
                      >
                      Message
                    </button>
                  </div>
                </div>
              ))
            )}
            </VerificationGuard>
          </div>

          {/* -------------------------
              RIGHT CHAT SIDEBAR (Desktop Only)
              ------------------------- */}
          <div className="hidden lg:flex flex-col w-[22vw] bg-violet-950 h-[60vh] rounded-3xl m-4 p-4 shadow-xl border border-white/5">
          <VerificationGuard isVerified={userData?.isUserVerified} title="Verify your account to access Messages" >

            <h3 className="text-white font-bold mb-4 border-b border-white/10 pb-2">Messages</h3>
            <ChatList />
            <button
              onClick={() => navigate("/messages")}
              className="mt-4 text-xs text-fuchsia-400 hover:text-white transition-colors text-center"
              >
              Open Full Chat
            </button>
              </VerificationGuard>
          </div>
        </div>
      </div>

      {/* -------------------------
          Floating Chat Button (Mobile)
      ------------------------- */}
      <button
        className="lg:hidden fixed bottom-6 right-6 bg-fuchsia-600 text-white p-4 rounded-full text-2xl shadow-xl z-40"
        onClick={() => setOpenChat(true)}
      >
        <FaComments />
        {chats.reduce((acc, chat) => acc + ( 0), 0) > 0 && (
          <span className="absolute top-0 right-0 bg-emerald-500 h-4 w-4 rounded-full border-2 border-slate-950 animate-pulse"></span>
        )}
      </button>

      {/* -------------------------
          Slide-Up Chat Interface (Mobile)
      ------------------------- */}
      {openChat && (
        <div className="lg:hidden fixed bottom-0 left-0 w-full h-[65vh] bg-slate-900 rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.5)] z-50 animate-slideUp border-t border-white/10">
          <button
            className="text-white text-2xl absolute top-4 right-4 z-10"
            onClick={() => setOpenChat(false)}
          >
            <FaTimes />
          </button>
          <VerificationGuard isVerified={userData?.isUserVerified} title="Verify your account to access Messages" >

          <Chat />
          </VerificationGuard>
        </div>
      )}
    </div>
  );
};

export default Connections_Page;