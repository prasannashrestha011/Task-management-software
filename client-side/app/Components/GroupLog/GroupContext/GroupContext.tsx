import React, { createContext, ReactNode, useContext, useState } from 'react'
import { GroupGetterAndSetter, GroupListProp } from '../Grouplistprop/GrouplistProp'
const initialValue:GroupGetterAndSetter={
    group_id:0,
    setGroupId:()=>{},
    group_name:"",
    setGroupName:()=>{},
    group_members:[],
    setGroupMembers:()=>{},
    group_chat:[],
    setGroupChat:()=>{},
    group_created_at:0,
    setGroupCreatedAt:()=>{},
}
const GroupContext=createContext(initialValue)

const GroupContextProvider:React.FC<{children:ReactNode}> = ({children}) => {
    const [group_id,setGroupId]=useState<number>(0)
    const [group_name,setGroupName]=useState<string>("")
    const [group_members,setGroupMembers]=useState<string[]>([])
    const [group_chat,setGroupChat]=useState<string[]>([])
    const [group_created_at,setGroupCreatedAt]=useState<number>(0)
  return (
    <GroupContext.Provider value={{group_id,setGroupId,
      group_name,setGroupName,
      group_members,setGroupMembers,
      group_chat,setGroupChat,
        group_created_at,setGroupCreatedAt
    }}>
      {children}
      </GroupContext.Provider>
  )
}
const GroupContextHook=()=>{
   return  useContext(GroupContext)
}
export  {GroupContextProvider,GroupContextHook}
