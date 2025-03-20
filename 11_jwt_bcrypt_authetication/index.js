import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

const app = express();
dotenv.config();


// bulid in middlewares ( thi is usefull to excute ( req.body ) raw data which is basically in json object formate)
app.use(express.json());
app.use(cookieParser());




// user Routes 

import userRoutes from './routes/userRoutes.js'

app.use('/user', userRoutes)


import { connectDB } from './utils/dbConnection.js';
connectDB()



const PORT = process.env.PORT || 4001
app.listen(PORT,(req,res)=>{
    console.log(`Server is working on port:${PORT}`)
})


import { errorMiddleWare } from './middlewares/errorMiddleWare.js';
app.use(errorMiddleWare)