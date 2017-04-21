package controllers

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

func DashboardIndex(c *gin.Context) {
	c.HTML(http.StatusOK, "dashboard/index", gin.H{})
}