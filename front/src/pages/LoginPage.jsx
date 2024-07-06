import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, checkIsAuth } from "../redux/features/auth/authSlice";
import { toast } from "react-toastify";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const { status } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector(checkIsAuth);

  useEffect(() => {
    if (status) toast(status);
    if (isAuth) navigate("/");
  }, [status, navigate, isAuth]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple email validation
    if (!email) {
      setErrors({ email: "Email is required" });
      return;
    }

    // Simple password validation
    if (!password) {
      setErrors({ password: "Password is required" });
      return;
    }

    // Dispatch login action
    try {
      dispatch(loginUser({ email, password }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-1/4 mx-auto mt-40">
      <h1 className="text-2xl text-white text-center mb-4">Log in</h1>
      <label className="block mb-4">
        <span className="text-xm  text-white">Email:</span>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className={`mt-1 text-white w-full rounded-lg bg-gray-800 border-2 border-gray-700 py-2 px-4 text-sm outline-none placeholder-gray-400 ${errors.email ? "border-red-500" : ""
            }`}
        />
        {errors.email && (
          <span className="text-red-500 text-xs mt-1">{errors.email}</span>
        )}
      </label>
      <label className="block mb-8">
        <span className="text-xm  text-white">Password:</span>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className={`mt-1 text-white w-full rounded-lg bg-gray-800 border-2 border-gray-700 py-2 px-4 text-sm outline-none placeholder-gray-400 ${errors.password ? "border-red-500" : ""
            }`}
        />
        {errors.password && (
          <span className="text-red-500 text-xs mt-1">{errors.password}</span>
        )}
      </label>
      <div className="flex justify-center">
        <button
          type="submit"
          className="text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-lg py-2 px-6"
        >
          Log in
        </button>
      </div>
      <div className="mt-4 text-center">
        <Link to="/register" className="text-xs text-white hover:underline">
          Don't have an account?
        </Link>
      </div>
    </form>
  );
};
