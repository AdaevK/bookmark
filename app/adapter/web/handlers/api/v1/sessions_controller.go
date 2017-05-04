package v1

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"gopkg.in/go-playground/validator.v9"
	"bookmarks/app/engine"
)

type SessionHandler struct {
	engine.Controller
}

type SessionErrors struct {
	Common   string `json:"common,omitempty"`
	Email    string `json:"email,omitempty"`
	Password string `json:"password,omitempty"`
}

type SessionForm struct {
	engine.Controller
	Email    string `form:"email" validate:"required,email"`
	Password string `form:"password" validate:"required"`
	Errors   SessionErrors
}

func (sf *SessionForm)IsValid() (bool) {
	se := sf.Validate.Struct(sf)
	if se == nil {
		return true
	}
	for _, err := range se.(validator.ValidationErrors) {
		switch err.Field() {
		case "Email":
			sf.Errors.Email = err.Tag()
		case "Password":
			sf.Errors.Password = err.Tag()
		}
	}
	return false
}

func (sf *SessionForm)Call() (bool) {

	if !sf.IsValid() {
		return false
	}

	_, password, err := sf.Repo.GetUserRepository().FindByEmailAndGetPassword(sf.Email)
	if err != nil {
		panic(err)
	}

	if *password == sf.Password {
		return true
	} else {
		sf.Errors.Common = "invalid_email_or_password"
		return false
	}
}

type SessionFormParams struct {
	Session SessionForm `form:"session" binding:"required"`
}

func (sh *SessionHandler)Create(c *gin.Context){
	var params SessionFormParams
	if err := c.Bind(&params); err == nil {
		sessionForm := params.Session
		sessionForm.Controller = sh.Controller
		if sessionForm.Call() {
			c.JSON(http.StatusOK, gin.H{"jwt": "test"})
		} else {
			c.JSON(http.StatusUnprocessableEntity, gin.H{"errors": sessionForm.Errors})
		}
	}
}

func (sh *SessionHandler)Delete(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{})
}