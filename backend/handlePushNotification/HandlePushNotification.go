package handlepushnotification

import (
	"encoding/json"
	"io"
	"log"
	"main/database"
	"main/structure"
	"net/http"

	"github.com/gin-gonic/gin"
)

var db, _ = database.Db()

func InsertNotification(c *gin.Context) {
	body, err := io.ReadAll(c.Request.Body)
	time_stamp := c.Query("time_stamp")
	if err != nil {
		log.Println(err.Error())
		return
	}
	var userArr []structure.PushNotification
	err = json.Unmarshal(body, &userArr)
	log.Println(userArr, " is user array")
	if err == nil {
		for _, user := range userArr {
			log.Println(user.Notification_to, " is idx user")

			log.Println(user.Notification_to, ` is username`)
			insertQuery := "INSERT INTO notification_messages (notification_to, notification_message,time_stamp) VALUES($1, $2,$3)"
			_, err := db.Exec(insertQuery, user.Notification_to, user.Notification_message, time_stamp)
			if err != nil {
				log.Println(err.Error(), "is your error")
				return
			}
		}
		c.JSON(http.StatusOK, gin.H{
			"message": "Array inserted",
		})
		return
	}

	notificationObj := structure.PushNotification{}
	err = json.Unmarshal(body, &notificationObj)
	if err != nil {
		log.Println(err.Error(), " is man")
		return
	}
	log.Println(notificationObj)

	//inserting into notification_messages table
	insertQuery := `INSERT INTO notification_messages (notification_to,notification_message) VALUES($1,$2)`
	_, err = db.Exec(insertQuery, notificationObj.Notification_to, notificationObj.Notification_message)
	if err != nil {
		log.Println(err.Error())
		c.JSON(http.StatusInternalServerError, err)
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"message": "message inserted",
	})
}
func GetNotificationMessage(c *gin.Context) {
	username := c.Query("username")
	notificationList := []structure.PushNotification{}
	//database query
	selectQuery := `
	SELECT notification_id,notification_message,time_stamp
	 FROM notification_messages 
	WHERE notification_to=$1
	ORDER BY time_stamp DESC
	`
	rows, err := db.Query(selectQuery, username)
	if err != nil {
		log.Println(err.Error())
		c.JSON(http.StatusInternalServerError, err)
		return
	}
	for rows.Next() {
		notificationObj := structure.PushNotification{}
		err := rows.Scan(&notificationObj.Notification_id, &notificationObj.Notification_message, &notificationObj.Time_stamp)
		if err != nil {
			log.Println(err.Error())
			return
		}
		notificationList = append(notificationList, notificationObj)
	}
	c.JSON(http.StatusOK, notificationList)
}
func GetUnreadNotifications(c *gin.Context) {
	username := c.Query("username")
	notificationObj := structure.UnreadNotification{}
	//fetching user from db...
	selectQuery := "SELECT * FROM unread_notifications WHERE notification_to=$1"
	rows, err := db.Query(selectQuery, username)
	if err != nil {
		log.Println(err.Error())
		return
	}
	for rows.Next() {
		err := rows.Scan(&notificationObj.Notification_id, &notificationObj.Notification_to, &notificationObj.UnreadNotificationNumber)
		if err != nil {
			log.Println(err.Error())
			c.JSON(http.StatusInternalServerError, err)
			return
		}
	}
	c.JSON(http.StatusOK, notificationObj)
}
func ResetUnReadNotifications(c *gin.Context) {
	username := c.Query("username")
	//fetching user notification ..
	updateQuery := `
	UPDATE unread_notifications 
	SET unread_messages=0 
	WHERE notification_to=$1
	`
	_, err := db.Exec(updateQuery, username)
	if err != nil {
		log.Println(err.Error())
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"message": "notification number reset",
	})
}
