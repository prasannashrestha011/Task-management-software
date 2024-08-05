interface NotificationProp{
    notification_id:number,
    notification_to:string,
    unread_messages:number,
}
interface AssignedNotificationProp{
    notification_to:string,
    notification_message:string,
}
export type {NotificationProp,AssignedNotificationProp}