import React, { useRef, useEffect, useState } from 'react'
// import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from './Navbar'
import LoginForm from '../components/auth/LoginForm'
import { AiOutlineKubernetes, AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";


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
            {/* <section ref={sections.home} className="h-screen">
                <div className='flex justify-center items-center flex-wrap'>
                    <div className='h-[100vh] w-[100vw] bg-[url("./assets/bg.jpg")] bg-cover bg-center'>

                        <Navbar />
                        <div className='flex  flex-wrap'>
                            <div>
                                <div className="globalConnection flex justify-center items-center border-2 border-pink-500 rounded-full px-1 py-1 m-3 mt-[30vh] w-[19vw] gap-1 font-semibold text-fuchsia-500">
                                    <div className="icon flex justify-center items-center text-xl"> <AiOutlineKubernetes /> </div>
                                    <div className="text flex justify-center items-center text-sm">Connect with developeres around the world</div>
                                </div>
                                <div className="find w-[45vw] text-6xl font-bold  p-3 text whitespace-normal text-white ">Find your Perfect <span className="partner bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent leading-tight bg-[length:300%_300%] animate-gradient">Virtual Dev Partner</span></div>
                                <div className="desc w-[45vw] text-2xl p-3"><span className="text-white">VirDev connects developers based on skills, interests, and projects. Swipe, match, and build amazing things together.</span></div>

                                <button className="getStarted rounded-xl px-2.5  text-white h-[12vh] w-[12vw] m-5 text-2xl flex justify-center items-center gap-1 bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-500 ">Get Started <div> <AiOutlineArrowRight /></div></button>
                            </div>
                            <div>
                                <div className="hovercards h-[70vh] w-[35vw] z-0">
                                    
                                    <div className="card1 bg-violet-500/70 rounded-2xl h-[446px] w-[342px] absolute top-[6vh] left-[6vw] animate-moveXYc1">
                                        <div className='box h-[130px] w-[3210x] m-3 top-[6vh] left-[6vw] bg-violet-500 rounded-2xl'></div>
                                    </div>
                                    <div className="card2 bg-cyan-700/70 rounded-2xl h-[446px] w-[342px] absolute top-[6vh] left-[6vw] animate-moveXYc2">
                                        <div className='box h-[130px] w-[3210x] m-3 top-[6vh] left-[6vw] bg-cyan-500 rounded-2xl'></div>
                                    </div>
                                    <div className="card3 bg-blue-700/70 rounded-2xl h-[446px] w-[342px] absolute top-[6vh] left-[6vw] animate-moveXYc3">
                                        <div className='box h-[130px] w-[3210x] m-3 top-[6vh] left-[6vw] bg-blue-500 rounded-2xl'></div>
                                    </div>
                                    <div className="card4 h-[446px] w-[342px] bg-slate-700/80 rounded-2xl absolute top-[6vh] left-[6vw] rotate-[-4deg] hover:rotate-0 ease-in-out duration-500">
                                        <div className='box h-[130px] w-[3210x] m-3 top-[6vh] left-[6vw] diagonal-gradient opacity-[0.5] rounded-2xl'></div>
                                        <button className='h-[40px] w-[180px] font-semibold rounded-xl flex justify-center items-center bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-500 m-3 top-[6vh] left-[6vh] text-white'>Find Your Partner</button>
                                        <div className="info h-[15px] w-[230px] bg-slate-400 m-3 rounded-2xl"></div>
                                        <div className="info h-[13px] w-[180px] bg-slate-400 m-3 rounded-2xl"></div>
                                        <div className="navigate flex justify-between m-4">
                                            <div className="prev h-[50px] w-[50px] bg-fuchsia-500/40 opacity-[0.4] m-3 mt-6 rounded-full flex justify-center items-center text-2xl text-fuchsia-500"><AiOutlineArrowLeft className='' /></div>
                                            <div className="next h-[50px] w-[50px] bg-cyan-500/40 m-3 mt-6 rounded-full flex justify-center items-center text-2xl text-cyan-500"><AiOutlineArrowRight /></div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section> */}


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
                                <div className="box h-[130px] w-[321px] diagonal-gradient opacity-50 rounded-2xl mb-3"></div>
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

                        <h1 className="text-6xl font-bold text-white p-3 leading-tight text-center mx-auto">
                            VirDev Features
                        </h1>
                        <h4 className="text-xl text-white p-3 leading-tight text-center w-[60vw] mx-auto">
                            VirDev makes it easy to find your perfect virtual dev partner. Our platform is specifically designed to connect developers based on skills, interests, and projects, allowing you to build amazing things together.
                        </h4>
                    </div>

                    <div className="features h-[68vh] w-[100vw] flex items-center justify-evenly flex-wrap">
                        <div className="featureInfo">

                        </div>
                        <div className="featureInfo">
                            
                        </div>
                        <div className="featureInfo">
                            
                        </div>
                        <div className="featureInfo">
                            
                        </div>
                        <div className="featureInfo">
                            
                        </div>
                        <div className="featureInfo">
                            
                        </div>
                    </div>
                </div>
            </section>

            <section ref={sections['how-it-works']} className="h-screen bg-green-200">
                How It Works
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
