package handlers

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"bookmarks/app/engine"
)

type MainHandler struct {
	engine.Controller
}

func (mh *MainHandler)Index(c *gin.Context) {
	_, ok := c.Get("login")

	if ok {
		c.Redirect(http.StatusTemporaryRedirect, "/dashboard")
	} else {
		c.HTML(http.StatusOK, "main/index", gin.H{
			"title": "Bookmarks Application",
		})
	}
}
