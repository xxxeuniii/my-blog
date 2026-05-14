# 02_安装与基本用法

## 安装
```bash
pip install fastapi
pip install uvicorn  # ASGI服务器
```

## 第一个FastAPI应用
```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Hello, FastAPI"}

@app.get("/items/{item_id}")
def read_item(item_id: int, q: str = None):
    return {"item_id": item_id, "q": q}
```

## 运行方式
```bash
uvicorn main:app --reload
```

## 访问文档
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc
