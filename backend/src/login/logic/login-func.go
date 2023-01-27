package login

import (
	"github.com/jinzhu/gorm"
	"golang.org/x/crypto/bcrypt"

	"encoding/json"
	"net/http"
)

type UserInfo struct {
	uname    string `json:"uname"`
	password string `json:"password"`
}

var loginDb *gorm.DB

func init() {
	loginDb, _ = gorm.Open("mysql", "") // fill this in later
	loginDb.AutoMigrate(&UserInfo{})
}

func Signup(w http.ResponseWriter, r *http.Request) {
	// turn json into user info
	var newInfo UserInfo
	if err := json.NewDecoder(r.Body).Decode(&newInfo); err != nil {
		http.Error(w, "Malformed request", 400)
		return
	}

	// turn password into hash
	hashPwd, _ := bcrypt.GenerateFromPassword([]byte(newInfo.password), 10)
	newInfo.password = string(hashPwd)

	// todo: prevent duplicate unames

	loginDb.Create(newInfo)

}

func Signin(w http.ResponseWriter, r *http.Request) {
	var requestInfo UserInfo
	if err := json.NewDecoder(r.Body).Decode(&requestInfo); err != nil {
		http.Error(w, "Malformed request", 400)
		return
	}

	var checkInfo UserInfo

	if err := bcrypt.CompareHashAndPassword([]byte(checkInfo.password), []byte(requestInfo.password)); err != nil {
		http.Error(w, "Incorrect password", 401)
		return
	}

}
