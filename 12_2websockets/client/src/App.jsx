import React, { useEffect, useMemo, useState } from "react";
import io, { Socket } from "socket.io-client";

const App = () => {
  const [message, setMessage] = useState("");
  const [id, setId] = useState("");
  const [messages, setMessages] = useState([]);
  const [inputId , setInputId] = useState('');
  const [roomName , setRoomName] = useState('')

  const initSocket = useMemo(() => io("http://localhost:3001"), []);

  useEffect(() => {
    initSocket.on("connect", () => {
      console.log(`Connected id: ${initSocket.id}`);
      setId(initSocket.id);
      return () => initSocket.disconnect();
    });
  }, [initSocket]);

  useEffect(() => {
    initSocket.on("receive-message", (data) => {
      console.log(`recieve-message : ${data}`);
      setMessages((prev) => [...prev, data]);
    });
  }, [initSocket]);

  const submitHandler = (e) => {
    e.preventDefault();
    initSocket.emit("Send-Message", {message , inputId});
    setMessage("");
  };

  const setRoomHandler = (e)=>{
    e.preventDefault()
    initSocket.emit('roomName', roomName)
    setRoomName('')
  }

  return (
    <div>
      <form onSubmit={submitHandler} className=" p-5 w-[50%] mx-auto text-center">
        <h1 className="text-center mt-5 mb-5">{id}</h1>
        <input
          type="text"
          placeholder="Enter Message"
          className="text-center border outline-none rounded"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <input
          type="text"
          placeholder="Enter id"
          className="text-center border outline-none rounded ml-5"
          onChange={(e) => setInputId(e.target.value)}
          value={inputId}
        />
        <button
          type="submit"
          className="bg-blue-700 cursore-pointer ml-5 p-1 rounded"
        >
          Send
        </button>
      </form>

      <form onSubmit={setRoomHandler} className="  p-5 w-[50%] mx-auto text-center">
        <input
          type="text"
          placeholder="Enter Room Name"
          className="text-center border outline-none rounded"
          onChange={(e) => setRoomName(e.target.value)}
          value={roomName}
        />
        <button
          type="submit"
          className="bg-blue-700 cursore-pointer ml-5 p-1 rounded"
        >
          Join Room
        </button>
      </form>
      {messages.map((msg, index) => {
        return <h1 key={index}>{msg}</h1>;
      })}
    </div>
  );
};

export default App;
