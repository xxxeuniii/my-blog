# Next.js 基础

Next.js 是一个基于 React 的全栈框架，提供服务端渲染（SSR）、静态站点生成（SSG）、API 路由等功能，极大简化了 React 应用的开发和部署。

## 一、环境搭建

### 安装 Next.js

```bash
# 使用 create-next-app 创建项目
npx create-next-app@14.0.0 .

# 或手动安装
npm install next react react-dom
```

### 项目结构

```
my-next-app/
├── app/              # App Router（推荐）
│   ├── page.js       # 默认页面
│   ├── layout.js     # 布局组件
│   └── api/          # API 路由
├── pages/            # Pages Router（传统）
│   ├── index.js
│   └── api/
├── public/           # 静态资源
├── styles/           # 全局样式
└── next.config.js    # Next.js 配置
```

### 基础配置

```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['example.com'],
  },
}

module.exports = nextConfig
```

## 二、路由系统

### App Router（推荐）

#### 页面路由

```javascript
// app/page.js - 首页
export default function Home() {
  return <h1>Welcome to Next.js</h1>
}

// app/about/page.js - /about 页面
export default function About() {
  return <h1>About Page</h1>
}
```

#### 动态路由

```javascript
// app/posts/[id]/page.js
export default function Post({ params }) {
  return <h1>Post: {params.id}</h1>
}
```

#### 嵌套路由

```javascript
// app/blog/page.js - /blog
export default function Blog() {
  return <h1>Blog</h1>
}

// app/blog/[slug]/page.js - /blog/hello-world
export default function BlogPost({ params }) {
  return <h1>Post: {params.slug}</h1>
}
```

### Pages Router（传统）

```javascript
// pages/index.js - 首页
export default function Home() {
  return <h1>Home</h1>
}

// pages/about.js - /about
export default function About() {
  return <h1>About</h1>
}

// pages/posts/[id].js - 动态路由
export default function Post({ router }) {
  return <h1>Post: {router.query.id}</h1>
}
```

## 三、数据获取

### Server Components（推荐）

```javascript
// app/page.js - Server Component
async function fetchPosts() {
  const res = await fetch('https://api.example.com/posts')
  return res.json()
}

export default async function Home() {
  const posts = await fetchPosts()
  
  return (
    <div>
      {posts.map(post => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  )
}
```

### Static Generation (SSG)

```javascript
// app/posts/page.js
export async function generateStaticParams() {
  const posts = await fetchPosts()
  return posts.map(post => ({ id: post.id }))
}

export default async function Posts({ params }) {
  const post = await fetchPost(params.id)
  return <div>{post.content}</div>
}
```

### Server-Side Rendering (SSR)

```javascript
// 使用 Pages Router
export async function getServerSideProps(context) {
  const { id } = context.params
  const post = await fetch(`https://api.example.com/posts/${id}`)
  
  return {
    props: { post }
  }
}

export default function Post({ post }) {
  return <div>{post.content}</div>
}
```

### Client Components

```javascript
// app/components/Comment.js
'use client'

import { useState } from 'react'

export default function Comment() {
  const [text, setText] = useState('')
  
  return (
    <div>
      <input 
        type="text" 
        value={text} 
        onChange={(e) => setText(e.target.value)} 
      />
    </div>
  )
}
```

## 四、API 路由

### 创建 API

```javascript
// app/api/hello/route.js
export async function GET(request) {
  return new Response(JSON.stringify({ message: 'Hello World' }), {
    headers: { 'Content-Type': 'application/json' }
  })
}

// 支持多种方法
export async function POST(request) {
  const body = await request.json()
  return new Response(JSON.stringify({ received: body }))
}
```

### Pages Router API

```javascript
// pages/api/hello.js
export default function handler(req, res) {
  res.status(200).json({ message: 'Hello World' })
}
```

## 五、样式方案

### CSS Modules

```css
/* components/Button.module.css */
.button {
  padding: 1rem;
  background: blue;
  color: white;
}
```

```javascript
// components/Button.js
import styles from './Button.module.css'

export default function Button() {
  return <button className={styles.button}>Click</button>
}
```

### Tailwind CSS

```bash
npm install tailwindcss @tailwindcss/vite
```

```javascript
// next.config.js
const nextConfig = {
  experimental: {
    optimizeCss: true,
  },
}
```

```css
/* app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 全局样式

```javascript
// app/layout.js
import './globals.css'

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  )
}
```

## 六、图像优化

### Next.js Image

```javascript
import Image from 'next/image'

export default function MyImage() {
  return (
    <Image
      src="/logo.png"
      alt="Logo"
      width={500}
      height={500}
      priority  // 优先加载
    />
  )
}
```

### 远程图片

```javascript
// next.config.js
const nextConfig = {
  images: {
    domains: ['images.example.com'],
  },
}
```

```javascript
<Image
  src="https://images.example.com/photo.jpg"
  alt="Photo"
  width={800}
  height={600}
/>
```

## 七、布局系统

### 根布局

```javascript
// app/layout.js
export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <head>
        <title>My Next.js App</title>
      </head>
      <body>
        <nav>Navigation</nav>
        {children}
        <footer>Footer</footer>
      </body>
    </html>
  )
}
```

### 嵌套布局

```javascript
// app/blog/layout.js
export default function BlogLayout({ children }) {
  return (
    <div>
      <h1>Blog Section</h1>
      {children}
    </div>
  )
}
```

## 八、客户端导航

### Link 组件

```javascript
import Link from 'next/link'

export default function Nav() {
  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
      <Link href="/posts/123">Post 123</Link>
    </nav>
  )
}
```

### 程序化导航

```javascript
'use client'

import { useRouter } from 'next/navigation'

export default function MyComponent() {
  const router = useRouter()
  
  const handleClick = () => {
    router.push('/about')
    // router.replace('/about') - 替换历史
    // router.back() - 返回
  }
  
  return <button onClick={handleClick}>Go to About</button>
}
```

## 九、部署

### Vercel（推荐）

```bash
# 安装 Vercel CLI
npm install -g vercel

# 部署
vercel
```

### 其他平台

```bash
# 构建
npm run build

# 启动生产服务器
npm run start
```

## 十、性能优化

### 代码分割

Next.js 自动进行代码分割，只加载当前页面所需的代码。

### 缓存策略

```javascript
export async function GET() {
  const res = await fetch('https://api.example.com/data', {
    next: { revalidate: 60 }  // 60秒重新验证
  })
  return res.json()
}
```

### ISR (Incremental Static Regeneration)

```javascript
export async function generateStaticParams() {
  return [{ id: '1' }, { id: '2' }]
}

export const revalidate = 3600  // 每小时重新生成

export default function Page({ params }) {
  // ...
}
```

## 十一、最佳实践

### 1. 使用 App Router
App Router 提供更好的文件系统路由和 Server Components 支持。

### 2. 分离 Server/Client 组件
将数据获取逻辑放在 Server Components，交互逻辑放在 Client Components。

### 3. 优化图像
始终使用 `next/image` 组件进行图像优化。

### 4. 利用缓存
合理使用 revalidate 和缓存策略减少 API 调用。

### 5. 类型安全
使用 TypeScript 提高代码质量和开发体验。

## 十二、常用命令

```bash
# 开发服务器
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm run start

# 静态导出
npm run export
```