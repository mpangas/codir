package models

type Favorite struct {
	Username   string `json:"username" gorm:"size:191"`
	TutorialID int    `gorm:"primaryKey" json:"tutorialID"`
}
