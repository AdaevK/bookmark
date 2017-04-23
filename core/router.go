package core

import (
	"github.com/gin-gonic/gin"
	"bitbucket.org/kirill_adaev/bookmarks/app/controllers"
)

func createRoutes(c *controllers.Controller, router *gin.Engine) {
	router.GET("/", c.MainIndex)

	dashboard := router.Group("/dashboard")
	{
		dashboard.GET("*action", c.DashboardIndex)
	}
}
