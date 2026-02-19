mod models;
mod repositories;
mod services;
mod handlers;

use actix_web::{web, App, HttpServer};
use actix_cors::Cors;
use sqlx::postgres::PgPoolOptions;
use std::env;
use dotenv::dotenv;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok();
    env_logger::init();

    let database_url = env::var("DATABASE_URL")
        .unwrap_or("postgres://postgres:password@localhost:5432/stackunderflow".to_string());
    let jwt_secret = env::var("JWT_SECRET")
        .unwrap_or("your-super-secret-key-minimum-32-characters".to_string());
    let server_addr = env::var("SERVER_ADDR")
        .unwrap_or("0.0.0.0:8080".to_string());

    let pool = PgPoolOptions::new()
        .max_connections(5)
        .connect(&database_url)
        .await
        .expect("Failed to connect to database");

    println!("Connected to database");
    println!("Server running at http://{}", server_addr);

    HttpServer::new(move || {
        App::new()
            .wrap(Cors::permissive())
            .app_data(web::Data::new(pool.clone()))
            .app_data(web::Data::new(jwt_secret.clone()))
            .service(
                web::scope("/api/v1")
                    .route("/auth/login", web::post().to(handlers::login))
                    .route("/auth/register", web::post().to(handlers::register))
                    .route("/questions", web::post().to(handlers::create_question))
                    .route("/questions", web::get().to(handlers::get_all_questions))
                    .route("/questions/{id}", web::get().to(handlers::get_question))
                    .route("/questions/{id}", web::put().to(handlers::update_question))
                    .route("/questions/{id}", web::delete().to(handlers::delete_question))
                    .route("/comments", web::post().to(handlers::create_comment))
                    .route("/comments/question/{question_id}", web::get().to(handlers::get_comments_by_question))
                    .route("/comments/{id}", web::delete().to(handlers::delete_comment))
            )
    })
    .bind(&server_addr)?
    .run()
    .await
}
