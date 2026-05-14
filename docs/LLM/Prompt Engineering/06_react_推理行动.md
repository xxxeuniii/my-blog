# ReAct (Reasoning + Acting)

推理 + 行动，结合工具使用的框架。

---

## 示例一：天气查询

```
问题：北京今天天气怎么样？

推理：我需要获取北京的实时天气数据
行动：调用天气API查询北京当前天气
观察：API返回数据 - 温度26℃，晴，空气质量优
结论：北京今天天气晴朗，气温26℃，适合户外活动
```

---

## 示例二：股票分析

```
问题：帮我分析一下腾讯股票是否值得买入

推理：我需要获取腾讯的最新股票数据和分析信息
行动：调用股票API查询腾讯股价、基本面数据
观察：
- 当前股价：380港元
- 市盈率：18.5
- 近期趋势：震荡上行
- 分析师评级：买入/持有/卖出

结论：综合估值和趋势，可以考虑分批建仓，但需注意风险
```

---

## 示例三：代码调试

```
问题：帮我找出这段Python代码的问题

代码：
import requests

def get_user(user_id):
    response = requests.get(f"https://api.example.com/user/{user_id}")
    return response.json()

推理：
1. 这个函数调用外部API获取用户数据
2. 但没有处理可能的异常情况

行动：
- 检查网络请求是否成功
- 检查返回数据格式
- 检查异常处理

发现的问题：
1. 没有超时设置，可能无限等待
2. 没有异常捕获，API失败会崩溃
3. 没有验证user_id格式

建议修复：
def get_user(user_id, timeout=5):
    try:
        response = requests.get(
            f"https://api.example.com/user/{user_id}",
            timeout=timeout
        )
        response.raise_for_status()
        return response.json()
    except requests.RequestException as e:
        return {"error": str(e)}
```

---

## 适用场景

| 场景 | 说明 |
|------|------|
| 需要外部数据 | 调用API、查数据库 |
| 需要执行操作 | 搜索、计算、代码运行 |
| 复杂多步骤 | 推理→行动→观察→结论 |

## 核心要点

| 步骤 | 说明 |
|------|------|
| 推理 (Reason) | 分析需要什么 |
| 行动 (Act) | 执行操作获取信息 |
| 观察 (Observe) | 理解返回结果 |
| 结论 (Conclude) | 整合给出答案 |

## ReAct vs 普通Prompt

| 方式 | 适用场景 |
|------|----------|
| 普通Prompt | 模型知识足够解决的问题 |
| ReAct | 需要外部信息、工具配合的场景 |
