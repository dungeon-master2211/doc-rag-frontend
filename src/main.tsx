import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {createBrowserRouter,RouterProvider} from 'react-router'
import Auth from "./components/Auth.tsx"
import Signup from './components/SignUp.tsx'
import ChatRAG from './components/Chat.tsx'
import Doc_Upload from './components/Doc_Upload.tsx'
import Landing from './components/Home.tsx'
let router = createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children:[
      {
        path:'/',
        element:<Landing/>
      },
      {
        path:'/login',
        element:<Auth/>
      },
      {
        path:'/signup',
        element:<Signup/>
      },
      {
        path:'/chat',
        element:<ChatRAG/>
      },
      {
        path:'/upload-documents',
        element:<Doc_Upload/>
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router}/>
)
