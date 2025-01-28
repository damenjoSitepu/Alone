use serde::{Serialize, Deserialize};
use diesel::Queryable;
use diesel::Insertable;

#[derive(Queryable, Insertable, Debug, Serialize, Deserialize)]
#[diesel(table_name = ai_profiles)]
pub struct AiProfile {
    pub id: u32,
    pub name: String
}