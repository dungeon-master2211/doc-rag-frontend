import React, { useState } from "react";
import { Link } from "react-router";
import axios from 'axios'
import {toast} from 'react-toastify'
import { backend_url } from "@/config";
import { useNavigate } from 'react-router'
const SignupDark: React.FC = () => {
    const navigate = useNavigate()
  const [form, setForm] = useState({
    
    email: "",
    password: "",
    
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try{
        let res = await axios.post(backend_url+'/sign-up',form,{
            withCredentials:true
        })
        console.log(res)
        localStorage.setItem('login','true')
        navigate('/upload-documents')
    }catch(err:any){
        let error = err.response.data.detail
        console.log(error)
        toast(error)
    }
    console.log("Signup details:", form);
  };

  return (
    <div className="max-h-screen w-100 my-2 p-2 flex items-center justify-center bg-gray-800 px-4">
      <div className="bg-gray-800 shadow-2xl rounded-2xl p-8 w-full max-w-md text-gray-100">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 bg-zinc-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div> */}
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          {/* <div>
            <label className="block text-sm font-medium">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div> */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Sign Up
          </button>

        </form>
        <div className='w-[100%] flex justify-center p-4'>
            <h3>Already have account? <Link to="/login">Log In</Link></h3>
        </div>
      </div>
    </div>
  );
};

export default SignupDark;
