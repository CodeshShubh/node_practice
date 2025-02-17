import express from 'express';
import bodyParser from 'body-parser';

const app = express();


app.use(bodyParser.json());

app.get('/', (req,res)=>{
    res.send('this is respose from server')
})

app.post('/calculation', (req,res)=>{
   const {num1, num2} = req.body;
    res.send(`The sum of two number is ${num1+num2}`)
})

const port = 8000;
app.listen(port, ()=>{
    console.log(`server is wrking on port ${port}`)
})