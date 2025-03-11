from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import pymysql

SQLALCHEMY_DATABASE_URL = "mysql+pymysql://root:root@localhost:3306/test?charset=utf8"

engine = create_engine(SQLALCHEMY_DATABASE_URL, echo=True, future=True)
connect = engine.connect()
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()