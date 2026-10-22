from fastapi import APIRouter
from pydantic import BaseModel, Field
from typing import Optional, List
import json
import uuid
from app.db import get_connection

router = APIRouter()


class ClubEventCreate(BaseModel):
    title: str = Field(..., description="Event title")
    organizer: str = Field(..., description="Club or chapter name")
    venue: str = Field(..., description="Hall / Lab / Room")
    date_time: str = Field(..., description="e.g. This Saturday · 2:00 PM")
    category: str = Field(default="Technical & AI")
    description: Optional[str] = None
    registration_link: Optional[str] = "https://vitap.ac.in"


@router.get("", response_model=List[dict])
def list_events():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM events ORDER BY created_at DESC")
    rows = cursor.fetchall()
    conn.close()

    results = []
    for row in rows:
        item = dict(row)
        try:
            item["tags"] = json.loads(item["tags"])
        except Exception:
            item["tags"] = []
        results.append(item)
    return results


@router.post("", status_code=201)
def create_event(payload: ClubEventCreate):
    conn = get_connection()
    cursor = conn.cursor()

    new_id = f"event-{uuid.uuid4().hex[:8]}"
    tags = [payload.category, "Club Event"]

    cursor.execute("""
        INSERT INTO events (
            id, title, organizer, venue, date_time, seats_left, is_free,
            category, tags, registration_link, stage_info, badge_time
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        new_id,
        payload.title,
        payload.organizer,
        payload.venue,
        payload.date_time,
        50,
        1,
        payload.category,
        json.dumps(tags),
        payload.registration_link,
        f"{payload.venue} - Main Stage",
        f"{payload.organizer} · Verified Club",
    ))

    conn.commit()
    conn.close()

    return {
        "status": "success",
        "message": f"Event '{payload.title}' published successfully to CampusConnect!",
        "event_id": new_id,
    }
