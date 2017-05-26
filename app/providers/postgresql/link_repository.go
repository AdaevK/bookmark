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

func (lr *linkRepository)Create(l *domain.Link) (error) {
	row := lr.db.QueryRow("INSERT INTO links(url, folder_id, created_at, updated_at) VALUES ($1, $2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING id",
	       l.Url, l.FolderId)

	if err := row.Scan(&l.Id); err != nil {
		return err
	}

	return nil
}

func (lr *linkRepository)DestroyFromFolder(id, folderId int64) (error) {
	_, err := lr.db.Exec("DELETE FROM links WHERE id=$1 AND folder_id=$2", id, folderId)
	if err != nil {
		return err
	}
	return nil
}
