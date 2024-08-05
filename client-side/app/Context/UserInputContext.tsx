"use client"
import React,{ ReactNode, createContext, useContext, useState } from 'react'
import { AssignedNotificationProp } from '../Components/PushNotification/NotificationProps'
interface UserInputProp{
    taskname:string,
    tasknotes:string[]
    assignto:string[],
    userlist:AssignedNotificationProp[],
    datecreated:string,
    deadline:string,
    setTaskName:(taskname:string)=>void,
    setTaskNotes:(tasknotes:string[])=>void,
    setAssignTo:(assignto:string[])=>void,
    setUserlist:(userlist:AssignedNotificationProp[])=>void,
    setDateCreated:(datecreated:string)=>void,
    setDeadLine:(deadline:string)=>void,
}
const InitialValue:UserInputProp={
  taskname:"",
  tasknotes:[],
  assignto:[],
  userlist:[],
  datecreated:"",
  deadline:"",
  setTaskName:()=>{},
  setTaskNotes:()=>{},
  setAssignTo:()=>{},
  setUserlist:()=>{},
  setDateCreated:()=>{},
  setDeadLine:()=>{},
}
const UserInputContext=createContext(InitialValue)
const UserInputProvider:React.FC<{children:ReactNode}> = ({children}) => {
  const [taskname,setTaskName]=useState<string>("")
  const [tasknotes,setTaskNotes]=useState<string[]>([])
  const [assignto,setAssignTo]=useState<string[]>([])
  const [userlist,setUserlist]=useState<AssignedNotificationProp[]>([])
  const [datecreated,setDateCreated]=useState<string>("")
  const [deadline,setDeadLine]=useState<string>("")
  return (
    <UserInputContext.Provider value={{
      taskname,setTaskName,
      tasknotes,setTaskNotes,
      assignto,setAssignTo,
      userlist,setUserlist,
      datecreated,setDateCreated,
      deadline,setDeadLine
    }}>
      {children}
    </UserInputContext.Provider>
  )
}
const UserInputHook=()=>{
  return(useContext(UserInputContext))
}
export  {UserInputProvider,UserInputHook,UserInputContext}
