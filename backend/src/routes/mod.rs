use actix_web::web;
use crate::handlers::ping_handler;

pub fn init_routes(cfg: &mut web::ServiceConfig) {
    cfg.service(ping_handler::ping);
}