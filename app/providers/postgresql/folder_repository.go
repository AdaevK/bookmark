package postgresql

import (
	"database/sql"
	"bookmarks/app/domain"
)

type folderRepository struct {
	db *sql.DB
}

func (fr *folderRepository)Create(f *domain.Folder) (error) {
	row := fr.db.QueryRow("INSERT INTO folders(name, user_id, created_at, updated_at) VALUES ($1, $2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING id",
	  f.Name, f.UserId)

	if err := row.Scan(&f.Id); err != nil {
		return err
	}

	return nil
}

func (fr *folderRepository)Folders(userId int64) ([]*domain.Folder, error) {
	return nil, nil
}