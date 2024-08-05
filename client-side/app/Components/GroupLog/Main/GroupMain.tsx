import React from 'react'
import DisplayGroup from '../DisplayGroup/DisplayGroup'
import GroupContent from '../GroupContent/GroupContent'
import {GroupContextProvider} from '../GroupContext/GroupContext'

const GroupMain = () => {
  return (
    <>
      <GroupContextProvider>
        <DisplayGroup/>
        <GroupContent/>
      </GroupContextProvider>
    </>
  )
}

export default GroupMain
