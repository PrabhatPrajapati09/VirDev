import React from 'react'
import { NavLink } from 'react-router-dom'
import { AiOutlineUser, } from "react-icons/ai";
import logo from '../assets/logo.svg'
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlinePersonAddAlt } from 'react-icons/md';
import { GrGroup } from 'react-icons/gr';



const Navbar = () => {
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
                                    <NavLink className={({ isActive }) => isActive ? "border-[1px] border-white rounded-full px-2.5 text-pink-600" : "active"} to="/home">
                                    <div className="flex h-[70px] w-[110px] justify-center items-center flex-wrap">
                                        <span className="text-4xl"><MdOutlinePersonAddAlt /></span> Requests
                                    </div>
                                </NavLink>
                                <NavLink className={({ isActive }) => isActive ? "border-[1px] border-white rounded-full px-2.5 text-pink-600" : "active"} to="/home">
                                    <div className="flex h-[70px] w-[130px] justify-center items-center flex-wrap">
                                        <span className="text-4xl"><GrGroup /></span> Connections
                                    </div>
                                </NavLink>
                            </div>

                        </div>
                        <div className="profile_log">
                            <div className="profile h-[60px] w-[60px] text-3xl border rounded-full flex justify-center items-center">
                                <AiOutlineUser />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar
