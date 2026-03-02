from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List
from schemas.schemas import QuestionCreate, QuestionUpdate, QuestionResponse, PaginatedQuestions
from services.question.service import QuestionService
from config.database import get_db
from jose import jwt, JWTError
from dotenv import load_dotenv
import os

load_dotenv()
SECRET_KEY = os.getenv("SECRET_KEY", "your-secret-key")
ALGORITHM = os.getenv("ALGORITHM", "HS256")

router = APIRouter()


def get_current_user(authorization: str, db: Session = Depends(get_db)):
    try:
        if not authorization.startswith("Bearer "):
            raise HTTPException(status_code=401, detail="Invalid authorization header")
        token = authorization.split(" ")[1]
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")


@router.post("/", response_model=QuestionResponse)
def create_question(
    request: QuestionCreate,
    authorization: str = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    question = QuestionService.create(
        db, request.title, request.description, request.status,
        authorization["userId"], authorization["username"]
    )
    return question


@router.get("/", response_model=List[QuestionResponse])
def get_all_questions(db: Session = Depends(get_db)):
    return QuestionService.get_all(db)


@router.get("/paginated", response_model=PaginatedQuestions)
def get_paginated_questions(
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=100),
    db: Session = Depends(get_db)
):
    return QuestionService.get_paginated(db, page, limit)


@router.get("/search", response_model=List[QuestionResponse])
def search_questions(q: str = Query(...), db: Session = Depends(get_db)):
    return QuestionService.search(db, q)


@router.get("/hot", response_model=List[QuestionResponse])
def get_hot_questions(limit: int = Query(5, ge=1), db: Session = Depends(get_db)):
    return QuestionService.get_hot(db, limit)


@router.get("/{id}", response_model=QuestionResponse)
def get_question_by_id(id: str, db: Session = Depends(get_db)):
    return QuestionService.get_by_id(db, id)


@router.get("/{id}/related", response_model=List[QuestionResponse])
def get_related_questions(id: str, limit: int = Query(5, ge=1), db: Session = Depends(get_db)):
    return QuestionService.get_related(db, id, limit)


@router.put("/{id}", response_model=QuestionResponse)
def update_question(
    id: str,
    request: QuestionUpdate,
    authorization: str = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return QuestionService.update(
        db, id, request.title, request.description, request.status,
        authorization["userId"]
    )


@router.delete("/{id}")
def delete_question(
    id: str,
    authorization: str = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    QuestionService.delete(db, id, authorization["userId"])
    return {"success": True, "message": "Question deleted successfully"}
