"use client"
import React, { createContext, ReactNode, useContext, useState } from 'react'
import { defaultUser, UserPropSetter } from '../Components/DisplayUsername/UserProp'
const initialValue:UserPropSetter=defaultUser
const UserContext=createContext(initialValue)
const GetUserProvider:React.FC<{children:ReactNode}> = ({children}) => {
    const [id,setID]=useState<string>("")
    const [email,setEmail]=useState<string>("")
    const [name,setName]=useState<string>("")
    const [picture,setPicture]=useState<string>("")
    const [plain_picture,setPlainPicture]=useState<string>("")
    const [change_state,setChangeState]=useState<boolean>(false)
  return (
    <UserContext.Provider 
    value={{id,setID,
    email,setEmail,
    name,setName,
    picture,setPicture,
    plain_picture,setPlainPicture,
    change_state,setChangeState
    }}>
      {children}
    </UserContext.Provider>
  )
}
const GetUserHook=()=>{
    return(useContext(UserContext))
}
export  {GetUserProvider,GetUserHook}
