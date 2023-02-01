package routes

import (
	"github.com/gorilla/mux"
	"github.com/mpangas/codir/backend/src/login/logic"
)

func LoginRoutes(router *mux.Router) {
	router.HandleFunc("/getusers", logic.GetUsers).Methods("GET")
	router.HandleFunc("/login/signup", logic.Signup).Methods("POST")
	router.HandleFunc("/login/signin", logic.Signin).Methods("GET")
}
