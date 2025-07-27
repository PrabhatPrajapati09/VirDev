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
            <section ref={sections.home} className="h-screen">
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
                                <div className="hovercards absolute right-[5vw] top-[20vh] h-[70vh] w-[35vw]">
                                    <div className="card1 h-[446px] w-[342px] bg-slate-700/80 rounded-2xl z-10 absolute top-[6vh] left-[6vw] rotate-[-4deg] hover:rotate-0 ease-in-out duration-500">
                                        <div className='box h-[130px] w-[3210x] m-3 top-[6vh] left-[6vw] diagonal-gradient opacity-[0.5] rounded-2xl'></div>
                                        <button className='h-[40px] w-[180px] font-semibold rounded-xl flex justify-center items-center bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-500 m-3 top-[6vh] left-[6vh] text-white'>Find Your Partner</button>
                                        <div className="info h-[15px] w-[230px] bg-slate-400 m-3 rounded-2xl"></div>
                                        <div className="info h-[13px] w-[180px] bg-slate-400 m-3 rounded-2xl"></div>
                                        <div className="navigate flex justify-between m-4">
                                            <div className="prev h-[50px] w-[50px] bg-fuchsia-500/40 opacity-[0.4] m-3 mt-6 rounded-full flex justify-center items-center text-2xl text-fuchsia-500"><AiOutlineArrowLeft className='' /></div>
                                            <div className="next h-[50px] w-[50px] bg-cyan-500/40 m-3 mt-6 rounded-full flex justify-center items-center text-2xl text-cyan-500"><AiOutlineArrowRight /></div>
                                        </div>

                                    </div>
                                    <div className="card2 bg-violet-500/70 rounded-2xl h-[446px] w-[342px] absolute top-[6vh] left-[6vw] animate-moveXYc2">
                                        <div className='box h-[130px] w-[3210x] m-3 top-[6vh] left-[6vw] bg-violet-500 rounded-2xl'></div>
                                    </div>
                                    <div className="card3 bg-cyan-700/70 rounded-2xl h-[446px] w-[342px] absolute top-[6vh] left-[6vw] animate-moveXYc3">
                                        <div className='box h-[130px] w-[3210x] m-3 top-[6vh] left-[6vw] bg-cyan-500 rounded-2xl'></div>
                                    </div>
                                    <div className="card4 bg-blue-700/70 rounded-2xl h-[446px] w-[342px] absolute top-[6vh] left-[6vw] animate-moveXYc4">
                                        <div className='box h-[130px] w-[3210x] m-3 top-[6vh] left-[6vw] bg-blue-500 rounded-2xl'></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            <section ref={sections.features} className="h-screen bg-blue-200">
                Features Section
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
