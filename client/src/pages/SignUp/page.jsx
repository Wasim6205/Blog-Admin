import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const SignUp = () => {
  const history = useNavigate();
  const backendLink = useSelector((state)=>state.prod.link)
  const [Inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });

  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...Inputs, [name]: value });
  };

  const SubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${backendLink}/api/v1/sign-up`,
        Inputs,
        {
          withCredentials: true,
        }
      );
      toast.success(res.data.message);
      history("/login");
    } catch (error) {
      toast.error(error.response.data.error);
    } finally {
      setInputs({
        username: "",
        email: "",
        password: "",
      });
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="p-12 shadow-2xl rounded w-[80%] md:w-[60%] lg:w-[40%] flex flex-col items-center justify-center">
        <div className="text-2xl flex flex-col lg:flex-row gap-2 text-center">
          <h1 className="font-bold">Welcome!</h1>{" "}
          <span>Signup as a new user</span>
        </div>
        <form onSubmit={SubmitHandler} className="flex flex-col w-[100%] mt-8">
          <div className="flex flex-col mb-4">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              value={Inputs.username}
              name="username"
              className="mt-2 outline-none border px-3 py-2 rounded border-zinc-400"
              required
              onChange={change}
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              value={Inputs.email}
              name="email"
              className="mt-2 outline-none border px-3 py-2 rounded border-zinc-400"
              required
              onChange={change}
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              value={Inputs.password}
              name="password"
              className="mt-2 outline-none border px-3 py-2 rounded border-zinc-400"
              required
              onChange={change}
            />
          </div>
          <div className="flex mt-4">
            <button className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white px-4 py-2 rounded w-[100%]">
              Signup
            </button>
          </div>
        </form>
        <h4 className="mt-8">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:text-blue-700 hover:font-semibold"
          >
            Login
          </Link>
        </h4>
      </div>
    </div>
  );
};

export default SignUp;
