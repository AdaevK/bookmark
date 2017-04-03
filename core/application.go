package core

import "github.com/gin-gonic/gin"

type Application struct {
	Config Config
}

func (a *Application) Run() error {
	router := gin.Default()
	router.LoadHTMLGlob("../app/views/*")

	createRoutes(router)

	router.Run(":" + a.Config.Port)
	return nil
}
