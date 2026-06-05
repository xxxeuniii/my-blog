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
          { text: 'Vue', link: '/frontent/vue/' },
          { text: 'React', link: '/frontent/react/' },
          { text: 'Electron', link: '/frontent/Electron/' },
          { text: 'Hybrid App', link: '/frontent/hybrid/' },
          { text: '微前端', link: '/frontent/微前端/' },
          { text: '性能优化', link: '/frontent/性能优化/' },
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
          { text: 'Monorepo', link: '/Engineering/Monorepo/' },
          { text: 'DevOps', link: '/Engineering/DevOps/' },
        ],
      },
      {
        text: '运维',
        items: [
          { text: 'Linux', link: '/ops/Linux/' },
          { text: 'SSH与云服务器', link: '/ops/SSH/' },
          { text: 'Docker', link: '/ops/Docker/' },
          { text: 'Nginx', link: '/ops/Nginx/' },
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
        text: '常用网站',
        items: [
          { text: 'UI设计', link: '/UI设计/' },
        ],
      },
      {
        text: '其他',
        items: [
          { text: 'AI辅助开发', link: '/other/' },
        ],
      },
      {
        text: 'Web3',
        items: [
          { text: 'DApp基础', link: '/web3/' },
        ],
      },

    ],
    sidebar: {
      '/ops/Linux/': [
        {
          text: 'Linux',
          items: [
            { text: 'Linux基础', link: '/ops/Linux/Linux基础' },
            { text: 'Linux进阶', link: '/ops/Linux/Linux进阶' },
            { text: 'Linux发行版对比', link: '/ops/Linux/Linux发行版对比' },
          ]
        }
      ],
      '/ops/SSH/': [
        {
          text: 'SSH与云服务器',
          items: [
            { text: 'SSH与云服务器配置', link: '/ops/SSH/SSH与云服务器配置' },
          ]
        }
      ],
      '/ops/Docker/': [
        {
          text: 'Docker',
          items: [
            { text: 'Docker基础', link: '/ops/Docker/Docker基础' },
          ]
        }
      ],
      '/ops/Nginx/': [
        {
          text: 'Nginx',
          items: [
            { text: 'Nginx基础', link: '/ops/Nginx/Nginx基础' },
          ]
        }
      ],
      '/frontent/basic/': [
        {
          text: '基础',
          items: [
            { text: 'HTML', link: '/frontent/basic/HTML' },
            { text: 'DOM', link: '/frontent/basic/DOM' },
            { text: 'BOM', link: '/frontent/basic/BOM' },
            { text: '数据结构', link: '/frontent/basic/数据结构' },
            { text: '网络请求', link: '/frontent/basic/网络请求' },
          ]
        }
      ],
      '/frontent/css/': [
        {
          text: 'CSS',
          items: [
            { text: 'CSS布局方式', link: '/frontent/css/CSS布局方式' },
            { text: 'css3的新特性', link: '/frontent/css/css3的新特性' },
            { text: 'SCSS使用指南', link: '/frontent/css/SCSS使用指南' },
            { text: 'LESS使用指南', link: '/frontent/css/LESS使用指南' },
            { text: 'TailwindCSS指南', link: '/frontent/css/TailwindCSS指南' },
            { text: '样式污染治理', link: '/frontent/css/样式污染治理' },
          ]
        }
      ],
      '/frontent/html/': [
        {
          text: 'HTML',
          items: [
            { text: 'window对象', link: '/frontent/html/window对象' },
            { text: '地址栏各种特殊符号的含义', link: '/frontent/html/地址栏各种特殊符号的含义' },
          ]
        }
      ],
      '/frontent/JavaScript/': [
        {
          text: 'JavaScript',
          items: [
            { text: '数据类型', link: '/frontent/JavaScript/数据类型' },
            { text: 'ES6特性详解', link: '/frontent/JavaScript/ES6特性详解' },
            { text: 'const', link: '/frontent/JavaScript/const' },
            { text: '操作数组的方法', link: '/frontent/JavaScript/操作数组的方法' },
            { text: '几个循环的区别', link: '/frontent/JavaScript/几个循环的区别' },
            { text: '类型转换js方法合集', link: '/frontent/JavaScript/类型转换js方法合集' },
            { text: 'ts和js的区别', link: '/frontent/JavaScript/ts和js的区别' },
          ]
        }
      ],
      '/frontent/TypeScript/': [
        {
          text: 'TypeScript',
          items: [
            { text: 'ts基础', link: '/frontent/TypeScript/ts基础' },
          ]
        }
      ],
      '/frontent/vue/': [
        {
          text: 'Vue',
          items: [
            { text: 'vue2和vue3的区别', link: '/frontent/vue/vue2和vue3的区别' },
            { text: 'Vue生命周期详解', link: '/frontent/vue/Vue生命周期详解' },
            { text: 'Vue组件通信方法', link: '/frontent/vue/Vue组件通信方法' },
            { text: 'Vue组件动态引入', link: '/frontent/vue/Vue组件动态引入' },
            { text: 'Vue组件引入方式对比', link: '/frontent/vue/Vue组件引入方式对比' },
            { text: 'Vue3响应式原理', link: '/frontent/vue/Vue3响应式原理' },
            { text: 'ref和reactive的区别', link: '/frontent/vue/ref和reactive的区别' },
          ]
        }
      ],
      '/frontent/react/': [
        {
          text: 'React',
          items: [
            { text: 'react基础', link: '/frontent/react/react基础' },
            { text: 'React与Vue区别', link: '/frontent/react/React与Vue区别' },
            { text: 'React与ReactNative区别', link: '/frontent/react/React与ReactNative区别' },
            { text: 'Redux详解', link: '/frontent/react/Redux详解' },
            { text: 'nextjs基础', link: '/frontent/react/nextjs基础' },
            { text: 'nextjs进阶', link: '/frontent/react/nextjs进阶' },
            { text: '前端渲染策略', link: '/frontent/react/前端渲染策略' },
          ]
        }
      ],
      '/frontent/Electron/': [
        {
          text: 'Electron',
          items: [
            { text: 'electron基础', link: '/frontent/Electron/electron基础' },
            { text: 'electron通信', link: '/frontent/Electron/electron通信' },
            { text: 'electron跨端适配', link: '/frontent/Electron/electron跨端适配' },
            { text: 'electron打包与更新', link: '/frontent/Electron/electron打包与更新' },
          ]
        }
      ],
      '/frontent/hybrid/': [
        {
          text: 'Hybrid App',
          items: [
            { text: 'hybrid基础', link: '/frontent/hybrid/hybrid基础' },
          ]
        }
      ],
      '/frontent/微前端/': [
        {
          text: '微前端',
          items: [
            { text: '微前端基础', link: '/frontent/微前端/微前端基础' },
          ]
        }
      ],
      '/frontent/性能优化/': [
        {
          text: '性能优化',
          items: [
            { text: '加载性能优化', link: '/frontent/性能优化/加载性能优化' },
            { text: '渲染性能优化', link: '/frontent/性能优化/渲染性能优化' },
            { text: '代码性能优化', link: '/frontent/性能优化/代码性能优化' },
            { text: '图片性能优化', link: '/frontent/性能优化/图片性能优化' },
            { text: '首屏加载时间优化', link: '/frontent/性能优化/首屏加载时间优化' },
            { text: '性能监控', link: '/frontent/性能优化/性能监控' },
            { text: '埋点与数据采集', link: '/frontent/性能优化/埋点与数据采集' },
          ]
        }
      ],
      '/frontent/component/': [
        {
          text: '组件库',
          items: [
            { text: 'elementui组件库', link: '/frontent/component/elementui组件库' },
            { text: 'ECharts使用指南', link: '/frontent/component/ECharts使用指南' },
          ]
        }
      ],
      '/frontent/vite/': [
        {
          text: 'Vite',
          items: [
            { text: 'vite概念', link: '/frontent/vite/vite概念' },
            { text: 'vite.config.js配置', link: '/frontent/vite/vite.config.js配置' },
            { text: 'vite的配置有哪些', link: '/frontent/vite/vite的配置有哪些' },
            { text: 'vite和webpack对比', link: '/frontent/vite/vite和webpack对比' },
          ]
        }
      ],
      '/frontent/webpack/': [
        {
          text: 'Webpack',
          items: [
            { text: 'webpack', link: '/frontent/webpack/webpack' },
          ]
        }
      ],
      '/frontent/angular/': [
        {
          text: 'Angular',
          items: [
            { text: 'angular基础', link: '/frontent/angular/angular基础' },
            { text: 'angular进阶', link: '/frontent/angular/angular进阶' },
          ]
        }
      ],
      '/frontent/performance/': [
        {
          text: '性能优化',
          items: [
            { text: 'Vue组件引入性能优化', link: '/frontent/performance/Vue组件引入性能优化' },
            { text: '首屏加载时间优化', link: '/frontent/performance/首屏加载时间优化' },
          ]
        }
      ],
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/xxxeuniii/my-blog' }],
  },
})
