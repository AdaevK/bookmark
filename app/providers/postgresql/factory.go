package postgresql

import (
	"database/sql"
	_ "github.com/lib/pq"

	"bookmarks/app/engine"
	"bookmarks/app/domain"
)

type repositories struct {
	db *sql.DB
}

func NewDatabase(config engine.Database) (engine.Repositories, error) {
	db, err := sql.Open("postgres",
		"user="+config.DBUser+
			" password='"+config.DBPassword+
			"' host="+config.DBHost+
			" dbname="+config.DBName)
	if err != nil {
		return nil, err
	}
	if err = db.Ping(); err != nil {
		return nil, err
	}

	return &repositories{ db }, nil
}

func (r *repositories)GetUserRepository() (domain.UserRepository) {
	return &userRepository{ r.db }
}

func (r *repositories)GetFolderRepository() (domain.FolderRepository) {
	return &folderRepository{ r.db }
}
