package v1

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/contrib/sessions"

	"bookmarks/app/engine"
	"bookmarks/app/usecases"
)

type SessionHandler struct {
	Interactors *engine.Interactors
}

type SessionFormParams struct {
	Session usecases.Session `json:"session" binding:"required"`
}

func (sh *SessionHandler)Create(c *gin.Context){
	var params SessionFormParams
	if err := c.BindJSON(&params); err == nil {
		jwt, ok := sh.Interactors.SessionInteractor.Authenticate(&params.Session)
		if ok {
			session := sessions.Default(c)
			session.Set("login",  "logged_in")
			session.Save()
			c.JSON(http.StatusOK, gin.H{"jwt": jwt})
		} else {
			c.JSON(http.StatusUnprocessableEntity, gin.H{"errors": params.Session.Errors})
		}
	}
}

func (sh *SessionHandler)Delete(c *gin.Context) {
	session := sessions.Default(c)
	session.Delete("login")
	session.Save()
	c.JSON(http.StatusOK, gin.H{})
}