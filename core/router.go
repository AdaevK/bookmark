package core

import (
	"github.com/gin-gonic/gin"
	"bitbucket.org/kirill_adaev/bookmarks/app/controllers"
)

func createRoutes(router *gin.Engine) {
	router.GET("/", controllers.MainIndex)
}
