# 云服务器配置与 SSH 免登录

## 一、什么是 SSH

SSH（Secure Shell）是一种加密的网络协议，用于安全地远程登录服务器。类比：SSH = "远程控制服务器的加密钥匙"。

```
本地电脑 ──[SSH 加密隧道]──► 云服务器
         (密码或密钥验证)
```

---

## 二、SSH 免登录原理

### 2.1 传统密码登录的缺点

- 需要记忆密码
- 密码容易被暴力破解
- 每次登录都要输入密码

### 2.2 密钥登录原理（公私钥机制）

```
┌─────────────────────────────────────────────────────────┐
│                      本地电脑                            │
│  ┌──────────────┐          ┌──────────────┐            │
│  │   公钥       │          │   私钥       │            │
│  │ (id_rsa.pub) │ ──────►  │  (id_rsa)   │            │
│  └──────┬───────┘  复制到   └──────────────┘            │
│         │            服务器                            │
└─────────┼───────────────────────────────────────────────┘
          │
          ▼ 登录时用私钥加密随机数
┌─────────────────────────────────────────────────────────┐
│                      云服务器                            │
│                    authorized_keys                      │
│                   ┌──────────────┐                      │
│                   │   公钥存储   │ ◄── 验证成功        │
│                   │   位置       │                      │
│                   └──────────────┘                      │
└─────────────────────────────────────────────────────────┘
```

**核心思想**：配对钥匙，私钥在本地，公钥在服务器。有私钥就能开锁。

---

## 三、SSH 免登录配置步骤

### 3.1 本地生成密钥对

```bash
# 默认生成 RSA 密钥对（公钥 + 私钥）
ssh-keygen -t rsa

# 或者指定邮箱（只是注释，方便识别）
ssh-keygen -t rsa -C "your_email@example.com"

# 按回车跳过以下步骤：
# - 输入文件名（默认 id_rsa）
# - 输入密码（留空则无密码，直接回车）
```

生成的钥匙位置：
```
~/.ssh/
├── id_rsa          # 私钥（绝对保密）
├── id_rsa.pub      # 公钥（可以分享）
└── known_hosts      # 已知服务器指纹
```

### 3.2 将公钥复制到服务器

#### 方法一：使用 ssh-copy-id（推荐）

```bash
ssh-copy-id -i ~/.ssh/id_rsa.pub 用户名@服务器IP

# 示例
ssh-copy-id -i ~/.ssh/id_rsa.pub root@192.168.1.100
```

#### 方法二：手动复制

```bash
# 1. 查看本地公钥内容
cat ~/.ssh/id_rsa.pub
# 输出类似：
# ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQC9... your_email@example.com

# 2. 登录服务器，创建 .ssh 目录
ssh root@192.168.1.100
mkdir -p ~/.ssh
chmod 700 ~/.ssh

# 3. 将公钥写入 authorized_keys
echo "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQC9..." >> ~/.ssh/authorized_keys

# 4. 设置权限（非常重要！）
chmod 600 ~/.ssh/authorized_keys
```

### 3.3 测试免登录

```bash
ssh 用户名@服务器IP

# 如果配置成功，应该直接登录，不需要输入密码
```

---

## 四、配置 SSH 连接别名（简化登录）

每次输入 `ssh root@192.168.1.100` 太麻烦，可以设置别名。

### 4.1 编辑 SSH 配置文件

```bash
# 本地编辑 SSH 配置
vim ~/.ssh/config
```

### 4.2 添加服务器配置

```bash
# 腾讯云示例
Host tencent              # 连接别名
    HostName 192.168.1.100  # 服务器 IP
    Port 22                  # SSH 端口（默认22）
    User root                # 登录用户
    IdentityFile ~/.ssh/id_rsa  # 私钥路径

# 阿里云示例
Host aliyun
    HostName 101.132.xxx.xxx
    Port 22
    User root
    IdentityFile ~/.ssh/id_rsa

# GitHub（特殊）
Host github
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_rsa
```

### 4.3 使用别名登录

```bash
# 之前
ssh root@192.168.1.100

# 现在
ssh tencent
```

---

## 五、常见云服务器厂商配置

### 5.1 腾讯云

```bash
# 1. 购买服务器后，在控制台找到「SSH密钥」
# 2. 创建密钥对，下载私钥
# 3. 绑定到云服务器

# 本地使用下载的私钥登录
ssh -i ~/Downloads/tencent_private_key.pem root@服务器IP

# 4. 也可以把公钥导入腾讯云控制台
cat ~/.ssh/id_rsa.pub
# 复制内容，粘贴到腾讯云控制台「SSH密钥」→「导入密钥」
```

### 5.2 阿里云

```bash
# 1. 控制台 → 云服务器 ECS → 密钥对
# 2. 创建密钥对，下载 .pem 私钥

# 登录时指定私钥
ssh -i ~/Downloads/aliyun.pem root@服务器IP
```

### 5.3 华为云

```bash
# 1. 控制台 → 弹性云服务器 → 密钥对
# 2. 创建并下载私钥

ssh -i ~/Downloads/huawei.pem root@服务器IP
```

---

## 六、安全加固配置

### 6.1 禁用密码登录（推荐）

```bash
# 登录服务器
ssh root@服务器IP

# 编辑 SSH 配置
vim /etc/ssh/sshd_config

# 修改以下配置：
PasswordAuthentication no    # 禁用密码登录
PermitRootLogin no           # 禁止 root 直接登录
PubkeyAuthentication yes     # 启用公钥登录

# 重启 SSH 服务
systemctl restart sshd
```

### 6.2 修改默认 SSH 端口

```bash
vim /etc/ssh/sshd_config

# 修改端口（1024-65535 之间）
Port 2222

# 重启服务
systemctl restart sshd

# 本地更新配置
vim ~/.ssh/config
Host tencent
    HostName 192.168.1.100
    Port 2222    # 新端口
    User root
```

### 6.3 防火墙开放端口

```bash
# Ubuntu/Debian (ufw)
ufw allow 2222/tcp
ufw enable

# CentOS/RHEL (firewalld)
firewall-cmd --permanent --add-port=2222/tcp
firewall-cmd --reload
```

---

## 七、常见问题排查

### 7.1 权限问题

```bash
# .ssh 目录权限必须是 700
chmod 700 ~/.ssh

# authorized_keys 权限必须是 600
chmod 600 ~/.ssh/authorized_keys

# 私钥权限必须是 600
chmod 600 ~/.ssh/id_rsa
```

### 7.2 密钥不被识别

```bash
# 手动指定私钥测试
ssh -i ~/.ssh/id_rsa root@服务器IP -v

# -v 表示 verbose 模式，显示详细连接过程
```

### 7.3 仍需密码登录

1. 检查服务器 `~/.ssh/authorized_keys` 是否正确写入
2. 检查文件权限是否正确
3. 检查服务器 SSH 配置是否启用公钥认证

```bash
# 在服务器上检查
cat ~/.ssh/authorized_keys
ls -la ~/.ssh/
```

---

## 八、多服务器管理技巧

### 8.1 使用 SSH Config 管理多台服务器

```bash
vim ~/.ssh/config

# 项目服务器组
Host dev
    HostName 192.168.1.10
    User deploy
    Port 22

Host staging
    HostName 192.168.1.11
    User deploy
    Port 22

Host prod
    HostName 192.168.1.12
    User deploy
    Port 22
```

### 8.2 SSH 连接复用（加速多次连接）

```bash
vim ~/.ssh/config

Host *
    ControlMaster auto
    ControlPath ~/.ssh/sockets/%r@%h-%p
    ControlPersist 600
```

### 8.3 SSH 穿透跳板机

```bash
# 通过跳板机连接内网服务器
Host inner-server
    HostName 192.168.1.100      # 内网 IP
    User root
    ProxyJump jump-server@跳板机IP
```

---

## 九、总结

| 步骤 | 操作 | 命令 |
|------|------|------|
| 1 | 本地生成密钥 | `ssh-keygen -t rsa` |
| 2 | 复制公钥到服务器 | `ssh-copy-id user@ip` |
| 3 | 测试免登录 | `ssh user@ip` |
| 4 | 配置别名简化登录 | `vim ~/.ssh/config` |
| 5 | 禁用密码登录 | 修改 `/etc/ssh/sshd_config` |

**核心概念**：
- **公钥**：放在服务器，用于验证
- **私钥**：本地保管，用于登录
- **authorized_keys**：存储公钥的文件

---

## 十、CI/CD 持续集成与持续部署

### 10.1 什么是 CI/CD

| 概念 | 全称 | 含义 | 类比 |
|------|------|------|------|
| **CI** | Continuous Integration | 持续集成：代码提交后自动构建、测试 | 流水线装配线 |
| **CD** | Continuous Delivery | 持续交付：自动把代码部署到测试环境 | 打包好准备发货 |
| **CD** | Continuous Deployment | 持续部署：自动把代码部署到生产环境 | 全自动发货 |

**工作流程**：
```
代码提交 → 自动构建 → 自动测试 → 自动部署
   ↑           ↑          ↑          ↑
 Git Hook   GitHub Actions / Jenkins / GitLab CI
```

### 10.2 CI/CD 工具对比

| 工具 | 特点 | 适用场景 |
|------|------|----------|
| **GitHub Actions** | 与 GitHub 深度集成，免费额度大 | GitHub 项目首选 |
| **GitLab CI** | GitLab 内置，配置简单 | GitLab 用户 |
| **Jenkins** | 插件丰富，灵活度高 | 企业级复杂项目 |
| **Gitee Go** | 码云内置，免费 | 国内 Gitee 项目 |

### 10.3 GitHub Actions + SSH 自动部署

#### 第一步：生成部署密钥

```bash
# 生成专门用于部署的密钥对（不要用平时的 ssh-key）
ssh-keygen -t ed25519 -C "deploy@github-actions" -f ~/.ssh/deploy_key

# 将公钥添加到服务器的 ~/.ssh/authorized_keys
ssh-copy-id -i ~/.ssh/deploy_key.pub root@服务器IP
```

#### 第二步：配置 GitHub Secrets

在 GitHub 仓库中配置敏感信息：

1. 进入仓库 → Settings → Secrets and variables → Actions
2. 添加以下 Secrets：

| Secret 名称 | 值 |
|-------------|-----|
| `DEPLOY_HOST` | 服务器 IP（如 `192.168.1.100`） |
| `DEPLOY_USER` | 登录用户（如 `root`） |
| `DEPLOY_KEY` | 私钥内容（`cat ~/.ssh/deploy_key` 的全部内容） |

#### 第三步：编写 Workflow 文件

在项目根目录创建 `.github/workflows/deploy.yml`：

```yaml
name: Deploy to Server

on:
  push:
    branches:
      - main    # main 分支推送时触发

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build project
        run: npm run build

      - name: Deploy to server via SSH
        uses: appleboy/ssh-action@v1.0.3
        with:
          host: ${{ secrets.DEPLOY_HOST }}
          username: ${{ secrets.DEPLOY_USER }}
          key: ${{ secrets.DEPLOY_KEY }}
          script: |
            cd /var/www/my-project
            git pull origin main
            npm install
            npm run build
            pm2 restart all
```

#### 第四步：简化部署脚本

在服务器上创建部署脚本：

```bash
# /var/www/deploy.sh
#!/bin/bash

cd /var/www/my-project
git pull origin main
npm install
npm run build

# 重启服务
pm2 restart all
echo "Deploy completed at $(date)"
```

赋予执行权限：
```bash
chmod +x /var/www/deploy.sh
```

### 10.4 前端项目自动部署示例

```yaml
# .github/workflows/deploy.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  # 代码检查
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npm run type-check

  # 单元测试
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run test:unit

  # 构建
  build:
    runs-on: ubuntu-latest
    needs: [lint, test]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run build
      - name: Upload build artifacts
        uses: actions/upload-artifact@v4
        with:
          name: dist
          path: dist/

  # 部署到测试环境
  deploy-staging:
    runs-on: ubuntu-latest
    needs: [build]
    if: github.ref == 'refs/heads/develop'
    environment:
      name: staging
      url: https://staging.example.com
    steps:
      - name: Deploy to Staging
        uses: appleboy/ssh-action@v1.0.3
        with:
          host: ${{ secrets.STAGING_HOST }}
          username: ${{ secrets.DEPLOY_USER }}
          key: ${{ secrets.DEPLOY_KEY }}
          script: |
            cd /var/www/staging
            git pull
            npm install
            npm run build
            pm2 restart staging

  # 部署到生产环境
  deploy-production:
    runs-on: ubuntu-latest
    needs: [build]
    if: github.ref == 'refs/heads/main'
    environment:
      name: production
      url: https://example.com
    steps:
      - name: Deploy to Production
        uses: appleboy/ssh-action@v1.0.3
        with:
          host: ${{ secrets.PROD_HOST }}
          username: ${{ secrets.DEPLOY_USER }}
          key: ${{ secrets.DEPLOY_KEY }}
          script: |
            cd /var/www/production
            git pull
            npm install
            npm run build
            pm2 restart production
            nginx -s reload
```

### 10.5 部署安全最佳实践

```bash
# 1. 使用专门的部署用户，不要用 root
useradd -m -s /bin/bash deploy
usermod -aG www-data deploy

# 2. 给部署用户有限权限
# 编辑 /etc/sudoers
deploy ALL=(ALL) NOPASSWD: /bin/systemctl restart pm2, /bin/systemctl restart nginx

# 3. GitHub Actions 使用最小权限密钥
# 只允许部署用户访问特定目录
```

### 10.6 常见 CI/CD 流程

#### 前端 Vue/React 项目

```
代码提交 → ESLint 检查 → TypeScript 类型检查 → 单元测试 
    ↓
构建产物 → 部署到 CDN/OSS → 自动更新域名解析
```

#### Node.js 后端项目

```
代码提交 → ESLint 检查 → 单元测试 → 集成测试
    ↓
构建 Docker 镜像 → 推送到镜像仓库 → SSH 部署到服务器
    ↓
Docker Compose 重启服务 → 健康检查
```

### 10.7 部署后验证

```yaml
# 在 GitHub Actions 中添加健康检查
- name: Verify deployment
  run: |
    sleep 10  # 等待服务启动
    curl -f https://example.com/api/health || exit 1
    echo "Health check passed!"
```

---

## 十一、SSH + CI/CD 完整实战

### 完整场景：前端项目自动化部署

**项目结构**：
```
my-blog/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── src/
├── package.json
└── .env.production
```

**部署架构**：
```
GitHub 仓库
    ↓ push
GitHub Actions (执行 CI/CD)
    ↓ SSH 免登录
云服务器 (拉取代码 → 构建 → 启动服务)
    ↓
PM2 管理进程 (永不宕机)
```

**实现步骤**：

1. **服务器准备**
```bash
# 安装 Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# 安装 PM2
npm install -g pm2

# 创建项目目录
mkdir -p /var/www/my-blog
chown -R deploy:deploy /var/www/my-blog
```

2. **本地生成部署密钥**
```bash
ssh-keygen -t ed25519 -C "deploy@ci" -f ~/.ssh/deploy_key
cat ~/.ssh/deploy_key.pub | ssh root@服务器IP "mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys"
```

3. **GitHub 配置 Secrets**
```
DEPLOY_HOST = 192.168.1.100
DEPLOY_USER = root
DEPLOY_KEY = (deploy_key 私钥内容)
```

4. **推送代码，自动部署完成**

---

## 十二、总结

| 分类 | 技能 | 用途 |
|------|------|------|
| **基础运维** | SSH 免登录 | 安全、便捷地连接服务器 |
| **运维管理** | SSH Config | 一键连接多台服务器 |
| **安全加固** | 禁用密码、改端口 | 防止服务器被入侵 |
| **自动化** | GitHub Actions | 代码提交即触发构建部署 |
| **部署** | PM2 / Docker | 服务进程管理 |

**完整链路**：
```
开发 → Git push → GitHub Actions → SSH 免登录 → 服务器 → PM2 运行服务
```