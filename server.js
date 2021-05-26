const express=require('express')
const path=require('path')
const socketio=require('socket.io')
const http=require('http')
const foundMessage=require('./utils/messages')
const formatMessages = require('./utils/messages')

const app=express()

//\create port
const PORT=4000 
const botName='ChatCord Bot'


//create server
const server=http.createServer(app)
// const server = app.listen(PORT, ()=>{
//     console.log(`Server listening... `);
// })

//load html, css etc 
app.use(express.static(path.join(__dirname,'public')))

//attach socket connetion on the server
const io=socketio(server)

//establish a socket connection
io.on('connection', socket=>{
    console.log(`New WebSocket established w/ id ${socket.id}`);

    //connection message only to client
    socket.emit('message', formatMessages(botName,"Welcome to Chat-Okay") )

    //send message to all other clients except the sender
    socket.broadcast.emit('message', formatMessages(botName,"A user has entered the chat."))
    
    
    
    //listen chatmsg
    socket.on('chatMsg', (msg)=>{
        //console.log(msg);
        io.emit('message',formatMessages('user',msg))
    })

    //disconnection
    socket.on('disconnect', ()=>{
        io.emit('message', formatMessages(botName,"A user a left the chat"))
    })
    
})



server.listen(PORT, ()=>{
    console.log(`server running at ${PORT}`);
})