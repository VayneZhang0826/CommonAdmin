from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from api import deps
from schemas import user, base
from crud import user as crud_user
import bcrypt
router = APIRouter()

@router.post("/create/user", response_model=user.User)
def create_user(user: user.UserCreate, db: Session = Depends(deps.get_db)):
    if not user.password:
        raise HTTPException(status_code=400, detail="Password is required")
    if not user.email and not user.phone:
        raise HTTPException(status_code=400, detail="Email or Phone is required")
    if not user.name:
        raise HTTPException(status_code=400, detail="Name is required")
    email = user.email
    phone = user.phone
    user_exist = None
    if email:
        user_exist = crud_user.get_user_by_email(db=db, email=email)
    elif phone:
        user_exist = crud_user.get_user_by_phone(db=db, phone=phone)
    if user_exist:
        raise HTTPException(status_code=400, detail="User already registered")
    user.password = bcrypt.hashpw(user.password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    user = crud_user.create_user(db=db, user=user)
    return user

# @router.post("/login", response_model=user.Token)
# def login(user: user.UserLogin, db: Session = Depends(deps.get_db)):
#     user_exist = crud_user.get_user_by_email(db=db, email=user.email)
#     if not user_exist:
#         raise HTTPException(status_code=400, detail="Invalid email or password")
#     if not bcrypt.checkpw(user.password.encode('utf-8'), user_exist.password.encode('utf-8')):
#         raise HTTPException(status_code=400, detail="Invalid email or password")
#     return user_exist

@router.get("/user", response_model=user.User)
def get_user(user_id: str, db: Session = Depends(deps.get_db)):
    user = crud_user.get_user(db=db, user_id=user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user



# @router.put("/user/{user_id}", response_model=user.User)
# def update_user(user_id: int, user: user.UserUpdate, db: Session = Depends(deps.get_db)):
    # user_exist = crud_user.get_user(db=db, user_id=user_id)
    # if not user_exist:
    #     raise HTTPException(status_code=404, detail="User not found")
    # user = crud_user.update_user(db=db, user=user, user_id=user_id)
    # return user

@router.delete("/user/{user_id}", response_model=user.User)
def delete_user(user_id: str, db: Session = Depends(deps.get_db)):
    user_exist = crud_user.get_user(db=db, user_id=user_id)
    if not user_exist:
        raise HTTPException(status_code=404, detail="User not found")
    user = crud_user.delete_user(db=db, user_id=user_id)
    return user


@router.post("/users", response_model=user.UserPaging)
def get_users(user: user.UserFilter, db: Session = Depends(deps.get_db), ):
    users = crud_user.get_users(db=db, **user.__dict__)
    return users
