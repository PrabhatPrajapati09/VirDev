import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { AiOutlineUser, } from "react-icons/ai";
import logo from '../assets/logo.svg'
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlinePersonAddAlt } from 'react-icons/md';
import { GrGroup } from 'react-icons/gr';
import { RxCross2 } from "react-icons/rx";



const Navbar = () => {
    const [open, setOpen] = useState(false);



    return (
        <>
            <div className='h-[10vh] w-[100vw] p-5 fixed'>
                <div className='border-2 rounded-full px-3 '>
                    <div className="flex justify-between items-center p-3 text-white">
                        <div className="logo font-bold text-4xl bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent flex gap-2">
                            <span className=" w-10 text-fuchsia-500">
                                <img src={logo} />
                            </span>
                            <div>
                                VirDev
                            </div>
                        </div>
                        <div className="links flex gap-6 justify-center items-center text-xl">
                            <div className='flex gap-20'>
                                <NavLink className={({ isActive }) => isActive ? "border-[1px] border-white rounded-full px-2.5 text-pink-600" : "active"} to="/home">
                                    <div className="flex h-[70px] w-[80px] justify-center items-center flex-wrap">
                                        <span className="text-4xl"><IoHomeOutline /></span> Home
                                    </div>
                                </NavLink>
                                <NavLink className={({ isActive }) => isActive ? "border-[1px] border-white rounded-full px-2.5 text-pink-600" : "active"} to="/requests">
                                    <div className="flex h-[70px] w-[110px] justify-center items-center flex-wrap">
                                        <span className="text-4xl"><MdOutlinePersonAddAlt /></span> Requests
                                    </div>
                                </NavLink>
                                <NavLink className={({ isActive }) => isActive ? "border-[1px] border-white rounded-full px-2.5 text-pink-600" : "active"} to="/connections">
                                    <div className="flex h-[70px] w-[130px] justify-center items-center flex-wrap">
                                        <span className="text-4xl"><GrGroup /></span> Connections
                                    </div>
                                </NavLink>
                            </div>

                        </div>
                        {/* <div className="profile_log">
                            <div className="profile h-[60px] w-[60px] text-3xl border rounded-full flex justify-center items-center">
                                <AiOutlineUser />
                            </div>
                        </div> */}
                        <div className="relative">

                            {/* Avatar Button */}
                            <button
                                onClick={() => setOpen(!open)}
                                className="h-[60px] w-[60px] text-3xl border text-white rounded-full flex justify-center items-center hover:bg-slate-800 transition"
                            >
                                {open ? <RxCross2 /> : <AiOutlineUser />}
                            </button>

                            {/* Profile Panel */}
                            {open && (
                                <div className="absolute top-[70px] right-0 w-[220px] sm:w-[250px] bg-slate-900 border border-slate-700 rounded-2xl p-5 shadow-2xl animate-slideUp">
                                    <div className="flex flex-col gap-4 text-white text-lg font-semibold">

                                        <NavLink to="/profile"
                                            onClick={() => setOpen(false)}
                                            className="hover:text-pink-500 transition">
                                            Profile
                                        </NavLink>

                                        <NavLink to="/verify"
                                            onClick={() => setOpen(false)}
                                            className="hover:text-pink-500 transition">
                                            Verify
                                        </NavLink>

                                        <NavLink to="/logout"
                                            onClick={() => setOpen(false)}
                                            className="hover:text-red-500 transition">
                                            Logout
                                        </NavLink>

                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar
