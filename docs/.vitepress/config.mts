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
          { text: '项目基础配置', items: getNav('basic_config') },
          { text: 'CSS基础', items: getNav('css') },
          { text: 'HTML基础', items: getNav('html') },
          { text: '前端基础', items: getNav('basic') },
          { text: 'JavaScript', items: getNav('js') },
          { text: 'TypeScript', items: getNav('ts') },
        ],
      },
      {
        text: '进阶',
        items: [
          { text: 'Git版本控制', items: getNav('git') },
          { text: '前端工程化', items: getNav('工程化') },
        ],
      },
      {
        text: '前端框架',
        items: [
          { text: 'Vue.js', items: getNav('views/vue') },
          { text: 'React.js', items: getNav('react') },
          { text: 'Angular', items: getNav('angular') },
          { text: 'Electron', items: getNav('Electron') },
        ],
      },
      {
        text: '后端和工具',
        items: [
          { text: 'Node.js', items: getNav('node') },
          { text: 'Python', items: getNav('python') },
          { text: '前端工具', items: getNav('tools') },
          { text: 'UI组件库', items: getNav('component') },
          { text: '服务器', items: getNav('server') },
          { text: '网络', items: getNav('network') },
          { text: 'Java', items: getNav('Java') },
        ],
      },
      {
        text: '大模型学习',
        items: getNav('LLM'),
      },
      {
        text: '实用工具',
        items: [
          { text: '实用工具类及脚本', items: getNav('script') },
          { text: '未分类-随记', items: getNav('other') },
          { text: '笔记', items: getNav('notes') },
          { text: '英语学习', items: getNav('English') },
          { text: '鸿蒙开发', items: getNav('harmony') },
        ],
      },
      {
        text: '项目实践',
        items: [
          { text: '项目案例', items: getNav('project') },
          { text: '更多项目', items: getNav('views/project') },
          { text: 'uniapp', items: getNav('views/uniapp') },
          { text: 'Node.js进阶', items: getNav('views/node') },
        ],
      },
      { text: '面试题', items: getNav('views/question') },
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
      '/other/': collectSidebarItems('other'),
      '/notes/': collectSidebarItems('notes'),
      '/English/': collectSidebarItems('English'),
      '/harmony/': collectSidebarItems('harmony'),
      '/project/': collectSidebarItems('project'),
      '/views/project/': collectSidebarItems('views/project'),
      '/views/uniapp/': collectSidebarItems('views/uniapp'),
      '/views/node/': collectSidebarItems('views/node'),
      '/views/question/': collectSidebarItems('views/question'),
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/xxxeuniii/my-blog' }],
  },
})
