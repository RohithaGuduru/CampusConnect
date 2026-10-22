from fastapi import APIRouter
from pydantic import BaseModel, Field
from typing import Optional, List
import uuid
from app.db import get_connection

router = APIRouter()


class MarketplaceItemCreate(BaseModel):
    title: str
    price: int = Field(..., ge=0)
    seller_name: str = "Campus Student"
    tag_label: str = "Student Listing"
    pickup_location: str = "Hostel Quadrangle or Rock Plaza"
    item_subtitle: str = "Pre-owned student item in great condition"


@router.get("", response_model=List[dict])
def list_marketplace_items():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM marketplace_items ORDER BY created_at DESC")
    rows = cursor.fetchall()
    conn.close()
    return [dict(row) for row in rows]


@router.post("", status_code=201)
def create_marketplace_item(payload: MarketplaceItemCreate):
    conn = get_connection()
    cursor = conn.cursor()
    new_id = f"market-{uuid.uuid4().hex[:8]}"

    cursor.execute("""
        INSERT INTO marketplace_items (
            id, title, seller_name, price, tag_label, status, pickup_location, item_subtitle
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        new_id,
        payload.title,
        payload.seller_name,
        payload.price,
        payload.tag_label,
        "In Stock",
        payload.pickup_location,
        payload.item_subtitle,
    ))

    conn.commit()
    conn.close()

    return {
        "status": "success",
        "message": f"Item '{payload.title}' listed on CampusConnect Marketplace!",
        "item_id": new_id,
    }
