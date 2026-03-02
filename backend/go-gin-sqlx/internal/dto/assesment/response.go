package dto

import (
	"api-stack-underflow/internal/entity"

	"github.com/google/uuid"
)

type AssessmentResponse struct {
	ID              uuid.UUID           `json:"id"`
	ModuleID        uuid.UUID           `json:"module_id"`
	Name            string              `json:"name"`
	Ord             int                 `json:"ord"`
	IsActive        bool                `json:"is_active"`
	Code            string              `json:"code"`
	AssignedRoleIDs *entity.StringArray `json:"assigned_role_ids,omitempty"`
	CreatedAt       string              `json:"created_at"`
	UpdatedAt       string              `json:"updated_at"`
}
