package logic

import (
	"errors"
	"log"

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
	Username string `gorm:"primaryKey"`
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
	resultUsername := loginDb.Where("username = ?", newUser.Username).First(newUser)
	resultEmail := loginDb.Where("email = ?", newUser.Email).First(newUser)

	if !(errors.Is(resultUsername.Error, gorm.ErrRecordNotFound) && errors.Is(resultEmail.Error, gorm.ErrRecordNotFound)) {
		fmt.Println("This username or email is already in use")
		http.Error(w, "This username or email is already in use", 400)
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
	fmt.Println("Fields Added", newUser)
}

func Signin(w http.ResponseWriter, r *http.Request) {
	// turn json in request into info
	var requestInfo UserInfo
	if body, err := io.ReadAll(r.Body); err == nil {
		if err := json.Unmarshal([]byte(body), &requestInfo); err != nil {
			http.Error(w, "Malformed request", 400)
			return
		}
	}

	// get user info with that username from the db
	var checkInfo UserInfo
	resultUsername := loginDb.First(&checkInfo, "username = ?", requestInfo.Username)

	// check if the username exists
	if errors.Is(resultUsername.Error, gorm.ErrRecordNotFound) {
		http.Error(w, "This username does not exist.", 400)
		return
	}

	// check if the passwords match
	if err := bcrypt.CompareHashAndPassword([]byte(checkInfo.Password), []byte(requestInfo.Password)); err != nil {
		http.Error(w, "Incorrect password", http.StatusUnauthorized)
		return
	}

	res, _ := json.Marshal("User successfully logged in")
	w.Header().Set("Content-Type", "application/json")
	w.Write(res)
}

func GetUsers(w http.ResponseWriter, r *http.Request) {
	var users []UserInfo
	loginDb.Find(&users)
	res, _ := json.Marshal(users)
	w.Header().Set("Content-Type", "application/json")
	w.Write(res)
}

func DeleteUser(w http.ResponseWriter, r *http.Request) {
	var user UserInfo
	if body, err := io.ReadAll(r.Body); err == nil {
		if err := json.Unmarshal([]byte(body), &user); err != nil {
			http.Error(w, "Malformed request", 400)
			return
		}
	}
	var checkInfo UserInfo
	resultUsername := loginDb.First(&checkInfo, "username = ?", user.Username)

	// check if the username exists
	if errors.Is(resultUsername.Error, gorm.ErrRecordNotFound) {
		http.Error(w, "This username does not exist.", 400)
		return
	}

	// check if the passwords match
	if err := bcrypt.CompareHashAndPassword([]byte(checkInfo.Password), []byte(user.Password)); err != nil {
		http.Error(w, "Incorrect password", http.StatusUnauthorized)
		return
	}
	loginDb.Delete(&user, "username = ?", user.Username)
	res, _ := json.Marshal(user)
	w.Header().Set("Content-Type", "application/json")
	w.Write(res)
}
