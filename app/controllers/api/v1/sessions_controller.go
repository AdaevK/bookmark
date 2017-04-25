package v1

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"database/sql"
	"bitbucket.org/kirill_adaev/bookmarks/app/models"
	"fmt"
)

type Session struct {
	Email    string `form:"email" binding:"required"`
	Password string `form:"password" binding:"required"`
}
type SessionForm struct {
	Session Session `form:"session" binding:"required"`
}

func SessionCreate(c *gin.Context){
	db := c.MustGet("DB").(*sql.DB)

	var u models.User
	var form SessionForm

	if c.Bind(&form) == nil {
		fmt.Println(form.Session.Email, form.Session.Password)

		row := db.QueryRow("SELECT id, email, encrypted_password FROM users WHERE email = $1", form.Session.Email)

		if err := row.Scan(&u.Id, &u.Email, &u.EncryptedPassword); err != nil {
			panic(err)
		}

		if u.EncryptedPassword == form.Session.Password {
			c.JSON(http.StatusOK, gin.H{"jwt": "test"})
		} else {
			c.JSON(http.StatusUnprocessableEntity, gin.H{"errors": "Неверный логин или пароль!"})
		}
	} else {
		c.JSON(http.StatusUnprocessableEntity, gin.H{"errors": "Неверный логин или пароль!"})
	}
}

func SessionDelete(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{})
}