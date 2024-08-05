'use client';
import React, { useEffect, useState } from "react";
import { Select, SelectItem, Avatar, Chip } from "@nextui-org/react";
import GetAllUsers from "../../LoginCmp/GetAllUser";
import { UserInputHook } from "@/app/Context/UserInputContext";
import { GroupHooks } from "@/app/Context/GroupContext";

interface UserProp {
  id: string;
  email: string;
  name: string;
  picture: string;
}

const preloadImages = async (imageUrls: string[]) => {
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

export const SelectUsers: React.FC = () => {
  const [user, setUser] = useState<UserProp[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());
  const InputCmp=GroupHooks()
  const fetchUser = async () => {
    const userList = await GetAllUsers();
    const urls = await preloadImages(userList.map(user => user.picture));
    setImageUrls(urls);
    setUser(userList);
  };
  
  useEffect(() => {
    fetchUser();

    return () => {
      // Clean up the object URLs when the component is unmounted
      imageUrls.forEach(url => URL.revokeObjectURL(url));
    };
  }, []);
  useEffect(()=>{
    InputCmp.setMembers(Array.from(selectedUsers) )
  },[selectedUsers])

  const handleSelectionChange = (keys: 'all' | Set<React.Key>) => {

      
      console.log(keys ," is your keys")
      setSelectedUsers(new Set(keys as Set<string>));
    
  };

  return (
    <Select
      items={user}
      label="Available Users"
      variant="bordered"
      isMultiline={true}
      selectionMode="multiple"
      placeholder="Select a user"
      labelPlacement="outside"
      selectedKeys={selectedUsers}
      onSelectionChange={handleSelectionChange}
      classNames={{
      
        trigger: "min-h-12 py-2",
      }}
      renderValue={() => (
        <div className="flex flex-wrap gap-2">
          {Array.from(selectedUsers).map(username => {
            
            const selectedUser = user.find(item => `${item.name}-${item.picture}` === username);
            return selectedUser ? <Chip key={selectedUser.id}>{selectedUser.name}</Chip> : null;
          })}
        </div>
      )}
    >
      {user.map((item, idx) => (
        <SelectItem key={`${item.name}**${item.picture}`} textValue={item.name}>
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
