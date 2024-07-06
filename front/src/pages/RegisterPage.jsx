import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, checkIsAuth } from "../redux/features/auth/authSlice";
import { toast } from "react-toastify";

export const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [errors, setErrors] = useState({});

  const { status } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector(checkIsAuth);

  useEffect(() => {
    if (status) {
      toast(status);
    }

    if (isAuth) {
      navigate('/');
    }
  }, [status, isAuth, navigate]);

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

    // Simple full name validation
    if (!fullName) {
      setErrors({ fullName: "Full Name is required" });
      return;
    }

    try {
      dispatch(registerUser({ email, password, fullName }));
      setEmail("");
      setPassword("");
      setFullName("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-1/4 mx-auto mt-40">
      <h1 className="text-2xl text-white text-center mb-4">Register</h1>
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

      <label className="block mb-4">
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

      <label className="block mb-8">
        <span className="text-xm  text-white">Full Name:</span>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Full Name"
          className={`mt-1 text-white w-full rounded-lg bg-gray-800 border-2 border-gray-700 py-2 px-4 text-sm outline-none placeholder-gray-400 ${errors.fullName ? "border-red-500" : ""
            }`}
        />
        {errors.fullName && (
          <span className="text-red-500 text-xs mt-1">{errors.fullName}</span>
        )}
      </label>

      <div className="flex justify-center">
        <button
          type="submit"
          className="text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-lg py-2 px-6"
        >
          Register
        </button>
      </div>
      <div className="mt-4 text-center">
        <Link to="/login" className="text-xs text-white hover:underline">
          Already registered? Log in
        </Link>
      </div>
    </form>
  );
};

