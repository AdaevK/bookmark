package engine

import (
	"net/http"

	"bookmarks/app/domain"
	"bookmarks/app/usecases"
)

type Engine struct {
	Config     Config
	Router     http.Handler
	Interactor *Interactors
}

type Interactors struct {
	SessionInteractor usecases.SessionInteractor
	UserInteractor    usecases.UserInteractor
	FolderInteractor  usecases.FolderInteractor
}

type Repositories interface {
	GetUserRepository() domain.UserRepository
	GetFolderRepository() domain.FolderRepository
}

func (a *Engine) RunServer() {
	http.ListenAndServe(a.Config.ServerAddress(), a.Router)
}
