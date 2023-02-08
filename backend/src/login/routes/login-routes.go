package routes

import (
	"github.com/gorilla/mux"
	"github.com/mpangas/codir/backend/src/login/logic"
)

func LoginRoutes(router *mux.Router) {
	router.HandleFunc("/users", logic.GetUsers).Methods("GET")
	router.HandleFunc("/user", logic.User).Methods("GET")
	router.HandleFunc("/user/signup", logic.Signup).Methods("POST")
	router.HandleFunc("/user/signin", logic.Signin).Methods("POST")
	router.HandleFunc("/user/delete", logic.DeleteUser).Methods("DELETE")
}
