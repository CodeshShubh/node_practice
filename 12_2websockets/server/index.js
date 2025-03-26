import express from 'express';
import {Server} from 'socket.io';
import {createServer} from 'http';


const app = express();
const server = createServer(app);
const PORT=3001;
const FRONTEND_URL='http://localhost:5173' 

const io = new Server(server , {
    cors:{
        origin:`${FRONTEND_URL}`,
        credentials:true,
        methods:["POST", 'GET']
    }
})

io.on('connection', (socket)=>{
    console.log(`Connected socket id: ${socket.id}`)
    socket.on('Send-Message', ({message , inputId})=>{ //data //{message ,inpuId} // {message , roomName}
        console.log(message , inputId)
        //  socket.emit('receive-message', data) // emit everWhere
        //  socket.broadcast.emit('receive-message', data) // emit everyWhere except itself
        socket.to(inputId).emit('receive-message', message)

    })

    // join is herer workig sending message by joining room sending  sending to name as id
    socket.on('roomName' , (roomName)=>{
        socket.join(roomName)
        console.log(`user join room : ${roomName}`)
    })

    socket.on('disconnect',()=>{
        console.log(`socket is disconnected ${socket.id}`)
    })
})



app.get('/',(req,res)=>{
    res.send(`Welcome server is working go to frontend url : ${FRONTEND_URL}`)
})
server.listen(PORT,(req,res)=>{
     console.log(`Server is working on PORT: ${PORT}`)
})
