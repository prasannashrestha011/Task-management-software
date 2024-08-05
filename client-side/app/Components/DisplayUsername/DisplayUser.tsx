'use client'
import React, { useEffect, useState } from 'react'
import { defaultUser, UserProp } from './UserProp'
import GetUserInfo from './Username'
import { PreLoadImage } from '../functions/ImageBlob/PreloadImages'
import { GetUserHook } from '@/app/Context/GetUserContext'
import { onMessage } from 'firebase/messaging'
import { messaging } from '../PushNotification/firebase'
import toast from 'react-hot-toast'

const DisplayUser = () => {
    const UserCmp=GetUserHook()
   
    const userID=window.localStorage.getItem("userID")
   
    const getUser=async()=>{
        if(userID){
            const data=await GetUserInfo(userID)
            
              const imgurl=await PreLoadImage(data.picture)
              UserCmp.setPicture(imgurl)
              UserCmp.setID(data.id)
              UserCmp.setName(data.name)
              UserCmp.setEmail(data.email)
              UserCmp.setPlainPicture(data.picture)
              
        }else{
            console.log("user id not found !!")
        }
    }
 
    useEffect(()=>{
      getUser()
     
      onMessage(messaging,(payload)=>{
        if(payload.notification?.body&&payload.notification.title){
            toast.success(payload.notification?.body)
            const notificationOptions={
                body:payload.notification.body,
                icon:payload.notification.icon
            }
            new Notification(payload.notification.title,notificationOptions)
        }
        
    })
    },[])
  return (

    <div className='absolute flex items-center justify-center gap-2 text-slate-100 top-2 left-3 cursor-pointer'>
      <span>
        <img src={`${UserCmp.picture?UserCmp.picture:'https://raw.githubusercontent.com/prasannashrestha011/ImageRepository/main/uploads/pngwing.com.png'}`}
      className='w-8 rounded-full border border-gray-400'
      /></span>
      <h1>{UserCmp.name}</h1>
    </div>
  )
}

export default DisplayUser
