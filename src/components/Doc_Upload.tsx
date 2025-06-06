import axios from "axios"
import React,{useState,useEffect} from 'react'
import { Button } from './ui/button'
import { Input } from "@/components/ui/input"
import { backend_url } from '@/config'
import {toast} from "react-toastify"
import {useNavigate} from 'react-router'
interface MyDocs{
    id:number
    filename:string
    status:string
}

const Doc_Upload = () => {
    const navigate = useNavigate()
    useEffect(()=>{
        let isLoggedIn = localStorage.getItem('login')
        if (isLoggedIn!=='true') goToLogin()
        else{
            fetchMyDocs()
        }
        
    },[])
    function goToLogin(){
        navigate('/login')
    }
    async function fetchMyDocs(){
        try{
            let res = await axios.get(backend_url+'/file/all',{
                withCredentials:true
            })
            let uploaded_files = res.data.files
            setMyDocs(uploaded_files)
            
        }catch(err:any){
            let error = err.response.data?.detail
            console.log(error)
            toast(error)
        }
    }
    const [uploading, setUploading] = useState(false);
    const [file, setFile] = useState<File | null>(null);

    const [myDocs,setMyDocs] = useState<MyDocs[]>([])

    async function handleUpload(){
        if (!file) return
        setUploading(true)
        const formData = new FormData();
        formData.append("files", file);
        try{
            let res = await axios.post(backend_url+'/upload',formData,{
                withCredentials:true
            })
            let uploaded_files = res.data.files
            let message = res.data.message
            toast(message)
            setMyDocs(prev=>([...prev,...uploaded_files]))
            
        }catch(err:any){
            let error = err.response.data?.detail
            console.log(error)
            toast(error)
        }
        
        setUploading(false)
        setFile(null)
         

    }
    function handleChange(e: React.ChangeEvent<HTMLInputElement>){
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    }

    async function handleProcessData(id:number){
        try{
            let res = await axios.get(backend_url+`/file/process/${id}`,{
                withCredentials:true
            })
            
            let message = res.data.message
            toast(message)
            setMyDocs(prev=>(prev.map(item=>{
                return item.id!=id?item : {...item,status:'processed'}
            })))
            
        }catch(err:any){
            let error = err.response.data?.detail
            console.log(error)
            toast(error)
        }
    }

  return (
    <div className='bg-gray-900 w-full h-screen max-h-screen text-white p-4'>
        <h1 className='text-3xl'>Uploaded Documents</h1>
        <div className="overflow-x-auto m-2">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-200 text-left text-sm font-medium text-gray-700">
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Filename</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {myDocs.length === 0 ? (
                <tr>
                  <td colSpan={3} className="text-center text-gray-500 py-6">
                    No documents uploaded.
                  </td>
                </tr>
              ) : (
                myDocs.map((doc) => (
                  <tr
                    key={doc.id}
                    className="border-b hover:bg-gray-500 transition duration-200"
                  >
                    <td className="px-4 py-2">{doc.id}</td>
                    <td className="px-4 py-2">{doc.filename}</td>
                    <td className="px-4 py-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          doc.status === "processed"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {doc.status}
                      </span>
                      {
                        doc.status !== "processed" && <Button variant='outline' onClick={()=>handleProcessData(doc.id)} className='text-black ml-2 cursor-pointer'>Process</Button>
                      }
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        <div className='w-full flex flex-col justify-between items-center mt-10'>
            <h2 className='text-2xl m-2'>Upload Document</h2>
            <div className="grid w-full max-w-sm items-center gap-3 text-white">
                <Input id="picture" type="file" className='text-white' onChange={handleChange}/>
                 <button
                    onClick={handleUpload}
                    disabled={!file || uploading}
                    className={`px-4 py-2 bg-blue-600 text-white rounded-md ${
                    uploading || !file ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
                     }`}>Upload</button>
            </div>
        </div>
    </div>
  )
}

export default Doc_Upload