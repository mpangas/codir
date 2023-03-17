package routes

import (
	"github.com/gofiber/fiber/v2"
	"github.com/mpangas/codir/backend/src/login/logic"
)

func LoginRoutes(app *fiber.App) {
	app.Get("/api/get", logic.GetUsers)
	app.Get("/api/user", logic.User)
	app.Post("/api/signup", logic.Signup)
	app.Post("/api/signin", logic.Signin)
	app.Delete("/api/delete", logic.DeleteUser)
	app.Post("/api/logout", logic.Logout)

	// Favorites Routes
	app.Get("/api/favorites", logic.GetFavorites)
	app.Post("/api/favorites/add", logic.AddFavorite)
	app.Delete("/api/favorites/remove", logic.RemoveFavorite)
}
