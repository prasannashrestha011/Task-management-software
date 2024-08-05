import axios from "axios"
import { UserTask } from "../AllProps/AllProps"

const FetchListApi=async(username:string)=>{
    console.log('fetching......')
    const response=await axios.get(`http://localhost:8080/get-task-list?username=${username}`,{
        withCredentials:true
    })

   
   return response.data
   
}
const RetriveUserTask=async(userID:string):Promise<UserTask[]>=>{
    const response=await axios.get<UserTask[]>(`http://localhost:8080/get/assignedtask?assignedUser=${userID}`)
    console.log(response.data)
    return response.data
}
export  {FetchListApi,RetriveUserTask}