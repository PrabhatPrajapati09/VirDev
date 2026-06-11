import { AiOutlineKubernetes, AiOutlineArrowRight, AiOutlineArrowLeft, AiOutlineCode, AiOutlineRocket } from "react-icons/ai";
import Navbar from "./Navbar";
import logo from "../assets/logo.svg";
import { NavLink } from "react-router-dom";

const Hero_section = () => {
  return (
    <div className="relative h-auto min-h-screen bg-slate-950 overflow-hidden selection:bg-fuchsia-500/30">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,_rgba(192,38,211,0.1),_transparent_50%)]"></div>
      <div className="absolute top-20 left-[10%] w-72 h-72 bg-fuchsia-600/10 rounded-full blur-[100px] animate-pulse"></div>

      <div className="relative z-50">
        <Navbar />
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center h-full px-6 md:px-16 pt-[12vh] pb-20 gap-16 max-w-7xl mx-auto">
        
        <div className="max-w-[600px] text-center md:text-left flex flex-col items-center md:items-start mt-12">
          <div className="flex items-center border border-fuchsia-500/30 bg-fuchsia-500/5 backdrop-blur-md rounded-full px-4 py-1.5 w-fit gap-2 font-medium text-fuchsia-400 mb-8">
            <AiOutlineKubernetes className="text-xl animate-spin-slow" />
            <span className="text-xs uppercase tracking-widest">Global Developer Nexus</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-4">
            Find your Perfect{" "}
            <span className="bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent bg-[length:300%_300%] animate-gradient">
              Virtual Dev Partner
            </span>
          </h1>


          <p className="text-lg md:text-xl text-slate-400 mb-10 leading-relaxed">
            VirDev connects developers based on skills, interests, and projects. Swipe, match, and build amazing things together.
          </p>

          <NavLink to="/login">
            <button className="group relative px-8 py-4 bg-white text-slate-950 rounded-2xl font-bold text-xl flex items-center gap-2 overflow-hidden transition-all hover:pr-10 active:scale-95">
              <span className="relative z-10">Get Started</span>
              <AiOutlineArrowRight className="relative z-10 transition-transform group-hover:translate-x-2" />
              <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-200 to-cyan-200 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>
          </NavLink>
        </div>

        <div className="relative h-[500px] w-full max-w-[500px] flex items-center justify-center">
          
        
          <div className="card1 absolute z-20 top-10 left-10 p-4 bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl animate-moveXYc1 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400">
               <AiOutlineCode size={24} />
            </div>
            <div className="text-left">
              <p className="text-white text-xs font-bold">React Specialist</p>
              <p className="text-slate-400 text-[10px]">Level 8 Match</p>
            </div>
          </div>

          <div className="card2 absolute z-20 top-1/2 right-[-50px] p-4 bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl animate-moveXYc2 flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-fuchsia-500/20 flex items-center justify-center text-fuchsia-400">
               <AiOutlineRocket size={24} />
            </div>
            <div className="text-left">
              <p className="text-white text-xs font-bold">AI Engineer</p>
              <p className="text-slate-400 text-[10px]">Level 9 Match</p>
            </div>
          </div>

          <div className="card3 absolute z-20 bottom-[-10px] left-10 p-4 bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl animate-moveXYc3 flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white text-[10px] font-bold">JD</div>
             <div className="text-left">
              <p className="text-white text-xs font-bold">UI Designer</p>
              <p className="text-slate-400 text-[10px]">Matched 2m ago</p>
            </div>
          </div>

          <div className="card4 relative w-[320px] bg-slate-900 rounded-[2.5rem] border border-white/10 p-6 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)] group transition-all duration-500 hover:-translate-y-2">
            <div className="relative w-full h-[200px] bg-slate-950 rounded-[2rem] mb-6 overflow-hidden flex items-center justify-center border border-white/5">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(192,38,211,0.2),_transparent_70%)]"></div>
              <img src={logo} alt="logo" className="w-16 relative z-10 drop-shadow-[0_0_15px_rgba(192,38,211,0.5)]" />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <div className="h-4 w-32 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-fuchsia-500 w-[70%]"></div>
                  </div>
                  <div className="h-3 w-20 bg-white/5 rounded-full"></div>
                </div>
                <div className="text-fuchsia-400 text-xs font-bold">98% Match</div>
              </div>

              <div className="flex gap-2">
                {['React', 'Tailwind', 'Node'].map(skill => (
                  <span key={skill} className="px-3 py-1 bg-white/5 rounded-full text-[10px] text-slate-300 border border-white/10">{skill}</span>
                ))}
              </div>

              <div className="flex justify-between items-center pt-2">
                <button className="p-3 bg-white/5 rounded-full text-slate-400 hover:text-white transition-colors">
                  <AiOutlineArrowLeft />
                </button>
                <button className="px-8 py-3 bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white rounded-full text-sm font-bold shadow-lg shadow-fuchsia-900/20">
                  Connect
                </button>
                <button className="p-3 bg-white/5 rounded-full text-slate-400 hover:text-white transition-colors">
                  <AiOutlineArrowRight />
                </button>
              </div>
            </div>
          </div>

          <div className="absolute inset-0 border border-white/5 rounded-full scale-125 pointer-events-none"></div>
          <div className="absolute inset-0 border border-white/5 rounded-full scale-150 pointer-events-none"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero_section;