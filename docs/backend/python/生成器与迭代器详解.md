# Python 生成器与迭代器详解

## 什么是迭代器

### 生活中的类比

迭代器就像一个"一个一个拿东西"的工具：
- 想象一个装着糖果的盒子
- 你一次只能拿一颗糖出来
- 直到盒子空了，你就知道没有糖了

### 迭代器的定义

迭代器是一个可以记住遍历位置的对象，遵循迭代器协议：
- `__iter__()` 方法：返回迭代器本身
- `__next__()` 方法：返回下一个元素，没有元素时抛出 StopIteration

## 可迭代对象 vs 迭代器

### 可迭代对象

可以用 `for` 循环遍历的东西都是可迭代对象：
- 列表 list
- 元组 tuple
- 字符串 str
- 字典 dict
- 集合 set

```python
# 这些都是可迭代对象
my_list = [1, 2, 3]
my_string = "hello"
my_dict = {"name": "Alice", "age": 25}

# 用 for 循环遍历
for item in my_list:
    print(item)
```

### 迭代器

迭代器是从可迭代对象中获取的、可以逐个访问元素的对象：

```python
# 从列表获取迭代器
my_list = [1, 2, 3]
my_iterator = iter(my_list)

# 使用 next() 获取下一个元素
print(next(my_iterator))  # 1
print(next(my_iterator))  # 2
print(next(my_iterator))  # 3

# 再调用 next() 会抛出 StopIteration
# print(next(my_iterator))  # 报错 StopIteration
```

### `for` 循环的工作原理

```python
# for 循环实际上用了迭代器
for item in [1, 2, 3]:
    print(item)

# 等价于：
my_iter = iter([1, 2, 3])
while True:
    try:
        item = next(my_iter)
        print(item)
    except StopIteration:
        break
```

## 自定义迭代器

我们可以自己实现一个迭代器类：

```python
class Countdown:
    """倒计时迭代器"""
    def __init__(self, start):
        self.current = start
    
    def __iter__(self):
        # 返回迭代器本身
        return self
    
    def __next__(self):
        if self.current <= 0:
            # 没有更多元素了，抛出异常
            raise StopIteration
        value = self.current
        self.current -= 1
        return value

# 使用
countdown = Countdown(5)
for num in countdown:
    print(num)
# 输出: 5, 4, 3, 2, 1
```

## 什么是生成器

### 生成器的优势

普通列表会一次性在内存中存储所有元素，而生成器是"按需生成"元素：

```python
# 普通列表 - 一次性生成所有元素
my_list = [x * 2 for x in range(1000000)]
# 占用大量内存！

# 生成器 - 按需生成
my_generator = (x * 2 for x in range(1000000))
# 占用内存很小！
```

### 生成器函数（带 yield）

生成器函数是一种特殊的函数，使用 `yield` 而不是 `return`：

```python
def countdown(n):
    """倒计时生成器"""
    while n > 0:
        yield n  # 暂停，返回值
        n -= 1

# 使用
for num in countdown(5):
    print(num)
# 输出: 5, 4, 3, 2, 1
```

### yield 的工作原理

```python
def simple_generator():
    print("第一步")
    yield 1
    print("第二步")
    yield 2
    print("第三步")
    yield 3

# 使用
gen = simple_generator()
print(next(gen))  # 第一步，1
print(next(gen))  # 第二步，2
print(next(gen))  # 第三步，3
# print(next(gen))  # 报错 StopIteration
```

重要特点：
- 执行到 `yield` 时暂停
- 记住当前状态
- 下次调用 `next()` 从暂停处继续

## 生成器表达式

生成器表达式是更简洁的生成器写法：

```python
# 列表推导式 - 生成列表
square_list = [x ** 2 for x in range(10)]
print(square_list)  # [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]

# 生成器表达式 - 生成生成器
square_gen = (x ** 2 for x in range(10))
print(square_gen)  # <generator object <genexpr> at ...>

# 遍历生成器
for num in square_gen:
    print(num)
```

## 生成器的实际应用

### 1. 处理大数据

```python
def read_large_file(file_path):
    """逐行读取大文件"""
    with open(file_path, 'r') as f:
        for line in f:
            yield line.strip()

# 使用 - 不会一次性加载整个文件到内存
for line in read_large_file("large_file.txt"):
    if "important" in line:
        print(f"找到重要信息: {line}")
```

### 2. 无限序列

```python
def fibonacci():
    """无限斐波那契数列"""
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

# 使用 - 可以无限生成
fib = fibonacci()
print(next(fib))  # 0
print(next(fib))  # 1
print(next(fib))  # 1
print(next(fib))  # 2
print(next(fib))  # 3
# ... 可以一直继续
```

### 3. 管道处理

```python
def filter_long_lines(lines, max_length):
    """过滤过长的行"""
    for line in lines:
        if len(line) <= max_length:
            yield line

def uppercase_lines(lines):
    """转大写"""
    for line in lines:
        yield line.upper()

# 管道处理
lines = ["hello", "this is a very long line", "world"]
processed = uppercase_lines(filter_long_lines(lines, 20))

for line in processed:
    print(line)
```

## 生成器的高级用法

### send() - 向生成器发送数据

```python
def calculator():
    """一个简单的计算器生成器"""
    result = 0
    while True:
        operation = yield result
        if operation is None:
            break
        if operation.startswith("+"):
            result += int(operation[1:])
        elif operation.startswith("-"):
            result -= int(operation[1:])
        elif operation.startswith("*"):
            result *= int(operation[1:])
        elif operation.startswith("/"):
            result /= int(operation[1:])

# 使用
calc = calculator()
next(calc)  # 启动生成器，获取第一个 yield

print(calc.send("+10"))  # 10
print(calc.send("*2"))   # 20
print(calc.send("-5"))   # 15
calc.send(None)  # 结束生成器
```

### throw() - 在生成器内部抛出异常

```python
def safe_generator():
    try:
        yield 1
        yield 2
        yield 3
    except ValueError:
        print("捕获到 ValueError")
        yield "恢复中..."
    finally:
        print("生成器清理工作")

gen = safe_generator()
print(next(gen))  # 1
print(gen.throw(ValueError))  # 捕获到 ValueError，恢复中...
print(next(gen))  # 生成器清理工作，报错 StopIteration
```

### close() - 关闭生成器

```python
def gen():
    try:
        yield 1
        yield 2
        yield 3
    except GeneratorExit:
        print("生成器被关闭")

g = gen()
print(next(g))  # 1
g.close()  # 生成器被关闭
# next(g)  # 会报错 StopIteration
```

## 常用迭代工具

### itertools 模块

```python
import itertools

# count - 无限计数
for i in itertools.count(1, 2):
    if i > 10:
        break
    print(i)  # 1, 3, 5, 7, 9

# cycle - 无限循环
colors = itertools.cycle(["red", "green", "blue"])
for _ in range(5):
    print(next(colors))  # red, green, blue, red, green

# repeat - 重复
for _ in itertools.repeat("hello", 3):
    print("hello")

# chain - 连接多个可迭代对象
list1 = [1, 2, 3]
list2 = [4, 5, 6]
for num in itertools.chain(list1, list2):
    print(num)  # 1, 2, 3, 4, 5, 6

# zip_longest - 不等长 zip
list1 = [1, 2, 3]
list2 = ["a", "b"]
for item in itertools.zip_longest(list1, list2, fillvalue="缺省"):
    print(item)  # (1, a), (2, b), (3, 缺省)
```

## 性能对比

```python
import time

# 测试列表
start = time.time()
squares_list = [x ** 2 for x in range(1000000)]
print(f"列表内存占用: {squares_list.__sizeof__()} 字节")
end = time.time()
print(f"列表创建时间: {end - start:.4f}秒")

# 测试生成器
start = time.time()
squares_gen = (x ** 2 for x in range(1000000))
print(f"生成器内存占用: {squares_gen.__sizeof__()} 字节")
end = time.time()
print(f"生成器创建时间: {end - start:.4f}秒")
```

## 总结

### 迭代器 vs 生成器

| 特性 | 迭代器 | 生成器 |
|------|--------|--------|
| 实现方式 | __iter__, __next__ 方法 | yield 关键字 |
| 内存占用 | 取决于数据量 | 非常小，按需生成 |
| 代码复杂度 | 需要写类 | 函数或表达式即可 |
| 适用场景 | 自定义遍历逻辑 | 大数据处理、管道 |

### 什么时候用生成器？

✅ 处理大文件或大数据集  
✅ 需要延迟计算（按需生成）  
✅ 构建数据处理管道  
✅ 实现无限序列  

### 什么时候不用生成器？

❌ 需要随机访问元素  
❌ 需要多次遍历同一数据  
❌ 需要知道元素总数（除非已经知道）  

## 练习

1. 写一个生成器，生成从 1 到 n 的偶数
2. 写一个自定义迭代器，实现类似 range() 的功能
3. 写一个生成器，逐行读取文件并统计行数
