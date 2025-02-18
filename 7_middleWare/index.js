import express from 'express';
import bodyParser from 'body-parser';

const app = express();


// custom middleware
app.use(bodyParser.json()) // this is also middleware
const customMiddleware = (req, res, next)=>{
    console.log(` this is use for custom middleware and this receive a request ${req.body.num1} and method ${req.method} but not sending 
        any response this will give goes to the next because it execute perfectly `)
        next(); // so this will goes to the next line
}

app.use(customMiddleware); // so this customMiddleware use here

 app.use((req,res)=>{
   res.status(200).send('invalid workign...')
 })

app.listen(8000, 'localhost', ()=>{
    console.log(`server is runnig....`)
})