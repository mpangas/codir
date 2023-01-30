package logic

import (
	"github.com/jinzhu/gorm"
	"golang.org/x/crypto/bcrypt"

	"encoding/json"
	"errors"
	"net/http"
)

type UserInfo struct {
	gorm.Model
	uname    string `gorm:"primaryKey" json:"uname"`
	password string `json:"password"`
}

var loginDb *gorm.DB

func init() {
	loginDb, _ = gorm.Open("mysql", "") //todo: fill this in later
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
		http.Error(w, "This username is already in use", 400) // Not sure if this is an http error yet
	}

	// turn password into hash
	hashPwd, _ := bcrypt.GenerateFromPassword([]byte(newInfo.password), 10)
	newInfo.password = string(hashPwd)

	loginDb.Create(newInfo)

}

func Signin(w http.ResponseWriter, r *http.Request) {
	var requestInfo UserInfo
	if err := json.NewDecoder(r.Body).Decode(&requestInfo); err != nil {
		http.Error(w, "Malformed request", 400)
		return
	}

	var checkInfo UserInfo
	loginDb.First(&checkInfo, "id = ?", requestInfo.uname)

	if err := bcrypt.CompareHashAndPassword([]byte(checkInfo.password), []byte(requestInfo.password)); err != nil {
		http.Error(w, "Incorrect password", 401)
		return
	}

}
