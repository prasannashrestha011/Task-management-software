import { UserInputHook } from '@/app/Context/UserInputContext'
import { Input } from '@nextui-org/react'
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'

const AddNotes = () => {
    const user_input=UserInputHook()
    const [notes,setNotes]=useState<string>("")
    const [notelist,setNoteList]=useState<Set<string>>(new Set())
    const AddNotes=(e:FormEvent)=>{
        e.preventDefault()
        const newNoteList=new Set(notelist)
        newNoteList.add(notes)
        setNoteList(newNoteList)
        setNotes("")
        //converting set into array for submission
       
    }
    useEffect(()=>{
        user_input.setTaskNotes(Array.from(notelist))
    },[notelist])
    useEffect(()=>{
       console.log(user_input.tasknotes , " is your array")
    },[user_input.tasknotes])
    const DeleteNote=(note:string)=>{
        const deleteNote=new Set(notelist)
        deleteNote.delete(note)
        setNoteList(deleteNote)
    }
    useEffect(()=>{
        console.log(notelist)
    },[notelist])
  return (
    <div>
     <form onSubmit={AddNotes} className='flex'>
        <Input 
        type='text'  
        label="Notes" 
        size='md' 
        value={notes}
        onChange={(e:ChangeEvent<HTMLInputElement>)=>{
            setNotes(e.target.value)
        }}
        />
        
       <div className="dropdown z-20">
            <div tabIndex={0} role="button" className="btn m-1"> notes</div>
            <ol tabIndex={0} className="dropdown-content menu  fixed -left-80  rounded-box z-[1] w-96 p-2 shadow  bg-base-100 list-disc">
                {Array.from(notelist).map((item,idx)=>(
                    <li key={idx} className='font-semibold'>
                        <a className='flex justify-between'>
                            <span>{item}</span> 
                          
                        </a>
                        </li>
                ))}
            </ol>
        </div>
   
     </form>
                        
    </div>
  )
}

export default AddNotes
