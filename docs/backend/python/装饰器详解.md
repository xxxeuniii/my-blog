# Python 装饰器详解

## 什么是装饰器

装饰器是 Python 中一种特殊的函数，它可以在不修改原函数代码的情况下，给函数添加额外功能。

### 生活中的类比

想象一下：
- 你有一个手机（原函数）
- 你给手机装了个手机壳（装饰器）
- 手机壳保护手机，不影响手机本身的功能
- 你还可以装不同的手机壳（多个装饰器）

### 简单示例

```python
# 一个简单的函数
def say_hello():
    print("Hello!")

# 调用
say_hello()
# 输出: Hello!
```

现在我们想在执行 `say_hello` 之前和之后打印一些信息，但是不想修改 `say_hello` 本身，这时候就可以用装饰器：

```python
# 定义装饰器
def log(func):
    def wrapper():
        print("函数开始执行")
        func()  # 调用原函数
        print("函数执行结束")
    return wrapper

# 使用装饰器
@log
def say_hello():
    print("Hello!")

say_hello()
# 输出:
# 函数开始执行
# Hello!
# 函数执行结束
```

看到了吗？我们没有修改 `say_hello` 的代码，但是它多了额外的功能！

## 装饰器的基本原理

### 第一步：理解函数也是对象

```python
# 函数可以赋值给变量
def greet():
    print("Hello!")

greet_copy = greet
greet_copy()  # Hello!

# 函数可以作为参数传递
def call_func(func):
    func()

call_func(greet)  # Hello!

# 函数可以作为返回值
def get_func():
    def inner():
        print("Inner function")
    return inner

my_func = get_func()
my_func()  # Inner function
```

### 第二步：理解闭包

闭包就是一个函数，它记住了定义时的环境：

```python
def outer(x):
    def inner():
        # inner 函数记住了 outer 的变量 x
        print(x)
    return inner

my_closure = outer(100)
my_closure()  # 100
```

### 第三步：装饰器 = 高阶函数 + 闭包

装饰器本质上就是一个接受函数作为参数，并返回一个新函数的高阶函数：

```python
def decorator(func):
    def wrapper():
        # 这里添加新功能
        print("Before")
        func()
        print("After")
    return wrapper

# 使用装饰器
@decorator
def func():
    print("Hello")

# 等价于：
# func = decorator(func)
```

## 常用装饰器示例

### 1. 日志装饰器

```python
import time

def log_time(func):
    """记录函数执行时间的装饰器"""
    def wrapper(*args, **kwargs):
        start_time = time.time()
        
        # 执行原函数
        result = func(*args, **kwargs)
        
        end_time = time.time()
        print(f"函数 {func.__name__} 执行时间: {end_time - start_time:.4f}秒")
        
        return result
    return wrapper

# 使用
@log_time
def slow_function(seconds):
    time.sleep(seconds)
    print("函数执行完成")

slow_function(1)
# 输出:
# 函数执行完成
# 函数 slow_function 执行时间: 1.0001秒
```

### 2. 参数校验装饰器

```python
def check_positive(func):
    """确保函数参数是正数的装饰器"""
    def wrapper(number):
        if number < 0:
            raise ValueError("参数必须是正数")
        return func(number)
    return wrapper

@check_positive
def square_root(x):
    return x ** 0.5

print(square_root(16))  # 4.0
# print(square_root(-9))  # 会报错 ValueError
```

### 3. 缓存装饰器

```python
from functools import lru_cache

@lru_cache(maxsize=128)
def fibonacci(n):
    """计算斐波那契数列（带缓存）"""
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

# 第一次调用会计算
print(fibonacci(100))
# 第二次调用会直接从缓存返回，非常快
print(fibonacci(100))
```

## 装饰器进阶用法

### 1. 带参数的装饰器

```python
def repeat(times):
    """让函数执行多次的装饰器"""
    def decorator(func):
        def wrapper(*args, **kwargs):
            for i in range(times):
                result = func(*args, **kwargs)
            return result
        return wrapper
    return decorator

@repeat(times=3)
def say_hi():
    print("Hi!")

say_hi()
# 输出:
# Hi!
# Hi!
# Hi!
```

### 2. 保留原函数的信息

```python
from functools import wraps

def log(func):
    @wraps(func)  # 重要：保留原函数的元信息
    def wrapper(*args, **kwargs):
        print(f"执行函数: {func.__name__}")
        return func(*args, **kwargs)
    return wrapper

@log
def hello():
    """这是一个问候函数"""
    print("Hello")

print(hello.__name__)  # hello（如果不加 @wraps，会是 wrapper）
print(hello.__doc__)   # 这是一个问候函数
```

### 3. 类装饰器

```python
class CountCalls:
    """统计函数被调用次数的类装饰器"""
    def __init__(self, func):
        self.func = func
        self.count = 0
    
    def __call__(self, *args, **kwargs):
        self.count += 1
        print(f"函数被调用第 {self.count} 次")
        return self.func(*args, **kwargs)

@CountCalls
def say_hello():
    print("Hello!")

say_hello()  # 函数被调用第 1 次
say_hello()  # 函数被调用第 2 次
say_hello()  # 函数被调用第 3 次
```

## 实战：一个完整的装饰器例子

```python
import time
from functools import wraps

def performance_logger(threshold=1.0):
    """
    性能日志装饰器
    
    参数:
        threshold: 执行时间超过这个值就告警，单位秒
    """
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            start_time = time.time()
            
            try:
                result = func(*args, **kwargs)
            except Exception as e:
                end_time = time.time()
                print(f"函数 {func.__name__} 执行出错: {e}")
                print(f"执行时间: {end_time - start_time:.4f}秒")
                raise
            
            end_time = time.time()
            elapsed_time = end_time - start_time
            
            print(f"函数 {func.__name__} 执行完成")
            print(f"执行时间: {elapsed_time:.4f}秒")
            
            if elapsed_time > threshold:
                print(f"⚠️ 警告: 执行时间超过 {threshold}秒阈值")
            
            return result
        return wrapper
    return decorator

# 使用示例
@performance_logger(threshold=0.5)
def process_data(data):
    """处理数据的函数"""
    print("开始处理数据...")
    time.sleep(0.6)  # 模拟耗时操作
    return f"处理了 {len(data)} 条数据"

# 测试
result = process_data([1, 2, 3, 4, 5])
print(result)
```

## 装饰器应用场景总结

| 场景 | 说明 |
|------|------|
| 日志记录 | 记录函数调用、参数、返回值、执行时间 |
| 性能监控 | 统计函数执行时间，找出瓶颈 |
| 参数校验 | 在函数执行前验证参数合法性 |
| 缓存 | 避免重复计算，提高性能 |
| 权限控制 | 检查用户是否有权限执行函数 |
| 重试机制 | 函数失败时自动重试 |
| 事务管理 | 数据库操作的事务提交和回滚 |

## 练习

1. 写一个装饰器，给函数执行结果加上"[结果]"前缀
2. 写一个装饰器，统计函数调用次数
3. 写一个装饰器，让函数在指定时间内不能重复调用（防抖动）

## 总结

装饰器就像"功能增强器"，可以：
- ✅ 不修改原函数代码
- ✅ 给函数添加额外功能
- ✅ 代码复用，避免重复
- ✅ 可以多个装饰器叠加使用

记住：装饰器 = 高阶函数 + 闭包
