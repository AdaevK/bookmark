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
	LinkInteractor    usecases.LinkInteractor
}

type Repositories interface {
	GetUserRepository() domain.UserRepository
	GetFolderRepository() domain.FolderRepository
	GetLinkRepository() domain.LinkRepositroy
}

func (a *Engine) RunServer() {
	http.ListenAndServe(a.Config.ServerAddress(), a.Router)
}
