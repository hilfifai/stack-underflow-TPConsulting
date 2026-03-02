from sqlalchemy.orm import Session
from repositories.user.repository import UserRepository
from passlib.context import CryptContext
from jose import jwt
from datetime import datetime, timedelta
from dotenv import load_dotenv
import os

load_dotenv()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
SECRET_KEY = os.getenv("SECRET_KEY", "your-secret-key")
ALGORITHM = os.getenv("ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 1440))


class AuthService:
    @staticmethod
    def verify_password(plain_password: str, hashed_password: str) -> bool:
        return pwd_context.verify(plain_password, hashed_password)

    @staticmethod
    def get_password_hash(password: str) -> str:
        return pwd_context.hash(password)

    @staticmethod
    def create_access_token(data: dict) -> str:
        to_encode = data.copy()
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        to_encode.update({"exp": expire})
        return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

    @staticmethod
    def login(db: Session, username: str, password: str):
        user = UserRepository.find_by_username(db, username)
        if not user or not AuthService.verify_password(password, user.password):
            return None
        
        token = AuthService.create_access_token(
            data={"userId": user.id, "username": user.username}
        )
        return {
            "access_token": token,
            "token_type": "bearer",
            "user": {"id": user.id, "username": user.username}
        }

    @staticmethod
    def get_user_data(db: Session, token: str):
        try:
            payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
            return payload
        except Exception:
            return None

    @staticmethod
    def register(db: Session, username: str, password: str):
        existing_user = UserRepository.find_by_username(db, username)
        if existing_user:
            return None
        
        hashed_password = AuthService.get_password_hash(password)
        user = UserRepository.create(db, username, hashed_password)
        return {"id": user.id, "username": user.username}
