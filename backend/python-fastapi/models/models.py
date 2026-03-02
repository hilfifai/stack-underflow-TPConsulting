from sqlalchemy import Column, String, DateTime, Text, Enum as SQLEnum, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
import enum
from config.database import Base


class QuestionStatus(str, enum.Enum):
    OPEN = "OPEN"
    ANSWERED = "ANSWERED"
    CLOSED = "CLOSED"


class User(Base):
    __tablename__ = "users"

    id = Column(String(36), primary_key=True, index=True)
    username = Column(String(50), unique=True, index=True, nullable=False)
    password = Column(String(255), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    questions = relationship("Question", back_populates="user", cascade="all, delete-orphan")
    comments = relationship("Comment", back_populates="user", cascade="all, delete-orphan")


class Question(Base):
    __tablename__ = "questions"

    id = Column(String(36), primary_key=True, index=True)
    title = Column(String(500), nullable=False)
    description = Column(Text, nullable=False)
    status = Column(SQLEnum(QuestionStatus), default=QuestionStatus.OPEN)
    user_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"))
    username = Column(String(50))
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = relationship("User", back_populates="questions")
    comments = relationship("Comment", back_populates="question", cascade="all, delete-orphan")


class Comment(Base):
    __tablename__ = "comments"

    id = Column(String(36), primary_key=True, index=True)
    content = Column(Text, nullable=False)
    question_id = Column(String(36), ForeignKey("questions.id", ondelete="CASCADE"))
    user_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"))
    username = Column(String(50))
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    question = relationship("Question", back_populates="comments")
    user = relationship("User", back_populates="comments")
