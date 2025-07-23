import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from './Navbar'
import LoginForm from '../components/auth/LoginForm'
import { AiOutlineKubernetes } from "react-icons/ai";

const Home = () => {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <><Navbar /><h1>Home</h1></>,
        },
        {
            path: "/home",
            element: <><Navbar /><h1>Home</h1></>,
        },
        {
            path: "/features",
            element: <><Navbar /><h1>Features</h1></>,
        },
        {
            path: "/How it works",
            element: <><Navbar /><h1>How it works</h1></>,
        },
        {
            path: "/Testimonials",
            element: <><Navbar /><h1>Testimonials</h1></>,
        },
        {
            path: "/about",
            element: <><Navbar /><h1>About</h1></>,
        },
        {
            path: "/login",
            element: <><Navbar /><LoginForm /></>,
        },
    ])

    return (
        <>
            <div className='h-[100vh] w-[100vw] bg-[url("./assets/bg.jpg")] bg-cover bg-center'>
                <RouterProvider router={router} />
                <div className="globalConnection flex justify-center items-center border-2 border-pink-400 rounded-full p-1 m-3 w-[20vw]"><span><AiOutlineKubernetes />Connect with developeres around the world</span></div>
            </div>
            
        </>
    )
}

export default Home
