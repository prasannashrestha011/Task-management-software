'use client'
import React, { useEffect, useState } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import { Input } from "postcss";
import { EntryInput } from "../InputField/EntryInput";
import axios from "axios";
import { InputHook, InputProvider } from "@/app/Context/InputContext";

const CreateEntry:React.FC=() =>{
  const {isOpen, onOpen, onOpenChange,onClose} = useDisclosure();
  const InputCmp=InputHook()

  const SubmitEntry=async()=>{
    try{
      const response=await axios.post('http://localhost:8080/insert-transaction',{
        transaction_name:InputCmp.entry_name,
        transaction_amount:InputCmp.entry_amount,
        transaction_type:InputCmp.entry_type,
        transaction_date:  Date.now().toString(),
      })
      if (response.status!==200) throw new Error('error')
        console.log(response.data.message)
     onClose()
     InputCmp.setEntryName('')
     InputCmp.setEntryAmount('')
     InputCmp.setEntryType('')
     InputCmp.setIsSubmitted(!InputCmp.issubmitted)
    }catch(err){
      console.log(err)
    }
  }
  return (

    <>
      <div className="flex justify-center mb-3"><Button onClick={onOpen}>Insert New transaction</Button></div>
  
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>

           
              <ModalHeader className="flex flex-col gap-1">Create Entry</ModalHeader>
              <ModalBody>
                <EntryInput 
               
                />
              </ModalBody>
              <ModalFooter>
             
                <Button color="primary" onClick={SubmitEntry} type="submit">
                  Add
                </Button>
              </ModalFooter>
          
      
        </ModalContent>
      </Modal>
   
    </>
 
  );
}
export default CreateEntry
