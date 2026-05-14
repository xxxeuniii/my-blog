# 05_请求体

## 定义模型
```python
from pydantic import BaseModel

class Item(BaseModel):
    name: str
    description: str = None
    price: float
    tax: float = None
```

## 使用请求体
```python
@app.post("/items/")
def create_item(item: Item):
    return item.dict()
```

## 嵌套模型
```python
class User(BaseModel):
    username: str
    full_name: str = None

class Item(BaseModel):
    name: str
    owner: User

@app.post("/items/")
def create_item(item: Item):
    return item.dict()
```
