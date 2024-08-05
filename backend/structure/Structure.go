package structure

type TransactionObj struct {
	Transaction_id     int    `json:"id"`
	Transaction_name   string `json:"transaction_name"`
	Transaction_amount string `json:"transaction_amount"`
	Transaction_type   string `json:"transaction_type"`
	Transaction_date   string `json:"transaction_date"`
}
type Task struct {
	Task_id       *int     `json:"id"`
	Task_name     string   `json:"task_name"`
	Task_Note     []string `json:"task_notes"`
	Date_Created  string   `json:"date_created"`
	Schedule_Date string   `json:"schedule_date"`
	AssignTo      []string `json:"assign_to"`
	TaskStatus    string   `json:"task_status"`
	Created_By    string   `json:"created_by"`
}
type AssignedTaskDetails struct {
	Task_id   *int     `json:"id"`
	Task_name string   `json:"task_name"`
	Task_note []string `json:"task_notes"`
}
type UserInfo struct {
	Id      string `json:"id"`
	Email   string `json:"email"`
	Name    string `json:"name"`
	Picture string `json:"picture"`
}
type GroupLog struct {
	Id             int      `json:"group_id"`
	GroupName      string   `json:"group_name"`
	GroupMembers   []string `json:"group_members"`
	GroupChat      []string `json:"group_chat"`
	GroupCreatedAt int64    `json:"group_created_at"`
}
type GroupMessage struct {
	GroupChat []string `json:"group_chat"`
}

// push notification body
type PushNotification struct {
	Notification_id      int    `json:"notification_id"`
	Notification_to      string `json:"notification_to"`
	Notification_message string `json:"notification_message"`
	Time_stamp           int64  `json:"time_stamp"`
}
type UnreadNotification struct {
	Notification_id          int    `json:"notification_id"`
	Notification_to          string `json:"notification_to"`
	UnreadNotificationNumber int    `json:"unread_messages"`
}
