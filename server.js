const express=require('express')
const app=express()

const socketio=require('socket.io')

const server = app.listen(4000, ()=>{
    console.log(`Server listening... `);
})

app.use(express.static('public'))

const io=socketio(server)

io.on('connection', (socket)=>{
    console.log(`New WebSocket established w/ id ${socket.id}`);
})