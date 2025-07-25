import React from 'react'
// import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from './Navbar'
import LoginForm from '../components/auth/LoginForm'
import { AiOutlineKubernetes, AiOutlineArrowRight } from "react-icons/ai";

const Home = () => {


    return (
        <>
            <div className='h-[100vh] w-[100vw] bg-[url("./assets/bg.jpg")] bg-cover bg-center'>
                
                <Navbar />
                <div className="globalConnection flex justify-center items-center border-2 border-pink-500 rounded-full px-1 py-1 m-3 mt-[25vh] w-[19vw] gap-1 font-semibold text-purple-600">
                    <div className="icon flex justify-center items-center text-xl"> <AiOutlineKubernetes /> </div>
                    <div className="text flex justify-center items-center text-sm">Connect with developeres around the world</div>
                </div>
                <div className="find w-[45vw] text-6xl font-bold  p-3 text whitespace-normal text-white ">Find your Perfect <span className="partner bg-gradient-to-r from-[#FC354C] via-[#9155f0] to-[#0ABFBC] bg-clip-text text-transparent leading-tight bg-[length:200%_200%] animate-gradient">Virtual Dev Partner</span></div>
                <div className="desc w-[45vw] text-2xl p-3"><span className="text-white">VirDev connects developers based on skills, interests, and projects. Swipe, match, and build amazing things together.</span></div>

                <button className="getStarted rounded-xl px-2.5  text-white h-[12vh] w-[12vw] m-5 text-2xl flex justify-center items-center gap-1 bg-gradient-to-r from-[#FC354C] via-[#9155f0] to-[#0ABFBC] bg-[length:200%_200%] animate-gradient ">Get Started <div> <AiOutlineArrowRight /></div></button>
            </div>

        </>
    )
}

export default Home
