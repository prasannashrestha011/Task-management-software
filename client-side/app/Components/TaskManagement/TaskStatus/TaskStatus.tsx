import React, { useState } from "react";
import ChangeStatus from "./function/ChangeStatus";

interface TaskStatusProp{
  task_name:string,
  status:string,

}


export  const  TaskStatus:React.FC<TaskStatusProp>=({task_name,status})=> {
 
  const [enbbtn,setEnbBtn]=useState<boolean>(false)
  const [task_status,setTaskStatus]=useState<string>(status)
  const handleSelect=(keys:React.ChangeEvent<HTMLSelectElement>)=>{
    console.log(status)
    setTaskStatus(keys.target.value)
      if(keys.target.value==status){
        setEnbBtn(false)
      }else{
        setEnbBtn(true)
      }
  }
  return (
    <>
      <select className="bg-white" value={task_status} onChange={handleSelect}>
      
      <option>{task_status}</option>
      <option>done</option>
    </select>
    {enbbtn?<button className="btn btn-sm btn-neutral"
    onClick={()=>ChangeStatus(task_name,task_status)}
    >Save change</button>:""}
    </>
  );
}

