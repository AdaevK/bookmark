package postgresql

import (
	"database/sql"
	"bookmarks/app/domain"
)

type linkRepository struct {
	db *sql.DB
}

func (lr *linkRepository)ListByFolder(folderId int64) ([]*domain.Link, error) {
	rows, err := lr.db.Query("SELECT id, name, url FROM links WHERE folder_id=$1", folderId)
	if err != nil {
		return []*domain.Link{}, err
	}
	defer rows.Close()

	links := make([]*domain.Link, 0)
	for rows.Next() {
		link := new(domain.Link)
		err = rows.Scan(&link.Id, &link.Name, &link.Url)
		if err != nil {
			return []*domain.Link{}, err
		}
		links = append(links, link)
	}
	return links, nil
}
