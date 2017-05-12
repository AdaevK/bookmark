package usecases

import (
	jwt_lib "github.com/dgrijalva/jwt-go"
	"bookmarks/app/domain"
	"time"
)

type SessionInteractor struct {
	SecretKey      []byte
	UserRepository domain.UserRepository
}

func (interactor *SessionInteractor) Authenticate(email, password string) (string, bool){
	u, encPassword, err := interactor.UserRepository.FindByEmailAndGetPassword(email)
	if err != nil {
		return "", false
	}

	if *encPassword == password {
		token := jwt_lib.New(jwt_lib.GetSigningMethod("HS256"))
		token.Claims = jwt_lib.MapClaims{
			"id":         u.Id,
			"first_name": u.FirstName,
			"last_name":  u.LastName,
			"exp":        time.Now().Add(time.Hour * 1).Unix(),
		}

		jwt, err := token.SignedString(interactor.SecretKey)
		if err != nil {
			panic("Could not generate token")
		}
		return jwt, true
	}else{
		return "", false
	}
}
