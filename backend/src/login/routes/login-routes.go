package routes

import (
	"github.com/gorilla/mux"
	//"login/logic"
)

func LoginRoutes(router *mux.Router) {
	router.HandleFunc("/login/signup", logic.Signup)
	router.HandleFunc("/login/signin", logic.Signin)
	//router.HandleFunc("/login/")
}
