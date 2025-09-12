import { useEffect, useState } from "react";
import { AiOutlineApartment, AiOutlineRuby, AiOutlineSolution } from "react-icons/ai";
import { BsSearchHeart, BsBagCheck } from "react-icons/bs";
import { FaCommentDots } from "react-icons/fa";

const steps = [
  { id: 1, title: "Smart Matching", desc: "Algorithmically match you with developers based on your skills, interests, and projects.", icon: <BsSearchHeart /> },
  { id: 2, title: "Global Community", desc: "Connect with developers from around the world, building amazing things together.", icon: <AiOutlineApartment /> },
  { id: 3, title: "Skill Matching", desc: "Share your skills and interests with developers to find the perfect match.", icon: <AiOutlineRuby /> },
  { id: 4, title: "Project Collaboration", desc: "Find developers who share your interests and collaborate on projects.", icon: <AiOutlineSolution /> },
  { id: 5, title: "Seamless Communication", desc: "Easily communicate with developers, share ideas, and collaborate on projects.", icon: <FaCommentDots /> },
  { id: 6, title: "Job Opportunities", desc: "Discover job opportunities and connect with developers who are looking for work.", icon: <BsBagCheck /> },
];

const taglinesLeft = [
  "💡 Empower Collaboration",
  "🌍 Connect Globally",
  "🚀 Build Faster Together",
];

const taglinesRight = [
  "🎯 Find Your Perfect Match",
  "💼 Unlock Opportunities",
  "📡 Seamless Communication",
];

const Features = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [leftTagline, setLeftTagline] = useState("");
  const [rightTagline, setRightTagline] = useState("");
  const [fadeLeft, setFadeLeft] = useState(true);
  const [fadeRight, setFadeRight] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % steps.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Independent taglines "star effect"
  useEffect(() => {
    const leftInterval = setInterval(() => {
      setFadeLeft(false);
      setTimeout(() => {
        setLeftTagline(taglinesLeft[Math.floor(Math.random() * taglinesLeft.length)]);
        setFadeLeft(true);
      }, 500);
    }, 3000);

    const rightInterval = setInterval(() => {
      setFadeRight(false);
      setTimeout(() => {
        setRightTagline(taglinesRight[Math.floor(Math.random() * taglinesRight.length)]);
        setFadeRight(true);
      }, 500);
    }, 4000);

    return () => {
      clearInterval(leftInterval);
      clearInterval(rightInterval);
    };
  }, []);

  // Circle radius adjusts with screen width
  const getRadius = () => {
    if (window.innerWidth < 480) return 100; // mobile
    if (window.innerWidth < 768) return 150; // tablet
    if (window.innerWidth < 1024) return 220; // small laptop
    return 280; // desktop
  };
  const radius = getRadius();

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center relative overflow-hidden">

      {/* Radial background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(236,72,153,0.15),_transparent_70%)] pointer-events-none"></div>

      {/* Floating blurred shapes */}
      <div className="absolute top-10 left-5 w-28 h-28 sm:w-40 sm:h-40 bg-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 sm:w-60 sm:h-60 bg-purple-500/20 rounded-full blur-3xl animate-bounce"></div>
      <div className="absolute top-1/3 right-[10%] w-32 h-32 sm:w-48 sm:h-48 bg-indigo-500/20 rounded-full blur-3xl animate-ping"></div>

      {/* Header */}
      <div className="pt-[8vh] relative z-10 text-center px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
          VirDev Features
        </h1>
        <h4 className="mt-4 text-base sm:text-lg md:text-xl text-white leading-relaxed max-w-[80vw] mx-auto">
          VirDev makes it easy to find your perfect virtual dev partner. Our platform is designed to connect developers based on skills, interests, and projects.
        </h4>
      </div>

      {/* Layout wrapper */}
      <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-[1200px] px-4 md:px-6 mt-10 relative z-10 gap-8 md:gap-0">

        {/* Left Tagline */}
        <div className="hidden md:flex relative w-1/4 h-[400px] lg:h-[500px]">
          {leftTagline && (
            <p
              className={`absolute text-sm sm:text-base lg:text-lg font-medium text-pink-400 transition-opacity duration-800 ease-in-out ${fadeLeft ? "opacity-100" : "opacity-0"}`}
              style={{
                top: `${Math.random() * 80}%`,
                right: "0",
              }}
            >
              {leftTagline}
            </p>
          )}
        </div>

        {/* Circle container */}
        <div className="relative w-[80vw] sm:w-[70vw] md:w-[60vw] lg:max-w-[700px] aspect-square flex justify-center items-center">
          {/* Center feature */}
          <div className="absolute w-[75%] sm:w-[70%] aspect-square rounded-full flex flex-col justify-center items-center text-center bg-slate-900/70 border border-slate-700 p-4 sm:p-6 shadow-xl transition-all duration-700">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white mb-3 sm:mb-4">
              {steps[activeIndex].title}
            </h2>
            <p className="text-gray-300 text-xs sm:text-sm md:text-base mx-2 sm:mx-3">
              {steps[activeIndex].desc}
            </p>
          </div>

          {/* Icons around the circle */}
          {steps.map((step, i) => {
            const angle = (i / steps.length) * 2 * Math.PI;
            const x = radius * Math.cos(angle);
            const y = radius * Math.sin(angle);

            return (
              <div
                key={step.id}
                className={`absolute transition-all duration-500 transform 
                  ${i === activeIndex
                      ? "scale-110 sm:scale-125 text-pink-500 bg-pink-600/30 rounded-full shadow-lg shadow-pink-500/40"
                      : "scale-90 sm:scale-100 text-gray-400"
                  }`}
                style={{
                  left: `calc(50% + ${x}px - 20px)`,
                  top: `calc(50% + ${y}px - 20px)`,
                }}
              >
                <div className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 rounded-full flex justify-center items-center">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center text-xl sm:text-2xl md:text-3xl cursor-pointer">
                    {step.icon}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Tagline */}
        <div className="hidden md:flex relative w-1/4 h-[400px] lg:h-[500px]">
          {rightTagline && (
            <p
              className={`absolute text-sm sm:text-base lg:text-lg font-medium text-purple-400 transition-opacity duration-800 ease-in-out ${fadeRight ? "opacity-100" : "opacity-0"}`}
              style={{
                top: `${Math.random() * 80}%`,
                left: "0",
              }}
            >
              {rightTagline}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Features;
