interface GroupListProp{
    group_id:number,
    group_name:string,
    group_members:string[],
    group_chat:string[]
    group_created_at:number,
    
}
interface GroupGetterAndSetter{
    group_id:number,
    setGroupId:(group_id:number)=>void,
    group_name:string,
    setGroupName:(group_name:string)=>void,
    group_members:string[],
    setGroupMembers:(group_members:string[])=>void,
    group_chat:string[],
    setGroupChat:(group_chat:string[])=>void,
    group_created_at:number,
    setGroupCreatedAt:(group_created_at:number)=>void,
}
export type {GroupListProp,GroupGetterAndSetter}