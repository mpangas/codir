package logic

import (
	"fmt"
	"os"
	"testing"

	_ "github.com/go-sql-driver/mysql"
	"github.com/gofiber/fiber/v2"

	"github.com/joho/godotenv"
	"github.com/mpangas/codir/backend/src/database"
	"github.com/mpangas/codir/backend/src/models"
)

func TestCreateUser(t *testing.T) {
	err := godotenv.Load()
	if err != nil {
		fmt.Println("Error loading .env file")
	}
	pass := os.Getenv("DB_PASS")
	database.Connect(pass)

	// TODO: Create a new user in the database using your SignUp function
	testUser := models.UserInfo{
		Email:    "test1@gmail.com",
		Username: "test1",
		Password: "password1",
	}

	c := new(fiber.Ctx)
	c.Locals("user", "test")
	fmt.Println("ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ")
	c.Request().Header.SetContentType(fiber.MIMEApplicationJSON)
	c.Request().SetBodyString(fmt.Sprintf(`{"email": "%s", "username": "%s", "password": "%s"}`, testUser.Email, testUser.Username, testUser.Password))
	fmt.Println("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAaa")
	if err := Signup(c); err != nil {
		t.Fatalf("Error creating user: %v", err)
	}
	fmt.Println("User created successfully")
}

// func TestUpdateUser(t *testing.T) {
// 	db, err := sql.Open("mysql", "user:password@/database")
// 	if err != nil {
// 		t.Fatalf("error opening database: %v", err)
// 	}
// 	defer db.Close()

// 	// TODO: Create a new user in the database using your CreateUser function

// 	// TODO: Update the user's information using your UpdateUser function

// 	// TODO: Retrieve the updated user from the database and verify that it was updated correctly
// }

// func TestDeleteUser(t *testing.T) {
// 	db, err := sql.Open("mysql", "user:password@/database")
// 	if err != nil {
// 		t.Fatalf("error opening database: %v", err)
// 	}
// 	defer db.Close()

// 	// TODO: Create a new user in the database using your CreateUser function

// 	// TODO: Delete the user from the database using your DeleteUser function

// 	// TODO: Try to retrieve the deleted user from the database and verify that it does not exist
// }

// func TestSignup(t *testing.T) {
// 	type args struct {
// 		c *fiber.Ctx
// 	}
// 	tests := []struct {
// 		name    string
// 		email   string
// 		user    string
// 		pass    string
// 		args    args
// 		wantErr bool
// 	}{
// 		{
// 			name: "Test Signup",
// 			args: args{
// 				c: &fiber.Ctx{},
// 			},
// 			wantErr: false,
// 		},
// 	}

// 	for _, tt := range tests {
// 		t.Run(tt.name, func(t *testing.T) {
// 			user := models.UserInfo{
// 				Email:    tt.email,
// 				Username: tt.user,
// 				Password: tt.pass,
// 			}
// 			tt.args.c.Locals("user", user)
// 			if err := Signup(tt.args.c); (err != nil) != tt.wantErr {
// 				t.Errorf("Signup() error = %v, wantErr %v", err, tt.wantErr)
// 			}
// 		})
// 	}
// }
