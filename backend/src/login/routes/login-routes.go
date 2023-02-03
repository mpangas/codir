package routes

import (
	"github.com/gorilla/mux"
	"github.com/mpangas/codir/backend/src/login/logic"
)

func LoginRoutes(router *mux.Router) {
	router.HandleFunc("/user", logic.GetUsers).Methods("GET")
	router.HandleFunc("/user/signup", logic.Signup).Methods("POST")
	router.HandleFunc("/user/signin", logic.Signin).Methods("GET")
	router.HandleFunc("/user", logic.DeleteUser).Methods("DELETE")
}
