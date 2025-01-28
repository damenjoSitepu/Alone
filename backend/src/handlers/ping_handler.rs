use actix_web::{HttpResponse, Responder, get};

#[get("/ping")]
pub async fn ping() -> impl Responder {
    let response = vec![
        "pong",
    ];

    HttpResponse::Ok().json(response)
}