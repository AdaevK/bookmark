package v1

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/contrib/sessions"
	"gopkg.in/go-playground/validator.v9"

	"bookmarks/app/engine"
	"bookmarks/app/adapter/web/forms"
)

type SessionHandler struct {
	Interactors *engine.Interactors
	Validate    *validator.Validate
}

type SessionFormParams struct {
	Session forms.SessionForm `form:"session" binding:"required"`
}

func (sh *SessionHandler)Create(c *gin.Context){
	var params SessionFormParams
	if err := c.Bind(&params); err == nil {
		sessionForm := params.Session
		sessionForm.Interactors = sh.Interactors
		sessionForm.Validate = sh.Validate
		if sessionForm.Call() {
			session := sessions.Default(c)
			session.Set("login",  "logged_in")
			session.Save()
			c.JSON(http.StatusOK, gin.H{"jwt": sessionForm.Jwt})
		} else {
			c.JSON(http.StatusUnprocessableEntity, gin.H{"errors": sessionForm.Errors})
		}
	}
}

func (sh *SessionHandler)Delete(c *gin.Context) {
	session := sessions.Default(c)
	session.Delete("login")
	session.Save()
	c.JSON(http.StatusOK, gin.H{})
}