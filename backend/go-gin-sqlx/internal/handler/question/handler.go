package question

import (
	"fmt"
	"net/http"

	"api-stack-underflow/internal/dto"
	"api-stack-underflow/internal/pkg/helper"
	"api-stack-underflow/internal/pkg/jwt"
	"api-stack-underflow/internal/pkg/validation"
	"api-stack-underflow/internal/service"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type Handler struct {
	questionService service.IQuestionService
	commentService  service.ICommentService
	jwtAuth         jwt.IJWTAuth
}

func NewHandler(questionService service.IQuestionService, commentService service.ICommentService, jwtAuth jwt.IJWTAuth) *Handler {
	return &Handler{
		questionService: questionService,
		commentService:  commentService,
		jwtAuth:         jwtAuth,
	}
}

// @Summary Create Question
// @Description Create a new question
// @Tags Question
// @Accept json
// @Produce json
// @Param request body dto.CreateQuestionRequest true "Create Question Request"
// @Success 200 {object} types.ResponseAPI
// @Router /api/v1/stack-underflow/questions [post]
// @Security BearerAuth
func (h *Handler) CreateQuestion(c *gin.Context) {
	ctx := c.Request.Context()
	user := jwt.GetUser(c)

	var req dto.CreateQuestionRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		helper.APIValidationError(c, "invalid request", err)
		return
	}

	if err := validation.Validate(req); err != nil {
		helper.APIValidationError(c, "validation error", err)
		return
	}

	result, err := h.questionService.Create(ctx, user.UserID, user.Username, req)
	if err != nil {
		helper.APIResponse(c, http.StatusBadRequest, err.Error(), nil, err)
		return
	}
	helper.APIResponse(c, http.StatusCreated, "success", result, nil)
}

// @Summary Get All Questions
// @Description Get all questions
// @Tags Question
// @Accept json
// @Produce json
// @Success 200 {object} types.ResponseAPI
// @Router /api/v1/stack-underflow/questions [get]
// @Security BearerAuth
func (h *Handler) GetAllQuestions(c *gin.Context) {
	ctx := c.Request.Context()

	result, err := h.questionService.GetAll(ctx)
	if err != nil {
		helper.APIResponse(c, http.StatusBadRequest, err.Error(), nil, err)
		return
	}
	helper.APIResponse(c, http.StatusOK, "success", result, nil)
}

// @Summary Get Question By ID
// @Description Get a question by ID
// @Tags Question
// @Accept json
// @Produce json
// @Param id path string true "Question ID"
// @Success 200 {object} types.ResponseAPI
// @Router /api/v1/stack-underflow/questions/{id} [get]
// @Security BearerAuth
func (h *Handler) GetQuestionByID(c *gin.Context) {
	ctx := c.Request.Context()
	idStr := c.Param("id")
	id, err := uuid.Parse(idStr)
	if err != nil {
		helper.APIResponse(c, http.StatusBadRequest, "invalid question ID", nil, err)
		return
	}

	result, err := h.questionService.GetByID(ctx, id)
	if err != nil {
		helper.APIResponse(c, http.StatusNotFound, "question not found", nil, err)
		return
	}
	helper.APIResponse(c, http.StatusOK, "success", result, nil)
}

// @Summary Update Question
// @Description Update a question
// @Tags Question
// @Accept json
// @Produce json
// @Param id path string true "Question ID"
// @Param request body dto.UpdateQuestionRequest true "Update Question Request"
// @Success 200 {object} types.ResponseAPI
// @Router /api/v1/stack-underflow/questions/{id} [put]
// @Security BearerAuth
func (h *Handler) UpdateQuestion(c *gin.Context) {
	ctx := c.Request.Context()
	user := jwt.GetUser(c)
	idStr := c.Param("id")
	id, err := uuid.Parse(idStr)
	if err != nil {
		helper.APIResponse(c, http.StatusBadRequest, "invalid question ID", nil, err)
		return
	}

	var req dto.UpdateQuestionRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		helper.APIValidationError(c, "invalid request", err)
		return
	}

	if err := validation.Validate(req); err != nil {
		helper.APIValidationError(c, "validation error", err)
		return
	}

	result, err := h.questionService.Update(ctx, id, user.UserID, req)
	if err != nil {
		helper.APIResponse(c, http.StatusBadRequest, err.Error(), nil, err)
		return
	}
	helper.APIResponse(c, http.StatusOK, "success", result, nil)
}

// @Summary Delete Question
// @Description Delete a question
// @Tags Question
// @Accept json
// @Produce json
// @Param id path string true "Question ID"
// @Success 200 {object} types.ResponseAPI
// @Router /api/v1/stack-underflow/questions/{id} [delete]
// @Security BearerAuth
func (h *Handler) DeleteQuestion(c *gin.Context) {
	ctx := c.Request.Context()
	user := jwt.GetUser(c)
	idStr := c.Param("id")
	id, err := uuid.Parse(idStr)
	if err != nil {
		helper.APIResponse(c, http.StatusBadRequest, "invalid question ID", nil, err)
		return
	}

	if err := h.questionService.Delete(ctx, id, user.UserID); err != nil {
		helper.APIResponse(c, http.StatusBadRequest, err.Error(), nil, err)
		return
	}
	helper.APIResponse(c, http.StatusOK, "question deleted successfully", nil, nil)
}

// @Summary Create Comment
// @Description Create a new comment for a question
// @Tags Question
// @Accept json
// @Produce json
// @Param id path string true "Question ID"
// @Param request body dto.CreateCommentRequest true "Create Comment Request"
// @Success 200 {object} types.ResponseAPI
// @Router /api/v1/stack-underflow/questions/{id}/comments [post]
// @Security BearerAuth
func (h *Handler) CreateComment(c *gin.Context) {
	ctx := c.Request.Context()
	user := jwt.GetUser(c)
	questionIDStr := c.Param("id")
	questionID, err := uuid.Parse(questionIDStr)
	if err != nil {
		helper.APIResponse(c, http.StatusBadRequest, "invalid question ID", nil, err)
		return
	}

	var req dto.CreateCommentRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		helper.APIValidationError(c, "invalid request", err)
		return
	}

	if err := validation.Validate(req); err != nil {
		helper.APIValidationError(c, "validation error", err)
		return
	}

	result, err := h.commentService.Create(ctx, questionID, user.UserID, user.Username, req)
	if err != nil {
		helper.APIResponse(c, http.StatusBadRequest, err.Error(), nil, err)
		return
	}
	helper.APIResponse(c, http.StatusCreated, "success", result, nil)
}

// @Summary Get Comments By Question ID
// @Description Get all comments for a question
// @Tags Question
// @Accept json
// @Produce json
// @Param id path string true "Question ID"
// @Success 200 {object} types.ResponseAPI
// @Router /api/v1/stack-underflow/questions/{id}/comments [get]
// @Security BearerAuth
func (h *Handler) GetCommentsByQuestionID(c *gin.Context) {
	ctx := c.Request.Context()
	questionIDStr := c.Param("id")
	questionID, err := uuid.Parse(questionIDStr)
	if err != nil {
		helper.APIResponse(c, http.StatusBadRequest, "invalid question ID", nil, err)
		return
	}

	result, err := h.commentService.GetByQuestionID(ctx, questionID)
	if err != nil {
		helper.APIResponse(c, http.StatusBadRequest, err.Error(), nil, err)
		return
	}
	helper.APIResponse(c, http.StatusOK, "success", result, nil)
}

// @Summary Update Comment
// @Description Update a comment
// @Tags Question
// @Accept json
// @Produce json
// @Param commentId path string true "Comment ID"
// @Param request body dto.UpdateCommentRequest true "Update Comment Request"
// @Success 200 {object} types.ResponseAPI
// @Router /api/v1/stack-underflow/questions/comments/{commentId} [put]
// @Security BearerAuth
func (h *Handler) UpdateComment(c *gin.Context) {
	ctx := c.Request.Context()
	user := jwt.GetUser(c)
	commentIDStr := c.Param("commentId")
	commentID, err := uuid.Parse(commentIDStr)
	if err != nil {
		helper.APIResponse(c, http.StatusBadRequest, "invalid comment ID", nil, err)
		return
	}

	var req dto.UpdateCommentRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		helper.APIValidationError(c, "invalid request", err)
		return
	}

	if err := validation.Validate(req); err != nil {
		helper.APIValidationError(c, "validation error", err)
		return
	}

	result, err := h.commentService.Update(ctx, commentID, user.UserID, req)
	if err != nil {
		helper.APIResponse(c, http.StatusBadRequest, err.Error(), nil, err)
		return
	}
	helper.APIResponse(c, http.StatusOK, "success", result, nil)
}

// @Summary Delete Comment
// @Description Delete a comment
// @Tags Question
// @Accept json
// @Produce json
// @Param commentId path string true "Comment ID"
// @Success 200 {object} types.ResponseAPI
// @Router /api/v1/stack-underflow/questions/comments/{commentId} [delete]
// @Security BearerAuth
func (h *Handler) DeleteComment(c *gin.Context) {
	ctx := c.Request.Context()
	user := jwt.GetUser(c)
	commentIDStr := c.Param("commentId")
	commentID, err := uuid.Parse(commentIDStr)
	if err != nil {
		helper.APIResponse(c, http.StatusBadRequest, "invalid comment ID", nil, err)
		return
	}

	if err := h.commentService.Delete(ctx, commentID, user.UserID); err != nil {
		helper.APIResponse(c, http.StatusBadRequest, err.Error(), nil, err)
		return
	}
	helper.APIResponse(c, http.StatusOK, "comment deleted successfully", nil, nil)
}

// AuthMiddleware is a middleware to validate JWT token
func (h *Handler) AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			helper.APIResponse(c, http.StatusUnauthorized, "authorization header required", nil, nil)
			c.Abort()
			return
		}

		tokenString := ""
		_, err := fmt.Sscanf(authHeader, "Bearer %s", &tokenString)
		if err != nil {
			helper.APIResponse(c, http.StatusUnauthorized, "invalid authorization header format", nil, nil)
			c.Abort()
			return
		}

		claims, err := h.jwtAuth.ValidateToken(tokenString)
		if err != nil {
			helper.APIResponse(c, http.StatusUnauthorized, "invalid token", nil, err)
			c.Abort()
			return
		}

		c.Set("auth", claims)
		c.Next()
	}
}
