package logic

import (
	"errors"
	"math/rand"
	"net/url"
	"sort"
	"strconv"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/mpangas/codir/backend/src/database"
	"github.com/mpangas/codir/backend/src/models"

	"gorm.io/gorm"
)

func PostTutorial(c *fiber.Ctx) error {
	// get tutorial from request
	newPost := new(models.Tutorial)
	if err := c.BodyParser(newPost); err != nil {
		c.Status(fiber.StatusBadRequest)
		return c.JSON(fiber.Map{
			"message": "Invalid data",
		})
	}

	// we don't want people to be able to post the same resource multiple times.
	var checkPost models.Tutorial
	checkLoc := database.DB.Where("location = ?", newPost.Location).First(&checkPost)
	if !errors.Is(checkLoc.Error, gorm.ErrRecordNotFound) {
		c.Status(fiber.StatusBadRequest)
		return c.JSON(fiber.Map{
			"message": "This resource is already in a post",
		})
	}

	// I haven't yet decided about post ids. In theory getting by id would be the best way for front end to access a post
	// but I don't know what the best way of doing it is.
	r := rand.New(rand.NewSource(time.Now().UnixNano()))
	newId := r.Int()
	for !errors.Is(database.DB.Where("id = ?", newId).First(&checkPost).Error, gorm.ErrRecordNotFound) {
		newId = rand.Int()
	} // gets a unique id
	newPost.Id = strconv.Itoa(newId)
	newPost.PostTime = time.Now().Unix()
	newPost.EditTime = time.Now().Unix()
	newPost.Score = 0

	if err := database.DB.Create(newPost).Error; err != nil {
		return c.JSON(fiber.Map{
			"message": "Insert to db failed",
		})
	}

	return c.JSON(newPost)
}

func GetAllTutorials(c *fiber.Ctx) error {
	var allTutorials []models.Tutorial
	database.DB.Find(&allTutorials)

	return c.JSON(allTutorials)
}

func GetTutorial(c *fiber.Ctx) error {
	getId := c.Params("id")
	var getTutorial models.Tutorial
	if errors.Is(database.DB.Where("id = ?", getId).First(&getTutorial).Error, gorm.ErrRecordNotFound) {
		c.Status(fiber.StatusNotFound)
		return c.JSON(fiber.Map{
			"message": "This id does not exist",
		})
	}

	return c.JSON(getTutorial)

}

func DeleteTutorial(c *fiber.Ctx) error {
	getId := c.Params("id")
	var getTutorial models.Tutorial
	if errors.Is(database.DB.Where("id = ?", getId).First(&getTutorial).Error, gorm.ErrRecordNotFound) {
		c.Status(fiber.StatusNotFound)
		return c.JSON(fiber.Map{
			"message": "This id does not exist",
		})
	}

	database.DB.Delete(&getTutorial)
	return c.JSON(getTutorial) // idk yet what delete shoudl return
}

func EditTutorial(c *fiber.Ctx) error {
	getId := c.Params("id")
	var getTutorial models.Tutorial

	// find the tutorial to edit
	if errors.Is(database.DB.Where("id = ?", getId).First(&getTutorial).Error, gorm.ErrRecordNotFound) {
		c.Status(fiber.StatusNotFound)
		return c.JSON(fiber.Map{
			"message": "This id does not exist",
		})
	}

	// parse the new info
	newTutorial := new(models.Tutorial)
	if err := c.BodyParser(newTutorial); err != nil {
		c.Status(fiber.StatusBadRequest)
		return c.JSON(fiber.Map{
			"message": "Invalid data",
		})
	}

	// we still don't want people to be able to post the same resource multiple times, but I don't want to do it yet until
	// I know i can do it without making it constantly clash
	/*var checkPost Tutorial
	checkLoc := database.DB.Where("location = ?", newTutorial.Location).First(&checkPost)
	if !errors.Is(checkLoc.Error, gorm.ErrRecordNotFound) {
		c.Status(fiber.StatusBadRequest)
		return c.JSON(fiber.Map{
			"message": "This resource is already in a post",
		})
	}*/

	getTutorial.Title = newTutorial.Title
	getTutorial.Location = newTutorial.Location
	getTutorial.EditTime = time.Now().Unix()
	// these are all that a PUT request should be able to change. User, id, score, post time are the same
	database.DB.Save(&getTutorial)

	return c.JSON(getTutorial)
}

func VoteUp(c *fiber.Ctx) error {
	getId := c.Params("id")
	var getTutorial models.Tutorial

	if errors.Is(database.DB.Where("id = ?", getId).First(&getTutorial).Error, gorm.ErrRecordNotFound) {
		c.Status(fiber.StatusNotFound)
		return c.JSON(fiber.Map{
			"message": "This id does not exist",
		})
	}

	getTutorial.Score += 1
	database.DB.Save(&getTutorial)
	return c.JSON(getTutorial)
}

func VoteDown(c *fiber.Ctx) error {
	getId := c.Params("id")
	var getTutorial models.Tutorial

	if errors.Is(database.DB.Where("id = ?", getId).First(&getTutorial).Error, gorm.ErrRecordNotFound) {
		c.Status(fiber.StatusNotFound)
		return c.JSON(fiber.Map{
			"message": "This id does not exist",
		})
	}

	getTutorial.Score -= 1
	database.DB.Save(&getTutorial)
	return c.JSON(getTutorial)
}

func Search(c *fiber.Ctx) error {
	getQuery, _ := url.QueryUnescape(c.Params("query"))
	getQuery = "%" + getQuery + "%"

	var searchResults []models.Tutorial
	if errors.Is(database.DB.Where("title LIKE ?", getQuery).Find(&searchResults).Error, gorm.ErrRecordNotFound) {
		c.Status(fiber.StatusNotFound)
		return c.JSON(fiber.Map{
			"message": "No results",
		})
	}
	sort.Slice(searchResults, func(i, j int) bool { return searchResults[i].Score > searchResults[j].Score })

	return c.JSON(searchResults)
}

func Recommend(c *fiber.Ctx) error {

}
