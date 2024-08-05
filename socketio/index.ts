import express, { Request, Response } from 'express'
import {Server} from 'socket.io'
import {createServer} from 'http'
import cors from 'cors'
const app=express()
const httpServer=  createServer(app)
const io=new Server(httpServer,{
    cors:{
        origin:'*'
    }
})
app.use(cors({
    origin:'*'
}))

io.on('connection',(socket)=>{
    console.log('socket id : ',socket.id)
    socket.emit('server-message','you are connected to server')
    socket.on('user-message',(msg)=>{
        const [user,usermessage]=msg.split('-')
        console.log("message:" ,usermessage)
        socket.emit("user-message",`${user}-${usermessage}`)
        socket.broadcast.emit("user-message",`${user}-${usermessage}`)
    })
})
httpServer.listen(8081,()=>{
    console.log('Server running ...')
})