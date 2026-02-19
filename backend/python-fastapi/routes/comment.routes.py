from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from schemas.schemas import CommentCreate, CommentResponse
from services.comment.service import CommentService
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


@router.post("/", response_model=CommentResponse)
def create_comment(
    request: CommentCreate,
    authorization: str = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    comment = CommentService.create(
        db, request.content, request.question_id,
        authorization["userId"], authorization["username"]
    )
    return comment


@router.get("/question/{question_id}", response_model=List[CommentResponse])
def get_comments_by_question_id(question_id: str, db: Session = Depends(get_db)):
    return CommentService.get_by_question_id(db, question_id)


@router.delete("/{id}")
def delete_comment(
    id: str,
    authorization: str = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    CommentService.delete(db, id)
    return {"success": True, "message": "Comment deleted successfully"}
