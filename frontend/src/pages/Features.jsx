import React from 'react'
import { AiOutlineApartment, AiOutlineRuby, AiOutlineSolution } from "react-icons/ai";
import { BsSearchHeart, BsBagCheck } from 'react-icons/bs';
import { FaCommentDots } from 'react-icons/fa';

const steps = [
    { id: 1, title: "Smart Matching", desc: "Algorithmically match you with developers based on your skills, interests, and projects.", icon: <BsSearchHeart /> },
    { id: 2, title: "Global Community", desc: "Connect with developers from around the world, building amazing things together.", icon: <AiOutlineApartment /> },
    { id: 3, title: "Skill Matching", desc: "Share your skills and interests with developers to find the perfect match.", icon: <AiOutlineRuby /> },
    { id: 4, title: "Project Collaboration", desc: "Find developers who share your interests and collaborate on projects.", icon: <AiOutlineSolution /> },
    { id: 5, title: "Seamless Communication", desc: "Easily communicate with developers, share ideas, and collaborate on projects.", icon: <FaCommentDots /> },
    { id: 6, title: "Job Opportunities", desc: "Discover job opportunities and connect with developers who are looking for work.", icon: <BsBagCheck /> },
];

const Features = () => {
    return (
        <div className="h-screen bg-slate-950">
            <div className='pt-[10vh]'>
                <h1 className="text-6xl font-bold text-white p-2 leading-tight text-center mx-auto">
                    VirDev Features
                </h1>
                <h4 className="text-xl text-white p-2 leading-tight text-center w-[60vw] mx-auto">
                    VirDev makes it easy to find your perfect virtual dev partner. Our platform is specifically designed to connect developers based on skills, interests, and projects, allowing you to build amazing things together.
                </h4>
            </div>

            <div className="features h-[65vh] w-[100vw] flex items-center justify-evenly flex-wrap">
                {steps.map((step) => (
                    <div
                        key={step.id}
                        className="featureInfo group w-[28%] min-w-[280px] bg-slate-900/40 rounded-2xl p-6 flex flex-col justify-start items-start shadow-lg overflow-hidden transition-all duration-500"
                    >
                        {/* Icon */}
                        <div className="featureIcon h-[10vh] w-[5vw] min-w-[60px] bg-pink-600/20 p-3 rounded-2xl flex justify-center items-center text-4xl text-purple-500">
                            {step.icon}
                        </div>

                        {/* Title + Shimmer + Desc */}
                        <div className="relative flex flex-col justify-start w-full">
                            {/* Title */}
                            <h2
                                className="text-4xl font-extrabold text-white transition-all duration-700 
                                   group-hover:text-2xl group-hover:mb-2"
                            >
                                {step.title}
                            </h2>

                            {/* Shimmer placeholder (disappears on hover) */}
                            <div
                                className="mt-3 h-4 w-[80%] rounded bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 
                                   animate-pulse transition-all duration-500 
                                   group-hover:opacity-0 group-hover:max-h-0 group-hover:mt-0"
                            ></div>

                            {/* Description (appears on hover) */}
                            <h3
                                className="text-gray-300 text-sm mt-0 opacity-0 max-h-0 translate-y-5 
                                   transition-all duration-700 ease-in-out 
                                   group-hover:opacity-100 group-hover:max-h-40 group-hover:translate-y-0 group-hover:mt-2"
                            >
                                {step.desc}
                            </h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Features
