# Node.js 后端开发实战

## 一、从零开始：创建第一个 Node.js 服务器

### 1.1 初始化项目

```bash
# 创建项目目录
mkdir node-backend && cd node-backend

# 初始化 npm 项目
npm init -y

# 安装依赖
npm install express
```

### 1.2 最简单的 HTTP 服务器

```js
// server.js
const http = require('http');

const server = http.createServer((req, res) => {
  // 设置响应头
  res.writeHead(200, { 'Content-Type': 'application/json' });
  
  // 响应数据
  res.end(JSON.stringify({ 
    message: 'Hello from Node.js!',
    status: 'success'
  }));
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
```

运行方式：
```bash
node server.js
```

---

## 二、使用 Express 框架

### 2.1 基本 Express 应用

```js
// app.js
const express = require('express');
const app = express();
const PORT = 3000;

// 中间件：解析 JSON 请求体
app.use(express.json());

// GET 请求
app.get('/', (req, res) => {
  res.send('Welcome to Express!');
});

// POST 请求
app.post('/api/user', (req, res) => {
  const { name, email } = req.body;
  res.json({
    message: 'User created',
    user: { name, email }
  });
});

app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}/`);
});
```

### 2.2 路由模块

```js
// routes/users.js
const express = require('express');
const router = express.Router();

// 模拟用户数据
let users = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' }
];

// 获取所有用户
router.get('/', (req, res) => {
  res.json(users);
});

// 获取单个用户
router.get('/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

// 创建用户
router.post('/', (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    email: req.body.email
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

// 更新用户
router.put('/:id', (req, res) => {
  const index = users.findIndex(u => u.id === parseInt(req.params.id));
  if (index !== -1) {
    users[index] = { ...users[index], ...req.body };
    res.json(users[index]);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

// 删除用户
router.delete('/:id', (req, res) => {
  const initialLength = users.length;
  users = users.filter(u => u.id !== parseInt(req.params.id));
  if (users.length < initialLength) {
    res.json({ message: 'User deleted' });
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

module.exports = router;
```

### 2.3 在主应用中使用路由

```js
// app.js
const express = require('express');
const app = express();
const userRoutes = require('./routes/users');

app.use(express.json());

// 使用用户路由
app.use('/api/users', userRoutes);

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

---

## 三、中间件

### 3.1 自定义中间件

```js
// middlewares/logger.js
const logger = (req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next(); // 调用下一个中间件
};

module.exports = logger;
```

```js
// app.js
const logger = require('./middlewares/logger');

app.use(logger); // 应用全局中间件
```

### 3.2 错误处理中间件

```js
// middlewares/errorHandler.js
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: err.message
  });
};

module.exports = errorHandler;
```

```js
// app.js
const errorHandler = require('./middlewares/errorHandler');

app.use(errorHandler); // 放在所有路由之后
```

### 3.3 常用第三方中间件

```bash
npm install cors morgan helmet
```

```js
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');

app.use(cors());        // 处理跨域
app.use(morgan('dev')); // 日志记录
app.use(helmet());      // 安全头设置
```

---

## 四、数据库操作

### 4.1 使用 MongoDB (Mongoose)

```bash
npm install mongoose
```

```js
// config/database.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/myapp');
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

module.exports = connectDB;
```

```js
// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  age: {
    type: Number,
    min: 18
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema);
```

```js
// controllers/userController.js
const User = require('../models/User');

// 获取所有用户
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 创建用户
exports.createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
```

### 4.2 使用 MySQL

```bash
npm install mysql2
```

```js
// config/database.js
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'myapp',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
```

```js
// controllers/userController.js
const pool = require('../config/database');

exports.getAllUsers = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createUser = async (req, res) => {
  const { name, email } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO users (name, email) VALUES (?, ?)',
      [name, email]
    );
    res.status(201).json({ id: result.insertId, name, email });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
```

---

## 五、身份认证

### 5.1 JWT 认证

```bash
npm install jsonwebtoken bcryptjs
```

```js
// utils/jwt.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// 生成 Token
const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
};

// 验证密码
const comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

// 加密密码
const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

module.exports = { generateToken, comparePassword, hashPassword };
```

```js
// middlewares/auth.js
const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = authenticate;
```

```js
// routes/auth.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { generateToken, comparePassword, hashPassword } = require('../utils/jwt');

// 注册
router.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    
    // 检查用户是否已存在
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }
    
    // 加密密码
    const hashedPassword = await hashPassword(password);
    
    // 创建用户
    const user = new User({ email, password: hashedPassword, name });
    await user.save();
    
    // 生成 Token
    const token = generateToken(user);
    
    res.status(201).json({ user, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 登录
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const token = generateToken(user);
    res.json({ user, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
```

---

## 六、环境变量

```bash
npm install dotenv
```

创建 `.env` 文件：
```env
PORT=3000
JWT_SECRET=your-secret-key-here
DB_HOST=localhost
DB_NAME=myapp
DB_USER=root
DB_PASSWORD=password
```

```js
// app.js
require('dotenv').config();

const PORT = process.env.PORT || 3000;
```

---

## 七、项目结构

```
node-backend/
├── app.js                    # 主应用入口
├── server.js                 # 服务器启动文件
├── .env                      # 环境变量
├── package.json
├── routes/                   # 路由
│   ├── users.js
│   ├── auth.js
│   └── posts.js
├── controllers/              # 控制器
│   ├── userController.js
│   └── postController.js
├── models/                   # 数据库模型
│   ├── User.js
│   └── Post.js
├── middlewares/              # 中间件
│   ├── auth.js
│   ├── logger.js
│   └── errorHandler.js
├── config/                   # 配置文件
│   └── database.js
├── utils/                    # 工具函数
│   └── jwt.js
└── public/                   # 静态资源
```

---

## 八、完整示例：待办事项 API

```js
// routes/todos.js
const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/auth');

let todos = [];

// 获取所有待办事项（需要认证）
router.get('/', authenticate, (req, res) => {
  const userTodos = todos.filter(t => t.userId === req.user.id);
  res.json(userTodos);
});

// 创建待办事项
router.post('/', authenticate, (req, res) => {
  const todo = {
    id: todos.length + 1,
    userId: req.user.id,
    title: req.body.title,
    completed: false,
    createdAt: new Date()
  };
  todos.push(todo);
  res.status(201).json(todo);
});

// 更新待办事项
router.put('/:id', authenticate, (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id) && t.userId === req.user.id);
  if (todo) {
    todo.completed = req.body.completed;
    res.json(todo);
  } else {
    res.status(404).json({ error: 'Todo not found' });
  }
});

// 删除待办事项
router.delete('/:id', authenticate, (req, res) => {
  const initialLength = todos.length;
  todos = todos.filter(t => !(t.id === parseInt(req.params.id) && t.userId === req.user.id));
  if (todos.length < initialLength) {
    res.json({ message: 'Todo deleted' });
  } else {
    res.status(404).json({ error: 'Todo not found' });
  }
});

module.exports = router;
```

---

## 九、运行项目

```bash
# 开发模式（使用 nodemon 自动重启）
npm install -D nodemon
```

在 `package.json` 中添加脚本：
```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

运行：
```bash
npm run dev
```

---

## 十、测试 API

使用 curl 或 Postman 测试：

```bash
# 注册
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "123456", "name": "Test User"}'

# 登录
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "123456"}'

# 获取待办事项（需要 Token）
curl -X GET http://localhost:3000/api/todos \
  -H "Authorization: Bearer YOUR_TOKEN"

# 创建待办事项
curl -X POST http://localhost:3000/api/todos \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title": "Learn Node.js"}'
```

---

## 十一、部署建议

### 11.1 使用 PM2 管理进程

```bash
npm install -g pm2

# 启动应用
pm2 start server.js --name myapp

# 查看状态
pm2 status

# 重启应用
pm2 restart myapp

# 查看日志
pm2 logs myapp
```

### 11.2 使用 Docker

创建 `Dockerfile`：
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]
```

```bash
# 构建镜像
docker build -t my-node-app .

# 运行容器
docker run -p 3000:3000 my-node-app
```

---

## 总结

Node.js 后端开发的核心要素：
1. **框架选择**：Express（轻量）或 NestJS（企业级）
2. **路由设计**：RESTful API 规范
3. **中间件**：处理请求、认证、错误处理
4. **数据库**：MongoDB（文档型）或 MySQL（关系型）
5. **认证**：JWT 无状态认证
6. **项目结构**：模块化、可维护

现在你可以开始编写自己的 Node.js 后端应用了！