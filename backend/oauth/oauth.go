package oauth

import (
	"context"
	"encoding/json"
	"io"
	"log"
	"main/database"
	"main/jwttoken"
	"main/structure"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
)

var googleOauthConfig = &oauth2.Config{}
var db, _ = database.Db()

func GoogleOauthConfig() {
	err := godotenv.Load()
	log.Println(os.Getenv("CLIENT_ID"), "is your client id")
	log.Println(os.Getenv("CLIENT_SECRET"), "is your client secret")
	if err != nil {
		log.Println(err.Error())
		return
	}
	googleOauthConfig = &oauth2.Config{
		RedirectURL:  "http://localhost:3000",
		ClientID:     os.Getenv("CLIENT_ID"),
		ClientSecret: os.Getenv("CLIENT_SECRET"),
		Scopes:       []string{"https://www.googleapis.com/auth/userinfo.email"},
		Endpoint:     google.Endpoint,
	}
}
func GoogleCallBackHandler(c *gin.Context) {
	code := c.Query("code")
	log.Println(code, " is your code")
	token, err := googleOauthConfig.Exchange(context.Background(), code)
	if err != nil {
		log.Println(err.Error())
		return
	}
	//accessing the user info from google apis
	userInfo, err := GetUserInfo(token.AccessToken)
	if err != nil {
		log.Println("error getting user info:", err.Error())
		return
	}

	authToken, err := jwttoken.CreateToken(userInfo["name"].(string))
	if err != nil {
		log.Println(err.Error())
		return
	}

	c.SetCookie("authToken", authToken, 3600, "/", "localhost", false, true)
	log.Println("token issued")
	c.JSON(http.StatusOK, gin.H{
		"usertoken": userInfo,
	})

}
func GetUserInfo(accessToken string) (map[string]interface{}, error) {
	res, err := http.Get("https://www.googleapis.com/oauth2/v2/userinfo?access_token=" + accessToken)
	if err != nil {
		log.Println(err.Error())
		return nil, err
	}
	var userInfo map[string]interface{}
	err = json.NewDecoder(res.Body).Decode(&userInfo)
	if err != nil {
		log.Println(err.Error())
		return nil, err
	}

	return userInfo, nil
}
func SaveUserInfo(c *gin.Context) {
	body, err := io.ReadAll(c.Request.Body)
	if err != nil {
		log.Println(err.Error())
		return
	}
	userObj := structure.UserInfo{}
	err = json.Unmarshal(body, &userObj)
	if err != nil {
		log.Println(err.Error())
		return
	}
	log.Println(userObj)
	insertQuery := "INSERT INTO userinfo (id,email,name,picture) VALUES($1,$2,$3,$4)"
	_, err = db.Exec(insertQuery, userObj.Id, userObj.Email, userObj.Name, userObj.Picture)
	if err != nil {
		log.Println(err.Error())
	}
	c.JSON(http.StatusOK, gin.H{
		"message": "user info saved to the database",
	})
}
func GetUser(c *gin.Context) {
	userObj := structure.UserInfo{}
	user_id := c.Query("userID")
	selectQuery := "SELECT * FROM userinfo WHERE id=$1"
	rows, err := db.Query(selectQuery, user_id)
	if err != nil {
		log.Println(err.Error())
		return
	}
	for rows.Next() {
		err := rows.Scan(&userObj.Id, &userObj.Email, &userObj.Name, &userObj.Picture)
		if err != nil {
			log.Println(err.Error())
			return
		}
	}

	c.JSON(http.StatusOK, userObj)
}
func GetAllUserInfo(c *gin.Context) {
	UserLIst := []structure.UserInfo{}
	//query
	selectQuery := "SELECT * FROM userinfo"
	rows, err := db.Query(selectQuery)
	if err != nil {
		log.Println(err.Error())
		return
	}
	for rows.Next() {
		userObj := structure.UserInfo{}
		err := rows.Scan(&userObj.Id, &userObj.Email, &userObj.Name, &userObj.Picture)
		if err != nil {
			log.Println(err.Error())
			return
		}
		UserLIst = append(UserLIst, userObj)
	}
	c.JSON(http.StatusOK, UserLIst)
}
