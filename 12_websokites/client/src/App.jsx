import React, { useEffect, useMemo, useState } from 'react';
// this would be responsible for connecting client for the server
import {io} from 'socket.io-client'

const App = () => {

  const [message, setmessage] = useState('')
  const [room, setroom] = useState('')
  const [socketId, setsocketId] = useState('')
  const [sendMessage, setsendMessage] = useState([])
  const [groupChat, setgroupChat] = useState('')

  const socket = useMemo(()=>{
   return io('http://localhost:3000')
  },[])

  useEffect(()=>{
     socket.on('connect', ()=>{
       console.log('connected to server',socket.id)
        setsocketId(socket.id)
       socket.on('welcome', (msg)=>{
             console.log(msg)
       })
     })
     return ()=>{
      socket.disconnect()
     }

  },[])

 

  const handleSubmit = (e)=>{
    e.preventDefault()
    socket.emit('message', {message, room}) // sending a message to the whole server
    setmessage('');
  }

useEffect(()=>{
  socket.on('recieve-message', (data)=>{ //-> this will data or message will receive from the server side
     console.log(data); 
     setsendMessage((prev)=>[...prev , data])
   })
   return ()=>{
    socket.off('recieve-message')
   }
},[socket])

const joinGroupChat =(e)=>{
   e.preventDefault();
   socket.emit('join-group', groupChat);
   setgroupChat('')
}
 console.log(groupChat)
  return (
    <div>
      <h1 className='font-extrabold text-xl text-center mt-10'>
        Welcome to the chat application bulid by - shubhanshu
      </h1>
     <h3 className='font-extrabold'>{socketId}</h3>
      <form onSubmit={handleSubmit} className='space-x-10 text-center p-5 border'>
         <input type="text" value={message} placeholder='message' onChange={(e)=>setmessage(e.target.value)} className='border outline-none rounded'/>
         <input type="text" value={room} placeholder='room' onChange={(e)=>setroom(e.target.value)} className='border outline-none rounded'/>
         <button type='submit' className='bg-blue-800 px-3 py-1 rounded tranform hover:scale-101 cursor-pointer text-white'>Send</button>
      </form>

      {/*  this form for join room */}
      <form onSubmit={joinGroupChat}>
      <input type="text" value={groupChat} placeholder='groupChat' onChange={(e)=>setgroupChat(e.target.value)} className='border outline-none rounded'/>
      <button type='submit' className='bg-blue-800 px-3 py-1 rounded tranform hover:scale-101 cursor-pointer text-white'>join room</button>

      </form>
      {sendMessage.map((data , index)=>{
        return <p> {data} </p>
      })}
    </div>
  )
}

export default App;