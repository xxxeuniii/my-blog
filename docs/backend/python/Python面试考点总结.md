# Python 面试考点总结

## 一、基础语法与数据类型

### 1. Python 的特点
**考点分析**：基础概念，必问

**关键点**：
- 解释型语言
- 动态类型
- 面向对象
- 缩进敏感
- 丰富的标准库

### 2. 数据类型
**考点分析**：基础中的基础

```python
# 不可变类型
a = 1          # int
b = 1.5        # float
c = "hello"    # str
d = (1, 2, 3)  # tuple
e = frozenset([1, 2, 3])  # frozenset

# 可变类型
f = [1, 2, 3]  # list
g = {"a": 1}   # dict
h = {1, 2, 3}  # set
```

### 3. 列表与元组的区别（高频考点）
| 特性 | 列表 (list) | 元组 (tuple) |
|------|-----------|-------------|
| 可变性 | 可变 | 不可变 |
| 语法 | `[]` | `()` |
| 方法 | 丰富（append, extend, sort等） | 很少（count, index） |
| 性能 | 稍差 | 更好 |
| 作为字典键 | 不行 | 可以 |
| 适用场景 | 动态数据集合 | 固定数据、函数返回多值 |

### 4. 字典的底层实现
**考点分析**：进阶考点，考察对底层的理解

**答案要点**：
- Python 3.7+ 字典是有序的
- 底层使用哈希表（Hash Table）
- 冲突解决：开放寻址法（Probing）
- 负载因子超过 2/3 时会扩容

```python
# 字典的常用操作
d = {"name": "Alice", "age": 25}

# 获取值
print(d["name"])      # Alice（键不存在报错）
print(d.get("name"))  # Alice（键不存在返回None）

# 遍历
for key in d:
    print(key, d[key])

for key, value in d.items():
    print(key, value)
```

## 二、函数与作用域

### 5. 函数定义与调用
```python
def greet(name, greeting="Hello"):
    return f"{greeting}, {name}!"

print(greet("Alice"))        # Hello, Alice!
print(greet("Bob", "Hi"))    # Hi, Bob!
```

### 6. *args 和 **kwargs
```python
def func(*args, **kwargs):
    print("位置参数:", args)      # 元组
    print("关键字参数:", kwargs)  # 字典

func(1, 2, 3, a=4, b=5)
# 位置参数: (1, 2, 3)
# 关键字参数: {'a': 4, 'b': 5}
```

### 7. 作用域（LEGB 规则）
**考点分析**：高频考点

```python
x = 10  # Global

def outer():
    x = 20  # Enclosing
    
    def inner():
        x = 30  # Local
        print(x)  # 30（Local）
    
    inner()
    print(x)  # 20（Enclosing）

outer()
print(x)  # 10（Global）
```

### 8. global 和 nonlocal
```python
x = 10

def func():
    global x  # 声明使用全局变量
    x = 20

func()
print(x)  # 20

def outer():
    x = 10
    
    def inner():
        nonlocal x  # 声明使用外层函数变量
        x = 20
    
    inner()
    print(x)  # 20

outer()
```

## 三、面向对象

### 9. 类与对象
```python
class Person:
    # 类属性
    species = "Human"
    
    def __init__(self, name, age):
        # 实例属性
        self.name = name
        self.age = age
    
    # 实例方法
    def greet(self):
        return f"Hello, I'm {self.name}"
    
    # 类方法
    @classmethod
    def get_species(cls):
        return cls.species
    
    # 静态方法
    @staticmethod
    def is_adult(age):
        return age >= 18

p = Person("Alice", 25)
print(p.greet())              # Hello, I'm Alice
print(Person.get_species())   # Human
print(Person.is_adult(25))    # True
```

### 10. 继承与多态
```python
class Animal:
    def speak(self):
        pass

class Dog(Animal):
    def speak(self):
        return "Woof!"

class Cat(Animal):
    def speak(self):
        return "Meow!"

def make_speak(animal):
    print(animal.speak())

make_speak(Dog())  # Woof!
make_speak(Cat())  # Meow!
```

### 11. 魔术方法（特殊方法）
```python
class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    
    def __add__(self, other):
        return Vector(self.x + other.x, self.y + other.y)
    
    def __repr__(self):
        return f"Vector({self.x}, {self.y})"
    
    def __len__(self):
        return 2

v1 = Vector(1, 2)
v2 = Vector(3, 4)
print(v1 + v2)  # Vector(4, 6)
print(len(v1))  # 2
```

### 12. 装饰器
**考点分析**：高频考点，必问

```python
def decorator(func):
    def wrapper(*args, **kwargs):
        print("Before")
        result = func(*args, **kwargs)
        print("After")
        return result
    return wrapper

@decorator
def say_hello():
    print("Hello!")

say_hello()
```

## 四、高级特性

### 13. 生成器与迭代器
**考点分析**：高频考点

```python
# 生成器函数
def fibonacci(n):
    a, b = 0, 1
    for _ in range(n):
        yield a
        a, b = b, a + b

# 生成器表达式
gen = (x ** 2 for x in range(10))

# 迭代器协议
class Counter:
    def __init__(self, limit):
        self.limit = limit
        self.current = 0
    
    def __iter__(self):
        return self
    
    def __next__(self):
        if self.current < self.limit:
            self.current += 1
            return self.current
        raise StopIteration
```

### 14. 列表推导式 vs 生成器表达式
```python
# 列表推导式 - 立即生成所有元素
squares_list = [x ** 2 for x in range(10)]

# 生成器表达式 - 按需生成
squares_gen = (x ** 2 for x in range(10))

# 条件筛选
even_squares = [x ** 2 for x in range(10) if x % 2 == 0]
```

### 15. 闭包
```python
def make_counter():
    count = 0
    
    def counter():
        nonlocal count
        count += 1
        return count
    
    return counter

c = make_counter()
print(c())  # 1
print(c())  # 2
```

### 16. 上下文管理器
```python
# 使用 with 语句
with open("file.txt", "r") as f:
    content = f.read()

# 自定义上下文管理器
class MyContext:
    def __enter__(self):
        print("Enter")
        return self
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        print("Exit")
        return False  # 不抑制异常

with MyContext() as mc:
    print("Inside")
```

## 五、异常处理

### 17. try-except 结构
```python
try:
    result = 10 / 0
except ZeroDivisionError as e:
    print(f"错误: {e}")
except TypeError as e:
    print(f"类型错误: {e}")
else:
    print("没有异常")
finally:
    print("无论如何都会执行")
```

### 18. 常见异常类型
| 异常类型 | 说明 |
|---------|------|
| `SyntaxError` | 语法错误 |
| `IndentationError` | 缩进错误 |
| `TypeError` | 类型错误 |
| `ValueError` | 值错误 |
| `IndexError` | 索引错误 |
| `KeyError` | 键错误 |
| `AttributeError` | 属性错误 |
| `ZeroDivisionError` | 除零错误 |

## 六、模块与包

### 19. 模块导入
```python
# 导入整个模块
import math
print(math.pi)

# 导入特定函数
from math import pi, sqrt

# 导入并别名
import numpy as np

# 相对导入
from . import utils
```

### 20. `__init__.py` 的作用
- 标识目录为 Python 包
- 可以执行包初始化代码
- 控制导入行为（`__all__`）

## 七、异步编程

### 21. async/await
```python
import asyncio

async def fetch_data():
    print("Start fetching")
    await asyncio.sleep(1)
    print("Data fetched")
    return {"data": "value"}

async def main():
    result = await fetch_data()
    print(result)

asyncio.run(main())
```

### 22. 同步 vs 异步
```python
# 同步 - 阻塞
import time
def sync_task():
    time.sleep(1)
    print("Sync done")

# 异步 - 非阻塞
async def async_task():
    await asyncio.sleep(1)
    print("Async done")
```

## 八、标准库

### 23. 常用标准库
| 模块 | 用途 |
|------|------|
| `os` | 操作系统交互 |
| `sys` | Python 运行时环境 |
| `re` | 正则表达式 |
| `json` | JSON 处理 |
| `datetime` | 日期时间 |
| `collections` | 数据结构（Counter, defaultdict等） |
| `itertools` | 迭代工具 |
| `functools` | 函数工具（partial, lru_cache等） |

### 24. collections 模块
```python
from collections import Counter, defaultdict, OrderedDict

# Counter - 计数
counts = Counter("hello")
print(counts)  # Counter({'l': 2, 'h': 1, 'e': 1, 'o': 1})

# defaultdict - 默认值字典
d = defaultdict(list)
d["key"].append(1)
print(d)  # defaultdict(<class 'list'>, {'key': [1]})
```

### 25. functools.lru_cache
```python
from functools import lru_cache

@lru_cache(maxsize=128)
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

print(fibonacci(100))  # 快速计算
```

## 九、性能优化

### 26. 列表 vs 生成器
```python
# 列表 - 占用内存大
big_list = [x for x in range(1_000_000)]

# 生成器 - 占用内存小
big_gen = (x for x in range(1_000_000))
```

### 27. 字典查找 vs 列表查找
```python
# 字典查找 O(1)
d = {i: i for i in range(1000)}
print(d[500])  # 快速

# 列表查找 O(n)
l = list(range(1000))
print(l.index(500))  # 较慢
```

### 28. 避免全局变量
```python
# 慢：全局变量查找
x = 10
def func():
    return x * 2

# 快：局部变量查找
def func():
    x = 10
    return x * 2
```

## 十、Python 进阶

### 29. GIL（全局解释器锁）
**考点分析**：重要概念，必问

**答案要点**：
- GIL 是 Python 解释器的全局锁
- 同一时刻只有一个线程执行 Python 字节码
- 影响：多线程 CPU 密集型任务无法真正并行
- 解决方案：多进程、异步编程、C 扩展

### 30. 深浅拷贝
```python
import copy

# 浅拷贝
original = [[1, 2], [3, 4]]
shallow = copy.copy(original)
shallow[0][0] = 100
print(original)  # [[100, 2], [3, 4]] - 被修改了！

# 深拷贝
deep = copy.deepcopy(original)
deep[0][0] = 200
print(original)  # [[100, 2], [3, 4]] - 不受影响
```

### 31. isinstance vs type
```python
class Parent:
    pass

class Child(Parent):
    pass

c = Child()

print(isinstance(c, Child))    # True
print(isinstance(c, Parent))   # True（子类也是父类的实例）
print(type(c) == Child)       # True
print(type(c) == Parent)       # False（type不考虑继承）
```

## 十一、设计模式

### 32. 单例模式
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

### 33. 工厂模式
```python
class Dog:
    def speak(self):
        return "Woof"

class Cat:
    def speak(self):
        return "Meow"

class AnimalFactory:
    @staticmethod
    def create_animal(animal_type):
        if animal_type == "dog":
            return Dog()
        elif animal_type == "cat":
            return Cat()

factory = AnimalFactory()
dog = factory.create_animal("dog")
print(dog.speak())  # Woof
```

## 十二、面试常见问题汇总

### 基础概念
1. Python 是编译型还是解释型语言？
2. 解释 Python 的动态类型和强类型？
3. Python 的缩进有什么作用？
4. 什么是 GIL？它对多线程有什么影响？

### 数据类型
5. 列表和元组的区别？
6. 字典的底层实现是什么？
7. 字符串为什么是不可变的？
8. `==` 和 `is` 的区别？

### 函数与作用域
9. 什么是闭包？举个例子。
10. `*args` 和 `**kwargs` 的作用？
11. 解释 LEGB 规则。
12. `global` 和 `nonlocal` 的区别？

### 面向对象
13. `__init__` 和 `__new__` 的区别？
14. 类方法、实例方法、静态方法的区别？
15. 什么是魔术方法？举几个例子。
16. 如何实现多重继承？

### 高级特性
17. 生成器和迭代器的区别？
18. 装饰器是什么？如何实现？
19. 上下文管理器的作用？
20. 列表推导式的优点？

### 异常处理
21. try-except-else-finally 的执行顺序？
22. 如何自定义异常？
23. `raise` 和 `assert` 的区别？

### 性能优化
24. 如何优化 Python 代码性能？
25. 为什么字典查找比列表快？
26. 什么时候使用生成器？

### 其他
27. Python 3 和 Python 2 的主要区别？
28. 什么是 PEP 8？
29. 如何管理 Python 项目依赖？
30. 什么是虚拟环境？为什么要用？

## 总结

Python 面试主要考察：
- **基础语法**：数据类型、函数、作用域
- **面向对象**：类、继承、魔术方法
- **高级特性**：装饰器、生成器、闭包
- **性能优化**：GIL、数据结构选择
- **标准库**：常用模块的使用

建议重点复习：
1. 装饰器实现
2. 生成器与迭代器
3. 闭包概念
4. GIL 原理
5. 深浅拷贝
6. 面向对象设计

这些内容在我的博客中都有详细讲解：
- [Python基础.md](file:///e:/note/my-blog/docs/backend/python/Python基础.md)
- [Python装饰器详解.md](file:///e:/note/my-blog/docs/backend/python/Python装饰器详解.md)
- [Python生成器与迭代器详解.md](file:///e:/note/my-blog/docs/backend/python/Python生成器与迭代器详解.md)
- [Python异步编程详解.md](file:///e:/note/my-blog/docs/backend/python/Python异步编程详解.md)
