package postgresql

import (
	"bookmarks/app/domain"
	"database/sql"
)

type userRepository struct {
	db *sql.DB
}

func (ur *userRepository)CheckEmail(email string) (bool) {
	var result bool
	if err := ur.db.QueryRow("SELECT EXISTS(SELECT 1 FROM users WHERE email=$1)", email).Scan(&result); err != nil {
		panic(err)
	}

	return !result
}

func (ur *userRepository)Create(u *domain.User, encryptedPassword string) (error) {
	row := ur.db.QueryRow("INSERT INTO users(email, encrypted_password, first_name, last_name, created_at, updated_at) VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING id",
	  u.Email, encryptedPassword, u.FirstName, u.LastName)

	if err := row.Scan(&u.Id); err != nil {
		return err
	}

	return nil
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
