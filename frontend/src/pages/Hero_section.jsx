import { AiOutlineKubernetes, AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";
import Navbar from "./Navbar";
import logo from '../assets/logo.svg';
import { NavLink } from "react-router-dom";

const Hero_section = () => {
    return (
        <div className="h-auto min-h-screen bg-slate-950">
            {/* Navbar */}
            <div className="relative z-50">
                <Navbar />
            </div>

            {/* Main Content */}
            <div className="flex flex-col md:flex-row justify-between items-center h-full px-6 md:px-10 pt-[12vh] gap-10">
                
                {/* Left content */}
                <div className="max-w-[600px] text-center md:text-left flex flex-col items-center md:items-start">
                    <div className="globalConnection flex items-center border-2 border-pink-500 rounded-full px-3 py-1 w-fit gap-2 font-semibold text-fuchsia-500 mb-6">
                        <AiOutlineKubernetes className="text-xl" />
                        <span className="text-sm">Connect with developers around the world</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-4">
                        Find your Perfect{" "}
                        <span className="bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent bg-[length:300%_300%] animate-gradient">
                            Virtual Dev Partner
                        </span>
                    </h1>

                    <p className="text-lg md:text-2xl text-white mb-6 w-full md:w-[90%]">
                        VirDev connects developers based on skills, interests, and projects. Swipe, match, and build amazing things together.
                    </p>

                    <NavLink to="/login">
                        <button className="getStarted rounded-xl px-6 py-4 text-white text-lg md:text-2xl flex items-center gap-2 bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-500 hover:scale-[1.1] transition-transform hover:animate-sweep">
                            Get Started <AiOutlineArrowRight />
                        </button>
                    </NavLink>
                </div>

                {/* Right Cards */}
                <div className="hovercards relative h-[60vh] md:h-[80vh] w-full md:w-[35vw] flex items-center justify-center">
                    <div className="card1 bg-violet-500/70 rounded-2xl h-[400px] md:h-[486px] w-[260px] md:w-[352px] animate-moveXYc1 absolute">
                        <div className="box h-[120px] md:h-[150px] w-[240px] md:w-[328px] m-3 bg-violet-500 rounded-2xl"></div>
                    </div>
                    <div className="card2 bg-cyan-700/70 rounded-2xl h-[400px] md:h-[486px] w-[260px] md:w-[352px] animate-moveXYc2 absolute">
                        <div className="box h-[120px] md:h-[150px] w-[240px] md:w-[328px] m-3 bg-cyan-500 rounded-2xl"></div>
                    </div>
                    <div className="card3 bg-blue-700/70 rounded-2xl h-[400px] md:h-[486px] w-[260px] md:w-[352px] animate-moveXYc3 absolute">
                        <div className="box h-[120px] md:h-[150px] w-[240px] md:w-[328px] m-3 bg-blue-500 rounded-2xl"></div>
                    </div>

                    {/* Top visible card */}
                    <div className="card4 bg-slate-700/80 rounded-2xl h-[400px] md:h-[486px] w-[260px] md:w-[352px] rotate-[-4deg] hover:rotate-0 hover:scale-[1.1] duration-500 ease-in-out relative z-10 p-3">
                        <div className="box h-[120px] md:h-[150px] w-[240px] md:w-[328px] diagonal-gradient rounded-2xl mb-3 flex justify-center items-center text-3xl md:text-4xl text-white">
                            <span className="w-10 text-fuchsia-500">
                                <img src={logo} alt="logo" />
                            </span>
                        </div>
                        <button className="h-[40px] w-[160px] md:w-[180px] font-semibold rounded-xl bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-500 text-white mb-3">
                            Find Your Partner
                        </button>
                        <div className="info h-[12px] md:h-[15px] w-[200px] md:w-[230px] bg-slate-400 rounded-2xl mb-2"></div>
                        <div className="info h-[10px] md:h-[13px] w-[150px] md:w-[180px] bg-slate-400 rounded-2xl mb-4"></div>

                        <div className="navigate flex justify-between">
                            <div className="prev h-[45px] w-[45px] md:h-[50px] md:w-[50px] bg-fuchsia-500/40 opacity-40 rounded-full flex justify-center items-center text-xl md:text-2xl text-fuchsia-500">
                                <AiOutlineArrowLeft />
                            </div>
                            <div className="next h-[45px] w-[45px] md:h-[50px] md:w-[50px] bg-cyan-500/40 rounded-full flex justify-center items-center text-xl md:text-2xl text-cyan-500">
                                <AiOutlineArrowRight />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero_section;
