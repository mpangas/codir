package logic

import (
	"net/http"

	"github.com/mpangas/codir/backend/src/utilities"
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

var postDb *gorm.DB

func PostTutorial(r *http.Request, w http.ResponseWriter) {
	newPost := &Tutorial{}
	if err := utilities.ReadJson(r, newPost); err != nil {
		http.Error(w, "Malformed request", 400)
	}

	// not done
}
