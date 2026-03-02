package dto

import "api-stack-underflow/internal/entity"

type CreateDetailRequest struct {
	Data entity.DetailItem `json:"data" binding:"required"`
}

type UpdateDetailRequest struct {
	Data entity.DetailItem `json:"data" binding:"required"`
}
