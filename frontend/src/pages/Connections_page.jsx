import React, { useContext, useEffect } from 'react'
import { AppContext } from '../context/appContext';
import Home_Navbar from './Home_Navbar';
import { FaTwitter, FaInstagram, FaGithub } from 'react-icons/fa';

const Connections_page = () => {

    const { userData, connections, getConnections } = useContext(AppContext);

    useEffect(() => {
        getConnections();
    }, []);

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
                        <h2 className="text-2xl font-semibold">{userData?.name}</h2>
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

                {/* CONNECTIONS LIST */}
                <div className="requests w-[60vw] h-[70vh] rounded-3xl flex justify-center items-start py-6 overflow-y-auto">

                    {connections.length === 0 ? (
                        <p className="text-white text-xl">No connections yet</p>
                    ) : (
                        connections.map((user, index) => (
                            <div
                                key={index}
                                className="request w-[80%] bg-violet-950 rounded-2xl m-3 p-4 flex items-center justify-between gap-6"
                            >
                                <div className="flex items-center gap-4 w-[75%]">

                                    <div className="h-20 w-20 rounded-full bg-fuchsia-400 overflow-hidden shrink-0">
                                        <img src={user.profilePic || "/assets/profile.png"} className="w-full h-full object-cover" />
                                    </div>

                                    <div className="flex flex-col">
                                        <p className="text-2xl text-white font-semibold">
                                            {user.firstname} {user.lastname}
                                        </p>
                                        <p className="text-lg text-fuchsia-200 font-semibold">
                                            {Array.isArray(user.skills) ? user.skills.join(", ") : user.skills}
                                        </p>
                                    </div>

                                </div>

                                <div className="flex flex-col gap-3 w-[25%]">
                                    <button className="bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-500 rounded-3xl py-2 text-white font-semibold">
                                        Message
                                    </button>
                                </div>
                            </div>
                        ))
                    )}

                </div>

                {/* RIGHT CHAT */}
                <div className='chat w-[22vw] bg-violet-950 h-[50vh] rounded-3xl m-4'></div>

            </div>

        </div>
    )
}

export default Connections_page;
