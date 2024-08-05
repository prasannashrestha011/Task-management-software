'use client'
import React, { useEffect, useState } from 'react'
import { GroupListProp } from '../Grouplistprop/GrouplistProp'
import FetchGroupList from '../functions/fetchGrouplist'
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow'
import { GroupContextHook } from '../GroupContext/GroupContext'


const DisplayGroup:React.FC = () => {
    const [list,setList]=useState<GroupListProp[]>([])
    const GroupCmp=GroupContextHook()
    const fetchData=async()=>{
        const data=await FetchGroupList()
       
        setList(data)
    }
    useEffect(()=>{
        fetchData()
    },[GroupCmp.group_chat])
    const setGroupInfo=(group_id:number,group_name:string,group_members:string[],group_chat:string[],group_created_at:number)=>{
        GroupCmp.setGroupId(group_id),
        GroupCmp.setGroupName(group_name),
        GroupCmp.setGroupMembers(group_members),
        GroupCmp.setGroupChat(group_chat),
        GroupCmp.setGroupCreatedAt(group_created_at)
    }
  return (
  
      <div className='border-1 border-gray-300  font-semibold w-3/12 '>
        <ul>
        {list.map((item,idx)=>{
            const createdDate=new Date(item.group_created_at)
            return(
                <li key={idx}>
                    <p className='  h-9 flex justify-between items-center pl-3 border-b-1 border-gray-200'
                    onClick={()=>setGroupInfo(item.group_id,item.group_name,item.group_members,item.group_chat,item.group_created_at)}
                    >
                        <span className='lg:w-8/12'>{item.group_name}</span>
                        <span className='text-xs lg:w-5/12 lg:pr-1 lg:flex lg:justify-end'>{formatDistanceToNow(createdDate,{addSuffix:true})}</span>
                    </p>
                    </li>
            )
        })}
        </ul>
      </div>
   
  )
}

export default DisplayGroup
