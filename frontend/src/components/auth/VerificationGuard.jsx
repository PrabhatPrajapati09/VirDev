import React from 'react'
import { FaSearch } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../../context/appContext';
import axios from 'axios';



const VerificationGuard = ({ isVerified, title, children }) => {
    const { backendUrl } = useContext(AppContext);
    const navigate = useNavigate();

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



    // If verified, just show the content normally
    if (isVerified) return children;

    // If not verified, show the "Locked" state
    return (
        <div className="relative w-full h-full min-h-[200px] flex items-center justify-center bg-violet-950/50 rounded-2xl border border-white/10 backdrop-blur-sm p-6">
            <div className="flex flex-col items-center gap-4 text-center">
                <FaSearch className="text-fuchsia-500 text-5xl animate-pulse" />
                <p className="text-white text-lg font-medium">{title}</p>
                <button
                    onClick={() => sendVerificationOtp()}
                    className="text-fuchsia-400 text-sm underline hover:text-fuchsia-300"
                >
                    Verify Account
                </button>
            </div>
        </div>
    );
};

export default VerificationGuard
