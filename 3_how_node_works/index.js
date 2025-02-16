const fs = require('fs');


// if we have blocking oprations
console.log(1)
console.log(2)
console.log(3)

const result = fs.readFileSync('text.txt', 'utf-8')
console.log('blocking output :',result)

console.log(4)
console.log(5)
console.log(6)
console.log(7)





// if we have non  blocking oprations
console.log(1)
console.log(2)
console.log(3)

fs.readFile('text.txt', 'utf-8',(err, result)=>{
    if(err){
        console.log(err)
    }else{
        console.log( 'nonblcking output :',result)
    }
})


console.log(4)
console.log(5)
console.log(6)
console.log(7)



// check system core length of node js

const os = require('os')

console.log(os.cpus().length);