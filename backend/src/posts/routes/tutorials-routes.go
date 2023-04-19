package routes

/*
Struct members for posts:
- Title
- Type (Video, web resource, physical resource, etc.)
- Location (URL, etc.)
- Posting user
- Post time
- Score
- There should also be a post ID for each post, randomly or sequentially generated
(like Youtube or Reddit)

Possible routes:
CRUD
(prevent duplicate posts)
Increment score +1, -1
*/

import (
	"github.com/gofiber/fiber/v2"
	"github.com/mpangas/codir/backend/src/posts/logic"
)

func TutorialsRoutes(app *fiber.App) {
	app.Get("/api/tutorials", logic.GetAllTutorials)
	app.Get("/api/tutorials/id::id", logic.GetTutorial)
	app.Post("/api/tutorials", logic.PostTutorial)
	app.Put("/api/tutorials/id::id", logic.EditTutorial)
	app.Delete("/api/tutorials/id::id", logic.DeleteTutorial)

	app.Put("/api/tutorials/id::id/up", logic.VoteUp)
	app.Put("/api/tutorials/id::id/down", logic.VoteDown)

	app.Get("/api/tutorials/search::query", logic.Search)
	app.Get("/api/tutorials/recommend", logic.Recommend)

	// Routes for attributes.
	app.Get("/api/tutorials/attributes", logic.GetAllAttributes)
	app.Get("/api/tutorials/attributes/id::id", logic.GetAttributes)
	app.Put("/api/tutorials/attributes/id::id", logic.EditAttributes)
}
