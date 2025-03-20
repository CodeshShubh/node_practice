import mongoose from "mongoose";


export const connectDB =()=>{
 mongoose.connect(process.env.URI)
.then((res)=>console.log(`database is connected: ${res.connection.host}`))
.catch((err)=>console.log(`Error connecting databse: ${err}`))
}

