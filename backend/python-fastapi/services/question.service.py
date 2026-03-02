from sqlalchemy.orm import Session
from repositories.question.repository import QuestionRepository


class QuestionService:
    @staticmethod
    def create(db: Session, title: str, description: str, status, user_id: str, username: str):
        return QuestionRepository.create(db, title, description, status, user_id, username)

    @staticmethod
    def get_all(db: Session):
        return QuestionRepository.get_all(db)

    @staticmethod
    def get_paginated(db: Session, page: int, limit: int):
        return QuestionRepository.get_paginated(db, page, limit)

    @staticmethod
    def search(db: Session, query: str):
        if not query:
            raise ValueError("Search query is required")
        return QuestionRepository.search(db, query)

    @staticmethod
    def get_hot(db: Session, limit: int):
        return QuestionRepository.get_hot(db, limit)

    @staticmethod
    def get_by_id(db: Session, id: str):
        question = QuestionRepository.get_by_id(db, id)
        if not question:
            raise ValueError("Question not found")
        return question

    @staticmethod
    def get_related(db: Session, id: str, limit: int):
        return QuestionRepository.get_related(db, id, limit)

    @staticmethod
    def update(db: Session, id: str, title: str, description: str, status, user_id: str):
        existing = QuestionRepository.get_by_id(db, id)
        if not existing:
            raise ValueError("Question not found")
        if existing.user_id != user_id:
            raise ValueError("You can only edit your own questions")
        return QuestionRepository.update(db, id, title, description, status)

    @staticmethod
    def delete(db: Session, id: str, user_id: str):
        existing = QuestionRepository.get_by_id(db, id)
        if not existing:
            raise ValueError("Question not found")
        if existing.user_id != user_id:
            raise ValueError("You can only delete your own questions")
        return QuestionRepository.delete(db, id)
