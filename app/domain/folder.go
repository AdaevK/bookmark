package domain

import "time"

//TODO: сделать сериалайзеры и удалить json метки
type Folder struct {
	Id        int64     `json:"id"`
	Name      string    `json:"name"`
	UserId    int64
	CreatedAt time.Time
	UpdatedAt time.Time

	Links     []*Link    `json:"links"`
}

type FolderRepository interface {
	FindById(id int64) (*Folder, error)
	Folders(userId int64) ([]*Folder, error)

	Create(f *Folder) (error)
	Update(f *Folder) (error)
	DestroyFromUser(id, userId int64) (error)

	CheckName(name string, userId int64) (bool)
}