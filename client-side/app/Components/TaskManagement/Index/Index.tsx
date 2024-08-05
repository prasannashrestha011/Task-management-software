"use client"
import React from 'react'
import FetchTaskList from '../FetchTaskList'
import DisplayTaskModal from '../DisplayTaskModal'
import { ToggleContentHook } from '@/app/Context/ToggleContent'
import DisplayGroup from '../../GroupLog/DisplayGroup/DisplayGroup'
import GroupMain from '../../GroupLog/Main/GroupMain'
import DisplayTaskDetails from '../DisplayTaskDetails/DisplayTaskDetails'
import Settings from '../Settings/Settings'

const Index = () => {
    const ToggleCmp=ToggleContentHook()
  return (
    <div className='flex w-full border-1 bg-white h-full'>
        {
        ToggleCmp.content=="settings"?(
          <Settings/>
        ):(
          ToggleCmp.content=="taskdetails"?(
            <DisplayTaskDetails />
          ):(
            ToggleCmp.content=="groups"?
          (                           
       <>
        <GroupMain/>
       </>
          )
          :
      (
              <>
               <div className='lg:flex-none'>
              <FetchTaskList/>
          </div>
          <div className='lg:flex-1   '>
          <DisplayTaskModal/>
          </div> 
              </>
       )  
          )
        )
    }
    </div>  
  )
}

export default Index
