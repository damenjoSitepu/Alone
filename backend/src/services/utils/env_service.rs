use std::env;

pub fn get(key: &str) -> String {
    dotenv::dotenv().ok();
    env::var(key).unwrap_or_else(|_| "".to_string())
}