import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';

const app = express();
const PORT = 8000;


const usersData = JSON.parse(fs.readFileSync('./MOCK_DATA.json', 'utf-8',))
// console.log(usersData)

// third Party middle ware 
app.use(bodyParser.urlencoded({extended:true}));

// custom middleWare 1
app.use((req,res,next)=>{ 
  console.log(`middleware1 is working ${req.ip} and ${req.method}`) // if we use this only then get a request from the postmant then is cotinesuly loading not getting any response
//   res.status(200).json({Message:'m1 is working'}) // if we use this this is end here only not going next line and end response here
  next(); // now this will allow to execute next line app.get resquest
})

app.use


app.get('/api/users',(req,res)=>{
    if(usersData.length>0) res.status(200).json({Message:'User Fetched Succesfully' , usersData})
})















app.listen(PORT, ()=>{
    console.log('server is running...')
})