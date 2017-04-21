package controllers

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

func MainIndex(c *gin.Context) {
	c.HTML(http.StatusOK, "main/index", gin.H{
		"title": "Bookmarks Application",
	})
}
