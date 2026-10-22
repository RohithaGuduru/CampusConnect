from fastapi import APIRouter
import json
from app.db import get_connection

router = APIRouter()


@router.get("", response_model=dict)
def get_student_profile():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM profile WHERE id = 'user-1'")
    row = cursor.fetchone()
    conn.close()

    if not row:
        return {
            "display_name": "Anonymous Student",
            "trust_score": 94,
            "rank_title": "Campus Helper (Tier 4)",
            "next_milestone": "Campus Legend (100). Your reports are automatically marked as High Confidence!",
            "progress_percent": 82,
            "rooms_reported": 14,
            "rooms_verified": 38,
            "accurate_reports": 12,
            "disputes": 0,
            "badges": ["First Reporter", "Campus Helper", "Trusted Contributor"],
        }

    data = dict(row)
    try:
        data["badges"] = json.loads(data["badges"])
    except Exception:
        data["badges"] = []
    return data
