# Pydantic 是什么？

## 核心概念

Pydantic 是一个 **数据验证和设置管理库**，使用 Python 类型提示进行数据验证。

主要特点：
- 自动数据验证
- 类型转换
- 自动生成文档
- 支持复杂数据结构

## 为什么 FastAPI 需要 Pydantic？

FastAPI 使用 Pydantic 来：
1. 验证请求体数据
2. 序列化响应数据
3. 自动生成 API 文档

---

## 基础用法

### 1. 安装
```bash
pip install pydantic
```

### 2. 定义模型
```python
from pydantic import BaseModel

class User(BaseModel):
    name: str
    age: int
    email: str
```

### 3. 创建实例
```python
user = User(name="Alice", age=25, email="alice@example.com")
print(user.name)    # Alice
print(user.dict())  # {'name': 'Alice', 'age': 25, 'email': 'alice@example.com'}
```

---

## 数据验证

### 自动类型转换
```python
user = User(name="Bob", age="30", email="bob@example.com")
print(user.age)  # 30 (自动转换为int)
```

### 验证失败
```python
try:
    user = User(name="Charlie", age="abc", email="charlie@example.com")
except Exception as e:
    print(e)
    # 验证错误：age 必须是整数
```

---

## 字段配置

### 默认值
```python
class Item(BaseModel):
    name: str
    price: float
    description: str = None  # 可选字段

item = Item(name="Apple", price=10.99)
print(item.description)  # None
```

### 字段约束
```python
from pydantic import Field

class Product(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    price: float = Field(..., gt=0, description="价格必须大于0")
```

---

## 嵌套模型

```python
class Address(BaseModel):
    city: str
    street: str

class User(BaseModel):
    name: str
    address: Address  # 嵌套模型

user = User(
    name="Alice",
    address={"city": "Beijing", "street": "Main Street"}
)
print(user.address.city)  # Beijing
```

---

## 常用方法

### dict() - 转换为字典
```python
user = User(name="Alice", age=25, email="alice@example.com")
print(user.dict())
# {'name': 'Alice', 'age': 25, 'email': 'alice@example.com'}
```

### json() - 转换为JSON字符串
```python
print(user.json())
# {"name": "Alice", "age": 25, "email": "alice@example.com"}
```

### parse_obj() - 从字典解析
```python
data = {"name": "Bob", "age": 30, "email": "bob@example.com"}
user = User.parse_obj(data)
```

---

## 在 FastAPI 中使用

### 请求体验证
```python
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Item(BaseModel):
    name: str
    price: float
    description: str = None

@app.post("/items/")
def create_item(item: Item):
    return item.dict()
```

### 响应模型
```python
class UserIn(BaseModel):
    username: str
    password: str

class UserOut(BaseModel):
    username: str

@app.post("/users/", response_model=UserOut)
def create_user(user: UserIn):
    return user  # 密码不会被返回
```

---

## 总结

| 功能 | 说明 |
|------|------|
| 数据验证 | 自动检查类型和约束 |
| 类型转换 | 自动转换为指定类型 |
| 文档生成 | 配合FastAPI自动生成API文档 |
| 嵌套模型 | 支持复杂数据结构 |
| 序列化 | 方便转换为字典或JSON |

---

整理日期：2026-05-13
