

const ChangeStatus=async(task_name:string,task_status:string)=>{
   
    console.log("status runnning...")
    try{
        const response=await fetch(`http://localhost:8080/update/task/status?task_name=${task_name}&task_status=${task_status}`)
       const data= await response.json()
        if (response.status!==200) throw new Error('error')
        console.log(data.message)
       
    }catch(err){
        console.log(err)
    }
     
}
export default ChangeStatus