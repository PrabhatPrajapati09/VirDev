// import React, { useState, useContext } from 'react';
// import { NavLink, useNavigate } from 'react-router-dom';
// import { AiOutlineUser, AiOutlineBulb } from "react-icons/ai";
// import { IoHomeOutline } from "react-icons/io5";
// import { MdOutlinePersonAddAlt } from 'react-icons/md';
// import { GrGroup } from 'react-icons/gr';
// import { RxCross2 } from "react-icons/rx";
// import { HiOutlineMenuAlt3 } from "react-icons/hi";  // HAMBURGER ICON
// import logo from '../assets/logo.svg';

// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { AppContext } from '../context/appContext';

// const Navbar = () => {
//     const [open, setOpen] = useState(false);          // profile menu
//     const [mobileMenu, setMobileMenu] = useState(false); // mobile nav menu

//     const { userData, backendUrl, setUserData, setIsLoggedin } = useContext(AppContext);
//     const navigate = useNavigate();

//     const logout = async () => {
//         try {
//             const { data } = await axios.post(`${backendUrl}/api/auth/logout`, {}, { withCredentials: true });
//             if (data.success) {
//                 setIsLoggedin(false);
//                 setUserData(null);
//                 navigate('/');
//             } else toast.error(data.message);
//         } catch (error) {
//             toast.error(error.message);
//         }
//     };

//     const sendVerificationOtp = async () => {
//         try {
//             const { data } = await axios.post(`${backendUrl}/api/auth/send-verify-otp`, {}, { withCredentials: true });
//             if (data.success) {
//                 toast.success(data.message);
//                 navigate('/verify-otp');
//             } else toast.error(data.message);
//         } catch (error) {
//             toast.error(error.message);
//         }
//     };

//     return (
//         <>
//             <div className='h-[10vh] w-full p-5 fixed z-50 bg-slate-950'>
//                 <div className='border-2 rounded-full px-3'>
//                     <div className="flex justify-between items-center p-3 text-white">

//                         {/** LOGO */}
//                         <div className="logo font-bold text-4xl bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent flex gap-2 cursor-pointer"
//                             onClick={() => navigate('/home')}
//                         >
//                             <span className="w-10">
//                                 <img src={logo} />
//                             </span>
//                             <div>VirDev</div>
//                         </div>

//                         {/** DESKTOP NAVLINKS */}
//                         <div className="hidden lg:flex gap-20 text-xl">
//                             <NavLink className={({ isActive }) => isActive ? "border border-white rounded-full px-3 text-pink-500" : ""} to="/home">
//                                 <div className="flex h-[70px] w-[80px] justify-center items-center flex-wrap">
//                                     <span className="text-4xl"><IoHomeOutline /></span> Home
//                                 </div>
//                             </NavLink>

//                             <NavLink className={({ isActive }) => isActive ? "border border-white rounded-full px-3 text-pink-500" : ""} to="/requests">
//                                 <div className="flex h-[70px] w-[110px] justify-center items-center flex-wrap">
//                                     <span className="text-4xl"><MdOutlinePersonAddAlt /></span> Requests
//                                 </div>
//                             </NavLink>

//                             <NavLink className={({ isActive }) => isActive ? "border border-white rounded-full px-3 text-pink-500" : ""} to="/connections">
//                                 <div className="flex h-[70px] w-[130px] justify-center items-center flex-wrap">
//                                     <span className="text-4xl"><GrGroup /></span> Connections
//                                 </div>
//                             </NavLink>

//                             <NavLink className={({ isActive }) => isActive ? "border border-white rounded-full px-3 text-pink-500" : ""} to="/ideas">
//                                 <div className="flex h-[70px] w-[80px] justify-center items-center flex-wrap">
//                                     <span className="text-4xl"><AiOutlineBulb /></span> Ideas
//                                 </div>
//                             </NavLink>
//                         </div>

//                         {/** PROFILE BUTTON (DESKTOP ONLY) */}
//                         <div className="hidden lg:block relative">
//                             <button
//                                 onClick={() => setOpen(!open)}
//                                 className="h-[60px] w-[60px] text-3xl border text-white rounded-full flex justify-center items-center hover:bg-slate-800 transition"
//                             >
//                                 {open ? <RxCross2 /> : <AiOutlineUser />}
//                             </button>

//                             {open && (
//                                 <div className="absolute top-[70px] right-0 w-[250px] bg-slate-900 border border-slate-700 rounded-2xl p-5 shadow-xl">
//                                     <div className="flex flex-col gap-4 text-white text-lg font-semibold">
//                                         <NavLink to="/profile" onClick={() => setOpen(false)} className="hover:text-pink-500">Profile</NavLink>
//                                         {!userData?.isUserVerified && (
//                                             <button onClick={sendVerificationOtp} className="hover:text-pink-500 text-left">Verify Email</button>
//                                         )}
//                                         <button onClick={logout} className="hover:text-red-500 text-left">Logout</button>
//                                     </div>
//                                 </div>
//                             )}
//                         </div>

//                         {/** HAMBURGER MENU (MOBILE) */}
//                         <button
//                             className="lg:hidden text-4xl text-white"
//                             onClick={() => setMobileMenu(true)}
//                         >
//                             <HiOutlineMenuAlt3 />
//                         </button>

//                     </div>
//                 </div>

//                 {/** MOBILE SLIDE MENU */}
//                 {mobileMenu && (
//                     <div className="fixed top-0 right-0 h-full w-[75vw] bg-slate-900 z-50 p-6 shadow-2xl animate-slideLeft overflow-y-auto">

//                         {/** CLOSE BUTTON */}
//                         <button className="text-3xl text-white mb-6" onClick={() => setMobileMenu(false)}>
//                             <RxCross2 />
//                         </button>

//                         {/** NAVLINKS INSIDE MOBILE MENU */}
//                         <div className="flex flex-col gap-8 text-xl text-white">

//                             <NavLink to="/home" onClick={() => setMobileMenu(false)}>Home</NavLink>
//                             <NavLink to="/requests" onClick={() => setMobileMenu(false)}>Requests</NavLink>
//                             <NavLink to="/connections" onClick={() => setMobileMenu(false)}>Connections</NavLink>
//                             <NavLink to="/ideas" onClick={() => setMobileMenu(false)}>Ideas</NavLink>

//                             <hr className="border-slate-700" />

//                             <NavLink to="/profile" onClick={() => setMobileMenu(false)}>Profile</NavLink>

//                             {!userData?.isUserVerified && (
//                                 <button onClick={() => { sendVerificationOtp(); setMobileMenu(false); }}>
//                                     Verify Email
//                                 </button>
//                             )}

//                             <button className="text-red-400" onClick={logout}>Logout</button>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </>
//     );
// };

// export default Navbar;




import React, { useState, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AiOutlineUser, AiOutlineBulb } from "react-icons/ai";
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlinePersonAddAlt } from 'react-icons/md';
import { LuHeartHandshake } from "react-icons/lu";
import { GrGroup } from 'react-icons/gr';
import { RxCross2 } from "react-icons/rx";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import logo from '../assets/logo.svg';

import axios from 'axios';
import { toast } from 'react-toastify';
import { AppContext } from '../context/appContext';

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const [mobileMenu, setMobileMenu] = useState(false);

    const { userData, backendUrl, setUserData, setIsLoggedin } = useContext(AppContext);
    const navigate = useNavigate();

    const logout = async () => {
        try {
            const { data } = await axios.post(`${backendUrl}/api/auth/logout`, {}, { withCredentials: true });
            if (data.success) {
                setIsLoggedin(false);
                setUserData(null);
                navigate('/');
            } else toast.error(data.message);
        } catch (error) {
            toast.error(error.message);
        }
    };

    const sendVerificationOtp = async () => {
        try {
            const { data } = await axios.post(`${backendUrl}/api/auth/send-verify-otp`, {}, { withCredentials: true });
            if (data.success) {
                toast.success(data.message);
                navigate('/verify-otp');
            } else toast.error(data.message);
        } catch (error) {
            toast.error(error.message);
        }
    };

    // Reusable NavItem with Slide + Expand Animation
    const NavItem = ({ to, icon, label }) => (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `relative flex items-center h-12 px-3 rounded-full transition-all duration-500 group
                ${isActive ? "text-fuchsia-400" : "text-slate-400 hover:text-fuchsia-300"}`
            }
        >
            {({ isActive }) => (
                <>
                    {/* The Expanding Border Overlay */}
                    <div className={`absolute inset-0 border-2 rounded-full transition-all duration-500 ease-in-out
                        ${isActive ? "border-fuchsia-500 opacity-100 scale-100" : "border-transparent opacity-0 scale-90"}`}
                    />

                    <div className="flex items-center gap-2 relative z-10 overflow-hidden">
                        {/* Icon */}
                        <span className="text-2xl md:text-3xl shrink-0 transition-transform duration-300 group-active:scale-90">
                            {icon}
                        </span>

                        {/* Sliding & Expanding Text */}
                        <span className={`font-semibold transition-all duration-500 ease-out whitespace-nowrap
                            ${isActive
                                ? "max-w-[120px] opacity-100 translate-x-0 ml-1"
                                : "max-w-0 opacity-0 -translate-x-full ml-0"}`}
                        >
                            {label}
                        </span>
                    </div>
                </>
            )}
        </NavLink>
    );

    return (
        <div className='h-[10vh] w-full p-5 fixed top-0 z-50 bg-slate-950/80 backdrop-blur-md'>
            <div className='max-w-7xl mx-auto'>
                <div className="flex justify-between items-center text-white">

                    {/** LOGO */}
                    <div className="logo font-bold text-3xl bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent flex items-center gap-2 cursor-pointer"
                        onClick={() => navigate('/home')}
                    >
                        <img src={logo} className="w-8" alt="logo" />
                        <div className="hidden sm:block tracking-tighter">VirDev</div>
                    </div>

                    {/** DESKTOP NAVLINKS */}
                    <div className="hidden lg:flex items-center gap-4 bg-slate-900/50 p-1.5 rounded-full border border-slate-800 shadow-inner">
                        <NavItem to="/home" icon={<IoHomeOutline />} label="Home" />
                        <NavItem to="/requests" icon={<MdOutlinePersonAddAlt />} label="Requests" />
                        <NavItem to="/connections" icon={<GrGroup />} label="Connections" />
                        <NavItem to="/ideas" icon={<AiOutlineBulb />} label="Ideas" />
                    </div>

                    {/** PROFILE / MENU */}
                    <div className="flex items-center gap-4">
                        <div className="devroom">
                            <button
                                onClick={() => navigate('/devroom')}
                                className="h-12 w-12 text-2xl border border-slate-700 text-white rounded-full flex justify-center items-center hover:bg-slate-800 transition hover:text-fuchsia-300"
                            >
                                <span className="text-2xl"><LuHeartHandshake /></span>
                            </button>
                        </div>
                        <div className="hidden lg:block relative">
                            <button
                                onClick={() => setOpen(!open)}
                                className="h-12 w-12 text-2xl border border-slate-700 text-white rounded-full flex justify-center items-center hover:bg-slate-800 transition hover:text-fuchsia-300"
                            >
                                {open ? <RxCross2 /> : <AiOutlineUser />}
                            </button>

                            {open && (
                                <div className="absolute top-[65px] right-0 w-[220px] bg-slate-900 border border-slate-700 rounded-2xl p-4 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2">
                                    <div className="flex flex-col gap-3">
                                        <button onClick={() => { navigate('/profile'); setOpen(false) }} className="text-left hover:text-fuchsia-400 font-medium">Profile</button>
                                        {!userData?.isUserVerified && (
                                            <button onClick={() => sendVerificationOtp()} className="hover:text-pink-500 text-left">Verify Email</button>
                                        )}
                                        <button onClick={logout} className="text-left text-red-400 hover:text-red-300 font-medium">Logout</button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/** MOBILE HAMBURGER */}
                        <button className="lg:hidden text-3xl" onClick={() => setMobileMenu(true)}>
                            <HiOutlineMenuAlt3 />
                        </button>
                    </div>
                </div>
            </div>

            {/** MOBILE SIDE MENU */}
            {mobileMenu && (
                <div className="fixed inset-0 z-[60] flex justify-end">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileMenu(false)} />
                    <div className="relative w-[80%] max-w-sm h-full bg-slate-950 p-6 flex flex-col gap-8 shadow-2xl animate-in slide-in-from-right duration-300">
                        <button className="text-3xl text-white self-start" onClick={() => setMobileMenu(false)}>
                            <RxCross2 />
                        </button>
                        <div className="flex flex-col gap-6 text-xl text-white">
                            <NavLink to="/home" onClick={() => setMobileMenu(false)} className="flex items-center gap-4 border-b border-slate-800 pb-2"><IoHomeOutline /> Home</NavLink>
                            <NavLink to="/requests" onClick={() => setMobileMenu(false)} className="flex items-center gap-4 border-b border-slate-800 pb-2"><MdOutlinePersonAddAlt /> Requests</NavLink>
                            <NavLink to="/connections" onClick={() => setMobileMenu(false)} className="flex items-center gap-4 border-b border-slate-800 pb-2"><GrGroup /> Connections</NavLink>
                            <NavLink to="/ideas" onClick={() => setMobileMenu(false)} className="flex items-center gap-4 border-b border-slate-800 pb-2"><AiOutlineBulb /> Ideas</NavLink>
                            {!userData?.isUserVerified && (
                                <button onClick={() => { sendVerificationOtp(); setMobileMenu(false); }}>
                                    Verify Email
                                </button>
                            )}
                            <button onClick={logout} className="text-left text-red-400 mt-4">Logout</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Navbar;