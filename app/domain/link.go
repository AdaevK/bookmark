package domain

import "time"

type Link struct {
	Id       int64  `json:"id"`
	Name     string `json:"name"`
	Url      string `json:"url"`
	FolderId int64
	CreatedAt time.Time
	UpdatedAt time.Time
}

type LinkRepositroy interface {
	ListByFolder(folderId int64) ([]*Link, error)

	Create(f *Link) (error)

	DestroyFromFolder(id, folderId int64) (error)
}