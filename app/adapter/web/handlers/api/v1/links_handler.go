package v1

import (
	"bookmarks/app/engine"
	"bookmarks/app/usecases"
	"github.com/gin-gonic/gin"
	"net/http"
	"strconv"
)

type LinksHandler struct {
	Interactors *engine.Interactors
}

type LinkParams struct {
	Link usecases.Link `json:"link" binding:"required"`
}

func (lh *LinksHandler)Create(c *gin.Context) {
	folderId, _ := strconv.ParseInt(c.Param("folder_id"), 10, 64)
	var params LinkParams
	if err := c.BindJSON(&params); err == nil {
		params.Link.FolderId = folderId
		l, ok := lh.Interactors.LinkInteractor.Create(&params.Link)
		if ok {
			c.JSON(http.StatusCreated, gin.H{"link": l})
		} else {
			c.JSON(http.StatusUnprocessableEntity, gin.H{"errors": params.Link.Errors})
		}
	}
}

func (lh *LinksHandler)Destroy(c *gin.Context) {
	folderId, _ := strconv.ParseInt(c.Param("folder_id"), 10, 64)
	id, _ := strconv.ParseInt(c.Param("id"), 10, 64)

	lh.Interactors.LinkInteractor.Destroy(id, folderId)

	c.JSON(http.StatusOK, gin.H{})
}