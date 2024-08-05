"use client"
import React from 'react'
import { defaultUser, UserProp } from './UserProp'
import axios from 'axios'

const GetUserInfo = async(id:string):Promise<UserProp> => {
    try{
        console.log('fetching user from database..')
        const user=await axios.get(`http://localhost:8080/get/user?userID=${id}`)
        return user.data as UserProp
    }catch(err){
        console.log(err)
        return defaultUser
    }
    
 
}

export default GetUserInfo
