use actix_web::{post, web, HttpResponse, Responder};
use diesel::RunQueryDsl;
use crate::services::config::database::DbPool;
use crate::schema::ai_profiles::dsl::*;
use crate::models::ai_profile::{self};

#[post("")]
pub async fn create(pool: web::Data<DbPool>, req: web::Json<Vec<String>>) -> impl Responder {
    let mut conn = pool.get().expect("couldn't get db connection from pool");
    
    diesel::insert_into(ai_profiles)
        .values(
            ai_profile::AiProfileCreateRequest {
                name: req[0].clone(),
            }
        )
        .execute(&mut conn)
        .expect("Error inserting AI profile");

    HttpResponse::Ok().json(vec!["AI Profile created successfully."])
}