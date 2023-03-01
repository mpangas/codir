package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"testing"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
	"github.com/mpangas/codir/backend/src/database"
	"github.com/mpangas/codir/backend/src/login/logic"
	"github.com/mpangas/codir/vendor/github.com/dgrijalva/jwt-go/v4"
	"github.com/stretchr/testify/assert"
)

type testBody struct {
	Email    string `json:"email"`
	Username string `json:"username"`
	Password string `json:"password"`
}

func TestGet(t *testing.T) {
	err := godotenv.Load()
	if err != nil {
		fmt.Println("Error loading .env file")
	}
	pass := os.Getenv("DB_PASS")
	database.Connect(pass)
	app := fiber.New()

	app.Get("/api/get", logic.GetUsers)

	req, _ := http.NewRequest(http.MethodGet, "/api/get", nil)
	resp, _ := app.Test(req, -1)

	body, _ := io.ReadAll(resp.Body)
	defer resp.Body.Close()

	t.Log(resp.StatusCode)
	t.Log(string(body))
	assert.Equal(t, 200, resp.StatusCode)
}

func TestSignup(t *testing.T) {
	err := godotenv.Load()
	if err != nil {
		fmt.Println("Error loading .env file")
	}
	pass := os.Getenv("DB_PASS")
	database.Connect(pass)
	app := fiber.New()

	// Make mock request body
	testUser := testBody{
		Email:    "test@gmail.com",
		Username: "test",
		Password: "password",
	}

	bodyReq, _ := json.Marshal(testUser)

	app.Post("/api/signup", logic.Signup)

	req, _ := http.NewRequest(http.MethodPost, "/api/signup", bytes.NewBuffer(bodyReq))
	req.Header.Set("Content-Type", "application/json")
	resp, _ := app.Test(req, -1)

	body, _ := io.ReadAll(resp.Body)
	defer resp.Body.Close()

	t.Log(resp.StatusCode)
	t.Log(string(body))
	assert.Equal(t, 200, resp.StatusCode)
}

func TestSignin(t *testing.T) {
	err := godotenv.Load()
	if err != nil {
		fmt.Println("Error loading .env file")
	}
	pass := os.Getenv("DB_PASS")
	database.Connect(pass)
	app := fiber.New()

	// Make mock request body
	testUser := testBody{
		Email:    "test@gmail.com",
		Username: "test",
		Password: "password",
	}

	bodyReq, _ := json.Marshal(testUser)

	app.Post("/api/signin", logic.Signin)

	req, _ := http.NewRequest(http.MethodPost, "/api/signin", bytes.NewBuffer(bodyReq))
	req.Header.Set("Content-Type", "application/json")
	resp, _ := app.Test(req, -1)

	body, _ := io.ReadAll(resp.Body)
	defer resp.Body.Close()

	t.Log(resp.StatusCode)
	t.Log(string(body))
	assert.Equal(t, 200, resp.StatusCode)
}

func TestDelete(t *testing.T) {
	err := godotenv.Load()
	if err != nil {
		fmt.Println("Error loading .env file")
	}
	pass := os.Getenv("DB_PASS")
	database.Connect(pass)
	app := fiber.New()

	// Make mock request body
	testUser := testBody{
		Email:    "test@gmail.com",
		Username: "test",
		Password: "password",
	}

	bodyReq, _ := json.Marshal(testUser)

	app.Delete("/api/delete", logic.DeleteUser)

	req, _ := http.NewRequest(http.MethodDelete, "/api/delete", bytes.NewBuffer(bodyReq))
	req.Header.Set("Content-Type", "application/json")
	resp, _ := app.Test(req, -1)

	body, _ := io.ReadAll(resp.Body)
	defer resp.Body.Close()

	t.Log(resp.StatusCode)
	t.Log(string(body))
	assert.Equal(t, 200, resp.StatusCode)
}

func TestAuthUser(t *testing.T) {
	err := godotenv.Load()
	if err != nil {
		fmt.Println("Error loading .env file")
	}
	pass := os.Getenv("DB_PASS")
	database.Connect(pass)
	app := fiber.New()

	testUser := testBody{
		Email:    "test@gmail.com",
		Username: "test",
		Password: "password",
	}

	// Generate cookie for checking user authentication
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.StandardClaims{
		Issuer:    testUser.Username,
		ExpiresAt: jwt.At(jwt.Now().Add(24 * time.Hour)), // 1 day
	})

	tokenStr, _ := token.SignedString([]byte("SecretKey"))

	// Create cookie
	cookie := fiber.Cookie{
		Name:     "jwt",
		Value:    tokenStr,
		Expires:  time.Now().Add(24 * time.Hour),
		HTTPOnly: true,
	}
	c.Cookie(&cookie)

	// Call user authentication request

	app.Get("/api/user", logic.User)

	req2, _ := http.NewRequest(http.MethodGet, "/api/user", nil)
	req2.Header.Set("Content-Type", "application/json")
	resp2, _ := app.Test(req2, -1)

	body, _ := io.ReadAll(resp2.Body)
	defer resp2.Body.Close()

	t.Log(resp2.StatusCode)
	t.Log(string(body))
	assert.Equal(t, 200, resp2.StatusCode)
}
