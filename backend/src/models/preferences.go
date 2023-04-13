package models

type Preferences struct {
	Username     string `json:"username" gorm:"primaryKey"`
	SkillLevel   string `json:"skillLevel"`
	Languages    string `json:"languages"`
	Technologies string `json:"technologies"`
	Styles       string `json:"styles"`
}
