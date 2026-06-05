# Python 基础

## 一、Python 简介

Python 是一种高级、通用、解释型编程语言，以简洁的语法和强大的功能著称。

### Python 的特点

| 特点 | 说明 |
|------|------|
| 简洁易读 | 语法简洁，代码可读性强，易于学习和维护 |
| 跨平台 | 支持 Windows、macOS、Linux 等多种平台 |
| 动态类型 | 变量无需声明类型，运行时自动推断 |
| 面向对象 | 支持面向对象编程，封装、继承、多态 |
| 丰富库 | 拥有庞大的标准库和第三方库 |
| 解释执行 | 无需编译，直接解释执行 |

### Python 应用领域

- Web 开发（Django、Flask、FastAPI）
- 数据科学（NumPy、Pandas、Matplotlib）
- 机器学习（TensorFlow、PyTorch、Scikit-learn）
- 自动化运维（脚本编写、系统管理）
- 网络爬虫（Requests、Scrapy）
- 游戏开发（Pygame、Panda3D）

## 二、环境搭建

### 安装 Python

```bash
# 检查 Python 版本
python --version
python3 --version

# 安装 pyenv（推荐，管理多个 Python 版本）
curl https://pyenv.run | bash

# 安装指定版本
pyenv install 3.11.0
pyenv global 3.11.0
```

### 虚拟环境

```bash
# 创建虚拟环境
python -m venv myenv

# 激活虚拟环境
# Windows
myenv\Scripts\activate

# macOS/Linux
source myenv/bin/activate

# 退出虚拟环境
deactivate
```

## 三、基础语法

### 1. 变量与数据类型

```python
# 变量赋值
name = "Alice"
age = 25
height = 1.68
is_student = True

# 数据类型
print(type(name))    # <class 'str'>
print(type(age))     # <class 'int'>
print(type(height))  # <class 'float'>
print(type(is_student))  # <class 'bool'>
```

### 2. 字符串操作

```python
# 字符串定义
s1 = 'single quotes'
s2 = "double quotes"
s3 = '''multi-line
string'''

# 字符串拼接
greeting = "Hello" + " " + "World"

# 字符串格式化
name = "Alice"
age = 25
print(f"My name is {name}, I'm {age} years old")
print("My name is %s, I'm %d years old" % (name, age))
print("My name is {}, I'm {} years old".format(name, age))

# 字符串方法
s = "  Hello World!  "
print(s.strip())      # "Hello World!"
print(s.lower())      # "  hello world!  "
print(s.upper())      # "  HELLO WORLD!  "
print(s.replace("World", "Python"))  # "  Hello Python!  "
```

### 3. 列表与元组

```python
# 列表（可变）
fruits = ["apple", "banana", "cherry"]
fruits.append("orange")    # 添加元素
fruits.insert(1, "grape")  # 插入元素
fruits.remove("banana")    # 删除元素
print(fruits[0])           # 访问第一个元素
print(fruits[-1])          # 访问最后一个元素

# 元组（不可变）
colors = ("red", "green", "blue")
print(colors[1])  # "green"

# 切片
numbers = [1, 2, 3, 4, 5]
print(numbers[1:4])   # [2, 3, 4]
print(numbers[:3])    # [1, 2, 3]
print(numbers[2:])    # [3, 4, 5]
```

### 4. 字典

```python
person = {
    "name": "Alice",
    "age": 25,
    "city": "New York"
}

# 访问值
print(person["name"])    # "Alice"
print(person.get("age")) # 25

# 添加/修改
person["email"] = "alice@example.com"
person["age"] = 26

# 遍历
for key, value in person.items():
    print(f"{key}: {value}")
```

### 5. 条件语句

```python
age = 18

if age >= 18:
    print("成人")
elif age >= 13:
    print("青少年")
else:
    print("儿童")
```

### 6. 循环语句

```python
# for 循环
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)

# range
for i in range(1, 10):
    print(i)

# while 循环
count = 0
while count < 5:
    print(count)
    count += 1

# 循环控制
for i in range(10):
    if i == 3:
        continue  # 跳过当前迭代
    if i == 7:
        break     # 终止循环
    print(i)
```

### 7. 函数

```python
def greet(name):
    """打招呼函数"""
    return f"Hello, {name}!"

print(greet("Alice"))  # "Hello, Alice!"

# 默认参数
def add(a, b=0):
    return a + b

print(add(5))      # 5
print(add(5, 3))   # 8

# 可变参数
def sum_all(*args):
    total = 0
    for num in args:
        total += num
    return total

print(sum_all(1, 2, 3, 4))  # 10

# 关键字参数
def print_info(**kwargs):
    for key, value in kwargs.items():
        print(f"{key}: {value}")

print_info(name="Alice", age=25, city="New York")
```

### 8. 类与对象

```python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def greet(self):
        return f"Hello, my name is {self.name}"

# 创建对象
person1 = Person("Alice", 25)
print(person1.name)    # "Alice"
print(person1.greet()) # "Hello, my name is Alice"

# 继承
class Student(Person):
    def __init__(self, name, age, grade):
        super().__init__(name, age)
        self.grade = grade
    
    def study(self):
        return f"{self.name} is studying in grade {self.grade}"

student = Student("Bob", 16, 10)
print(student.study())  # "Bob is studying in grade 10"
```

## 四、文件操作

```python
# 读取文件
with open("example.txt", "r") as f:
    content = f.read()
    print(content)

# 写入文件
with open("output.txt", "w") as f:
    f.write("Hello, World!")

# 追加内容
with open("output.txt", "a") as f:
    f.write("\nThis is a new line")

# 逐行读取
with open("example.txt", "r") as f:
    for line in f:
        print(line.strip())
```

## 五、异常处理

```python
try:
    num = int(input("Enter a number: "))
    result = 10 / num
    print(f"Result: {result}")
except ValueError:
    print("Please enter a valid number")
except ZeroDivisionError:
    print("Cannot divide by zero")
else:
    print("No errors occurred")
finally:
    print("This always runs")
```

## 六、常用模块

```python
# 导入模块
import math
import random

print(math.sqrt(16))    # 4.0
print(random.randint(1, 10))  # 随机整数

# 导入特定函数
from datetime import datetime
print(datetime.now())  # 当前时间

# 自定义模块
# 创建 mymodule.py
# def greet(name):
#     return f"Hello, {name}"

from mymodule import greet
print(greet("Alice"))
```

## 七、实践练习

### 练习 1：计算器

```python
def calculator():
    num1 = float(input("Enter first number: "))
    operator = input("Enter operator (+, -, *, /): ")
    num2 = float(input("Enter second number: "))
    
    if operator == "+":
        print(f"{num1} + {num2} = {num1 + num2}")
    elif operator == "-":
        print(f"{num1} - {num2} = {num1 - num2}")
    elif operator == "*":
        print(f"{num1} * {num2} = {num1 * num2}")
    elif operator == "/":
        if num2 != 0:
            print(f"{num1} / {num2} = {num1 / num2}")
        else:
            print("Cannot divide by zero")
    else:
        print("Invalid operator")

calculator()
```

### 练习 2：猜数字游戏

```python
import random

def guess_number():
    secret_number = random.randint(1, 100)
    attempts = 0
    
    while True:
        guess = int(input("Guess a number between 1 and 100: "))
        attempts += 1
        
        if guess < secret_number:
            print("Too low!")
        elif guess > secret_number:
            print("Too high!")
        else:
            print(f"Congratulations! You guessed it in {attempts} attempts!")
            break

guess_number()
```

## 八、总结

Python 基础涵盖：
1. 变量、数据类型、运算符
2. 控制流程（条件、循环）
3. 函数定义与调用
4. 类与面向对象
5. 文件操作
6. 异常处理
7. 模块导入

掌握这些基础知识后，可以继续学习 Python 进阶内容。