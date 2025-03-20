import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import User from "../models/userModel.js";
import { errorHandler } from "../utils/errorHandler.js";
import { responseWithToken } from "../utils/responseWithToken.js";


export const Register = catchAsyncError(async(req,res,next)=>{
     const {name , email , password} = req.body;

     if(!name || !email || !password)
          return next( new errorHandler("Please enter all fields", 400));

      const existUser = await User.findOne({email})

          if(existUser)
                return next( new errorHandler("User Already exist", 409))


      const user = await User.create({name,email,password});

    //   res.status(201).json({status:true, message:"user created succesfully" , user})
    responseWithToken(user , res , `Register succesfully ${user.name}`, 201)
})


export const Login = catchAsyncError(async(req,res,next)=>{
    const {email ,password} = req.body;

    if(!email, !password)
          return next(new errorHandler('please Enter all fields', 400));

    const user = await User.findOne({email})
     if(!user)
         return next(new errorHandler('Password or email is incorrect', 400))

     // here we extract isCompaire method from the user which we created during making schema
      const isMatched = await user.isCompaire(password)

      if(!isMatched)
         return next(new errorHandler('Incorrect email or password', 400))

      responseWithToken(user , res, `Welcom back ${user.name},`, 200)
})


export const Logout = catchAsyncError(async (req,res,next)=>{

     res.status(200).cookie('token', null,{
        expires: new Date(Date.now()),
        httpOnly:true,
        secure:true,
        sameSite:'none',
     }).json({success: true, message:'Logout succesfully'})
})


export const getmyProfile = catchAsyncError(async(req,res,next)=>{
            const id  = req.user

            const user = await User.findById(id)

            if(!user)
                return next( new errorHandler( 'user not Available', 400))

            res.status(200).json({
                success:true,
                message: "user Fetched",
                user
            })
})