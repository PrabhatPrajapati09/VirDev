import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/appContext";
import { FaComments, FaTimes, FaSearch } from "react-icons/fa"; // Added FaSearch
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Chat from "./Chat";
import VerificationGuard from "../components/auth/VerificationGuard";
import { SocketContext } from "../context/socketContext";

const Home = () => {
  const { userData, suggestions, getSuggestions, isLoggedin, backendUrl } =
    useContext(AppContext);

  const { socket } =useContext(SocketContext);

  const navigate = useNavigate();

  const [index, setIndex] = useState(0);
  const [openChat, setOpenChat] = useState(false);
  const [chats, setChats] = useState([]);

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
      getSuggestions();
      getChatList();
    }
  }, [isLoggedin]);

  // Reset index to 0 whenever suggestions list is updated/refetched 
  // to avoid "blank screen" due to index being out of bounds
  useEffect(() => {
    setIndex(0);
  }, [suggestions]);

  const current = suggestions[index] || null;

  useEffect(() => {
    if (!socket) return;

    socket.on("idea-interest", (data) => {
      toast.info(`${data.sender.name} is interested in your idea`);
    });

    return () => socket.off("idea-interest");
  }, [socket]);

  const next = () => {
    // If we are at the last card, refetch to see if there are new ones
    if (index >= suggestions.length - 1) {
      getSuggestions();
    } else {
      setIndex((prev) => prev + 1);
    }
  };

  const sendConnection = async (receiverId, message) => {
    // Optimistically move to next card immediately
    next();

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/connections/send/${receiverId}`,
        { message },
        { withCredentials: true }
      );
      if (data.success) {
        toast.success("Request sent");
        // Trigger refetch so the user we just connected with is officially excluded from DB
        getSuggestions();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Error sending request");
    }
  };


  const handleRefresh = async () => {
    try {
      // 1. Trigger the API call from context
      await getSuggestions();

      // 2. We check the suggestions list. 
      // If the list is empty or hasn't changed, show the popup.
      if (!suggestions || suggestions.length === 0) {
        toast.info("No new suggestions found. Try again in a while!", {
          position: "bottom-center",
          autoClose: 3000,
          theme: "dark",
          icon: "🔍"
        });
      } else {
        toast.success("Feed updated!");
      }
    } catch (error) {
      toast.error("Failed to fetch suggestions. No suggestions found. Try again in a while!");
    }
  };

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
                  0
                </span>
              )} */}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-white text-sm font-medium truncate">
                {chat.firstname} {chat.lastname}
              </h4>
              <p className="text-gray-400 text-xs truncate">
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
    <div className="min-h-screen bg-slate-950 pt-[15vh] flex justify-center">
      <div className="w-full flex justify-center gap-10 px-4">

        {/* LEFT PROFILE */}
        <div className="hidden lg:flex w-[20vw] h-[50vh] bg-violet-950 rounded-3xl p-3 flex-col items-center justify-between text-white m-4 shadow-xl">
          <img
            src={userData?.profilePic || "/user.png"}
            className="w-24 h-24 rounded-full border-2 border-yellow-400 object-cover"
            alt="profile"
          />
          <div className="text-center">
            <h2 className="text-2xl font-semibold">{userData?.name}</h2>
            <p className="text-purple-300 text-sm">
              {Array.isArray(userData?.skills) ? userData.skills.join(", ") : userData?.skills}
            </p>
          </div>
          <p className="text-center text-white/80 text-sm px-3 line-clamp-3">{userData?.about}</p>
          {/* <p className="text-center text-white/80 text-sm px-3 line-clamp-3">{userData?.ideas}</p> */}

          <button className="text-xs px-3 py-1 bg-purple-600 rounded-md truncate max-w-full">
            {userData?.email}
          </button>
        </div>

        {/* MAIN SUGGESTIONS CARD */}

        <div className="w-full lg:w-[40vw] h-[80vh] bg-transparent flex justify-center m-4">
          <VerificationGuard isVerified={userData?.isUserVerified} title="Verify Your Account to see suggestions" >
            <div className="w-full sm:w-[70%] h-[80%] bg-violet-950 rounded-2xl p-5 flex flex-col items-center gap-5 shadow-2xl border border-white/5 justify-center">
              {current ? (
                <>
                  <div className="h-32 w-32 rounded-full overflow-hidden border-2 border-fuchsia-300">
                    <img src={current.profilePic || "/user.png"} className="w-full h-full object-cover" alt="suggestion" />
                  </div>
                  <div className="text-white text-2xl font-semibold text-center">{current.username}</div>
                  <div className="text-fuchsia-200 text-center text-sm">
                    {Array.isArray(current.skills) ? current.skills.join(" • ") : current.skills}
                  </div>
                  <p className="text-white text-center text-sm px-3 line-clamp-3">{current.about || "No bio available."}</p>
                  <div className="flex flex-wrap gap-4 justify-center mt-3">
                    <button className="bg-white/10 hover:bg-white/20 border border-white/20 rounded-3xl px-6 py-2 text-white transition-all" onClick={next}>Ignore</button>
                    <button className="bg-gradient-to-r from-fuchsia-500 to-purple-500 rounded-3xl px-6 py-2 text-white shadow-lg" onClick={() => sendConnection(current._id, "I like your profile...")}>Connect</button>
                    <button className="bg-gradient-to-r from-purple-500 to-cyan-500 rounded-3xl px-6 py-2 text-white shadow-lg" onClick={() => sendConnection(current._id, "I liked your idea... I want to collaborate with you...")}>Interested in Idea</button>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center gap-4 text-center">
                  <FaSearch className="text-fuchsia-500 text-5xl animate-pulse" />
                  <p className="text-white text-lg font-medium">Looking for more developers...</p>
                  <button
                    onClick={() => handleRefresh()}
                    className="text-fuchsia-400 text-sm underline hover:text-fuchsia-300"
                  >
                    Refresh Suggestions
                  </button>
                </div>
              )}
            </div>
          </VerificationGuard>
        </div>




        {/* RIGHT CHAT BOX */}
        <div className="hidden lg:flex flex-col w-[22vw] bg-violet-950 h-[60vh] rounded-3xl m-4 p-4 shadow-xl border border-white/5">
          <VerificationGuard isVerified={userData?.isUserVerified} title="Verify Your Account to see messages" >
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

      {/* FLOATING MESSAGE BUTTON (MOBILE) */}
      <button
        className="lg:hidden fixed bottom-6 right-6 bg-fuchsia-600 text-white p-4 rounded-full shadow-lg text-2xl z-40"
        onClick={() => setOpenChat(true)}
      >
        <FaComments />
        {chats.reduce((acc, chat) => acc + (0), 0) > 0 && (
          <span className="absolute top-0 right-0 bg-emerald-500 h-4 w-4 rounded-full border-2 border-slate-950"></span>
        )}
      </button>

      {/* MOBILE CHAT SLIDE-UP */}
      {openChat && (
        <div className="lg:hidden fixed bottom-0 left-0 w-full h-[100vh] bg-slate-900 rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.5)] z-50 animate-slideUp border-t border-white/10">
          <button className="text-white text-2xl absolute top-4 right-4 z-10" onClick={() => setOpenChat(false)}><FaTimes /></button>
          <VerificationGuard isVerified={userData?.isUserVerified} title="Verify Your Account to see messages">

            <Chat />
          </VerificationGuard>
        </div>
      )}


    </div>
  );
};

export default Home;