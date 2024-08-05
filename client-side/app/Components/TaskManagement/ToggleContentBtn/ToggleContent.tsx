'use client'
import { ToggleContentHook } from '@/app/Context/ToggleContent'
import React from 'react'

const ToggleContent = () => {
    const ToggleCmp=ToggleContentHook()
    const handleToggleTrigger=(id:number)=>{
     
        if(id==0){
            ToggleCmp.setShowContent("task")
        }
        else if (id==1){
            ToggleCmp.setShowContent("groups")
      
        }else if (id==3){
            ToggleCmp.setShowContent("settings")
        }
        else{
            ToggleCmp.setShowContent("taskdetails")
        }
    }
  return (
  
      <div className='flex gap-1 font-semibold'>
        <button className={`border border-gray-400 rounded-t-lg w-20 h-8 ${ToggleCmp.content=="task"?'bg-gray-500 transition-colors duration-200 text-slate-200':''}`} 
        onClick={()=>handleToggleTrigger(0)}>Task</button>
    <button className={`border border-gray-400 rounded-t-lg w-20 h-8 ${ToggleCmp.content=="groups"?'bg-gray-500 transition-colors duration-200 text-slate-200':''}`} 
    onClick={()=>handleToggleTrigger(1)}>Groups</button>
    <button className={`border border-gray-400 rounded-t-lg w-32 h-8 ${ToggleCmp.content=="taskdetails"?'bg-gray-500 transition-colors duration-200 text-slate-200':''}`} 
    onClick={()=>handleToggleTrigger(2)}>Your  Tasks</button>
        <button className={`border border-gray-400 rounded-t-lg w-32 h-8 
            
        ${ToggleCmp.content=="settings"?'bg-gray-500 transition-colors duration-200 text-slate-200':''}`} 
    onClick={()=>handleToggleTrigger(3)}>Settings</button>
    </div>
   
  )
}

export default ToggleContent
