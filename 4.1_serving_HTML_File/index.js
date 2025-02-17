const http = require('http');
const fs = require('fs')

const server = http.createServer((req, res)=>{
    console.log(req.url)
     let path = './'
     statuscode='200'
    switch(req.url){
        case '/': path +='home.html'
        break;
        case '/about': path +='about.html'
        break;
        case '/contactus': path +='contactus.html'
        break;
        default: path += '404.html';
        statuscode='404'
        break
    }

    fs.readFile(path, (err, data)=>{
         if(err){
            console.log(err)
            
            res.write(`Error is serving page for  url ${req.url}. try later.`)
            res.end();
         }else{
            res.statusCode = statuscode
            res.end(data);
         }
    })

})


server.listen(3000,  ()=>{
  console.log('server is working on  3000')
})

