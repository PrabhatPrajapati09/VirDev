import React from 'react'
import { NavLink } from 'react-router-dom'
import { AiOutlineUser } from "react-icons/ai";


const Navbar = () => {
    return (
        <>
            <div className="flex justify-between items-center p-3 text-white">
                <div className="logo font-bold text-4xl bg-gradient-to-r from-purple-400 via-pink-500 to-pink-400 bg-clip-text text-transparent">VIRDEV</div>
                <div className="links flex gap-6 justify-center items-center text-xl">
                    <div className='flex gap-6 '>
                        <NavLink to="/home">Home</NavLink>
                        <NavLink to="/features">Features</NavLink>
                        <NavLink to="/How it works">How it works</NavLink>
                        <NavLink to="/Testimonials">Testimonials</NavLink>
                        <NavLink to="/about">About</NavLink>
                    </div>
                    {/* <div className="profile h-[40px] w-[40px] border rounded-full flex justify-center items-center">
                        <AiOutlineUser />
                    </div> */}
                    <div className="button h-[40px] w-[180px] font-semibold rounded-xl flex justify-center items-center bg-gradient-to-r from-purple-400 via-pink-500 to-pink-400">Register/Login</div>
                </div>
            </div>
        </>
    )
}

export default Navbar
