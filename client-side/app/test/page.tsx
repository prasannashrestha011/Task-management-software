
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CardCmp from '../Components/Tables/Card'
import CreateEntry from '../Components/Tables/CreateEntry'
import { InputProvider } from '../Context/InputContext'
interface ApiProp{
    id:number,
    transaction_name:string,
    transaction_amount:string,
    transaction_type:string,
    transaction_date:string,
}
const TestAPI:React.FC = () => {
   
  return (
    <div>
   <InputProvider>
   <CreateEntry/>
   <CardCmp />
   </InputProvider>
 
    
    </div>
  )
}

export default TestAPI
