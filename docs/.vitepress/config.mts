import { defineConfig } from 'vitepress'
import { readdirSync } from 'fs'
import { dirname, resolve, sep } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const docsRoot = resolve(__dirname, '..')

type NavItem = {
  text: string
  link?: string
  items?: NavItem[]
}

function getNav(folder: string): NavItem[] {
  const fullPath = resolve(docsRoot, folder)
  try {
    const file_list = readdirSync(fullPath, { withFileTypes: true })
    const children: NavItem[] = []
    for (let i = 0; i < file_list.length; i++) {
      const item = file_list[i]
      if (item.isDirectory()) {
        const subItems = getNav(`${folder}/${item.name}`)
        if (subItems.length > 0) {
          children.push({
            text: item.name,
            items: subItems,
          })
        }
      } else if (item.isFile() && item.name.endsWith('.md') && item.name !== 'README.md') {
        children.push({
          text: item.name.slice(0, -3),
          link: `/${folder}/${item.name}`,
        })
      }
    }
    return children
  } catch (err) {
    return []
  }
}

function collectSidebarItems(folder: string) {
  const navItems = getNav(folder)
  if (navItems.length === 0) return []
  return [{ text: folder, items: flattenLeafItems(navItems) }]
}

function flattenLeafItems(items: NavItem[]): { text: string; link: string }[] {
  const result: { text: string; link: string }[] = []
  for (const item of items) {
    if (item.link) {
      result.push({ text: item.text, link: normalizeLink(item.link) })
      continue
    }
    if (item.items?.length) {
      result.push(...flattenLeafItems(item.items))
    }
  }
  return result
}

function normalizeLink(link: string): string {
  return link.split(sep).join('/')
}

export default defineConfig({
  title: 'Eunie\'s Blog',
  description: '个人的技术知识库，仅供个人学习记录',
  base: '/my-blog/',
  ignoreDeadLinks: true,
  appearance: false,
  markdown: {
    outline: { level: [2, 3, 4, 5, 6] }
  },
  head: [
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }],
    ['meta', { httpEquiv: 'Cache-Control', content: 'no-cache, no-store, must-revalidate' }],
    ['meta', { httpEquiv: 'Pragma', content: 'no-cache' }],
    ['meta', { httpEquiv: 'Expires', content: '0' }],
    ['link', { rel: 'icon', href: '/my-blog/favicon.ico' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Newsreader:ital,wght@0,500;0,600;1,500&display=swap', rel: 'stylesheet' }],
  ],
  themeConfig: {
    search: {
      provider: 'local'
    },
    codeBlocks: {
      showLanguage: true
    },
    returnToTopLabel: '回到顶部',
    lastUpdated: {
      text: '上次更新',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium'
      }
    },
    nav: [
      { text: '首页', link: '/' },
      {
        text: '前端',
        items: [
          { text: '基础', link: '/frontent/basic/' },
          { text: 'CSS', link: '/frontent/css/' },
          { text: 'HTML', link: '/frontent/html/' },
          { text: 'JavaScript', link: '/frontent/JavaScript/' },
          { text: 'TypeScript', link: '/frontent/TypeScript/' },
          { text: 'Vue.js', link: '/frontent/vue/' },
          { text: 'React.js', link: '/frontent/react/' },
          { text: 'Electron', link: '/frontent/Electron/' },
          { text: '组件库', link: '/frontent/component/' },
          { text: 'Vite', link: '/frontent/vite/' },
          { text: 'Webpack', link: '/frontent/webpack/' },
        ],
      },
      {
        text: '后端',
        items: [
          { text: 'Node.js', link: '/backend/node/' },
          { text: 'Python', link: '/backend/python/' },
          { text: 'SQL', link: '/backend/sql/' },
          { text: '服务器', link: '/backend/server/' },
        ],
      },
      {
        text: '计算机基础',
        items: [
          { text: '进制与位运算', link: '/basic/进制与位运算/' },
          { text: '操作系统基础', link: '/basic/操作系统基础/' },
          { text: '计算机网络基础', link: '/basic/计算机网络基础/' },
          { text: '数据结构与算法', link: '/basic/数据结构与算法/' },
          { text: '数据库基础', link: '/basic/数据库基础/' },
          { text: '编程通用基础', link: '/basic/编程通用基础/' },
          { text: '软件工程基础', link: '/basic/软件工程基础/' },
        ],
      },
      {
        text: '工程化',
        items: [
          { text: 'Git', link: '/Engineering/git/' },
          { text: '前端工程化', link: '/Engineering/Engineering_frontent/' },
        ],
      },
      {
        text: '大模型',
        items: [
          { text: '基础知识', link: '/LLM/基础知识/' },
          { text: 'LangChain', link: '/LLM/LangChain/' },
          { text: 'LangGraph', link: '/LLM/LangGraph/' },
          { text: '提示词工程', link: '/LLM/Prompt%20Engineering/' },
          { text: 'FastAPI', link: '/LLM/FastAPI/' },
          { text: 'Python 基础', link: '/LLM/python/' },
          { text: '资源', link: '/LLM/资源/' },
        ],
      },
      {
        text: 'UI设计',
        items: [
          { text: 'UI设计', link: '/UI设计/' },
        ],
      },

    ],
    sidebar: false,
    socialLinks: [{ icon: 'github', link: 'https://github.com/xxxeuniii/my-blog' }],
  },
})
