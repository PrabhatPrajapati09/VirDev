import React, { useRef, useEffect, useState } from 'react'
import logo from '../assets/logo.svg'
import Features from './Features';
import How_it_works from './How_it_works';
import Testimonials from './Testimonials';
import About from './About';
import Hero_section from './Hero_section';


const Home = ({ scrollTo }) => {
    const sections = {
        hero: useRef(null),
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
            <div className="overflow-hidden">
                <section ref={sections.hero} className="h-screen bg-black">
                    <Hero_section />
                </section>


                <section ref={sections.features} className="h-screen bg-black">
                    <Features />\
                </section>

                <section ref={sections['how-it-works']} className="h-[60vh] bg-black">
                    <How_it_works />
                </section>

                <section ref={sections.testimonials} className="h-[55vh] bg-black">
                    <Testimonials />
                </section>

                <section ref={sections.about} className="h-[58vh] bg-black">
                    <About />
                </section>
                <footer className="bg-gray-900 text-white py-8 px-4 ">
                        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">

                            {/* Logo and Name */}
                            <div className="flex items-center gap-2 text-xl font-bold">
                                <div className="w-10">

                                    <img src={logo} />
                                </div>
                                <span className="bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent text-3xl">
                                    VirDev
                                </span>
                            </div>

                            {/* Navigation Links */}
                            <div className="flex gap-6 text-sm text-gray-400">
                                <a href="#about" className="hover:text-white transition">About</a>
                                <a href="#projects" className="hover:text-white transition">Projects</a>
                                <a href="#contact" className="hover:text-white transition">Contact</a>
                                <a href="#login" className="hover:text-white transition">Login</a>
                            </div>

                            {/* Copyright */}
                            <div className="text-sm text-gray-500">
                                © {new Date().getFullYear()} VirDev. All rights reserved.
                            </div>
                        </div>
                    </footer>
            </div>
        </>
    )
}

export default Home
