import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from './Navbar'

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
        }
    ])

    return (
        <div className='h-[100vh] w-[100vw] bg-[url("./assets/bg.jpg")] bg-cover bg-center'>
            <RouterProvider router={router} />
        </div>
    )
}

export default Home
