import React, { useRef, useEffect, useState } from 'react'
// import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from './Navbar'
import LoginForm from '../components/auth/LoginForm'
import { AiOutlineKubernetes, AiOutlineArrowRight, AiOutlineArrowLeft, AiOutlineApartment, AiOutlineRuby, AiOutlineSolution } from "react-icons/ai";
import { BsSearchHeart, BsBagCheck } from "react-icons/bs";
import { FaCommentDots } from "react-icons/fa";



const Home = ({ scrollTo }) => {
    const sections = {
        home: useRef(null),
        features: useRef(null),
        'how-it-works': useRef(null),
        testimonials: useRef(null),
        about: useRef(null),
    };

    useEffect(() => {
        if (scrollTo && sections[scrollTo]) {
            sections[scrollTo].current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [scrollTo])



    return (
        <>
            <section ref={sections.home} className="h-screen bg-black">
                {/* <div className="h-[100vh] w-[99vw] bg-[url('./assets/bg.jpg')] bg-cover bg-center"> */}
                <div className="h-[100vh] w-[99vw] bg-gradient-to-r from-rose-500/50 via-transparent to-blue-600/50 ">
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

                            <button className="getStarted rounded-xl p-5 text-white m-5 text-2xl flex items-center gap-2 bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-500">
                                Get Started <AiOutlineArrowRight />
                            </button>
                        </div>

                        {/* Right Cards */}
                        <div className="hovercards h-[70vh] w-[35vw] flex items-center justify-center">
                            <div className="card1 bg-violet-500/70 rounded-2xl h-[446px] w-[342px] animate-moveXYc1 absolute">
                                <div className="box h-[130px] w-[321px] m-3 bg-violet-500 rounded-2xl"></div>
                            </div>
                            <div className="card2 bg-cyan-700/70 rounded-2xl h-[446px] w-[342px] animate-moveXYc2 absolute">
                                <div className="box h-[130px] w-[321px] m-3 bg-cyan-500 rounded-2xl"></div>
                            </div>
                            <div className="card3 bg-blue-700/70 rounded-2xl h-[446px] w-[342px] animate-moveXYc3 absolute">
                                <div className="box h-[130px] w-[321px] m-3 bg-blue-500 rounded-2xl"></div>
                            </div>

                            {/* Top visible card */}
                            <div className="card4 bg-slate-700/80 rounded-2xl h-[446px] w-[342px] rotate-[-4deg] hover:rotate-0 duration-500 ease-in-out relative z-10 p-3">
                                <div className="box h-[130px] w-[318px] diagonal-gradient  rounded-2xl mb-3 flex justify-center items-center text-4xl text-white">
                                    {"</>"}
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
            </section>


            <section ref={sections.features} className="h-screen bg-black">
                <div className="h-screen bg-gradient-to-r from-rose-500/50 via-transparent to-blue-600/50">
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
                        <div className="featureInfo">
                            <div className="featureIcon h-[10vh] w-[5vw]  bg-pink-600/20 p-3 rounded-2xl flex justify-center items-center text-4xl text-purple-500">
                                <BsBagCheck />
                            </div>
                            <h2 className="text-3xl font-semibold text-white p-3 pl-0 leading-tight">Job Opportunities</h2>
                            <h3 className="text-lg text-gray-300  leading-tight">Discover job opportunities and connect with developers who are looking for work</h3>
                        </div>
                    </div>
                </div>
            </section>

            <section ref={sections['how-it-works']} className="h-screen bg-black">
                <div className="h-screen bg-gradient-to-r from-rose-500/50 via-transparent to-blue-600/50">
                    <div className='pt-[10vh]'>

                        <h1 className="text-6xl font-bold text-white p-2 leading-tight text-center mx-auto">
                            How It Works
                        </h1>
                        <h4 className="text-xl text-white p-2 leading-tight text-center w-[60vw] mx-auto">
                            Welcome to VirDev, Follow the steps below to get started:
                        </h4>
                    </div>
                </div>
            </section>

            <section ref={sections.testimonials} className="h-screen bg-yellow-200">
                Testimonials
            </section>

            <section ref={sections.about} className="h-screen bg-purple-200">
                About
            </section>

        </>
    )
}

export default Home
