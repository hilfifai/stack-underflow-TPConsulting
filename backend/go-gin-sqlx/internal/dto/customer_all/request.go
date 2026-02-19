package dto

import (
	"api-stack-underflow/internal/entity"
)

type CustomerAllRequest struct {
	Customers []entity.CustomerAll `json:"customers"`
}
