import axios from "axios"

 const DeleteTaskApi=async(task_id:number)=>{
    try{
        const response=await axios.delete(`http://localhost:8080/delete/task?task_id=${task_id}`)
     if (response.status!==200) throw new Error('error')
        console.log(response.data.message)
        
    }catch(err){
        console.log(err)
    }
}
const DeleteAllTaskFunc=async(username:string)=>{
    try{    
        const response=await axios.delete(`http://localhost:8080/delete/all/task?username=${username}`)
         if (response.status!==200) throw new Error('err')
            console.log(response.data)
    }catch(err){
        console.log(err)
    }
}
export {DeleteTaskApi,DeleteAllTaskFunc}