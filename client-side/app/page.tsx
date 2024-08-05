"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import { generateToken ,messaging} from "./Components/PushNotification/firebase";
import { onMessage } from "firebase/messaging";
import toast from "react-hot-toast";
import { GetUserHook } from "./Context/GetUserContext";


export default function Home() {
  const [token,setToken]=useState<string>("")
  const [accessToken,setAccessToken]=useState<string>("")
  const UserCmp=GetUserHook()
 
  useEffect(()=>{
    generateToken(UserCmp.id)
    onMessage(messaging,(payload)=>{
      console.log(payload)
        
     if (payload && payload.notification?.body) {
    toast.success(payload.notification.body);
        }
    })

  },[])
  const notificationHandler=async()=>{
  
  }
  return (
   <div>
    hi
    <button onClick={notificationHandler}>Click for notification</button>
   </div>
  );
}
