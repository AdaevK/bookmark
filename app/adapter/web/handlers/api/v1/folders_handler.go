package v1

import (
	"bookmarks/app/engine"
	"bookmarks/app/usecases"
	"github.com/gin-gonic/gin"
	"net/http"
)

type FoldersHandler struct {
	Interactors *engine.Interactors
}

type FolderParams struct {
	Folder usecases.Folder `json:"folder" binding:"required"`
}

func (fh *FoldersHandler)Create(c *gin.Context) {
	var params FolderParams
	if err := c.BindJSON(&params); err == nil {
		params.Folder.UserId = int64(c.Keys["user_id"].(float64))
		ok := fh.Interactors.FolderInteractor.Create(&params.Folder)
		if ok {
			c.JSON(http.StatusCreated, gin.H{})
		} else {
			c.JSON(http.StatusUnprocessableEntity, gin.H{ "errors": params.Folder.Errors })
		}
	}
}