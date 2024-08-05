import React from "react";
import { Input } from "@nextui-org/react";
import { DropDownInput } from "./DropDownInput";
import { InputHook } from "@/app/Context/InputContext";

export  const EntryInput:React.FC=()=> {
    const InputCmp=InputHook()
    const toggleEntryName=(e:React.ChangeEvent<HTMLInputElement>)=>{
        InputCmp.setEntryName(e.target.value)
    }
    const toggleEntryAmount=(e:React.ChangeEvent<HTMLInputElement>)=>{
        InputCmp.setEntryAmount(e.target.value)
    }
    
  return (
    <div className="w-full flex flex-col gap-4">
  
        <div key={"md"} className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 flex-col">
  
             
          <Input size={"md"} 
          type="text" 
          label="Transaction name" 
          placeholder="Name" 
          value={InputCmp.entry_name} 
          onChange={toggleEntryName}/>
               
         <Input 
         size={"md"} 
         type="number" 
         label="Transaction Amount" 
         placeholder="Amount" 
         value={InputCmp.entry_amount} 
         onChange={toggleEntryAmount} />
             <DropDownInput/>
        </div>
     
    </div>
  );
}

