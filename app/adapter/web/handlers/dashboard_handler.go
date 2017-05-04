package handlers

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"bookmarks/app/engine"
)


type DashboardHandler struct {
	engine.Controller
}

func (dh *DashboardHandler)Index(c *gin.Context) {
	c.HTML(http.StatusOK, "dashboard/index", gin.H{})
}