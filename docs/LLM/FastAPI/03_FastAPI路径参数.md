# 03_路径参数

## 基本用法
```python
@app.get("/items/{item_id}")
def read_item(item_id: int):
    return {"item_id": item_id}
```

## 类型验证
- 访问 `/items/abc` 会返回422错误（类型不匹配）
- FastAPI会自动验证路径参数类型

## 多个路径参数
```python
@app.get("/users/{user_id}/items/{item_id}")
def read_user_item(user_id: int, item_id: int):
    return {"user_id": user_id, "item_id": item_id}
```

## 路径参数顺序
- 静态路径必须放在动态路径前面
```python
@app.get("/items/me")  # 静态
@app.get("/items/{item_id}")  # 动态
```
