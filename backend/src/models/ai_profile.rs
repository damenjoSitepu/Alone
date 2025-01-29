use serde::{Serialize, Deserialize};
use diesel::Queryable;
use diesel::Insertable;
use crate::schema::ai_profiles;
#[derive(Queryable, Debug, Serialize, Deserialize)]
#[diesel(table_name = ai_profiles)]
pub struct AiProfile {
    pub id: u32,
    pub name: String
}

#[derive(Insertable, Serialize, Deserialize)]
#[diesel(table_name = ai_profiles)]
pub struct AiProfileCreateRequest {
    pub name: String
}