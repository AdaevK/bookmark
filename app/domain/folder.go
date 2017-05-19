package domain

import "time"

//TODO: сделать сериалайзеры и удалить json метки
type Folder struct {
	Id        int64     `json:"id"`
	Name      string    `json:"name"`
	UserId    int64
	CreatedAt time.Time
	UpdatedAt time.Time
}

type FolderRepository interface {
	CheckName(name string, userId int64) (bool)

	Create(f *Folder) (error)
	Folders(userId int64) ([]*Folder, error)
	DestroyFromUser(id, userId int64) (error)
}