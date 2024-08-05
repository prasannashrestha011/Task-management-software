import axios from "axios";
import { AssignedNotificationProp, NotificationProp } from "./NotificationProps";
import { UserNotificationProp } from "../Notification/NotificationInterface";

const sendNotification=async(token:string)=>{
    try {
        const response = await axios.post(`http://localhost:8082/sendnotification?token=${token}`);
        console.log('Notification response:', response.data);
        
        if (response.status !== 200) {
            throw new Error('Failed to send notification');
        }
    } catch (err) {
        console.error('Error sending notification:', err);
    }
}
const sendAssignedNotification=async(userIDList:string[])=>{
    try{
        const response= await axios.post(`http://localhost:8082/send-assign-to-message`,{
            userIDList:userIDList,
        })
        
        if(response.status!==200) throw new Error(`${response.data}`)
        
            console.log(response.data)

    }catch(err){
        console.log(err)
    }
}
const saveNotifications=async(users:AssignedNotificationProp[])=>{
    try{
        const response=await axios.post(`http://localhost:8080/insert/notification?time_stamp=${Date.now()}`,users)
         if(response.status!==200) throw new Error(response.data)
    }catch(err){
        console.log(err)
    }

}
const getUserNotifications=async(username:string) : Promise<UserNotificationProp[]>=>{
    try{
        const response=await axios.get(`http://localhost:8080/get/user/notifications?username=${username}`)
        if(response.status!==200) throw new Error("error")
            return response.data as UserNotificationProp[]
    }catch(err){
        console.log(err)
        return Promise.reject(err)
    }
}
const getUnreadNotifications=async(username:string): Promise<NotificationProp>=>{
    try{
        const response=await axios.get<NotificationProp>(`http://localhost:8080/get/unread/notifications?username=${username}`)
         if (response.status!==200) throw new Error('error')
            return response.data as NotificationProp
         }catch(err){
            console.log(err)
            return Promise.reject(err);
         }
}
const resetNotificationCount=async(username:string)=>{
    try{
        const response=await axios.get(`http://localhost:8080/reset/unread/notifications?username=${username}`)
        if(response.status!==200) throw new Error('error')
            console.log(response.data)
    }catch(err){
        console.log(err)
    }
}
export  {sendNotification,sendAssignedNotification,
    getUserNotifications,
    saveNotifications,getUnreadNotifications,resetNotificationCount}
