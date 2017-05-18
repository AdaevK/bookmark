package domain

import "time"

type Folder struct {
	Id        int64
	Name      string
	UserId    int64
	CreatedAt time.Time
	UpdatedAt time.Time
}

type FolderRepository interface {
	Create(f *Folder) (error)

	Folders(userId int64) ([]*Folder, error)
}