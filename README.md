# CampusConnect — VIT-AP University

> Student-focused campus discovery platform built with **React**, **TypeScript**, **Tailwind CSS**, and **Python FastAPI**.
> Tagline: *"Your campus. Your space. Your time."*

*Disclaimer: CampusConnect – VITAP is an independent, student-focused campus discovery platform built by students for students. All room availability data is community-reported. It is not an official university administration service.*

---

## 🎨 Visual Design System & Modules

Follows the reference design system with pixel-level fidelity:
- **Colour Palette**: Deep indigo/purple (`#2E25D2`, `#3E32E8`), soft lavender backgrounds (`#F8F9FE`, `#ECEBFE`), dark navy typography, clean white cards with subtle borders.
- **Header**: HUB badge, brand name, VIT-AP pill, navigation links with active states, live API status, and prominent `+ Report Empty Space` button.
- **Page 1: Homepage Hero**: Live campus pulse badge, *"Your campus. Your space. Your time."* heading, search bar with quick filters (`AB1 Rooms`, `AB2 3rd Floor`, `Coding Events`, `Late Night Food`, `Used Textbooks`), and 5 feature cards in a row.
- **Page 2: Active Classrooms & Study Spaces**: Real-time available spaces directory with search and 4 dropdown filters (Block, Floor, AC, Confidence), Purpose chips (`All`, `Study`, `Group Study`, `Project`, `Meeting / Workshop`, `Relax`), interactive legend, 3-column room cards with `I'm Here — Confirm`, `Report Occupied`, and modal `+ Report Empty Space` form.
- **Page 3: What's Happening Right Now?**: Real-time stream with category tabs (`All Live`, `Events Today`, `Food Spots`, `Student Drops`) featuring hackathon cards with registration, featured food partners with ratings and combo discounts, and student marketplace creator drops.
- **Page 4: CampusConnect Contributor Hub**: Role-based portals for **Student Hub** (trust score 94/100, Campus Helper Tier 4, milestone progress bar, badges, contribution counters, action buttons), **Verified Club Portal**, **Restaurant & Kitchen Portal**, and **Admin & Moderation Console**.
- **Page 5: How Community Verification Works**: 3 numbered step cards and 4 information columns covering 3 academic blocks, zero sensors needed, dynamic confidence scoring, and accountable moderation.
- **Footer**: 4 columns (Brand & Operational Status, Campus Modules, Campus Navigation, Community & Trust) and independent disclaimer strip.

---

## 🏗 Project Structure

```text
CampusConnect/
├── backend/
│   ├── .venv/               # Isolated Python virtual environment
│   ├── app/
│   │   ├── __init__.py
│   │   ├── core/
│   │   │   ├── __init__.py
│   │   │   └── config.py    # CORS origins and app configuration
│   │   ├── api/
│   │   │   └── v1/
│   │   │       ├── api.py   # Aggregated API router
│   │   │       ├── spaces.py       # Spaces endpoints (list, report, confirm, occupy)
│   │   │       ├── events.py       # Club events endpoints
│   │   │       ├── food.py         # Food spots endpoints
│   │   │       ├── marketplace.py  # Student marketplace endpoints
│   │   │       └── profile.py      # Student profile & trust score endpoints
│   │   ├── db.py            # SQLite database manager & initial seed data
│   │   └── main.py          # FastAPI application entrypoint with Lifespan & CORS
│   ├── requirements.txt     # Python backend dependencies
│   └── test_health.py       # API and unit test script
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.tsx                      # Header matching Screenshot 5
│   │   │   ├── HeroSection.tsx                 # Hero & 5 Feature Cards matching Screenshot 5
│   │   │   ├── SpacesSection.tsx               # Classrooms Directory matching Screenshot 4
│   │   │   ├── LiveHappeningsSection.tsx       # Live Stream matching Screenshot 3
│   │   │   ├── ContributorHubSection.tsx       # Contributor Hub matching Screenshot 2
│   │   │   ├── VerificationExplainerSection.tsx# Community Verification matching Screenshot 1
│   │   │   ├── Footer.tsx                      # 4-Column Footer matching Screenshot 1
│   │   │   ├── ReportSpaceModal.tsx            # Vacant space reporting modal
│   │   │   └── ListItemModal.tsx               # Marketplace listing modal
│   │   ├── services/
│   │   │   ├── api.ts       # Frontend API service layer with backend endpoints & fallback
│   │   │   └── demoData.ts  # Separated demo data matching reference screenshots
│   │   ├── types.ts         # TypeScript models
│   │   ├── App.tsx          # Root React application
│   │   ├── main.tsx         # DOM entrypoint
│   │   └── index.css        # Base styling and Tailwind directives
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js   # Tailored brand purple and lavender color palette
│   ├── tsconfig.json
│   └── vite.config.ts       # Vite proxy config to FastAPI (:8000)
└── README.md
```

---

## 🚀 Running the Project Locally

You will need **two terminal windows**:

### 1. Run the FastAPI Backend

```bash
cd /Users/rohithaguduru/Desktop/CampusConnect/backend

# Activate virtual environment
source .venv/bin/activate

# Run FastAPI with auto-reload
uvicorn app.main:app --reload --port 8000
```

- API Base: `http://localhost:8000`
- Interactive Swagger Docs: `http://localhost:8000/docs`
- Health Endpoint: `http://localhost:8000/api/health`
- Spaces API: `http://localhost:8000/api/v1/spaces`

---

### 2. Run the React Frontend

```bash
cd /Users/rohithaguduru/Desktop/CampusConnect/frontend

# Start Vite dev server
npm run dev
```

- Web UI: Open `http://localhost:5173` in your browser.
- Vite automatically proxies `/api` requests to `http://localhost:8000`.
- If the backend is running, the header badge will indicate **"API Live"**. If not, the application automatically runs in seamless local mode using the screenshot demo data.
