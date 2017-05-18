package v1

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"bookmarks/app/engine"
	"bookmarks/app/usecases"
)

type RegistrationsHandler struct {
	Interactors *engine.Interactors
}

type RegistrationParams struct {
	User usecases.User `json:"user" binding:"required"`
}

func (rh *RegistrationsHandler)Create(c *gin.Context){
	var params RegistrationParams
	if err := c.BindJSON(&params); err == nil {
		ok := rh.Interactors.UserInteractor.Registration(&params.User)
		if ok {
			c.JSON(http.StatusCreated, gin.H{})
		} else {
			c.JSON(http.StatusUnprocessableEntity, gin.H{ "errors": params.User.Errors })
		}
	}
}
