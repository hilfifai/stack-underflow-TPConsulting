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

type ICommentService interface {
	Create(ctx context.Context, questionID uuid.UUID, userID uuid.UUID, username string, req dto.CreateCommentRequest) (*entity.Comment, error)
	GetByQuestionID(ctx context.Context, questionID uuid.UUID) ([]entity.Comment, error)
	Update(ctx context.Context, id uuid.UUID, userID uuid.UUID, req dto.UpdateCommentRequest) (*entity.Comment, error)
	Delete(ctx context.Context, id uuid.UUID, userID uuid.UUID) error
}

type CommentService struct {
	commentRepo repository.ICommentRepository
}

func NewCommentService(commentRepo repository.ICommentRepository) ICommentService {
	return &CommentService{commentRepo: commentRepo}
}

func (s *CommentService) Create(ctx context.Context, questionID uuid.UUID, userID uuid.UUID, username string, req dto.CreateCommentRequest) (*entity.Comment, error) {
	comment := &entity.Comment{
		ID:         uuid.New(),
		QuestionID: questionID,
		UserID:     userID,
		Username:   username,
		Content:    req.Content,
		CreatedAt:  time.Now(),
		UpdatedAt:  time.Now(),
	}

	if err := s.commentRepo.Create(ctx, comment); err != nil {
		return nil, errors.New("failed to create comment")
	}

	return comment, nil
}

func (s *CommentService) GetByQuestionID(ctx context.Context, questionID uuid.UUID) ([]entity.Comment, error) {
	return s.commentRepo.GetByQuestionID(ctx, questionID)
}

func (s *CommentService) Update(ctx context.Context, id uuid.UUID, userID uuid.UUID, req dto.UpdateCommentRequest) (*entity.Comment, error) {
	existingComment, err := s.commentRepo.GetByID(ctx, id)
	if err != nil {
		return nil, errors.New("comment not found")
	}

	if existingComment.UserID != userID {
		return nil, errors.New("unauthorized to update this comment")
	}

	comment := &entity.Comment{
		Content:   req.Content,
		UpdatedAt: time.Now(),
	}

	if err := s.commentRepo.Update(ctx, id, comment); err != nil {
		return nil, errors.New("failed to update comment")
	}

	return s.commentRepo.GetByID(ctx, id)
}

func (s *CommentService) Delete(ctx context.Context, id uuid.UUID, userID uuid.UUID) error {
	existingComment, err := s.commentRepo.GetByID(ctx, id)
	if err != nil {
		return errors.New("comment not found")
	}

	if existingComment.UserID != userID {
		return errors.New("unauthorized to delete this comment")
	}

	return s.commentRepo.Delete(ctx, id)
}
