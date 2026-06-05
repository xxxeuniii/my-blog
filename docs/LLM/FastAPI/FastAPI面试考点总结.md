# FastAPI 面试考点总结

## 一、核心概念与原理

### 1. FastAPI 是什么？它的特点是什么？

**考点分析**：基础概念，必问

```python
# FastAPI 是一个现代、快速（高性能）的 Web 框架
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
async def read_root():
    return {"message": "Hello World"}
```

**关键点**：
- 基于 Starlette（异步框架）和 Pydantic（数据验证）
- 自动生成交互式 API 文档（Swagger UI 和 ReDoc）
- 支持异步和同步端点
- 类型提示驱动的自动验证和序列化

### 2. FastAPI 为什么快？

**考点分析**：性能相关，考察对框架底层的理解

**答案要点**：
- 基于 Starlette，使用 `asyncio` 实现异步 I/O
- 路由匹配使用 Radix Tree（基数树）算法，O(k) 时间复杂度
- Pydantic 使用 Python 类型提示和高性能的验证逻辑
- 底层使用 Uvicorn（ASGI 服务器）

### 3. Pydantic 在 FastAPI 中的作用

**考点分析**：核心依赖，必问

```python
from pydantic import BaseModel, EmailStr, Field
from typing import Optional

class UserCreate(BaseModel):
    username: str = Field(..., min_length=3, max_length=50)
    email: EmailStr
    password: str = Field(..., min_length=8)
    age: Optional[int] = None
    
    # 自定义验证
    @validator('username')
    def username_alphanumeric(cls, v):
        if not v.isalnum():
            raise ValueError('用户名只能包含字母和数字')
        return v
```

**关键点**：
- 请求体、响应体的数据验证
- 自动生成 JSON Schema
- 类型转换（如字符串转 int）
- 自定义验证器支持

## 二、路由与参数

### 4. 路径参数与查询参数的区别

**考点分析**：基础路由知识

```python
from fastapi import FastAPI, Path, Query

app = FastAPI()

# 路径参数 - 必需的，URL路径的一部分
@app.get("/items/{item_id}")
async def read_item(
    item_id: int = Path(..., ge=1, description="物品ID"),  # 路径参数
    q: Optional[str] = Query(None, max_length=50)  # 查询参数
):
    return {"item_id": item_id, "q": q}
```

| 参数类型 | 位置 | 是否必需 | 示例 |
|---------|------|---------|------|
| 路径参数 | URL路径中 | 默认必需 | `/items/123` |
| 查询参数 | URL末尾 `?` 后 | 可选 | `/items/123?q=hello` |

### 5. 如何处理请求体？

**考点分析**：常用功能，必问

```python
from fastapi import FastAPI
from pydantic import BaseModel
from typing import Optional

app = FastAPI()

class Item(BaseModel):
    name: str
    description: Optional[str] = None
    price: float
    tax: Optional[float] = None

@app.post("/items/")
async def create_item(item: Item):
    # item 已经被验证和解析
    return item.dict()  # 转为字典
```

### 6. 路径参数的类型验证

**考点分析**：细节考点

```python
from fastapi import FastAPI, Path

app = FastAPI()

# 使用 Path 进行验证
@app.get("/items/{item_id}")
async def read_item(
    item_id: int = Path(
        ...,           # ... 表示必需
        ge=1,          # 大于等于1
        le=1000,       # 小于等于1000
        title="物品ID",
        description="要查询的物品ID，范围1-1000"
    )
):
    return {"item_id": item_id}
```

## 三、依赖注入

### 7. 什么是依赖注入？FastAPI 中如何实现？

**考点分析**：核心特性，高频考点

```python
from fastapi import FastAPI, Depends

app = FastAPI()

# 依赖函数
async def common_parameters(
    q: Optional[str] = None,
    skip: int = 0,
    limit: int = 100
):
    return {"q": q, "skip": skip, "limit": limit}

# 使用依赖
@app.get("/items/")
async def read_items(commons: dict = Depends(common_parameters)):
    return commons

@app.get("/users/")
async def read_users(commons: dict = Depends(common_parameters)):
    return commons
```

**依赖注入的优势**：
- 代码复用
- 可测试性
- 解耦
- 支持复杂依赖链

### 8. 类依赖与子依赖

**考点分析**：进阶考点

```python
from fastapi import FastAPI, Depends
from typing import Optional

app = FastAPI()

# 类依赖
class QueryParams:
    def __init__(self, q: Optional[str] = None, limit: int = 10):
        self.q = q
        self.limit = limit

@app.get("/items/")
async def read_items(params: QueryParams = Depends()):
    return {"q": params.q, "limit": params.limit}

# 子依赖
async def get_db():
    db = "数据库连接"
    yield db  # 提供依赖
    # 这里可以做清理工作，如关闭连接

async def get_user(db=Depends(get_db)):
    return {"user": "当前用户", "db": db}

@app.get("/user/")
async def user_info(user=Depends(get_user)):
    return user
```

## 四、认证与安全

### 9. OAuth2 密码模式如何实现？

**考点分析**：安全相关，高频考点

```python
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel
from datetime import datetime, timedelta
from jose import JWTError, jwt
from passlib.context import CryptContext

app = FastAPI()

# 配置
SECRET_KEY = "your-secret-key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# 密码上下文
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# OAuth2 方案
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# 模拟用户数据库
fake_users_db = {
    "johndoe": {
        "username": "johndoe",
        "hashed_password": pwd_context.hash("secret"),
        "email": "johndoe@example.com",
    }
}

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="无法验证凭证",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    user = fake_users_db.get(username)
    if user is None:
        raise credentials_exception
    return user

@app.post("/token")
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    user = fake_users_db.get(form_data.username)
    if not user or not verify_password(form_data.password, user["hashed_password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="用户名或密码错误",
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user["username"]}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/users/me/")
async def read_users_me(current_user: dict = Depends(get_current_user)):
    return current_user
```

### 10. API Key 认证

**考点分析**：简单认证方式

```python
from fastapi import FastAPI, Depends, HTTPException
from fastapi.security import APIKeyHeader

app = FastAPI()

API_KEY = "secret-api-key"
api_key_header = APIKeyHeader(name="X-API-Key")

async def get_api_key(api_key: str = Depends(api_key_header)):
    if api_key != API_KEY:
        raise HTTPException(status_code=403, detail="无效的API密钥")
    return api_key

@app.get("/protected/")
async def protected_route(api_key: str = Depends(get_api_key)):
    return {"message": "访问成功"}
```

## 五、数据库集成

### 11. FastAPI 如何集成 SQLAlchemy？

**考点分析**：数据库操作，必问

```python
from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session

# 数据库配置
SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# 模型定义
class Item(Base):
    __tablename__ = "items"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(String)

# 创建表
Base.metadata.create_all(bind=engine)

app = FastAPI()

# 依赖：获取数据库会话
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# CRUD 操作
@app.post("/items/")
async def create_item(name: str, description: str, db: Session = Depends(get_db)):
    db_item = Item(name=name, description=description)
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

@app.get("/items/{item_id}")
async def read_item(item_id: int, db: Session = Depends(get_db)):
    item = db.query(Item).filter(Item.id == item_id).first()
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return item
```

## 六、异步支持

### 12. 同步 vs 异步端点

**考点分析**：性能优化，进阶考点

```python
from fastapi import FastAPI
import asyncio

app = FastAPI()

# 同步端点
@app.get("/sync/")
def sync_endpoint():
    # 阻塞操作会阻塞整个服务器
    import time
    time.sleep(1)  # 阻塞1秒
    return {"message": "同步响应"}

# 异步端点
@app.get("/async/")
async def async_endpoint():
    # 非阻塞操作
    await asyncio.sleep(1)  # 非阻塞等待1秒
    return {"message": "异步响应"}
```

**关键点**：
- 同步函数：使用 `def`，阻塞事件循环
- 异步函数：使用 `async def`，不阻塞事件循环
- 选择依据：是否有 I/O 密集型操作

## 七、响应处理

### 13. 响应模型的作用

**考点分析**：数据序列化，基础考点

```python
from fastapi import FastAPI
from pydantic import BaseModel
from typing import Optional

app = FastAPI()

class ItemBase(BaseModel):
    name: str
    description: Optional[str] = None

class ItemCreate(ItemBase):
    price: float  # 创建时需要价格

class ItemResponse(ItemBase):
    id: int       # 返回时包含ID
    price: float
    
    class Config:
        orm_mode = True  # 支持从 ORM 对象转换

@app.post("/items/", response_model=ItemResponse)
async def create_item(item: ItemCreate):
    # 返回的对象会被自动转换为 ItemResponse 格式
    return {"id": 1, "name": item.name, "description": item.description, "price": item.price}
```

### 14. 自定义状态码和响应头

**考点分析**：HTTP 协议知识

```python
from fastapi import FastAPI, status
from fastapi.responses import JSONResponse

app = FastAPI()

@app.post("/items/", status_code=status.HTTP_201_CREATED)
async def create_item(name: str):
    return {"name": name}

@app.get("/custom-header/")
async def custom_header():
    content = {"message": "Hello World"}
    headers = {"X-Custom-Header": "Custom-Value"}
    return JSONResponse(content=content, headers=headers)
```

## 八、错误处理

### 15. 如何处理异常？

**考点分析**：异常处理机制

```python
from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import JSONResponse

app = FastAPI()

# 方式1：HTTPException
@app.get("/items/{item_id}")
async def read_item(item_id: int):
    if item_id < 1:
        raise HTTPException(
            status_code=400,
            detail="Item ID 必须大于0",
            headers={"X-Error": "Invalid ID"}
        )
    return {"item_id": item_id}

# 方式2：自定义异常处理器
class CustomException(Exception):
    def __init__(self, name: str):
        self.name = name

@app.exception_handler(CustomException)
async def custom_exception_handler(request: Request, exc: CustomException):
    return JSONResponse(
        status_code=400,
        content={"message": f"Custom error: {exc.name}"}
    )

@app.get("/custom/{name}")
async def custom_error(name: str):
    raise CustomException(name=name)
```

## 九、部署

### 16. FastAPI 如何部署？

**考点分析**：生产部署，高频考点

**常用部署方式**：

```bash
# 开发环境
uvicorn main:app --reload

# 生产环境 - 使用 Gunicorn + Uvicorn
pip install gunicorn uvicorn
gunicorn main:app --workers 4 --worker-class uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000

# 使用 Docker
# Dockerfile
FROM python:3.11
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "80"]
```

**部署要点**：
- 使用多 worker 进程
- 配置反向代理（Nginx）
- 使用 HTTPS
- 设置日志和监控

## 十、测试

### 17. 如何测试 FastAPI 应用？

**考点分析**：测试知识

```python
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_read_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Hello World"}

def test_create_item():
    response = client.post("/items/", json={"name": "Test Item", "price": 9.99})
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "Test Item"
    assert data["price"] == 9.99
```

## 十一、进阶问题

### 18. FastAPI 与 Flask/Django 的对比

| 特性 | FastAPI | Flask | Django |
|------|---------|-------|--------|
| 性能 | 高（异步） | 中（同步） | 中（同步） |
| 类型提示 | 原生支持 | 需要插件 | 部分支持 |
| 自动文档 | 内置 | 需要插件 | 需要插件 |
| 数据验证 | Pydantic | WTForms | Django Forms |
| 适用场景 | API 服务 | 轻量应用 | 全栈应用 |

### 19. 如何实现限流？

```python
from fastapi import FastAPI, Request, HTTPException
from fastapi_limiter import FastAPILimiter
from fastapi_limiter.depends import RateLimiter
import redis.asyncio as redis

app = FastAPI()

@app.on_event("startup")
async def startup():
    redis_connection = redis.from_url("redis://localhost:6379")
    await FastAPILimiter.init(redis_connection)

@app.get("/limited/", dependencies=[Depends(RateLimiter(times=5, seconds=60))])
async def limited_route():
    return {"message": "成功访问"}
```

### 20. 如何实现文件上传？

```python
from fastapi import FastAPI, File, UploadFile
from typing import List

app = FastAPI()

@app.post("/upload/")
async def upload_file(file: UploadFile = File(...)):
    # 读取文件内容
    contents = await file.read()
    return {
        "filename": file.filename,
        "content_type": file.content_type,
        "size": len(contents)
    }

@app.post("/upload-multiple/")
async def upload_multiple_files(files: List[UploadFile] = File(...)):
    return [{"filename": file.filename} for file in files]
```

## 十二、面试常见问题汇总

### 基础概念
1. FastAPI 的核心特点是什么？
2. Pydantic 是什么？在 FastAPI 中有什么作用？
3. ASGI 和 WSGI 的区别是什么？
4. 解释依赖注入的概念和优势

### 核心功能
5. 如何定义路径参数和查询参数？
6. 如何处理请求体？
7. 响应模型的作用是什么？
8. 如何实现认证（OAuth2、API Key）？

### 进阶特性
9. 同步和异步端点的区别？如何选择？
10. 依赖注入如何实现？有什么优势？
11. 如何集成数据库（SQLAlchemy）？
12. 如何处理异常和错误？

### 部署与性能
13. 如何部署 FastAPI 应用？
14. 生产环境需要注意什么？
15. 如何实现 API 限流？
16. FastAPI 为什么性能好？

### 对比与选型
17. FastAPI 与 Flask/Django 的对比？
18. 什么场景适合使用 FastAPI？

## 总结

FastAPI 面试主要考察：
- **基础概念**：框架特点、Pydantic、依赖注入
- **核心功能**：路由、参数、认证、数据库集成
- **进阶特性**：异步支持、错误处理、部署
- **最佳实践**：代码结构、测试、性能优化

建议重点复习：
1. Pydantic 数据验证
2. 依赖注入机制
3. OAuth2 认证实现
4. SQLAlchemy 集成
5. 异步编程模型
