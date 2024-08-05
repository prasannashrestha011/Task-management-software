import * as Ariakit from "@ariakit/react";
import { useEffect, useState } from "react";
import "./style.css";
import { NotificationPanelProp, UserNotificationProp } from "./NotificationInterface";
import { getUserNotifications, resetNotificationCount } from "../PushNotification/sendNotification";
import { GetUserHook } from "@/app/Context/GetUserContext";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";
const  NotificationPanel:React.FC<NotificationPanelProp>=({open,setOpen})=> {
  const [notification_list,setNotificationList]=useState<UserNotificationProp[]>()
  const UserCmp=GetUserHook()
  const NotificationMessages=async()=>{
    const data=await getUserNotifications(UserCmp.name)
     data?setNotificationList(data):""
    
  }
  if(open){
    resetNotificationCount(UserCmp.name)
    
  }
  useEffect(()=>{
    UserCmp.setChangeState(!UserCmp.change_state)
  },[open])
  useEffect(()=>{
    NotificationMessages()
   
  },[UserCmp])
  return (
    <div className="">
     
      <Ariakit.Dialog
        open={open}
        onClose={() => setOpen(false)}
        className="dialog   "
      >
        <Ariakit.DialogHeading className="heading">
        Notifications
        </Ariakit.DialogHeading>
        <p className="description ">
          <ol>
          {notification_list?.map((notification,idx)=>(
            <li key={idx} className="border-b-1 border-gray-300">
              <div className="flex justify-between">
            
                <span className="flex-1 w-80 overflow-hidden">{notification.notification_message}</span>
                
              
              <strong className="text-sm">{formatDistanceToNow(notification.time_stamp,{addSuffix:true})}</strong>
                </div>
            </li>
          ))}
          </ol>
        </p>
      
      </Ariakit.Dialog>
    </div>
  );
}
export default NotificationPanel
