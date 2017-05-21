package web

import (
	jwt_lib "github.com/dgrijalva/jwt-go"
	"github.com/dgrijalva/jwt-go/request"
	"github.com/gin-gonic/gin"
	"net/http"
)

func jwtAuth(secret []byte) gin.HandlerFunc {
	return func(c *gin.Context) {
		_, err := request.ParseFromRequest(c.Request, request.OAuth2Extractor, func(token *jwt_lib.Token) (interface{}, error){
			claims, _ := token.Claims.(jwt_lib.MapClaims)
			user := claims["user"].(map[string]interface{})
			c.Set("user_id", user["id"])

			return secret, nil
		})

		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"errors": "not_authorize"})
			c.Abort()
			return
		}

		c.Next()
	}
}
