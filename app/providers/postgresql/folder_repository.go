package postgresql

import (
	"database/sql"
	"bookmarks/app/domain"
)

type folderRepository struct {
	db *sql.DB
}

func (fr *folderRepository)FindById(id, userId int64) (*domain.Folder, error) {
	var f domain.Folder

	row := fr.db.QueryRow("SELECT name FROM folders WHERE id=$1 AND user_id=$2", id, userId)

	if err := row.Scan(&f.Name); err != nil {
		return nil, err
	}

	return &f, nil
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

func (fr *folderRepository)CheckName(name string, userId int64) (bool) {
	var result bool
	if err := fr.db.QueryRow("SELECT EXISTS(SELECT 1 FROM folders WHERE name=$1 AND user_id=$2)", name, userId).Scan(&result); err != nil {
		panic(err)
	}

	return !result
}

func (fr *folderRepository)Create(f *domain.Folder) (error) {
	row := fr.db.QueryRow("INSERT INTO folders(name, user_id, created_at, updated_at) VALUES ($1, $2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING id",
	  f.Name, f.UserId)

	if err := row.Scan(&f.Id); err != nil {
		return err
	}

	return nil
}

func (fr *folderRepository)Update(f *domain.Folder) (error) {
	_, err := fr.db.Exec("UPDATE folders SET name = $1 WHERE id = $2 AND user_id = $3", f.Name, f.Id, f.UserId)

	if err != nil {
		return err
	}

	return  nil
}

func (fr *folderRepository)DestroyFromUser(id, userId int64) (error) {
	_, err := fr.db.Exec("DELETE from folders WHERE id=$1 AND user_id=$2", id, userId)
	if err != nil {
		return err
	}
	return nil
}