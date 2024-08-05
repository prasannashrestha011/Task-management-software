import React, { useEffect, useState } from 'react'
import { UserTask } from '../AllProps/AllProps'
import { RetriveUserTask } from '../fetching/FetchTaskListApi'
import { GetUserHook } from '@/app/Context/GetUserContext'
import DisplayCard from './DisplayCard'

const DisplayTaskDetails = () => {
  const UserCmp=GetUserHook()
  const [UserTaskDetails,setUserTaskDetails]=useState<UserTask[]>([])
 const fetchUserTask=async()=>{
  console.log(UserCmp.picture)
   const fetchedData:UserTask[]=await RetriveUserTask(`${UserCmp.id}**${UserCmp.name}**${UserCmp.plain_picture}`)
      setUserTaskDetails(fetchedData)
   console.log("AssignedUser Task: ",UserTaskDetails)
 }
 useEffect(()=>{
  fetchUserTask()
 },[])
  return (
    <div className=' w-full '>
    
      <ul className='flex flex-col gap-5 overflow-y-scroll border  h-svh pb-10'>
        {UserTaskDetails.map((item,idx)=>{
          return(
        
         <li key={idx} className=' w-full'>
           <DisplayCard task_id={item.task_id} task_name={item.task_name} task_notes={item.task_notes}/>
           </li>
          )
        })}
      </ul>
    </div>
  )
}

export default DisplayTaskDetails
