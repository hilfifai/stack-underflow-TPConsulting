package dto

// RegisterRequest represents a user registration request
type SURegisterRequest struct {
	Username string `json:"username" validate:"required,min=3,max=100"`
	Password string `json:"password" validate:"required,min=6"`
}

// LoginRequest represents a user login request
type SULoginRequest struct {
	Username string `json:"username" validate:"required"`
	Password string `json:"password" validate:"required"`
}

// TokenResponse represents an authentication token response
type SUTokenResponse struct {
	AccessToken  string `json:"access_token"`
	RefreshToken string `json:"refresh_token"`
	UserID       string `json:"user_id"`
	Username     string `json:"username"`
}

// CreateQuestionRequest represents a request to create a question
type CreateQuestionRequest struct {
	Title       string `json:"title" validate:"required,min=5,max=500"`
	Description string `json:"description" validate:"required,min=10"`
}

// UpdateQuestionRequest represents a request to update a question
type UpdateQuestionRequest struct {
	Title       string `json:"title" validate:"required,min=5,max=500"`
	Description string `json:"description" validate:"required,min=10"`
	Status      string `json:"status" validate:"required,oneof=open answered closed"`
}

// CreateCommentRequest represents a request to create a comment
type CreateCommentRequest struct {
	Content string `json:"content" validate:"required,min=1"`
}

// UpdateCommentRequest represents a request to update a comment
type UpdateCommentRequest struct {
	Content string `json:"content" validate:"required,min=1"`
}
