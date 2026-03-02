package question

import (
	"github.com/gin-gonic/gin"
)

func (h *Handler) NewRoutes(e *gin.RouterGroup, authMiddleware gin.HandlerFunc) {
	questions := e.Group("/questions")
	questions.Use(authMiddleware)
	{
		questions.POST("", h.CreateQuestion)
		questions.GET("", h.GetAllQuestions)
		questions.GET("/:id", h.GetQuestionByID)
		questions.PUT("/:id", h.UpdateQuestion)
		questions.DELETE("/:id", h.DeleteQuestion)
		questions.POST("/:id/comments", h.CreateComment)
		questions.GET("/:id/comments", h.GetCommentsByQuestionID)
		questions.PUT("/comments/:commentId", h.UpdateComment)
		questions.DELETE("/comments/:commentId", h.DeleteComment)
	}
}
