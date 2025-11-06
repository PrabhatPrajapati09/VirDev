import React from 'react'
import { AppContext } from '../context/appContext';
import { useContext } from 'react'
import logo from '../assets/logo.svg'
import { FaTwitter, FaInstagram, FaGithub } from 'react-icons/fa';
import Home_Navbar from './Home_Navbar';

const Requests_page = () => {

    const { userData } = useContext(AppContext);

    return (
        <div className="h-screen bg-slate-950">

            <Home_Navbar />
            <div className="w-screen pt-[15vh] flex justify-center gap-10">
                <div className="profile w-[18vw] h-[50vh] bg-violet-950 rounded-3xl p-3 flex flex-col items-center justify-between text-white m-4 relative">

                    {/* Profile Image */}
                    <div className="w-full h-[10vh] relative mt-2">

                        <div className="w-6 h-6 rounded-full border-2 border-yellow-400 p-0.5 absolute top-0 left-0">
                            <span className="text-pink-600">
                                <img src={logo} />
                            </span>
                        </div>
                        <div className="w-20 h-20 rounded-full border-2 border-yellow-400 p-0.5 absolute top-8 right-[35%]">
                            <img
                                src="/assets/profile.png" // Replace with actual path
                                alt="Profile"
                                className="w-full h-full object-cover rounded-full"
                            />
                        </div>
                    </div>

                    {/* Name & Role */}
                    <div className="text-center leading-tight">
                        <h2 className="text-2xl font-semibold">{userData ? userData.name : "Hello Dev"}</h2>
                        <p className="text-xl text-purple-300">Web Developer</p>
                    </div>

                    {/* Short Bio */}
                    <p className="text-l text-center px-2 text-white/80">
                        Uses <span className="text-yellow-400">Bootstrap</span> & <span className="text-yellow-400">Laravel</span>. Loves design via Figma. Lorem ipsum dolor sit amet.
                    </p>

                    {/* Email Button */}
                    <button className="text-sm px-2 py-1 bg-purple-600 hover:bg-purple-700 transition rounded-md">
                        joeylenerivera@gmail.com
                    </button>

                    {/* Social Icons */}
                    <div className="flex justify-center gap-4 text-sm text-white/60">
                        <FaTwitter />
                        <FaInstagram />
                        <FaGithub />
                    </div>

                </div>

                <div className="requests w-[60vw] h-[70vh] rounded-3xl flex justify-center items-start py-6 overflow-y-auto">
                    <div className="request w-[80%] bg-violet-950 rounded-2xl m-3 p-4 flex items-center justify-between gap-6">

                        {/* Left Section: Profile + Info */}
                        <div className="flex items-center gap-4 w-[75%]">

                            {/* Profile Image */}
                            <div className="h-20 w-20 rounded-full bg-fuchsia-400 shrink-0"></div>

                            {/* Info */}
                            <div className="flex flex-col justify-center">
                                <p className="text-2xl text-white font-semibold leading-tight">
                                    Joeylene Rivera
                                </p>
                                <p className="text-lg text-fuchsia-200 font-semibold">
                                    Web Developer
                                </p>
                                <p className="text-sm text-gray-300 w-[90%]">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                    Voluptatum corrupti quisquam et placeat fuga veritatis?
                                </p>
                            </div>

                        </div>

                        {/* Buttons Section */}
                        <div className="flex flex-col gap-3 w-[25%] shrink-0">
                            <button className="bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-500 rounded-3xl py-2 text-white font-semibold">
                                Reject
                            </button>
                            <button className="bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-500 rounded-3xl py-2 text-white font-semibold">
                                Accept
                            </button>
                        </div>
                    </div>
                </div>


                <div className='chat w-[22vw] bg-yellow-300 h-[50vh] rounded-3xl m-4'></div>
            </div>


        </div>
    )
}

export default Requests_page
