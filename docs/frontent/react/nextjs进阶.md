# Next.js 进阶指南

本文详细介绍 Next.js 的进阶功能，包括认证、中间件、环境变量、国际化、动态导入、表单处理、状态管理、SEO 优化、缓存机制、测试和部署等内容。

## 一、认证系统

### 使用 NextAuth.js

NextAuth.js 是 Next.js 官方推荐的认证解决方案。

#### 安装

```bash
npm install next-auth
```

#### 基础配置

```javascript
// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub
      return session
    },
  },
})

export { handler as GET, handler as POST }
```

#### 使用认证

```javascript
// app/page.tsx
import { getServerSession } from "next-auth"
import { authOptions } from "./api/auth/[...nextauth]"

export default async function Page() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return <div>请先登录</div>
  }

  return <div>欢迎, {session.user.name}</div>
}
```

#### 登录页面

```javascript
// app/signin/page.tsx
"use client"
import { signIn, signOut, useSession } from "next-auth/react"

export default function SignIn() {
  const { data: session } = useSession()

  if (session) {
    return (
      <button onClick={() => signOut()}>退出登录</button>
    )
  }

  return (
    <button onClick={() => signIn("github")}>使用 GitHub 登录</button>
  )
}
```

### 自定义登录页

```javascript
// app/api/auth/[...nextauth]/route.ts
const handler = NextAuth({
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
})
```

---

## 二、中间件 Middleware

### 基础使用

中间件允许在请求完成前运行代码，可以用于请求拦截、权限控制、AB 测试等。

```typescript
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // 获取路径
  const path = request.nextUrl.pathname

  // 跳过静态资源和 API 路由
  if (
    path.startsWith('/_next') ||
    path.startsWith('/api') ||
    path.includes('.')
  ) {
    return NextResponse.next()
  }

  // 获取 token
  const token = request.cookies.get('next-auth.session-token')

  // 未登录且访问受保护页面，重定向到登录页
  if (!token && path !== '/signin') {
    return NextResponse.redirect(new URL('/signin', request.url))
  }

  // 已登录且访问登录页，重定向到首页
  if (token && path === '/signin') {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
```

### AB 测试

```typescript
// middleware.ts
export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // 随机分配用户到不同组
  const bucket = Math.random() < 0.5 ? 'A' : 'B'

  // 设置 cookie
  response.cookies.set('ab-test', bucket)

  return response
}
```

### 基于角色的访问控制

```typescript
// middleware.ts
export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token')
  const role = request.cookies.get('user-role')
  const path = request.nextUrl.pathname

  // 检查管理员权限
  if (path.startsWith('/admin') && role?.value !== 'admin') {
    return NextResponse.redirect(new URL('/unauthorized', request.url))
  }

  return NextResponse.next()
}
```

---

## 三、环境变量

### .env 文件

```
# .env.local - 本地开发
DATABASE_URL=postgres://localhost:5432/mydb
API_KEY=dev_key_123

# .env.production - 生产环境
DATABASE_URL=postgres://prod:5432/mydb
API_KEY=prod_key_456
```

### 使用环境变量

```javascript
// 服务端代码
const dbUrl = process.env.DATABASE_URL

// 客户端代码（需要 NEXT_PUBLIC_ 前缀）
// .env.local
NEXT_PUBLIC_API_URL=https://api.example.com

// 组件中
const apiUrl = process.env.NEXT_PUBLIC_API_URL
```

### TypeScript 类型定义

```typescript
// env.d.ts
declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string
    API_KEY: string
    NEXT_PUBLIC_API_URL: string
  }
}
```

### 运行时环境变量

```javascript
// next.config.js
module.exports = {
  env: {
    customKey: 'customValue',
  },
}
```

---

## 四、国际化 i18n

### 安装

```bash
npm install next-intl
```

### 配置

```typescript
// i18n/request.ts
import { getRequestConfig } from 'next-intl/server'

export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(`../messages/${locale}.json`)).default
}))
```

```typescript
// middleware.ts
import createMiddleware from 'next-intl/middleware'

export default createMiddleware({
  locales: ['en', 'zh'],
  defaultLocale: 'zh'
})

export const config = {
  matcher: ['/', '/(en|zh)/:path*']
}
```

### 使用翻译

```typescript
// app/[locale]/page.tsx
import { getTranslations } from 'next-intl/server'

export default async function Page() {
  const t = await getTranslations('Home')

  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
    </div>
  )
}
```

```json
// messages/zh.json
{
  "Home": {
    "title": "欢迎来到我们的网站",
    "description": "这是首页描述"
  }
}
```

---

## 五、动态导入

### 组件懒加载

```typescript
// app/page.tsx
import dynamic from 'next/dynamic'

// 懒加载组件
const HeavyComponent = dynamic(
  () => import('./components/HeavyComponent'),
  {
    loading: () => <p>加载中...</p>,
    ssr: false  // 禁用服务端渲染
  }
)

export default function Page() {
  return (
    <div>
      <h1>首页</h1>
      <HeavyComponent />
    </div>
  )
}
```

### 条件加载

```typescript
// 根据条件动态加载
const Modal = dynamic(
  () => import('./components/Modal'),
  { ssr: false }
)

// 仅在客户端加载
const ClientOnly = dynamic(
  () => import('./components/ClientOnly'),
  { ssr: false }
)
```

### 动态导入样式

```typescript
const Chart = dynamic(() => import('./Chart'), {
  ssr: false,
  loading: () => <ChartSkeleton />
})
```

---

## 六、表单处理

### 使用 React Hook Form + Zod

#### 安装

```bash
npm install react-hook-form zod @hookform/resolvers
```

#### 创建表单

```typescript
// app/page.tsx
"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

// 定义验证规则
const schema = z.object({
  name: z.string().min(2, "名字至少2个字符"),
  email: z.string().email("邮箱格式不正确"),
  age: z.number().min(18, "年龄必须大于18"),
})

type FormData = z.infer<typeof schema>

export default function FormPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    await fetch('/api/form', {
      method: 'POST',
      body: JSON.stringify(data),
    })
    alert('提交成功!')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>名字</label>
        <input {...register("name")} />
        {errors.name && <p>{errors.name.message}</p>}
      </div>

      <div>
        <label>邮箱</label>
        <input {...register("email")} />
        {errors.email && <p>{errors.email.message}</p>}
      </div>

      <div>
        <label>年龄</label>
        <input type="number" {...register("age", { valueAsNumber: true })} />
        {errors.age && <p>{errors.age.message}</p>}
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "提交中..." : "提交"}
      </button>
    </form>
  )
}
```

---

## 七、状态管理

### Zustand（推荐）

#### 安装

```bash
npm install zustand
```

#### 创建 Store

```typescript
// store/useStore.ts
import { create } from 'zustand'

interface User {
  id: string
  name: string
  email: string
}

interface AppState {
  user: User | null
  isAuthenticated: boolean
  setUser: (user: User | null) => void
  logout: () => void
}

export const useStore = create<AppState>((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  logout: () => set({ user: null, isAuthenticated: false }),
}))
```

#### 使用 Store

```typescript
// app/page.tsx
"use client"

import { useStore } from '@/store/useStore'

export default function Page() {
  const { user, isAuthenticated, logout } = useStore()

  if (!isAuthenticated) {
    return <div>请先登录</div>
  }

  return (
    <div>
      <p>欢迎, {user?.name}</p>
      <button onClick={logout}>退出</button>
    </div>
  )
}
```

### React Context

```typescript
// context/ThemeContext.tsx
"use client"

import { createContext, useContext, useState } from 'react'

const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {},
})

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light')

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
```

---

## 八、SEO 优化

### Metadata API

```typescript
// app/page.tsx
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '页面标题 | 网站名称',
  description: '页面描述内容',
  keywords: ['关键词1', '关键词2'],
  openGraph: {
    title: 'OG 标题',
    description: 'OG 描述',
    images: ['/og-image.jpg'],
  },
}
```

### 动态 Metadata

```typescript
// app/blog/[slug]/page.tsx
export async function generateMetadata({ params }): Promise<Metadata> {
  const post = await getPost(params.slug)

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      images: [post.coverImage],
    },
  }
}
```

### Sitemap

```typescript
// app/sitemap.ts
import { MetadataRoute from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://example.com',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://example.com/about',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]
}
```

### Robots.txt

```typescript
// app/robots.ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/',
    },
    sitemap: 'https://example.com/sitemap.xml',
  }
}
```

---

## 九、缓存机制

### Data Cache

```typescript
// 默认为静态缓存，永不过期
async function getData() {
  const res = await fetch('https://api.example.com/data')
  return res.json()
}

// 设置缓存时间
async function getData() {
  const res = await fetch('https://api.example.com/data', {
    next: { revalidate: 3600 }  // 1小时后重新验证
  })
  return res.json()
}
```

### Full Route Cache

```typescript
// 禁用缓存
export const dynamic = 'force-dynamic'

// 定时重新生成
export const revalidate = 60
```

### 路由缓存

```typescript
// app/page.tsx
export const dynamic = 'force-dynamic'  // 禁用静态缓存

export default async function Page() {
  const data = await fetchData()
  return <div>{data.content}</div>
}
```

### On-Demand Revalidation

```typescript
// API 路由中手动触发重新生成
export async function POST(request: Request) {
  const body = await request.json()

  // 更新数据
  await updateData(body)

  // 触发重新生成
  revalidatePath('/blog')
  revalidateTag('posts')

  return { success: true }
}
```

---

## 十、测试

### Jest + React Testing Library

#### 安装

```bash
npm install -D jest @testing-library/react @testing-library/jest-dom jest-environment-jsdom
```

#### 配置 Jest

```javascript
// jest.config.js
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
}

module.exports = createJestConfig(customJestConfig)
```

#### 编写测试

```typescript
// __tests__/button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import Button from '@/components/Button'

test('点击按钮触发回调', () => {
  const handleClick = jest.fn()
  render(<Button onClick={handleClick}>点击</Button>)

  fireEvent.click(screen.getByText('点击'))

  expect(handleClick).toHaveBeenCalledTimes(1)
})
```

### Playwright E2E 测试

```bash
npm install -D @playwright/test
npx playwright install --with-deps chromium
```

```typescript
// tests/home.spec.ts
import { test, expect } from '@playwright/test'

test('首页加载正常', async ({ page }) => {
  await page.goto('/')

  await expect(page.locator('h1')).toContainText('欢迎')
})
```

---

## 十一、部署进阶

### Vercel 部署

```bash
# 安装 Vercel CLI
npm i -g vercel

# 部署
vercel
```

### Edge Functions

```typescript
// app/api/hello/route.ts
export const runtime = 'edge'

export async function GET(request: Request) {
  return new Response('Hello from Edge!')
}
```

### Docker 部署

```dockerfile
# Dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
EXPOSE 3000
CMD ["node", "server.js"]
```

```javascript
// next.config.js
module.exports = {
  output: 'standalone',
}
```

### 环境变量配置

在 Vercel Dashboard 中配置：

```
DATABASE_URL=postgres://...
API_KEY=xxx
NEXT_PUBLIC_API_URL=https://...
```

---

## 十二、最佳实践

### 1. 目录结构

```
app/
├── (auth)/           # 路由组
│   ├── login/
│   └── register/
├── api/
│   └── auth/
├── components/
├── lib/
├── hooks/
└── store/
```

### 2. 错误处理

```typescript
// app/global-error.tsx
'use client'

export default function GlobalError({ error, reset }) {
  return (
    <html>
      <body>
        <h2>出错了!</h2>
        <button onClick={() => reset()}>重试</button>
      </body>
    </html>
  )
}
```

### 3. 加载状态

```typescript
// app/loading.tsx
export default function Loading() {
  return <div>加载中...</div>
}
```

### 4. 错误页面

```typescript
// app/error.tsx
'use client'

export default function Error({ error, reset }) {
  return (
    <div>
      <h2>出错了</h2>
      <button onClick={() => reset()}>重试</button>
    </div>
  )
}
```

---

## 总结

本文涵盖了 Next.js 的核心进阶功能，掌握这些内容可以更好地构建生产级别的 Next.js 应用。推荐按需学习和实践。