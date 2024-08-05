'use client';
import React, { useEffect, useState } from "react";
import { Select, SelectItem, Avatar, Chip } from "@nextui-org/react";
import GetAllUsers from "../LoginCmp/GetAllUser";
import { UserInputHook } from "@/app/Context/UserInputContext";
import { GetUserHook } from "@/app/Context/GetUserContext";

interface UserProp {
  id: string;
  email: string;
  name: string;
  picture: string;
}

const preloadImages = async (imageUrls: string[]) => {
  console.log(imageUrls)
  const promises = imageUrls.map(async (url) => {
    const response = await fetch(url);
    const blob = await response.blob();
    const objectUrl = URL.createObjectURL(blob);
  
    return objectUrl;
  });

  try {
    return await Promise.all(promises);
  } catch (error) {
    console.error('Failed to preload images:', error);
    return [];
  }
};

export const AddAssignTo: React.FC = () => {
  const [user, setUser] = useState<UserProp[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());
  const user_input=UserInputHook()
  const UserCmp=GetUserHook()

  const fetchUser = async () => {
    const userList = await GetAllUsers();
    const urls = await preloadImages(userList.map(user => user.picture));
    setImageUrls(urls);
    setUser(userList);
  };
  useEffect(()=>{
    
    console.log(Array.from(selectedUsers), " is keys");
    user_input.setAssignTo(Array.from(selectedUsers))
    const userList=Array.from(selectedUsers).map((user,idx)=>{
        const [id,username,url]=user.split('**')
        console.log(username  ," is splitted user")
        return username
    })
    user_input.setUserlist(userList.map((user,idx)=>({
      notification_to:user,
      notification_message:`${user_input.taskname} has been created by ${UserCmp.name}`,
    })))
  },[selectedUsers])
  useEffect(() => {
    fetchUser();

    return () => {
      // Clean up the object URLs when the component is unmounted
      imageUrls.forEach(url => URL.revokeObjectURL(url));
    };
  }, []);

  const handleSelectionChange = (keys: 'all' | Set<React.Key>) => {
    if (keys === 'all') {
      console.log( 'selected')
      setSelectedUsers(new Set(user.map(u => u.id)));
    } else {
      
      console.log(keys)
      setSelectedUsers(new Set(keys as Set<string>));
    }
  };

  return (
    <Select
      items={user}
      label="Assigned to"
      variant="bordered"
      isMultiline={true}
      selectionMode="multiple"
      placeholder="Select a user"
      labelPlacement="outside"
      selectedKeys={selectedUsers}
      onSelectionChange={handleSelectionChange}
      classNames={{
        base: "max-w-xs",
        trigger: "min-h-12 py-2",
      }}
      renderValue={() => (
        <div className="flex flex-wrap gap-2">
          {Array.from(selectedUsers).map(username => {
            const selectedUser = user.find(item => `${item.id}**${item.name}**${item.picture}`=== username);
            return selectedUser ? <Chip key={selectedUser.id}>{selectedUser.name}</Chip> : null;
          })}
        </div>
      )}
    >
      {user.map((item, idx) => (
        <SelectItem key={`${item.id}**${item.name}**${item.picture}`} textValue={item.name}>
          <div className="flex gap-2 items-center">
            <Avatar alt={item.picture} className="flex-shrink-0" size="sm" src={imageUrls[idx]} />
            <div className="flex flex-col">
              <span className="text-small">{item.name}</span>
              <span className="text-tiny text-default-400">{item.email}</span>
              
            </div>
          </div>
        </SelectItem>
      ))}
    </Select>
  );
};
