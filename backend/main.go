package main

import (
	grouplog "main/Grouplog"
	"main/database"
	handlepushnotification "main/handlePushNotification"
	"main/methods"
	"main/oauth"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	oauth.GoogleOauthConfig()
	config := cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"}, // Adjust as needed
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Length", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}
	r.Use(cors.New(config))

	r.GET("/get-transactions", methods.GetTransaction)
	r.POST("/insert-transaction", methods.InsertTransaction)
	//for task management
	r.GET("/get-task-list", methods.GetListOfTask)
	r.POST("/create-task", methods.CreateTask)
	r.GET("/update/task/status", methods.ChangeTaskStatus)
	r.DELETE("/delete/task", methods.DeleteTask)
	r.DELETE("/delete/all/task", methods.DeleteAllTask)
	r.GET("/get/assignedtask", methods.RetriveAssignedTo)
	//for login
	r.GET("/loginhandler", oauth.GoogleCallBackHandler)
	r.POST("/savecredentials", oauth.SaveUserInfo)
	//for user access
	r.GET("/get/allusers", oauth.GetAllUserInfo)
	r.GET("/get/user", oauth.GetUser)
	//group
	r.POST("/create/group", grouplog.CreateGroup)
	r.GET("/get/groups", grouplog.GetAllGroups)
	r.POST("/insert/message", grouplog.InsertMessagesIntoGc)
	//notifications
	r.POST("/insert/notification", handlepushnotification.InsertNotification)
	r.GET("/get/user/notifications", handlepushnotification.GetNotificationMessage)
	r.GET("/get/unread/notifications", handlepushnotification.GetUnreadNotifications)
	r.GET("/reset/unread/notifications", handlepushnotification.ResetUnReadNotifications)
	database.DbInit()
	r.Run()
}
