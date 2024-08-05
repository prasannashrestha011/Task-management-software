'use client'
import { TaskPropHook } from '@/app/Context/TaskManagementPropContext'

import React, { useEffect, useState } from 'react'

import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image} from "@nextui-org/react";

import ChangeStatus from './TaskStatus/function/ChangeStatus';
import { DeleteTask } from './DeleteTask/DeleteTask';
import AdditionalNotes from './Notes/AdditionalNotes';


const DisplayTaskModal:React.FC = () => {
    const TaskCmp=TaskPropHook()
    //date comparison
  
    const [currIdxMap,setCurrIdxMap]=useState<Map<number,number>>(new Map())
    const [enbbtn,setEnbBtn]=useState<boolean>(false)
    
    const currentDate= new Date
    const scheduleDate=new Date(TaskCmp.schedule_date)
   
    const handleSelect=(keys:React.ChangeEvent<HTMLSelectElement>)=>{
     
      TaskCmp.setTaskStatus(keys.target.value)
        if(keys.target.value==TaskCmp.task_status){
          setEnbBtn(false)
        }else{
          setEnbBtn(true)

          const newMap=new Map(currIdxMap)
          newMap.set(TaskCmp.idx,TaskCmp.idx)
          setCurrIdxMap(newMap)
        }
      
    }
   
    return (
     TaskCmp.task_name?(
      <div className='overflow-y-scroll '>
   
      <div className='flex justify-start   items-center '>
       
          <Card className=" rounded-none border border-white bg-white text-slate-950 lg:w-full lg:h-full w-auto " >
<CardHeader className="flex gap-3">

  <div className="flex flex-col justify-center items-center  w-full text-xl border-b-2">
    <p className="text-4xl font-semibold">{TaskCmp.task_name}</p>
   
  </div>
</CardHeader>

<CardBody className=''>
  <div className='flex flex-col justify-between gap-2'> 
  <span className='text-xs flex justify-end items-center text-gray-400'>
  </span>
  <div className=''>
  <span className='pl-4 text-red-600'>Deadline</span>
 
  <div className='bg-gray-200 pl-4 rounded-md h-8 py-1 w-6/12 flex  gap-5'>
  {TaskCmp.schedule_date}
  <span className='text-sm my-auto'>
     
  {
    `${currentDate.getFullYear()}-${currentDate.getMonth()}-${currentDate.getDay()}`
    >
    `${scheduleDate.getFullYear()}-${scheduleDate.getMonth()}-${scheduleDate.getTime()}`?
    (<p className='text-red-500'>(Task missed)</p>)
    :
    (
      `${currentDate.getFullYear()-currentDate.getMonth()-currentDate.getDay()}`
      ==
    `${scheduleDate.getFullYear()-scheduleDate.getMonth()-scheduleDate.getDay()}`?
    <p className='text-blue-500'>
    (Today is the day)
    </p>:
    <p>
      (pending ....)
    </p>
    )
    }
  </span>
  </div>
  </div>
{/*task status */}
<div className='mt-10'>
<select className="bg-white" value={TaskCmp.task_status} onChange={handleSelect}>
<option value={"incomplete"}>incomplete</option>
<option value={"pending"}>pending</option>
<option value={"done"}>done</option>
</select>

{enbbtn&&TaskCmp.idx==currIdxMap.get(TaskCmp.idx)?<button className="btn btn-sm btn-neutral"
onClick={()=>{
ChangeStatus(TaskCmp.task_name,TaskCmp.task_status)
TaskCmp.setCallListApi(!TaskCmp.call_list_api)
setEnbBtn(!enbbtn)
}}
>Save change</button>:""}
    </div>
  <ul>
    <span className='flex gap-2 flex-col mt-7'>
      {TaskCmp.task_assignto.map((user,idx)=>{
        const [id,name,img]=user.split("**")
        return(
          <li key={idx} className='flex text-sm items-center gap-2'>
            <Image src={img} alt='img' className='w-8 rounded-full'/>
            {name}
            </li>
        )
      })}
    </span>
  </ul>
  {/*notes */}
  <ol className='list-disc ml-8  flex justify-start items-start flex-col mt-6'>  
  <span className='font-semibold text-3xl flex gap-8'>
    Notes
    <AdditionalNotes/>
    </span>  

<span className='  flex justify-center  flex-col  w-auto pl-4'>
    {TaskCmp.task_notes.map((note,idx)=>(
    <li key={idx}>
      <span className='flex flex-col  '>
        {note}
      </span>
    </li>
  ))}
  </span>
</ol>
  
  <div className='flex justify-end'>
   
  
  <DeleteTask/>

  </div>

  </div>
</CardBody>

<CardFooter>
 
</CardFooter>
          </Card>
      </div>
  </div>
     ):""
    );
}

export default DisplayTaskModal
