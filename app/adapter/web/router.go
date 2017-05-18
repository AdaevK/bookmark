package web

import (
	"github.com/gin-gonic/gin"
	"net/http"

	"bookmarks/app/adapter/web/handlers"
	"bookmarks/app/engine"
	api_v1 "bookmarks/app/adapter/web/handlers/api/v1"
)

func createRoutes(r *gin.Engine, f *engine.Engine) {
	landingRouters(r, f, "/")
	dashboardRouters(r, f, "/dashboard")

	api := r.Group("/api")
	{
		apiV1(api, f, "/v1")
	}
}

func apiV1(r *gin.RouterGroup, f *engine.Engine, endpoint string) {
	v1 := r.Group(endpoint)
	{
		sessionsHandler := api_v1.SessionHandler{f.Interactor}
		v1.POST("/sessions", sessionsHandler.Create)
		v1.DELETE("/sessions", jwtAuth(f.Config.SecretKey), sessionsHandler.Delete)

		registrationsHandler := api_v1.RegistrationsHandler{f.Interactor}
		v1.POST("/registrations", registrationsHandler.Create)

		folders := v1.Group("/folders", jwtAuth(f.Config.SecretKey))
		{
			foldersHandler := api_v1.FoldersHandler{f.Interactor}
			folders.GET("", foldersHandler.Index)
			folders.POST("", foldersHandler.Create)
		}
	}
}

func dashboardRouters(r *gin.Engine, f *engine.Engine, endpoint string) {
	dashboardHandler := handlers.DashboardHandler{}
	dashboard := r.Group(endpoint)
	{
		dashboard.GET("/*action", dashboardHandler.Index)
	}
}

func landingRouters(r *gin.Engine, f *engine.Engine, path string) {
	mainHandler := handlers.MainHandler{}
	r.GET(path, mainHandler.Index)
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
