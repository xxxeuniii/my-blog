# FastAPI 基础

## 什么是 FastAPI

FastAPI 是一个现代、快速（高性能）的 Python Web 框架，用于构建 API。

**特点**：
- 快速：高性能，与 Node.js 和 Go 相当
- 自动文档：自动生成交互式 API 文档（Swagger UI 和 ReDoc）
- 类型提示：基于 Python 类型提示
- 数据验证：强大的请求数据验证功能
- 异步支持：原生支持异步编程

## 安装

```bash
pip install fastapi uvicorn
```

## 快速开始

### 第一个应用

```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}
```

### 运行应用

```bash
uvicorn main:app --reload
```

参数说明：
- `main:app`：`main` 是文件名，`app` 是 FastAPI 实例名
- `--reload`：开发模式，代码修改后自动重新加载

## 路径参数

### 基本用法

```python
@app.get("/items/{item_id}")
def read_item(item_id: int):
    return {"item_id": item_id}
```

### 路径验证

```python
from fastapi import Path

@app.get("/items/{item_id}")
def read_item(
    item_id: int = Path(..., title="项目ID", ge=1, le=1000)
):
    return {"item_id": item_id}
```

## 查询参数

### 基本用法

```python
@app.get("/items/")
def read_items(skip: int = 0, limit: int = 10):
    return {"skip": skip, "limit": limit}
```

### 可选参数

```python
@app.get("/items/{item_id}")
def read_item(item_id: int, q: str | None = None):
    if q:
        return {"item_id": item_id, "q": q}
    return {"item_id": item_id}
```

## 请求体

### 定义 Pydantic 模型

```python
from pydantic import BaseModel

class Item(BaseModel):
    name: str
    description: str | None = None
    price: float
    tax: float | None = None
```

### 使用请求体

```python
@app.post("/items/")
def create_item(item: Item):
    item_dict = item.dict()
    if item.tax:
        price_with_tax = item.price + item.tax
        item_dict.update({"price_with_tax": price_with_tax})
    return item_dict
```

## 查询参数验证

### 基本验证

```python
from fastapi import Query

@app.get("/items/")
def read_items(q: str | None = Query(None, min_length=3, max_length=50)):
    results = {"items": [{"item_id": "Foo"}, {"item_id": "Bar"}]}
    if q:
        results.update({"q": q})
    return results
```

### 正则表达式验证

```python
@app.get("/items/")
def read_items(
    q: str | None = Query(
        None,
        min_length=3,
        max_length=50,
        regex="^fixedquery$"
    )
):
    results = {"items": [{"item_id": "Foo"}, {"item_id": "Bar"}]}
    if q:
        results.update({"q": q})
    return results
```

## 表单数据

```python
from fastapi import Form

@app.post("/login/")
def login(username: str = Form(...), password: str = Form(...)):
    return {"username": username}
```

## 文件上传

```python
from fastapi import File, UploadFile
from typing import List

@app.post("/files/")
async def create_files(files: List[bytes] = File(...)):
    return {"file_sizes": [len(file) for file in files]}

@app.post("/uploadfile/")
async def create_upload_file(file: UploadFile = File(...)):
    return {"filename": file.filename}
```

## 响应模型

### 定义响应模型

```python
class Item(BaseModel):
    name: str
    description: str | None = None
    price: float
    tax: float | None = None

class ItemOut(BaseModel):
    name: str
    price: float
```

### 使用响应模型

```python
@app.post("/items/", response_model=ItemOut)
def create_item(item: Item):
    return item
```

## 状态码

```python
from fastapi import status

@app.post("/items/", status_code=status.HTTP_201_CREATED)
def create_item(name: str):
    return {"name": name}
```

## 错误处理

```python
from fastapi import HTTPException

@app.get("/items/{item_id}")
def read_item(item_id: int):
    if item_id == 404:
        raise HTTPException(status_code=404, detail="Item not found")
    return {"item_id": item_id}
```

## 依赖注入

### 基本依赖

```python
from fastapi import Depends

def common_parameters(q: str | None = None, skip: int = 0, limit: int = 100):
    return {"q": q, "skip": skip, "limit": limit}

@app.get("/items/")
def read_items(commons: dict = Depends(common_parameters)):
    return commons
```

### 类依赖

```python
class CommonQueryParams:
    def __init__(self, q: str | None = None, skip: int = 0, limit: int = 100):
        self.q = q
        self.skip = skip
        self.limit = limit

@app.get("/items/")
def read_items(commons: CommonQueryParams = Depends(CommonQueryParams)):
    return commons
```

## OAuth2 和 JWT

### 密码流

```python
from fastapi import Depends, FastAPI
from fastapi.security import OAuth2PasswordBearer

app = FastAPI()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

@app.get("/items/")
def read_items(token: str = Depends(oauth2_scheme)):
    return {"token": token}
```

## 中间件

```python
import time
from fastapi import Request

@app.middleware("http")
async def add_process_time_header(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    response.headers["X-Process-Time"] = str(process_time)
    return response
```

## CORS

```python
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## 后台任务

```python
from fastapi import BackgroundTasks

def write_notification(email: str, message: str):
    with open("log.txt", mode="w") as email_file:
        content = f"notification for {email}: {message}"
        email_file.write(content)

@app.post("/send-notification/{email}")
def send_notification(email: str, background_tasks: BackgroundTasks):
    background_tasks.add_task(write_notification, email, "some notification")
    return {"message": "Notification sent in the background"}
```

## 数据库集成

### SQLAlchemy

```python
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
```

## 异步编程

```python
from fastapi import FastAPI
import asyncio

app = FastAPI()

@app.get("/")
async def read_root():
    await asyncio.sleep(1)
    return {"Hello": "World"}
```

## API 文档

启动应用后访问：
- **Swagger UI**：http://127.0.0.1:8000/docs
- **ReDoc**：http://127.0.0.1:8000/redoc
- **OpenAPI JSON**：http://127.0.0.1:8000/openapi.json

## 项目结构建议

```
myapi/
├── app/
│   ├── __init__.py
│   ├── main.py
│   ├── dependencies.py
│   ├── config.py
│   ├── models.py
│   ├── schemas.py
│   ├── database.py
│   ├── crud.py
│   └── routers/
│       ├── __init__.py
│       ├── items.py
│       └── users.py
└── requirements.txt
```

## 常用扩展

- **Pydantic**：数据验证和设置管理
- **Uvicorn**：ASGI 服务器
- **SQLAlchemy**：数据库 ORM
- **Motor**：异步 MongoDB 驱动
- **aiofiles**：异步文件操作
