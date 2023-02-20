package database

import (
	"fmt"

	"github.com/mpangas/codir/backend/src/models"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Connect(password string) {
	connection, err := gorm.Open(mysql.Open("mpangas:"+password+"@tcp(codir-users.mysql.database.azure.com:3306)/codir_users?charset=utf8mb4&parseTime=True&loc=Local"), &gorm.Config{})

	if err != nil {
		fmt.Println("Database did not open: ", err)
		return
	}

	DB = connection

	DB.AutoMigrate(&models.UserInfo{})
	DB.AutoMigrate(&models.Tutorial{})
}
