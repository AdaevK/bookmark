package core

import (
	"bitbucket.org/kirill_adaev/bookmarks/app/controllers"
	api_v1 "bitbucket.org/kirill_adaev/bookmarks/app/controllers/api/v1"

	"github.com/gin-gonic/gin"
	"net/http"
)

func createRoutes(router *gin.Engine) {
	router.GET("/", controllers.MainIndex)

	dashboard := router.Group("/dashboard")
	{
		dashboard.GET("/*action", controllers.DashboardIndex)
	}

	api := router.Group("/api")
	{
		v1 := api.Group("/v1")
		{
			v1.POST("/sessions", api_v1.SessionCreate)
			v1.DELETE("/sessions", api_v1.SessionDelete)
		}
	}

	router.NoRoute(NoRoute)
}

func NoRoute(c *gin.Context) {
	message := gin.H{
		"errors": "Not Found",
	}
	switch c.ContentType() {
	case gin.MIMEJSON:
		c.JSON(http.StatusNotFound, message)
	case gin.MIMEXML:
		c.XML(http.StatusNotFound, message)
	case gin.MIMEXML2:
		c.XML(http.StatusNotFound, message)
	default:
		c.HTML(http.StatusOK, "dashboard/index", gin.H{})
	}
}
