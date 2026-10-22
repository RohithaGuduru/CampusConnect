from app.main import health_check, read_root
from app.db import init_db
from app.api.v1.spaces import list_spaces, confirm_space

def test_endpoints():
    init_db()
    health = health_check()
    assert health["status"] == "healthy"
    print("Health check endpoint test PASSED:", health)

    spaces = list_spaces()
    assert len(spaces) >= 6
    print(f"Spaces endpoint test PASSED with {len(spaces)} spaces.")

    first_id = spaces[0]["id"]
    confirm_res = confirm_space(first_id)
    assert confirm_res["status"] == "success"
    print("Confirm space endpoint test PASSED:", confirm_res)

if __name__ == "__main__":
    test_endpoints()
