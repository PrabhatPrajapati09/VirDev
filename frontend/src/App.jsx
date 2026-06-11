// import { useRef, useEffect, useState } from 'react'
// import logo from './assets/logo.svg'
// import Features from './pages/Features';
// import How_it_works from './pages/How_it_works';
// import Testimonials from './pages/Testimonials';
// import About from './pages/About';
// import Hero_section from './pages/Hero_section';


// const App = ({ scrollTo }) => {
//     const sections = {
//         hero: useRef(null),
//         features: useRef(null),
//         'how-it-works': useRef(null),
//         testimonials: useRef(null),
//         about: useRef(null),
//     };

//     useEffect(() => {
//         if (scrollTo && sections[scrollTo]) {
//             sections[scrollTo].current.scrollIntoView({ behavior: 'smooth' });
//         }
//     }, [scrollTo])



//     return (
//         <>
//             <div className="overflow-hidden">
//                 <section ref={sections.hero} className="h-screen">
//                     <Hero_section />
//                 </section>


//                 <section ref={sections.features} >
//                     <Features />
//                 </section>

//                 <section ref={sections['how-it-works']}>
//                     <How_it_works />
//                 </section>

//                 <section ref={sections.testimonials}>
//                     <Testimonials />
//                 </section>

//                 <section ref={sections.about}>
//                     <About />
//                 </section>
//                 <footer className="bg-gray-900 text-white py-8 px-4 ">
//                         <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">

//                             {/* Logo and Name */}
//                             <div className="flex items-center gap-2 text-xl font-bold">
//                                 <div className="w-10">

//                                     <img src={logo} />
//                                 </div>
//                                 <span className="bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent text-3xl">
//                                     VirDev
//                                 </span>
//                             </div>

//                             {/* Navigation Links */}
//                             <div className="flex gap-6 text-sm text-gray-400">
//                                 <a href="#about" className="hover:text-white transition">About</a>
//                                 <a href="#projects" className="hover:text-white transition">Projects</a>
//                                 <a href="#contact" className="hover:text-white transition">Contact</a>
//                                 <a href="#login" className="hover:text-white transition">Login</a>
//                             </div>

//                             {/* Copyright */}
//                             <div className="text-sm text-gray-500">
//                                 © {new Date().getFullYear()} VirDev. All rights reserved.
//                             </div>
//                         </div>
//                     </footer>
//             </div>
//         </>
//     )
// }

// export default App


import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LoginForm from './components/auth/LoginForm.jsx'
import SignupForm from './components/auth/SignupForm.jsx'
import Home from './pages/Home.jsx'
import Home_Navbar from './pages/Home_Navbar.jsx'
import { AppContextProvider } from './context/appContext.jsx';
import { ToastContainer } from 'react-toastify';
import { Toaster } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';
import { authLoader } from "./loader/authLoader";
import { AuthProvider } from "./context/authContext";
import Profile from './pages/Profile.jsx';
import Requests_page from './pages/Requests_page.jsx';
import Connections_page from './pages/Connections_page.jsx';
import VerifyEmail from './pages/VerifyEmail.jsx';
import ResetPassword from './pages/ResetPassword.jsx';
import Ideas_Page from './pages/Ideas_Page.jsx';
import Create_Idea from './pages/Create_Idea.jsx';
import Users_Ideas from './pages/Users_Ideas.jsx';
import Chat from './pages/Chat.jsx'
import { SocketProvider } from "./context/socketContext";
import Devroom from './pages/Devroom.jsx'
import EditorPage from './pages/EditorPage.jsx'
import LandingPage from './pages/LandingPage.jsx'


const router = createBrowserRouter([
    {
        path: '/',
        element: <LandingPage />,
    },
    {
        path: '/home',
        element: <><Home_Navbar /><Home /></>,
        loader: authLoader
    },
    {
        path: "/features",
        element: <LandingPage scrollTo={"features"} />,
    },
    {
        path: "/How it works",
        element: <LandingPage scrollTo={"how-it-works"} />,
    },
    {
        path: "/Testimonials",
        element: <LandingPage scrollTo={"testimonials"} />,
    },
    {
        path: "/about",
        element: <LandingPage scrollTo={"about"} />,
    },
    {
        path: "/login",
        element: <LoginForm />
    },
    {
        path: "/register",
        element: <SignupForm />
    },
    {
        path: "/profile",
        element: <Profile />,
        loader: authLoader
    },
    {
        path: "/requests",
        element: <Requests_page />,
        loader: authLoader
    },
    {
        path: "/connections",
        element: <Connections_page />,
        loader: authLoader
    },
    {
        path: "/verify-otp",
        element: <VerifyEmail />,
        loader: authLoader
    },
    {
        path: "/reset-password",
        element: <ResetPassword />,
        loader: authLoader
    },
    {
        path: "/ideas",
        element: <Ideas_Page />,
        loader: authLoader
    },
    {
        path: "/create-idea",
        element: <Create_Idea />,
        loader: authLoader
    },
    {
        path: "/my-ideas",
        element: <Users_Ideas />,
        loader: authLoader
    },
    {
        path: "/messages",
        element: <Chat />,
        loader: authLoader
    },
    {
        path: "/devroom",
        element: <Devroom />,
        loader: authLoader,
    },
    {
        path: "/devroom/editor/:roomId",
        element: <EditorPage />,
        loader: authLoader
    }
])

function App() {
    return (
        <>
            <AuthProvider>
                <AppContextProvider>
                    <SocketProvider>
                        <ToastContainer />
                        <Toaster
                            position='top-right'
                            toastOptions={{
                                success: {
                                    theme: {
                                        primary: 'green',
                                        secondary: 'black'
                                    }
                                }
                            }} />
                        <RouterProvider router={router} />
                    </SocketProvider>
                </AppContextProvider>
            </AuthProvider>
        </>

    );
}


export default App