package models

import "time"

type User struct {
	Id                 int64
	Email              string
	EncryptedPassword string
	CreatedAt         time.Time
	UpdatedAt         time.Time
}
