package routes

import (
	"github.com/gorilla/mux"
	"github.com/mpangas/codir/backend/src/login/logic"
)

func LoginRoutes(router *mux.Router) {
	router.HandleFunc("/api/get", logic.GetUsers).Methods("GET")
	router.HandleFunc("/api/user", logic.User).Methods("GET")
	router.HandleFunc("/api/signup", logic.Signup).Methods("POST")
	router.HandleFunc("/api/signin", logic.Signin).Methods("POST")
	router.HandleFunc("/api/delete", logic.DeleteUser).Methods("DELETE")
	router.HandleFunc("/api/logout", logic.Logout).Methods("POST")
}
