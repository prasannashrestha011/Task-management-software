package database

import (
	"database/sql"
	"fmt"
	"log"

	_ "github.com/lib/pq"
)

var connStr = "postgres://postgres:9843@localhost/taskmanagement?sslmode=disable"
var db, err = sql.Open("postgres", connStr)

func DbInit() {

	if err != nil {
		fmt.Println(err.Error())
		return
	}
	err = db.Ping()
	if err != nil {
		fmt.Println(err.Error())
		return
	}
	log.Println("Connection sucessfull")

}
func Db() (*sql.DB, error) {
	if err != nil {
		return nil, err
	}
	return db, nil
}
