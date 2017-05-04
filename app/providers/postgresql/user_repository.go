package postgresql

import (
	"bookmarks/app/domain"
	"database/sql"
)

type userRepository struct {
	db *sql.DB
}

func (ur *userRepository)FindById(id int) (*domain.User, error) {
	var u domain.User
	row := ur.db.QueryRow("SELECT id, email, first_name, last_name FROM users WHERE id = $1", id)
	if err := row.Scan(&u.Id, &u.Email, &u.FirstName, &u.LastName); err != nil {
		return nil, err
	}
	return &u, nil
}

func (ur *userRepository)FindByEmail(email string) (*domain.User, error) {
	var u domain.User
	row := ur.db.QueryRow("SELECT id, email, first_name, last_name FROM users WHERE email = $1", email)
	if err := row.Scan(&u.Id, &u.Email, &u.FirstName, &u.LastName); err != nil {
		return nil, err
	}
	return &u, nil
}

func (ur *userRepository)FindByEmailAndGetPassword(email string) (*domain.User, *string, error) {
	var (
		u domain.User
		encryptedPassword string
	)
	row := ur.db.QueryRow("SELECT id, email, first_name, last_name, encrypted_password FROM users WHERE email = $1", email)
	if err := row.Scan(&u.Id, &u.Email, &u.FirstName, &u.LastName, &encryptedPassword); err != nil {
		return nil, nil, err
	}
	return &u, &encryptedPassword, nil
}
