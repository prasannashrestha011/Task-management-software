"use client"
import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react'
import { SocketInit } from '../../socketio/Socketio'
import { Socket } from 'socket.io-client'
import { Input, User } from '@nextui-org/react'
import { GetUserHook } from '@/app/Context/GetUserContext'
import { InsertMessage } from '../functions/InsertMessage'
import { GroupContextHook } from '../GroupContext/GroupContext'
const socket:Socket= SocketInit()
const ChatSystem:React.FC = () => {
  const UserCmp=GetUserHook()
  const GroupCmp=GroupContextHook()
  const [message,setMessage]=useState<string>("")
  const latestMessageRef=useRef<HTMLDivElement>(null)
  const [server_message,setServerMessage]=useState<string[]>([])
    useEffect(()=>{
      socket.on('connect',()=>{
            console.log("connected to server",socket.id)

        })
        socket.on('user-message',(msg)=>{
          console.log(msg)
          setServerMessage(prevMessage=>[...prevMessage,msg])
        })
        socket.on('server-message',(msg)=>{
          console.log(msg)
        })
        return () => {
          socket.off('connect');
          socket.off('user-message');
      };
    },[])
    useEffect(()=>{
      setServerMessage([])
    },[GroupCmp.group_chat])
    const handleUserInput=(e:ChangeEvent<HTMLInputElement>)=>{
      setMessage(e.target.value)
    }
    const handleUserSubmit=async(e:FormEvent)=>{
      e.preventDefault()
      socket.emit('user-message',`${UserCmp.name}-${message}`)
      await InsertMessage(GroupCmp.group_id,`${UserCmp.name}-${message}`)
      setMessage("")
    }
    const scrollToBottom=()=>{
     if(latestMessageRef.current){
      latestMessageRef.current.scrollTo({
        top:latestMessageRef.current.scrollHeight,
        behavior:'smooth',
      })
     }
    }
    useEffect(()=>{
      scrollToBottom()
    },[message,GroupCmp.group_chat,server_message])
  return (
    <div className=' flex  justify-end items-end  h-full flex-col z-10 '>
     
       <div 
       ref={latestMessageRef}
       className=' w-full  h-5/6 overflow-y-scroll scrollbar-hide bg-purple-800  '>
       <div>
        <ul>
          {GroupCmp.group_chat&&GroupCmp.group_chat.map((msg,idx)=>{
            const [user,message]=msg.split('-')
            return(
              <li key={idx}>
                 <div className={`flex gap-1 w-full flex-col justify-center ${user==UserCmp.name?'items-end':'items-start'} `}>
                 
                 
                 <div className="chat chat-start">
                 <div className={`chat-bubble rounded-sm w-fit flex flex-col justify-center items-start ${user==UserCmp.name?'chat-bubble-secondary':''} `}>
                 <strong className='w-44 '>{user}</strong>
                   <span>{message}</span>
                   </div>
               </div>
               
               </div>
              </li>
            )
          })}
        </ul>
       </div>
        <ul>
          {server_message.map((msg,idx)=>{
            const [user,message]=msg.split('-')
            return(
              <li key={idx} className='z-0'>
                <div className={`flex gap-1 w-full flex-col justify-center ${user==UserCmp.name?'items-end':'items-start'} `}>
                 
                 
                  <div className="chat chat-start">
                  <div className={`chat-bubble rounded-sm w-fit flex flex-col justify-center items-start ${user==UserCmp.name?'chat-bubble-secondary':''} `}>
                  <strong className='w-44 '>{user}</strong>
                    <span>{message}</span>
                    </div>
                </div>
                
                </div>
            </li>
            )
          })}
          </ul>
       </div>
  
     <form onSubmit={handleUserSubmit} className='bg-white   flex gap-4 justify-center items-center  w-full border-t border-gray-200 '>
     <Input type='text' className='w-7/12' 
      value={message} 
      onChange={handleUserInput}/>
      <button className='btn btn-sm btn-primary w-24 rounded-sm' type='submit'>Send </button>
     </form>
    </div>
  )
}

export default ChatSystem
