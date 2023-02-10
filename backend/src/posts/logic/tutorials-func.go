package logic

import (
	"encoding/json"
	"errors"
	"fmt"
	"net/http"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

type Tutorial struct {
	Id       int    `json:"id"`
	Title    string `json:"title"`
	Location string `json:"location"`
	User     string `json:"user"`
	Time     int    `json:"time"` // frontend: would time be better as an int or string?
	Score    int    `json:"score"`
}

func PostTutorial (*http.Request r, w http.ResponseWriter)
