import React, {useEffect } from 'react'
import { Link } from 'react-router'
import { Button } from './ui/button'
import { backend_url } from '@/config'
import axios from 'axios'
import {toast} from 'react-toastify'
import { useNavigate } from 'react-router'
import { useAuth } from "./AuthContext";
const Navbar = () => {
    const navigate = useNavigate()
    const {isLoggedIn,setIsLoggedIn} = useAuth()
    useEffect(()=>{
            let isLogged = localStorage.getItem('login')
            if (isLogged!=='true') setIsLoggedIn(false)
            else{
                setIsLoggedIn(true)
            }
            
        },[isLoggedIn])
    function goToLogin(){
        navigate('/login')
    }
    async function handleLogout(e:React.FormEvent){
        e.preventDefault()
        try{
            let res = await axios.get(backend_url+'/logout',{
                withCredentials:true
            })
            localStorage.setItem('login','false')
            localStorage.setItem('chats','')
            setIsLoggedIn(false)
            console.log(res)
            goToLogin()
        }catch(err:any){
            let error = err.response.data.detail
            console.log(error)
            toast(error)
        }
    }
  return (
    <div className='py-4 px-4 w-screen flex justify-around items-center text-white shadow-md bg-zinc-700'>
        <h1 className='text-3xl font-bold'><Link to="/">DocRAG</Link></h1>
        <div><Link to="/upload-documents">Your Documents</Link></div>
        <div>
            <Link to="/chat">Chat</Link>
        </div>
        <div>
            {!isLoggedIn && <Link to="/login">Login</Link>}
        </div>
        <div>
            {
               isLoggedIn && <Button variant={'destructive'} onClick={handleLogout}>LogOut</Button>
            }
            
        </div>
    </div>
  )
}

export default Navbar

