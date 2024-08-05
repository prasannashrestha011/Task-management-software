'use client'
import React, { useEffect, useState } from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@nextui-org/react";
import axios from "axios";
import { InputHook } from "@/app/Context/InputContext";
import { formatDistanceToNow } from "date-fns";
interface ApiProp{
  id:number,
  transaction_name:string,
  transaction_amount:string,
  transaction_type:string,
  transaction_date:string,
}
interface TableProp{
    tabledata:ApiProp[]
}
const TableData:React.FC=({})=> {
  const [transactionlist,setTransactionList]=useState<ApiProp[]>([])
  const InputCmp=InputHook()
  const fetchApi=async()=>{
      try{
          const response=await axios.get('http://localhost:8080/get-transactions')
          if (response.status!=200) throw new Error('error:')
              setTransactionList(response.data)
      }catch(err){
          console.log(err)
      }
  }
  useEffect(()=>{
      fetchApi()
  }
  ,[InputCmp.issubmitted])
  return (
    <Table aria-label=" " className="text-slate-100  ">
      <TableHeader >
        <TableColumn >Transaction ID</TableColumn>
        <TableColumn>Name</TableColumn>
        <TableColumn>Amount</TableColumn>
        <TableColumn>Uploaded Time</TableColumn>
      </TableHeader>
      <TableBody >
   
    
      {transactionlist.map((item,idx)=>{
        var entryDate=new Date(parseInt(item.transaction_date,10))
        return(
          <TableRow key={idx} className="text-xl">
          
            <TableCell><span className="text-xl">{item.id}</span></TableCell>
          <TableCell ><span className="text-xl">{item.transaction_name}</span></TableCell>
          <TableCell><span className="text-xl">${item.transaction_amount}</span></TableCell>
          <TableCell>{formatDistanceToNow(entryDate,{addSuffix:true}) }</TableCell>
        </TableRow>
        )
       }
       )}
    
      
     
      </TableBody>
    </Table>
  );
}
export default TableData