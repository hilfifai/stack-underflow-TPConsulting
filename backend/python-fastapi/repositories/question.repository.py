from sqlalchemy.orm import Session
from models.models import Question
from uuid import uuid4
from sqlalchemy import desc


class QuestionRepository:
    @staticmethod
    def create(db: Session, title: str, description: str, status, user_id: str, username: str):
        question = Question(
            id=str(uuid4()),
            title=title,
            description=description,
            status=status,
            user_id=user_id,
            username=username
        )
        db.add(question)
        db.commit()
        db.refresh(question)
        return question

    @staticmethod
    def get_all(db: Session):
        return db.query(Question).order_by(desc(Question.created_at)).all()

    @staticmethod
    def get_paginated(db: Session, page: int = 1, limit: int = 10):
        skip = (page - 1) * limit
        questions = db.query(Question).order_by(desc(Question.created_at)).offset(skip).limit(limit).all()
        total = db.query(Question).count()
        return {
            "questions": questions,
            "total": total,
            "page": page,
            "limit": limit,
            "total_pages": (total + limit - 1) // limit
        }

    @staticmethod
    def search(db: Session, query: str):
        return db.query(Question).filter(
            (Question.title.ilike(f"%{query}%")) | 
            (Question.description.ilike(f"%{query}%"))
        ).order_by(desc(Question.created_at)).all()

    @staticmethod
    def get_hot(db: Session, limit: int = 5):
        return db.query(Question).order_by(
            desc(Question.comments)
        ).limit(limit).all()

    @staticmethod
    def get_by_id(db: Session, id: str):
        return db.query(Question).filter(Question.id == id).first()

    @staticmethod
    def get_related(db: Session, id: str, limit: int = 5):
        return db.query(Question).filter(Question.id != id).order_by(
            desc(Question.created_at)
        ).limit(limit).all()

    @staticmethod
    def update(db: Session, id: str, title: str, description: str, status):
        question = db.query(Question).filter(Question.id == id).first()
        if question:
            question.title = title
            question.description = description
            question.status = status
            db.commit()
            db.refresh(question)
        return question

    @staticmethod
    def delete(db: Session, id: str):
        question = db.query(Question).filter(Question.id == id).first()
        if question:
            db.delete(question)
            db.commit()
        return question
