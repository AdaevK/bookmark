package controllers

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

func (contr *Controller)DashboardIndex(c *gin.Context) {
	c.HTML(http.StatusOK, "dashboard/index", gin.H{})
}