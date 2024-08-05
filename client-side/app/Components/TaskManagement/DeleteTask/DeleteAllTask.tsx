import { GetUserHook } from '@/app/Context/GetUserContext'
import { Button } from '@nextui-org/react'
import React from 'react'
import { DeleteAllTaskFunc } from './function/DeleteTaskApi'

const DeleteAllTask:React.FC = () => {
    const UserCmp=GetUserHook()
    const handleTaskDeletion=async()=>{
        console.log('deleting all task ....')
        await DeleteAllTaskFunc(UserCmp.name)
        console.log('deletion successfull')
    }
  return (
    <div>
        <p>
            <span>Delete All of your tasks</span>
        <Button className='btn bg-red-700 btn-sm' onClick={handleTaskDeletion}>
        Delete All Task
        </Button>
        </p>
     
    </div>
  )
}

export default DeleteAllTask
