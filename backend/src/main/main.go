package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/mpangas/codir/backend/src/login/routes"
)

// Command to Open Database in Terminal:
// mysql --host=codir-users.mysql.database.azure.com --user=mpangas -p
// Enter password

func main() {
	router := mux.NewRouter()
	routes.LoginRoutes(router)
	// as more functionality is added, more routes will be added.

	// Middleware for CORS
	router.Use(mux.CORSMethodMiddleware(router))

	fmt.Println("Starting server")
	if err := http.ListenAndServe(":8000", router); err != nil {
		log.Fatal(err)
	}
}
