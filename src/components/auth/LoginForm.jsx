import React from 'react'

const LoginForm = () => {
    return (
        <div className='flex justify-center items-center h-[80vh] w-screen'>
            <div className='flex flex-col justify-center items-center h-[80vh] w-[30vw] bg-gray-600'>
                <h1 className='text-6xl m-10 p-5 font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-pink-400 bg-clip-text text-transparent'>LoginForm</h1>
                <input className='h-[50px] w-[25vw] bg-transparent border-2 border-pink-400 rounded-xl p-2 m-3' type="text" name="email" id="" placeholder='Enter Email'/>
                <input className='h-[50px] w-[25vw] bg-transparent border-2 border-pink-400 rounded-xl p-2 m-3' type="password" name="password" id="" placeholder='Enter Password' />
            </div>
        </div>
    )
}

export default LoginForm