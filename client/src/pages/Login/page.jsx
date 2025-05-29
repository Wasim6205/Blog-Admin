import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import {useDispatch, useSelector} from 'react-redux'
import { authActions } from '../../store/auth';

const Login = () => {
  const history = useNavigate()
  const backendLink = useSelector((state)=>state.prod.link)
  const dispatch = useDispatch()
  
  const [Inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const change = (e) => {
    const {name, value} = e.target;
    setInputs({...Inputs, [name]: value});
  }

  const SubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${backendLink}/api/v1/log-in`,
        Inputs,
        {
          withCredentials: true,
        }
      );
      dispatch(authActions.login())
      toast.success(res.data.message);
      history("/profile");
    } catch (error) {
      toast.error(error.response.data.error);
    } finally {
      setInputs({
        email: "",
        password: "",
      });
    }
  };
  
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="p-12 shadow-2xl rounded w-[80%] md:w-[60%] lg:w-[40%] flex flex-col items-center justify-center">
        <div className="text-2xl flex flex-col lg:flex-row gap-2 text-center">
          <h1 className="font-bold">Welcome! Again</h1>{" "}
          <span>Please login here</span>
        </div>
        <form onSubmit={SubmitHandler} className="flex flex-col w-[100%] mt-8">
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
              Login
            </button>
          </div>
        </form>
        <h4 className='mt-8'>Don't have an account? <Link to='/signup' className='text-blue-600 hover:text-blue-700 hover:font-semibold'>Signup</Link></h4>
      </div>
    </div>
  )
}

export default Login