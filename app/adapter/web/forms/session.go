package forms

import (
	"bookmarks/app/engine"
	"gopkg.in/go-playground/validator.v9"
)

type SessionForm struct {
	Interactors *engine.Interactors
	Validate    *validator.Validate
	Email    string `form:"email" validate:"required,email"`
	Password string `form:"password" validate:"required"`
	Jwt      string
	Errors   Errors
}

func (sf *SessionForm)IsValid() (bool) {
	se := sf.Validate.Struct(sf)
	if se == nil {
		return true
	}
	for _, err := range se.(validator.ValidationErrors) {
		switch err.Field() {
		case "Email":
			sf.Errors["email"] = err.Tag()
		case "Password":
			sf.Errors["password"] = err.Tag()
		}
	}
	return false
}

func (sf *SessionForm)Call() (bool) {
	sf.Errors = make(Errors)

	if !sf.IsValid() {
		return false
	}

	var ok bool
	sf.Jwt, ok = sf.Interactors.SessionInteractor.Authenticate(sf.Email, sf.Password)

	if ok {
		return true
	} else {
		sf.Errors["common"] = "invalid_email_or_password"
		return false
	}
}
