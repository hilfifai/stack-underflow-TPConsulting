use sqlx::PgPool;
use crate::models::{User, Question, Comment, QuestionStatus};
use uuid::Uuid;
use bcrypt::hash;
use jsonwebtoken::{encode, Header, EncodingKey};
use chrono::{Duration, Utc};
use std::collections::HashMap;

pub struct AuthService;

impl AuthService {
    pub async fn login(
        pool: &PgPool,
        username: &str,
        password: &str,
        secret: &str,
    ) -> Result<(String, User), String> {
        let user = UserRepository::find_by_username(pool, username)
            .await
            .ok_or("Invalid username or password")?;

        if !bcrypt::verify(password, &user.password) {
            return Err("Invalid username or password".to_string());
        }

        let token = Self::generate_jwt(&user, secret)?;
        Ok((token, user))
    }

    pub async fn register(
        pool: &PgPool,
        username: &str,
        password: &str,
    ) -> Result<User, String> {
        if UserRepository::find_by_username(pool, username).await.is_some() {
            return Err("Username already exists".to_string());
        }

        let hashed = hash(password, 4).map_err(|_| "Hashing error")?;
        Ok(UserRepository::create(pool, username, &hashed).await)
    }

    pub fn verify_token(token: &str, secret: &str) -> Result<HashMap<String, String>, String> {
        jsonwebtoken::decode::<HashMap<String, String>>(
            token,
            &EncodingKey::from_secret(secret.as_bytes()),
            &jsonwebtoken::Validation::default(),
        )
        .map(|data| data.claims)
        .map_err(|_| "Invalid token".to_string())
    }

    fn generate_jwt(user: &User, secret: &str) -> Result<String, String> {
        let mut claims = HashMap::new();
        claims.insert("userId".to_string(), user.id.to_string());
        claims.insert("username".to_string(), user.username.clone());
        claims.insert("exp".to_string(), (Utc::now() + Duration::hours(24)).timestamp().to_string());

        encode(&Header::default(), &claims, &EncodingKey::from_secret(secret.as_bytes()))
            .map_err(|_| "Token generation error".to_string())
    }
}

pub struct QuestionService;

impl QuestionService {
    pub async fn create(
        pool: &PgPool,
        title: &str,
        description: &str,
        status: QuestionStatus,
        user_id: Uuid,
        username: &str,
    ) -> Question {
        QuestionRepository::create(pool, title, description, status, user_id, username).await
    }

    pub async fn get_all(pool: &PgPool) -> Vec<Question> {
        QuestionRepository::find_all(pool).await
    }

    pub async fn get_by_id(pool: &PgPool, id: Uuid) -> Option<Question> {
        QuestionRepository::find_by_id(pool, id).await
    }

    pub async fn update(
        pool: &PgPool,
        id: Uuid,
        title: &str,
        description: &str,
        status: QuestionStatus,
        user_id: Uuid,
    ) -> Result<Question, String> {
        let existing = QuestionRepository::find_by_id(pool, id)
            .await
            .ok_or("Question not found")?;

        if existing.user_id != user_id {
            return Err("You can only edit your own questions".to_string());
        }

        QuestionRepository::update(pool, id, title, description, status)
            .await
            .ok_or("Update failed".to_string())
    }

    pub async fn delete(pool: &PgPool, id: Uuid, user_id: Uuid) -> Result<(), String> {
        let existing = QuestionRepository::find_by_id(pool, id)
            .await
            .ok_or("Question not found")?;

        if existing.user_id != user_id {
            return Err("You can only delete your own questions".to_string());
        }

        if QuestionRepository::delete(pool, id).await {
            Ok(())
        } else {
            Err("Delete failed".to_string())
        }
    }
}

pub struct CommentService;

impl CommentService {
    pub async fn create(
        pool: &PgPool,
        content: &str,
        question_id: Uuid,
        user_id: Uuid,
        username: &str,
    ) -> Comment {
        CommentRepository::create(pool, content, question_id, user_id, username).await
    }

    pub async fn get_by_question_id(pool: &PgPool, question_id: Uuid) -> Vec<Comment> {
        CommentRepository::find_by_question_id(pool, question_id).await
    }

    pub async fn delete(pool: &PgPool, id: Uuid) -> Result<(), String> {
        if CommentRepository::delete(pool, id).await {
            Ok(())
        } else {
            Err("Comment not found".to_string())
        }
    }
}

use crate::repositories::{UserRepository, QuestionRepository, CommentRepository};
