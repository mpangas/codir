package routes

import (
	"github.com/gorilla/mux"
	"github.com/mpangas/codir/backend/src/login/logic"
)

func LoginRoutes(router *mux.Router) {
	router.HandleFunc("/users", logic.GetUsers).Methods("GET")
	router.HandleFunc("/signup", logic.Signup).Methods("POST")
	router.HandleFunc("/signin", logic.Signin).Methods("GET")
}
