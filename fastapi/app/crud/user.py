from models.user import User
import bcrypt 
from db.base import BaseModel

def get_user(db, user_id: str):
    return User.get_by_id(db, id=user_id)

def get_user_by_email(db, email: str):
    return User.get_by_email(db, email=email)

def get_user_by_phone(db, phone: str):
    return User.get_by_phone(db, phone=phone)

def get_users(db,  **kwargs):    
    return User.get_all_by_page(db, **kwargs)

def create_user(db, user: User):
    password = user.password.encode('utf-8')
    delattr(user, 'password')
    res = User.add(db, **user.__dict__,hashed_password=password)
    print(res)
    return res

def update_user(db, user: User):
   return User.update(db, id=user.id, user=user)

def delete_user(db, user_id: int):
    return User.delete_by_id(db, id=user_id)

def authenticate_user(db, email: str, password: str):
    user = User.get_by_email(db, email=email)
    if not user:
        return False
    if not bcrypt.checkpw(password.encode('utf-8'), user.hashed_password.encode('utf-8')):
        return False
    return user