'use client'
import React, { ReactNode, useContext, useState,createContext } from 'react'

interface TaskProps{
    idx:number,
    task_id:number,
    task_name:string,
    task_notes:string[],
    date_created:string,
    schedule_date:string,
    task_assignto:string[],
    task_status:string,
    created_by:string,
    call_list_api:boolean,
    setIdx:(idx:number)=>void,
    setTaskId:(task_id:number)=>void,
    setTaskName:(task_name:string)=>void,
    setTaskNotes:(task_notes:string[])=>void,
    setDateCreated:(date_created:string)=>void,
    setScheduleDate:(schedule_date:string)=>void,
    setTaskAssignTo:(task_assignto:string[])=>void,
    setTaskStatus:(task_status:string)=>void,
    setTaskCreatedBy:(created_by:string)=>void,
    setCallListApi:(call_list_api:boolean)=>void,
}
const initialContextValue: TaskProps = {
    idx:9999,
    task_id:0,
    task_name: "",
    task_notes: [],
    schedule_date: "",
    date_created:"",
    task_assignto:[],
    task_status:"",
    created_by:"",
    call_list_api:false,
    setIdx:()=>{},
    setTaskId:()=>{},
    setTaskName: () => {},
    setTaskNotes: () => {},
    setScheduleDate: () => {},
    setDateCreated: () => {},
    setTaskAssignTo:()=>{},
    setTaskStatus:()=>{},
    setTaskCreatedBy:()=>{},
    setCallListApi:()=>{},
};
const TaskPropContext=createContext(initialContextValue)
const TaskPropProvider:React.FC<{children:ReactNode}> = ({children}) => {
    const [idx,setIdx]=useState<number>(99999)
    const [task_id,setTaskId]=useState<number>(0)
    const [task_name,setTaskName]=useState<string>("")
    const [task_notes,setTaskNotes]=useState<string[]>([])
    const [schedule_date,setScheduleDate]=useState<string>( "")
    const [date_created,setDateCreated]=useState<string>("")
    const [task_assignto,setTaskAssignTo]=useState<string[]>([])
    const [task_status,setTaskStatus]=useState<string>("")
    const [created_by,setTaskCreatedBy]=useState<string>("")
    const [call_list_api,setCallListApi]=useState<boolean>(false)
  return (
    <TaskPropContext.Provider 
    value={{idx,
      task_id,
      task_name,
      task_notes,
      date_created,
    schedule_date,
    task_assignto,
    task_status,
    created_by,
    call_list_api,
    setIdx,
    setTaskId,
    setTaskStatus,
    setTaskName,
    setTaskNotes,
    setScheduleDate,
    setDateCreated,
    setTaskAssignTo,
    setTaskCreatedBy,
    setCallListApi,}}>
      {children}
    </TaskPropContext.Provider>
  )
}
const TaskPropHook=()=>{
    return(useContext(TaskPropContext))
}
export  {TaskPropProvider,TaskPropContext,TaskPropHook}
