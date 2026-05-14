# Python 基础教程

## 1. Python 简介

1. Python是一种高级、解释型、面向对象的编程语言
2. 由Guido van Rossum于1991年创建
3. 设计哲学：代码可读性优先，使用缩进表示代码块
4. 应用领域：Web开发、数据分析、人工智能、自动化脚本

## 2. 第一个Python程序

```python
print("Hello, World!")
```

运行结果：
```
Hello, World!
```

## 3. 变量与数据类型

### 变量赋值
```python
name = "Alice"      # 字符串
age = 25            # 整数
height = 1.75       # 浮点数
is_student = True   # 布尔值
```

### 常见数据类型
- str: 字符串
- int: 整数
- float: 浮点数
- bool: 布尔值
- list: 列表
- dict: 字典
- tuple: 元组
- set: 集合

## 4. 基本运算

```python
a, b = 10, 3

print(a + b)   # 加法: 13
print(a - b)   # 减法: 7
print(a * b)   # 乘法: 30
print(a / b)   # 除法: 3.333...
print(a // b)  # 整除: 3
print(a % b)   # 取余: 1
print(a ** b)  # 幂运算: 1000
```

## 5. 条件语句

```python
x = 10

if x > 0:
    print("正数")
elif x == 0:
    print("零")
else:
    print("负数")
```

运行结果：
```
正数
```

## 6. 循环结构

### for循环
```python
for i in range(5):
    print(i)  # 输出 0, 1, 2, 3, 4
```

### while循环
```python
count = 0
while count < 3:
    print(count)
    count += 1
```

## 7. 函数定义

### 基本函数定义
```python
def greet(name):
    """问候函数"""
    return f"Hello, {name}!"

message = greet("Alice")
print(message)  # Hello, Alice!
```

### 参数类型扩展

#### 1. 默认参数
```python
def greet(name, greeting="Hello"):
    """带有默认问候语的函数"""
    return f"{greeting}, {name}!"

print(greet("Alice"))              # Hello, Alice!
print(greet("Bob", "Hi"))          # Hi, Bob!
print(greet("Charlie", greeting="Good morning"))  # Good morning, Charlie!
```

#### 2. 可变参数 (*args)
```python
def add(*numbers):
    """求和函数，接受任意数量的参数"""
    total = 0
    for num in numbers:
        total += num
    return total

print(add(1, 2))           # 3
print(add(1, 2, 3, 4, 5))  # 15
print(add())               # 0
```

#### 3. 关键字参数 (**kwargs)
```python
def print_info(**info):
    """打印关键字参数信息"""
    for key, value in info.items():
        print(f"{key}: {value}")

print_info(name="Alice", age=25, city="Beijing")
# name: Alice
# age: 25
# city: Beijing
```

#### 4. 混合参数
```python
def mixed_params(a, b, *args, c=0, **kwargs):
    """混合多种参数类型"""
    print(f"a = {a}, b = {b}")
    print(f"args = {args}")
    print(f"c = {c}")
    print(f"kwargs = {kwargs}")

mixed_params(1, 2, 3, 4, 5, c=10, name="Alice", age=25)
# a = 1, b = 2
# args = (3, 4, 5)
# c = 10
# kwargs = {'name': 'Alice', 'age': 25}
```

### 打印输出扩展

#### 1. 格式化输出
```python
name = "Alice"
age = 25
height = 1.75

# f-string (推荐)
print(f"姓名: {name}, 年龄: {age}, 身高: {height:.2f}")

# format() 方法
print("姓名: {}, 年龄: {}, 身高: {:.2f}".format(name, age, height))

# % 格式化
print("姓名: %s, 年龄: %d, 身高: %.2f" % (name, age, height))
```

#### 2. 多行打印
```python
# 方法1: 多个 print()
print("第一行")
print("第二行")
print("第三行")

# 方法2: 使用 \n
print("第一行\n第二行\n第三行")

# 方法3: 三引号字符串
print("""第一行
第二行
第三行""")
```

#### 3. 不换行打印
```python
print("Hello", end=" ")
print("World")  # Hello World
```

#### 4. 分隔符打印
```python
print("apple", "banana", "cherry", sep=", ")  # apple, banana, cherry
```

### 返回值扩展

#### 1. 返回多个值
```python
def get_size():
    width = 100
    height = 200
    return width, height

w, h = get_size()
print(f"宽度: {w}, 高度: {h}")  # 宽度: 100, 高度: 200
```

#### 2. 返回 None
```python
def no_return():
    print("这个函数没有return语句")

result = no_return()
print(result)  # None
```

## 8. 列表操作

```python
fruits = ["apple", "banana", "cherry"]

# 索引访问
print(fruits[0])      # apple
print(fruits[-1])     # cherry

# 常用方法
fruits.append("orange")     # 添加元素
fruits.remove("banana")    # 移除元素
fruits.insert(1, "grape")  # 插入元素
```

## 9. 字典操作

```python
person = {
    "name": "Alice",
    "age": 25,
    "city": "Beijing"
}

# 访问值
print(person["name"])      # Alice
print(person.get("age"))   # 25

# 添加/修改
person["job"] = "Engineer"

# 遍历
for key, value in person.items():
    print(f"{key}: {value}")
```

## 10. 异常处理

```python
try:
    result = 10 / 0
except ZeroDivisionError:
    print("不能除以零！")
except Exception as e:
    print(f"发生错误: {e}")
finally:
    print("程序结束")
```

## 11. 文件操作

### 写入文件
```python
with open("test.txt", "w", encoding="utf-8") as f:
    f.write("Hello, Python!")
```

### 读取文件
```python
with open("test.txt", "r", encoding="utf-8") as f:
    content = f.read()
    print(content)
```

## 12. 模块导入

```python
# 导入整个模块
import math
print(math.pi)

# 导入特定函数
from random import randint
print(randint(1, 10))

# 导入并起别名
import numpy as np
```