from sqlalchemy.orm import Session
from models.models import User
from uuid import uuid4


class UserRepository:
    @staticmethod
    def find_by_username(db: Session, username: str):
        return db.query(User).filter(User.username == username).first()

    @staticmethod
    def find_by_id(db: Session, id: str):
        return db.query(User).filter(User.id == id).first()

    @staticmethod
    def create(db: Session, username: str, password: str):
        user = User(
            id=str(uuid4()),
            username=username,
            password=password
        )
        db.add(user)
        db.commit()
        db.refresh(user)
        return user
