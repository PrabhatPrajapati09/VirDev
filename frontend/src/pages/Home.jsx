import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/appContext";
import { FaComments, FaTimes } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";

const Home = () => {
  const { userData, suggestions, getSuggestions, isLoggedin, backendUrl } =
    useContext(AppContext);

  const [index, setIndex] = useState(0);
  const [openChat, setOpenChat] = useState(false); // mobile chat open/close

  useEffect(() => {
    if (isLoggedin) {
      getSuggestions();
      setIndex(0);
    }
  }, [isLoggedin]);

  const current = suggestions[index] || null;

  const next = () => {
    setIndex((prev) => (prev + 1 < suggestions.length ? prev + 1 : 0));
  };

  const sendConnection = async (receiverId, message) => {
    next();

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/connections/send/${receiverId}`,
        { message },
        { withCredentials: true }
      );

      if (data.success) {
        toast.success("Request sent");
        getSuggestions();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Error sending request");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-[15vh] flex justify-center">

      {/* ===== DESKTOP LAYOUT WRAPPER ===== */}
      <div className="w-full flex justify-center gap-10 px-4">

        {/* LEFT PROFILE (hidden on mobile) */}
        <div className="hidden lg:flex w-[20vw] h-[50vh] bg-violet-950 rounded-3xl p-3 flex-col items-center justify-between text-white m-4">
          <img
            src={userData?.profilePic || "/assets/profile.png"}
            className="w-24 h-24 rounded-full border-2 border-yellow-400 object-cover"
          />
          <div className="text-center">
            <h2 className="text-2xl font-semibold">{userData?.name}</h2>
            <p className="text-purple-300 text-sm">
              {Array.isArray(userData?.skills)
                ? userData.skills.join(", ")
                : userData?.skills}
            </p>
          </div>
          <p className="text-center text-white/80 text-sm px-3">
            {userData?.about}
          </p>
        </div>

        {/* MAIN SUGGESTIONS CARD */}
        <div className="w-full lg:w-[60vw] h-[75vh] bg-transparent flex justify-center m-4">
          <div className="w-full sm:w-[70%] h-[70%] bg-violet-950 rounded-2xl p-5 flex flex-col items-center gap-5">

            {current ? (
              <>
                {/* PROFILE IMAGE */}
                <div className="h-32 w-32 rounded-full overflow-hidden bg-fuchsia-400">
                  <img
                    src={current.profilePic || "/assets/profile.png"}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* NAME */}
                <div className="text-white text-2xl font-semibold text-center">
                  {current.username}
                </div>

                {/* SKILLS */}
                <div className="text-fuchsia-200 text-center text-sm">
                  {Array.isArray(current.skills)
                    ? current.skills.join(" • ")
                    : current.skills}
                </div>

                {/* ABOUT */}
                <p className="text-white text-center text-sm px-3">
                  {current.about || "No bio available."}
                </p>

                {/* BUTTONS */}
                <div className="flex flex-wrap gap-4 justify-center mt-3">

                  <button
                    className="bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-500 rounded-3xl px-6 py-2 text-white"
                    onClick={next}
                  >
                    Ignore
                  </button>

                  <button
                    className="bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-500 rounded-3xl px-6 py-2 text-white"
                    onClick={() =>
                      sendConnection(
                        current._id,
                        "I like your profile and I would like to connect with you."
                      )
                    }
                  >
                    Connect
                  </button>

                  <button
                    className="bg-gradient-to-r from-purple-500 via-cyan-500 to-blue-500 rounded-3xl px-6 py-2 text-white"
                    onClick={() =>
                      sendConnection(
                        current._id,
                        "I liked your idea and I would like to be a part of it in development."
                      )
                    }
                  >
                    Interested in Idea
                  </button>

                </div>
              </>
            ) : (
              <p className="text-white text-lg">No Suggestions Found</p>
            )}
          </div>
        </div>

        {/* RIGHT CHAT BOX (hidden on mobile) */}
        <div className="hidden lg:flex w-[22vw] bg-violet-950 h-[50vh] rounded-3xl m-4"></div>
      </div>

      {/* ========== FLOATING MESSAGE BUTTON (MOBILE ONLY) ========== */}
      <button
        className="lg:hidden fixed bottom-6 right-6 bg-violet-900 text-white p-4 rounded-full shadow-lg text-2xl"
        onClick={() => setOpenChat(true)}
      >
        <FaComments />
      </button>

      {/* ===== MOBILE CHAT SLIDE-UP ===== */}
      {openChat && (
        <div className="lg:hidden fixed bottom-0 left-0 w-full h-[50vh] bg-violet-900 rounded-t-3xl p-4 shadow-2xl z-50 animate-slideUp">

          <button
            className="text-white text-2xl absolute top-4 right-4"
            onClick={() => setOpenChat(false)}
          >
            <FaTimes />
          </button>

          <h2 className="text-white text-xl font-semibold mb-3">Messages</h2>

          <div className="text-gray-300 text-sm">
            {/* your chat UI here */}
            Chat UI Coming Soon...
          </div>

        </div>
      )}
    </div>
  );
};

export default Home;
