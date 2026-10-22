from fastapi import APIRouter
from app.api.v1.spaces import router as spaces_router
from app.api.v1.events import router as events_router
from app.api.v1.food import router as food_router
from app.api.v1.marketplace import router as marketplace_router
from app.api.v1.profile import router as profile_router

api_router = APIRouter()

api_router.include_router(spaces_router, prefix="/spaces", tags=["Spaces"])
api_router.include_router(events_router, prefix="/events", tags=["Events"])
api_router.include_router(food_router, prefix="/food", tags=["Food"])
api_router.include_router(marketplace_router, prefix="/marketplace", tags=["Marketplace"])
api_router.include_router(profile_router, prefix="/profile", tags=["Profile"])
