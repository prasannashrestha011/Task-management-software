import axios from "axios"

const InsertMessage=async(group_id:number,usermessage:string)=>{
    try{
        const response=await axios.post(`http://localhost:8080/insert/message?group_id=${group_id}`,{
            group_chat:[usermessage],
        })
         if (response.status!==200) throw new Error('error:')
            console.log('message inserted')
    }catch(err){
        console.log(err)
    }
}
export {InsertMessage}