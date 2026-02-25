import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { HiMenuAlt3 } from 'react-icons/hi'; // Sleeker hamburger icon
import { IoClose } from 'react-icons/io5';
import logo from '../assets/logo.svg';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    // Navigation links helper to avoid repetition
    const navLinks = [
        { name: 'Features', path: '/features' },
        { name: 'How it works', path: '/How it works' },
        { name: 'Testimonials', path: '/testimonials' },
        { name: 'About', path: '/about' },
    ];

    return (
        <>
            {/* Header Container */}
            <header className="h-[12vh] w-full px-6 md:px-10 fixed top-0 left-0 z-50 flex items-center">
                <nav className="w-full max-w-7xl mx-auto border border-white/10 rounded-full px-6 py-3 bg-slate-900/40 backdrop-blur-xl shadow-2xl flex justify-between items-center transition-all duration-300">
                    
                    {/* Logo Section */}
                    <NavLink to="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 transition-transform duration-300 group-hover:scale-110">
                            <img src={logo} alt="logo" className="w-full h-full object-contain" />
                        </div>
                        <h1 className="font-bold text-2xl md:text-3xl bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent tracking-tight">
                            VirDev
                        </h1>
                    </NavLink>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        <ul className="flex items-center gap-6">
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <NavLink
                                        to={link.path}
                                        className={({ isActive }) => `
                                            relative px-1 py-1 text-sm lg:text-base font-medium transition-colors duration-300
                                            ${isActive ? 'text-fuchsia-400' : 'text-slate-300 hover:text-white'}
                                        `}
                                    >
                                        {({ isActive }) => (
                                            <>
                                                {link.name}
                                                {/* Underline for Active Link */}
                                                {isActive && (
                                                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-fuchsia-500 rounded-full shadow-[0_0_8px_fuchsia]"></span>
                                                )}
                                            </>
                                        )}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>

                        {/* CTA Button */}
                        <NavLink to="/login">
                            <button className="px-6 py-2.5 font-bold text-white rounded-full bg-gradient-to-r from-fuchsia-600 via-purple-600 to-cyan-500 hover:shadow-[0_0_20px_rgba(192,38,211,0.5)] transition-all duration-300 active:scale-95">
                                Login
                            </button>
                        </NavLink>
                    </div>

                    {/* Hamburger Button */}
                    <button
                        className="md:hidden text-white text-3xl focus:outline-none"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <IoClose /> : <HiMenuAlt3 />}
                    </button>
                </nav>
            </header>

            {/* Mobile Menu Sidebar (Drawer Style) */}
            <div
                className={`fixed top-0 right-0 h-screen w-[280px] bg-slate-950/95 backdrop-blur-2xl text-white shadow-[-10px_0_30px_rgba(0,0,0,0.5)] z-[60] transform transition-transform duration-500 ease-in-out md:hidden
                ${isOpen ? "translate-x-0" : "translate-x-full"}`}
            >
                <div className="flex flex-col h-full p-8">
                    <div className="flex justify-end mb-8">
                        <button onClick={() => setIsOpen(false)} className="text-4xl">
                            <IoClose className="text-slate-400 hover:text-white" />
                        </button>
                    </div>

                    <ul className="flex flex-col gap-8 text-2xl font-semibold">
                        {navLinks.map((link) => (
                            <li key={link.name}>
                                <NavLink 
                                    onClick={() => setIsOpen(false)} 
                                    to={link.path}
                                    className={({ isActive }) => isActive ? "text-fuchsia-500" : "text-white"}
                                >
                                    {link.name}
                                </NavLink>
                            </li>
                        ))}
                    </ul>

                    <div className="mt-auto pb-10">
                        <NavLink onClick={() => setIsOpen(false)} to="/login">
                            <button className="w-full py-4 font-bold rounded-2xl bg-gradient-to-r from-fuchsia-600 via-purple-600 to-cyan-500">
                                Get Started
                            </button>
                        </NavLink>
                    </div>
                </div>
            </div>

            {/* Backdrop Blur Overlay when mobile menu is open */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[55] md:hidden transition-opacity duration-300"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    );
};

export default Navbar;