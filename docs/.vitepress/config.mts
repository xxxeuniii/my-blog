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
        text: '基础',
        items: [
          { text: '项目配置', link: '/basic_config/' },
          { text: 'CSS', link: '/css/' },
          { text: 'HTML', link: '/html/' },
          { text: '前端基础', link: '/basic/' },
          { text: 'JavaScript', link: '/js/' },
          { text: 'TypeScript', link: '/ts/' },
        ],
      },
      {
        text: '进阶',
        items: [
          { text: 'Git', link: '/git/' },
          { text: '工程化', link: '/工程化/' },
        ],
      },
      {
        text: '前端框架',
        items: [
          { text: 'Vue.js', link: '/views/vue/' },
          { text: 'React.js', link: '/react/' },
          { text: 'Angular', link: '/angular/' },
          { text: 'Electron', link: '/Electron/' },
        ],
      },
      {
        text: '后端和工具',
        items: [
          { text: 'Node.js', link: '/node/' },
          { text: 'Python', link: '/python/' },
          { text: '工具', link: '/tools/' },
          { text: '组件库', link: '/component/' },
          { text: '服务器', link: '/server/' },
          { text: '网络', link: '/network/' },
          { text: 'Java', link: '/Java/' },
        ],
      },
      {
        text: '大模型',
        items: [
          { text: '大模型', link: '/LLM/' },
          { text: '资源合集', link: '/LLM/资源/前端设计skill网站.md' },
        ],
      },
      {
        text: '其他',
        items: [
          { text: '脚本', link: '/script/' },
          { text: '笔记', link: '/notes/' },
        ],
      },
      { text: '面试题', link: '/views/question/' },
    ],
    sidebar: {
      '/basic/': collectSidebarItems('basic'),
      '/basic_config/': collectSidebarItems('basic_config'),
      '/css/': collectSidebarItems('css'),
      '/html/': collectSidebarItems('html'),
      '/js/': collectSidebarItems('js'),
      '/ts/': collectSidebarItems('ts'),
      '/git/': collectSidebarItems('git'),
      '/工程化/': collectSidebarItems('工程化'),
      '/views/vue/': collectSidebarItems('views/vue'),
      '/react/': collectSidebarItems('react'),
      '/angular/': collectSidebarItems('angular'),
      '/Electron/': collectSidebarItems('Electron'),
      '/node/': collectSidebarItems('node'),
      '/python/': collectSidebarItems('python'),
      '/tools/': collectSidebarItems('tools'),
      '/component/': collectSidebarItems('component'),
      '/server/': collectSidebarItems('server'),
      '/network/': collectSidebarItems('network'),
      '/Java/': collectSidebarItems('Java'),
      '/LLM/': collectSidebarItems('LLM'),
      '/script/': collectSidebarItems('script'),
      '/notes/': collectSidebarItems('notes'),
      '/views/project/': collectSidebarItems('views/project'),
      '/views/uniapp/': collectSidebarItems('views/uniapp'),
      '/views/node/': collectSidebarItems('views/node'),
      '/views/question/': collectSidebarItems('views/question'),
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/xxxeuniii/my-blog' }],
  },
})
