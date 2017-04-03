package controllers

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

func MainIndex(c *gin.Context) {
	c.HTML(http.StatusOK, "layout.tmpl", gin.H{
		"title": "Bookmarks Application",
	})
}
