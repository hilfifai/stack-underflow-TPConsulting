from sqlalchemy.orm import Session
from models.models import Comment
from uuid import uuid4
from sqlalchemy import asc


class CommentRepository:
    @staticmethod
    def create(db: Session, content: str, question_id: str, user_id: str, username: str):
        comment = Comment(
            id=str(uuid4()),
            content=content,
            question_id=question_id,
            user_id=user_id,
            username=username
        )
        db.add(comment)
        db.commit()
        db.refresh(comment)
        return comment

    @staticmethod
    def get_by_question_id(db: Session, question_id: str):
        return db.query(Comment).filter(
            Comment.question_id == question_id
        ).order_by(asc(Comment.created_at)).all()

    @staticmethod
    def delete(db: Session, id: str):
        comment = db.query(Comment).filter(Comment.id == id).first()
        if comment:
            db.delete(comment)
            db.commit()
        return comment
