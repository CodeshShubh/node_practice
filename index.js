import express from 'express';

const app = express();


app.get('/', (req,res)=>{
     res.send('Home Page')
})

app.get('/about', (req,res)=>{
   res.send(` this is About page ${req.query.name}`)
})



app.listen(8000, 'localhost', ()=>{
 console.log (`server is working on : 8000`)
})