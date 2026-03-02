from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List
from models.models import QuestionStatus


# Auth Schemas
class LoginRequest(BaseModel):
    username: str
    password: str


class RegisterRequest(BaseModel):
    username: str
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: dict


class UserData(BaseModel):
    userId: str
    username: str


# Question Schemas
class QuestionCreate(BaseModel):
    title: str
    description: str
    status: QuestionStatus = QuestionStatus.OPEN


class QuestionUpdate(BaseModel):
    title: str
    description: str
    status: QuestionStatus


class QuestionResponse(BaseModel):
    id: str
    title: str
    description: str
    status: QuestionStatus
    user_id: str
    username: str
    created_at: datetime
    updated_at: datetime
    comments: List["CommentResponse"] = []

    class Config:
        from_attributes = True


class QuestionListResponse(BaseModel):
    id: str
    title: str
    description: str
    status: QuestionStatus
    username: str
    created_at: datetime
    comments: List["CommentResponse"] = []

    class Config:
        from_attributes = True


class PaginatedQuestions(BaseModel):
    questions: List[QuestionListResponse]
    total: int
    page: int
    limit: int
    total_pages: int


# Comment Schemas
class CommentCreate(BaseModel):
    content: str
    question_id: str


class CommentResponse(BaseModel):
    id: str
    content: str
    question_id: str
    user_id: str
    username: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


# Generic Response
class SuccessResponse(BaseModel):
    success: bool
    message: str
    data: Optional[dict] = None
