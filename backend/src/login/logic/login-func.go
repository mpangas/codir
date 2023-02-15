package logic

import (
	"errors"
	"log"
	"time"

	"github.com/dgrijalva/jwt-go/v4"
	"github.com/gofiber/fiber/v2"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"

	"fmt"
	"os"
)

var loginDb *gorm.DB
var pass = os.Getenv("PASS")
var dsn = "mpangas:" + pass + "@tcp(codir-users.mysql.database.azure.com:3306)/codir_users?charset=utf8mb4&parseTime=True&loc=Local"

const SecretKey = "secret"

type UserInfo struct {
	Email    string `json:"email" gorm:"unique"`
	Username string `json:"username" gorm:"unique"`
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

func Signup(c *fiber.Ctx) error {
	// Initialize empty user
	newUser := new(UserInfo)

	// Read the body into the new User object
	if err := c.BodyParser(newUser); err != nil {
		c.Status(fiber.StatusBadRequest)
		return c.JSON(fiber.Map{
			"message": "Invalid data",
		})
	}

	// Hash password
	hashPwd, _ := bcrypt.GenerateFromPassword([]byte(newUser.Password), 10)
	newUser.Password = string(hashPwd)

	// prevent duplicate usernames
	var checkInfo UserInfo
	resultUsername := loginDb.Where("username = ?", newUser.Username).First(&checkInfo)
	if !errors.Is(resultUsername.Error, gorm.ErrRecordNotFound) {
		c.Status(fiber.StatusBadRequest)
		return c.JSON(fiber.Map{
			"message": "This username is already in use",
		})
	}

	// prevent duplicate emails
	resultEmail := loginDb.Where("email = ?", newUser.Email).First(&checkInfo)
	if !errors.Is(resultEmail.Error, gorm.ErrRecordNotFound) {
		c.Status(fiber.StatusBadRequest)
		return c.JSON(fiber.Map{
			"message": "This email is already in use",
		})
	}

	// Add user to DB and check for errors
	if err := loginDb.Create(&newUser).Error; err != nil {
		log.Fatalln(err)
	}

	return c.JSON(newUser)
}

func Signin(c *fiber.Ctx) error {
	// turn json in request into info
	requestUser := new(UserInfo)
	if err := c.BodyParser(requestUser); err != nil {
		c.Status(fiber.StatusBadRequest)
		return c.JSON(fiber.Map{
			"message": "Invalid data",
		})
	}

	// get user info with that username from the db
	var checkInfo UserInfo
	resultUsername := loginDb.First(&checkInfo, "username = ?", requestUser.Username)

	// check if the username exists
	if errors.Is(resultUsername.Error, gorm.ErrRecordNotFound) {
		c.Status(fiber.StatusBadRequest)
		return c.JSON(fiber.Map{
			"message": "This username does not exist.",
		})
	}

	// check if the passwords match
	if err := bcrypt.CompareHashAndPassword([]byte(checkInfo.Password), []byte(requestUser.Password)); err != nil {
		c.Status(fiber.StatusBadRequest)
		return c.JSON(fiber.Map{
			"message": "Incorrect password.",
		})
	}

	// Create JWT Token
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.StandardClaims{
		Issuer:    requestUser.Username,
		ExpiresAt: jwt.At(jwt.Now().Add(24 * time.Hour)), // 1 day
	})

	tokenStr, err := token.SignedString([]byte(SecretKey))
	if err != nil {
		c.Status(fiber.StatusInternalServerError)
		return c.JSON(fiber.Map{
			"message": "Login error. Please try again.",
		})
	}

	// Create cookie
	cookie := fiber.Cookie{
		Name:     "jwt",
		Value:    tokenStr,
		Expires:  time.Now().Add(24 * time.Hour),
		HTTPOnly: true,
	}
	c.Cookie(&cookie)

	// return success message
	return c.JSON(fiber.Map{
		"message": "success",
	})
}

func GetUsers(c *fiber.Ctx) error {
	var users []UserInfo
	loginDb.Find(&users)
	return c.JSON(users)
}

func DeleteUser(c *fiber.Ctx) error {
	user := new(UserInfo)

	if err := c.BodyParser(user); err != nil {
		c.Status(fiber.StatusBadRequest)
		return c.JSON(fiber.Map{
			"message": "Invalid data",
		})
	}
	var checkInfo UserInfo
	resultUsername := loginDb.First(&checkInfo, "username = ?", user.Username)

	// check if the username exists
	if errors.Is(resultUsername.Error, gorm.ErrRecordNotFound) {
		c.Status(fiber.StatusBadRequest)
		return c.JSON(fiber.Map{
			"message": "This username does not exist.",
		})
	}

	// check if the passwords match
	if err := bcrypt.CompareHashAndPassword([]byte(checkInfo.Password), []byte(user.Password)); err != nil {
		c.Status(fiber.StatusBadRequest)
		return c.JSON(fiber.Map{
			"message": "Passwords do not match.",
		})
	}

	loginDb.Delete(&user, "username = ?", user.Username)

	return c.JSON(fiber.Map{
		"message": "success",
	})
}

func User(c *fiber.Ctx) error {
	// Get cookie with name jwt
	cookie := c.Cookies("jwt")

	// Authenticate user
	token, err := jwt.ParseWithClaims(cookie, &jwt.StandardClaims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(SecretKey), nil
	})

	if err != nil {
		c.Status(fiber.StatusUnauthorized)
		return c.JSON(fiber.Map{
			"message": "Unauthenticated",
		})
	}

	// Get claims from token
	claims := token.Claims.(*jwt.StandardClaims)

	// Get user info from db
	var user UserInfo
	loginDb.First(&user, "username = ?", claims.Issuer)

	// Return user info
	return c.JSON(user)
}

func Logout(c *fiber.Ctx) error {
	// Remove cookie
	cookie := fiber.Cookie{
		Name:     "jwt",
		Value:    "",
		Expires:  time.Now().Add(-time.Hour),
		HTTPOnly: true,
	}

	c.Cookie(&cookie)

	// return success message
	return c.JSON(fiber.Map{
		"message": "success",
	})
}
