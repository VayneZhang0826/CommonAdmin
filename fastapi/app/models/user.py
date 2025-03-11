from sqlalchemy import Column, Integer, String
from db.base import BaseModel

class User(BaseModel):
    __tablename__ = "user"
    name = Column(String, index=True)
    phone = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)

    @classmethod
    def get_by_email(cls, session, email):
        return session.query(cls).filter(cls.email == email).first()

    @classmethod
    def get_by_phone(cls, session, phone):
        return session.query(cls).filter(cls.phone == phone).first()