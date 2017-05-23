package usecases

import (
	"gopkg.in/go-playground/validator.v9"
	"bookmarks/app/domain"
)

type FolderInteractor struct {
	Validate         *validator.Validate
	folderRepository domain.FolderRepository
	linkRepository   domain.LinkRepositroy
}

func NewFolderInteractor(v *validator.Validate, fr domain.FolderRepository, lr domain.LinkRepositroy) (FolderInteractor) {
	return FolderInteractor{v, fr, lr}
}

type Folder struct {
	Name    string `json:"name" validate:"required,unique_folder_name=UserId"`
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
		if err := interactor.folderRepository.Create(&folder); err != nil {
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

func (interactor *FolderInteractor)GetForEdit(id int64) (*domain.Folder) {
	folder, err := interactor.folderRepository.FindById(id)
	if err != nil {
		panic(err)
	}
	return folder
}

func (interactor *FolderInteractor)Folders(userId int64) ([]*domain.Folder) {
	folders, err := interactor.folderRepository.Folders(userId)
	if err != nil {
		panic(err)
	}
	return folders
}

func (interactor *FolderInteractor)Show(id int64) (*domain.Folder) {
	folder, err := interactor.folderRepository.FindById(id)
	if err != nil {
		panic(err)
	}
	links, err := interactor.linkRepository.ListByFolder(folder.Id)
	if err != nil {
		panic(err)
	}
	folder.Links = links
	return folder
}

func (interactor *FolderInteractor)Update(id int64, f *Folder) (*domain.Folder, bool) {
	fe := interactor.Validate.Struct(f)
	if fe == nil {
		folder := domain.Folder {
			Id:     id,
			Name:   f.Name,
			UserId: f.UserId,
		}

		if err := interactor.folderRepository.Update(&folder); err != nil {
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

func (interactor *FolderInteractor)Destroy(id, userId int64) {
	if err := interactor.folderRepository.DestroyFromUser(id, userId); err != nil {
		panic(err)
	}
}