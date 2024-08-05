import React, { ChangeEvent, useState } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link} from "@nextui-org/react";
import { TaskPropHook } from "@/app/Context/TaskManagementPropContext";
import { DeleteTaskApi } from "./function/DeleteTaskApi";
import toast from "react-hot-toast";


export const DeleteTask:React.FC=()=> {
  
  const {isOpen, onOpen, onOpenChange,onClose} = useDisclosure();
  const TaskCmp=TaskPropHook()
  const [userinput,setUserInput]=useState<string>("")
  const handleDeleteCall=async()=>{
    if(userinput==`${TaskCmp.date_created}-${TaskCmp.task_name}`){
      await DeleteTaskApi(TaskCmp.task_id)
    TaskCmp.setCallListApi(!TaskCmp.call_list_api)
      onClose()
      setUserInput('')
      toast.success(`${TaskCmp.task_name} deleted from the server`)
      TaskCmp.setTaskId(0)
      TaskCmp.setTaskName('')
      TaskCmp.setTaskAssignTo([])
      TaskCmp.setDateCreated('')
      TaskCmp.setScheduleDate('')
      TaskCmp.setTaskCreatedBy('')
      TaskCmp.setTaskNotes([])
    }
  }
  const handleUserInput=(e:ChangeEvent<HTMLInputElement>)=>{
    setUserInput(e.target.value)
  }
  return (
    <>
      <Button onClick={onOpen} className="bg-red-700 rounded-sm">Abort</Button>
      <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
              <ModalBody>
                <p>Please type <strong>{`${TaskCmp.date_created}-${TaskCmp.task_name}`}</strong></p>
                <Input 
                type="text"
                className="border border-gray-400 rounded-sm"
                value={userinput}
                onChange={handleUserInput}
                />
              
         
              </ModalBody>
              <ModalFooter>
               
                <Button  
                className={`bg-red-700 rounded-md text-slate-200 `}
                onClick={()=>handleDeleteCall()}>
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
