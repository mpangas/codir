package models

type UserInfo struct {
	Email       string      `json:"email" gorm:"unique"`
	Username    string      `json:"username" gorm:"unique"`
	Password    string      `json:"password"`
	Favorites   []Favorite  `json:"favorites" gorm:"foreignKey:Username;references:Username"`
	Preferences Preferences `json:"preferences" gorm:"foreignKey:Username;references:Username"`
}
