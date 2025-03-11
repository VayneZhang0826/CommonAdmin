from pydantic import BaseModel, validator
from typing import Optional, Union

class UserBase(BaseModel):
    name: str
    email: Union[str, None]
    phone: Union[str, None]
    
class UserCreate(UserBase):
    password: str

class UserInDBBase(UserBase):
    id: str
    create_at: Optional[int] = None
    update_at: Optional[int] = None
    class Config:
        orm_mode = True

class User(UserInDBBase):
    pass

class UserInDB(UserInDBBase):
    hashed_password: str

class UserFilter(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    pageSize: Optional[int] = 10
    page: Optional[int] = 1


class UserPaging(BaseModel):
    total: int
    data: list[User]
    page: int
    pageSize: int