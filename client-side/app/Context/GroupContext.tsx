import React,{ReactNode, createContext, useContext, useState} from 'react'
  interface GroupProp{
    groupname:string,
    setGroupName:(groupname:string)=>void,
    members:string[],
    setMembers:(members:string[])=>void,
}
const initialValue:GroupProp={
    groupname:"",
    setGroupName:()=>{},
    members:[],
    setMembers:()=>{}
}
const GroupContext=createContext(initialValue)
const GroupPropProvider:React.FC<{children:ReactNode}>= ({children}) => {
    const [groupname,setGroupName]=useState<string>("")
    const [members,setMembers]=useState<string[]>([])
  return (
    <GroupContext.Provider value={{groupname,setGroupName,members,setMembers}} >
        {children}
    </GroupContext.Provider>
  )
}
const GroupHooks=()=>{
    return(useContext(GroupContext))
}

export  {GroupPropProvider,GroupHooks}
