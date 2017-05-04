package web

import (
	"net/http"
	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/contrib/sessions"
	"bookmarks/app/engine"
)

func NewWebAdapter(f *engine.Engine) http.Handler {
	c := f.Config
	if c.IsProduction() {
		gin.SetMode(gin.ReleaseMode)
	}
	store := sessions.NewCookieStore(c.SecretKey)

	e := gin.New()

	e.Use(gin.Logger(), gin.Recovery())
	e.Use(sessions.Sessions(c.Base.SessionName, store))

	e.HTMLRender = loadTemplates()

	createRoutes(e, f)

	e.NoRoute(NoRoute)
	return e
}

func loadTemplates() Render {
	render := NewRender()
	render.AddFromFiles("main/index", "layouts/landing.tmpl", "main/index.tmpl")
	render.AddFromFiles("dashboard/index", "layouts/dashboard.tmpl", "dashboard/index.tmpl")

	return render
}
