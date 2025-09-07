import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoClose } from 'react-icons/io5';
import logo from '../assets/logo.svg';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div className="h-[10vh] w-[100vw] p-5 fixed z-50">
                <div className="border-2 rounded-full px-3 bg-slate-900/80 backdrop-blur-md">
                    <div className="flex justify-between items-center p-3 text-white">
                        
                        {/* Logo */}
                        <div className="logo font-bold text-4xl bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent flex gap-2">
                            <span className="w-10 text-fuchsia-500">
                                <img src={logo} alt="logo" />
                            </span>
                            <div>VirDev</div>
                        </div>

                        {/* Desktop Links */}
                        <div className="hidden md:flex gap-6 justify-center items-center text-xl">
                            <div className="flex gap-6">
                                <NavLink className={({ isActive }) => isActive ? "border-[1px] border-white rounded-full px-2.5 bg-white/60 text-black" : ""} to="/features">Features</NavLink>
                                <NavLink className={({ isActive }) => isActive ? "border-[1px] border-white rounded-full px-2.5 bg-white/60 text-black" : ""} to="/How it Works">How it works</NavLink>
                                <NavLink className={({ isActive }) => isActive ? "border-[1px] border-white rounded-full px-2.5 bg-white/60 text-black" : ""} to="/testimonials">Testimonials</NavLink>
                                <NavLink className={({ isActive }) => isActive ? "border-[1px] border-white rounded-full px-2.5 bg-white/60 text-black" : ""} to="/about">About</NavLink>
                            </div>
                            <NavLink to="/login">
                                <div className="button h-[40px] w-[180px] font-semibold rounded-xl flex justify-center items-center bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-500">
                                    Register/Login
                                </div>
                            </NavLink>
                        </div>

                        {/* Hamburger (mobile only) */}
                        <button
                            className="md:hidden text-3xl"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            {isOpen ? <IoClose /> : <GiHamburgerMenu />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed top-0 right-0 h-[50%] w-[100%] bg-slate-900 text-white shadow-lg z-40 transform transition-transform pt-20 duration-500 md:hidden
                ${isOpen ? "translate-x-0" : "translate-x-full"}`}
            >
                <div className="flex flex-col items-start p-6 gap-6 text-xl">
                    <NavLink onClick={() => setIsOpen(false)} to="/features">Features</NavLink>
                    <NavLink onClick={() => setIsOpen(false)} to="/How it Works">How it works</NavLink>
                    <NavLink onClick={() => setIsOpen(false)} to="/testimonials">Testimonials</NavLink>
                    <NavLink onClick={() => setIsOpen(false)} to="/about">About</NavLink>
                    <NavLink onClick={() => setIsOpen(false)} to="/login">
                        <div className="button h-[40px] w-[160px] font-semibold rounded-xl flex justify-center items-center bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-500">
                            Register/Login
                        </div>
                    </NavLink>
                </div>
            </div>
        </>
    );
};

export default Navbar;
