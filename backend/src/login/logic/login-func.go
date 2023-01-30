package logic

import (
	"github.com/jinzhu/gorm"
	"golang.org/x/crypto/bcrypt"

	"encoding/json"
	"errors"
	"fmt"
	"net/http"
)

type UserInfo struct {
	gorm.Model
	uname    string `gorm:"primaryKey" json:"uname"`
	password string `json:"password"`
}

var loginDb *gorm.DB

func init() {
	var err error
	loginDb, err = gorm.Open("mysql", "") //todo: fill this in later
	if err != nil {
		fmt.Println("Database did not open: ", err)
		return
	}
	loginDb.AutoMigrate(&UserInfo{})
}

func Signup(w http.ResponseWriter, r *http.Request) {
	// turn json into user info
	var newInfo UserInfo
	if err := json.NewDecoder(r.Body).Decode(&newInfo); err != nil {
		http.Error(w, "Malformed request", 400)
		return
	}

	// prevent duplicate unames
	result := loginDb.First(newInfo.uname)
	if !(errors.Is(result.Error, gorm.ErrRecordNotFound)) {
		fmt.Println("This username is already in use")
		// error
		return
	}

	// turn password into hash
	hashPwd, _ := bcrypt.GenerateFromPassword([]byte(newInfo.password), 10)
	newInfo.password = string(hashPwd)

	loginDb.Create(newInfo)

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
	loginDb.First(&checkInfo, "id = ?", requestInfo.uname)

	// check if the passwords match
	if err := bcrypt.CompareHashAndPassword([]byte(checkInfo.password), []byte(requestInfo.password)); err != nil {
		http.Error(w, "Incorrect password", 401)
		return
	}

}
