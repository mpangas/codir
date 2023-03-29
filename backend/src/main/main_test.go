package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"testing"

	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
	"github.com/mpangas/codir/backend/src/database"
	"github.com/mpangas/codir/backend/src/login/logic"
	posts "github.com/mpangas/codir/backend/src/posts/logic"
	"github.com/stretchr/testify/assert"
)

type testBody struct {
	Email    string `json:"email"`
	Username string `json:"username"`
	Password string `json:"password"`
}

type testTutPost struct {
	Title    string `json:"title"`
	Location string `json:"location"`
	User     string `json:"user"`
}

type testTutPut struct {
	Title    string `json:"title"`
	Location string `json:"location"`
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

func TestTutorialPost(t *testing.T) {
	err := godotenv.Load()
	if err != nil {
		fmt.Println("Error loading .env file")
	}
	pass := os.Getenv("DB_PASS")
	database.Connect(pass)
	app := fiber.New()

	testTutorial := testTutPost{
		Title:    "D&D 5e Wikin",
		Location: "http://dnd5e.wikidot.co/",
		User:     "shockedcurve45",
	}

	bodyReq, _ := json.Marshal(testTutorial)

	app.Post("/api/tutorials", posts.PostTutorial)

	req, _ := http.NewRequest(http.MethodPost, "/api/tutorials", bytes.NewBuffer(bodyReq))
	req.Header.Set("Content-Type", "application/json")
	resp, _ := app.Test(req, -1)

	body, _ := io.ReadAll(resp.Body)
	defer resp.Body.Close()

	t.Log(resp.StatusCode)
	t.Log(string(body))
	assert.Equal(t, 200, resp.StatusCode)
}

func TestTutorialGetAll(t *testing.T) {
	err := godotenv.Load()
	if err != nil {
		fmt.Println("Error loading .env file")
	}
	pass := os.Getenv("DB_PASS")
	database.Connect(pass)
	app := fiber.New()

	app.Get("/api/tutorials", posts.GetAllTutorials)

	req, _ := http.NewRequest(http.MethodGet, "/api/tutorials", nil)
	resp, _ := app.Test(req, -1)

	body, _ := io.ReadAll(resp.Body)
	defer resp.Body.Close()

	t.Log(resp.StatusCode)
	t.Log(string(body))
	assert.Equal(t, 200, resp.StatusCode)
}

func TestTutorialGet(t *testing.T) {
	err := godotenv.Load()
	if err != nil {
		fmt.Println("Error loading .env file")
	}
	pass := os.Getenv("DB_PASS")
	database.Connect(pass)
	app := fiber.New()

	app.Get("/api/tutorials/id::id", posts.GetTutorial)

	req, _ := http.NewRequest(http.MethodGet, "/api/tutorials/id:3711332506574543570", nil) // will not return the unit test post above.
	resp, _ := app.Test(req, -1)

	body, _ := io.ReadAll(resp.Body)
	defer resp.Body.Close()

	t.Log(resp.StatusCode)
	t.Log(string(body))
	assert.Equal(t, 200, resp.StatusCode)
}

func TestTutorialDelete(t *testing.T) {
	err := godotenv.Load()
	if err != nil {
		fmt.Println("Error loading .env file")
	}
	pass := os.Getenv("DB_PASS")
	database.Connect(pass)
	app := fiber.New()

	app.Delete("/api/tutorials/id::id", posts.DeleteTutorial)

	req, _ := http.NewRequest(http.MethodDelete, "/api/tutorials/id:5310491797653664514", nil) // will not return the unit test post above.
	resp, _ := app.Test(req, -1)

	body, _ := io.ReadAll(resp.Body)
	defer resp.Body.Close()

	t.Log(resp.StatusCode)
	t.Log(string(body))
	assert.Equal(t, 200, resp.StatusCode)
}

func TestTutorialPut(t *testing.T) {
	err := godotenv.Load()
	if err != nil {
		fmt.Println("Error loading .env file")
	}
	pass := os.Getenv("DB_PASS")
	database.Connect(pass)
	app := fiber.New()

	testTutorial := testTutPut{
		Title:    "Edited post name",
		Location: "http://dnd5e.wikidot.com/",
	}

	bodyReq, _ := json.Marshal(testTutorial)

	app.Put("/api/tutorials/id::id", posts.EditTutorial)

	req, _ := http.NewRequest(http.MethodPut, "/api/tutorials/id:3711332506574543570", bytes.NewBuffer(bodyReq))
	req.Header.Set("Content-Type", "application/json")
	resp, _ := app.Test(req, -1)

	body, _ := io.ReadAll(resp.Body)
	defer resp.Body.Close()

	t.Log(resp.StatusCode)
	t.Log(string(body))
	assert.Equal(t, 200, resp.StatusCode)
}

func TestTutorialUpvote(t *testing.T) {
	err := godotenv.Load()
	if err != nil {
		fmt.Println("Error loading .env file")
	}
	pass := os.Getenv("DB_PASS")
	database.Connect(pass)
	app := fiber.New()

	app.Put("/api/tutorials/id::id", posts.VoteUp)

	req, _ := http.NewRequest(http.MethodPut, "/api/tutorials/id:3711332506574543570", nil) // will not return the unit test post above.
	resp, _ := app.Test(req, -1)

	body, _ := io.ReadAll(resp.Body)
	defer resp.Body.Close()

	t.Log(resp.StatusCode)
	t.Log(string(body))
	assert.Equal(t, 200, resp.StatusCode)
}

func TestTutorialDownvote(t *testing.T) {
	err := godotenv.Load()
	if err != nil {
		fmt.Println("Error loading .env file")
	}
	pass := os.Getenv("DB_PASS")
	database.Connect(pass)
	app := fiber.New()

	app.Put("/api/tutorials/id::id", posts.VoteUp)

	req, _ := http.NewRequest(http.MethodPut, "/api/tutorials/id:3711332506574543570", nil) // will not return the unit test post above.
	resp, _ := app.Test(req, -1)

	body, _ := io.ReadAll(resp.Body)
	defer resp.Body.Close()

	t.Log(resp.StatusCode)
	t.Log(string(body))
	assert.Equal(t, 200, resp.StatusCode)
}
