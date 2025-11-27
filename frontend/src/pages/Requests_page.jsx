import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/appContext";
import Home_Navbar from "./Home_Navbar";
import { FaComments, FaTimes } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";

const Requests_Page = () => {
  const {
    userData,
    backendUrl,
    receivedRequests,
    sentRequests,
    getReceivedRequests,
    getSentRequests,
  } = useContext(AppContext);

  const [openChat, setOpenChat] = useState(false);

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

  return (
    <div className="min-h-screen bg-slate-950">
      <Home_Navbar />

      <div className="pt-[15vh] w-full flex justify-center">
        <div className="w-screen flex mx-0">

          {/* -------------------
              LEFT PROFILE (Desktop only)
          -------------------- */}
          <div className="hidden lg:flex w-[18vw] h-[50vh] bg-violet-950 rounded-3xl p-3 flex-col items-center justify-between text-white m-4">
            <div className="w-screen relative mt-2 flex justify-center">
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

            <p className="text-center text-white/80 text-sm px-3">
              {userData?.about}
            </p>

            <button className="text-sm px-3 py-1 bg-purple-600 rounded-md">
              {userData?.email}
            </button>
          </div>

          {/* ------------------------
              CENTER REQUESTS FEED
          ------------------------- */}
          <div className="w-full lg:w-[70vw] bg-transparent h-[75vh] rounded-3xl overflow-y-auto flex flex-col items-center gap-8 scrollbar-hide m-4">

            {/* RECEIVED */}
            <h2 className="text-white text-2xl font-semibold">Received Requests</h2>

            {receivedRequests.length === 0 ? (
              <p className="text-gray-300">No incoming requests</p>
            ) : (
              receivedRequests.map((req) => (
                <div
                  key={req._id}
                  className="w-[90%] bg-violet-950 rounded-2xl p-5 flex justify-between gap-6"
                >
                  <div className="flex gap-4 w-[75%]">
                    <div className="h-20 w-20 rounded-full overflow-hidden bg-fuchsia-500">
                      <img
                        src={req.senderId?.profilePic || "/assets/profile.png"}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div>
                      <p className="text-2xl font-semibold text-white">
                        {req.senderId.firstname} {req.senderId.lastname}
                      </p>
                      <p className="text-fuchsia-200 font-semibold">
                        {req.senderId.skills?.join(", ")}
                      </p>
                      <p className="text-gray-300 text-sm">{req.senderId.about}</p>
                      <p className="text-gray-300 text-sm">{req.message}</p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 w-[25%]">
                    <button
                      className="bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-500 text-white rounded-3xl py-2"
                      onClick={() => rejectRequest(req._id)}
                    >
                      Reject
                    </button>
                    <button
                      className="bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-500 text-white rounded-3xl py-2"
                      onClick={() => acceptRequest(req._id)}
                    >
                      Accept
                    </button>
                  </div>
                </div>
              ))
            )}

            {/* SENT */}
            <h2 className="text-white text-2xl font-semibold mt-4">
              Sent Requests
            </h2>

            {sentRequests.length === 0 ? (
              <p className="text-gray-300">No pending sent requests</p>
            ) : (
              sentRequests.map((req) => (
                <div
                  key={req._id}
                  className="w-[90%] bg-violet-950 rounded-2xl p-5 flex justify-between gap-6 opacity-75"
                >
                  <div className="flex gap-4 w-[75%]">
                    <div className="h-20 w-20 rounded-full overflow-hidden bg-purple-700">
                      <img
                        src={req.receiverId?.profilePic || "/assets/profile.png"}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div>
                      <p className="text-2xl font-semibold text-white">
                        {req.receiverId.firstname} {req.receiverId.lastname}
                      </p>
                      <p className="text-purple-300 font-semibold">
                        {req.receiverId.skills?.join(", ")}
                      </p>
                      <p className="text-gray-300 text-sm">{req.receiverId.about}</p>
                      <p className="text-gray-300 text-sm">{req.message}</p>
                    </div>
                  </div>

                  <div className="flex flex-col justify-center w-[25%]">
                    <p className="text-center text-yellow-300 font-semibold">
                      Pending
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* -------------------
              RIGHT CHAT (Desktop only)
          ------------------- */}
          <div className="hidden lg:flex w-[22vw] bg-violet-950 h-[50vh] rounded-3xl m-4"></div>
        </div>
      </div>

      {/* FLOATING BUTTON (Mobile only) */}
      <button
        className="lg:hidden fixed bottom-6 right-6 bg-violet-900 text-white p-4 rounded-full text-2xl shadow-xl"
        onClick={() => setOpenChat(true)}
      >
        <FaComments />
      </button>

      {/* SLIDE-UP CHAT (Mobile only) */}
      {openChat && (
        <div className="fixed bottom-0 left-0 w-full h-[50vh] bg-violet-900 rounded-t-3xl p-4 shadow-2xl animate-slideUp z-50">
          <button
            className="text-white text-2xl absolute top-4 right-4"
            onClick={() => setOpenChat(false)}
          >
            <FaTimes />
          </button>

          <h2 className="text-white text-xl font-semibold mb-3">Messages</h2>

          <div className="text-gray-300 text-sm">
            Chat UI coming soon...
          </div>
        </div>
      )}
    </div>
  );
};

export default Requests_Page;
