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
	json.NewDecoder(r.Body).Decode(&newInfo)

	// turn password into hash
	hashPwd, _ := bcrypt.GenerateFromPassword([]byte(newInfo.password), 10)
	newInfo.password = string(hashPwd)

	// TODO: database (u+1f480)

}

func Signin(w http.ResponseWriter, r *http.Request) {

}
