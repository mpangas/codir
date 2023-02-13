package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/mpangas/codir/backend/src/login/routes"
	"github.com/mpangas/codir/backend/src/posts/routes"
)

// Command to Open Database in Terminal:
// mysql --host=codir-users.mysql.database.azure.com --user=mpangas -p
// Enter password

func main() {
<<<<<<< HEAD
	router := mux.NewRouter()
	routes.LoginRoutes(router)
	routes.TutorialsRoutes(router)
	// as more functionality is added, more routes will be added.
=======
	app := fiber.New()
	app.Use(cors.New(cors.Config{
		AllowOrigins:     "*",
		AllowMethods:     "GET, POST, PUT, DELETE, OPTIONS",
		AllowHeaders:     "Origin, Content-Type, Accept, Authorization",
		AllowCredentials: true,
	}))
>>>>>>> makefolders

	routes.LoginRoutes(app)

	app.Listen(":8000")
}
