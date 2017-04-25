package core

import (
	"database/sql"
	"github.com/gin-gonic/gin"
)

func setDatabase(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Set("DB", db)
	}
}
