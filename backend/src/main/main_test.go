package main

import (
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"testing"

	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
	"github.com/mpangas/codir/backend/src/database"
	"github.com/mpangas/codir/backend/src/login/logic"
	"github.com/stretchr/testify/assert"
)

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

	body, _ := ioutil.ReadAll(resp.Body)
	defer resp.Body.Close()

	t.Log(resp.StatusCode)
	t.Log(string(body))
	assert.Equal(t, 200, resp.StatusCode)
}
