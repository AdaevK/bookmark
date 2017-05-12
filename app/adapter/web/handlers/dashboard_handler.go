package handlers

import (
	"github.com/gin-gonic/gin"
	"net/http"
)


type DashboardHandler struct {}

func (dh *DashboardHandler)Index(c *gin.Context) {
	c.HTML(http.StatusOK, "dashboard/index", gin.H{})
}