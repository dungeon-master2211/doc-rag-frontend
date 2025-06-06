import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import { Outlet } from 'react-router'
import { ToastContainer} from 'react-toastify';
import { AuthProvider } from "./components/AuthContext";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <AuthProvider>
    <div className='bg-gray-900 h-screen p-0 m-0 flex flex-col justify-start items-center'>
      {/* Navbar */}
      <Navbar/>
      <Outlet/>
      <ToastContainer/>
    </div>
    </AuthProvider>
  )
}

export default App
