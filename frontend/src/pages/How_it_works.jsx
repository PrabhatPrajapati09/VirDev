import { MdOutlineLogin, MdOutlineSwipe, MdOutlinePeople, MdOutlineWork } from "react-icons/md";

const steps = [
  { id: 1, title: "Create Profile", desc: "Create a profile to showcase your skills, interests and projects you want to work on.", icon: <MdOutlineLogin /> },
  { id: 2, title: "Swipe & Match", desc: "Browse and find developer profiles who match your skills and interests.", icon: <MdOutlineSwipe /> },
  { id: 3, title: "Connect & Chat", desc: "Once connected chat and discuss your ideas and thoughts about potential projects.", icon: <MdOutlinePeople /> },
  { id: 4, title: "Collaborate", desc: "Start to collaborate on projects and work together to bring your ideas to life", icon: <MdOutlineWork /> },
];

const How_it_works = () => {
  return (
    <div className="relative overflow-hidden bg-slate-900">
      {/* 🔥 Shining background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(236,72,153,0.15),_transparent_70%)] pointer-events-none"></div>
      <div className="absolute top-10 left-5 w-28 h-28 sm:w-40 sm:h-40 bg-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 sm:w-60 sm:h-60 bg-purple-500/20 rounded-full blur-3xl animate-bounce"></div>
      <div className="absolute top-1/3 right-[10%] w-32 h-32 sm:w-48 sm:h-48 bg-indigo-500/20 rounded-full blur-3xl animate-ping"></div>

      {/* Content */}
      <div className="relative z-10">
        <div className="pt-[10vh]">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white p-2 leading-tight text-center mx-auto">
            How It Works
          </h1>
          <h4 className="text-base sm:text-lg md:text-xl text-gray-200 p-2 leading-tight text-center w-[85vw] sm:w-[70vw] md:w-[60vw] mx-auto">
            Welcome to VirDev, Follow the steps below to get started:
          </h4>
        </div>

        <div className="relative flex justify-center items-start w-full py-10">
          {/* Center Line */}
          <div className="absolute left-1/2 top-0 h-[90%] w-1 bg-gray-700 -translate-x-1/2"></div>

          <div className="flex flex-col w-full max-w-5xl px-4 sm:px-6">
            {steps.map((step) => (
              <div
                key={step.id}
                className={`relative flex w-full mb-12 sm:mb-16 ${step.id % 2 === 1 ? "justify-start" : "justify-end"} group`}
              >
                {/* Step Number */}
                <div
                  className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center"
                  style={{ top: "50%", transform: "translate(-50%, -50%)" }}
                >
                  <div className="outercircle border border-gray-500 h-8 w-8 sm:h-10 sm:w-10 rounded-full flex items-center justify-center">
                    <div className="innercircle border border-gray-500 h-6 w-6 sm:h-8 sm:w-8 rounded-full flex items-center justify-center">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-bold bg-gray-800 text-gray-400 border-2 border-gray-600 transition-all duration-500 ease-in-out group-hover:w-6 group-hover:h-6 sm:group-hover:w-7 sm:group-hover:h-7 group-hover:text-sm sm:group-hover:text-lg group-hover:bg-pink-600 group-hover:text-white group-hover:border-pink-500">
                        {step.id}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card */}
                <div
                  className={`relative flex items-center gap-3 sm:gap-4 w-[85%] sm:w-[70%] md:w-[45%] p-3 rounded-xl shadow-lg transition-all duration-500 hover:scale-105 ${step.id % 2 === 1 ? "flex-row-reverse text-right" : "flex-row text-left"}`}
                >
                  {/* Icon */}
                  <div className="flex-shrink-0 h-14 w-14 sm:h-16 sm:w-16 md:h-20 md:w-20 rounded-2xl md:rounded-3xl bg-gray-600/30 flex items-center justify-center text-2xl sm:text-3xl md:text-4xl text-white group-hover:bg-pink-600/30 group-hover:text-pink-500">
                    {step.icon}
                  </div>

                  {/* Text */}
                  <div className="relative overflow-hidden flex-1">
                    <h2 className="text-lg sm:text-xl md:text-2xl font-extrabold text-white transition-all duration-700 group-hover:text-base sm:group-hover:text-lg md:group-hover:text-xl group-hover:mb-2">
                      {step.title}
                    </h2>
                    <p className="text-gray-400 text-xs sm:text-sm md:text-base opacity-0 max-h-0 transition-all duration-500 ease-in-out group-hover:opacity-100 group-hover:max-h-40">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default How_it_works;
