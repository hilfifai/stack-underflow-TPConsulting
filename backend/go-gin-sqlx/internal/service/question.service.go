package service

import (
	"context"
	"errors"
	"time"

	"api-stack-underflow/internal/dto"
	"api-stack-underflow/internal/entity"
	"api-stack-underflow/internal/repository"

	"github.com/google/uuid"
)

type IQuestionService interface {
	Create(ctx context.Context, userID uuid.UUID, username string, req dto.CreateQuestionRequest) (*entity.Question, error)
	GetByID(ctx context.Context, id uuid.UUID) (*entity.Question, error)
	GetAll(ctx context.Context) ([]entity.Question, error)
	GetByUserID(ctx context.Context, userID uuid.UUID) ([]entity.Question, error)
	Update(ctx context.Context, id uuid.UUID, userID uuid.UUID, req dto.UpdateQuestionRequest) (*entity.Question, error)
	Delete(ctx context.Context, id uuid.UUID, userID uuid.UUID) error
}

type QuestionService struct {
	questionRepo repository.IQuestionRepository
}

func NewQuestionService(questionRepo repository.IQuestionRepository) IQuestionService {
	return &QuestionService{questionRepo: questionRepo}
}

func (s *QuestionService) Create(ctx context.Context, userID uuid.UUID, username string, req dto.CreateQuestionRequest) (*entity.Question, error) {
	question := &entity.Question{
		ID:          uuid.New(),
		Title:       req.Title,
		Description: req.Description,
		Status:      "open",
		UserID:      userID,
		Username:    username,
		CreatedAt:   time.Now(),
		UpdatedAt:   time.Now(),
	}

	if err := s.questionRepo.Create(ctx, question); err != nil {
		return nil, errors.New("failed to create question")
	}

	return question, nil
}

func (s *QuestionService) GetByID(ctx context.Context, id uuid.UUID) (*entity.Question, error) {
	return s.questionRepo.GetByID(ctx, id)
}

func (s *QuestionService) GetAll(ctx context.Context) ([]entity.Question, error) {
	return s.questionRepo.GetAll(ctx)
}

func (s *QuestionService) GetByUserID(ctx context.Context, userID uuid.UUID) ([]entity.Question, error) {
	return s.questionRepo.GetByUserID(ctx, userID)
}

func (s *QuestionService) Update(ctx context.Context, id uuid.UUID, userID uuid.UUID, req dto.UpdateQuestionRequest) (*entity.Question, error) {
	existingQuestion, err := s.questionRepo.GetByID(ctx, id)
	if err != nil {
		return nil, errors.New("question not found")
	}

	if existingQuestion.UserID != userID {
		return nil, errors.New("unauthorized to update this question")
	}

	question := &entity.Question{
		Title:       req.Title,
		Description: req.Description,
		Status:      req.Status,
		UpdatedAt:   time.Now(),
	}

	if err := s.questionRepo.Update(ctx, id, question); err != nil {
		return nil, errors.New("failed to update question")
	}

	return s.questionRepo.GetByID(ctx, id)
}

func (s *QuestionService) Delete(ctx context.Context, id uuid.UUID, userID uuid.UUID) error {
	existingQuestion, err := s.questionRepo.GetByID(ctx, id)
	if err != nil {
		return errors.New("question not found")
	}

	if existingQuestion.UserID != userID {
		return errors.New("unauthorized to delete this question")
	}

	return s.questionRepo.Delete(ctx, id)
}
