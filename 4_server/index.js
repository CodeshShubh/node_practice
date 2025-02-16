// simple create server with response
// const http = require('http');


// const server = http.createServer((req,res)=>{
//     console.log('New Request')
//     res.end('hellow word')
// })

// server.listen(8000,  ()=>{
//   return console.log('Server is created on port 8000')
// })


// multi page routing 

const http = require('http');

const server = http.createServer((req, res)=>{
   console.log(`Request on : ${req.url}`)

   switch(req.url){
     case '/' : res.end('Home Page')
     break;
     case '/about': res.end('About Page - Shubhanshu')
     break;
     case '/Contactus' : res.end('Contact us - 987654321')
     break;
     default: res.end('Page not found')
   }
})

server.listen(8000, ()=>{
    console.log('Server is working on Port : 8000')
})