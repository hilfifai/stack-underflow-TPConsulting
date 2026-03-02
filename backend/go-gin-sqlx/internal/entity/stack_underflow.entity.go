package entity

import (
	"time"

	"github.com/google/uuid"
)

// SUUser represents a Stack Underflow user
type SUUser struct {
	ID        uuid.UUID `db:"id" json:"id"`
	Username  string    `db:"username" json:"username"`
	Password  string    `db:"password" json:"-"`
	CreatedAt time.Time `db:"created_at" json:"created_at"`
	UpdatedAt time.Time `db:"updated_at" json:"updated_at"`
}

// Question represents a Stack Underflow question
type Question struct {
	ID          uuid.UUID `db:"id" json:"id"`
	Title       string    `db:"title" json:"title"`
	Description string    `db:"description" json:"description"`
	Status      string    `db:"status" json:"status"` // open, answered, closed
	UserID      uuid.UUID `db:"user_id" json:"user_id"`
	Username    string    `db:"username" json:"username"`
	CreatedAt   time.Time `db:"created_at" json:"created_at"`
	UpdatedAt   time.Time `db:"updated_at" json:"updated_at"`
}

// Comment represents a Stack Underflow comment
type Comment struct {
	ID         uuid.UUID `db:"id" json:"id"`
	QuestionID uuid.UUID `db:"question_id" json:"question_id"`
	UserID     uuid.UUID `db:"user_id" json:"user_id"`
	Username   string    `db:"username" json:"username"`
	Content    string    `db:"content" json:"content"`
	CreatedAt  time.Time `db:"created_at" json:"created_at"`
	UpdatedAt  time.Time `db:"updated_at" json:"updated_at"`
}

// QuestionWithComments represents a question with its comments
type QuestionWithComments struct {
	Question Question  `json:"question"`
	Comments []Comment `json:"comments"`
}
