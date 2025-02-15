const fs = require('fs');

// createfile or writefile
// if(!fs.existsSync('./text.txt')){
//     fs.writeFile('./text.txt', 'text', (err)=>{
//         if(err){
//           console.log(err);
  
//         }else{
//           console.log('file write succesfully')
//         }
//   } )
// }else{
//     console.log('file already exist')
// } 





// deletefile or unlink file
// if(fs.existsSync('./function.js')){
//     fs.unlinkSync('./function.js')
// }else{
//     console.log('file not exist which you want to delete')
// }




// readfile
// if(fs.existsSync('./text.js')){
//    let fileData =  fs.readFileSync('./text.txt', 'utf-8');
//    console.log(fileData);
// }else{
//     console.log('reding file not exist')
// }


// append file
// if(fs.existsSync('./text.txt')){
//      fs.appendFileSync('./text.txt', 'this is new Data\n')   
// }else{
//     console.log('file not exist which you want to append')
// }  


// create new forder or mkdir
// if(!fs.existsSync('luda')){
//     fs.mkdirSync('luda')
// }else{
//     console.log('file already exist')
// } 



// check stat fo an file
// let data = (fs.statSync('./text.txt'))
// console.log(data)