'use client'
import React, { useEffect, useState } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Textarea, DatePicker, DateValue} from "@nextui-org/react";
import axios from "axios";
import { AddAssignTo } from "./AddAssignTo";
import { UserInputHook } from "@/app/Context/UserInputContext";
import AddNotes from "./Notes/AddNotes";

import { TodoIcon } from "../ImageSources/ImageSources";
import { GetUserHook } from "@/app/Context/GetUserContext";
import { TaskPropHook } from "@/app/Context/TaskManagementPropContext";
import toast from "react-hot-toast";
import { onMessage } from "firebase/messaging";
import {  messaging } from "../PushNotification/firebase";
import { saveNotifications, sendAssignedNotification } from "../PushNotification/sendNotification";

export const TaskManagemanetModal:React.FC=()=> {
  const UserCmp=GetUserHook()

  const {isOpen, onOpen, onOpenChange,onClose} = useDisclosure();

    const user_input=UserInputHook()
    const TaskCmp=TaskPropHook()
  const handleTaskName=(e:React.ChangeEvent<HTMLInputElement>)=>{
      user_input.setTaskName(e.target.value)
  }
 
const handleTaskSchedule=(date:DateValue)=>{

 
  user_input.setDeadLine(`${date.year}-${date.month}-${date.day}`)
}
const submitTaskCreation=async()=>{
  try{
    const response=await axios.post('http://localhost:8080/create-task',{
      task_name:user_input.taskname,
      task_notes:user_input.tasknotes,
      date_created:Date.now().toString(),
      schedule_date:user_input.deadline,
      assign_to:user_input.assignto,
      created_by:UserCmp.name,
    })
    if (response.status!==200) throw new Error('error')
      console.log(response.data)
    TaskCmp.setCallListApi(!TaskCmp.call_list_api)
    onClose()

    toast.success('New Task created')
    console.log(UserCmp.id, " is userID")

    
     
      
      console.log(user_input.assignto, " is an array")
      if(user_input.assignto){
        sendAssignedNotification(user_input.assignto)
        saveNotifications(user_input.userlist)
        UserCmp.setChangeState(!UserCmp.change_state)
      }
  }catch(err){
    console.log(err)
  }
}

useEffect(()=>{
  onMessage(messaging,(payload)=>{
    console.log(payload)
    const notificationOptions={
      body:payload.notification?.body,
      icon:payload.notification?.image
    }
    if(payload.notification?.body&&payload.notification.title){
          new Notification(payload.notification?.title,notificationOptions)
          toast.success(payload.notification.body)
          
    }
  })

},[])

  return (

     <>
     
      <span 
      className="flex flex-row justify-center items-center gap-2 cursor-pointer"
      onClick={onOpen}>
        <img 
        className="w-10"
        src={TodoIcon} />
       <span> Create </span>
        </span>
      <Modal 
        backdrop="opaque" 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn",
              },
            },
          }
        }}
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">Task</ModalHeader>
              <ModalBody>
                
          
        <div key={"md"} className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 flex-col">
  
             
                    <Input size={"md"} 
                    type="text" 
                    label="Task Name" 
                    placeholder="Name" 
                    value={user_input.taskname}
                    onChange={handleTaskName}
                    />
                      <AddNotes/>
                        <AddAssignTo/>
                        
                        <DatePicker label="Deadline" onChange={handleTaskSchedule} />
                        
</div>
              
              </ModalBody>
              <ModalFooter>
               
                <Button color="primary" onClick={submitTaskCreation}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  
  );
}
