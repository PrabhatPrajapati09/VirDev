import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function AuthBox() {
  const { mode } = useParams(); // 'login' or 'register'
  const [isLogin, setIsLogin] = useState(mode === "login");
  const navigate = useNavigate();

  useEffect(() => {
    setIsLogin(mode === "login");
  }, [mode]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-2xl w-[90%] max-w-md relative">
        {/* Toggle Header */}
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <div className="space-x-4">
            <button
              onClick={() => {
                setIsLogin(true);
                navigate("/auth/login");
              }}
              className={`font-semibold ${isLogin ? "text-blue-600" : "text-gray-500"}`}
            >
              Login
            </button>
            <button
              onClick={() => {
                setIsLogin(false);
                navigate("/auth/register");
              }}
              className={`font-semibold ${!isLogin ? "text-blue-600" : "text-gray-500"}`}
            >
              Register
            </button>
          </div>
          <button
            onClick={() => navigate("/")}
            className="text-gray-500 hover:text-red-500 text-2xl leading-none"
          >
            ×
          </button>
        </div>

        {/* Form Header */}
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">
          Virdev {isLogin ? "Login" : "Register"}
        </h2>

        {/* Form Content */}
        {isLogin ? (
          <form className="space-y-4">
            <input type="email" placeholder="Email" className="input" />
            <input type="password" placeholder="Password" className="input" />
            <button type="submit" className="btn">
              Login
            </button>
            <p className="text-sm text-center mt-4 text-gray-600">
              Not a user?{" "}
              <button onClick={() => navigate("/auth/register")} className="text-blue-600 hover:underline">
                Register
              </button>
            </p>
          </form>
        ) : (
          <form className="space-y-3">
            <input type="text" placeholder="First Name" className="input" />
            <input type="text" placeholder="Last Name" className="input" />
            <input type="text" placeholder="Username" className="input" />
            <input type="email" placeholder="Email" className="input" />
            <input type="password" placeholder="Password" className="input" />
            <button type="submit" className="btn">Register</button>
            <p className="text-sm text-center text-gray-600">
              Already have an account?{" "}
              <button onClick={() => navigate("/auth/login")} className="text-blue-600 hover:underline">
                Login
              </button>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
