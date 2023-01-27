package routes

import (
	"github.com/gorilla/mux"
	//"github.com/mpangas/codir/backend/src/login/logic" //need to do import path
)

func LoginRoutes(router *mux.Router) {
	router.HandleFunc("/login/signup", logic.Signup)
	router.HandleFunc("/login/signin", logic.Signin)
}
