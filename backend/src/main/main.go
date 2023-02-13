package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	loginRoutes "github.com/mpangas/codir/backend/src/login/routes"
	postsRoutes "github.com/mpangas/codir/backend/src/posts/routes"
	// yeah I blew this but I don't want to go back and fix it all while we're on different branches
)

// Command to Open Database in Terminal:
// mysql --host=codir-users.mysql.database.azure.com --user=mpangas -p
// Enter password

func main() {
	app := fiber.New()
	app.Use(cors.New(cors.Config{
		AllowOrigins:     "*",
		AllowMethods:     "GET, POST, PUT, DELETE, OPTIONS",
		AllowHeaders:     "Origin, Content-Type, Accept, Authorization",
		AllowCredentials: true,
	}))

	loginRoutes.LoginRoutes(app)
	postsRoutes.TutorialsRoutes(app)

	app.Listen(":8000")
}
