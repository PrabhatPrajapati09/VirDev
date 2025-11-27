import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/appContext";
import Home_Navbar from "./Home_Navbar";
import { FaComments, FaTimes } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Ideas_Page = () => {
  const { userData, backendUrl } = useContext(AppContext);
  const [ideas, setIdeas] = useState([]);
  const [openChat, setOpenChat] = useState(false);
  const navigate = useNavigate();

  const getIdeas = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/ideas`, {
        withCredentials: true,
      });

      if (data.success) setIdeas(data.ideas);
    } catch (err) {
      console.error("Ideas fetch error:", err);
    }
  };

  useEffect(() => {
    getIdeas();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950">
      <Home_Navbar />

      <div className="pt-[15vh] w-full flex justify-center px-4">
        <div className="w-full flex gap-10">

          {/* --------------------------------------
              LEFT PROFILE (Desktop Only)
          -------------------------------------- */}
          <div className="hidden lg:flex w-[18vw] h-[50vh] bg-violet-950 rounded-3xl p-3 flex-col items-center justify-between text-white m-4">
            <div className="relative mt-2 flex justify-center w-full">
              <img
                src={userData?.profilePic || "/assets/profile.png"}
                className="w-24 h-24 rounded-full border-2 border-yellow-400 object-cover"
              />
            </div>

            <div className="text-center">
              <h2 className="text-2xl font-semibold">{userData?.name}</h2>
              <p className="text-purple-300">
                {Array.isArray(userData?.skills)
                  ? userData.skills.join(", ")
                  : userData?.skills}
              </p>
            </div>

            <p className="text-sm text-center px-3 text-white/80">
              {userData?.about}
            </p>

            <button className="text-sm px-3 py-1 bg-purple-600 rounded-md">
              {userData?.email}
            </button>
          </div>

          {/* --------------------------------------
              IDEAS FEED (Responsive)
          -------------------------------------- */}
          <div className="w-full lg:w-[60vw] h-[75vh] bg-violet-900 rounded-3xl overflow-y-auto p-6 flex flex-col items-center gap-6 scrollbar-hide m-4">

            {/* Header Bar */}
            <div className="w-full flex justify-between items-center px-4">
              <h2 className="text-white text-2xl font-semibold">
                Ideas from Developers
              </h2>

              <div className="flex items-center gap-4">
                <button
                  className="bg-purple-700 text-white px-4 py-2 rounded-2xl"
                  onClick={() => navigate("/create-idea")}
                >
                  Create Idea
                </button>

                <button
                  className="bg-purple-700 text-white px-4 py-2 rounded-2xl"
                  onClick={() => navigate("/my-ideas")}
                >
                  My Ideas
                </button>
              </div>
            </div>

            {/* Idea List */}
            {ideas.length === 0 ? (
              <p className="text-gray-300 mt-4">No ideas found</p>
            ) : (
              ideas.map((idea) => (
                <div
                  key={idea.ideaId}
                  className="w-[90%] bg-violet-950 rounded-2xl p-5 flex flex-col gap-4 shadow-lg"
                >
                  {/* Author Info */}
                  <div className="flex items-center gap-4">
                    <div className="h-14 w-14 rounded-full bg-purple-600 overflow-hidden">
                      <img
                        src={idea.authorProfile || "/assets/profile.png"}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div>
                      <h3 className="text-xl text-white font-semibold">
                        {idea.authorName}
                      </h3>
                      <p className="text-sm text-purple-300">
                        {Array.isArray(idea.authorSkills)
                          ? idea.authorSkills.join(", ")
                          : idea.authorSkills}
                      </p>
                    </div>
                  </div>

                  {/* Idea Content */}
                  <div>
                    <p className="text-fuchsia-300 font-semibold">
                      {idea.category}
                    </p>
                    <p className="text-white font-semibold mt-1">{idea.title}</p>
                    <p className="text-white text-sm mt-2">{idea.description}</p>
                  </div>

                  {/* Interested Button */}
                  <div className="flex justify-end">
                    <button className="bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-500 rounded-3xl px-4 py-2 text-white">
                      I'm Interested
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* --------------------------------------
              RIGHT CHAT (Desktop Only)
          -------------------------------------- */}
          <div className="hidden lg:flex w-[22vw] bg-violet-950 h-[50vh] rounded-3xl m-4"></div>
        </div>
      </div>

      {/* --------------------------------------
          FLOATING CHAT BUTTON (MOBILE)
      -------------------------------------- */}
      <button
        className="lg:hidden fixed bottom-6 right-6 bg-violet-900 text-white p-4 rounded-full text-2xl shadow-xl"
        onClick={() => setOpenChat(true)}
      >
        <FaComments />
      </button>

      {/* --------------------------------------
          MOBILE SLIDE-UP CHAT BOX
      -------------------------------------- */}
      {openChat && (
        <div className="fixed bottom-0 left-0 w-full h-[55vh] bg-violet-900 rounded-t-3xl p-4 shadow-2xl animate-slideUp z-50">
          <button
            className="text-white text-2xl absolute top-4 right-4"
            onClick={() => setOpenChat(false)}
          >
            <FaTimes />
          </button>

          <h2 className="text-white text-xl font-semibold mb-3">Messages</h2>
          <div className="text-gray-300 text-sm">Chat system coming soon…</div>
        </div>
      )}
    </div>
  );
};

export default Ideas_Page;
