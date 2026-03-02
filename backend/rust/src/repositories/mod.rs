use sqlx::PgPool;
use crate::models::{User, Question, Comment, QuestionStatus};
use uuid::Uuid;

pub struct UserRepository;

impl UserRepository {
    pub async fn find_by_username(pool: &PgPool, username: &str) -> Option<User> {
        sqlx::query_as!(User, "SELECT * FROM users WHERE username = $1", username)
            .fetch_one(pool)
            .await
            .ok()
    }

    pub async fn find_by_id(pool: &PgPool, id: Uuid) -> Option<User> {
        sqlx::query_as!(User, "SELECT * FROM users WHERE id = $1", id)
            .fetch_one(pool)
            .await
            .ok()
    }

    pub async fn create(pool: &PgPool, username: &str, password: &str) -> User {
        let user = sqlx::query_as!(
            User,
            "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *",
            username,
            password
        )
        .fetch_one(pool)
        .await
        .unwrap()
    }
}

pub struct QuestionRepository;

impl QuestionRepository {
    pub async fn create(
        pool: &PgPool,
        title: &str,
        description: &str,
        status: QuestionStatus,
        user_id: Uuid,
        username: &str,
    ) -> Question {
        sqlx::query_as!(
            Question,
            "INSERT INTO questions (title, description, status, user_id, username) VALUES ($1, $2, $3::question_status, $4, $5) RETURNING *",
            title,
            description,
            format!("{}", status) as _,
            user_id,
            username
        )
        .fetch_one(pool)
        .await
        .unwrap()
    }

    pub async fn find_all(pool: &PgPool) -> Vec<Question> {
        sqlx::query_as!(Question, "SELECT * FROM questions ORDER BY created_at DESC")
            .fetch_all(pool)
            .await
            .unwrap()
    }

    pub async fn find_by_id(pool: &PgPool, id: Uuid) -> Option<Question> {
        sqlx::query_as!(Question, "SELECT * FROM questions WHERE id = $1", id)
            .fetch_one(pool)
            .await
            .ok()
    }

    pub async fn update(
        pool: &PgPool,
        id: Uuid,
        title: &str,
        description: &str,
        status: QuestionStatus,
    ) -> Option<Question> {
        sqlx::query_as!(
            Question,
            "UPDATE questions SET title = $1, description = $2, status = $3::question_status WHERE id = $4 RETURNING *",
            title,
            description,
            format!("{}", status) as _,
            id
        )
        .fetch_one(pool)
        .await
        .ok()
    }

    pub async fn delete(pool: &PgPool, id: Uuid) -> bool {
        sqlx::query!("DELETE FROM questions WHERE id = $1", id)
            .execute(pool)
            .await
            .is_ok()
    }
}

pub struct CommentRepository;

impl CommentRepository {
    pub async fn create(
        pool: &PgPool,
        content: &str,
        question_id: Uuid,
        user_id: Uuid,
        username: &str,
    ) -> Comment {
        sqlx::query_as!(
            Comment,
            "INSERT INTO comments (content, question_id, user_id, username) VALUES ($1, $2, $3, $4) RETURNING *",
            content,
            question_id,
            user_id,
            username
        )
        .fetch_one(pool)
        .await
        .unwrap()
    }

    pub async fn find_by_question_id(pool: &PgPool, question_id: Uuid) -> Vec<Comment> {
        sqlx::query_as!(Comment, "SELECT * FROM comments WHERE question_id = $1 ORDER BY created_at ASC", question_id)
            .fetch_all(pool)
            .await
            .unwrap()
    }

    pub async fn delete(pool: &PgPool, id: Uuid) -> bool {
        sqlx::query!("DELETE FROM comments WHERE id = $1", id)
            .execute(pool)
            .await
            .is_ok()
    }
}
