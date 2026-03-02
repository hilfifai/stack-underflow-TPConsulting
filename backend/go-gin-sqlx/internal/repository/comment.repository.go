package repository

import (
	"context"

	"api-stack-underflow/internal/entity"

	"github.com/google/uuid"
	"github.com/jmoiron/sqlx"
)

type ICommentRepository interface {
	Create(ctx context.Context, comment *entity.Comment) error
	GetByID(ctx context.Context, id uuid.UUID) (*entity.Comment, error)
	GetByQuestionID(ctx context.Context, questionID uuid.UUID) ([]entity.Comment, error)
	Update(ctx context.Context, id uuid.UUID, comment *entity.Comment) error
	Delete(ctx context.Context, id uuid.UUID) error
}

type CommentRepository struct {
	db *sqlx.DB
}

func NewCommentRepository(db *sqlx.DB) ICommentRepository {
	return &CommentRepository{db: db}
}

func (r *CommentRepository) Create(ctx context.Context, comment *entity.Comment) error {
	query := `
		INSERT INTO su_comments (id, question_id, user_id, username, content, created_at, updated_at)
		VALUES ($1, $2, $3, $4, $5, $6, $7)
	`
	_, err := r.db.ExecContext(ctx, query,
		comment.ID, comment.QuestionID, comment.UserID, comment.Username, comment.Content, comment.CreatedAt, comment.UpdatedAt)
	return err
}

func (r *CommentRepository) GetByID(ctx context.Context, id uuid.UUID) (*entity.Comment, error) {
	var comment entity.Comment
	query := `SELECT id, question_id, user_id, username, content, created_at, updated_at FROM su_comments WHERE id = $1`
	err := r.db.GetContext(ctx, &comment, query, id)
	if err != nil {
		return nil, err
	}
	return &comment, nil
}

func (r *CommentRepository) GetByQuestionID(ctx context.Context, questionID uuid.UUID) ([]entity.Comment, error) {
	var comments []entity.Comment
	query := `SELECT id, question_id, user_id, username, content, created_at, updated_at 
		FROM su_comments WHERE question_id = $1 ORDER BY created_at ASC`
	err := r.db.SelectContext(ctx, &comments, query, questionID)
	if err != nil {
		return nil, err
	}
	return comments, nil
}

func (r *CommentRepository) Update(ctx context.Context, id uuid.UUID, comment *entity.Comment) error {
	query := `
		UPDATE su_comments 
		SET content = $1, updated_at = $2
		WHERE id = $3
	`
	_, err := r.db.ExecContext(ctx, query, comment.Content, comment.UpdatedAt, id)
	return err
}

func (r *CommentRepository) Delete(ctx context.Context, id uuid.UUID) error {
	query := `DELETE FROM su_comments WHERE id = $1`
	_, err := r.db.ExecContext(ctx, query, id)
	return err
}
