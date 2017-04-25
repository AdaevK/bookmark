package core

import (
	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/contrib/sessions"
)

type Application struct {
	Config Config
}

func (a *Application) Run() error {
	db, err := a.Config.LoadDB()
	if err != nil {
		return err
	}

	store := sessions.NewCookieStore([]byte(a.Config.SecretKey))

	router := gin.New()

	router.Use(setDatabase(db))
	router.Use(gin.Logger(), gin.Recovery())
	router.Use(sessions.Sessions(a.Config.SessionName, store))

	router.HTMLRender = loadTemplates()

	createRoutes(router)

	router.Run(":" + a.Config.Port)
	return nil
}

func loadTemplates() Render {
	render := NewRender()
	render.AddFromFiles("main/index", "layouts/landing.tmpl", "main/index.tmpl")
	render.AddFromFiles("dashboard/index", "layouts/dashboard.tmpl", "dashboard/index.tmpl")

	return render
}
