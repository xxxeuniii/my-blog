# DevOps

DevOps（开发运维）是一种融合开发与运维的实践文化，旨在提高软件交付效率和质量。

## 一、什么是 DevOps

### 定义

DevOps = Development（开发） + Operations（运维）

通过自动化流程，使开发、测试、部署更加高效。

### 传统 vs DevOps

```
传统模式：
开发 → 测试 → 部署 → 运维（各自独立，流程慢）

DevOps 模式：
开发 ↔ 测试 ↔ 部署 ↔ 运维（自动化，持续快速交付）
```

### 核心价值

- **更快交付** - 自动化减少人工操作
- **更高质量** - 自动化测试保证质量
- **更可靠** - 持续监控，快速回滚

## 二、DevOps 流程

```
┌─────────────────────────────────────────────────────────┐
│                    DevOps 流程图                           │
├─────────────────────────────────────────────────────────┤
│                                                         │
│   代码编写 ──► 提交 ──► 构建 ──► 测试 ──► 部署 ──► 监控 │
│      ↑                                    │             │
│      └────────────────────────────────────┘             │
│                  持续反馈与改进                           │
└─────────────────────────────────────────────────────────┘
```

### 关键环节

| 环节 | 说明 |
|------|------|
| **CI（持续集成）** | 频繁提交代码，自动构建和测试 |
| **CD（持续交付/部署）** | 自动部署到生产环境 |
| **监控** | 实时监控应用状态 |

## 三、CI/CD 流水线

### 典型流程

```yaml
# GitHub Actions 示例
name: CI/CD Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install Dependencies
        run: npm ci

      - name: Run Lint
        run: npm run lint

      - name: Run Tests
        run: npm test

      - name: Build
        run: npm run build

      - name: Deploy
        run: npm run deploy
```

### 阶段说明

| 阶段 | 工具 | 说明 |
|------|------|------|
| 代码检查 | ESLint, Prettier | 代码规范 |
| 测试 | Jest, Mocha | 单元测试/集成测试 |
| 构建 | Webpack, Vite | 打包构建 |
| 部署 | GitHub Actions, Jenkins | 自动部署 |

## 四、常用工具

### 代码管理

| 工具 | 说明 |
|------|------|
| GitHub | 代码托管 |
| GitLab | 代码托管 |
| Gitee | 码云 |

### CI/CD

| 工具 | 说明 |
|------|------|
| GitHub Actions | GitHub 内置 |
| GitLab CI | GitLab 内置 |
| Jenkins | 老牌 CI 工具 |
| Travis CI | 国外 CI |
| CircleCI | 国外 CI |

### 容器化

| 工具 | 说明 |
|------|------|
| Docker | 容器引擎 |
| Kubernetes | 容器编排 |

### 监控

| 工具 | 说明 |
|------|------|
| Prometheus | 监控指标 |
| Grafana | 可视化 |
| ELK | 日志分析 |

## 五、Docker 基础

### 什么是 Docker

Docker 是容器技术，把应用和依赖打包成镜像，快速部署。

### 核心概念

| 概念 | 说明 |
|------|------|
| **镜像（Image）** | 模板，只读 |
| **容器（Container）** | 镜像的运行实例 |
| **仓库（Repository）** | 镜像存储 |

### 基本命令

```bash
# 构建镜像
docker build -t my-app .

# 运行容器
docker run -p 3000:3000 my-app

# 查看运行中的容器
docker ps

# 停止容器
docker stop container_id

# 删除容器
docker rm container_id
```

### Dockerfile 示例

```dockerfile
# 基于 Node.js 镜像
FROM node:18-alpine

# 设置工作目录
WORKDIR /app

# 复制文件
COPY package*.json ./

# 安装依赖
RUN npm ci --only=production

# 复制源码
COPY . .

# 暴露端口
EXPOSE 3000

# 启动命令
CMD ["node", "server.js"]
```

## 六、自动化部署示例

### 前端项目

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: 18

      - name: Install & Build
        run: |
          npm ci
          npm run build

      - name: Deploy to Server
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.HOST }}
          username: ${{ secrets.USERNAME }}
          key: ${{ secrets.SSH_KEY }}
          script: |
            cd /var/www/my-app
            docker-compose pull
            docker-compose up -d
```

### Docker Compose

```yaml
# docker-compose.yml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    restart: always

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
    depends_on:
      - web
```

## 七、Kubernetes（K8s）

### 什么是 K8s

Kubernetes 是容器编排工具，管理大量容器。

### 核心概念

| 概念 | 说明 |
|------|------|
| **Pod** | 最小部署单元，包含一个或多个容器 |
| **Deployment** | 管理 Pod 的部署 |
| **Service** | 服务发现和负载均衡 |
| **Ingress** | HTTP/HTTPS 路由 |

### 示例

```yaml
# deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
    spec:
      containers:
      - name: my-app
        image: my-app:latest
        ports:
        - containerPort: 3000
```

## 八、监控与日志

### 监控指标

| 指标 | 说明 |
|------|------|
| CPU 使用率 | 资源消耗 |
| 内存使用 | 内存占用 |
| 请求延迟 | 响应时间 |
| 错误率 | 失败请求比例 |
| QPS | 每秒请求数 |

### 日志收集

```
应用日志 → Filebeat → Logstash → Elasticsearch → Kibana
```

### 告警

```yaml
# Prometheus 告警规则
- alert: HighErrorRate
  expr: rate(http_requests_total{status=~"5.."}[5m]) > 0.1
  for: 5m
  labels:
    severity: critical
  annotations:
    summary: "High error rate detected"
```

## 九、DevOps 最佳实践

### 1. 小步快跑

- 频繁提交代码
- 小的变更更容易review和回滚

### 2. 自动化一切

- 自动化测试
- 自动化部署
- 自动化监控

### 3. 监控一切

- 应用性能监控
- 业务指标监控
- 基础设施监控

### 4. 快速反馈

- 部署失败立即通知
- 性能问题及时发现

## 十、总结

DevOps 的核心：
- **自动化** - 减少人工操作
- **持续性** - 持续集成、交付、部署
- **监控** - 快速发现问题
- **协作** - 开发与运维一体化

工具选择建议：
- 小团队：GitHub Actions + Vercel
- 中型团队：GitLab CI + Docker
- 大型企业：Jenkins + Kubernetes