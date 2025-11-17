import React, { useContext, useEffect } from 'react'
import { AppContext } from '../context/appContext';
import { FaTwitter, FaInstagram, FaGithub } from 'react-icons/fa';
import Home_Navbar from './Home_Navbar';
import axios from "axios";
import { toast } from 'react-toastify';

const Requests_page = () => {

    const {
        userData,
        backendUrl,
        receivedRequests,
        sentRequests,
        getReceivedRequests,
        getSentRequests,
    } = useContext(AppContext);

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
        } catch (err) {
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
        } catch (err) {
            toast.error("Error rejecting request");
        }
    };

    return (
        <div className="h-screen bg-slate-950">
            <Home_Navbar />

            <div className="w-screen pt-[15vh] flex justify-center gap-10">

                {/* LEFT PROFILE */}
                <div className="profile w-[18vw] h-[50vh] bg-violet-950 rounded-3xl p-3 flex flex-col items-center justify-between text-white m-4 relative">

                    <div className="w-full h-[10vh] relative mt-2">
                        <div className="w-20 h-20 rounded-full border-2 border-yellow-400 p-0.5 absolute top-8 right-[35%]">
                            <img
                                src={userData?.profilePic || "/assets/profile.png"}
                                className="w-full h-full object-cover rounded-full"
                            />
                        </div>
                    </div>

                    <div className="text-center leading-tight">
                        <h2 className="text-2xl font-semibold">{userData?.name || "Hello Dev"}</h2>
                        <p className="text-xl text-purple-300">
                            {Array.isArray(userData?.skills) ? userData.skills.join(", ") : userData?.skills}
                        </p>
                    </div>

                    <p className="text-l text-center px-2 text-white/80">
                        {userData?.about}
                    </p>

                    <button className="text-sm px-2 py-1 bg-purple-600 hover:bg-purple-700 transition rounded-md">
                        {userData?.email}
                    </button>

                    <div className="flex justify-center gap-4 text-sm text-white/60">
                        <FaTwitter />
                        <FaInstagram />
                        <FaGithub />
                    </div>
                </div>

                {/* REQUESTS PANEL */}
                <div className="requests w-[60vw] h-[70vh] rounded-3xl flex flex-col items-center py-6 overflow-y-auto gap-6">

                    {/* RECEIVED REQUESTS */}
                    <h2 className="text-white text-2xl font-semibold mb-2">Received Requests</h2>

                    {receivedRequests.length === 0 ? (
                        <p className="text-gray-300">No incoming requests</p>
                    ) : (
                        receivedRequests.map((req) => (
                            <div
                                key={req._id}
                                className="request w-[80%] bg-violet-950 rounded-2xl m-3 p-4 flex items-center justify-between gap-6"
                            >
                                <div className="flex items-center gap-4 w-[75%]">
                                    <div className="h-20 w-20 rounded-full bg-fuchsia-400 overflow-hidden">
                                        <img src={req.senderId.profilePic || "/assets/profile.png"} className="w-full h-full object-cover" />
                                    </div>

                                    <div>
                                        <p className="text-2xl text-white font-semibold">
                                            {req.senderId.firstname} {req.senderId.lastname}
                                        </p>
                                        <p className="text-lg text-fuchsia-200 font-semibold">
                                            {Array.isArray(req.senderId.skills)
                                                ? req.senderId.skills.join(", ")
                                                : req.senderId.skills}
                                        </p>
                                        <p className="text-sm text-gray-300 w-[90%]">
                                            {req.senderId.about}
                                        </p>
                                        <p className="text-sm text-gray-300">
                                            {req.message}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-3 w-[25%]">
                                    <button
                                        className="bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-500 rounded-3xl py-2 text-white font-semibold"
                                        onClick={() => rejectRequest(req._id)}
                                    >
                                        Reject
                                    </button>
                                    <button
                                        className="bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-500 rounded-3xl py-2 text-white font-semibold"
                                        onClick={() => acceptRequest(req._id)}
                                    >
                                        Accept
                                    </button>
                                </div>
                            </div>
                        ))
                    )}

                    {/* SENT REQUESTS */}
                    <h2 className="text-white text-2xl font-semibold mt-6">Sent Requests</h2>

                    {sentRequests.length === 0 ? (
                        <p className="text-gray-300">No pending sent requests</p>
                    ) : (
                        sentRequests.map((req) => (
                            <div
                                key={req._id}
                                className="request w-[80%] bg-violet-950 rounded-2xl m-3 p-4 flex items-center justify-between gap-6 opacity-75"
                            >
                                <div className="flex items-center gap-4 w-[75%]">
                                    <div className="h-20 w-20 rounded-full bg-purple-600 overflow-hidden">
                                        <img src={req.receiverId.profilePic || "/assets/profile.png"} className="w-full h-full object-cover" />
                                    </div>

                                    <div>
                                        <p className="text-2xl text-white font-semibold">
                                            {req.receiverId.firstname} {req.receiverId.lastname}
                                        </p>
                                        <p className="text-lg text-purple-300 font-semibold">
                                            {Array.isArray(req.receiverId.skills)
                                                ? req.receiverId.skills.join(", ")
                                                : req.receiverId.skills}
                                        </p>
                                        <p className="text-sm text-gray-300 w-[90%]">
                                            {req.receiverId.about}
                                        </p>
                                        <p className="text-sm text-gray-300">
                                            {req.message}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-3 w-[25%]">
                                    <p className="text-center text-yellow-300 font-semibold">
                                        Pending
                                    </p>
                                </div>
                            </div>
                        ))
                    )}

                </div>

                {/* RIGHT CHAT */}
                <div className='chat w-[22vw] bg-violet-950 h-[50vh] rounded-3xl m-4'></div>
            </div>

        </div>
    );
};

export default Requests_page;
