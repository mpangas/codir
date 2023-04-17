package logic

import (
	"errors"
	"math/rand"
	"net/url"
	"sort"
	"strconv"
	"strings"
	"time"

	"github.com/dgrijalva/jwt-go/v4"
	"github.com/gofiber/fiber/v2"
	"github.com/mpangas/codir/backend/src/database"
	"github.com/mpangas/codir/backend/src/models"

	"gorm.io/gorm"
)

const SecretKey = "secret"

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
	//newPost.Attributes.TutId = newPost.Id
	newPost.PostTime = time.Now().Unix()
	newPost.EditTime = time.Now().Unix()
	newPost.Score = 0

	print(newPost.Attributes.Language)

	//newTags := models.Attributes{TutID: newPost.Id}
	//newPost.Attributes = newTags

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
	var recommendations []models.Tutorial

	// thinking about making another model like attributes but with structs, because right now everyone can only have one preference.

	// Get the user info:
	// Get cookie with name jwt
	cookie := c.Cookies("jwt")

	// Authenticate user
	token, err := jwt.ParseWithClaims(cookie, &jwt.StandardClaims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(SecretKey), nil
	})

	if err != nil {
		c.Status(fiber.StatusUnauthorized)
		return c.JSON(fiber.Map{
			"message": "Unauthenticated",
		})
	}

	// Get claims from token
	claims := token.Claims.(*jwt.StandardClaims)

	// Get user info from db
	var user models.UserInfo
	database.DB.First(&user, "username = ?", claims.Issuer)

	// get the preferences and prepare them to be a query
	var thisSearch []models.Attributes
	var fullSearch []models.Attributes
	querySlice := []string{user.Preferences.Technologies, user.Preferences.Languages, user.Preferences.SkillLevel, user.Preferences.Styles}
	attNames := []string{"technology", "language", "skill_level", "style"}
	for i, str := range querySlice {
		querySlice[i] = "(" + attNames[i] + " = \"" + strings.ReplaceAll(str, ",", "\" OR "+attNames[i]+" = \"") + "\")"
	}

	//sketchy algorithm
	// SELECT * from ??? WHERE (technology = "a" OR technology = "b") AND (language = "a") etc...
	for len(recommendations) < 5 && len(querySlice) > 0 {
		query := "SELECT * FROM attributes WHERE " + strings.Join(querySlice, " AND ")
		//database.DB.Where(query).Find(&thisSearch)
		database.DB.Raw(query).Scan(&thisSearch)
		// get the
		fullSearch = append(fullSearch, thisSearch...)
		querySlice = querySlice[:len(querySlice)-1]
	}

	// remove all duplicates and get ids
	searchIds := make(map[string]bool)
	for _, attr := range fullSearch {
		searchIds[attr.TutID] = true
	}

	// search for associated tutorials
	for id := range searchIds {
		var getTutorial models.Tutorial
		database.DB.Where("id = ?", id).First(&getTutorial)
		recommendations = append(recommendations, getTutorial)
	}

	sort.Slice(recommendations, func(i, j int) bool { return recommendations[i].Score > recommendations[j].Score })
	if len(recommendations) > 5 {
		recommendations = recommendations[0:4]
	}

	return c.JSON(recommendations)
}
