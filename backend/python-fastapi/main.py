from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.auth.routes import router as auth_router
from routes.question.routes import router as question_router
from routes.comment.routes import router as comment_router
from config.database import engine, Base
from dotenv import load_dotenv

load_dotenv()

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="StackUnderflow API",
    description="Q&A Platform API - FastAPI",
    version="1.0.0"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Health check
@app.get("/health")
def health_check():
    return {"status": "healthy"}

# Routes
app.include_router(auth_router, prefix="/api/v1/auth")
app.include_router(question_router, prefix="/api/v1/questions")
app.include_router(comment_router, prefix="/api/v1/comments")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
