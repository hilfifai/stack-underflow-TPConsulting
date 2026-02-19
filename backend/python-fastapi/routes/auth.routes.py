from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from schemas.schemas import LoginRequest, RegisterRequest, TokenResponse, UserData
from services.auth.service import AuthService
from config.database import get_db

router = APIRouter()


@router.post("/login", response_model=TokenResponse)
def login(request: LoginRequest, db: Session = Depends(get_db)):
    result = AuthService.login(db, request.username, request.password)
    if not result:
        raise HTTPException(status_code=401, detail="Invalid username or password")
    return result


@router.get("/data", response_model=UserData)
def get_user_data(authorization: str, db: Session = Depends(get_db)):
    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid authorization header")
    token = authorization.split(" ")[1]
    user_data = AuthService.get_user_data(db, token)
    if not user_data:
        raise HTTPException(status_code=401, detail="Invalid token")
    return user_data


@router.post("/register")
def register(request: RegisterRequest, db: Session = Depends(get_db)):
    result = AuthService.register(db, request.username, request.password)
    if not result:
        raise HTTPException(status_code=400, detail="Username already exists")
    return {"success": True, "message": "Registration successful", "data": result}
