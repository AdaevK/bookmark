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
	rows, err := fr.db.Query("SELECT id, name FROM folders WHERE user_id=$1", userId)
	if err != nil {
		return []*domain.Folder{}, err
	}
	defer rows.Close()

	folders := make([]*domain.Folder, 0)
	for rows.Next() {
		folder := new(domain.Folder)
		err = rows.Scan(&folder.Id, &folder.Name)
		if err != nil {
			return []*domain.Folder{}, err
		}
		folders = append(folders, folder)
	}
	return folders, nil
}