# Docker 基础

Docker 是一个开源的容器化平台，用于开发、部署和运行应用程序。

## 一、核心概念

| 概念 | 说明 |
|------|------|
| 镜像（Image） | 模板，只读 |
| 容器（Container） | 镜像的运行实例 |
| 仓库（Repository） | 镜像存储 |

## 二、基本命令

### 镜像操作

```bash
# 查看镜像列表
docker images

# 拉取镜像
docker pull nginx:latest

# 删除镜像
docker rmi nginx:latest

# 构建镜像
docker build -t my-app .

# 查看镜像详情
docker inspect nginx:latest
```

### 容器操作

```bash
# 运行容器
docker run -d -p 8080:80 --name my-nginx nginx

# 参数说明
# -d 后台运行
# -p 端口映射（主机端口:容器端口）
# --name 容器名称

# 查看运行中的容器
docker ps

# 查看所有容器
docker ps -a

# 停止容器
docker stop my-nginx

# 启动容器
docker start my-nginx

# 删除容器
docker rm my-nginx

# 查看容器日志
docker logs -f my-nginx

# 进入容器
docker exec -it my-nginx bash

# 查看容器详情
docker inspect my-nginx
```

## 三、Dockerfile

Dockerfile 是用于构建镜像的配置文件。

```dockerfile
# 基础镜像
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

### 常用指令

| 指令 | 说明 |
|------|------|
| FROM | 基础镜像 |
| WORKDIR | 工作目录 |
| COPY | 复制文件 |
| RUN | 执行命令 |
| EXPOSE | 暴露端口 |
| CMD | 启动命令 |
| ENV | 环境变量 |

## 四、Docker Compose

Docker Compose 用于定义和运行多容器应用。

### docker-compose.yml

```yaml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    depends_on:
      - db

  db:
    image: postgres:15
    environment:
      POSTGRES_PASSWORD: secret
    volumes:
      - db-data:/var/lib/postgresql/data

volumes:
  db-data:
```

### 常用命令

```bash
# 启动所有服务
docker-compose up -d

# 停止所有服务
docker-compose down

# 查看服务状态
docker-compose ps

# 查看日志
docker-compose logs -f

# 构建镜像
docker-compose build

# 重启服务
docker-compose restart
```

## 五、网络配置

```bash
# 创建网络
docker network create my-network

# 运行容器并加入网络
docker run -d --network my-network --name my-app my-app

# 查看网络
docker network ls

# 查看网络详情
docker network inspect my-network
```

## 六、数据卷

```bash
# 创建数据卷
docker volume create my-data

# 挂载数据卷
docker run -v my-data:/app/data my-app

# 挂载主机目录
docker run -v /host/path:/container/path my-app

# 查看数据卷
docker volume ls
```

## 七、常用示例

### Nginx

```bash
# 运行 Nginx
docker run -d -p 80:80 --name nginx nginx
```

### MySQL

```bash
docker run -d -p 3306:3306 \
  --name mysql \
  -e MYSQL_ROOT_PASSWORD=secret \
  -e MYSQL_DATABASE=myapp \
  mysql:8
```

### Redis

```bash
docker run -d -p 6379:6379 \
  --name redis \
  redis:alpine
```

### MongoDB

```bash
docker run -d -p 27017:27017 \
  --name mongodb \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=secret \
  mongo:6
```

## 八、优化建议

### 1. 减小镜像体积

```dockerfile
# 使用 alpine 镜像
FROM node:18-alpine

# 多阶段构建
FROM node:18-alpine AS builder
WORKDIR /app
COPY . .
RUN npm ci

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
CMD ["node", "dist/server.js"]
```

### 2. 使用 .dockerignore

```
node_modules
.git
dist
*.md
```

### 3. 合理使用缓存

```dockerfile
# 频繁变化的文件放后面
COPY package*.json ./
RUN npm ci
COPY . .
```

## 九、清理命令

```bash
# 清理停止的容器
docker container prune

# 清理 dangling 镜像
docker image prune

# 清理所有未使用镜像
docker image prune -a

# 清理构建缓存
docker builder prune

# 清理全部
docker system prune -a
```