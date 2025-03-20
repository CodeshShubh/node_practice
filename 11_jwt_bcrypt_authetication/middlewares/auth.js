import { errorHandler } from "../utils/errorHandler.js";
import { catchAsyncError } from "./catchAsyncError.js";
import jwt from 'jsonwebtoken'

export const isAuthenticated = catchAsyncError(async(req,res,next)=>{
     const {token} = req.cookies;

     if(!token)
           return next(new errorHandler('not Logged in, please Login first', 401))

         const decode = await jwt.verify(token, process.env.PrivateKey)

        req.user = decode._id
        next();
})