import express from 'express';
import { Server } from 'socket.io';
import {createServer} from 'http';
import cors from 'cors'


const app = express();
const port = 3000;

// http network provides foundation for our socket.io server
const server = createServer(app)

// we create a server on top of http server hand shake
const io = new Server(server, {
    cors:{
        origin:'http://localhost:5173',
        methods:["GET", "POST"],
        credentials:true,
    } 
})

app.use(cors(
    {
        origin:'http://localhost:5173',
        methods:["GET", "POST"],
        credentials:true,
    } 
))

// this is a soket function that esablishes a live connection
io.on('connect',(soket)=>{
  console.log('a user has been connected with id', soket.id);   
//   soket.broadcast.emit('welcome', 'boradcase use for if a user triggerd event then this mesg show to everone not show those who triggered this event')
//   soket.broadcast.emit('welcome', `${soket.id} has join the chat`)

//   soket.emit('welcome', 'welcome to the chat application fuck you self')

soket.on('message', ({message , room})=>{
//   console.log(data)
//   io.emit('recieve-message', data) //-> this will recerve a message and emit it
//    soket.broadcast.emit('recieve-message', message) // this will show message which receive not send  that messaage which emit this event or send this message or data
   soket.to(room).emit('recieve-message', message) // this is use for send message for one perticuler room id client
})

soket.on('join-group' , (groupChat)=>{
    soket.join(groupChat);
    console.log(`user joined ${groupChat}` )
})

soket.on('disconnect', ()=>{
    console.log('user disconnected', soket.id)
})

})    
 
app.get('/', (req,res)=>{
    res.send('<h1> Welcome to the chat application build by - shubhanshu</h1>')
})






server.listen(port, ()=>{
    console.log(`server is working on port : ${port}`)
})