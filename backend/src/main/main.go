package main

import (
	"fmt"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joho/godotenv"
	"github.com/mpangas/codir/backend/src/database"
	loginRoutes "github.com/mpangas/codir/backend/src/login/routes"
	postsRoutes "github.com/mpangas/codir/backend/src/posts/routes"
)

// Command to Open Database in Terminal:
// mysql --host=codir-users.mysql.database.azure.com --user=mpangas -p
// Enter password

func main() {
	err := godotenv.Load()
	if err != nil {
		fmt.Println("Error loading .env file")
	}
	database.Connect(os.Getenv("DB_PASS"))
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
