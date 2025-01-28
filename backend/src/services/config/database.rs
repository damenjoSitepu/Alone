use diesel::r2d2::{self, ConnectionManager};
use diesel::mysql::MysqlConnection;
use crate::services::utils::env_service;

pub type DbPool = r2d2::Pool<ConnectionManager<MysqlConnection>>;

pub fn establish_connection() -> DbPool {
    let database_url = env_service::get("DATABASE_URL");
    let manager = ConnectionManager::<MysqlConnection>::new(database_url);
    r2d2::Pool::builder()
        .build(manager)
        .expect("Failed to create pool.")
}
