use actix_web::{ App, HttpServer, middleware::DefaultHeaders, web};
use crate::routes::init_routes;
mod handlers;
mod routes;
mod services;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let bind_address: String = format!("{}:{}", services::utils::env_service::get("HTTP_HOST"), services::utils::env_service::get("HTTP_PORT"));

    let db_pool = services::config::database::establish_connection();
    let app_db_pool = web::Data::new(db_pool);

    HttpServer::new(move || {
        App::new()
            .app_data(app_db_pool.clone())
            .wrap(
                DefaultHeaders::new()
                    .add(("Access-Control-Allow-Origin", services::utils::env_service::get("HTTP_ALLOW_ORIGIN")))
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