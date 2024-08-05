'use client'

import React, {  useEffect, useState } from 'react'

import GoogleOauthLogin from '../Components/LoginCmp/GoogleOauthLogin'
import { AuthProvider } from '../Context/AuthContext'

interface UserProp{
  email:string,
  id:string,
  name:string,
  picture:string,
  verified_email:boolean
}
const LoginPage = () => {
 
    return(
      <AuthProvider>
       
          <GoogleOauthLogin/>
       
      </AuthProvider>
    )
}

export default LoginPage
