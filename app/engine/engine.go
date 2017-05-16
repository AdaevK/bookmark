package engine

import (
	"net/http"

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
}

type Interactors struct {
	SessionInteractor usecases.SessionInteractor
	UserInteractor usecases.UserInteractor
}

func (a *Engine) RunServer() {
	http.ListenAndServe(a.Config.ServerAddress(), a.Router)
}
