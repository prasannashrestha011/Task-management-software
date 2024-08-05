interface UserProp{

    id:string,
    email:string,
    name:string,
    picture:string,
   

}
interface UserPropSetter{
    id:string,
    email:string,
    name:string,
    picture:string,
    plain_picture:string,
    change_state:boolean,
    setID:(id:string)=>void,
    setEmail:(email:string)=>void,
    setName:(name:string)=>void,
    setPicture:(picture:string)=>void,
    setPlainPicture:(plain_picture:string)=>void,
    setChangeState:(change_state:boolean)=>void,
}
const defaultUser={
    id:'',
    email:'',
    name:'',
    picture:'',
    plain_picture:'',
    change_state:false,
    setID:()=>{},
    setEmail:()=>{},
    setName:()=>{},
    setPicture:()=>{},
    setPlainPicture:(plain_picture:string)=>{},
    setChangeState:(change_state:boolean)=>{},
}
export type {UserProp,UserPropSetter}
export { defaultUser }

