import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../../context/appContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import logo from "../../assets/logo.svg";


const SignupForm = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const navigate = useNavigate();

    const { backendUrl, setIsLoggedin } = useContext(AppContext);

    const onSubmit = async ({ firstname, lastname, username, email, password }) => {
        try {
            axios.defaults.withCredentials = true;
            const { data } = await axios.post(`${backendUrl}/api/auth/register`, { firstname, lastname, username, email, password });
            if (data.success) {
                setIsLoggedin(true);
                navigate("/home");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Server error");
        }
    };
    return (
        <div className='h-screen bg-slate-950 mx-auto flex justify-center items-center'>
            <div className="logo font-bold text-4xl flex gap-2 absolute left-5 sm:left-10 top-10" onClick={() => navigate("/")}>
                    <span className=" w-10 text-fuchsia-500">
                      <img src={logo} />
                    </span>
                    <div className="cursor-pointer bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
                      VirDev
                    </div>
                  </div>
            <div className='bg-slate-900 p-10 rounded-3xl shadow-xl w-full sm:w-96 text-white text-lg'>
                <h3 className='text-4xl font-bold text-center bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-500 bg-[length:300%_300%] bg-clip-text text-transparent animate-gradient p-2 mb-4'>VirDev Signup</h3>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4 flex items-center gap-3 px-5 py-2.5 w-full rounded-full bg-slate-950 text-white ">
                        <input className='bg-transparent outline-none w-full' type="text" name="firstname" placeholder='Enter First Name' {...register('firstname', { required: { value: true, message: 'First name is required' } })} />
                        {errors.firstname && <p className='text-xs text-red-500 w-full'>{errors.firstname.message}</p>}
                    </div>
                    <div className="mb-4 flex items-center gap-3 px-5 py-2.5 w-full rounded-full bg-slate-950 text-white ">
                        <input className='bg-transparent outline-none w-full' type="text" name="lastname" placeholder='Enter Last Name' {...register('lastname', { required: { value: true, message: 'Last name is required' } })} />
                        {errors.lastname && <p className='text-xs text-red-500 w-full'>{errors.lastname.message}</p>}
                    </div>
                    <div className="mb-4 flex items-center gap-3 px-5 py-2.5 w-full rounded-full bg-slate-950 text-white ">
                        <input className='bg-transparent outline-none w-full' type="text" name="username" placeholder='Enter Username' {...register('username', { required: { value: true, message: 'Username is required' } })} />
                        {errors.username && <p className='text-xs text-red-500 w-full'>{errors.username.message}</p>}
                    </div>
                    <div className="mb-4 flex items-center gap-3 px-5 py-2.5 w-full rounded-full bg-slate-950 text-white ">
                        <input className='bg-transparent outline-none w-full' type="text" name="email" placeholder='Enter Email' {...register('email', { required: { value: true, message: 'Email is required' } })} />
                        {errors.email && <p className='text-xs text-red-500 w-full'>{errors.email.message}</p>}
                    </div>
                    <div className="mb-4 flex items-center gap-3 px-5 py-2.5 w-full rounded-full bg-slate-950 text-white ">
                        <input className='bg-transparent outline-none w-full' type="password" name="password" placeholder='Enter Password' {...register('password', { required: { value: true, message: 'Password is required' } })} />
                        {errors.password && <p className='text-xs text-red-500 w-full'>{errors.password.message}</p>}

                    </div>

                    {/* <p className='text-right text-blue-900 hover:text-blue-700 hover:underline cursor-pointer mb-4' >Forgot Password??</p> */}

                    <button className="loginbutton py-2.5 w-full rounded-full bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-500 hover:scale-[1.03] transition-transform font-medium ">Register</button>
                </form>

                <p className='text-gray-500 text-center mt-4'>Already a user?{' '}
                    <NavLink to="/login" className='text-blue-900 hover:text-blue-700 hover:underline'>Login Here</NavLink>
                </p>

            </div>
        </div>
    )
}

export default SignupForm
