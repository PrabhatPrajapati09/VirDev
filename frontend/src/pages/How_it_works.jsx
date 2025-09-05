import { MdOutlineLogin, MdOutlineSwipe, MdOutlinePeople, MdOutlineWork } from "react-icons/md";

const steps = [
    { id: 1, title: "Create Profile", desc: "Create a profile to showcase your skills, interests and projects you want to work on.", icon: <MdOutlineLogin /> },
    { id: 2, title: "Swipe & Match", desc: "Browse and find developer profiles who match your skills and interests.", icon: <MdOutlineSwipe /> },
    { id: 3, title: "Connect & Chat", desc: "Once connected chat and discuss your ideas and thoughts about potential projects.", icon: <MdOutlinePeople /> },
    { id: 4, title: "Collaborate", desc: "Start to collaborate on projects and work together to bring your ideas to life", icon: <MdOutlineWork /> },
];

const How_it_works = () => {
    return (
        <div className="bg-slate-900">
             <div className='pt-[10vh]'>

                 <h1 className="text-6xl font-bold text-white p-2 leading-tight text-center mx-auto">
                     How It Works
                 </h1>
                 <h4 className="text-xl text-white p-2 leading-tight text-center w-[60vw] mx-auto">
                     Welcome to VirDev, Follow the steps below to get started:
                 </h4>
           </div>
        <div className="relative flex justify-center items-start w-full py-10">
            {/* Center Line */}
            <div className="absolute left-1/2 top-0 h-[90%] w-1 bg-gray-700 -translate-x-1/2"></div>

            <div className="flex flex-col w-full max-w-5xl">
                {steps.map((step) => (
                    <div key={step.id} className={`relative flex w-full mb-16 ${step.id % 2 === 1 ? "justify-start" : "justify-end"} group`}>
                        {/* Step Number on Center Line */}
                        <div
                            className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center"
                            style={{ top: "50%", transform: "translate(-50%, -50%)" }}
                        >
                            <div className="outercircle border-[1px] border-gray-500 h-10 w-10 rounded-full flex items-center justify-center">
                                <div className="innercircle border-[1px] border-gray-500 h-8 w-8 rounded-full flex items-center justify-center">

                                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold bg-gray-800 text-gray-400 border-2 border-gray-600 transition-all duration-500 ease-in-out group-hover:w-7 group-hover:h-7 group-hover:text-lg group-hover:bg-pink-600 group-hover:text-white group-hover:border-pink-500">
                                        {step.id}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Card */}
                        <div className={`relative flex items-center gap-4 w-[40%] p-3 rounded-xl shadow-lg transition-all duration-500 hover:scale-105 ${step.id % 2 === 1 ? "flex-row-reverse text-right" : "flex-row text-left"}`}>
                            {/* Logo */}
                            <div className="flex-shrink-0 h-20 w-20 rounded-3xl bg-gray-600/30 flex items-center justify-center text-3xl text-white group-hover:bg-pink-600/30 group-hover:text-pink-500">
                                {step.icon}
                            </div>

                            {/* Text */}
                            <div className="relative overflow-hidden flex-1">
                                {/* Title */}
                                <h2 className="text-3xl font-extrabold text-white transition-all duration-700 group-hover:text-xl group-hover:mb-2">
                                    {step.title}
                                </h2>

                                {/* Desc */}
                                <p className="text-gray-400 text-sm opacity-0 max-h-0 transition-all duration-500 ease-in-out group-hover:opacity-100 group-hover:max-h-40">
                                    {step.desc}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        </div>
    );
};

export default How_it_works;
