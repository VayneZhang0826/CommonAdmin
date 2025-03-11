from pydantic import BaseModel

class Page(BaseModel):
    data: list
    total: int
    page: int
    pageSize: int 