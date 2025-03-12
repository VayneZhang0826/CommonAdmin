from sqlalchemy import create_engine, Column, Integer, String, Sequence
from sqlalchemy.ext.declarative import declarative_base
import uuid
import time
from schemas.base import Page
# 创建基类
Base = declarative_base()

class BaseModel(Base):
    __abstract__ = True

    id = Column(String(50), primary_key=True, default=lambda: str(uuid.uuid4()))
    create_at = Column(Integer, default=0)

    # 添加数据
    @classmethod
    def add(cls, session, **kwargs):
        instance = cls(**kwargs)
        instance.create_at = int(time.time())  # 创建时间戳
        session.add(instance)
        session.commit()
        return instance

    # 更新数据
    @classmethod
    def update(cls, session, id, **kwargs):
        instance = cls.get_by_id(session, id)
        if instance:
            for key, value in kwargs.items():
                if value and hasattr(instance, key):
                    setattr(instance, key, value)
            instance.update_at = int(time.time())  # 更新时间戳
            session.commit()
        return instance

    # 查询所有数据
    @classmethod
    def get_all(cls, session):
        return session.query(cls).all()

    # 分页查询
    @classmethod
    def get_all_by_page(cls, session, **kwargs):
        page = kwargs.get('page', 1) - 1 
        pageSize = kwargs.get('pageSize', 10)
        query = session.query(cls)
        if 'sort_key' in kwargs.keys():
           if 'sort_dir' in kwargs.keys():
               match kwargs['sort_dir']:
                  case 'asc':
                     query = query.order_by(getattr(cls, kwargs['sort_key']).asc())
                     pass  
                  case 'desc':
                     query = query.order_by(getattr(cls, kwargs['sort_key']).desc())
                     pass
                  case None:
                     query = query.order_by(cls.create_at.desc())
               delattr(kwargs, 'sort_dir')
           else:
                query = query.order_by(cls.create_at.desc())
           delattr(kwargs, 'sort_key')
        else:
            query = query.order_by(cls.create_at.desc())
        # 添加过滤条件
        for key, value in kwargs.items():
            if hasattr(cls, key) and value and key != 'page' and key != 'pageSize':
                query = query.filter(getattr(cls, key) == value)
            data = query.offset(page).limit(pageSize).all()
        return Page(data=data, total=query.count(), page=page + 1, pageSize=pageSize)


    # 根据ID查询数据
    @classmethod
    def get_by_id(cls, session, id):
        return session.query(cls).filter_by(id=id).first()

    # 根据ID删除数据
    @classmethod
    def delete_by_id(cls, session, id):
        instance = cls.get_by_id(session, id)
        if instance:
            session.delete(instance)
            session.commit()

class BaseModelMixin(BaseModel):
    __abstract__ = True
    update_at = Column(Integer, default=0)