package app

import (
	"bookmarks/app/providers/postgresql"
	"bookmarks/app/adapter/web"
	"bookmarks/app/engine"
	"gopkg.in/go-playground/validator.v9"
)

func NewApplication(configPath, secretPath string) (app *engine.Engine, err error) {
	app = new(engine.Engine)
	if app.Config, err = engine.LoadConfig(configPath); err != nil {
		return
	}

	if err = app.Config.LoadKey(secretPath); err != nil {
		return
	}

	app.Cntr.Repo, err = postgresql.NewDatabase(app.Config.Database)
	if err != nil {
		return
	}

	app.Cntr.Validate = validator.New()

	app.Router = web.NewWebAdapter(app)

	return
}
