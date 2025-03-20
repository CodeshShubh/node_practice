export const catchAsyncError = (apiFunction)=>(req,res,next)=>{
     Promise.resolve(apiFunction(req,res,next)).catch(next)
}