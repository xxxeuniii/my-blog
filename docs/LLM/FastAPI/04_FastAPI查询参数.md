# 04_查询参数

## 基本用法
```python
@app.get("/items/")
def read_items(skip: int = 0, limit: int = 10):
    # 访问 /items/?skip=0&limit=10
    return {"skip": skip, "limit": limit}
```

## 可选参数
```python
@app.get("/items/{item_id}")
def read_item(item_id: int, q: str = None):
    if q:
        return {"item_id": item_id, "q": q}
    return {"item_id": item_id}
```

## 必填查询参数
```python
@app.get("/items/{item_id}")
def read_item(item_id: int, q: str):  # 没有默认值，必填
    return {"item_id": item_id, "q": q}
```
