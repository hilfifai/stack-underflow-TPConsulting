from sqlalchemy.orm import Session
from repositories.comment.repository import CommentRepository


class CommentService:
    @staticmethod
    def create(db: Session, content: str, question_id: str, user_id: str, username: str):
        return CommentRepository.create(db, content, question_id, user_id, username)

    @staticmethod
    def get_by_question_id(db: Session, question_id: str):
        return CommentRepository.get_by_question_id(db, question_id)

    @staticmethod
    def delete(db: Session, id: str):
        return CommentRepository.delete(db, id)
