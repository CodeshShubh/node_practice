
 export const responseWithToken = (user, res, message , statusCode )=>{
        const token =  user.jwtToken();

        const options = {
            expires: new Date(Date.now()+15*24*60*60*1000),
            httpOnly:true,
            secure:false,
            sameSite:'none'
        }

        res.status(statusCode).cookie('token', token , options).json({
            success:true,
            message:message,
            user
        })
 }