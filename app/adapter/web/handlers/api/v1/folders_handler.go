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

func (fh *FoldersHandler)Index(c *gin.Context) {
	userId := int64(c.Keys["user_id"].(float64))
	folders, err := fh.Interactors.FolderInteractor.Folders(userId)
	if err != nil {
		panic(err)
	}
	c.JSON(http.StatusOK, gin.H{"folders": folders})
}

func (fh *FoldersHandler)Create(c *gin.Context) {
	var params FolderParams
	if err := c.BindJSON(&params); err == nil {
		params.Folder.UserId = int64(c.Keys["user_id"].(float64))
		u, ok := fh.Interactors.FolderInteractor.Create(&params.Folder)
		if ok {
			c.JSON(http.StatusCreated, gin.H{"folder": u})
		} else {
			c.JSON(http.StatusUnprocessableEntity, gin.H{ "errors": params.Folder.Errors })
		}
	}
}
