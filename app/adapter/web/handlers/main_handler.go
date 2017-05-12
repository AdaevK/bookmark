package handlers

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"github.com/gin-gonic/contrib/sessions"
)

type MainHandler struct {}

func (mh *MainHandler)Index(c *gin.Context) {
	session := sessions.Default(c)
	value := session.Get("login")

	if value != nil && value.(string) == "logged_in" {
		c.Redirect(http.StatusTemporaryRedirect, "/dashboard")
	} else {
		c.HTML(http.StatusOK, "main/index", gin.H{
			"title": "Bookmarks Application",
		})
	}
}
