# 07_状态码

## 设置状态码
```python
from fastapi import FastAPI, status

app = FastAPI()

@app.post("/items/", status_code=status.HTTP_201_CREATED)
def create_item(name: str):
    return {"name": name}
```

## 常用状态码
- 200: OK（成功获取）
- 201: Created（成功创建）
- 400: Bad Request（请求错误）
- 401: Unauthorized（未授权）
- 404: Not Found（资源不存在）
- 500: Internal Server Error（服务器错误）

## 状态码常量
```python
from fastapi import status

status.HTTP_200_OK
status.HTTP_201_CREATED
status.HTTP_404_NOT_FOUND
```
