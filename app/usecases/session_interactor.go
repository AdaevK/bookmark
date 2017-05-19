package usecases

import (
	jwt_lib "github.com/dgrijalva/jwt-go"
	"gopkg.in/go-playground/validator.v9"
	"bookmarks/app/domain"
)

type SessionInteractor struct {
	secretKey      []byte
	Validate *validator.Validate
	userRepository domain.UserRepository
}

func NewSessionInteractor(sk []byte, v *validator.Validate, ur domain.UserRepository) (SessionInteractor) {
	return SessionInteractor{sk, v, ur}
}

type Session struct {
	Email    string `json:"email" validate:"required,email"`
	Password string `json:"password" validate:"required"`
	Errors
}

func (interactor *SessionInteractor) Authenticate(session *Session) (string, bool){
	ae := interactor.Validate.Struct(session)
	session.Errors = make(Errors)

	if ae == nil {
		u, encPassword, err := interactor.userRepository.FindByEmailAndGetPassword(session.Email)
		if err != nil || *encPassword != session.Password {
			session.Errors["common"] = "invalid_email_or_password"
			return "", false
		}

		token := jwt_lib.New(jwt_lib.GetSigningMethod("HS256"))
		token.Claims = jwt_lib.MapClaims{
			"id":         u.Id,
			"first_name": u.FirstName,
			"last_name":  u.LastName,
			// "exp":        time.Now().Add(time.Hour * 1).Unix(),
		}

		jwt, err := token.SignedString(interactor.secretKey)
		if err != nil {
			panic("Could not generate token")
		}

		return jwt, true
	} else {
		for _, err := range ae.(validator.ValidationErrors) {
			switch err.Field() {
			case "Email":
				session.Errors["email"] = err.Tag()
			case "Password":
				session.Errors["password"] = err.Tag()
			}
		}
		return "", false
	}
}
