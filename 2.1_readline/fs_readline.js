const fs = require('fs');
const readline = require('readline');


const rl = readline.createInterface({input:process.stdin , output:process.stdout});


rl.question("Enter your text to save in a file", (input)=>{
    fs.writeFile('userFile.txt', input , (err)=>{
       if(err){
          console.log('error While creating a file', err)
       }
       console.log("file is created with your given input")

       fs.readFile('userFile.txt', 'utf-8' , (err,data)=>{
            if(err) console.log('error while reading file' ,err)
               console.log("UserFile content" , data)
            

            rl.question("Do you want to delete File?(yes/no)",(input)=>{
                 if(input.toLowerCase( )==="yes"){
                   fs.unlink('userFile.txt',(err)=>{
                      if(err) console.log('error while deleting file:' , err)
                         console.log('file Deleted Succesfully')
                        rl.close()
                   });
                 }else{
                   console.log("file Kept!");
                   rl.close()
                 }
            })
       })
    })

})