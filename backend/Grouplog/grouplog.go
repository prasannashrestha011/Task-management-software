package grouplog

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

func CreateGroup(c *gin.Context) {
	groupObj := structure.GroupLog{}
	body, err := io.ReadAll(c.Request.Body)
	if err != nil {
		log.Println(err.Error())
		return
	}

	err = json.Unmarshal(body, &groupObj)
	log.Println(groupObj)
	if err != nil {
		log.Println(err.Error())
		return
	}
	//converting array into bytes
	group_members, err := json.Marshal(groupObj.GroupMembers)
	if err != nil {
		log.Println(err.Error())
		return
	}
	//database query
	insertQuery := "INSERT INTO grouplog (group_name,group_members,group_created_at) VALUES($1,$2,$3)"

	_, err = db.Exec(insertQuery, groupObj.GroupName, group_members, groupObj.GroupCreatedAt)
	if err != nil {
		log.Println(err.Error())
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"message": "new group created",
	})

}
func GetAllGroups(c *gin.Context) {
	groupList := []structure.GroupLog{}
	//query
	selectQuery := "SELECT group_id,group_name,group_created_at,group_chat,group_members FROM grouplog"
	rows, err := db.Query(selectQuery)
	if err != nil {
		log.Println(err.Error())
		return
	}
	for rows.Next() {
		groupObj := structure.GroupLog{}
		var groupMemberBytes []byte
		var groupChatBytes []byte
		err := rows.Scan(&groupObj.Id, &groupObj.GroupName, &groupObj.GroupCreatedAt, &groupChatBytes, &groupMemberBytes)
		if err != nil {
			log.Println(err.Error())
			return
		}
		//unmarshing byte into array
		err = json.Unmarshal(groupMemberBytes, &groupObj.GroupMembers)
		if err != nil {

			log.Println("err1:", err.Error())
			return
		}
		log.Println(groupChatBytes, " is  your data")
		if groupChatBytes == nil {
			groupList = append(groupList, groupObj)
		} else {
			err = json.Unmarshal(groupChatBytes, &groupObj.GroupChat)

			if err != nil {
				log.Println("err:2", err.Error())
				return
			}
		}

		groupList = append(groupList, groupObj)
	}
	c.JSON(http.StatusOK, gin.H{
		"list":    groupList,
		"message": "grouplist",
	})
}
func InsertMessagesIntoGc(c *gin.Context) {
	group_id := c.Query("group_id")
	messageObj := structure.GroupMessage{}
	body, err := io.ReadAll(c.Request.Body)
	if err != nil {
		log.Println(err.Error())
		return
	}
	err = json.Unmarshal(body, &messageObj)
	log.Println(messageObj.GroupChat)
	if err != nil {
		log.Println(err.Error())
		return
	}
	messageObjBytes, err := json.Marshal(messageObj.GroupChat)
	if err != nil {
		log.Println(err.Error())
		return
	}
	//inserting into db
	insertQuery :=
		`UPDATE grouplog
     SET group_chat = COALESCE(
         group_chat || $1,
         '[]'::jsonb
     )
     WHERE group_id = $2`
	_, err = db.Exec(insertQuery, messageObjBytes, group_id)
	if err != nil {
		log.Println(err.Error())
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"message": "new data added",
	})

}
