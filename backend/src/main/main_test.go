package main

import (
	"net/http"
	"testing"

	"github.com/gofiber/fiber/v2"
	"github.com/mpangas/codir/backend/src/login/logic"
	"github.com/stretchr/testify/assert"
)

func TestGet(t *testing.T) {
	server := fiber.New()

	server.Get("/api/get", logic.GetUsers)

	req, _ := http.NewRequest(http.MethodGet, "/api/get", nil)
	resp, _ := server.Test(req, -1)

	t.Log(resp.StatusCode)
	t.Log(resp.Body)
	assert.Equal(t, 200, resp.StatusCode)
}
