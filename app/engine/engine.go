package engine

import (
	"net/http"
	"gopkg.in/go-playground/validator.v9"

	"bookmarks/app/domain"
)

type Repositories interface {
	GetUserRepository() domain.UserRepository
}

type Engine struct {
	Config   Config
	Cntr     Controller
	Router   http.Handler
}

type Controller struct {
	Repo     Repositories
	Validate *validator.Validate
}

func (a *Engine) RunServer() {
	http.ListenAndServe(a.Config.ServerAddress(), a.Router)
}
