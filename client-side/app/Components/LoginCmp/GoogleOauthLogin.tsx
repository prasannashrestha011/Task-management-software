
import { AuthHook } from '@/app/Context/AuthContext'
import { CodeResponse, useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import React  from 'react'
import {  useRouter } from 'next/navigation'
import SaveCred from './SaveCred'
import toast from 'react-hot-toast'

interface TokenResponseType{
 usertoken:{
  email:string,
  id:string,
  name:string,
  picture:string
 }
}

const GoogleOauthLogin = () => {
  const router=useRouter()

  
    const login=useGoogleLogin({
        onSuccess:async(codeResponse:CodeResponse)=>{

            try{
              const TokenResponse=await axios.get<TokenResponseType>(`http://localhost:8080/loginhandler?code=${codeResponse.code}`,{
                withCredentials:true,
              })
              if(TokenResponse.status!==200) throw new Error('error')
               console.log(TokenResponse.data.usertoken.name, " just logged in")
                const {id,email,name,picture}=TokenResponse.data.usertoken
                  SaveCred(id)
              const saveResponse=await axios.post(`http://localhost:8080/savecredentials`,{
                id:id,
                email:email,
                name:name,
                picture:picture
              })
              console.log(saveResponse.data.message)
              window.history.replaceState(null, '', '/taskmanagement');
              
              router.push('/taskmanagement')
              toast.success('login successfull')

            }catch(err){
              console.log(err)
            }
        },
        flow: "auth-code",
      
    })
 
  return (
   
    <div>

    <button onClick={()=>login()}>Login</button>
  </div>
  )
}

export default GoogleOauthLogin
