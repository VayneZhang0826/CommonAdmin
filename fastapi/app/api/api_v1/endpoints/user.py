from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app import crud, models, schemas
from app.api import deps

router = APIRouter()

@router.post("/", response_model=schemas.User)
def create_user(user_in: schemas.UserCreate, db: Session = Depends(deps.get_db)):
    user = crud.user.create_user(db=db, user=user_in)
    return user