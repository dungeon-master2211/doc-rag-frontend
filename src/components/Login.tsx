import React,{useState} from 'react'
import { Button } from "@/components/ui/button"
import { Link } from 'react-router'
import { backend_url } from '@/config'
import axios from 'axios'
import {toast} from 'react-toastify'
import { useNavigate } from 'react-router'
import { useAuth } from "./AuthContext";
const Login = () => {
    const navigate =  useNavigate()
    const {setIsLoggedIn} = useAuth()
    const [login,setLogin] = useState({
        email:'',
        password:''
    })
    function handleChange(e:React.ChangeEvent<HTMLInputElement>){
        setLogin(prev=>({...prev,[e.target.name]:e.target.value}))
    }
    async function loginHandle(e: React.FormEvent){
        e.preventDefault()
        try{
            let res = await axios.post(backend_url+'/sign-in',login,{
                withCredentials:true
            })
            let message = res.data.message
            toast(message)
            localStorage.setItem('login','true')
            setIsLoggedIn(true)
            navigate('/upload-documents')
            console.log(res)
        }catch(err:any){
            let error = err.response.data.detail
            console.log(error)
            toast(error)
        }
    }
  return (
    <div className='shadow-xl rounded-2xl w-100 my-4 p-8 text-white bg-gray-800 '>
        <h2 className='text-2xl py-2'>Login</h2>
        <div>
            <label htmlFor='email-input'>Email</label>
            <div className='py-2 my-2'>
                <input name="email" value={login.email} onChange={handleChange} className="email-input mt-1 w-full px-4 py-2 bg-zinc-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" type="email" placeholder='email@gmail.com'/>
            </div>
            <label htmlFor='password-input'>Password</label>
            <div className='py-2 my-2'>
                <input name="password" value={login.password} onChange={handleChange} className="password-input mt-1 w-full px-4 py-2 bg-zinc-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" type="password" placeholder='**********'/>
            </div>
            <div className='w-[100%] flex justify-center p-4'>
                <Button onClick={loginHandle} variant="outline" className='text-black cursor-pointer'>Button</Button>
            </div>
            <div className='w-[100%] flex justify-center p-4'>
                <h3>Don't have account? <Link to="/signup">Sign Up</Link></h3>
            </div>
        </div>
    </div>
  )
}

export default Login