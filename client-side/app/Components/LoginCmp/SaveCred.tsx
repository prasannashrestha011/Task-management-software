'use client'
const SaveCred=(id:string)=>{
    window.localStorage.setItem("userID",id)
    console.log('user info saved')
}
export default SaveCred