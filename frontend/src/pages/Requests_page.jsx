import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/appContext";
import Home_Navbar from "./Home_Navbar";
import { FaComments, FaTimes } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Chat from "./Chat";
import VerificationGuard from "../components/auth/VerificationGuard";

const Requests_Page = () => {
  const {
    userData,
    backendUrl,
    receivedRequests,
    sentRequests,
    getReceivedRequests,
    getSentRequests,
    isLoggedin
  } = useContext(AppContext);

  const navigate = useNavigate();

  const [openChat, setOpenChat] = useState(false);
  const [chats, setChats] = useState([]); // State to hold chat list for right sidebar

  // Fetch accepted connections/chats for the sidebar
  const getChatList = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/connections/acceptedlist`, {
        withCredentials: true,
      });
      if (data.success) {
        setChats(data.connections);
      }
    } catch (err) {
      console.error("Error fetching chats", err);
    }
  };

  useEffect(() => {
    if (isLoggedin) {
      getReceivedRequests();
      getSentRequests();
      getChatList();
    }
  }, [isLoggedin]);

  // Accept request
  const acceptRequest = async (requestId) => {
    try {
      const { data } = await axios.put(
        `${backendUrl}/api/connections/accept/${requestId}`,
        {},
        { withCredentials: true }
      );

      if (data.success) {
        toast.success("Request accepted");
        getReceivedRequests();
        getSentRequests();
        getChatList(); // Refresh chat list after accepting
      }
    } catch {
      toast.error("Error accepting request");
    }
  };

  // Reject request
  const rejectRequest = async (requestId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/connections/reject/${requestId}`,
        {},
        { withCredentials: true }
      );

      if (data.success) {
        toast.info("Request rejected");
        getReceivedRequests();
        getSentRequests();
      }
    } catch {
      toast.error("Error rejecting request");
    }
  };

  // REUSABLE CHAT LIST COMPONENT 
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

          {/* LEFT PROFILE (Desktop only) */}
          <div className="hidden lg:flex w-[20vw] h-[50vh] bg-violet-950 rounded-3xl p-3 flex-col items-center justify-between text-white m-4 shadow-xl">
            <img
              src={userData?.profilePic || "/user.png"}
              className="w-24 h-24 rounded-full border-2 border-yellow-400 object-cover"
            />
            <div className="text-center">
              <h2 className="text-2xl font-semibold">{userData?.name}</h2>
              <p className="text-purple-300">
                {Array.isArray(userData?.skills) ? userData.skills.join(", ") : userData?.skills}
              </p>
            </div>
            <p className="text-center text-white/80 text-sm px-3 line-clamp-3">{userData?.about}</p>
            <button className="text-xs px-3 py-1 bg-purple-600 rounded-md truncate max-w-full">
              {userData?.email}
            </button>
          </div>

          {/* CENTER REQUESTS FEED */}
          <div className="w-full lg:w-[60vw] h-[80vh] overflow-y-auto flex flex-col items-center gap-6 custom-scrollbar m-4 pb-10">
            <VerificationGuard isVerified={userData?.isUserVerified} title="Verify your account to access sent and received requests">

              <h2 className="text-white text-2xl font-bold self-start">Received Requests</h2>

              {receivedRequests.length === 0 ? (
                <div className="bg-violet-950/30 w-full p-10 rounded-2xl text-center border border-white/5">
                  <p className="text-gray-400 italic">No incoming requests yet</p>
                </div>
              ) : (
                receivedRequests.map((req) => (
                  <div key={req._id} className="w-full bg-violet-950 rounded-2xl p-5 flex flex-col sm:flex-row justify-between gap-6 shadow-lg border border-white/5">
                    <div className="flex gap-4">
                      <div className="h-20 w-20 rounded-full overflow-hidden shrink-0 border-2 border-fuchsia-500/30">
                        <img src={req.senderId?.profilePic || "/user.png"} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="text-xl font-bold text-white">{req.senderId.firstname} {req.senderId.lastname}</p>
                        <p className="text-fuchsia-300 text-sm font-semibold mb-2">{req.senderId.skills?.join(", ")}</p>
                        <p className="text-gray-400 text-xs italic bg-black/20 p-2 rounded-lg mb-2">"{req.message}"</p>
                      </div>
                    </div>
                    <div className="flex sm:flex-col gap-3 shrink-0">
                      <button onClick={() => rejectRequest(req._id)} className="flex-1 bg-slate-800 hover:bg-red-900 text-white rounded-xl px-6 py-2 transition-all">Reject</button>
                      <button onClick={() => acceptRequest(req._id)} className="flex-1 bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white rounded-xl px-6 py-2 shadow-lg">Accept</button>
                    </div>
                  </div>
                ))
              )}

              <h2 className="text-white text-2xl font-bold self-start mt-4">Sent Requests</h2>
              {sentRequests.map((req) => (
                <div key={req._id} className="w-full bg-violet-950/50 rounded-2xl p-5 flex justify-between gap-6 opacity-80 border border-white/5">
                  <div className="flex gap-4">
                    <div className="h-16 w-16 rounded-full overflow-hidden shrink-0">
                      <img src={req.receiverId?.profilePic || "/user.png"} className="w-full h-full object-cover grayscale" />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-white/80">{req.receiverId.firstname} {req.receiverId.lastname}</p>
                      <p className="text-yellow-500 text-xs font-bold uppercase tracking-widest">Pending Response</p>
                    </div>
                  </div>
                </div>
              ))}
            </VerificationGuard>
          </div>

          {/* RIGHT CHAT BOX (Desktop only) */}
          <div className="hidden lg:flex flex-col w-[22vw] bg-violet-950 h-[60vh] rounded-3xl m-4 p-4 shadow-xl border border-white/5">
            <VerificationGuard isVerified={userData?.isUserVerified} title="Verify your account to access messages">

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

      {/* FLOATING BUTTON (Mobile only) */}
      <button
        className="lg:hidden fixed bottom-6 right-6 bg-fuchsia-600 text-white p-4 rounded-full text-2xl shadow-xl z-40"
        onClick={() => setOpenChat(true)}
      >
        <FaComments />
        {chats.reduce((acc, chat) => acc + ( 0), 0) > 0 && (
          <span className="absolute top-0 right-0 bg-emerald-500 h-4 w-4 rounded-full border-2 border-slate-950 animate-pulse"></span>
        )}
      </button>

      {/* MOBILE CHAT SLIDE-UP */}
      {
        openChat && (
          <div className="lg:hidden fixed bottom-0 left-0 w-full h-[60vh] bg-slate-900 rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.5)] z-50 animate-slideUp border-t border-white/10">
            <button className="text-white text-2xl absolute top-4 right-4 z-10" onClick={() => setOpenChat(false)}>
              <FaTimes />
            </button>
            <VerificationGuard isVerified={userData?.isUserVerified} title="Verify your account to access messages">
              <Chat />
            </VerificationGuard>
          </div>
        )
      }
    </div >
  );
};

export default Requests_Page;