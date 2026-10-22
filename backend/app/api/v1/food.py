from fastapi import APIRouter
from pydantic import BaseModel, Field
from typing import Optional, List
import uuid
from app.db import get_connection

router = APIRouter()


class FoodSpotCreate(BaseModel):
    name: str
    location: str
    delivery_info: str = "20 mins delivery to Gate 2"
    open_till: str = "Open till 1:00 AM"
    price_tier: str = "₹₹"
    student_combo: str = "10% Student Discount with campus ID"


@router.get("", response_model=List[dict])
def list_food_spots():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM food_spots ORDER BY rating DESC")
    rows = cursor.fetchall()
    conn.close()
    return [dict(row) for row in rows]


@router.post("", status_code=201)
def create_food_spot(payload: FoodSpotCreate):
    conn = get_connection()
    cursor = conn.cursor()
    new_id = f"food-{uuid.uuid4().hex[:8]}"

    cursor.execute("""
        INSERT INTO food_spots (
            id, name, location, delivery_info, open_till, is_featured,
            rating, taste_rating, hygiene_rating, speed_mins, price_tier, student_combo
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        new_id,
        payload.name,
        payload.location,
        payload.delivery_info,
        payload.open_till,
        0,
        4.5,
        4.6,
        4.5,
        25,
        payload.price_tier,
        payload.student_combo,
    ))

    conn.commit()
    conn.close()

    return {
        "status": "success",
        "message": f"Food partner '{payload.name}' updated successfully!",
        "food_id": new_id,
    }
