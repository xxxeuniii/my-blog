# Monorepo 工程化

Monorepo（单体仓库）是一种将多个项目放在同一个代码仓库中管理的开发模式。

## 一、什么是 Monorepo

### 定义

Monorepo = Mono（单一）+ Repository（仓库）

将多个相关的项目（前端应用、组件库、工具函数等）放在一个代码仓库中管理。

### 对比

| 模式 | 说明 |
|------|------|
| Monorepo | 一个仓库放多个项目 |
| Polyrepo | 每个项目单独仓库 |

### 示例结构

```
my-org/
├── packages/
│   ├── ui/           # 组件库
│   ├── utils/       # 工具函数
│   └── config/       # 配置文件
├── apps/
│   ├── web/          # Web 应用
│   ├── mobile/       # 移动端
│   └── admin/        # 管理后台
├── pnpm-workspace.yaml
└── package.json
```

## 二、为什么用 Monorepo

### 优点

1. **代码共享** - 组件、工具库直接引用，无需发包
2. **依赖统一** - 所有项目共享 node_modules
3. **跨项目修改** - 一次提交修改多个项目
4. **统一规范** - ESLint、TypeScript 配置统一
5. **构建加速** - 只构建修改的部分

### 缺点

1. 仓库体积可能很大
2. 权限管理不够灵活
3. CI/CD 配置复杂

## 三、常用工具

### 1. pnpm + workspaces

```yaml
# pnpm-workspace.yaml
packages:
  - 'packages/*'
  - 'apps/*'
```

```json
// package.json
{
  "private": true,
  "scripts": {
    "dev": "pnpm -r --parallel run dev",
    "build": "pnpm -r run build"
  }
}
```

### 2. Turborepo

Vercel 出品的构建工具，专注于构建加速。

```json
// turbo.json
{
  "$schema": "https://turbo.build/schema.json",
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}
```

```bash
# 安装
npm install turbo -D

# 运行
turbo run build
```

### 3. Nx

功能最全的企业级工具，支持大规模项目。

```bash
# 创建 workspace
npx create-nx-workspace@latest my-org
```

```json
// nx.json
{
  "targetDefaults": {
    "build": {
      "dependsOn": ["^build"]
    }
  }
}
```

## 四、pnpm workspaces 快速开始

### 1. 初始化

```bash
mkdir my-monorepo
cd my-monorepo
pnpm init
```

### 2. 配置 workspace

```yaml
# pnpm-workspace.yaml
packages:
  - 'packages/*'
  - 'apps/*'
```

### 3. 创建子项目

```bash
# 创建工具库
mkdir -p packages/utils
cd packages/utils
pnpm init

# 创建应用
mkdir -p apps/web
cd apps/web
pnpm init
```

### 4. 相互引用

```bash
# 在 apps/web 中引用 packages/utils
pnpm add @my-org/utils --filter=web
```

```json
// apps/web/package.json
{
  "dependencies": {
    "@my-org/utils": "workspace:*"
  }
}
```

### 5. 运行命令

```bash
# 运行所有项目的 dev
pnpm -r run dev

# 只运行 web 应用的 dev
pnpm --filter web run dev

# 构建所有项目
pnpm -r run build
```

## 五、Turborepo 进阶

### 任务缓存

```json
// turbo.json
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**"]
    },
    "test": {
      "dependsOn": ["build"],
      "outputs": []
    },
    "lint": {
      "outputs": []
    }
  }
}
```

### 远程缓存

```bash
# 登录 Vercel
npx turbo login

# 链接远程缓存
npx turbo link
```

### 过滤规则

```bash
# 只构建 web 应用
turbo run build --filter=web

# 排除 web 应用
turbo run build --filter=!web

# 根据依赖链构建
turbo run build --filter=...web
```

## 六、Nx 进阶

### 生成项目

```bash
# 创建 React 应用
npx nx g @nx/react:app web

# 创建工具库
npx nx g @nx/js:lib utils
```

### 依赖关系图

```bash
# 查看依赖图
npx nx dep-graph
```

### 分布式执行

```bash
# 启用分布式执行
npx nx reset
NX_PARALLEL=10 npx nx run-many -t build
```

## 七、最佳实践

### 1. 项目结构

```
my-org/
├── packages/
│   ├── ui/           # 组件库
│   ├── utils/        # 工具函数
│   ├── hooks/        # 自定义 Hooks
│   └── constants/    # 常量
├── apps/
│   ├── web/          # 主应用
│   ├── admin/        # 管理后台
│   └── mobile/       # 移动端
├── tools/            # 构建工具
├── configs/          # 配置文件
│   ├── tsconfig.base.json
│   ├── eslintrc.js
│   └── prettierrc
└── pnpm-workspace.yaml
```

### 2. 版本管理

```json
// package.json
{
  "version": "1.0.0",
  "publishConfig": {
    "access": "public"
  }
}
```

### 3. CI/CD 配置

```yaml
# .github/workflows/ci.yml
name: CI

on: [push]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'pnpm'

      - run: pnpm install --frozen-lockfile

      - run: pnpm turbo run build
        env:
          TURBO_TOKEN: ${{ secrets.TURBO_TOKEN }}
          TURBO_TEAM: ${{ secrets.TURBO_TEAM }}
```

## 八、什么时候用 Monorepo

| 场景 | 推荐 |
|------|------|
| 多个紧密相关的应用 | 用 |
| 组件库 + 应用 | 用 |
| 独立项目 | 不用 |
| 开源多包项目 | 用 |
| 微前端架构 | 用 |

## 九、总结

Monorepo 适合：
- 多应用、多组件库的场景
- 需要频繁跨项目修改的团队
- 追求统一开发体验的项目

工具选择：
- **pnpm workspaces** - 简单、轻量
- **Turborepo** - 构建加速、远程缓存
- **Nx** - 功能全面、企业级