# HTTP 请求方式详解

## 一、HTTP 请求方法概述

HTTP（Hypertext Transfer Protocol）定义了多种请求方法，用于表示对服务器资源的操作类型。

| 请求方法 | 说明 | 幂等性 | 是否有请求体 |
|----------|------|--------|-------------|
| **GET** | 请求从服务器获取资源 | 是 | 否 |
| **POST** | 向服务器发送数据创建资源 | 否 | 是 |
| **PUT** | 更新指定资源的全部数据 | 是 | 是 |
| **PATCH** | 更新指定资源的部分数据 | 否 | 是 |
| **DELETE** | 删除指定资源 | 是 | 否 |
| **HEAD** | 获取响应头，不返回响应体 | 是 | 否 |
| **OPTIONS** | 获取服务器支持的请求方法 | 是 | 否 |
| **TRACE** | 回显请求用于诊断 | 是 | 否 |
| **CONNECT** | 建立隧道连接 | 否 | 否 |

## 二、常用请求方法详解

### 2.1 GET - 获取资源

**用途**：从服务器检索数据或资源

**特点**：
- 请求参数通过 URL 查询字符串传递
- 数据量有限（通常 2KB - 8KB）
- 可被缓存、书签、分享
- 幂等性：多次请求结果相同

**示例**：
```http
GET /api/users?id=123 HTTP/1.1
Host: example.com
Accept: application/json
```

**使用场景**：
- 查询数据列表
- 获取单个资源详情
- 搜索、过滤操作

### 2.2 POST - 创建资源

**用途**：向服务器提交数据，创建新资源

**特点**：
- 数据放在请求体中
- 数据量无明确限制
- 不可被缓存
- 非幂等：多次请求可能产生不同结果

**示例**：
```http
POST /api/users HTTP/1.1
Host: example.com
Content-Type: application/json
Content-Length: 45

{
  "name": "Alice",
  "email": "alice@example.com"
}
```

**使用场景**：
- 提交表单（登录、注册）
- 创建新记录
- 上传文件

### 2.3 PUT - 更新资源

**用途**：更新指定资源的全部内容

**特点**：
- 更新整个资源对象
- 幂等性：多次执行结果相同
- 资源不存在时可能创建新资源

**示例**：
```http
PUT /api/users/123 HTTP/1.1
Host: example.com
Content-Type: application/json

{
  "id": 123,
  "name": "Alice Updated",
  "email": "alice.new@example.com"
}
```

**使用场景**：
- 完整更新资源
- 替换整个对象

### 2.4 PATCH - 部分更新

**用途**：更新资源的部分字段

**特点**：
- 只更新指定字段
- 非幂等性
- 带宽效率更高

**示例**：
```http
PATCH /api/users/123 HTTP/1.1
Host: example.com
Content-Type: application/json

{
  "email": "alice.updated@example.com"
}
```

**使用场景**：
- 部分字段更新
- 增量更新

### 2.5 DELETE - 删除资源

**用途**：删除指定资源

**特点**：
- 幂等性
- 通常无请求体

**示例**：
```http
DELETE /api/users/123 HTTP/1.1
Host: example.com
```

**使用场景**：
- 删除记录
- 取消订单

### 2.6 HEAD - 获取响应头

**用途**：获取资源元数据，不返回响应体

**特点**：
- 响应只有头部信息
- 可用于检查资源是否存在
- 可获取 Content-Length、Last-Modified 等

**示例**：
```http
HEAD /api/users/123 HTTP/1.1
Host: example.com
```

**使用场景**：
- 检查资源是否存在
- 获取文件大小
- 检查资源更新时间

### 2.7 OPTIONS - 预检请求

**用途**：获取服务器支持的请求方法

**特点**：
- 常用于 CORS 预检请求
- 返回 Allow 头列出支持的方法

**示例**：
```http
OPTIONS /api/users HTTP/1.1
Host: example.com
Access-Control-Request-Method: POST
```

**使用场景**：
- CORS 跨域预检
- 探测服务器能力

## 三、GET 和 POST 的详细对比

| 特性 | GET | POST |
|------|-----|------|
| **主要用途** | 获取资源 | 创建/更新资源 |
| **请求体** | 无 | 有 |
| **数据位置** | URL 查询参数 | 请求体 |
| **数据大小限制** | 受 URL 长度限制 | 理论无限制 |
| **安全性** | 数据明文显示在 URL | 数据在请求体中 |
| **缓存** | 可缓存 | 不可缓存 |
| **幂等性** | 是 | 否 |
| **书签/历史** | 可收藏 | 不可收藏 |
| **编码类型** | application/x-www-form-urlencoded | multipart/form-data, application/json |

## 四、HTTP 请求头详解

### 4.1 常用请求头

| 请求头 | 说明 | 示例 |
|--------|------|------|
| **Host** | 请求的主机名 | `Host: api.example.com` |
| **Content-Type** | 请求体的媒体类型 | `application/json` |
| **Content-Length** | 请求体长度 | `Content-Length: 100` |
| **Accept** | 接受的响应格式 | `application/json, text/html` |
| **Authorization** | 身份认证信息 | `Bearer token` |
| **Cache-Control** | 缓存控制 | `no-cache` |
| **User-Agent** | 用户代理 | `Mozilla/5.0` |
| **Referer** | 来源页面 | `https://example.com` |
| **Origin** | 请求来源 | `https://example.com` |

### 4.2 Content-Type 常见值

| Content-Type | 用途 |
|--------------|------|
| `application/json` | JSON 数据 |
| `application/x-www-form-urlencoded` | 表单数据 |
| `multipart/form-data` | 文件上传 |
| `text/plain` | 纯文本 |
| `application/xml` | XML 数据 |

## 五、HTTP 响应状态码

### 5.1 状态码分类

| 分类 | 范围 | 说明 |
|------|------|------|
| **1xx** | 100-199 | 信息性响应 |
| **2xx** | 200-299 | 成功 |
| **3xx** | 300-399 | 重定向 |
| **4xx** | 400-499 | 客户端错误 |
| **5xx** | 500-599 | 服务器错误 |

### 5.2 常用状态码

| 状态码 | 说明 | 场景 |
|--------|------|------|
| 200 | OK | 请求成功 |
| 201 | Created | 资源创建成功 |
| 204 | No Content | 请求成功无响应体 |
| 301 | Moved Permanently | 永久重定向 |
| 302 | Found | 临时重定向 |
| 400 | Bad Request | 请求参数错误 |
| 401 | Unauthorized | 未授权 |
| 403 | Forbidden | 禁止访问 |
| 404 | Not Found | 资源不存在 |
| 405 | Method Not Allowed | 不支持的请求方法 |
| 422 | Unprocessable Entity | 请求体格式正确但语义错误 |
| 500 | Internal Server Error | 服务器内部错误 |
| 502 | Bad Gateway | 网关错误 |
| 503 | Service Unavailable | 服务不可用 |

## 六、RESTful API 最佳实践

### 6.1 资源命名规范

```http
# 资源集合
GET    /api/users          # 获取用户列表
POST   /api/users          # 创建用户

# 单个资源
GET    /api/users/{id}     # 获取单个用户
PUT    /api/users/{id}     # 更新用户
PATCH  /api/users/{id}     # 部分更新用户
DELETE /api/users/{id}     # 删除用户

# 嵌套资源
GET    /api/users/{id}/posts    # 获取用户的帖子
POST   /api/users/{id}/posts    # 用户创建帖子
```

### 6.2 过滤、排序、分页

```http
# 过滤
GET /api/users?status=active

# 排序
GET /api/users?sort=name,asc

# 分页
GET /api/users?page=1&limit=10

# 组合使用
GET /api/users?status=active&sort=name,asc&page=1&limit=10
```

## 七、安全注意事项

### 7.1 防止 CSRF 攻击

- 使用 CSRF Token
- 验证 Referer 头
- 使用 SameSite Cookie

### 7.2 防止 SQL 注入

- 使用参数化查询
- 输入验证和过滤

### 7.3 HTTPS

- 所有生产环境应使用 HTTPS
- 敏感数据必须加密传输

## 八、实际示例

### 8.1 使用 curl 发送请求

```bash
# GET 请求
curl https://api.example.com/users

# POST 请求
curl -X POST -H "Content-Type: application/json" \
  -d '{"name":"Alice"}' \
  https://api.example.com/users

# PUT 请求
curl -X PUT -H "Content-Type: application/json" \
  -d '{"name":"Alice Updated"}' \
  https://api.example.com/users/123

# DELETE 请求
curl -X DELETE https://api.example.com/users/123
```

### 8.2 使用 JavaScript Fetch API

```javascript
// GET
fetch('/api/users')
  .then(res => res.json())
  .then(data => console.log(data));

// POST
fetch('/api/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'Alice' })
});

// PUT
fetch('/api/users/123', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'Updated' })
});

// DELETE
fetch('/api/users/123', { method: 'DELETE' });
```

## 总结

理解 HTTP 请求方法是构建和使用 Web API 的基础：

1. **GET** - 安全获取资源
2. **POST** - 创建新资源
3. **PUT** - 完整更新资源
4. **PATCH** - 部分更新资源
5. **DELETE** - 删除资源
6. **HEAD/OPTIONS** - 辅助性请求

遵循 RESTful 规范可以使 API 更加清晰、易于理解和维护。