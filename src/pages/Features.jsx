import React from 'react'
import { AiOutlineApartment, AiOutlineRuby, AiOutlineSolution } from "react-icons/ai";
import { BsSearchHeart } from 'react-icons/bs';
import { BsBagCheck } from 'react-icons/bs';
import { FaCommentDots } from 'react-icons/fa';

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

            <div className="features h-[68vh] w-[100vw] flex items-center justify-evenly flex-wrap">
                <div className="featureInfo">
                    <div className="featureIcon h-[10vh] w-[5vw]  bg-pink-600/20 p-3 rounded-2xl flex justify-center items-center text-4xl text-purple-500">
                        <BsSearchHeart />
                    </div>
                    <h2 className="text-3xl font-semibold text-white p-3 pl-0 leading-tight">Smart Matching</h2>
                    <h3 className="text-lg text-gray-300  leading-tight">Algorithmically match you with developers based on your skills, interests, and projects</h3>

                </div>
                <div className="featureInfo">
                    <div className="featureIcon h-[10vh] w-[5vw]  bg-pink-600/20 p-3 rounded-2xl flex justify-center items-center text-4xl text-purple-500">
                        <AiOutlineApartment />
                    </div>
                    <h2 className="text-3xl font-semibold text-white p-3 pl-0 leading-tight">Global Community</h2>
                    <h3 className="text-lg text-gray-300  leading-tight">Connect with developers from around the world, building amazing things together</h3>

                </div>
                <div className="featureInfo">
                    <div className="featureIcon h-[10vh] w-[5vw]  bg-pink-600/20 p-3 rounded-2xl flex justify-center items-center text-4xl text-purple-500">
                        <AiOutlineRuby />
                    </div>
                    <h2 className="text-3xl font-semibold text-white p-3 pl-0 leading-tight">Skill Matching</h2>
                    <h3 className="text-lg text-gray-300  leading-tight">Share your skills and interests with developers to find the perfect match</h3>
                </div>


                <div className="featureInfo">
                    <div className="featureIcon h-[10vh] w-[5vw]  bg-pink-600/20 p-3 rounded-2xl flex justify-center items-center text-4xl text-purple-500">
                        <AiOutlineSolution />
                    </div>
                    <h2 className="text-3xl font-semibold text-white p-3 pl-0 leading-tight">Project Collaborations</h2>
                    <h3 className="text-lg text-gray-300  leading-tight">Find developers who share your interests and collaborate on projects</h3>
                </div>
                <div className="featureInfo">
                    <div className="featureIcon h-[10vh] w-[5vw]  bg-pink-600/20 p-3 rounded-2xl flex justify-center items-center text-4xl text-purple-500">
                        <FaCommentDots />
                    </div>
                    <h2 className="text-3xl font-semibold text-white p-3 pl-0 leading-tight">Seamless Communication</h2>
                    <h3 className="text-lg text-gray-300  leading-tight">Easily communicate with developers, share ideas, and collaborate on projects</h3>
                </div>
                <div className="featureInfo ">
                    <div className="featureIcon h-[10vh] w-[5vw]  bg-pink-600/20 p-3 rounded-2xl flex justify-center items-center text-4xl text-purple-500">
                        <BsBagCheck />
                    </div>
                    <h2 className="text-3xl font-semibold text-white p-3 pl-0 leading-tight">Job Opportunities</h2>
                    <h3 className="text-lg text-gray-300  leading-tight">Discover job opportunities and connect with developers who are looking for work</h3>
                </div>
            </div>
        </div>
    )
}

export default Features
