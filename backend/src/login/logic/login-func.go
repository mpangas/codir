package logic

import (
	"log"

	"errors"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"

	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
)

var loginDb *gorm.DB
var pass = os.Getenv("PASS")
var dsn = "mpangas:" + pass + "@tcp(codir-users.mysql.database.azure.com:3306)/codir_users?charset=utf8mb4&parseTime=True&loc=Local"

type UserInfo struct {
	Email    string
	Username string
	Password string
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
	// Initialize empty user
	newUser := &UserInfo{}
	// Read the body into a byte array and store in newUser
	if body, err := io.ReadAll(r.Body); err == nil {
		if err := json.Unmarshal([]byte(body), newUser); err != nil {
			http.Error(w, "Malformed request", 400)
			return
		}
	}

	// prevent duplicate unames
	resultUsern := loginDb.First(newUser.Username)
	resultEmail := loginDb.First(newUser.Email)
	if !(errors.Is(resultUsern.Error, gorm.ErrRecordNotFound) && errors.Is(resultEmail.Error, gorm.ErrRecordNotFound)) {
		fmt.Println("This username is already in use")
		// error
		return
	}

	// turn password into hash
	hashPwd, _ := bcrypt.GenerateFromPassword([]byte(newUser.Password), 10)
	newUser.Password = string(hashPwd)

	// Add user to DB and check for errors
	if err := loginDb.Create(&newUser).Error; err != nil {
		log.Fatalln(err)
	}
	res, _ := json.Marshal(newUser)
	w.Write(res)
	json.NewEncoder(w).Encode(newUser)
	fmt.Println("Fields Added", newUser)
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

func GetUsers(w http.ResponseWriter, r *http.Request) {
	var users []UserInfo
	loginDb.Find(&users)
	json.NewEncoder(w).Encode(users)
	res, _ := json.Marshal(users)
	w.Header().Set("Content-Type", "application/json")
	w.Write(res)
}
