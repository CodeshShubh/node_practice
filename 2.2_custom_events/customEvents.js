const eventHandler = require('events')

const event = new eventHandler();


event.on('OrderSystem', (OrderId , name , rating)=>{ // listen event by line 24 
      console.log(`Order ${OrderId} Placed by ${name}`)
     event.emit('Order', {OrderId , name , rating})
})




event.on('Order',({OrderId , name , rating})=>{
     console.log(`Order ${OrderId} is in processing customer Rating is : ${rating}`)
    const price = 7000 // here if we need price to emit we have to sparly send it becouse in on we reciing Order which have only OrderId and name
     event.emit('orderProcessing' , {OrderId , price , name})
})

event.on('orderProcessing', ({OrderId , name , price})=>{
     console.log(`orderDispatch withId ${OrderId} dispatch by ${name} and price is  ${price}`)
})

event.emit('OrderSystem' , 101 , 'Ramesh')
event.emit('OrderSystem' , 102 , "Ramesh2" , "ChutiyaCustomer")

//by these two OrderSystem emit trigger triggered  on two times first one not sending rating so it shows undefine

