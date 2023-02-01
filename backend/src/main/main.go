package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/mpangas/codir/backend/src/login/routes"
)

func main() {
	router := mux.NewRouter()
	routes.LoginRoutes(router)
	// as more functionality is added, more routes will be added.

	fmt.Println("Starting server")
	if err := http.ListenAndServe(":8000", router); err != nil {
		log.Fatal(err)
	}
}
