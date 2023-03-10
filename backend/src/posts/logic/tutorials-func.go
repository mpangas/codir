package logic

import (
	"errors"
	"math/rand"
	"time"

	"github.com/gofiber/fiber/v2"

	"gorm.io/gorm"
)

type Tutorial struct {
	Id       int    `json:"id"` // don't pass this in
	Title    string `json:"title"`
	Location string `json:"location"`
	User     string `json:"user"`
	PostTime int64  `json:"postTime"` // don't pass this in
	EditTime int64  `json:"editTime"`
	Score    int    `json:"score"` // don't pass this in
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
	newPost.PostTime = time.Now().Unix()
	newPost.EditTime = time.Now().Unix()
	newPost.Score = 0

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

	postDb.Delete(&getTutorial)
	return c.JSON(getTutorial) // idk yet what delete shoudl return
}

func EditTutorial(c *fiber.Ctx) error {
	getId, _ := c.ParamsInt("id")
	var getTutorial Tutorial

	// find the tutorial to edit
	if errors.Is(postDb.Where("id = ?", getId).First(&getTutorial).Error, gorm.ErrRecordNotFound) {
		c.Status(fiber.StatusNotFound)
		return c.JSON(fiber.Map{
			"message": "This id does not exist",
		})
	}

	// parse the new info
	newTutorial := &Tutorial{}
	if err := c.BodyParser(newTutorial); err != nil {
		c.Status(fiber.StatusBadRequest)
		return c.JSON(fiber.Map{
			"message": "Invalid data",
		})
	}

	// we still don't want people to be able to post the same resource multiple times, but I don't want to do it yet until
	// I know i can do it without making it constantly clash
	/*var checkPost Tutorial
	checkLoc := postDb.Where("location = ?", newTutorial.Location).First(&checkPost)
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

	return c.JSON(getTutorial)
}

func VoteUp(c *fiber.Ctx) error {
	getId, _ := c.ParamsInt("id")
	var getTutorial Tutorial

	if errors.Is(postDb.Where("id = ?", getId).First(&getTutorial).Error, gorm.ErrRecordNotFound) {
		c.Status(fiber.StatusNotFound)
		return c.JSON(fiber.Map{
			"message": "This id does not exist",
		})
	}

	getTutorial.Score += 1
	return c.JSON(getTutorial)
}

func VoteDown(c *fiber.Ctx) error {
	getId, _ := c.ParamsInt("id")
	var getTutorial Tutorial

	if errors.Is(postDb.Where("id = ?", getId).First(&getTutorial).Error, gorm.ErrRecordNotFound) {
		c.Status(fiber.StatusNotFound)
		return c.JSON(fiber.Map{
			"message": "This id does not exist",
		})
	}

	getTutorial.Score -= 1
	return c.JSON(getTutorial)
}
