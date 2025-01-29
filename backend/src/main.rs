use actix_web::{ App, HttpServer, web, http};
use actix_cors::Cors;
use crate::routes::init_routes;
mod handlers;
mod routes;
mod services;
mod schema;
mod models;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let bind_address: String = format!("{}:{}", services::utils::env_service::get("HTTP_HOST"), services::utils::env_service::get("HTTP_PORT"));

    let db_pool = services::config::database::establish_connection();
    let app_db_pool = web::Data::new(db_pool);

    HttpServer::new(move || {
        App::new()
            .app_data(app_db_pool.clone())
            .wrap(
                Cors::default()
                    .allowed_origin(services::utils::env_service::get("HTTP_ALLOW_ORIGIN").as_str())
                    .allowed_methods(vec!["GET", "POST", "PUT", "DELETE"])
                    .allowed_headers(vec![http::header::AUTHORIZATION, http::header::CONTENT_TYPE])
            )
            .service(
                web::scope("/api")
                    .configure(init_routes)
            )
    })
    .bind(bind_address)?
    .run()
    .await
}