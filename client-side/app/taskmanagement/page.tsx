
import React from 'react'
import { TaskManagemanetModal } from '../Components/TaskManagement/TaskManagementModal'
import { TaskPropProvider } from '../Context/TaskManagementPropContext'
import { UserInputProvider } from '../Context/UserInputContext'
import GroupCmp from '../Components/GroupLog/CreateGroup/GroupCmp'
import { ToggleContentProvider } from '../Context/ToggleContent'
import ToggleContent from '../Components/TaskManagement/ToggleContentBtn/ToggleContent'
import Index from '../Components/TaskManagement/Index/Index'
import DisplayUser from '../Components/DisplayUsername/DisplayUser'
import { GetUserProvider } from '../Context/GetUserContext'
import UserNotifications from '../Components/Notification/UserNotifications'
import GetUserNotifications from '../Components/Notification/GetUserNotification'

const TaskManagementPage = () => {
  
  return (
    <div className={`fixed top-0 left-0 h-screen w-full  z-50 overflow-y-auto`} 
    
    >
      <UserInputProvider>
            <GetUserProvider>
      <div>
      <DisplayUser/>
     
      </div>
      <TaskPropProvider>
      <div className='flex justify-center items-center gap-2 mb-5 h-14 text-blue-50 ' style={{backgroundColor:'#4626A0'}}>
              <TaskManagemanetModal/>
              <GroupCmp/>
              <GetUserNotifications/>
      </div>
          
              
            <div className='flex w-full   h-full  overflow-hidden'>
           <ToggleContentProvider>
              <div className=' w-full h-full lg:w-10/12 flex flex-col  mx-auto  '>
                  <ToggleContent/>
                  <Index/>           
                </div>
           </ToggleContentProvider>
          
          
        </div>
      </TaskPropProvider>
      </GetUserProvider>
    </UserInputProvider>
    </div>
  )
}

export default TaskManagementPage
