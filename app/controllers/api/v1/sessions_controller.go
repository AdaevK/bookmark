package v1

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"database/sql"
	"bitbucket.org/kirill_adaev/bookmarks/app/models"
	"gopkg.in/go-playground/validator.v9"
)

type SessionErrors struct {
	Common   string `json:"common,omitempty"`
	Email    string `json:"email,omitempty"`
	Password string `json:"password,omitempty"`
}

type SessionForm struct {
	c        *gin.Context
	Email    string `form:"email" validate:"required,email"`
	Password string `form:"password" validate:"required"`
	Errors   SessionErrors
}

func (sf *SessionForm)setContext(c *gin.Context) {
	sf.c = c
}

func (sf *SessionForm)IsValid() (bool) {
	validate := sf.c.MustGet("Validator").(*validator.Validate)
	se := validate.Struct(sf)
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
	db := sf.c.MustGet("DB").(*sql.DB)

	if !sf.IsValid() {
		return false
	}

	var u models.User
	row := db.QueryRow("SELECT id, email, encrypted_password FROM users WHERE email = $1", sf.Email)

	if err := row.Scan(&u.Id, &u.Email, &u.EncryptedPassword); err != nil {
		panic(err)
	}

	if u.EncryptedPassword == sf.Password {
		return true
	} else {
		sf.Errors.Common = "invalid_email_or_password"
		return false
	}
}

type SessionFormParams struct {
	Session SessionForm `form:"session" binding:"required"`
}

func SessionCreate(c *gin.Context){
	var params SessionFormParams
	if err := c.Bind(&params); err == nil {
		sessionForm := params.Session
		sessionForm.setContext(c)
		if sessionForm.Call() {
			c.JSON(http.StatusOK, gin.H{"jwt": "test"})
		} else {
			c.JSON(http.StatusUnprocessableEntity, gin.H{"errors": sessionForm.Errors})
		}
	}
}

func SessionDelete(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{})
}