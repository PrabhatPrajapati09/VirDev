import { AiOutlineKubernetes, AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai"
import Navbar from "./Navbar"
import logo from '../assets/logo.svg'
import { NavLink } from "react-router-dom"

const Hero_section = () => {
    return (
        <div className="h-screen bg-gradient-to-r from-rose-500/50 via-transparent to-blue-600/50 ">
            <div className=' relative z-50'>
                <Navbar />
            </div>
            <div className="flex justify-between items-center h-full px-10 flex-wrap">
                {/* Left content */}
                <div className="max-w-[50%]">
                    <div className="globalConnection flex items-center border-2 border-pink-500 rounded-full px-2 py-1 w-fit gap-2 font-semibold text-fuchsia-500 mt-[18vh] ml-3">
                        <AiOutlineKubernetes className="text-xl" />
                        <span className="text-sm">Connect with developers around the world</span>
                    </div>

                    <h1 className="text-6xl font-bold text-white p-3 leading-tight">
                        Find your Perfect{" "}
                        <span className="bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent bg-[length:300%_300%] animate-gradient">
                            Virtual Dev Partner
                        </span>
                    </h1>

                    <p className="text-2xl text-white p-3 w-[90%]">
                        VirDev connects developers based on skills, interests, and projects. Swipe, match, and build amazing things together.
                    </p>

                    <NavLink to="/login">

                    <button className="getStarted rounded-xl p-7 text-white m-5 text-2xl flex items-center gap-2 bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-500 hover:scale-[1.1] transition-transform hover:animate-sweep">
                        Get Started <AiOutlineArrowRight />
                    </button>
                    </NavLink>
                </div>

                {/* Right Cards */}
                <div className="hovercards h-[80vh] w-[35vw] flex items-center justify-center">
                    <div className="card1 bg-violet-500/70 rounded-2xl h-[486px] w-[342px] animate-moveXYc1 absolute">
                        <div className="box h-[150px] w-[321px] m-3 bg-violet-500 rounded-2xl"></div>
                    </div>
                    <div className="card2 bg-cyan-700/70 rounded-2xl h-[486px] w-[342px] animate-moveXYc2 absolute">
                        <div className="box h-[150px] w-[321px] m-3 bg-cyan-500 rounded-2xl"></div>
                    </div>
                    <div className="card3 bg-blue-700/70 rounded-2xl h-[486px] w-[342px] animate-moveXYc3 absolute">
                        <div className="box h-[150px] w-[321px] m-3 bg-blue-500 rounded-2xl"></div>
                    </div>

                    {/* Top visible card */}
                    <div className="card4 bg-slate-700/80 rounded-2xl h-[486px] w-[342px] rotate-[-4deg] hover:rotate-0 duration-500 ease-in-out relative z-10 p-3">
                        <div className="box h-[150px] w-[318px] diagonal-gradient  rounded-2xl mb-3 flex justify-center items-center text-4xl text-white">
                            <span className=" w-10 text-fuchsia-500">
                                <img src={logo} />
                            </span>
                        </div>
                        <button className="h-[40px] w-[180px] font-semibold rounded-xl bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-500 text-white mb-3">
                            Find Your Partner
                        </button>
                        <div className="info h-[15px] w-[230px] bg-slate-400 rounded-2xl mb-2"></div>
                        <div className="info h-[13px] w-[180px] bg-slate-400 rounded-2xl mb-4"></div>

                        <div className="navigate flex justify-between">
                            <div className="prev h-[50px] w-[50px] bg-fuchsia-500/40 opacity-40 rounded-full flex justify-center items-center text-2xl text-fuchsia-500">
                                <AiOutlineArrowLeft />
                            </div>
                            <div className="next h-[50px] w-[50px] bg-cyan-500/40 rounded-full flex justify-center items-center text-2xl text-cyan-500">
                                <AiOutlineArrowRight />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero_section
