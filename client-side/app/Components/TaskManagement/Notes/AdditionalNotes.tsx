import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Input } from '@nextui-org/react'
import React, { useState } from 'react'

const AdditionalNotes = () => {
    const [showInput,setShowInput]=useState<boolean>(false)
  return (
    <div className='flex justify-center items-center'>
        {showInput?(
        <input 
        className='bg-white border border-black h-8 w-44 rounded-md'
        />
      ):""}
      <button className='btn btn-sm' onClick={()=>setShowInput(!showInput)}><FontAwesomeIcon icon={faEdit} /></button>
      
    </div>
  )
}

export default AdditionalNotes
