# Python 进阶

## 一、装饰器

### 什么是装饰器

装饰器是一种特殊的函数，用于包装其他函数或类，在不修改原函数代码的情况下，为其添加额外功能。

### 基础装饰器

```python
def simple_decorator(func):
    def wrapper(*args, **kwargs):
        print("Before function call")
        result = func(*args, **kwargs)
        print("After function call")
        return result
    return wrapper

@simple_decorator
def greet(name):
    return f"Hello, {name}!"

print(greet("Alice"))
# Output:
# Before function call
# Hello, Alice!
# After function call
```

### 带参数的装饰器

```python
def repeat(times):
    def decorator(func):
        def wrapper(*args, **kwargs):
            results = []
            for _ in range(times):
                results.append(func(*args, **kwargs))
            return results
        return wrapper
    return decorator

@repeat(times=3)
def say_hello():
    return "Hello!"

print(say_hello())
# Output: ['Hello!', 'Hello!', 'Hello!']
```

### 常用内置装饰器

```python
class MyClass:
    @staticmethod
    def static_method():
        """静态方法，不需要实例"""
        return "Static method"
    
    @classmethod
    def class_method(cls):
        """类方法，接收类作为第一个参数"""
        return f"Class method from {cls.__name__}"
    
    @property
    def name(self):
        """属性方法，像访问属性一样访问"""
        return "Alice"
```

## 二、生成器与迭代器

### 迭代器

```python
class Countdown:
    def __init__(self, start):
        self.start = start
    
    def __iter__(self):
        return self
    
    def __next__(self):
        if self.start <= 0:
            raise StopIteration
        self.start -= 1
        return self.start + 1

for num in Countdown(5):
    print(num)
# Output: 5 4 3 2 1
```

### 生成器

```python
# 生成器函数
def countdown(n):
    while n > 0:
        yield n
        n -= 1

for num in countdown(5):
    print(num)
# Output: 5 4 3 2 1

# 生成器表达式
squares = (x ** 2 for x in range(10))
for num in squares:
    print(num)
```

### 迭代器工具函数

```python
from itertools import count, cycle, repeat, islice

# 无限计数器
counter = count(start=1, step=2)
for _ in range(5):
    print(next(counter))  # 1, 3, 5, 7, 9

# 循环迭代
colors = cycle(['red', 'green', 'blue'])
for _ in range(5):
    print(next(colors))  # red, green, blue, red, green

# 切片迭代
result = islice(count(), 0, 10, 2)
print(list(result))  # [0, 2, 4, 6, 8]
```

## 三、上下文管理器

### 使用 with 语句

```python
# 文件操作
with open("example.txt", "r") as f:
    content = f.read()

# 自定义上下文管理器
class DatabaseConnection:
    def __enter__(self):
        print("Connecting to database")
        return self
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        print("Closing database connection")
        # 返回 True 表示异常已处理
        return True

with DatabaseConnection() as db:
    print("Working with database")
```

### contextlib 模块

```python
from contextlib import contextmanager

@contextmanager
def timer():
    import time
    start = time.time()
    yield
    end = time.time()
    print(f"Elapsed: {end - start:.2f} seconds")

with timer():
    # 执行一些耗时操作
    sum(range(1_000_000))
```

## 四、多线程与多进程

### 多线程

```python
import threading
import time

def worker(name, delay):
    for i in range(5):
        print(f"{name}: {i}")
        time.sleep(delay)

# 创建线程
t1 = threading.Thread(target=worker, args=("Thread 1", 1))
t2 = threading.Thread(target=worker, args=("Thread 2", 0.5))

# 启动线程
t1.start()
t2.start()

# 等待线程完成
t1.join()
t2.join()
```

### 线程安全

```python
import threading

class Counter:
    def __init__(self):
        self.value = 0
        self.lock = threading.Lock()
    
    def increment(self):
        with self.lock:
            self.value += 1

counter = Counter()

def worker():
    for _ in range(1000):
        counter.increment()

threads = []
for _ in range(10):
    t = threading.Thread(target=worker)
    threads.append(t)
    t.start()

for t in threads:
    t.join()

print(counter.value)  # 10000
```

### 多进程

```python
import multiprocessing

def square(x):
    return x ** 2

if __name__ == "__main__":
    with multiprocessing.Pool(processes=4) as pool:
        results = pool.map(square, [1, 2, 3, 4, 5])
        print(results)  # [1, 4, 9, 16, 25]
```

## 五、异步编程

### async/await 基础

```python
import asyncio

async def say_hello(name):
    print(f"Hello, {name}")
    await asyncio.sleep(1)
    print(f"Goodbye, {name}")

async def main():
    # 并发执行
    task1 = asyncio.create_task(say_hello("Alice"))
    task2 = asyncio.create_task(say_hello("Bob"))
    
    await task1
    await task2

asyncio.run(main())
```

### 异步 HTTP 请求

```python
import asyncio
import aiohttp

async def fetch_url(url):
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as response:
            return await response.text()

async def main():
    urls = [
        "https://api.example.com/users",
        "https://api.example.com/posts",
        "https://api.example.com/comments"
    ]
    
    tasks = [fetch_url(url) for url in urls]
    results = await asyncio.gather(*tasks)
    
    for url, content in zip(urls, results):
        print(f"{url}: {len(content)} characters")

asyncio.run(main())
```

## 六、元编程

### 类装饰器

```python
def add_class_method(cls):
    def new_method(self):
        return "New method added"
    cls.new_method = new_method
    return cls

@add_class_method
class MyClass:
    pass

obj = MyClass()
print(obj.new_method())  # "New method added"
```

### 动态属性

```python
class DynamicAttributes:
    def __getattr__(self, name):
        if name.startswith("get_"):
            attr_name = name[4:]
            return lambda: f"Getting {attr_name}"
        raise AttributeError(f"No attribute {name}")

obj = DynamicAttributes()
print(obj.get_name())  # "Getting name"
print(obj.get_age())   # "Getting age"
```

### 元类

```python
class MetaClass(type):
    def __new__(cls, name, bases, attrs):
        # 在类创建时修改属性
        attrs['created_at'] = "2024-01-01"
        return super().__new__(cls, name, bases, attrs)

class MyClass(metaclass=MetaClass):
    pass

print(MyClass.created_at)  # "2024-01-01"
```

## 七、性能优化

### 列表推导式 vs 循环

```python
# 较慢
result = []
for i in range(1000):
    if i % 2 == 0:
        result.append(i)

# 较快
result = [i for i in range(1000) if i % 2 == 0]
```

### 使用 collections 模块

```python
from collections import defaultdict, Counter, deque

# defaultdict
d = defaultdict(list)
d['fruits'].append('apple')
d['fruits'].append('banana')

# Counter
words = ['apple', 'banana', 'apple', 'orange', 'banana', 'apple']
count = Counter(words)
print(count)  # Counter({'apple': 3, 'banana': 2, 'orange': 1})

# deque
q = deque()
q.append(1)
q.append(2)
q.popleft()  # 1
```

### 使用 numpy 进行数值计算

```python
import numpy as np

# Python 列表
python_list = list(range(1_000_000))
result = [x * 2 for x in python_list]

# NumPy 数组
np_array = np.arange(1_000_000)
result = np_array * 2  # 快很多
```

## 八、设计模式

### 单例模式

```python
class Singleton:
    _instance = None
    
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance

s1 = Singleton()
s2 = Singleton()
print(s1 is s2)  # True
```

### 工厂模式

```python
class Dog:
    def speak(self):
        return "Woof!"

class Cat:
    def speak(self):
        return "Meow!"

class AnimalFactory:
    @staticmethod
    def create_animal(animal_type):
        if animal_type == "dog":
            return Dog()
        elif animal_type == "cat":
            return Cat()
        else:
            raise ValueError("Unknown animal type")

factory = AnimalFactory()
dog = factory.create_animal("dog")
print(dog.speak())  # "Woof!"
```

### 观察者模式

```python
class Subject:
    def __init__(self):
        self._observers = []
    
    def attach(self, observer):
        self._observers.append(observer)
    
    def detach(self, observer):
        self._observers.remove(observer)
    
    def notify(self, message):
        for observer in self._observers:
            observer.update(message)

class Observer:
    def __init__(self, name):
        self.name = name
    
    def update(self, message):
        print(f"{self.name} received: {message}")

subject = Subject()
observer1 = Observer("Observer 1")
observer2 = Observer("Observer 2")

subject.attach(observer1)
subject.attach(observer2)
subject.notify("Hello World!")
```

## 九、测试与调试

### 单元测试

```python
import unittest

def add(a, b):
    return a + b

class TestAddFunction(unittest.TestCase):
    def test_add_positive_numbers(self):
        self.assertEqual(add(2, 3), 5)
    
    def test_add_negative_numbers(self):
        self.assertEqual(add(-1, -1), -2)
    
    def test_add_zero(self):
        self.assertEqual(add(0, 0), 0)

if __name__ == '__main__':
    unittest.main()
```

### 使用 pytest

```python
# test_example.py
def add(a, b):
    return a + b

def test_add():
    assert add(2, 3) == 5
    assert add(-1, -1) == -2
    assert add(0, 0) == 0
```

运行测试：
```bash
pytest test_example.py
```

### 调试技巧

```python
import pdb

def buggy_function():
    x = 1
    y = 2
    pdb.set_trace()  # 断点
    z = x + y
    return z

buggy_function()
```

## 十、实践项目

### 项目结构

```
my_project/
├── my_project/          # 源代码目录
│   ├── __init__.py
│   ├── main.py
│   ├── utils.py
│   └── tests/
│       ├── __init__.py
│       └── test_utils.py
├── setup.py             # 安装配置
├── requirements.txt     # 依赖列表
└── README.md            # 项目说明
```

### setup.py 示例

```python
from setuptools import setup, find_packages

setup(
    name="my_project",
    version="1.0.0",
    packages=find_packages(),
    install_requires=[
        "requests>=2.0",
        "numpy>=1.0"
    ],
    entry_points={
        'console_scripts': [
            'my-project=my_project.main:main'
        ]
    }
)
```

## 十一、总结

Python 进阶内容包括：
1. 装饰器与元编程
2. 生成器与迭代器
3. 上下文管理器
4. 多线程与多进程
5. 异步编程
6. 性能优化技巧
7. 设计模式
8. 测试与调试

这些知识可以帮助你编写更高效、更优雅的 Python 代码。