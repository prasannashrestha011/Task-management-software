'use client'
import React ,{createContext, ReactNode, useContext, useState}from 'react'
interface ContextProp{
    content:string,
    setShowContent:(content:string)=>void,
}
const initialValue:ContextProp={
    content:"",
    setShowContent:()=>{},
}
const ToggleContentContext=createContext(initialValue)
const ToggleContentProvider:React.FC<{children:ReactNode}> = ({children}) => {
    const [content,setShowContent]=useState<string>("")
  return (
    <ToggleContentContext.Provider value={{content,setShowContent}}>
        {children}       
    </ToggleContentContext.Provider>
  )
}
const ToggleContentHook=()=>{
    return(
        useContext(ToggleContentContext)
    )
}

export  {ToggleContentProvider,ToggleContentHook}
