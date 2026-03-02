package query_action_catalog

import (
	"api-stack-underflow/internal/pkg/middleware"

	"github.com/gin-gonic/gin"
)

func (h *Handler) NewRoutes(e *gin.RouterGroup) {
	group := e.Group("/query")

	group.
		Use(middleware.AuthMiddleware(h.auth)).
		POST(":code", h.ExecutePostQuery).
		PUT(":code", h.ExecutePutQuery).
		DELETE(":code", h.ExecuteDeleteQuery)

}
