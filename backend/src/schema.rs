// @generated automatically by Diesel CLI.

diesel::table! {
    ai_profiles (id) {
        id -> Integer,
        #[max_length = 255]
        name -> Varchar,
    }
}
