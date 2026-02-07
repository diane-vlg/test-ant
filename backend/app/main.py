from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import analysis

app = FastAPI(
    title="Police Interview Risk Classification API",
    description="API for analyzing police interview transcripts specifically for risk assessment.",
    version="0.1.0"
)

# CORS Configuration
origins = [
    "http://localhost:5173", # Vite Frontend
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Police Interview Risk Classification API is running."}

app.include_router(analysis.router, prefix="/api/v1", tags=["analysis"])
