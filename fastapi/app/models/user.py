from sqlalchemy import Column, Integer, String
from db.base import *
import time

class User(BaseModelMixin):
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

class UserSession(BaseModel):
    __tablename__ = "user_session"
    user_id = Column(String, index=True)
    token = Column(String, index=True)
    expire_at = Column(Integer, index=True)

    @classmethod
    def get_user_by_token(cls, session, token):
        user_session = session.query(cls).filter(cls.token == token).first()
        now = int(time.time())
        if user_session is None or user_session.expire_at < now:
            return None
        user = User.get_by_id(session, user_session.user_id)
        return user