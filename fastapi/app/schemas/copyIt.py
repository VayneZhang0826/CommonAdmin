from pydantic import BaseModel, validator
from typing import Optional, Union

class ItemBase(BaseModel):
    name: str
    email: Union[str, None]
    phone: Union[str, None]
    
class ItemCreate(ItemBase):
    password: str

class ItemUpdate(ItemBase):
    pass

class ItemInDBBase(ItemBase):
    id: str
    create_at: Optional[int] = None
    update_at: Optional[int] = None
    class Config:
        orm_mode = True

class Item(ItemInDBBase):
    pass

class ItemInDB(ItemInDBBase):
    hashed_password: str

class ItemFilter(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    pageSize: Optional[int] = 10
    page: Optional[int] = 1


class ItemPaging(BaseModel):
    total: int
    data: list[Item]
    page: int
    pageSize: int