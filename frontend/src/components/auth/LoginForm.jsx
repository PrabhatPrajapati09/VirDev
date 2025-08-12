import React from 'react'
import { useForm } from 'react-hook-form'
import { NavLink } from 'react-router-dom'

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => { console.log(data) }

  return (
    <div className='h-screen bg-gradient-to-r bg-black from-rose-500/50 via-transparent to-blue-600/50 mx-auto flex justify-center items-center'>
      <div className="logincard bg-slate-600/50 w-[90%] max-w-md flex justify-center items-center flex-wrap rounded-3xl">
        <div className='flex flex-nowrap justify-between w-[93%]'>

          <h1 className='w-[90%] text-4xl text-center font-bold p-2 bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent bg-[length:300%_300%] animate-gradient m-3'>VirDev Register</h1>

          <div className="close flex justify-end text-2xl text-white m-3">
            <NavLink to="/">x</NavLink>
          </div>
        </div>

        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <input className='useremail w-[93%] h-[50px] bg-transparent border-2 border-gray-600 hover:border-pink-500 rounded-xl p-2 m-4' type="text" name="email" id="" placeholder='Enter Email' {...register('email', { required: { value: true, message: 'Email is required' } })} />
          {errors.email && <p className='text-red-500'>{errors.email.message}</p>}

          <input className='userpassword w-[93%] h-[50px] bg-transparent border-2 border-gray-600 hover:border-pink-500 rounded-xl p-2 m-4' type="password" name="password" id="" placeholder='Enter Password' {...register('password', { required: { value: true, message: 'Password is required', minLength: { value: 8, message: 'Password must be at least 8 characters' } } })} />
          {errors.password && <p className='text-red-500'>{errors.password.message}</p>}

          <button className='loginbtn w-[25vw] h-[50px] bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-500 text-white font-semibold rounded-xl p-2 m-4' type="submit">Login</button>
        </form>
        <p className='text-white m-4'>Not a user? <NavLink to="/register" className='text-blue-600 hover:underline'>Register</NavLink></p>


      </div>
    </div>
  )
}

export default LoginForm
