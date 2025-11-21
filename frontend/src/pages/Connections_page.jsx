import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/appContext";
import Home_Navbar from "./Home_Navbar";
import { FaComments, FaTimes } from "react-icons/fa";

const Connections_Page = () => {
  const { userData, connections, getConnections } = useContext(AppContext);

  const [openChat, setOpenChat] = useState(false);

  useEffect(() => {
    getConnections();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950">
      <Home_Navbar />

      <div className="pt-[15vh] w-full flex justify-center px-4">
        <div className="w-full max-w-[1400px] flex gap-10">

          {/* ------------------------------
              LEFT PROFILE (Desktop Only)
          ------------------------------ */}
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

          {/* -----------------------------------
              CONNECTIONS LIST (Responsive)
          ----------------------------------- */}
          <div className="w-full lg:w-[60vw] h-[75vh] rounded-3xl overflow-y-auto flex flex-col items-center gap-6 p-6 scrollbar-hide">

            <h2 className="text-white text-2xl font-semibold">Connections</h2>

            {connections.length === 0 ? (
              <p className="text-gray-300 text-lg">No connections yet</p>
            ) : (
              connections.map((user, index) => (
                <div
                  key={index}
                  className="w-[90%] bg-violet-950 rounded-2xl p-5 flex justify-between gap-6"
                >
                  <div className="flex gap-4 w-[75%]">
                    <div className="h-20 w-20 rounded-full bg-fuchsia-500 overflow-hidden">
                      <img
                        src={user.profilePic || "/assets/profile.png"}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div>
                      <p className="text-2xl font-semibold text-white">
                        {user.firstname} {user.lastname}
                      </p>
                      <p className="text-fuchsia-200 font-semibold">
                        {Array.isArray(user.skills)
                          ? user.skills.join(", ")
                          : user.skills}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col justify-center w-[25%]">
                    <button className="bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-500 text-white rounded-3xl py-2">
                      Message
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* -------------------------
              RIGHT CHAT (Desktop Only)
          ------------------------- */}
          <div className="hidden lg:flex w-[22vw] bg-violet-950 h-[50vh] rounded-3xl m-4"></div>
        </div>
      </div>

      {/* -------------------------
          Floating Chat Button (Mobile)
      ------------------------- */}
      <button
        className="lg:hidden fixed bottom-6 right-6 bg-violet-900 text-white p-4 rounded-full text-2xl shadow-xl"
        onClick={() => setOpenChat(true)}
      >
        <FaComments />
      </button>

      {/* -------------------------
          Slide-Up Chat (Mobile)
      ------------------------- */}
      {openChat && (
        <div className="fixed bottom-0 left-0 w-full h-[55vh] bg-violet-900 rounded-t-3xl p-4 shadow-2xl animate-slideUp z-50">
          <button
            className="text-white text-2xl absolute top-4 right-4"
            onClick={() => setOpenChat(false)}
          >
            <FaTimes />
          </button>

          <h2 className="text-white text-xl font-semibold mb-3">Messages</h2>
          <div className="text-gray-300 text-sm">
            Chat system coming soon...
          </div>
        </div>
      )}
    </div>
  );
};

export default Connections_Page;
