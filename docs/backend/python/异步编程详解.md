# Python 异步编程详解

## 什么是异步编程

### 生活中的类比

想象一个餐厅服务员：
- **同步模式**：给一桌客人点完餐，等餐做好、端上去，再去服务下一桌客人
- **异步模式**：给一桌客人点完餐，告诉厨房"等会做好了喊我"，然后去服务下一桌；等餐做好了，再回来端上去

### 同步 vs 异步

```python
# 同步 - 一件一件做，等一件做完再做下一件
import time

def cook(name, seconds):
    print(f"开始做 {name}")
    time.sleep(seconds)
    print(f"{name} 做好了")

cook("炒饭", 2)
cook("煮汤", 3)
cook("煎蛋", 1)
# 总耗时：2 + 3 + 1 = 6 秒
```

```python
# 异步 - 可以同时做多个事
import asyncio

async def cook(name, seconds):
    print(f"开始做 {name}")
    await asyncio.sleep(seconds)
    print(f"{name} 做好了")

async def main():
    task1 = asyncio.create_task(cook("炒饭", 2))
    task2 = asyncio.create_task(cook("煮汤", 3))
    task3 = asyncio.create_task(cook("煎蛋", 1))
    
    await task1
    await task2
    await task3

asyncio.run(main())
# 总耗时：约 3 秒（最长的那个）
```

## 异步基础概念

### 1. 协程（Coroutine）

协程就是用 `async def` 定义的函数：

```python
import asyncio

async def hello():
    print("Hello")
    await asyncio.sleep(1)
    print("World")

# 运行协程
asyncio.run(hello())
```

### 2. await - 暂停等待

`await` 用于等待另一个协程完成，等待时可以去做别的事：

```python
async def task():
    print("任务开始")
    # 这里会暂停 1 秒，但不会阻塞整个程序
    await asyncio.sleep(1)
    print("任务完成")
```

### 3. 任务（Task）

用 `asyncio.create_task()` 创建任务，让它们并发运行：

```python
async def main():
    # 创建任务
    task1 = asyncio.create_task(cook("炒饭", 2))
    task2 = asyncio.create_task(cook("煮汤", 3))
    
    # 等待任务完成
    await task1
    await task2
```

## 异步 I/O 示例

### 异步 HTTP 请求

```python
import asyncio
import aiohttp

async def fetch_url(url):
    """异步获取网页内容"""
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as response:
            return await response.text()

async def main():
    urls = [
        "https://www.baidu.com",
        "https://www.qq.com",
        "https://www.bing.com"
    ]
    
    # 并发获取多个网页
    tasks = [fetch_url(url) for url in urls]
    results = await asyncio.gather(*tasks)
    
    for url, content in zip(urls, results):
        print(f"{url}: {len(content)} 字符")

asyncio.run(main())
```

### 异步文件操作

```python
import asyncio
import aiofiles

async def read_file(filename):
    """异步读取文件"""
    async with aiofiles.open(filename, 'r') as f:
        return await f.read()

async def write_file(filename, content):
    """异步写入文件"""
    async with aiofiles.open(filename, 'w') as f:
        await f.write(content)

async def main():
    # 并发读写多个文件
    content = await read_file("input.txt")
    await write_file("output.txt", content.upper())
    print("文件处理完成")

asyncio.run(main())
```

## 异步模式对比

### 1. 顺序执行（串行）

```python
async def main():
    await cook("炒饭", 2)
    await cook("煮汤", 3)
    await cook("煎蛋", 1)
# 总耗时：6 秒
```

### 2. 并发执行

```python
async def main():
    # 创建任务
    task1 = asyncio.create_task(cook("炒饭", 2))
    task2 = asyncio.create_task(cook("煮汤", 3))
    task3 = asyncio.create_task(cook("煎蛋", 1))
    
    # 等待所有任务
    await asyncio.gather(task1, task2, task3)
# 总耗时：约 3 秒
```

## 错误处理

### try-except 在异步中

```python
async def may_fail():
    await asyncio.sleep(1)
    raise ValueError("出错了")

async def main():
    try:
        await may_fail()
    except ValueError as e:
        print(f"捕获到错误: {e}")

asyncio.run(main())
```

### 多个任务的错误处理

```python
async def task1():
    await asyncio.sleep(1)
    print("任务1完成")

async def task2():
    await asyncio.sleep(2)
    raise ValueError("任务2出错了")

async def task3():
    await asyncio.sleep(3)
    print("任务3完成")

async def main():
    try:
        await asyncio.gather(task1(), task2(), task3())
    except ValueError as e:
        print(f"捕获到错误: {e}")

asyncio.run(main())
```

## 同步 vs 异步 - 何时用？

### 适合用异步的场景

✅ 大量 I/O 操作（网络请求、文件读写、数据库查询）  
✅ 需要处理大量并发连接（Web 服务器）  
✅ 不想等待阻塞操作完成  

### 不适合用异步的场景

❌ CPU 密集型任务（大量计算）  
❌ 只有少量 I/O 操作  
❌ 第三方库不支持异步  

## 异步 Web 服务器 - FastAPI

```python
from fastapi import FastAPI
import asyncio

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/slow")
async def slow_api():
    # 模拟慢操作
    await asyncio.sleep(2)
    return {"result": "慢操作完成"}

@app.get("/fast")
async def fast_api():
    return {"result": "快操作完成"}

# 运行命令：uvicorn main:app --reload
```

## 常见问题

### Q1: 异步代码是不是更快？

不一定。只有当有多个 I/O 操作等待时，异步才会更快：

```python
# 一个 I/O 操作 - 异步不比同步快
async def one_task():
    await asyncio.sleep(2)  # 耗时 2 秒

# 多个 I/O 操作 - 异步更快
async def many_tasks():
    # 并发执行，总耗时约 2 秒
    await asyncio.gather(
        asyncio.sleep(2),
        asyncio.sleep(2),
        asyncio.sleep(2)
    )
```

### Q2: asyncio.sleep 和 time.sleep 的区别？

```python
# time.sleep - 会阻塞整个程序
import time
time.sleep(1)  # 这 1 秒内什么都做不了

# asyncio.sleep - 不会阻塞，等待时可以做别的事
await asyncio.sleep(1)  # 这 1 秒内可以执行其他任务
```

### Q3: 可以混用同步和异步吗？

可以，但要小心：

```python
# ❌ 错误：在异步函数中调用同步阻塞代码
async def bad():
    time.sleep(1)  # 会阻塞整个事件循环

# ✅ 正确：用线程池运行同步代码
import concurrent.futures

async def good():
    loop = asyncio.get_running_loop()
    with concurrent.futures.ThreadPoolExecutor() as pool:
        await loop.run_in_executor(pool, time.sleep, 1)
```

## 实践：一个完整的爬虫例子

```python
import asyncio
import aiohttp
from bs4 import BeautifulSoup

async def fetch_and_parse(session, url):
    """获取并解析单个网页"""
    try:
        async with session.get(url, timeout=10) as response:
            html = await response.text()
            soup = BeautifulSoup(html, 'html.parser')
            title = soup.title.string if soup.title else "无标题"
            return {"url": url, "title": title}
    except Exception as e:
        return {"url": url, "error": str(e)}

async def main():
    urls = [
        "https://www.baidu.com",
        "https://www.qq.com",
        "https://www.bing.com",
        "https://www.sogou.com",
        "https://www.sohu.com"
    ]
    
    # 并发爬取
    async with aiohttp.ClientSession() as session:
        tasks = [fetch_and_parse(session, url) for url in urls]
        results = await asyncio.gather(*tasks)
    
    # 打印结果
    for result in results:
        if "error" in result:
            print(f"{result['url']} - 错误: {result['error']}")
        else:
            print(f"{result['url']} - {result['title']}")

if __name__ == "__main__":
    start = asyncio.get_event_loop().time()
    asyncio.run(main())
    end = asyncio.get_event_loop().time()
    print(f"总耗时: {end - start:.2f} 秒")
```

## 总结

### 异步编程三要素

1. **async def** - 定义协程函数
2. **await** - 等待另一个协程
3. **asyncio.run()** - 运行主协程

### 什么时候用异步？

- 有很多 I/O 操作要等待
- 需要处理大量并发请求
- 想要更好的资源利用率

### 记住

异步不是万能的，它只在特定场景下有优势。对于简单任务，同步代码反而更简单易读。

## 练习

1. 写一个异步函数，并发下载 3 张图片
2. 写一个异步计时器，记录多个任务的执行时间
3. 对比同步和异步方式，分别访问 5 个网页，看哪个更快
