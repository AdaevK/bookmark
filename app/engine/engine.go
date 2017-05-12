package engine

import (
	"net/http"
	"gopkg.in/go-playground/validator.v9"

	"bookmarks/app/domain"
	"bookmarks/app/usecases"
)

type Repositories interface {
	GetUserRepository() domain.UserRepository
}

type Engine struct {
	Config     Config
	Router     http.Handler
	Interactor *Interactors
	Validate   *validator.Validate
}

type Interactors struct {
	SessionInteractor usecases.SessionInteractor
}

func (a *Engine) RunServer() {
	http.ListenAndServe(a.Config.ServerAddress(), a.Router)
}
