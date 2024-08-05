package methods

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"main/database"
	"main/structure"
	"net/http"

	"github.com/gin-gonic/gin"
)

var db, _ = database.Db()

func GetTransaction(c *gin.Context) {
	transactionList := []structure.TransactionObj{}
	selectQuery := "SELECT * FROM transaction_table "
	rows, err := db.Query(selectQuery)
	if err != nil {
		log.Println(err)
		return
	}
	for rows.Next() {
		transactionObj := structure.TransactionObj{}
		err := rows.Scan(&transactionObj.Transaction_id,
			&transactionObj.Transaction_name,
			&transactionObj.Transaction_amount,
			&transactionObj.Transaction_type,
			&transactionObj.Transaction_date)
		if err != nil {
			log.Println(err.Error())
			return
		}
		transactionList = append(transactionList, transactionObj)
	}
	c.JSON(http.StatusOK, transactionList)
}
func InsertTransaction(c *gin.Context) {
	body, err := io.ReadAll(c.Request.Body)
	dataobj := structure.TransactionObj{}
	if err != nil {
		log.Println(err)
		return
	}
	err = json.Unmarshal(body, &dataobj)
	if err != nil {
		log.Println(err)
		return
	}

	insertQuery := "INSERT INTO transaction_table (transaction_name,transaction_amount,transaction_type,transaction_date) VALUES(?,?,?,?)"
	_, err = db.Exec(insertQuery, dataobj.Transaction_name,
		dataobj.Transaction_amount,
		dataobj.Transaction_type,
		dataobj.Transaction_date)
	if err != nil {
		log.Println(err)
	}
	log.Println("data inserted sucessfully")
	c.JSON(http.StatusOK, gin.H{
		"message": "data inserted sucessfully",
	})
}

// for task management
func GetListOfTask(c *gin.Context) {
	user := c.Query("username")
	token, err := c.Cookie("authToken")
	if err != nil {
		log.Println(err.Error())
		c.JSON(http.StatusOK, gin.H{
			"message": "token required",
		})
		return
	}
	if token == "" {
		c.JSON(http.StatusOK, gin.H{
			"message": "token required",
		})
	}

	TaskList := []structure.Task{}
	selectQuery := "SELECT task_id, task_name, task_notes, date_created, schedule_date, assign_to,task_status,created_by FROM tasktable WHERE created_by=$1"
	rows, err := db.Query(selectQuery, user)

	if err != nil {
		log.Println(err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error retrieving tasks"})
		return
	}
	defer rows.Close()

	for rows.Next() {
		var taskNotes, taskAssign []byte
		var taskObj structure.Task
		err := rows.Scan(&taskObj.Task_id, &taskObj.Task_name, &taskNotes, &taskObj.Date_Created, &taskObj.Schedule_Date, &taskAssign, &taskObj.TaskStatus, &taskObj.Created_By)
		log.Println(taskObj)
		if err != nil {
			log.Println(err.Error())
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Error scanning tasks"})
			return
		}

		//decoding bytes into array
		err = json.Unmarshal(taskNotes, &taskObj.Task_Note)
		if err != nil {
			log.Println(err.Error())
			return
		}
		err = json.Unmarshal(taskAssign, &taskObj.AssignTo)
		if err != nil {
			log.Println(err.Error())
			return
		}

		TaskList = append(TaskList, taskObj)
	}
	c.SetCookie("task", "task1234", 3600, "/", "localhost", false, true)
	c.JSON(http.StatusOK, TaskList)
}
func CreateTask(c *gin.Context) {
	body, err := io.ReadAll(c.Request.Body)
	log.Println(body, " is your data")
	if err != nil {
		log.Println(err.Error())
		return
	}
	Taskobj := structure.Task{}
	err = json.Unmarshal(body, &Taskobj)
	if err != nil {
		log.Println(err.Error())
		return
	}
	log.Println(Taskobj)
	//converting array types into bytes
	taskNotes, err := json.Marshal(Taskobj.Task_Note)
	if err != nil {
		log.Println(err.Error())
		return
	}
	taskAssignTo, err := json.Marshal(Taskobj.AssignTo)
	if err != nil {
		log.Println(err.Error())
		return
	}

	insertQuery := "INSERT INTO tasktable (task_name,task_notes,date_created,schedule_date,assign_to,task_status,created_by) VALUES($1,$2,$3,$4,$5,$6,$7)"
	_, err = db.Exec(insertQuery, Taskobj.Task_name, taskNotes, Taskobj.Date_Created, Taskobj.Schedule_Date, taskAssignTo, Taskobj.TaskStatus, Taskobj.Created_By)
	if err != nil {
		log.Println(err.Error())
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"message": "new task created",
	})
}
func ChangeTaskStatus(c *gin.Context) {
	task_name := c.Query("task_name")
	task_status := c.Query("task_status")
	//query
	selectQuery := "UPDATE tasktable SET task_status=$1 WHERE task_name=$2"
	_, err := db.Exec(selectQuery, task_status, task_name)
	if err != nil {
		log.Println(err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "internal server error",
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"message": "task status updated",
	})
}
func DeleteTask(c *gin.Context) {
	task_id := c.Query("task_id")
	//query
	selectQuery := "DELETE FROM tasktable WHERE task_id=$1"
	_, err := db.Query(selectQuery, task_id)
	if err != nil {
		log.Println(err.Error())
		return
	}
	log.Println(task_id, " deleted from the database")
	c.JSON(http.StatusOK, gin.H{
		"message": "task deleted",
	})
}
func DeleteAllTask(c *gin.Context) {
	username := c.Query("username")
	//query
	deleteQuery := "DELETE FROM tasktable WHERE created_by=$1"
	_, err := db.Exec(deleteQuery, username)
	if err != nil {
		log.Println(err.Error())
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"message": "all task deleted",
	})
}
func RetriveAssignedTo(c *gin.Context) {
	assignedUser := c.Query("assignedUser")

	assignedUserObj := structure.AssignedTaskDetails{}
	assignedUserList := []structure.AssignedTaskDetails{}
	var taskNotesBytes []byte //data stored on bytes
	//query to retrive the user from array of assign_to field
	param := fmt.Sprintf(`["%s"]`, assignedUser)
	log.Println(assignedUser)
	selectQuery := `
select task_id,task_name,task_notes from 
tasktable 
WHERE 
assign_to @> $1;
`
	rows, err := db.Query(selectQuery, param)
	if err != nil {
		log.Println(err.Error(), " is sql error")
		return
	}
	for rows.Next() {
		err := rows.Scan(&assignedUserObj.Task_id, &assignedUserObj.Task_name, &taskNotesBytes)
		if err != nil {
			log.Println(err.Error())
			return
		}
		err = json.Unmarshal(taskNotesBytes, &assignedUserObj.Task_note)
		if err != nil {
			log.Println(err.Error())
			return
		}
		assignedUserList = append(assignedUserList, assignedUserObj)
	}

	c.JSON(http.StatusOK, assignedUserList)
}
