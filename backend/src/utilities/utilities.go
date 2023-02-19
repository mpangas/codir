package utilities

// This file doesn't do anything anymore.

import (
	"encoding/json"
	"io"
	"net/http"
)

func ReadJson(r *http.Request, x interface{}) error {
	if body, err := io.ReadAll(r.Body); err == nil {
		if err := json.Unmarshal([]byte(body), x); err != nil {
			return err
		}
	}
	return nil
}
