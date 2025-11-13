import React, { useContext, useRef } from 'react';
import logo from '../assets/logo.svg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AppContext } from '../context/appContext';

const VerifyEmail = () => {
    const navigate = useNavigate();
    const inputRefs = useRef([]);
    const { backendUrl, getUserData } = useContext(AppContext);
    axios.defaults.withCredentials = true;

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

    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault();

            const otp = inputRefs.current.map((input) => input.value).join("");

            const { data } = await axios.post(
                `${backendUrl}/api/auth/verify-account`,
                { otp },
                { withCredentials: true }
            );

            if (data.success) {
                toast.success(data.message);
                getUserData();
                navigate("/home");
            } else {
                toast.error(data.message);
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className='h-screen bg-slate-950 flex justify-center items-center'>

            {/* Logo */}
            <div 
                className="logo font-bold text-3xl md:text-4xl flex gap-2 cursor-pointer absolute top-10 left-14"
                onClick={() => navigate("/login")}
            >
                <span className="w-8 md:w-10 text-fuchsia-500">
                    <img src={logo} alt="VirDev Logo" />
                </span>
                <div className="bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
                    VirDev
                </div>
            </div>

            {/* OTP Form */}
            <form className='bg-slate-900 p-8 rounded-xl w-96 text-sm' onSubmit={onSubmitHandler}>
                <h2 className='text-2xl font-bold text-white mb-2 text-center'>Verify your email</h2>
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
                    Verify Email
                </button>
            </form>
        </div>
    );
};

export default VerifyEmail;
