'use client'
import React,{ReactNode, createContext, useContext, useState} from 'react'
interface InputProp{
    entry_name:string,
    entry_amount:string,
    entry_type:string,
    entry_date:string,
    issubmitted:boolean,
    setEntryName:(entry_name:string)=>void,
    setEntryAmount:(entry_amount:string)=>void,
    setEntryType:(entry_type:string)=>void,
    setEntryDate:(entry_date:string)=>void,
    setIsSubmitted:(issubmitted:boolean)=>void,
}
const initialContextValue: InputProp = {
    entry_name: "",
    entry_amount: "",
    entry_type: "",
    entry_date: "",
    issubmitted:false,
    setEntryName: () => {},
  setEntryAmount: () => {},
  setEntryType: () => {},
  setEntryDate: () => {},
  setIsSubmitted:()=>{},
};
const InputContext=createContext(initialContextValue)
const InputProvider:React.FC<{children:ReactNode}> = ({children}) => {
    const [entry_name,setEntryName]=useState<string>("")
    const [entry_amount,setEntryAmount]=useState<string>("")
    const [entry_type,setEntryType]=useState<string>("")
    const [entry_date,setEntryDate]=useState<string>("")
    const [issubmitted,setIsSubmitted]=useState<boolean>(false)
  return (
   <InputContext.Provider 
   value={{entry_name,
   entry_amount,
   entry_type,
   entry_date,
   issubmitted,
   setEntryName,
   setEntryAmount,
   setEntryType,
   setEntryDate,
   setIsSubmitted}}>
   {children}
   </InputContext.Provider>
  )
}
const InputHook=()=>{
    return(
        useContext(InputContext)
    )
}
export  {InputContext,InputProvider,InputHook}
