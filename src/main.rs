
use axum::{                                                                                                                                                                      
    extract::{self, Path, Query},  
    routing::{get, post},                                                                                                                                                        
    Json, Router,                        
};       
use minio_rsc::{Minio, provider::StaticProvider, client::PresignedArgs};
use serde::Deserialize;                                                                                                                                                          
use serde_json::{json, Value};                                                                                                                                                   
use sqlx::PgPool;                                                                                                                                                                
use sqlx::{postgres::PgPoolOptions, prelude::FromRow};                                                                                                                           
use std::env;                                                                                                                                                                    
use std::net::SocketAddr;                                                                                                                                                        
use std::result::Result;                                                                                                                                                         
use std::sync::Arc;                                                                                                                                                              
use axum::http::StatusCode;                                                                                                                                                      
use sqlx::types::chrono::Utc; 
use tower_http::cors::{AllowOrigin, CorsLayer};
use axum::http::Method;

#[derive(Debug, Deserialize, FromRow)]
struct Users {
    user_id: Option<uuid::Uuid>,
    email: String,
    name: String,
}


async fn add_users(
    extract::State(pool): extract::State<PgPool>,
    Json(payload): Json<Users>,
) -> Json<Value> {
    let query = "INSERT INTO users (email, name) VALUES ($1, $2) RETURNING *";
    
    let q = sqlx::query_as::<_, Users>(&query)
        	.bind(payload.email)
	.bind(payload.name);
    
    let result = q.fetch_one(&pool).await;

    match result {
        Ok(value) => Json(json!({"res": "sucsess" })), // maybe bad code??
        Err(e) => Json(json!({"res": format!("error: {}", e)}))

    }
}


async fn get_users(
    extract::State(pool): extract::State<PgPool>,
) -> Result<Json<Value>, (StatusCode, String)> {
    let query = "SELECT * FROM users";
    let q = sqlx::query_as::<_, Users>(query);

    let elemints: Vec<Users> = q.fetch_all(&pool).await.map_err(|e| {
        (StatusCode::INTERNAL_SERVER_ERROR, format!("Database error: {}", e))
    })?;

    let res_json: Vec<Value> = elemints.into_iter().map(|elemint| {
        json!({
    	"user_id": elemint.user_id, 
	"email": elemint.email, 
	"name": elemint.name
        })
    }).collect();

    Ok(Json(json!({ "payload": res_json })))
}

#[derive(Debug, Deserialize)]
struct usersuser_idQuery {
    user_id: uuid::Uuid,
}

async fn get_one_usersuser_id(
    extract::State(pool): extract::State<PgPool>,
    match_val: Query<usersuser_idQuery>, // Assuming col is a path parameter
) -> Result<Json<Value>, (StatusCode, String)> {
    let query = format!("SELECT * FROM users WHERE user_id = $1");
    let q = sqlx::query_as::<_, Users>(&query).bind(match_val.user_id.clone()); // todo: fugure out when .conle is needed

    let elemint = q.fetch_optional(&pool).await.map_err(|e| {
        (StatusCode::INTERNAL_SERVER_ERROR, format!("Database err{}", e))
    })?;

    match elemint {
        Some(elemint) => Ok(Json(json!({
            "payload": {
                	"user_id": elemint.user_id, 
	"email": elemint.email, 
	"name": elemint.name, 

            }
        }))),
        None => Err((StatusCode::NOT_FOUND, format!("No record found with user_id = the value"))),
    }
}

#[derive(Debug, Deserialize)]
struct usersemailQuery {
    email: String,
}

async fn get_one_usersemail(
    extract::State(pool): extract::State<PgPool>,
    match_val: Query<usersemailQuery>, // Assuming col is a path parameter
) -> Result<Json<Value>, (StatusCode, String)> {
    let query = format!("SELECT * FROM users WHERE email = $1");
    let q = sqlx::query_as::<_, Users>(&query).bind(match_val.email.clone()); // todo: fugure out when .conle is needed

    let elemint = q.fetch_optional(&pool).await.map_err(|e| {
        (StatusCode::INTERNAL_SERVER_ERROR, format!("Database err{}", e))
    })?;

    match elemint {
        Some(elemint) => Ok(Json(json!({
            "payload": {
                	"user_id": elemint.user_id, 
	"email": elemint.email, 
	"name": elemint.name, 

            }
        }))),
        None => Err((StatusCode::NOT_FOUND, format!("No record found with email = the value"))),
    }
}

#[derive(Debug, Deserialize)]
struct usersnameQuery {
    name: String,
}

async fn get_one_usersname(
    extract::State(pool): extract::State<PgPool>,
    match_val: Query<usersnameQuery>, // Assuming col is a path parameter
) -> Result<Json<Value>, (StatusCode, String)> {
    let query = format!("SELECT * FROM users WHERE name = $1");
    let q = sqlx::query_as::<_, Users>(&query).bind(match_val.name.clone()); // todo: fugure out when .conle is needed

    let elemint = q.fetch_optional(&pool).await.map_err(|e| {
        (StatusCode::INTERNAL_SERVER_ERROR, format!("Database err{}", e))
    })?;

    match elemint {
        Some(elemint) => Ok(Json(json!({
            "payload": {
                	"user_id": elemint.user_id, 
	"email": elemint.email, 
	"name": elemint.name, 

            }
        }))),
        None => Err((StatusCode::NOT_FOUND, format!("No record found with name = the value"))),
    }
}
#[derive(Debug, Deserialize, FromRow)]
struct WaitList {
    username: String,
    email: String,
}


async fn add_wait_list(
    extract::State(pool): extract::State<PgPool>,
    Json(payload): Json<WaitList>,
) -> Json<Value> {
    let query = "INSERT INTO wait_list (username, email) VALUES ($1, $2) RETURNING *";
    
    let q = sqlx::query_as::<_, WaitList>(&query)
        	.bind(payload.username)
	.bind(payload.email);
    
    let result = q.fetch_one(&pool).await;

    match result {
        Ok(value) => Json(json!({"res": "sucsess" })), // maybe bad code??
        Err(e) => Json(json!({"res": format!("error: {}", e)}))

    }
}


async fn get_wait_list(
    extract::State(pool): extract::State<PgPool>,
) -> Result<Json<Value>, (StatusCode, String)> {
    let query = "SELECT * FROM wait_list";
    let q = sqlx::query_as::<_, WaitList>(query);

    let elemints: Vec<WaitList> = q.fetch_all(&pool).await.map_err(|e| {
        (StatusCode::INTERNAL_SERVER_ERROR, format!("Database error: {}", e))
    })?;

    let res_json: Vec<Value> = elemints.into_iter().map(|elemint| {
        json!({
    	"username": elemint.username, 
	"email": elemint.email
        })
    }).collect();

    Ok(Json(json!({ "payload": res_json })))
}

#[derive(Debug, Deserialize)]
struct wait_listusernameQuery {
    username: String,
}

async fn get_one_wait_listusername(
    extract::State(pool): extract::State<PgPool>,
    match_val: Query<wait_listusernameQuery>, // Assuming col is a path parameter
) -> Result<Json<Value>, (StatusCode, String)> {
    let query = format!("SELECT * FROM wait_list WHERE username = $1");
    let q = sqlx::query_as::<_, WaitList>(&query).bind(match_val.username.clone()); // todo: fugure out when .conle is needed

    let elemint = q.fetch_optional(&pool).await.map_err(|e| {
        (StatusCode::INTERNAL_SERVER_ERROR, format!("Database err{}", e))
    })?;

    match elemint {
        Some(elemint) => Ok(Json(json!({
            "payload": {
                	"username": elemint.username, 
	"email": elemint.email, 

            }
        }))),
        None => Err((StatusCode::NOT_FOUND, format!("No record found with username = the value"))),
    }
}

#[derive(Debug, Deserialize)]
struct wait_listemailQuery {
    email: String,
}

async fn get_one_wait_listemail(
    extract::State(pool): extract::State<PgPool>,
    match_val: Query<wait_listemailQuery>, // Assuming col is a path parameter
) -> Result<Json<Value>, (StatusCode, String)> {
    let query = format!("SELECT * FROM wait_list WHERE email = $1");
    let q = sqlx::query_as::<_, WaitList>(&query).bind(match_val.email.clone()); // todo: fugure out when .conle is needed

    let elemint = q.fetch_optional(&pool).await.map_err(|e| {
        (StatusCode::INTERNAL_SERVER_ERROR, format!("Database err{}", e))
    })?;

    match elemint {
        Some(elemint) => Ok(Json(json!({
            "payload": {
                	"username": elemint.username, 
	"email": elemint.email, 

            }
        }))),
        None => Err((StatusCode::NOT_FOUND, format!("No record found with email = the value"))),
    }
}
#[derive(Debug, Deserialize, FromRow)]
struct BataUser {
    user_id: Option<uuid::Uuid>,
    name: String,
    email: String,
    age: i32,
    profile_link: String,
}


async fn add_bata_user(
    extract::State(pool): extract::State<PgPool>,
    Json(payload): Json<BataUser>,
) -> Json<Value> {
    let query = "INSERT INTO bata_user (name, email, age, profile_link) VALUES ($1, $2, $3, $4) RETURNING *";
    
    let q = sqlx::query_as::<_, BataUser>(&query)
        	.bind(payload.name)
	.bind(payload.email)
	.bind(payload.age)
	.bind(payload.profile_link);
    
    let result = q.fetch_one(&pool).await;

    match result {
        Ok(value) => Json(json!({"res": "sucsess" })), // maybe bad code??
        Err(e) => Json(json!({"res": format!("error: {}", e)}))

    }
}


async fn get_bata_user(
    extract::State(pool): extract::State<PgPool>,
) -> Result<Json<Value>, (StatusCode, String)> {
    let query = "SELECT * FROM bata_user";
    let q = sqlx::query_as::<_, BataUser>(query);

    let elemints: Vec<BataUser> = q.fetch_all(&pool).await.map_err(|e| {
        (StatusCode::INTERNAL_SERVER_ERROR, format!("Database error: {}", e))
    })?;

    let res_json: Vec<Value> = elemints.into_iter().map(|elemint| {
        json!({
    	"user_id": elemint.user_id, 
	"name": elemint.name, 
	"email": elemint.email, 
	"age": elemint.age, 
	"profile_link": elemint.profile_link
        })
    }).collect();

    Ok(Json(json!({ "payload": res_json })))
}

#[derive(Debug, Deserialize)]
struct bata_useruser_idQuery {
    user_id: uuid::Uuid,
}

async fn get_one_bata_useruser_id(
    extract::State(pool): extract::State<PgPool>,
    match_val: Query<bata_useruser_idQuery>, // Assuming col is a path parameter
) -> Result<Json<Value>, (StatusCode, String)> {
    let query = format!("SELECT * FROM bata_user WHERE user_id = $1");
    let q = sqlx::query_as::<_, BataUser>(&query).bind(match_val.user_id.clone()); // todo: fugure out when .conle is needed

    let elemint = q.fetch_optional(&pool).await.map_err(|e| {
        (StatusCode::INTERNAL_SERVER_ERROR, format!("Database err{}", e))
    })?;

    match elemint {
        Some(elemint) => Ok(Json(json!({
            "payload": {
                	"user_id": elemint.user_id, 
	"name": elemint.name, 
	"email": elemint.email, 
	"age": elemint.age, 
	"profile_link": elemint.profile_link, 

            }
        }))),
        None => Err((StatusCode::NOT_FOUND, format!("No record found with user_id = the value"))),
    }
}

#[derive(Debug, Deserialize)]
struct bata_usernameQuery {
    name: String,
}

async fn get_one_bata_username(
    extract::State(pool): extract::State<PgPool>,
    match_val: Query<bata_usernameQuery>, // Assuming col is a path parameter
) -> Result<Json<Value>, (StatusCode, String)> {
    let query = format!("SELECT * FROM bata_user WHERE name = $1");
    let q = sqlx::query_as::<_, BataUser>(&query).bind(match_val.name.clone()); // todo: fugure out when .conle is needed

    let elemint = q.fetch_optional(&pool).await.map_err(|e| {
        (StatusCode::INTERNAL_SERVER_ERROR, format!("Database err{}", e))
    })?;

    match elemint {
        Some(elemint) => Ok(Json(json!({
            "payload": {
                	"user_id": elemint.user_id, 
	"name": elemint.name, 
	"email": elemint.email, 
	"age": elemint.age, 
	"profile_link": elemint.profile_link, 

            }
        }))),
        None => Err((StatusCode::NOT_FOUND, format!("No record found with name = the value"))),
    }
}

#[derive(Debug, Deserialize)]
struct bata_useremailQuery {
    email: String,
}

async fn get_one_bata_useremail(
    extract::State(pool): extract::State<PgPool>,
    match_val: Query<bata_useremailQuery>, // Assuming col is a path parameter
) -> Result<Json<Value>, (StatusCode, String)> {
    let query = format!("SELECT * FROM bata_user WHERE email = $1");
    let q = sqlx::query_as::<_, BataUser>(&query).bind(match_val.email.clone()); // todo: fugure out when .conle is needed

    let elemint = q.fetch_optional(&pool).await.map_err(|e| {
        (StatusCode::INTERNAL_SERVER_ERROR, format!("Database err{}", e))
    })?;

    match elemint {
        Some(elemint) => Ok(Json(json!({
            "payload": {
                	"user_id": elemint.user_id, 
	"name": elemint.name, 
	"email": elemint.email, 
	"age": elemint.age, 
	"profile_link": elemint.profile_link, 

            }
        }))),
        None => Err((StatusCode::NOT_FOUND, format!("No record found with email = the value"))),
    }
}

#[derive(Debug, Deserialize)]
struct bata_userageQuery {
    age: i32,
}

async fn get_one_bata_userage(
    extract::State(pool): extract::State<PgPool>,
    match_val: Query<bata_userageQuery>, // Assuming col is a path parameter
) -> Result<Json<Value>, (StatusCode, String)> {
    let query = format!("SELECT * FROM bata_user WHERE age = $1");
    let q = sqlx::query_as::<_, BataUser>(&query).bind(match_val.age.clone()); // todo: fugure out when .conle is needed

    let elemint = q.fetch_optional(&pool).await.map_err(|e| {
        (StatusCode::INTERNAL_SERVER_ERROR, format!("Database err{}", e))
    })?;

    match elemint {
        Some(elemint) => Ok(Json(json!({
            "payload": {
                	"user_id": elemint.user_id, 
	"name": elemint.name, 
	"email": elemint.email, 
	"age": elemint.age, 
	"profile_link": elemint.profile_link, 

            }
        }))),
        None => Err((StatusCode::NOT_FOUND, format!("No record found with age = the value"))),
    }
}

#[derive(Debug, Deserialize)]
struct bata_userprofile_linkQuery {
    profile_link: String,
}

async fn get_one_bata_userprofile_link(
    extract::State(pool): extract::State<PgPool>,
    match_val: Query<bata_userprofile_linkQuery>, // Assuming col is a path parameter
) -> Result<Json<Value>, (StatusCode, String)> {
    let query = format!("SELECT * FROM bata_user WHERE profile_link = $1");
    let q = sqlx::query_as::<_, BataUser>(&query).bind(match_val.profile_link.clone()); // todo: fugure out when .conle is needed

    let elemint = q.fetch_optional(&pool).await.map_err(|e| {
        (StatusCode::INTERNAL_SERVER_ERROR, format!("Database err{}", e))
    })?;

    match elemint {
        Some(elemint) => Ok(Json(json!({
            "payload": {
                	"user_id": elemint.user_id, 
	"name": elemint.name, 
	"email": elemint.email, 
	"age": elemint.age, 
	"profile_link": elemint.profile_link, 

            }
        }))),
        None => Err((StatusCode::NOT_FOUND, format!("No record found with profile_link = the value"))),
    }
}

async fn health() -> String {"healthy".to_string() }

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let db_url = env::var("DATABASE_URL")
     .unwrap_or_else(|_| "postgres://dbuser:p@localhost:1111/data".to_string());
    let pool = PgPoolOptions::new()
        .max_connections(100)
        .connect(&db_url)
        .await?;

    let migrate = sqlx::migrate!("./migrations").run(&pool).await;

    match migrate {
        Ok(_) => println!("Migrations applied successfully."),
        Err(e) => eprintln!("Error applying migrations: {}", e),
    };

    let app = Router::new()
    .route("/health", get(health))
    	.route("/add_users", post(add_users))
	.route("/get_users", get(get_users))
	.route("/get_one_usersuser_id", get(get_one_usersuser_id))
	.route("/get_one_usersemail", get(get_one_usersemail))
	.route("/get_one_usersname", get(get_one_usersname))
	.route("/add_wait_list", post(add_wait_list))
	.route("/get_wait_list", get(get_wait_list))
	.route("/get_one_wait_listusername", get(get_one_wait_listusername))
	.route("/get_one_wait_listemail", get(get_one_wait_listemail))
	.route("/add_bata_user", post(add_bata_user))
	.route("/get_bata_user", get(get_bata_user))
	.route("/get_one_bata_useruser_id", get(get_one_bata_useruser_id))
	.route("/get_one_bata_username", get(get_one_bata_username))
	.route("/get_one_bata_useremail", get(get_one_bata_useremail))
	.route("/get_one_bata_userage", get(get_one_bata_userage))
	.route("/get_one_bata_userprofile_link", get(get_one_bata_userprofile_link))
	.route("/signed-urls/:video_path", get(get_signed_url))

    .layer(
        CorsLayer::new()
            .allow_origin(AllowOrigin::list(vec![
                "http://localhost:3000".parse().unwrap(),
                "https://example.com".parse().unwrap(),
            ]))
            .allow_methods([Method::GET, Method::POST])
            .allow_headers(tower_http::cors::Any)
    )
        .with_state(pool);

    let listener = tokio::net::TcpListener::bind("0.0.0.0:8081").await.unwrap();

    axum::serve(listener, app).await.unwrap();
    Ok(())
}



async fn generate_signed_url(object_key: String) -> Result<String, anyhow::Error> {
    let endpoint = env::var("MINIO_ENDPOINT")
        .unwrap_or_else(|_| "localhost:9001".to_string());
    let access_key = env::var("MINIO_ACCESS_KEY").unwrap_or_else(|_| "minioadmin".to_string());
    let secret_key = env::var("MINIO_SECRET_KEY").unwrap_or_else(|_| "minioadmin".to_string());
    let bucket = env::var("MINIO_BUCKET").unwrap_or_else(|_| "bucket".to_string());
    let endpoint = env::var("MINIO_ENDPOINT").unwrap_or_else(|_| "localhost:9000".to_string());
    let secure = env::var("MINIO_SECURE")
        .map(|s| s.to_lowercase() == "true")
        .unwrap_or(false);

    let provider = StaticProvider::new(&access_key, &secret_key, None);

    let minio = Minio::builder()
        .endpoint(&endpoint)
        .provider(provider)
        .secure(secure)
        .region("us-east-1".to_string())  // Explicitly set region to match MinIO default
        .build()
        .map_err(|e| anyhow::anyhow!("Failed to create MinIO client: {}", e))?;

    let presigned_url = minio
        .presigned_get_object(
            PresignedArgs::new(bucket, object_key)
                .expires(3600),  // 1 hour in seconds
        )
        .await
        .map_err(|e| anyhow::anyhow!("Failed to generate presigned URL: {}", e))?;
    Ok(presigned_url)
}
    
use axum::response::IntoResponse;

async fn get_signed_url(
    Path(video_path): Path<String>,
) -> impl IntoResponse {
    let object_key = video_path; 
    println!("Environment variables:");
    println!("MINIO_ENDPOINT: {}", env::var("MINIO_ENDPOINT").unwrap_or_else(|_| "not set".to_string()));
    println!("MINIO_BUCKET: {}", env::var("MINIO_BUCKET").unwrap_or_else(|_| "not set, using default 'test'".to_string()));
    
    match generate_signed_url(object_key).await {
        Ok(url) => (StatusCode::OK, url).into_response(),
        Err(e) => {
            eprintln!("Error generating signed URL: {}", e);
            (StatusCode::INTERNAL_SERVER_ERROR, format!("Failed to generate signed URL: {}", e)).into_response()
        }
    }
}
async fn upload_video(
    // mut multipart: Multipart,
) -> Result<Json<Value>, (StatusCode, String)> {
    let provider = StaticProvider::new("minioadmin", "minioadmin", None);
    let minio = Minio::builder()
        .endpoint("minio:9000")
        .provider(provider)
        .secure(false)
        .build()
        .unwrap();

        let _data = "hello minio";

        let upload_result = minio.put_object("bucket", "file.txt", _data.into()).await;
        
        return Ok(Json(json!({
            "status": upload_result.is_ok(),
            "message": if upload_result.is_ok() {
                "File uploaded successfully"
            } else {
                "Failed to upload file"
            },
            "file_name": "file.txt"
        })));
}
    