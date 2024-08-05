

import axios from "axios"
import toast from "react-hot-toast"

const SubmitInput=async(groupname:string,members:string[])=>{
    console.log(members," is your array from submit")
    try{
        const response=await axios.post('http://localhost:8080/create/group',{
            group_name:groupname,
            group_members:members,
            group_created_at:Date.now(),
        })
        if (response.status!==200) throw new Error("error")
        console.log(response.data.message)
        toast.success('New group created')
    }catch(err){
        console.log(err)
    }
     
    
}
export default SubmitInput