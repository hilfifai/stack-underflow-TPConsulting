package dto

import (
	"api-stack-underflow/internal/entity"

	"github.com/google/uuid"
)

type DetailResponse struct {
	ConfigID uuid.UUID         `json:"config_id"`
	Data     entity.DetailItem `json:"data"`
	Index    int               `json:"index"`
}
