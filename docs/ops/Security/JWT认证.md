# JWT 是什么

## 一、简单理解 JWT

**JWT** 全称是 **JSON Web Token**，是一种用于安全传输信息的轻量级方式。

### 类比理解

想象一下，你去游乐园：

```
┌─────────────────────────────────────────────────────────┐
│                    游乐园入口                            │
│                                                        │
│  你 ──(出示身份证)──→ 检票员 ──(发放门票)──→ 你         │
│    │                    │                    │          │
│    │                    ▼                    │          │
│    │              验证身份                  │          │
│    │                                        ▼          │
│    └──────────────────────────────→ 凭票进入各个游乐设施  │
└─────────────────────────────────────────────────────────┘
```

- **身份证**：你的用户名密码
- **门票**：JWT Token
- **游乐设施**：需要认证的 API 接口

### JWT 的作用

1. **身份认证**：用户登录后，服务器发放 Token，后续请求携带 Token 即可证明身份
2. **信息交换**：Token 中可以包含用户信息，避免每次都查数据库
3. **无状态认证**：服务器不需要保存会话，便于水平扩展

---

## 二、JWT 的结构

JWT 由三部分组成，用 `.` 分隔：

```
Header.Payload.Signature
```

### 1. Header（头部）

包含 Token 类型和加密算法：

```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

### 2. Payload（载荷）

包含要传递的信息（**注意：Payload 是 Base64 编码，不是加密，不要放敏感信息！**）：

```json
{
  "sub": "1234567890",
  "name": "John Doe",
  "admin": true,
  "exp": 1516239022
}
```

**常用声明**：
- `sub`：主题（通常是用户 ID）
- `exp`：过期时间（时间戳）
- `iat`：签发时间
- `iss`：签发者
- `aud`：受众

### 3. Signature（签名）

用于验证 Token 的完整性和真实性：

```
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  secret
)
```

---

## 三、JWT 工作流程

```
┌──────────────┐     1. 登录请求      ┌──────────────┐
│   客户端      │ ──────────────────→ │    服务器     │
│              │ ←─────────────────→ │              │
│              │    2. 返回 JWT       │              │
└──────┬───────┘                     └──────┬───────┘
       │                                    │
       │ 3. 请求 API 携带 JWT               │
       ↓                                    ↓
┌──────────────┐                     ┌──────────────┐
│   客户端      │ ──────────────────→ │    服务器     │
│   (Token)    │                      │  验证 Token  │
└──────────────┘                     └──────────────┘
```

**详细步骤**：

1. **用户登录**：客户端发送用户名和密码到服务器
2. **服务器验证**：验证用户名密码正确后，生成 JWT
3. **返回 Token**：服务器将 Token 返回给客户端
4. **客户端存储**：客户端将 Token 存储在 localStorage 或 cookie 中
5. **后续请求**：每次请求时在请求头中携带 Token
6. **服务器验证 Token**：服务器验证 Token 的签名和过期时间

---

## 四、JWT vs Session

| 特性 | JWT | Session |
|------|-----|---------|
| **状态保存** | 无状态（Token 在客户端） | 有状态（Session 在服务端） |
| **扩展性** | 好（适合分布式系统） | 差（需要 Session 共享） |
| **存储** | 客户端（localStorage/cookie） | 服务端（内存/Redis） |
| **跨域** | 容易 | 较复杂 |
| **过期处理** | Token 自带过期时间 | 需要服务端管理 |
| **安全性** | 需要 HTTPS 保护 | 需要 HTTPS 保护 |

---

## 五、代码示例

### 5.1 生成 JWT

```bash
npm install jsonwebtoken
```

```js
const jwt = require('jsonwebtoken');

// 用户信息
const user = {
  id: 1,
  username: 'john_doe',
  role: 'admin'
};

// 生成 Token（密钥需要保密！）
const token = jwt.sign(
  user, 
  'your-secret-key', 
  { expiresIn: '1h' } // 过期时间
);

console.log(token);
// 输出类似: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJqb2huX2RvZSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTUxNjIzOTAyMn0.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

### 5.2 验证 JWT

```js
const jwt = require('jsonwebtoken');

// 中间件：验证 Token
const authenticate = (req, res, next) => {
  // 从请求头获取 Token
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ error: '未提供 Token' });
  }
  
  try {
    // 验证 Token
    const decoded = jwt.verify(token, 'your-secret-key');
    
    // 将用户信息存入请求对象
    req.user = decoded;
    
    // 继续处理请求
    next();
  } catch (err) {
    res.status(401).json({ error: '无效的 Token' });
  }
};

// 使用中间件保护路由
app.get('/api/profile', authenticate, (req, res) => {
  res.json({ user: req.user });
});
```

### 5.3 使用环境变量

```bash
npm install dotenv
```

创建 `.env` 文件：
```env
JWT_SECRET=your-very-long-and-secure-secret-key-here
```

```js
require('dotenv').config();

// 使用环境变量中的密钥
const token = jwt.sign(user, process.env.JWT_SECRET);
```

---

## 六、安全注意事项

### 重要提醒

1. **密钥必须保密**：不要硬编码密钥，使用环境变量
2. **使用 HTTPS**：防止 Token 被窃取
3. **设置合理的过期时间**：不要设置过长的过期时间
4. **Payload 不是加密的**：不要在 Payload 中存放敏感信息（如密码）
5. **Token 存储**：
   - Web 端：使用 `HttpOnly` + `Secure` cookie，或 localStorage（需防范 XSS）
   - 移动端：使用安全的存储机制

### 常见攻击与防范

| 攻击类型 | 描述 | 防范措施 |
|----------|------|----------|
| **XSS** | 窃取 localStorage 中的 Token | 使用 HttpOnly cookie 或对数据进行转义 |
| **CSRF** | 利用用户已认证的状态发起请求 | 使用 CSRF Token |
| **Token 劫持** | 中间人攻击窃取 Token | 使用 HTTPS |
| **暴力破解** | 猜测密钥 | 使用足够长的随机密钥 |

---

## 七、总结

**JWT 是一种无状态的身份认证机制**，通过在客户端存储 Token 来实现认证。它的优点是：

- 无需在服务端保存会话状态
- 便于水平扩展
- 支持跨域

但也需要注意安全问题，特别是密钥管理和传输安全。

如果你需要在实际项目中使用 JWT，可以参考我之前创建的 [node后端实战.md](file:///e:/note/my-blog/docs/backend/node/node后端实战.md) 中的完整示例。