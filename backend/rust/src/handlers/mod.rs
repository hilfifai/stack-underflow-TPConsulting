use actix_web::{web, HttpResponse, Responder};
use serde::{Deserialize, Serialize};
use sqlx::PgPool;
use crate::services::{AuthService, QuestionService, CommentService};
use crate::models::QuestionStatus;
use uuid::Uuid;

#[derive(Deserialize)]
pub struct LoginRequest {
    username: String,
    password: String,
}

#[derive(Serialize)]
pub struct TokenResponse {
    access_token: String,
    token_type: String,
    user: UserResponse,
}

#[derive(Serialize)]
pub struct UserResponse {
    id: String,
    username: String,
}

#[derive(Deserialize)]
pub struct RegisterRequest {
    username: String,
    password: String,
}

#[derive(Deserialize)]
pub struct QuestionCreateRequest {
    title: String,
    description: String,
    status: Option<QuestionStatus>,
}

#[derive(Deserialize)]
pub struct QuestionUpdateRequest {
    title: String,
    description: String,
    status: QuestionStatus,
}

#[derive(Deserialize)]
pub struct CommentCreateRequest {
    content: String,
    question_id: Uuid,
}

#[derive(Serialize)]
pub struct SuccessResponse<T> {
    success: bool,
    message: String,
    data: Option<T>,
}

pub async fn login(
    pool: web::Data<PgPool>,
    body: web::Json<LoginRequest>,
    secret: web::Data<String>,
) -> impl Responder {
    match AuthService::login(&pool, &body.username, &body.password, &secret).await {
        Ok((token, user)) => HttpResponse::Ok().json(SuccessResponse {
            success: true,
            message: "Login successful".to_string(),
            data: Some(TokenResponse {
                access_token: token,
                token_type: "bearer".to_string(),
                user: UserResponse {
                    id: user.id.to_string(),
                    username: user.username,
                },
            }),
        }),
        Err(msg) => HttpResponse::Unauthorized().json(SuccessResponse {
            success: false,
            message: msg,
            data: None,
        }),
    }
}

pub async fn register(
    pool: web::Data<PgPool>,
    body: web::Json<RegisterRequest>,
) -> impl Responder {
    match AuthService::register(&pool, &body.username, &body.password).await {
        Ok(user) => HttpResponse::Created().json(SuccessResponse {
            success: true,
            message: "Registration successful".to_string(),
            data: Some(UserResponse {
                id: user.id.to_string(),
                username: user.username,
            }),
        }),
        Err(msg) => HttpResponse::BadRequest().json(SuccessResponse {
            success: false,
            message: msg,
            data: None,
        }),
    }
}

pub async fn create_question(
    pool: web::Data<PgPool>,
    body: web::Json<QuestionCreateRequest>,
    user_id: web::Data<Uuid>,
    username: web::Data<String>,
) -> impl Responder {
    let question = QuestionService::create(
        &pool,
        &body.title,
        &body.description,
        body.status.unwrap_or(QuestionStatus::OPEN),
        *user_id,
        &username,
    )
    .await;

    HttpResponse::Created().json(SuccessResponse {
        success: true,
        message: "Question created successfully".to_string(),
        data: Some(question),
    })
}

pub async fn get_all_questions(pool: web::Data<PgPool>) -> impl Responder {
    let questions = QuestionService::get_all(&pool).await;
    HttpResponse::Ok().json(SuccessResponse {
        success: true,
        message: "Success get all questions".to_string(),
        data: Some(questions),
    })
}

pub async fn get_question(pool: web::Data<PgPool>, id: web::Path<Uuid>) -> impl Responder {
    match QuestionService::get_by_id(&pool, *id).await {
        Some(question) => HttpResponse::Ok().json(SuccessResponse {
            success: true,
            message: "Success get question".to_string(),
            data: Some(question),
        }),
        None => HttpResponse::NotFound().json(SuccessResponse {
            success: false,
            message: "Question not found".to_string(),
            data: None,
        }),
    }
}

pub async fn update_question(
    pool: web::Data<PgPool>,
    id: web::Path<Uuid>,
    body: web::Json<QuestionUpdateRequest>,
    user_id: web::Data<Uuid>,
) -> impl Responder {
    match QuestionService::update(
        &pool,
        *id,
        &body.title,
        &body.description,
        body.status,
        *user_id,
    )
    .await
    {
        Ok(question) => HttpResponse::Ok().json(SuccessResponse {
            success: true,
            message: "Question updated successfully".to_string(),
            data: Some(question),
        }),
        Err(msg) => HttpResponse::BadRequest().json(SuccessResponse {
            success: false,
            message: msg,
            data: None,
        }),
    }
}

pub async fn delete_question(
    pool: web::Data<PgPool>,
    id: web::Path<Uuid>,
    user_id: web::Data<Uuid>,
) -> impl Responder {
    match QuestionService::delete(&pool, *id, *user_id).await {
        Ok(()) => HttpResponse::Ok().json(SuccessResponse {
            success: true,
            message: "Question deleted successfully".to_string(),
            data: None,
        }),
        Err(msg) => HttpResponse::BadRequest().json(SuccessResponse {
            success: false,
            message: msg,
            data: None,
        }),
    }
}

pub async fn create_comment(
    pool: web::Data<PgPool>,
    body: web::Json<CommentCreateRequest>,
    user_id: web::Data<Uuid>,
    username: web::Data<String>,
) -> impl Responder {
    let comment = CommentService::create(
        &pool,
        &body.content,
        body.question_id,
        *user_id,
        &username,
    )
    .await;

    HttpResponse::Created().json(SuccessResponse {
        success: true,
        message: "Comment created successfully".to_string(),
        data: Some(comment),
    })
}

pub async fn get_comments_by_question(
    pool: web::Data<PgPool>,
    question_id: web::Path<Uuid>,
) -> impl Responder {
    let comments = CommentService::get_by_question_id(&pool, *question_id).await;
    HttpResponse::Ok().json(SuccessResponse {
        success: true,
        message: "Success get comments".to_string(),
        data: Some(comments),
    })
}

pub async fn delete_comment(
    pool: web::Data<PgPool>,
    id: web::Path<Uuid>,
) -> impl Responder {
    match CommentService::delete(&pool, *id).await {
        Ok(()) => HttpResponse::Ok().json(SuccessResponse {
            success: true,
            message: "Comment deleted successfully".to_string(),
            data: None,
        }),
        Err(msg) => HttpResponse::BadRequest().json(SuccessResponse {
            success: false,
            message: msg,
            data: None,
        }),
    }
}
