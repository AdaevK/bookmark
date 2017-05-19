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

	validate := validator.New()

	userRepository := repo.GetUserRepository()
	folderRepository := repo.GetFolderRepository()

	app.Interactor = new(engine.Interactors)
	app.Interactor.SessionInteractor = usecases.NewSessionInteractor(app.Config.SecretKey, validate, userRepository)
	app.Interactor.UserInteractor = usecases.NewUserInteractor(validate, userRepository)
	app.Interactor.FolderInteractor = usecases.NewFolderInteractor(validate, folderRepository)

	validate.RegisterValidation("unique_user_email", func(fl validator.FieldLevel) (bool) {
		return userRepository.CheckEmail(fl.Field().String())
	})
	validate.RegisterValidation("unique_folder_name", func(fl validator.FieldLevel) (bool) {
		v, _, _ := fl.GetStructFieldOK()
		return folderRepository.CheckName(fl.Field().String(), v.Interface().(int64))
	})

	app.Router = web.NewWebAdapter(app)

	return
}
