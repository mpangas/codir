package logic

import (
	"log"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"

	"encoding/json"
	"errors"
	"fmt"
	"net/http"
)

var loginDb *gorm.DB
var dsn = "mpangas:Pippa2481@tcp(codir-users.mysql.database.azure.com:3306)/codir_users?charset=utf8mb4&parseTime=True&loc=Local"

type UserInfo struct {
	gorm.Model
	Username string `gorm:"primaryKey" json:"uname"`
	Password string `json:"password"`
}

func init() {
	var err error
	loginDb, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		fmt.Println("Database did not open: ", err)
		return
	}
	loginDb.AutoMigrate(&UserInfo{})
}

func Signup(w http.ResponseWriter, r *http.Request) {
	// turn json into user info
	newInfo := UserInfo{
		Username: "mpangas",
		Password: "test123",
	}
	if err := json.NewDecoder(r.Body).Decode(&newInfo); err != nil {
		http.Error(w, "Malformed request", 400)
		return
	}

	// prevent duplicate unames
	result := loginDb.First(newInfo.Username)
	if !(errors.Is(result.Error, gorm.ErrRecordNotFound)) {
		fmt.Println("This username is already in use")
		// error
		return
	}

	// turn password into hash
	//hashPwd, _ := bcrypt.GenerateFromPassword([]byte(newInfo.password), 10)
	//newInfo.password = string(hashPwd)

	loginDb.Create(newInfo)
	if err := loginDb.Create(&newInfo).Error; err != nil {
		log.Fatalln(err)
	}

	json.NewEncoder(w).Encode(newInfo)
	fmt.Println("Fields Added", newInfo)
}

func Signin(w http.ResponseWriter, r *http.Request) {
	// turn json in request into info
	var requestInfo UserInfo
	if err := json.NewDecoder(r.Body).Decode(&requestInfo); err != nil {
		http.Error(w, "Malformed request", 400)
		return
	}

	// get user info with that username from the db
	var checkInfo UserInfo
	loginDb.First(&checkInfo, "id = ?", requestInfo.Username)

	// check if the passwords match
	if err := bcrypt.CompareHashAndPassword([]byte(checkInfo.Password), []byte(requestInfo.Password)); err != nil {
		http.Error(w, "Incorrect password", http.StatusUnauthorized)
		return
	}

}