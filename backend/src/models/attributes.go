package models

type Attributes struct {
	Id         string `json:"id" gorm:"primaryKey"`
	SkillLevel string `json:"skillLevel"` // Beginner, Intermediate, Experienced
	Language   string `json:"language"`   // Python, C++, Go, etc.
	Technology string `json:"technology"` // .net, angular, etc.
	Style      string `json:"style"`      // text, interactive, video
}
