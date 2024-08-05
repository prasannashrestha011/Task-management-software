import React from "react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, cn} from "@nextui-org/react";
import { InputHook } from "@/app/Context/InputContext";



export const DropDownInput:React.FC=()=> {
  const InputCmp=InputHook()
    
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button 
          variant="bordered" 
        >
          {InputCmp.entry_type?InputCmp.entry_type:'Select Expense Type'}
        </Button>
      </DropdownTrigger>
      <DropdownMenu variant="faded" aria-label="Dropdown menu with description">
        <DropdownItem
          key="new"
         
    
          onClick={()=>InputCmp.setEntryType('Operating')}
        >
         Operating
        </DropdownItem>
        <DropdownItem
          key="copy"
         
        
          onClick={()=>InputCmp.setEntryType('OfficeSupplies')}
        >
          Office Supplies
        </DropdownItem>
        <DropdownItem
          key="edit"
      
          showDivider
          
          onClick={()=>InputCmp.setEntryType('OfficeEquipment')}
        >
          Office Equipment
        </DropdownItem>
        <DropdownItem
          key="delete"
          className="text-danger"
       
        
          onClick={()=>InputCmp.setEntryType('Utilities')}
        >
         Utilities
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
