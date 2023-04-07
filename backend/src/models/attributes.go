package models

type Attributes struct {
	// yeah idk what attributes we want yet
	SkillLevel  string `"json:skillLevel"`  // Beginner, Intermediate, Experienced
	Language    string `"json:language"`    // Python, C++, Go, etc.
	Application string `"json:application"` // frontend, backend, ai/ml, gamedev, etc.
	Duration    string `"json:duration"`
	// these aren't the only attributes that could be and are just to
}
