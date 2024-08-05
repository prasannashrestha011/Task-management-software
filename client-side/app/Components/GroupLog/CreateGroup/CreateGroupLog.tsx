'use client'
import React, { ChangeEvent } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input} from "@nextui-org/react";
import { SelectUsers } from "./SelectUsers";
import { GroupHooks } from "@/app/Context/GroupContext";
import SubmitInput from "../functions/SubmitInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserGroup } from "@fortawesome/free-solid-svg-icons/faUserGroup";




export function CreateGroupLog() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const InputHook=GroupHooks()
 
  const groupNameHandler=(e:ChangeEvent<HTMLInputElement>)=>{
  InputHook.setGroupName(e.target.value)
 }


  return (
    <>
     
      <span onClick={onOpen} className="cursor-pointer flex justify-center items-center">
        <FontAwesomeIcon icon={faUserGroup} className="w-8"/>
        <span>Create Group</span>
        </span>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Group </ModalHeader>
              <ModalBody>
              <Input 
                label="group name"
                type="text"
                value={InputHook.groupname}
                onChange={groupNameHandler}
              />  
            <SelectUsers/>
              </ModalBody>
              <ModalFooter>
                <Button 
                 className="bg-red-700 text-slate-200 hover:bg-red-600"
                 onClick={onClose}>
                  Close
                </Button>
                <Button color="primary" onClick={()=>SubmitInput(InputHook.groupname,InputHook.members)}>
                  Create
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
     
    </>
  );
}
