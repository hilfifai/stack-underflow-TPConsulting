package dto

import (
	"api-stack-underflow/internal/entity"

	"github.com/google/uuid"
)

type CreateAssessmentRequest struct {
	ModuleID        uuid.UUID           `json:"module_id" binding:"required"`
	Name            string              `json:"name" binding:"required"`
	Ord             int                 `json:"ord"`
	IsActive        bool                `json:"is_active"`
	Code            string              `json:"code" binding:"required"`
	AssignedRoleIDs *entity.StringArray `json:"assigned_role_ids,omitempty"`
}

type UpdateAssessmentRequest struct {
	ModuleID        uuid.UUID           `json:"module_id"`
	Name            string              `json:"name"`
	Ord             int                 `json:"ord"`
	IsActive        bool                `json:"is_active"`
	Code            string              `json:"code"`
	AssignedRoleIDs *entity.StringArray `json:"assigned_role_ids,omitempty"`
}
