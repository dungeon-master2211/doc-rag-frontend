import React, { useState, useRef, useEffect } from "react";
import {useNavigate} from 'react-router'
import axios from 'axios'
import { backend_url } from "@/config";
import { Skeleton } from "@/components/ui/skeleton"
interface Message {
  sender: "user" | "bot";
  text: string;
}

const ChatRAG: React.FC = () => {
    const navigate = useNavigate()
    
    function goToLogin(){
        navigate('/login')
    }
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [waiting,setWaiting] = useState(false)
  const chatRef = useRef<HTMLDivElement>(null);
    useEffect(()=>{
        let isLoggedIn = localStorage.getItem('login')
        if (isLoggedIn!=='true') goToLogin()
        else{
            let chats = localStorage.getItem('chats')
            
            if (chats) setMessages(JSON.parse(chats))
        }
        
    },[])
  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: Message = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setWaiting(true)
    let chat = localStorage.getItem('chats')
    let oldChats:Message[] = []
    if(chat){
        oldChats = JSON.parse(chat)
        oldChats.push(userMsg)
        
    }
    try{
        let res = await axios.post(backend_url+'/query',{query:input},{
            withCredentials:true
        })
        let message = res.data
        let assistantMsg:Message = { sender: "bot", text: message }
        setMessages((prev) => [...prev, assistantMsg]);
        
        oldChats.push(assistantMsg)
        console.log(res)
    }catch(err:any){
        console.log(err)
        let error = err.response.data.detail
        console.log(error)
        
        let assistantMsg:Message = { sender: "bot", text: `Uh oh, Pardon me your highness! - ${error}` }
        setMessages((prev) => [...prev, assistantMsg]);
        oldChats.push(assistantMsg)
    }
    setWaiting(false)
    
    localStorage.setItem('chats',JSON.stringify(oldChats))
  };

  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  return (
    <div className="max-h-screen h-screen bg-gray-900 text-white flex items-center justify-center p-4 w-full">
      <div className="w-full max-w-2xl bg-gray-800 shadow-2xl rounded-xl flex flex-col h-[80vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-700 text-lg font-semibold">
          Document Chat Assistant
        </div>

        {/* Chat Area */}
        <div
          className="flex-1 overflow-y-auto px-4 py-2 space-y-3"
          ref={chatRef}
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-xl max-w-sm ${
                  msg.sender === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-700 text-gray-100"
                }`}
              >
                {msg.text}
                
              </div>
              
            </div>
          ))}
        </div>
          {waiting && <Skeleton className="h-10 w-[250px]" />}
        {/* Input */}
        <div className="p-4 border-t border-gray-700 flex items-center space-x-2">
          <input
            type="text"
            placeholder="Ask something..."
            className="flex-1 px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            onClick={handleSend}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatRAG;
