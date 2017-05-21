package v1

import (
	"bookmarks/app/engine"
	"bookmarks/app/usecases"
	"github.com/gin-gonic/gin"
	"net/http"
	"strconv"
)

type FoldersHandler struct {
	Interactors *engine.Interactors
}

type FolderParams struct {
	Folder usecases.Folder `json:"folder" binding:"required"`
}

//TODO: Сделать отдельный объект для управления current_user'ом
func getUserId(c *gin.Context) (id int64, err error){
	v, _ := c.Keys["user_id"].(string)
	id, err = strconv.ParseInt(v, 10, 64)
	return
}

func (fh *FoldersHandler)Index(c *gin.Context) {
	userId, _ := getUserId(c)
	folders := fh.Interactors.FolderInteractor.Folders(userId)
	c.JSON(http.StatusOK, gin.H{"folders": folders})
}

func (fh *FoldersHandler)Create(c *gin.Context) {
	var params FolderParams
	if err := c.BindJSON(&params); err == nil {
		params.Folder.UserId, _ = getUserId(c)
		u, ok := fh.Interactors.FolderInteractor.Create(&params.Folder)
		if ok {
			c.JSON(http.StatusCreated, gin.H{"folder": u})
		} else {
			c.JSON(http.StatusUnprocessableEntity, gin.H{ "errors": params.Folder.Errors })
		}
	}
}

func (fh *FoldersHandler)Edit(c *gin.Context) {
	id, _ := strconv.ParseInt(c.Param("id"), 10, 64)
	userId, _ := getUserId(c)
	folder := fh.Interactors.FolderInteractor.GetForEdit(id, userId)
	c.JSON(http.StatusOK, gin.H{ "folder": folder })
}

func (fh *FoldersHandler)Update(c *gin.Context) {
	var params FolderParams
	if err := c.BindJSON(&params); err == nil {
		params.Folder.UserId, _ = getUserId(c)
		id, _ := strconv.ParseInt(c.Param("id"), 10, 64)
		u, ok := fh.Interactors.FolderInteractor.Update(id, &params.Folder)
		if ok {
			c.JSON(http.StatusOK, gin.H{ "folder": u })
		} else {
			c.JSON(http.StatusUnprocessableEntity, gin.H{ "errors": params.Folder.Errors })
		}
	}
}

func (fh *FoldersHandler)Destroy(c *gin.Context) {
	id, _ := strconv.ParseInt(c.Param("id"), 10, 64)
	userId, _ := getUserId(c)

	fh.Interactors.FolderInteractor.Destroy(id, userId)

	c.JSON(http.StatusOK, gin.H{})
}
