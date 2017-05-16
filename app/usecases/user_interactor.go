package usecases

import (
	"time"
	"gopkg.in/go-playground/validator.v9"

	"bookmarks/app/domain"
)

type UserInteractor struct {
	Validate *validator.Validate
	domain.UserRepository
}

type Errors map[string]string
type User struct {
	Email                string `json:"email" validate:"required,email,unique_user_email"`
	Password             string `json:"password" validate:"required,eqfield=PasswordConfirmation"`
	PasswordConfirmation string `json:"password_confirmation" validate:"required"`
	FirstName            string `json:"first_name" validate:"required"`
	LastName             string `json:"last_name" validate:"required"`
	Errors
}

func (interactor *UserInteractor) Registration(u *User) (bool) {
	re := interactor.Validate.Struct(u)
	if re == nil {
		createdAt := time.Now()
		user := domain.User{
			Email:     u.Email,
			FirstName: u.FirstName,
			LastName:  u.LastName,
			CreatedAt: createdAt,
			UpdatedAt: createdAt,
		}
		if err := interactor.UserRepository.Create(&user, u.Password); err != nil {
			panic(err)
		}

		return true
	} else {
		u.Errors = make(Errors)
		for _, err := range re.(validator.ValidationErrors) {
			switch err.Field() {
			case "Email":
				u.Errors["email"] = err.Tag()
			case "Password":
				u.Errors["password"] = err.Tag()
			case "PasswordConfirmation":
				u.Errors["password_confirmation"] = err.Tag()
			case "FirstName":
				u.Errors["first_name"] = err.Tag()
			case "LastName":
				u.Errors["last_name"] = err.Tag()
			}
		}
		return false
	}
}