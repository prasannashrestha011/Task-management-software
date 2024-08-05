'use client'
import React from 'react'
import { CreateGroupLog } from './CreateGroupLog'
import { GroupPropProvider } from '@/app/Context/GroupContext'

const GroupCmp = () => {
  return (
    <GroupPropProvider>
        
      <CreateGroupLog/>
    </GroupPropProvider>
  )
}

export default GroupCmp
