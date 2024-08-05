import axios from "axios"

const FetchGroupList=async()=>{
   try{
    const response=await axios.get('http://localhost:8080/get/groups')
     if (response.status!==200) throw new Error('err')
   
        return response.data.list
   }catch(err){
    console.log(err)
   }

}
export default FetchGroupList