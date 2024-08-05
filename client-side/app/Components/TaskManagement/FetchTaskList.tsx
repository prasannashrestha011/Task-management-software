'use client'
import { TaskPropHook } from '@/app/Context/TaskManagementPropContext'

import { formatDistanceToNow } from 'date-fns'
import React, {  useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck  } from '@fortawesome/free-solid-svg-icons'

import {FetchListApi} from './fetching/FetchTaskListApi'
import { GetUserHook } from '@/app/Context/GetUserContext';
import './FetchTaskList.css'
interface TaskListProp{
    id:number,
    task_name:string,
    task_notes:string[],
    date_created:string,
    schedule_date:string,
    assign_to:string[],
    task_status:string,
    created_by:string,
}
const FetchTaskList:React.FC = () => {
    const [fetchList,setFetchList]=useState<TaskListProp[] | null>(null)
    const UserCmp=GetUserHook()
    const TaskCmp=TaskPropHook()
    const FetchList=async()=>{
        const data=await FetchListApi(UserCmp.name)
    
        setFetchList(data)
       
    }
    useEffect(()=>{
        FetchList()
        console.log("function running ...")
    },[TaskCmp.call_list_api,UserCmp.name])
    const SelectTask=(index:number,task_id:number,task_name:string,memo:string[],schedule_date:string,date_created:string,assign_to:string[],task_status:string,created_by:string)=>{
        TaskCmp.setIdx(index)
        TaskCmp.setTaskId(task_id)
        TaskCmp.setTaskName(task_name)
        TaskCmp.setTaskNotes(memo)
        TaskCmp.setScheduleDate(schedule_date)
        TaskCmp.setDateCreated(date_created)
        TaskCmp.setTaskAssignTo(assign_to)
        TaskCmp.setTaskStatus(task_status)
        TaskCmp.setTaskCreatedBy(created_by)
    }
    
  return (
    <div className=' h-96 overflow-y-scroll lg:w-60 w-40 border scrollbar bg-white scrollbar-hide ' >
     <ul>
     {fetchList&&fetchList.map((item,idx)=>{
        
        return(
            <li key={idx}>
               <div className='mb-2 h-12 border-b-1 border-gray-300 active:bg-gray-300 transition-colors duration-150 flex flex-col justify-center items-start pl-5 w-full'
                onClick={()=>SelectTask(idx,item.id,item.task_name,item.task_notes,item.schedule_date,item.date_created,item.assign_to,item.task_status,item.created_by)}>
                <div className='w-full flex justify-between items-center'>
                <strong className='w-32  overflow-hidden'> 
                  {item.task_name}
                  </strong>
              
              {item.task_status=="incomplete"?
                (
                  TaskCmp.idx==idx?
                  <img 
                  src='https://raw.githubusercontent.com/prasannashrestha011/ImageRepository/main/uploads/icons8-alarm-clock.gif' 
                  
                  className='w-6 '
                  />:
                  <img src="https://img.icons8.com/?size=100&id=XZrGFzypu1jM&format=png&color=000000" className='w-6' />
                )
                :
                (
                    item.task_status=="done"?
                        <FontAwesomeIcon icon={faCheck} className='pr-2 '/>
                    
                      :  (
                        TaskCmp.idx==idx?<img src='https://media.tenor.com/UDC3OVGA1jcAAAAi/icon.gif' className='w-6' />:
                        <img src='https://raw.githubusercontent.com/prasannashrestha011/ImageRepository/main/uploads/ezgif-6-f00cc9b38sss3.jpg' className='w-7' />
                      )
                )    
            }
                </div>
                
                <span className='text-xs text-gray-600'>{ formatDistanceToNow(parseInt(item.date_created),{addSuffix:true})}

                </span>
             
               </div>
            </li>
        )
      })}
     </ul>
    </div>
  )
}

export default FetchTaskList
