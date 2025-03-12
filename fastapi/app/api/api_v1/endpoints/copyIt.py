from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from api import deps
from schemas import copyIt, base
from crud import copyIt as crud_item
import bcrypt
router = APIRouter()

@router.post("/create/item", response_model=copyIt.Item)
def create_item(item: copyIt.ItemCreate, db: Session = Depends(deps.get_db)):
    item = crud_item.create_item(db=db, item=item)
    return item


@router.get("/item", response_model=copyIt.Item)
def get_item(item_id: str, db: Session = Depends(deps.get_db)):
    item = crud_item.get_item(db=db, item_id=item_id)
    if not item:
        raise HTTPException(status_code=404, detail="User not found")
    return item



@router.put("/item/{item_id}", response_model=copyIt.Item)
def update_item(item_id: str, item: copyIt.ItemUpdate, db: Session = Depends(deps.get_db)):
    item_exist = crud_item.get_item(db=db, item_id=item_id)
    if not item_exist:
        raise HTTPException(status_code=404, detail="User not found")
    item = crud_item.update_item(db=db, id=item_id, item=item)
    return item

@router.delete("/item/{item_id}", response_model=copyIt.Item)
def delete_item(item_id: str, db: Session = Depends(deps.get_db)):
    item_exist = crud_item.get_item(db=db, item_id=item_id)
    if not item_exist:
        raise HTTPException(status_code=404, detail="User not found")
    item = crud_item.delete_item(db=db, item_id=item_id)
    return item


@router.post("/items", response_model=copyIt.ItemPaging)
def get_items(item: copyIt.ItemFilter, db: Session = Depends(deps.get_db), ):
    items = crud_item.get_items(db=db, **item.__dict__)
    return items
