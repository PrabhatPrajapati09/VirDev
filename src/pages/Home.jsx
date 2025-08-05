import React from 'react'
import logo from '../assets/logo.svg'
import { FaTwitter, FaInstagram, FaGithub } from 'react-icons/fa'

const Home = () => {
    return (
        <div className="h-screen bg-black">
            <div className="h-screen bg-gradient-to-r from-rose-500/50 via-transparent to-blue-600/50">
                <div className="w-screen pt-[15vh] flex justify-center items-center gap-10">
                    <div className="profile w-[18vw] h-[50vh] diagonal-gradient rounded-3xl p-3 flex flex-col items-center justify-between text-white m-4">

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
                            <h2 className="text-2xl font-semibold">Joeylene Rivera</h2>
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

                        {/* Yellow Accent Corners */}
                        <div className="absolute bottom-0 left-0 w-3 h-12 bg-yellow-400 rounded-tr-2xl"></div>
                        <div className="absolute bottom-0 right-0 w-3 h-12 bg-yellow-400 rounded-tl-2xl"></div>
                        <div className="absolute bottom-0 w-full h-2 bg-yellow-400 rounded-tl-2xl"></div>

                    </div>

                    <div className='feed w-[60vw] bg-blue-300 h-[50vh] rounded-3xl'></div>
                    <div className='chat w-[22vw] bg-yellow-300 h-[50vh] rounded-3xl m-4'></div>
                </div>


            </div>
        </div>
    )
}
export default Home
