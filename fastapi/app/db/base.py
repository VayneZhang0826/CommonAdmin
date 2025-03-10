from app.db.base_class import Base
from app.models.user import User
from sqlalchemy import create_engine, Column, Integer, String, Sequence
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# 创建数据库引擎
engine = create_engine('sqlite:///:memory:', echo=True)

# 创建基类
Base = declarative_base()

# 创建Session类
Session = sessionmaker(bind=engine)

class BaseModel(Base):
    __abstract__ = True

    id = Column(Integer, primary_key=True, autoincrement=True)

    @classmethod
    def add(cls, session, **kwargs):
        instance = cls(**kwargs)
        session.add(instance)
        session.commit()
        return instance

    @classmethod
    def get_all(cls, session):
        return session.query(cls).all()

    @classmethod
    def get_by_id(cls, session, id):
        return session.query(cls).filter_by(id=id).first()

    @classmethod
    def delete_by_id(cls, session, id):
        instance = cls.get_by_id(session, id)
        if instance:
            session.delete(instance)
            session.commit()

# 定义用户表
class User(BaseModel):
    __tablename__ = 'users'
    name = Column(String(50))
    age = Column(Integer)

    def __repr__(self):
        return f"<User(name='{self.name}', age='{self.age}')>"

# 定义产品表
class Product(BaseModel):
    __tablename__ = 'products'
    name = Column(String(50))
    price = Column(Integer)

    def __repr__(self):
        return f"<Product(name='{self.name}', price='{self.price}')>"

# 创建所有表
Base.metadata.create_all(engine)

# 示例用法
if __name__ == "__main__":
    session = Session()

    # 添加用户
    user1 = User.add(session, name='Alice', age=30)
    user2 = User.add(session, name='Bob', age=25)

    # 添加产品
    product1 = Product.add(session, name='Laptop', price=1000)
    product2 = Product.add(session, name='Phone', price=500)

    # 查询所有用户
    users = User.get_all(session)
    print(users)

    # 查询所有产品
    products = Product.get_all(session)
    print(products)

    # 根据ID查询用户
    user = User.get_by_id(session, user1.id)
    print(user)

    # 根据ID删除用户
    User.delete_by_id(session, user2.id)

    # 查询所有用户
    users = User.get_all(session)
    print(users)