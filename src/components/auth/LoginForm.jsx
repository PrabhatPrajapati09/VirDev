// import React from 'react'
// import { useForm } from 'react-hook-form'

// const LoginForm = () => {
//     const {
//         register,
//         handleSubmit,
//         watch,
//         formState: { errors },
//     } = useForm()

//     const onSubmit = (data) => { console.log(data) }

//     return (
//         <div className='flex justify-center items-center h-[80vh] w-screen'>
//             <div className=' h-[80vh] w-[30vw] bg-gray-600 opacity-[0.5] rounded-3xl'>
//                 <form action="" onSubmit={handleSubmit(onSubmit)}>
//                     <h1 className='text-6xl m-10 p-5 font-bold bg-gradient-to-r from-[#FC354C] via-[#8A7681] to-[#0ABFBC]  bg-clip-text text-transparent' >LoginForm</h1>
//                     <input className='useremail h-[50px] w-[25vw] bg-transparent border-2 border-pink-500 rounded-xl p-2 m-3' type="text" name="email" id="" placeholder='Enter Email' {...register('email', { required: {value: true, message: 'Email is required'}})} />
//                     {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
//                     <input className='userpassword h-[50px] w-[25vw] bg-transparent border-2 border-pink-500 rounded-xl p-2 m-3' type="password" name="password" id="" placeholder='Enter Password' {...register('password', { required: {value: true, message: 'Password is required' , minLength: {value: 8, message: 'Password must be at least 8 characters'}}})} />
//                     <button type='submit' className='h-[50px] w-[25vw] bg-gradient-to-r from-[#FC354C] via-[#8A7681] to-[#0ABFBC] rounded-xl m-3 text-3xl'>Login</button>
                    
//                 </form>
//             </div>
//         </div>
//     )
// }

// export default LoginForm




import React, { useState } from "react";

function LoginForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-2xl w-[90%] max-w-md relative">
        {/* Toggle Header */}
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <div className="space-x-4">
            <button
              onClick={() => setIsLogin(true)}
              className={`font-semibold ${isLogin ? "text-blue-600" : "text-gray-500"}`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`font-semibold ${!isLogin ? "text-blue-600" : "text-gray-500"}`}
            >
              Register
            </button>
          </div>
          <button
            onClick={() => setVisible(false)}
            className="text-gray-500 hover:text-red-500 text-2xl leading-none"
          >
            ×
          </button>
        </div>

        {/* Form */}
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">
          Virdev {isLogin ? "Login" : "Register"}
        </h2>

        <form className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 font-semibold"
          >
            Submit
          </button>
        </form>

        {/* Register Link */}
        {isLogin && (
          <p className="text-sm text-center mt-4 text-gray-600">
            Not a user?{" "}
            <button
              onClick={() => setIsLogin(false)}
              className="text-blue-600 hover:underline"
            >
              Register
            </button>
          </p>
        )}
      </div>
    </div>
  );
}

export default LoginForm;








// export default function LoginForm({ onSwitch }) {
//   return (
//     <form className="space-y-4">
//       <input type="email" placeholder="Email" className="input" />
//       <input type="password" placeholder="Password" className="input" />
//       <button type="submit" className="btn">Login</button>
//       <p className="text-sm text-center text-gray-600">
//         Not a user?{" "}
//         <button type="button" onClick={onSwitch} className="text-blue-600 hover:underline">
//           Register
//         </button>
//       </p>
//     </form>
//   );
// }
