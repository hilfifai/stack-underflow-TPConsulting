package dto

import (
	"time"

	dtoShedule "api-stack-underflow/internal/dto/customer_schedule"

	"github.com/google/uuid"
)

type CreateActivityRequest struct {
	OriginScheduleID *uuid.UUID                         `json:"origin_schedule_id,omitempty"`
	ActivityTypeID   uuid.UUID                          `json:"activity_type_id" binding:"required"`
	WorkLinkID       *uuid.UUID                         `json:"work_link_id,omitempty"`
	CustomerID       *uuid.UUID                         `json:"customer_id,omitempty"`
	Notes            string                             `json:"notes" binding:"required"`
	Title            string                             `json:"title" `
	WorkLinkType     *string                            `json:"work_link_type" `
	ActualStart      time.Time                          `json:"actual_start" binding:"required"`
	ActualEnd        time.Time                          `json:"actual_end" binding:"required"`
	LocationID       *uuid.UUID                         `json:"location_id,omitempty"`
	FreeformLocation *string                            `json:"freeform_location,omitempty"`
	StatusID         uuid.UUID                          `json:"status_id" `
	Visibility       string                             `json:"visibility" binding:"required"`
	Attendees        []dtoShedule.CreateAttendeeRequest `json:"attendees,omitempty"`
	Evidences        []AddEvidenceRequest               `json:"evidences,omitempty"`
}

type UpdateActivityRequest struct {
	ActivityTypeID   uuid.UUID                          `json:"activity_type_id"`
	WorkLinkID       *uuid.UUID                         `json:"work_link_id,omitempty"`
	CustomerID       *uuid.UUID                         `json:"customer_id,omitempty"`
	Title            string                             `json:"title" `
	WorkLinkType     *string                            `json:"work_link_type" `
	Notes            string                             `json:"notes"`
	ActualStart      time.Time                          `json:"actual_start"`
	ActualEnd        time.Time                          `json:"actual_end"`
	LocationID       *uuid.UUID                         `json:"location_id,omitempty"`
	FreeformLocation *string                            `json:"freeform_location,omitempty"`
	StatusID         uuid.UUID                          `json:"status_id"`
	Visibility       string                             `json:"visibility"`
	Attendees        []dtoShedule.CreateAttendeeRequest `json:"attendees,omitempty"`
	Evidences        []AddEvidenceRequest               `json:"evidences,omitempty"`
}

type CheckinRequest struct {
	Lat               *float64 `json:"lat,omitempty"`
	Lon               *float64 `json:"lon,omitempty"`
	AccuracyM         *float64 `json:"accuracy_m,omitempty"`
	DeviceFingerprint *string  `json:"device_fingerprint,omitempty"`
}

type AddEvidenceRequest struct {
	FileID   uuid.UUID `json:"file_id" binding:"required"`
	Filename string    `json:"filename" binding:"required"`
}

type UpdateOutcomeRequest struct {
	OutcomeCode        *string    `json:"outcome_code,omitempty"`
	Summary            *string    `json:"summary,omitempty"`
	NextStep           *string    `json:"next_step,omitempty"`
	Rating             *int       `json:"rating,omitempty"`
	FollowupScheduleID *uuid.UUID `json:"followup_schedule_id,omitempty"`
}

type FilterActivityRequest struct {
	DateStart    *time.Time `form:"date_start"`
	DateEnd      *time.Time `form:"date_end"`
	StatusID     *uuid.UUID `form:"status_id"`
	CustomerID   *uuid.UUID `form:"customer_id"`
	ActivityType *uuid.UUID `form:"activity_type_id"`
	Search       *string    `form:"search"`
	HasOutcome   *bool      `form:"has_outcome"`
	WorkLinkType *string    `form:"work_link_type"`
	WorkLinkID   *uuid.UUID `form:"work_link_type_id"`
	Page         *int       `form:"page"`
	Limit        *int       `form:"limit"`
}
