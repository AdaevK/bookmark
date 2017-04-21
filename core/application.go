package core

import "github.com/gin-gonic/gin"

type Application struct {
	Config Config
}

func (a *Application) Run() error {
	router := gin.New()
	router.Use(gin.Logger(), gin.Recovery())

	render := NewRender()
	render.AddFromFiles("main/index", "layouts/landing.tmpl", "main/index.tmpl")
	render.AddFromFiles("dashboard/index", "layouts/dashboard.tmpl", "dashboard/index.tmpl")
	router.HTMLRender = render

	createRoutes(router)

	router.Run(":" + a.Config.Port)
	return nil
}
