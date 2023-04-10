package models

type Attributes struct {
	// yeah idk what attributes we want yet
	SkillLevel string `"json:skillLevel"` // Beginner, Intermediate, Experienced
	Language   string `"json:language"`   // Python, C++, Go, etc.
	Technology string `"json:technology"` // .net, angular, etc.
	Style      string `"json:style"`      // text, interactive, video
}
