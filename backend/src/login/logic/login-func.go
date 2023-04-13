package logic

import (
	"errors"
	"log"
	"time"

	"github.com/dgrijalva/jwt-go/v4"
	"github.com/gofiber/fiber/v2"
	"github.com/mpangas/codir/backend/src/database"
	"github.com/mpangas/codir/backend/src/models"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

const SecretKey = "secret"

func Signup(c *fiber.Ctx) error {
	// Initialize empty user
	newUser := new(models.UserInfo)

	// Read the body into the new User object
	if err := c.BodyParser(newUser); err != nil {
		c.Status(fiber.StatusBadRequest)
		return c.JSON(fiber.Map{
			"message": "Invalid data",
		})
	}

	// Initialize empty favorites array
	newUser.Favorites = []models.Favorite{}

	// Hash password
	hashPwd, _ := bcrypt.GenerateFromPassword([]byte(newUser.Password), 10)
	newUser.Password = string(hashPwd)

	// prevent duplicate usernames
	var checkInfo models.UserInfo
	resultUsername := database.DB.Where("username = ?", newUser.Username).First(&checkInfo)
	if !errors.Is(resultUsername.Error, gorm.ErrRecordNotFound) {
		c.Status(fiber.StatusBadRequest)
		return c.JSON(fiber.Map{
			"message": "This username is already in use",
		})
	}

	// prevent duplicate emails
	resultEmail := database.DB.Where("email = ?", newUser.Email).First(&checkInfo)
	if !errors.Is(resultEmail.Error, gorm.ErrRecordNotFound) {
		c.Status(fiber.StatusBadRequest)
		return c.JSON(fiber.Map{
			"message": "This email is already in use",
		})
	}

	// Add user to DB and check for errors
	if err := database.DB.Create(&newUser).Error; err != nil {
		log.Fatalln(err)
	}

	return c.JSON(newUser)
}

func Signin(c *fiber.Ctx) error {
	// turn json in request into info
	requestUser := new(models.UserInfo)
	if err := c.BodyParser(requestUser); err != nil {
		c.Status(fiber.StatusBadRequest)
		return c.JSON(fiber.Map{
			"message": "Invalid data",
		})
	}

	// get user info with that username from the db
	var checkInfo models.UserInfo
	resultUsername := database.DB.First(&checkInfo, "username = ?", requestUser.Username)

	// check if the username exists
	if errors.Is(resultUsername.Error, gorm.ErrRecordNotFound) {
		c.Status(fiber.StatusBadRequest)
		return c.JSON(fiber.Map{
			"message": "This username does not exist.",
		})
	}

	// check if the passwords match
	if err := bcrypt.CompareHashAndPassword([]byte(checkInfo.Password), []byte(requestUser.Password)); err != nil {
		c.Status(fiber.StatusBadRequest)
		return c.JSON(fiber.Map{
			"message": "Incorrect password.",
		})
	}

	// Create JWT Token
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.StandardClaims{
		Issuer:    requestUser.Username,
		ExpiresAt: jwt.At(jwt.Now().Add(24 * time.Hour)), // 1 day
	})

	tokenStr, err := token.SignedString([]byte(SecretKey))
	if err != nil {
		c.Status(fiber.StatusInternalServerError)
		return c.JSON(fiber.Map{
			"message": "Login error. Please try again.",
		})
	}

	// Create cookie
	cookie := fiber.Cookie{
		Name:     "jwt",
		Value:    tokenStr,
		Expires:  time.Now().Add(24 * time.Hour),
		HTTPOnly: true,
	}
	c.Cookie(&cookie)

	// return success message
	return c.JSON(fiber.Map{
		"message": "success",
	})
}

func GetUsers(c *fiber.Ctx) error {
	var users []models.UserInfo
	database.DB.Find(&users)
	return c.JSON(users)
}

func DeleteUser(c *fiber.Ctx) error {
	user := new(models.UserInfo)

	if err := c.BodyParser(user); err != nil {
		c.Status(fiber.StatusBadRequest)
		return c.JSON(fiber.Map{
			"message": "Invalid data",
		})
	}

	var checkInfo models.UserInfo
	resultUsername := database.DB.First(&checkInfo, "username = ?", user.Username)

	// check if the username exists
	if errors.Is(resultUsername.Error, gorm.ErrRecordNotFound) {
		c.Status(fiber.StatusBadRequest)
		return c.JSON(fiber.Map{
			"message": "This username does not exist.",
		})
	}

	// check if the passwords match
	if err := bcrypt.CompareHashAndPassword([]byte(checkInfo.Password), []byte(user.Password)); err != nil {
		c.Status(fiber.StatusBadRequest)
		return c.JSON(fiber.Map{
			"message": "Passwords do not match.",
		})
	}

	database.DB.Delete(&user, "username = ?", user.Username)

	return c.JSON(fiber.Map{
		"message": "success",
	})
}

func User(c *fiber.Ctx) error {
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

	// Return user info
	return c.JSON(user)
}

func Logout(c *fiber.Ctx) error {
	// Remove cookie
	cookie := fiber.Cookie{
		Name:     "jwt",
		Value:    "",
		Expires:  time.Now().Add(-time.Hour),
		HTTPOnly: true,
	}

	c.Cookie(&cookie)

	// return success message
	return c.JSON(fiber.Map{
		"message": "success",
	})
}

// Favorites Functions

/*
* GET USER FAVORITES
*
* @param No Request Body
*
* @return Returns an array of Favorite objects that associate with current user
*
  - Each Favorite Object is formatted as follows:
  - {
    "username": [String]
    "tutorialID": [String]
  - }

*
* You should only need the tutorialID to then fetch the associated Tutorial object
*
*/
func GetFavorites(c *fiber.Ctx) error {
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

	// Get Favorites
	var favorites []models.Favorite
	// username := c.Params("username")
	// database.DB.First(&user, "username = ?", username)
	database.DB.Model(&user).Association("Favorites").Find(&favorites)
	return c.JSON(favorites)
}

/*
 * ADD FAVORITE
 *
 * @param Must be provided a singular field called "tutorialID" in the request body
 * NOTE: The ID must be a string
 *
 * @return Returns a message indiciating if the request was successful or not
 *
 */
func AddFavorite(c *fiber.Ctx) error {
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

	// Create Favorite object that holds new Favorite addition
	favorite := new(models.Favorite)

	// Get favorite ID from request
	if err := c.BodyParser(favorite); err != nil {
		c.Status(fiber.StatusBadRequest)
		return c.JSON(fiber.Map{
			"message": "Invalid data",
		})
	}

	// Add favorite to user favorites
	database.DB.Model(&user).Association("Favorites").Append(favorite)

	return c.JSON(fiber.Map{
		"message": "success",
	})
}

/*
 * REMOVE FAVORITE
 *
 * @param Must be provided a singular field called "tutorialID" in the request body
 * NOTE: The ID must be a string
 *
 * @return Returns a message indiciating if the request was successful or not
 *
 */
func RemoveFavorite(c *fiber.Ctx) error {
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

	// Create Favorite object that holds Favorite to remove
	favoriteToRemove := new(models.Favorite)

	// Get favorite ID from request
	if err := c.BodyParser(favoriteToRemove); err != nil {
		c.Status(fiber.StatusBadRequest)
		return c.JSON(fiber.Map{
			"message": "Invalid data",
		})
	}

	// Find and remove favorite from user favorites
	database.DB.Model(&user).Association("Favorites").Delete(favoriteToRemove)

	return c.JSON(fiber.Map{
		"message": "success",
	})
}

/*
 * CHECK FAVORITE
 *
 * @param ID Passed in as a parameter in the URL
 *
 * @return Returns a boolean value indicating if the tutorial is a favorite of the user or not
 *
 */

func CheckFavorite(c *fiber.Ctx) error {
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

	// Get ID from URL
	id := c.Params("id")

	// Check if favorite exists
	var favorite models.Favorite
	database.DB.Model(&user).Association("Favorites").Find(&favorite, "tutorial_id = ?", id)

	// Return boolean value
	if favorite.TutorialID == id {
		return c.JSON(fiber.Map{
			"isFavorite": true,
		})
	} else {
		return c.JSON(fiber.Map{
			"isFavorite": false,
		})
	}
}
