use actix_web::web;
use crate::handlers::ping_handler;
use crate::handlers::ai_profile_handler;

pub fn init_routes(cfg: &mut web::ServiceConfig) {
    cfg.service(ping_handler::ping)
        .service(
            web::scope("/ai-profile")
                .service(ai_profile_handler::create)
        );
}