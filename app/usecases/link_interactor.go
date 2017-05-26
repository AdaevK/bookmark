package usecases

import (
	"gopkg.in/go-playground/validator.v9"
	"bookmarks/app/domain"
)

type LinkInteractor struct {
	Validate       *validator.Validate
	linkRepository domain.LinkRepositroy
}

func NewLinkInteractor(v *validator.Validate, lr domain.LinkRepositroy) (LinkInteractor) {
	return LinkInteractor{v, lr}
}

type Link struct {
	Url      string `json:"url" validate:"required,url"`
	FolderId int64 `json:"folder_id" valdiate:"required"`
	Errors
}

func (interactor *LinkInteractor)Create(l *Link) (*domain.Link, bool) {
	le := interactor.Validate.Struct(l)
	if le == nil {
		link := domain.Link{
			Url:      l.Url,
			FolderId: l.FolderId,
		}
		if err := interactor.linkRepository.Create(&link); err != nil {
			panic(err)
		}

		return &link, true
	} else {
		l.Errors = make(Errors)
		for _, err := range le.(validator.ValidationErrors) {
			switch err.Field() {
			case "Url":
				l.Errors["url"] = err.Tag()
			}
		}

		return nil, false
	}
}
