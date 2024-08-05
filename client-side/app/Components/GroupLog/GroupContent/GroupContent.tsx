import React, { useEffect, useState } from 'react'
import { GroupListProp } from '../Grouplistprop/GrouplistProp'
import { GroupContextHook } from '../GroupContext/GroupContext'
import {PreLoadImages} from '../../functions/ImageBlob/PreloadImages'
import GroupMembers from '../GroupMembers/GroupMembers'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserGroup } from '@fortawesome/free-solid-svg-icons'
import ChatSystem from '../ChatSystem/ChatSystem'


const GroupContent:React.FC= () => {
  const GroupCmp=GroupContextHook()
  const [imgurl,setImageUrl]=useState<string[]>([])
  const [show_members,setShowMembers]=useState<boolean>(false)
  const preloadUser=async()=>{
    

    const imageUrls= GroupCmp.group_members.map(user=>{
      
      const [name,image]=user.split("**")
    
      return image
    })
    
    const url=await PreLoadImages(imageUrls)
    
    setImageUrl(url)
  }
  useEffect(()=>{
    preloadUser()
  },[GroupCmp.group_members])
  return (
    GroupCmp.group_name?(
      <div className=' relative w-full h-96 overflow-hidden '>
      <span onClick={()=>setShowMembers(!show_members)} className='fixed z-10'>
        <FontAwesomeIcon icon={faUserGroup} /></span>
      <div className={`absolute top-0 right-0 flex border border-black ${show_members?'translate-x-0':'translate-x-64' } transition-transform duration-250 ease-in`}>
    <GroupMembers images={imgurl} />
      </div>
        <div className=' flex justify-center absolute font-semibold text-2xl w-full text-slate-200 bg-gray-800 z-20'>
          {GroupCmp.group_name}
          </div> 
      <div className='h-full '>
        <ChatSystem/>
        </div>
    </div>
    ):(
      <div className='w-full h-96 flex justify-center items-center'>
          <span className='text-3xl font-semibold'>Group Chats</span>
      </div>
    )
  )
}

export default GroupContent
