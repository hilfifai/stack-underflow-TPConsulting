package repository

import (
	"context"

	"api-stack-underflow/internal/entity"

	"github.com/google/uuid"
	"github.com/jmoiron/sqlx"
)

type IQuestionRepository interface {
	Create(ctx context.Context, question *entity.Question) error
	GetByID(ctx context.Context, id uuid.UUID) (*entity.Question, error)
	GetAll(ctx context.Context) ([]entity.Question, error)
	GetByUserID(ctx context.Context, userID uuid.UUID) ([]entity.Question, error)
	Update(ctx context.Context, id uuid.UUID, question *entity.Question) error
	Delete(ctx context.Context, id uuid.UUID) error
}

type QuestionRepository struct {
	db *sqlx.DB
}

func NewQuestionRepository(db *sqlx.DB) IQuestionRepository {
	return &QuestionRepository{db: db}
}

func (r *QuestionRepository) Create(ctx context.Context, question *entity.Question) error {
	query := `
		INSERT INTO su_questions (id, title, description, status, user_id, username, created_at, updated_at)
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
	`
	_, err := r.db.ExecContext(ctx, query,
		question.ID, question.Title, question.Description, question.Status,
		question.UserID, question.Username, question.CreatedAt, question.UpdatedAt)
	return err
}

func (r *QuestionRepository) GetByID(ctx context.Context, id uuid.UUID) (*entity.Question, error) {
	var question entity.Question
	query := `SELECT id, title, description, status, user_id, username, created_at, updated_at FROM su_questions WHERE id = $1`
	err := r.db.GetContext(ctx, &question, query, id)
	if err != nil {
		return nil, err
	}
	return &question, nil
}

func (r *QuestionRepository) GetAll(ctx context.Context) ([]entity.Question, error) {
	var questions []entity.Question
	query := `SELECT id, title, description, status, user_id, username, created_at, updated_at 
		FROM su_questions ORDER BY created_at DESC`
	err := r.db.SelectContext(ctx, &questions, query)
	if err != nil {
		return nil, err
	}
	return questions, nil
}

func (r *QuestionRepository) GetByUserID(ctx context.Context, userID uuid.UUID) ([]entity.Question, error) {
	var questions []entity.Question
	query := `SELECT id, title, description, status, user_id, username, created_at, updated_at 
		FROM su_questions WHERE user_id = $1 ORDER BY created_at DESC`
	err := r.db.SelectContext(ctx, &questions, query, userID)
	if err != nil {
		return nil, err
	}
	return questions, nil
}

func (r *QuestionRepository) Update(ctx context.Context, id uuid.UUID, question *entity.Question) error {
	query := `
		UPDATE su_questions 
		SET title = $1, description = $2, status = $3, updated_at = $4
		WHERE id = $5
	`
	_, err := r.db.ExecContext(ctx, query, question.Title, question.Description, question.Status, question.UpdatedAt, id)
	return err
}

func (r *QuestionRepository) Delete(ctx context.Context, id uuid.UUID) error {
	query := `DELETE FROM su_questions WHERE id = $1`
	_, err := r.db.ExecContext(ctx, query, id)
	return err
}
