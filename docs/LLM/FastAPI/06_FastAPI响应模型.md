# 06_响应模型

## 基本用法
```python
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Item(BaseModel):
    name: str
    description: str = None
    price: float
    tax: float = None

@app.post("/items/", response_model=Item)
def create_item(item: Item):
    return item
```

## 响应模型示例
```python
class UserIn(BaseModel):
    username: str
    password: str
    email: str

class UserOut(BaseModel):
    username: str
    email: str

@app.post("/users/", response_model=UserOut)
def create_user(user: UserIn):
    # 密码不会返回
    return user
```
