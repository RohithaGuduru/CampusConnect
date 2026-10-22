import sqlite3
import json
import os

DB_PATH = os.path.join(os.path.dirname(__file__), "campusconnect.db")

def get_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_connection()
    cursor = conn.cursor()

    # Spaces table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS spaces (
        id TEXT PRIMARY KEY,
        block TEXT NOT NULL,
        room_number TEXT NOT NULL,
        floor TEXT NOT NULL,
        capacity INTEGER NOT NULL,
        ac_type TEXT NOT NULL,
        wifi_quality TEXT NOT NULL,
        purpose TEXT NOT NULL,
        status TEXT NOT NULL,
        available_from TEXT NOT NULL,
        available_until TEXT NOT NULL,
        confirmations INTEGER NOT NULL DEFAULT 0,
        trusted_contributors INTEGER NOT NULL DEFAULT 0,
        accurate_reporters INTEGER NOT NULL DEFAULT 0,
        verified_ago TEXT NOT NULL,
        tags TEXT NOT NULL,
        warning_title TEXT,
        warning_sub TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    """)

    # Events table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS events (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        organizer TEXT NOT NULL,
        venue TEXT NOT NULL,
        date_time TEXT NOT NULL,
        seats_left INTEGER NOT NULL,
        is_free INTEGER NOT NULL DEFAULT 1,
        category TEXT NOT NULL,
        tags TEXT NOT NULL,
        registration_link TEXT,
        stage_info TEXT NOT NULL,
        badge_time TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    """)

    # Food spots table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS food_spots (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        location TEXT NOT NULL,
        delivery_info TEXT NOT NULL,
        open_till TEXT NOT NULL,
        is_featured INTEGER NOT NULL DEFAULT 1,
        rating REAL NOT NULL,
        taste_rating REAL NOT NULL,
        hygiene_rating REAL NOT NULL,
        speed_mins INTEGER NOT NULL,
        price_tier TEXT NOT NULL,
        student_combo TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    """)

    # Marketplace table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS marketplace_items (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        seller_name TEXT NOT NULL,
        price INTEGER NOT NULL,
        tag_label TEXT NOT NULL,
        status TEXT NOT NULL,
        pickup_location TEXT NOT NULL,
        item_subtitle TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    """)

    # Profile table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS profile (
        id TEXT PRIMARY KEY,
        display_name TEXT NOT NULL,
        trust_score INTEGER NOT NULL,
        rank_title TEXT NOT NULL,
        next_milestone TEXT NOT NULL,
        progress_percent INTEGER NOT NULL,
        rooms_reported INTEGER NOT NULL,
        rooms_verified INTEGER NOT NULL,
        accurate_reports INTEGER NOT NULL,
        disputes INTEGER NOT NULL,
        badges TEXT NOT NULL
    )
    """)

    # Seed data if spaces table is empty
    cursor.execute("SELECT COUNT(*) FROM spaces")
    if cursor.fetchone()[0] == 0:
        seed_spaces = [
            (
                "space-1",
                "AB2",
                "AB2 — Room 304",
                "Floor 3 · AB2",
                40,
                "AC",
                "Good Wi-Fi",
                "Study / Project",
                "highly_likely",
                "1:45 PM",
                "4:00 PM",
                8,
                5,
                3,
                "4m ago",
                json.dumps(["AC", "Good Wi-Fi", "Cap: 40", "Study / Project"]),
                None,
                None,
            ),
            (
                "space-2",
                "AB1",
                "AB1 — Room 208",
                "Floor 2 · AB1",
                60,
                "AC",
                "Excellent Wi-Fi",
                "Group Study",
                "highly_likely",
                "2:00 PM",
                "5:30 PM",
                12,
                7,
                4,
                "6m ago",
                json.dumps(["AC", "Excellent Wi-Fi", "Cap: 60", "Projector & Board", "Group Study"]),
                None,
                None,
            ),
            (
                "space-3",
                "CB",
                "CB — Lab 201",
                "Floor 2 · Central Block",
                60,
                "Central AC",
                "Gigabit LAN",
                "Project / Coding",
                "probably",
                "Now",
                "5:30 PM (Lab prep starts 5:45)",
                6,
                4,
                2,
                "12m ago",
                json.dumps(["Central AC", "Gigabit LAN", "Outlets Every Desk", "Cap: 60", "Project / Coding"]),
                None,
                None,
            ),
            (
                "space-4",
                "AB1",
                "AB1 — Seminar Hall 102",
                "Floor 1 · AB1",
                90,
                "High Cap AC",
                "Good Wi-Fi",
                "Meeting / Workshop",
                "highly_likely",
                "1:15 PM",
                "3:30 PM",
                9,
                6,
                2,
                "9m ago",
                json.dumps(["High Cap AC", "Good Wi-Fi", "Cap: 90", "Meeting / Workshop"]),
                None,
                None,
            ),
            (
                "space-5",
                "AB2",
                "AB2 — Room 412",
                "Floor 4 · AB2",
                35,
                "Non-AC / Fans",
                "Average Wi-Fi",
                "Relax / Reading",
                "unverified",
                "Now",
                "6:00 PM",
                2,
                1,
                0,
                "18m ago",
                json.dumps(["Non-AC / Fans", "Average Wi-Fi", "Cap: 35", "Relax / Reading"]),
                None,
                None,
            ),
            (
                "space-6",
                "CB",
                "CB — Room 305",
                "Floor 3 · Central Block",
                45,
                "AC",
                "Good Wi-Fi",
                "Short Study",
                "occupied_soon",
                "Now",
                "2:30 PM (15m remaining)",
                14,
                0,
                0,
                "2m ago",
                json.dumps(["AC", "Good Wi-Fi", "Cap: 45", "Short Study"]),
                "Lecture scheduled at 2:30 PM (15m remaining)",
                "14 confirmed room being occupied by incoming batch · Last updated 2m ago",
            ),
        ]
        cursor.executemany("""
            INSERT INTO spaces (
                id, block, room_number, floor, capacity, ac_type, wifi_quality,
                purpose, status, available_from, available_until, confirmations,
                trusted_contributors, accurate_reporters, verified_ago, tags,
                warning_title, warning_sub
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, seed_spaces)

    # Seed events
    cursor.execute("SELECT COUNT(*) FROM events")
    if cursor.fetchone()[0] == 0:
        seed_events = [
            (
                "event-1",
                "AI Ignite Hackathon 2025",
                "ACM Student Chapter",
                "Sarvepalli Radhakrishnan Hall",
                "Happening Today · 3:00 PM",
                34,
                1,
                "Technical & AI",
                json.dumps(["Technical & AI", "Free Certificate"]),
                "https://vitap.ac.in",
                "SR Auditorium - Stage 1",
                "ACM Student Chapter · Free Club Event",
            ),
            (
                "event-2",
                "RoboWars Championship Prep",
                "Robotics & Automation Society",
                "Central Block Quadrangle",
                "Tomorrow · 5:30 PM",
                18,
                1,
                "Robotics & Hardware",
                json.dumps(["Hardware", "Workshop"]),
                "https://vitap.ac.in",
                "AB2 Makerspace",
                "Hands-on Sensor & Motor Tuning",
            ),
        ]
        cursor.executemany("""
            INSERT INTO events (
                id, title, organizer, venue, date_time, seats_left, is_free,
                category, tags, registration_link, stage_info, badge_time
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, seed_events)

    # Seed food spots
    cursor.execute("SELECT COUNT(*) FROM food_spots")
    if cursor.fetchone()[0] == 0:
        seed_food = [
            (
                "food-1",
                "Sri Krishna Kitchen",
                "Inavolu Road",
                "20 mins delivery to Gate 2",
                "Open till 1:30 AM",
                1,
                4.8,
                4.9,
                4.7,
                20,
                "₹₹",
                "Student Combo: 15% off Biryani & Paneer Bowls",
            ),
            (
                "food-2",
                "Southern Feast & Tiffins",
                "Beside Health Centre",
                "10 mins counter takeaway",
                "Open till 11:00 PM",
                0,
                4.6,
                4.8,
                4.6,
                10,
                "₹",
                "Evening Special: Dosa combo with hot filter coffee",
            ),
        ]
        cursor.executemany("""
            INSERT INTO food_spots (
                id, name, location, delivery_info, open_till, is_featured,
                rating, taste_rating, hygiene_rating, speed_mins, price_tier, student_combo
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, seed_food)

    # Seed marketplace items
    cursor.execute("SELECT COUNT(*) FROM marketplace_items")
    if cursor.fetchone()[0] == 0:
        seed_marketplace = [
            (
                "market-1",
                "Handmade Soy Wax Candles",
                "Campus Crafts",
                199,
                "Student Creator Drop",
                "In Stock",
                "Pickup at Ladies Hostel 2 drop point or Rock Plaza",
                "By Campus Crafts · B.Tech CSE Sophomore",
            ),
            (
                "market-2",
                "Casio fx-991EX Scientific Calc",
                "Senior Scholar",
                650,
                "Pre-Owned Gear",
                "Available",
                "Central Library main entrance handoff",
                "By Final Year Mech · Flawless Condition",
            ),
        ]
        cursor.executemany("""
            INSERT INTO marketplace_items (
                id, title, seller_name, price, tag_label, status, pickup_location, item_subtitle
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """, seed_marketplace)

    # Seed profile
    cursor.execute("SELECT COUNT(*) FROM profile")
    if cursor.fetchone()[0] == 0:
        cursor.execute("""
            INSERT INTO profile (
                id, display_name, trust_score, rank_title, next_milestone,
                progress_percent, rooms_reported, rooms_verified, accurate_reports,
                disputes, badges
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            "user-1",
            "Anonymous Student",
            94,
            "Campus Helper (Tier 4)",
            "Campus Legend (100). Your reports are automatically marked as High Confidence!",
            82,
            14,
            38,
            12,
            0,
            json.dumps(["First Reporter", "Campus Helper", "Trusted Contributor"]),
        ))

    conn.commit()
    conn.close()
