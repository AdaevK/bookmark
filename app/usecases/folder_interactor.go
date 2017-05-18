package usecases

import (
	"gopkg.in/go-playground/validator.v9"
	"bookmarks/app/domain"
)

type FolderInteractor struct {
	Validate *validator.Validate
	domain.FolderRepository
}

type Folder struct {
	Name    string `json:"name" validate:"required"`
	UserId  int64  `json:"user_id" validate:"required"`
	Errors
}

func (interactor *FolderInteractor)Create(f *Folder) (*domain.Folder, bool) {
	fe := interactor.Validate.Struct(f)
	if fe == nil {
		folder := domain.Folder{
			Name:   f.Name,
			UserId: f.UserId,
		}
		if err := interactor.FolderRepository.Create(&folder); err != nil {
			panic(err)
		}

		return &folder, true
	} else {
		f.Errors = make(Errors)
		for _, err := range fe.(validator.ValidationErrors) {
			switch err.Field() {
			case "Name":
				f.Errors["name"] = err.Tag()
			case "UserId":
				f.Errors["user_id"] = err.Tag()
			}
		}

		return nil, false
	}
}