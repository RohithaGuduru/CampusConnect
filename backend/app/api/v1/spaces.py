from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel, Field
from typing import Optional, List
import json
import uuid
from app.db import get_connection

router = APIRouter()


class SpaceReportCreate(BaseModel):
    block: str = Field(..., description="Academic Block: AB1, AB2, or CB")
    floor: str = Field(..., description="e.g. Floor 1, Floor 2, Floor 3, Floor 4")
    room_number: str = Field(..., description="Room identifier e.g. AB2-304 or CB-201")
    capacity: int = Field(default=40, ge=1, le=500)
    ac_type: str = Field(default="AC", description="AC, Central AC, Non-AC / Fans")
    wifi_quality: str = Field(default="Good Wi-Fi")
    purpose: str = Field(default="Study / Project")
    available_from: str = Field(default="Now")
    available_until: str = Field(default="5:00 PM")
    notes: Optional[str] = None


@router.get("", response_model=List[dict])
def list_spaces(
    block: Optional[str] = None,
    floor: Optional[str] = None,
    purpose: Optional[str] = None,
    confidence: Optional[str] = None,
    search: Optional[str] = None,
):
    conn = get_connection()
    cursor = conn.cursor()

    query = "SELECT * FROM spaces WHERE 1=1"
    params = []

    if block and block.upper() != "ALL":
        query += " AND block = ?"
        params.append(block.upper())

    if floor and floor != "All Floors":
        query += " AND floor LIKE ?"
        params.append(f"%{floor}%")

    if purpose and purpose != "All":
        query += " AND purpose LIKE ?"
        params.append(f"%{purpose}%")

    if confidence and confidence != "All":
        if confidence in ["highly_likely", "Highest Confidence"]:
            query += " AND status = 'highly_likely'"
        elif confidence in ["probably", "Probably"]:
            query += " AND status = 'probably'"
        elif confidence in ["unverified", "Unverified"]:
            query += " AND status = 'unverified'"

    if search:
        search_term = f"%{search.lower()}%"
        query += " AND (LOWER(room_number) LIKE ? OR LOWER(block) LIKE ? OR LOWER(purpose) LIKE ? OR LOWER(floor) LIKE ?)"
        params.extend([search_term, search_term, search_term, search_term])

    query += " ORDER BY confirmations DESC, created_at DESC"

    cursor.execute(query, params)
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
def report_empty_space(payload: SpaceReportCreate):
    conn = get_connection()
    cursor = conn.cursor()

    new_id = f"space-{uuid.uuid4().hex[:8]}"
    full_room_name = (
        payload.room_number 
        if payload.block in payload.room_number 
        else f"{payload.block} — {payload.room_number}"
    )
    floor_label = f"{payload.floor} · {payload.block}"

    tags = [payload.ac_type, payload.wifi_quality, f"Cap: {payload.capacity}", payload.purpose]

    cursor.execute("""
        INSERT INTO spaces (
            id, block, room_number, floor, capacity, ac_type, wifi_quality,
            purpose, status, available_from, available_until, confirmations,
            trusted_contributors, accurate_reporters, verified_ago, tags,
            warning_title, warning_sub
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        new_id,
        payload.block.upper(),
        full_room_name,
        floor_label,
        payload.capacity,
        payload.ac_type,
        payload.wifi_quality,
        payload.purpose,
        "unverified",  # Newly reported starts unverified until peer confirmed
        payload.available_from,
        payload.available_until,
        1,  # initial report counts as 1
        1,
        0,
        "Just now",
        json.dumps(tags),
        None,
        None,
    ))

    # Also update profile metrics for the student reporter
    cursor.execute("""
        UPDATE profile 
        SET rooms_reported = rooms_reported + 1, 
            trust_score = MIN(100, trust_score + 1)
        WHERE id = 'user-1'
    """)

    conn.commit()
    conn.close()

    return {
        "status": "success",
        "message": f"Successfully reported {full_room_name}. Thank you for helping the campus!",
        "space_id": new_id,
    }


@router.post("/{space_id}/confirm")
def confirm_space(space_id: str):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM spaces WHERE id = ?", (space_id,))
    row = cursor.fetchone()
    if not row:
        conn.close()
        raise HTTPException(status_code=404, detail="Space not found")

    new_confirmations = row["confirmations"] + 1
    new_status = row["status"]

    # Dynamic status evolution: unverified -> probably (at 3) -> highly_likely (at 6)
    if new_status == "unverified" and new_confirmations >= 3:
        new_status = "probably"
    elif new_status == "probably" and new_confirmations >= 6:
        new_status = "highly_likely"

    cursor.execute("""
        UPDATE spaces
        SET confirmations = ?, status = ?, verified_ago = 'Just now'
        WHERE id = ?
    """, (new_confirmations, new_status, space_id))

    # Update profile metric: rooms_verified
    cursor.execute("""
        UPDATE profile 
        SET rooms_verified = rooms_verified + 1,
            trust_score = MIN(100, trust_score + 1)
        WHERE id = 'user-1'
    """)

    conn.commit()
    conn.close()

    return {
        "status": "success",
        "message": "Availability confirmed! Your peer check helps everyone on campus.",
        "confirmations": new_confirmations,
        "current_status": new_status,
    }


@router.post("/{space_id}/occupy")
def report_occupied(space_id: str):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM spaces WHERE id = ?", (space_id,))
    row = cursor.fetchone()
    if not row:
        conn.close()
        raise HTTPException(status_code=404, detail="Space not found")

    cursor.execute("""
        UPDATE spaces
        SET status = 'occupied_soon',
            verified_ago = 'Just now',
            warning_title = 'Class in session / Occupied',
            warning_sub = 'Community member reported room taken'
        WHERE id = ?
    """, (space_id,))

    conn.commit()
    conn.close()

    return {
        "status": "success",
        "message": "Room reported as occupied. Updated status for fellow students.",
        "space_id": space_id,
        "current_status": "occupied_soon",
    }
