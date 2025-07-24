// import { useState } from "react";
// import LoginForm from "./LoginForm";
// import RegisterForm from "./RegisterForm";

// export default function AuthBox({ show, onClose }) {
//   const [isLogin, setIsLogin] = useState(true);

//   if (!show) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
//       <div className="bg-white p-6 rounded-xl shadow-xl w-[90%] max-w-md relative">
//         {/* Header with toggle and close */}
//         <div className="flex justify-between items-center mb-4 border-b pb-2">
//           <div className="space-x-4">
//             <button
//               onClick={() => setIsLogin(true)}
//               className={`font-semibold ${isLogin ? "text-blue-600" : "text-gray-500"}`}
//             >
//               Login
//             </button>
//             <button
//               onClick={() => setIsLogin(false)}
//               className={`font-semibold ${!isLogin ? "text-blue-600" : "text-gray-500"}`}
//             >
//               Register
//             </button>
//           </div>
//           <button onClick={onClose} className="text-2xl text-gray-600 hover:text-red-600">×</button>
//         </div>

//         <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">
//           Virdev {isLogin ? "Login" : "Register"}
//         </h2>

//         {isLogin ? (
//           <LoginForm onSwitch={() => setIsLogin(false)} />
//         ) : (
//           <RegisterForm onSwitch={() => setIsLogin(true)} />
//         )}
//       </div>
//     </div>
//   );
// }
