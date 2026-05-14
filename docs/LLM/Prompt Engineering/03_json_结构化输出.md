# 结构化输出（JSON格式）

要求模型返回 JSON，便于程序处理。

---

## 示例一：简历信息提取

```
请从以下文本中提取信息，返回JSON格式：

文本：
"张三，男，28岁，软件工程师，本科毕业于清华大学计算机系，工作5年，曾在阿里巴巴和字节跳动任职，目前在创业公司担任技术总监，年薪100万"

JSON格式：
{
  "name": "姓名",
  "gender": "性别",
  "age": 年龄（数字）,
  "education": {
    "degree": "学位",
    "school": "毕业院校",
    "major": "专业"
  },
  "work_experience": [
    {"company": "公司名", "position": "职位", "years": 工作年限}
  ],
  "current": {
    "company": "当前公司",
    "position": "当前职位",
    "annual_salary": 年薪（数字，单位万）
  }
}
```

---

## 示例二：订单解析

```
请将订单文本解析为JSON：

订单："订单号A12345，客户李四，购买了2件T恤（白色，L码）和1条牛仔裤（蓝色，32码），总金额599元，使用优惠券减50元"

JSON格式：
{
  "order_id": "订单号",
  "customer": "客户名",
  "items": [
    {"name": "商品", "quantity": 数量, "color": "颜色", "size": "尺码"}
  ],
  "original_total": 原价（数字）,
  "discount": 优惠金额（数字）,
  "final_total": 实付金额（数字）
}
```

---

## 示例三：代码审查结果

```
请审查以下Python代码，返回JSON格式的审查报告：

代码：
def calculate_average(scores):
    total = sum(scores)
    return total / len(scores)

def get_grade(score):
    if score >= 90:
        return 'A'
    elif score >= 80:
        return 'B'
    elif score >= 70:
        return 'C'
    elif score >= 60:
        return 'D'
    else:
        return 'F'

JSON格式：
{
  "file": "文件名",
  "issues": [
    {
      "line": 行号（数字）,
      "severity": "严重程度",
      "category": "问题类别",
      "description": "问题描述",
      "suggestion": "修改建议"
    }
  ],
  "summary": {
    "total_issues": 问题总数（数字）,
    "critical": 严重问题数（数字）,
    "warning": 警告数（数字）,
    "info": 提示数（数字）
  }
}
```

---

## 适用场景

| 场景 | 说明 |
|------|------|
| 数据提取 | 从非结构化文本提取结构化数据 |
| API响应 | 为程序提供可解析的输出 |
| 数据转换 | 将一种格式转为另一种 |
| 分析报告 | 便于后续处理和分析 |

## 核心要点

| 要点 | 说明 |
|------|------|
| 字段命名 | 使用明确的英文字段名 |
| 类型声明 | 注明数据类型（字符串/数字/数组/对象） |
| 嵌套结构 | 复杂结构要分层说明 |
| 示例输出 | 提供一个完整的JSON示例 |

## 进阶技巧

### 1. 使用 JSON Schema

```
请返回符合以下Schema的JSON：
{
  "type": "object",
  "properties": {
    "name": {"type": "string"},
    "age": {"type": "integer", "minimum": 0},
    "email": {"type": "string", "format": "email"}
  },
  "required": ["name", "age"]
}
```

### 2. 带注释的JSON Schema

```
返回格式要求：
{
  "name": "string - 用户姓名",
  "age": "number - 用户年龄（0-150）",
  "skills": ["string array - 技能列表"]
}
```

### 3. TypeScript 类型定义风格

```
用TypeScript类型返回：
interface User {
  name: string;
  age: number;
  email?: string;
  skills: string[];
}
```

### 4. 处理复杂嵌套

```
对于数组对象，明确每个元素的结构：
items 数组中每个元素包含：
{
  "product_id": "商品ID",
  "name": "商品名",
  "price": 价格（数字）,
  "tags": ["标签列表"]
}
```
