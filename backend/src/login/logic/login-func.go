package login

import (
	//"github.com/jinzhu/gorm"
	"golang.org/x/crypto/bcrypt"

	"encoding/json"
	"net/http"
)

type UserInfo struct {
	uname    string `json:"uname"`
	password string `json:"password"`
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

	// TODO: database (u+1f480)

}

func Signin(w http.ResponseWriter, r *http.Request) {
	var checkInfo UserInfo
	if err := json.NewDecoder(r.Body).Decode(&checkInfo); err != nil {
		http.Error(w, "Malformed request", 400)
		return
	}

}
