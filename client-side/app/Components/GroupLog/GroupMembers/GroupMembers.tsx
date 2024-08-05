import React from 'react'
import { GroupContextHook } from '../GroupContext/GroupContext'
interface GroupMembersProp {
 
    images:string[]
}
const GroupMembers:React.FC<GroupMembersProp> = ({images}) => {
    const GroupCmp=GroupContextHook()
  return (
    <ul className='flex flex-col gap-2  bg-black'>
        {GroupCmp.group_members.map((user,idx)=>{
          const [name,_]=user.split("**")
         
          return(
            <li key={idx} className='z-40'>
              <div className=' pl-2 flex justify-center  gap-2 items-center  border-b-1 border-gray-300 w-full'>
              <img src={images[idx]} className='w-8 rounded-full'/>
              <span className='text-sm font-semibold w-40 '>{name}</span>       
              </div>
              </li>
          )
        }
         
        )}
    </ul>
  )
}

export default GroupMembers
