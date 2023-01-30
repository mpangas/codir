package routes

import (
	"github.com/gorilla/mux"
	"github.com/mpangas/codir/backend/src/login/logic"
)

func LoginRoutes(router *mux.Router) {
	router.HandleFunc("/login/signup", logic.Signup)
	router.HandleFunc("/login/signin", logic.Signin)
}
