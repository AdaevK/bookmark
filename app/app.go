package app

import (
	"bookmarks/app/providers/postgresql"
	"bookmarks/app/adapter/web"
	"bookmarks/app/engine"
	"gopkg.in/go-playground/validator.v9"
	"bookmarks/app/usecases"
)

func NewApplication(configPath, secretPath string) (app *engine.Engine, err error) {
	app = new(engine.Engine)
	if app.Config, err = engine.LoadConfig(configPath); err != nil {
		return
	}

	if err = app.Config.LoadKey(secretPath); err != nil {
		return
	}

	var repo engine.Repositories
	repo, err = postgresql.NewDatabase(app.Config.Database)
	if err != nil {
		return
	}

	app.Validate = validator.New()

	userRepository := repo.GetUserRepository()

	app.Interactor = new(engine.Interactors)
	app.Interactor.SessionInteractor = usecases.SessionInteractor{app.Config.SecretKey, userRepository}

	app.Router = web.NewWebAdapter(app)

	return
}
