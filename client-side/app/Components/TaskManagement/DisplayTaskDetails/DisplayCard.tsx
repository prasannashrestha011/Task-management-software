import React, { useState } from 'react'
import {Card,CardActions,CardContent,Button,Collapse, Typography} from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons'
interface DisplayCardProp{
    task_id:string,
    task_name:string,
    task_notes:string[]
}
const DisplayCard:React.FC<DisplayCardProp> = ({task_id,task_name,task_notes}) => {
    const [isExpand,setIsExpand]=useState<boolean>(false)
    const handleExpandClick=()=>{
        setIsExpand(!isExpand)
    }
  return (
    <div className='w-full ' onClick={handleExpandClick}>
      <Card  >
        <CardContent className='  flex justify-between'>
            <Typography variant='h6'>{task_name}</Typography>
            <Button onClick={handleExpandClick}>
               {isExpand?<FontAwesomeIcon icon={faChevronDown}/>:<FontAwesomeIcon icon={faChevronRight}/>}
            </Button>
        </CardContent>
        
        <Collapse in={isExpand} timeout={'auto'}>
           <CardContent>
           <Typography paragraph>
                <ol className='list-disc ml-10' >
                {task_notes.map((note,idx)=>(
                    <li key={idx}>
                    <span className='font-semibold text-xl font-sans '>{note}</span>
                        </li>
                ))}
                </ol>
            </Typography>
           </CardContent>
            </Collapse>
      </Card>
    </div>
  )
}

export default DisplayCard
