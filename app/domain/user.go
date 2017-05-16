package domain

import "time"

type User struct {
	Id                int64
	Email             string
	FirstName         string
	LastName          string
	CreatedAt         time.Time
	UpdatedAt         time.Time
}

type UserRepository interface {
	CheckEmail(email string) (bool)

	Create(u *User, encryptedPassword string) (error)
	FindById(id int) (*User, error)
	FindByEmail(email string) (*User, error)
	FindByEmailAndGetPassword(email string) (*User, *string, error)
}