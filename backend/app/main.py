from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from app.core.config import settings
from app.api.v1.api import api_router
from app.db import init_db

# hehehehe
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize SQLite database with seed schema and sample records
    init_db()
    yield


app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="Backend API for CampusConnect - VIT-AP University campus discovery platform",
    lifespan=lifespan,
)

# Set up CORS middleware to allow requests from the React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount the v1 API router
app.include_router(api_router, prefix=settings.API_V1_STR)


@app.get("/", tags=["Root"])
def read_root():
    """
    Root landing endpoint for the backend API.
    """
    return {
        "service": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "docs_url": "/docs",
        "health_check": "/api/health",
        "api_v1": settings.API_V1_STR,
        "message": "Welcome to CampusConnect API",
    }


@app.get("/api/health", tags=["Health"])
@app.get("/health", tags=["Health"])
def health_check():
    """
    Health check endpoint to verify backend operational status.
    """
    return {
        "status": "healthy",
        "service": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "environment": "development",
    }
