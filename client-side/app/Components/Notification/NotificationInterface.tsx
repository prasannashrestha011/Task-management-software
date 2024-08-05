interface UserNotificationProp{
    notification_id:number,
    notification_to:string,
    notification_message:string,
    time_stamp:number,
}
interface NotificationPanelProp{
    open:boolean,
    setOpen:(open:boolean)=>void,
  }
export type {UserNotificationProp,NotificationPanelProp}