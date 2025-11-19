import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/appContext";
import Home_Navbar from "./Home_Navbar";
import { FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Ideas_Page = () => {
    const { userData, backendUrl } = useContext(AppContext);
    const [ideas, setIdeas] = useState([]);
    const navigate = useNavigate();

    const getIdeas = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/user/ideas`, {
                withCredentials: true
            });

            if (data.success) {
                setIdeas(data.ideas);
            } else {
                console.log("Failed:", data.message);
            }
        } catch (err) {
            console.error("Ideas fetch error:", err);
        }
    };

    useEffect(() => {
        getIdeas();
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
                            {Array.isArray(userData?.skills)
                                ? userData.skills.join(", ")
                                : userData?.skills}
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

                {/* CENTER IDEAS FEED */}
                <div className="ideas-feed w-[60vw] h-[70vh] bg-violet-900 rounded-3xl overflow-y-auto p-6 flex flex-col items-center gap-6 scrollbar-hide m-4">

                    <div className="w-full flex justify-between items-center px-4">
                        <h2 className="text-white text-2xl font-semibold">Ideas from Developers</h2>

                        <div className="flex items-center gap-4">
                            <button
                                className="bg-purple-700 text-white px-4 py-2 rounded-2xl"
                                onClick={() => navigate("/create-idea")}
                            >
                                Create Idea
                            </button>

                            <button
                                className="bg-purple-700 px-4 py-2 rounded-2xl text-white hover:bg-purple-800"
                                onClick={() => navigate("/my-ideas")}
                            >
                                My Ideas
                            </button>
                        </div>
                    </div>

                    {ideas.length === 0 ? (
                        <p className="text-gray-300 text-center mt-4">No ideas found</p>
                    ) : (
                        ideas.map((idea) => (
                            <div
                                key={idea.ideaId}
                                className="idea-card w-[80%] bg-violet-950 rounded-2xl p-5 flex flex-col gap-4 shadow-lg"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="h-14 w-14 rounded-full bg-purple-500 overflow-hidden">
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

                                <div>
                                    <p className="text-fuchsia-300 font-semibold">{idea.category}</p>
                                    <p className="text-white text-sm mt-2">{idea.title}</p>
                                    <p className="text-white text-sm mt-2">{idea.description}</p>
                                </div>

                                <div className="flex justify-end mt-3">
                                    <button className="bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-500 rounded-3xl px-4 py-2 text-white font-semibold">
                                        I'm Interested
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* RIGHT EMPTY CHAT SECTION */}
                <div className="chat w-[22vw] bg-violet-950 h-[50vh] rounded-3xl m-4"></div>
            </div>
        </div>
    );
};

export default Ideas_Page;
