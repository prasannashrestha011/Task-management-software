"use client"
import { GetUserHook } from '@/app/Context/GetUserContext'
import React, { useEffect, useState } from 'react'
import { NotificationProp } from '../PushNotification/NotificationProps'
import { getUnreadNotifications } from '../PushNotification/sendNotification'

import NotificationPanel from './NotificationPanel'
import { Badge } from '@mui/material'
import MailIcon from '@mui/icons-material/Mail';
import * as Ariakit from "@ariakit/react";
const GetUserNotifications:React.FC = () => {
    const [notification_count,setNotificationCount]=useState<number>(0)
    const [show_notification_panel,setShowNotificationPanel]=useState<boolean>(false)
    const [open, setOpen] = useState(false);
    const UserCmp=GetUserHook()
  
    const getUserNotifications=async()=>{
        const data:NotificationProp=await getUnreadNotifications(UserCmp.name)
        console.log(data.unread_messages , " is your messages")
        setNotificationCount(data.unread_messages)
        
    }
    const handleNotificationPanel=async()=>{
      setOpen(!open)
    }
    useEffect(()=>{
        console.log(notification_count)
        getUserNotifications()
    },[UserCmp,notification_count,UserCmp.change_state])
  return (
    <div>
      <span  className='flex absolute top-3 right-28 text-red-700'>
      <Ariakit.Button onClick={() => handleNotificationPanel()} className="button">
      <Badge badgeContent={notification_count} color="success">
            <MailIcon color="inherit" fontSize='large'/>
        </Badge>
      </Ariakit.Button>
        
        </span>
      <NotificationPanel open={open } setOpen={setOpen}/>
    </div>
  )
}
export default GetUserNotifications
