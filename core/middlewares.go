package core

import (
	"database/sql"
	"github.com/gin-gonic/gin"
	"gopkg.in/go-playground/validator.v9"
)

func setDatabase(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Set("DB", db)
	}
}

func setValidator(v *validator.Validate) gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Set("Validator", v)
	}
}
