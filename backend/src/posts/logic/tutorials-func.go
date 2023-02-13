package logic

import (
	"errors"
	"math/rand"

	"github.com/gofiber/fiber/v2"

	"gorm.io/gorm"
)

type Tutorial struct {
	Id       int    `json:"id"`
	Title    string `json:"title"`
	Location string `json:"location"`
	User     string `json:"user"`
	Time     int    `json:"time"` // frontend: would time be better as an int or string?
	Score    int    `json:"score"`
}

var postDb *gorm.DB

func PostTutorial(c *fiber.Ctx) error {
	// get tutorial from request
	newPost := &Tutorial{}
	if err := c.BodyParser(newPost); err != nil {
		c.Status(fiber.StatusBadRequest)
		return c.JSON(fiber.Map{
			"message": "Invalid data",
		})
	}

	// we don't want people to be able to post the same resource multiple times.
	var checkPost Tutorial
	checkLoc := postDb.Where("location = ?", newPost.Location).First(&checkPost)
	if !errors.Is(checkLoc.Error, gorm.ErrRecordNotFound) {
		c.Status(fiber.StatusBadRequest)
		return c.JSON(fiber.Map{
			"message": "This resource is already in a post",
		})
	}

	// I haven't yet decided about post ids. In theory getting by id would be the best way for front end to access a post
	// but I don't know what the best way of doing it is.
	newId := rand.Int()
	for !errors.Is(postDb.Where("id = ?", newId).First(&checkPost).Error, gorm.ErrRecordNotFound) {
		newId = rand.Int()
	} // gets a unique id
	newPost.Id = newId

	if err := postDb.Create(newPost).Error; err != nil {
		return c.JSON(fiber.Map{
			"message": "Insert to db failed",
		})
	}

	return c.JSON(newPost)
}

func GetAllTutorials(c *fiber.Ctx) error {
	var allTutorials []Tutorial
	postDb.Find(&allTutorials)

	return c.JSON(allTutorials)
}

func GetTutorial(c *fiber.Ctx) error {
	getId, _ := c.ParamsInt("id")
	var getTutorial Tutorial
	if errors.Is(postDb.Where("id = ?", getId).First(&getTutorial).Error, gorm.ErrRecordNotFound) {
		c.Status(fiber.StatusNotFound)
		return c.JSON(fiber.Map{
			"message": "This id does not exist",
		})
	}

	return c.JSON(getTutorial)

}

func DeleteTutorial(c *fiber.Ctx) error {
	getId, _ := c.ParamsInt("id")
	var getTutorial Tutorial
	if errors.Is(postDb.Where("id = ?", getId).First(&getTutorial).Error, gorm.ErrRecordNotFound) {
		c.Status(fiber.StatusNotFound)
		return c.JSON(fiber.Map{
			"message": "This id does not exist",
		})
	}

	postDb.Delete(getTutorial)
	return c.JSON(getTutorial)
}
