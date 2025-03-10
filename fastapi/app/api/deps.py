from sqlalchemy.orm import Session
from app.db.session import get_db

def get_db() -> Generator:
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()