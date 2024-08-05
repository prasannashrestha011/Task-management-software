
"use client "
import { GetUserHook } from "@/app/Context/GetUserContext";
import axios from "axios";
import { initializeApp } from "firebase/app";
import {getMessaging,getToken} from 'firebase/messaging'

const firebaseConfig = {
    apiKey: "AIzaSyA7GdIB4p0QwNq4tG-Xm9VgusbTpMxZmy0",
    authDomain: "taskmanagementapp-bf847.firebaseapp.com",
    projectId: "taskmanagementapp-bf847",
    storageBucket: "taskmanagementapp-bf847.appspot.com",
    messagingSenderId: "131328044427",
    appId: "1:131328044427:web:897448a75b259c7e9c138e",
    measurementId: "G-0G14FRVTHL"
  };
  




// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const messaging=getMessaging(app)
export const generateToken=async(userID:string)=>{
  
    const permission=await Notification.requestPermission()
    console.log(permission)
    if(permission=="granted"){
        const token=  await getToken(messaging,{
            vapidKey:`BOO2qlS4r_ljGJsTrVsu-xvxdCJ1COAgr65CXco21CcoKa4-FhxZ88K9UcOeQrohcwcVYKbWHFCrOAWC_sCVs0c`
        })
        console.log(token)
        try{
            const response=await axios.get(`http://localhost:8082/set-fcm-token?token=${token}&userID=${userID}`)
             if (response.status!==200) throw new Error(`${response.data}`)
                console.log(response.data)
        }catch(err){
            console.log(err)
        }
        console.log('function runned')
        return token
    }

}