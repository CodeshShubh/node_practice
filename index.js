import express from 'express';
import fs from 'fs';
import bodyParser from 'body-parser';
const usersData = JSON.parse(fs.readFileSync('./MOCK_DATA.json', 'utf-8'));



// console.log(userData)

const app = express();
const PORT = 8000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))


// get all users
app.get('/api/users', (req,res)=>{
    res.json(usersData)
})

// get one user by id
// app.get('/api/user/:id',(req,res)=>{
//     const id = Number(req.params.id)
//     console.log(id)
//     const user = usersData.find((user)=> user.id === id)
//     res.json(user)
// })



// add user 
app.post('/api/user',(req,res)=>{
    const user = req.body;
     const userData = {...user , id: usersData.length +1 }
    //  console.log('newUser', userData)
     usersData.push(userData)
 fs.writeFile('./MOCK_DATA.json', JSON.stringify(usersData), (err, data)=>{
    // console.log(user)
    res.send(user)
 })
    
})


// delete
// app.delete('/api/user/:id',(req,res)=>{
//     const id = Number(req.params.id);

//     const userIndex = usersData.findIndex((user) => user.id === id);

//         if(userIndex === -1){
//             return res.status(404).json({message: 'User not found'})
//         }

//      const deleteUser = usersData.splice(userIndex,1)

//      fs.writeFile('./MOCK_DATA.json', JSON.stringify(usersData,null , 2), (err, result)=>{

//         res.status(200).json({message: "user Delete succesfully", deleteUser})
//      })

// })






//if route is same but methods is differnt so we can use route 
app.route('/api/user/:id').get((req,res)=>{
    const id = Number(req.params.id)
    console.log(id)
    const user = usersData.find((user)=> user.id === id)
    res.json(user)
}).delete((req,res)=>{
    const id = Number(req.params.id);

    const userIndex = usersData.findIndex((user) => user.id === id);

        if(userIndex === -1){
            return res.status(404).json({message: 'User not found'})
        }

     const deleteUser = usersData.splice(userIndex,1)

     fs.writeFile('./MOCK_DATA.json', JSON.stringify(usersData,null , 2), (err, result)=>{

        res.status(200).json({message: "user Delete succesfully", deleteUser})
     })

})

// update user data
app.patch('/api/user/:id',(req,res)=>{
    const userId = Number(req.params.id);
    const updateData = req.body;

    const userIndex = usersData.findIndex((item)=> userId === item.id)

    if(userIndex === -1){
      return  res.status(404).json({message: 'user not found'})
    }

    usersData[userIndex] = {...updateData[userIndex], ...updateData}
    console.log(usersData[userIndex])
  
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(usersData, null,2),(err, result)=>{

    res. status(200).json({message: 'user Update succesfully', updateUser: usersData[userIndex]})
    console.log(result)
           
    });


})














app.listen(PORT,()=>{
    console.log(`server is working....`)
})