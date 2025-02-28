import mongoose from "mongoose";

export const dbConnection =(URI)=>{
   mongoose.connect(URI).then(()=>{
    console.log(`Database is Running...`)
   }).catch((err)=>{
     console.log(`Error connection with the database`,err)
   })
}