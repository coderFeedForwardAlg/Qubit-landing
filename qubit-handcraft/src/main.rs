
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
struct Waitlist {
    user_id: Option<uuid::Uuid>,
    username: String,
    email: String,
}


async fn add_waitlist(
    extract::State(pool): extract::State<PgPool>,
    Json(payload): Json<Waitlist>,
) -> Json<Value> {
    let query = "INSERT INTO waitlist (username, email) VALUES ($1, $2) RETURNING *";
    
    let q = sqlx::query_as::<_, Waitlist>(&query)
        	.bind(payload.username)
	.bind(payload.email);
    
    let result = q.fetch_one(&pool).await;

    match result {
        Ok(value) => Json(json!({"res": "sucsess" })), // maybe bad code??
        Err(e) => Json(json!({"res": format!("error: {}", e)}))

    }
}


async fn get_waitlist(
    extract::State(pool): extract::State<PgPool>,
) -> Result<Json<Value>, (StatusCode, String)> {
    let query = "SELECT * FROM waitlist";
    let q = sqlx::query_as::<_, Waitlist>(query);

    let elemints: Vec<Waitlist> = q.fetch_all(&pool).await.map_err(|e| {
        (StatusCode::INTERNAL_SERVER_ERROR, format!("Database error: {}", e))
    })?;

    let res_json: Vec<Value> = elemints.into_iter().map(|elemint| {
        json!({
    	"user_id": elemint.user_id, 
	"username": elemint.username, 
	"email": elemint.email
        })
    }).collect();

    Ok(Json(json!({ "payload": res_json })))
}

#[derive(Debug, Deserialize)]
struct waitlistuser_idQuery {
    user_id: uuid::Uuid,
}

async fn get_one_waitlistuser_id(
    extract::State(pool): extract::State<PgPool>,
    match_val: Query<waitlistuser_idQuery>, // Assuming col is a path parameter
) -> Result<Json<Value>, (StatusCode, String)> {
    let query = format!("SELECT * FROM waitlist WHERE user_id = $1");
    let q = sqlx::query_as::<_, Waitlist>(&query).bind(match_val.user_id.clone()); // todo: fugure out when .conle is needed

    let elemint = q.fetch_optional(&pool).await.map_err(|e| {
        (StatusCode::INTERNAL_SERVER_ERROR, format!("Database err{}", e))
    })?;

    match elemint {
        Some(elemint) => Ok(Json(json!({
            "payload": {
                	"user_id": elemint.user_id, 
	"username": elemint.username, 
	"email": elemint.email, 

            }
        }))),
        None => Err((StatusCode::NOT_FOUND, format!("No record found with user_id = the value"))),
    }
}

#[derive(Debug, Deserialize)]
struct waitlistusernameQuery {
    username: String,
}

async fn get_one_waitlistusername(
    extract::State(pool): extract::State<PgPool>,
    match_val: Query<waitlistusernameQuery>, // Assuming col is a path parameter
) -> Result<Json<Value>, (StatusCode, String)> {
    let query = format!("SELECT * FROM waitlist WHERE username = $1");
    let q = sqlx::query_as::<_, Waitlist>(&query).bind(match_val.username.clone()); // todo: fugure out when .conle is needed

    let elemint = q.fetch_optional(&pool).await.map_err(|e| {
        (StatusCode::INTERNAL_SERVER_ERROR, format!("Database err{}", e))
    })?;

    match elemint {
        Some(elemint) => Ok(Json(json!({
            "payload": {
                	"user_id": elemint.user_id, 
	"username": elemint.username, 
	"email": elemint.email, 

            }
        }))),
        None => Err((StatusCode::NOT_FOUND, format!("No record found with username = the value"))),
    }
}

#[derive(Debug, Deserialize)]
struct waitlistemailQuery {
    email: String,
}

async fn get_one_waitlistemail(
    extract::State(pool): extract::State<PgPool>,
    match_val: Query<waitlistemailQuery>, // Assuming col is a path parameter
) -> Result<Json<Value>, (StatusCode, String)> {
    let query = format!("SELECT * FROM waitlist WHERE email = $1");
    let q = sqlx::query_as::<_, Waitlist>(&query).bind(match_val.email.clone()); // todo: fugure out when .conle is needed

    let elemint = q.fetch_optional(&pool).await.map_err(|e| {
        (StatusCode::INTERNAL_SERVER_ERROR, format!("Database err{}", e))
    })?;

    match elemint {
        Some(elemint) => Ok(Json(json!({
            "payload": {
                	"user_id": elemint.user_id, 
	"username": elemint.username, 
	"email": elemint.email, 

            }
        }))),
        None => Err((StatusCode::NOT_FOUND, format!("No record found with email = the value"))),
    }
}

async fn health() -> String {"healthy".to_string() }

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let db_url = env::var("DATABASE_URL")
     .unwrap_or_else(|_| "postgres://dbuser:p@localhost:1112/data".to_string());
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
    	.route("/add_waitlist", post(add_waitlist))
	.route("/get_waitlist", get(get_waitlist))
	.route("/get_one_waitlistuser_id", get(get_one_waitlistuser_id))
	.route("/get_one_waitlistusername", get(get_one_waitlistusername))
	.route("/get_one_waitlistemail", get(get_one_waitlistemail))

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

    let listener = tokio::net::TcpListener::bind("0.0.0.0:8082").await.unwrap();

    axum::serve(listener, app).await.unwrap();
    Ok(())
}



