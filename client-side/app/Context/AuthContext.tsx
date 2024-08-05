'use client'
import React, { ReactNode, createContext, useContext, useState } from 'react'
interface AuthProp{
    isAuthenticated:boolean,
    setIsAuthenticated:(isAuthenticated:boolean)=>void,
}
const AuthIntialContext:AuthProp={
    isAuthenticated:false,
    setIsAuthenticated:()=>{}
}
const AuthContext=createContext(AuthIntialContext)
const AuthProvider:React.FC<{children:ReactNode}> = ({children}) => {
    const [isAuthenticated,setIsAuthenticated]=useState<boolean>(false)
  return (
    <AuthContext.Provider value={{isAuthenticated,setIsAuthenticated}}>
        {children}
    </AuthContext.Provider>
  )
}
const AuthHook=()=>{
    return(useContext(AuthContext))
}
export  {AuthProvider,AuthHook}
