package main

import (
	"fmt"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joho/godotenv"
	"github.com/mpangas/codir/backend/src/login/logic"
  postsRoutes "github.com/mpangas/codir/backend/src/posts/routes"
	loginRoutes "github.com/mpangas/codir/backend/src/login/routes"
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

	err := godotenv.Load()
	if err != nil {
		fmt.Println("Error loading .env file")
	}

	logic.OpenDB(os.Getenv("DB_PASS"))
	loginRoutes.LoginRoutes(app)
  postsRoutes.TutorialsRoutes(app)

	app.Listen(":8000")
}
