import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/logo.svg'
import axios from 'axios';
import { toast } from 'react-toastify';
import { AppContext } from '../context/appContext';
import { useContext } from 'react';


const ResetPassword = () => {
    const {backendUrl} = useContext(AppContext);
    axios.defaults.withCredentials = true;

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [isEmailSent, setIsEmailSent] = useState('');
    const [otp, setOtp] = useState(0);
    const [isOtpSent, setIsOtpSent] = useState(false);
    const inputRefs = useRef([]);


    const handleInput = (e, index) => {
        if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pasted = e.clipboardData.getData("text").trim();
        const chars = pasted.split("");

        inputRefs.current.forEach((box, i) => {
            box.value = chars[i] || "";
        });
    };

    const onSubmitEmail = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`${backendUrl}/api/auth/send-reset-otp`, { email });
            if (data.success) {
                toast.success(data.message);
                setIsEmailSent(true);
            } else {
                toast.error(data.message);
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "Something went wrong");
        }
    };

    const onSubmitOtp =async (e) => {
        e.preventDefault();
        const otpArray = inputRefs.current.map((input) => input.value);
        setOtp(otpArray.join(""));
        setIsOtpSent(true);
    };

    const onSubmitNewPassword = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`${backendUrl}/api/auth/reset-password`, {email, otp, newPassword });
            if (data.success) {
                toast.success(data.message);
                navigate("/login");
            }
            else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }



    return (
        <div className='h-screen bg-slate-950 flex justify-center items-center'>

            {/* Logo */}
            <div className="logo font-bold text-3xl md:text-4xl flex gap-2 cursor-pointer absolute top-10 left-14" onClick={() => navigate("/login")}>
                <span className="w-8 md:w-10 text-fuchsia-500">
                    <img src={logo} alt="VirDev Logo" />
                </span>
                <div className="bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
                    VirDev
                </div>
            </div>


            {/* form for entering email */}
            {!isEmailSent &&
                <form className='bg-slate-900 p-8 rounded-2xl w-96 text-sm' onSubmit={onSubmitEmail}>
                    <h2 className='text-2xl font-bold text-white mb-2 text-center'>Reset Password</h2>
                    <p className='text-violet-500 text-center mb-6'>
                        Please enter your registered email address.
                    </p>

                    <div className="email mb-4">
                        <label className="block text-white mb-2 text-xl">Email:</label>
                        <input type="email" className="w-full p-2 bg-slate-800 rounded-md text-white" placeholder="Enter your email address" value={email} onChange={e => setEmail(e.target.value)} required />
                    </div>

                    <button className='w-full py-3 bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-500 text-white text-lg rounded-xl'>Submit</button>
                </form>
            }


            {/* form for entering otp */}
            {isEmailSent && !isOtpSent &&
                <form className='bg-slate-900 p-8 rounded-xl w-96 text-sm' onSubmit={onSubmitOtp} >
                    <h2 className='text-2xl font-bold text-white mb-2 text-center'>Reset Password OTP</h2>
                    <p className='text-violet-500 text-center mb-6'>
                        Please enter the OTP sent to your email.
                    </p>

                    <div className="otp flex justify-between mb-4" onPaste={handlePaste}>
                        {Array(6)
                            .fill(0)
                            .map((_, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    maxLength="1"
                                    className="bg-slate-800 p-2 rounded-md h-12 w-12 text-center text-white"
                                    ref={(ref) => (inputRefs.current[index] = ref)}
                                    onInput={(e) => handleInput(e, index)}
                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                    required
                                />
                            ))}
                    </div>

                    <button
                        type="submit"
                        className='w-full py-3 bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-500 text-white text-lg rounded-xl'
                    >
                        Submit OTP
                    </button>
                </form>
            }


            {/* form for entering updated password */}
            {isOtpSent && isEmailSent &&
                <form className='bg-slate-900 p-8 rounded-2xl w-96 text-sm' onSubmit={onSubmitNewPassword}>
                    <h2 className='text-2xl font-bold text-white mb-2 text-center'>New Password</h2>
                    <p className='text-violet-500 text-center mb-6'>
                        Please enter your new password.
                    </p>

                    <div className="email mb-4">
                        <label className="block text-white mb-2 text-xl">Password:</label>
                        <input type="password" className="w-full p-2 bg-slate-800 rounded-md text-white" placeholder="Enter new password" value={newPassword} onChange={e => setNewPassword(e.target.value)} required />
                    </div>

                    <button className='w-full py-3 bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-500 text-white text-lg rounded-xl'>Submit</button>
                </form>
            }

        </div>
    )
}

export default ResetPassword
