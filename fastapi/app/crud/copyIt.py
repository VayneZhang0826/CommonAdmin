from models.copyIt import Item

def get_item(db, item_id: str):
    return Item.get_by_id(db, id=item_id)

def get_items(db,  **kwargs):    
    return Item.get_all_by_page(db, **kwargs)

def create_item(db, item: Item):
    res = Item.add(db, **item.__dict__)
    return res

def update_item(db, id: str, item: Item):
   return Item.update(db, id=id, **item.__dict__)

def delete_item(db, item_id: int):
    return Item.delete_by_id(db, id=item_id)
