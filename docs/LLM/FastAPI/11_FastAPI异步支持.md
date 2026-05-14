# 11_异步支持

## 异步端点
```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
async def read_root():
    return {"message": "Hello, Async FastAPI"}
```

## 异步数据库操作
```python
@app.get("/items/{item_id}")
async def read_item(item_id: int):
    # 异步数据库查询
    item = await db.fetch_one("SELECT * FROM items WHERE id = ?", item_id)
    return item
```

## 同步与异步混合
```python
@app.get("/sync")
def sync_endpoint():
    return {"message": "同步"}

@app.get("/async")
async def async_endpoint():
    return {"message": "异步"}
```
