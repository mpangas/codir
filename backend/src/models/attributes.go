package models

type Attributes struct {
	TutID      string `json:"tutID" gorm:"primaryKey"`
	SkillLevel string `json:"skillLevel"` // Beginner, Intermediate, Experienced
	Language   string `json:"language"`   // Python, C++, Go, etc.
	Technology string `json:"technology"` // .net, angular, etc.
	Style      string `json:"style"`      // text, interactive, video
}
