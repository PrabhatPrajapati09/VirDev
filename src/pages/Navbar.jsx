import React from 'react'
import { NavLink } from 'react-router-dom'
import { AiOutlineUser, AiOutlineLeft, AiOutlineRight } from "react-icons/ai";



const Navbar = () => {
    return (
        <>
        <div className='h-[10vh] w-[100vw] p-5 fixed'>
            <div className='border-2 rounded-full px-3 '>
                <div className="flex justify-between items-center p-3 text-white">
                    <div className="logo font-bold text-4xl bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">{"</> "}VirDev</div>
                    <div className="links flex gap-6 justify-center items-center text-xl">
                        <div className='flex gap-6 '>
                            <NavLink className={({ isActive }) => isActive ? "border-2 border-white rounded-full px-2.5 bg-white text-black" : "active"} to="/home">Home</NavLink>
                            <NavLink className={({ isActive }) => isActive ? "border-2 border-white rounded-full px-2.5 bg-white text-black" : "active"} to="/features">Features</NavLink>
                            <NavLink className={({ isActive }) => isActive ? "border-2 border-white rounded-full px-2.5 bg-white text-black" : "active"} to="/How it works">How it works</NavLink>
                            <NavLink className={({ isActive }) => isActive ? "border-2 border-white rounded-full px-2.5 bg-white text-black" : "active"} to="/Testimonials">Testimonials</NavLink>
                            <NavLink className={({ isActive }) => isActive ? "border-2 border-white rounded-full px-2.5 bg-white text-black" : "active"} to="/about">About</NavLink>
                        </div>
                        {/* <div className="profile h-[40px] w-[40px] border rounded-full flex justify-center items-center">
                        <AiOutlineUser />
                    </div> */}
                        < NavLink to="/auth/login"><div className="button h-[40px] w-[180px] font-semibold rounded-xl flex justify-center items-center bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-500">Register/Login</div></NavLink>

                    </div>
                </div>
            </div>
            </div>
        </>
    )
}

export default Navbar
