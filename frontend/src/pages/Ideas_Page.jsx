// import React, { useContext, useEffect, useState } from "react";
// import { AppContext } from "../context/appContext";
// import Home_Navbar from "./Home_Navbar";
// import { FaComments, FaTimes } from "react-icons/fa";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import Chat from "./Chat";
// import VerificationGuard from "../components/auth/VerificationGuard";

// const Ideas_Page = () => {
//   const { userData, backendUrl, isLoggedin } = useContext(AppContext);
//   const [ideas, setIdeas] = useState([]);
//   const [openChat, setOpenChat] = useState(false);
//   const [chats, setChats] = useState([]);
//   const navigate = useNavigate();

//   // 🔥 HARD GUARD — prevents crash on reload
//   if (!userData) {
//     return (
//       <div className="h-screen bg-slate-950 flex items-center justify-center text-white">
//         Loading...
//       </div>
//     );
//   }

//   // Fetch accepted connections for sidebar
//   const getChatList = async () => {
//     try {
//       const { data } = await axios.get(
//         `${backendUrl}/api/connections/acceptedlist`,
//         { withCredentials: true }
//       );
//       if (data.success) {
//         setChats(data.connections || []);
//       }
//     } catch (err) {
//       console.error("Error fetching chats", err);
//     }
//   };

//   // Fetch ideas
//   const getIdeas = async () => {
//     try {
//       const { data } = await axios.get(`${backendUrl}/api/user/ideas`, {
//         withCredentials: true,
//       });
//       if (data.success) {
//         setIdeas(data.ideas || []);
//       }
//     } catch (err) {
//       console.error("Ideas fetch error:", err);
//     }
//   };

//   useEffect(() => {
//     if (isLoggedin) {
//       getIdeas();
//       getChatList();
//     }
//   }, [isLoggedin]);

//   // ---------------- CHAT LIST ----------------
//   const ChatList = () => (
//     <div className="flex flex-col gap-2 overflow-y-auto h-full custom-scrollbar p-2">
//       {chats.length > 0 ? (
//         chats.map((chat) => (
//           <div
//             key={chat._id}
//             onClick={() => navigate("/messages")}
//             className="flex items-center gap-3 p-2 hover:bg-white/10 rounded-xl cursor-pointer transition-all border-b border-white/5"
//           >
//             <div className="relative shrink-0">
//               <img
//                 src={chat.profilePic || "/user.png"}
//                 className="w-10 h-10 rounded-full object-cover bg-white/10"
//                 alt="avatar"
//               />
//             </div>

//             <div className="flex-1 min-w-0">
//               <h4 className="text-white text-sm font-medium truncate">
//                 {chat.firstname} {chat.lastname}
//               </h4>
//               <p className="text-gray-400 text-xs truncate italic">
//                 Click to view messages
//               </p>
//             </div>
//           </div>
//         ))
//       ) : (
//         <p className="text-gray-400 text-center text-sm mt-10">
//           No messages yet
//         </p>
//       )}
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-slate-950">
//       <Home_Navbar />

//       <div className="pt-[15vh] w-full flex justify-center px-4">
//         <div className="w-full flex justify-center gap-10">

//           {/* LEFT PROFILE */}
//           <div className="hidden lg:flex w-[20vw] h-[50vh] bg-violet-950 rounded-3xl p-3 flex-col items-center justify-between text-white m-4 shadow-xl border border-white/5">
//             <div className="relative mt-2 flex justify-center w-full">
//               <img
//                 src={userData.profilePic || "/user.png"}
//                 className="w-24 h-24 rounded-full border-2 border-yellow-400 object-cover"
//                 alt="profile"
//               />
//             </div>

//             <div className="text-center">
//               <h2 className="text-2xl font-semibold">{userData.name}</h2>
//               <p className="text-purple-300 text-sm">
//                 {Array.isArray(userData.skills)
//                   ? userData.skills.join(", ")
//                   : userData.skills}
//               </p>
//             </div>

//             <p className="text-sm text-center px-3 text-white/80 line-clamp-3">
//               {userData.about}
//             </p>

//             <button className="text-xs px-3 py-1 bg-purple-600 rounded-md truncate max-w-full">
//               {userData.email}
//             </button>
//           </div>

//           {/* IDEAS FEED */}
//           <div className="w-full lg:w-[60vw] h-[80vh] bg-violet-900 rounded-3xl overflow-y-auto flex flex-col items-center gap-6 custom-scrollbar m-4 shadow-2xl border border-white/5">

//             <VerificationGuard
//               isVerified={userData.isUserVerified}
//               title="Verify your email to create ideas and share them"
//             >

//               {/* Header */}
//               <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-4 px-4 sticky top-0 bg-violet-900 py-2 border-b border-white/10 mb-2">
//                 <h2 className="text-white text-2xl font-bold">
//                   Ideas from Developers
//                 </h2>

//                 <div className="flex items-center gap-3">
//                   <button
//                     className="bg-purple-700 hover:bg-fuchsia-600 text-white px-4 py-2 rounded-2xl transition-all shadow-md text-sm font-medium"
//                     onClick={() => navigate("/create-idea")}
//                   >
//                     Create Idea
//                   </button>

//                   <button
//                     className="bg-purple-700 hover:bg-purple-600 text-white px-4 py-2 rounded-2xl transition-all shadow-md text-sm font-medium"
//                     onClick={() => navigate("/my-ideas")}
//                   >
//                     My Ideas
//                   </button>
//                 </div>
//               </div>

//               {/* Ideas List */}
//               {ideas.length === 0 ? (
//                 <p className="text-gray-300 mt-10 italic">No ideas found</p>
//               ) : (
//                 ideas.map((idea) => (
//                   <div
//                     key={idea.ideaId}
//                     className="w-full sm:w-[95%] bg-violet-950 rounded-2xl p-5 flex flex-col gap-4 shadow-lg border border-white/5 hover:border-white/10 transition-all"
//                   >
//                     <div className="flex items-center gap-4">
//                       <div className="h-14 w-14 rounded-full overflow-hidden shrink-0 border border-white/20">
//                         <img
//                           src={idea.authorProfile || "/user.png"}
//                           className="w-full h-full object-cover"
//                           alt="author"
//                         />
//                       </div>

//                       <div>
//                         <h3 className="text-xl text-white font-bold leading-tight">
//                           {idea.authorName}
//                         </h3>
//                         <p className="text-sm text-purple-300">
//                           {Array.isArray(idea.authorSkills)
//                             ? idea.authorSkills.join(", ")
//                             : idea.authorSkills}
//                         </p>
//                       </div>
//                     </div>

//                     <div className="bg-black/20 p-4 rounded-xl">
//                       <p className="text-fuchsia-300 text-xs font-bold uppercase tracking-widest mb-1">
//                         {idea.category}
//                       </p>

//                       <p className="text-white font-bold text-lg leading-snug">
//                         {idea.title}
//                       </p>

//                       <p className="text-gray-300 text-sm mt-3 leading-relaxed">
//                         {idea.description}
//                       </p>
//                     </div>

//                     <div className="flex justify-end mt-2">
//                       <button className="bg-gradient-to-r from-fuchsia-600 to-purple-600 rounded-3xl px-6 py-2 text-white font-medium shadow-md hover:shadow-fuchsia-500/20 transition-all">
//                         I'm Interested
//                       </button>
//                     </div>
//                   </div>
//                 ))
//               )}

//             </VerificationGuard>
//           </div>

//           {/* RIGHT CHAT SIDEBAR */}
//           <div className="hidden lg:flex flex-col w-[22vw] bg-violet-950 h-[60vh] rounded-3xl m-4 p-4 shadow-xl border border-white/5">
//             <VerificationGuard
//               isVerified={userData.isUserVerified}
//               title="Verify your account to access messages"
//             >
//               <h3 className="text-white font-bold mb-4 border-b border-white/10 pb-2">
//                 Messages
//               </h3>

//               <ChatList />

//               <button
//                 onClick={() => navigate("/messages")}
//                 className="mt-4 text-xs text-fuchsia-400 hover:text-white transition-colors text-center"
//               >
//                 Open Full Chat
//               </button>
//             </VerificationGuard>
//           </div>
//         </div>
//       </div>

//       {/* MOBILE CHAT BUTTON */}
//       <button
//         className="lg:hidden fixed bottom-6 right-6 bg-fuchsia-600 text-white p-4 rounded-full text-2xl shadow-xl z-40"
//         onClick={() => setOpenChat(true)}
//       >
//         <FaComments />
//       </button>

//       {/* MOBILE CHAT SLIDE UP */}
//       {openChat && (
//         <div className="lg:hidden fixed bottom-0 left-0 w-full h-[65vh] bg-slate-900 rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.5)] z-50 animate-slideUp border-t border-white/10">
//           <button
//             className="text-white text-2xl absolute top-4 right-4 z-10"
//             onClick={() => setOpenChat(false)}
//           >
//             <FaTimes />
//           </button>

//           <VerificationGuard
//             isVerified={userData.isUserVerified}
//             title="Verify your account to access messages"
//           >
//             <Chat />
//           </VerificationGuard>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Ideas_Page;



import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/appContext";
import Home_Navbar from "./Home_Navbar";
import { FaComments, FaTimes } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Chat from "./Chat";
import VerificationGuard from "../components/auth/VerificationGuard";
import { toast } from "react-toastify";

const Ideas_Page = () => {
  const { userData, backendUrl, isLoggedin } = useContext(AppContext);

  const [ideas, setIdeas] = useState([]);
  const [openChat, setOpenChat] = useState(false);
  const [chats, setChats] = useState([]);
  const [interestedIdeas, setInterestedIdeas] = useState([]);


  const navigate = useNavigate();

  // SAFE DERIVED VALUES (no early return)
  const isVerified = userData?.isUserVerified ?? false;
  const profilePic = userData?.profilePic || "/user.png";
  const fullName = userData?.name || "";
  const skills = Array.isArray(userData?.skills)
    ? userData.skills.join(", ")
    : userData?.skills || "";
  const about = userData?.about || "";
  const email = userData?.email || "";

  // -----------------------------
  // Fetch accepted connections
  // -----------------------------
  const getChatList = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/connections/acceptedlist`,
        { withCredentials: true }
      );

      if (data.success) {
        setChats(data.connections);
      }
    } catch (err) {
      console.error("Error fetching chats", err);
    }
  };

  // -----------------------------
  // Fetch ideas
  // -----------------------------
  const getIdeas = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/user/ideas`,
        { withCredentials: true }
      );

      if (data.success) {
        setIdeas(data.ideas);
      }
    } catch (err) {
      console.error("Ideas fetch error:", err);
    }
  };

  // -----------------------------
  // Send Interested in idea Requests+connections
  // -----------------------------
  const handleInterest = async (ideaId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/interest/${ideaId}`,
        {},
        { withCredentials: true }
      );

      if (data.success) {
        setInterestedIdeas(prev => [...prev, ideaId]);
        toast.success("Interest sent!");
      }
    } catch (err) {
      toast.error("Failed to send interest");
    }
  };

  //get my interested ideas
  const getMyInterests = async () => {
    const { data } = await axios.get(
      `${backendUrl}/api/user/my-interests`,
      { withCredentials: true }
    );

    if (data.success) {
      setInterestedIdeas(data.interestedIdeaIds);
    }
  };


  // -----------------------------
  // Load data when logged in
  // -----------------------------
  useEffect(() => {
    if (!isLoggedin) return;

    getIdeas();
    getChatList();
    getMyInterests();
  }, [isLoggedin]);

  // -----------------------------
  // Chat Sidebar Component
  // -----------------------------
  const ChatList = () => (
    <div className="flex flex-col gap-2 overflow-y-auto h-full p-2">
      {chats.length > 0 ? (
        chats.map((chat) => (
          <div
            key={chat._id}
            onClick={() => navigate("/messages")}
            className="flex items-center gap-3 p-2 hover:bg-white/10 rounded-xl cursor-pointer border-b border-white/5"
          >
            <img
              src={chat.profilePic || "/user.png"}
              className="w-10 h-10 rounded-full object-cover bg-white/10"
              alt="avatar"
            />
            <div className="flex-1 min-w-0">
              <h4 className="text-white text-sm font-medium truncate">
                {chat.firstname} {chat.lastname}
              </h4>
              <p className="text-gray-400 text-xs italic">
                Click to view messages
              </p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-400 text-center text-sm mt-10">
          No messages yet
        </p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950">
      <Home_Navbar />

      <div className="pt-[15vh] w-full flex justify-center px-4">
        <div className="w-full flex justify-center gap-10">

          {/* LEFT PROFILE */}
          <div className="hidden lg:flex w-[20vw] h-[50vh] bg-violet-950 rounded-3xl p-3 flex-col items-center justify-between text-white m-4 shadow-xl border border-white/5">
            <img
              src={profilePic}
              className="w-24 h-24 rounded-full border-2 border-yellow-400 object-cover"
              alt="profile"
            />

            <div className="text-center">
              <h2 className="text-2xl font-semibold">{fullName}</h2>
              <p className="text-purple-300 text-sm">{skills}</p>
            </div>

            <p className="text-sm text-center px-3 text-white/80 line-clamp-3">
              {about}
            </p>

            <button className="text-xs px-3 py-1 bg-purple-600 rounded-md truncate max-w-full">
              {email}
            </button>
          </div>

          {/* IDEAS FEED */}
          <div className="w-full lg:w-[60vw] h-[80vh] bg-violet-900 rounded-3xl overflow-y-auto flex flex-col items-center gap-6 m-4 shadow-2xl border border-white/5">

            <VerificationGuard
              isVerified={isVerified}
              title="Verify your email to create ideas and share them"
            >

              {/* HEADER */}
              <div className="w-full flex justify-between items-center px-6 py-4 border-b border-white/10 sticky top-0 bg-violet-900">
                <h2 className="text-white text-2xl font-bold">
                  Ideas from Developers
                </h2>

                <div className="flex gap-3">
                  <button
                    className="bg-purple-700 hover:bg-fuchsia-600 text-white px-4 py-2 rounded-2xl text-sm"
                    onClick={() => navigate("/create-idea")}
                  >
                    Create Idea
                  </button>

                  <button
                    className="bg-purple-700 hover:bg-purple-600 text-white px-4 py-2 rounded-2xl text-sm"
                    onClick={() => navigate("/my-ideas")}
                  >
                    My Ideas
                  </button>
                </div>
              </div>

              {/* IDEA LIST */}
              {ideas.length === 0 ? (
                <p className="text-gray-300 mt-10 italic">
                  No ideas found
                </p>
              ) : (
                ideas.map((idea) => (
                  <div
                    key={idea.ideaId}
                    className="w-[95%] bg-violet-950 rounded-2xl p-5 shadow-lg border border-white/5"
                  >
                    <div className="flex items-center gap-4 mb-3">
                      <img
                        src={idea.authorProfile || "/user.png"}
                        className="w-12 h-12 rounded-full object-cover"
                        alt="author"
                      />
                      <div>
                        <h3 className="text-white font-bold">
                          {idea.authorName}
                        </h3>
                        <p className="text-sm text-purple-300">
                          {Array.isArray(idea.authorSkills)
                            ? idea.authorSkills.join(", ")
                            : idea.authorSkills}
                        </p>
                      </div>
                    </div>

                    <div className="bg-black/20 p-4 rounded-xl">
                      <p className="text-fuchsia-300 text-xs font-bold uppercase">
                        {idea.category}
                      </p>
                      <p className="text-white font-bold text-lg">
                        {idea.title}
                      </p>
                      <p className="text-gray-300 text-sm mt-2">
                        {idea.description}
                      </p>
                    </div>

                    <div className="flex justify-between items-center mt-3">
                      <p className="text-sm text-gray-400">
                        {idea.interestCount} developer{idea.interestCount !== 1 && "s"} interested
                      </p>
                      
                      <button
                        onClick={() => handleInterest(idea.ideaId)}
                        disabled={interestedIdeas.includes(idea.ideaId)}
                        className={`rounded-3xl px-6 py-2 text-white font-medium transition-all
                            ${interestedIdeas.includes(idea.ideaId)
                            ? "bg-gray-600 cursor-not-allowed opacity-70"
                            : "bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:shadow-fuchsia-500/20"
                          }`}
                      >
                        {interestedIdeas.includes(idea.ideaId)
                          ? "Interest Sent"
                          : "I'm Interested"}
                      </button>
                    </div>

                  </div>
                ))
              )}
            </VerificationGuard>
          </div>

          {/* RIGHT CHAT SIDEBAR */}
          <div className="hidden lg:flex flex-col w-[22vw] bg-violet-950 h-[60vh] rounded-3xl m-4 p-4 shadow-xl border border-white/5">
            <VerificationGuard
              isVerified={isVerified}
              title="Verify your account to access messages"
            >
              <h3 className="text-white font-bold mb-4 border-b border-white/10 pb-2">
                Messages
              </h3>
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

      {/* MOBILE CHAT BUTTON */}
      <button
        className="lg:hidden fixed bottom-6 right-6 bg-fuchsia-600 text-white p-4 rounded-full text-2xl shadow-xl z-40"
        onClick={() => setOpenChat(true)}
      >
        <FaComments />
      </button>

      {openChat && (
        <div className="lg:hidden fixed bottom-0 left-0 w-full h-[65vh] bg-slate-900 rounded-t-3xl z-50 border-t border-white/10">
          <button
            className="text-white text-2xl absolute top-4 right-4"
            onClick={() => setOpenChat(false)}
          >
            <FaTimes />
          </button>

          <VerificationGuard
            isVerified={isVerified}
            title="Verify your account to access messages"
          >
            <Chat />
          </VerificationGuard>
        </div>
      )}
    </div>
  );
};

export default Ideas_Page;
