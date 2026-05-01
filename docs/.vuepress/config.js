import { defineUserConfig } from 'vuepress'
import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'
import { readdirSync } from 'fs'
import tailwindcss from '@tailwindcss/vite'

const __dirname = dirname(fileURLToPath(import.meta.url))

function getNav(folder) {
  const fullPath = resolve(__dirname, '..', folder)
  try {
    const file_list = readdirSync(fullPath, { withFileTypes: true })
    const children = []
    for (let i = 0; i < file_list.length; i++) {
      const item = file_list[i]
      if (item.isDirectory()) {
        const subItems = getNav(`${folder}/${item.name}`)
        if (subItems.length > 0) {
          children.push({
            text: item.name,
            link: '',
            children: subItems,
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

export default defineUserConfig({
  title: "Eunie's Tech Blog",
  description: "记录前端技术学习之路",
  base: "/my-blog/",
  bundler: viteBundler({
    vite: {
      plugins: [tailwindcss()],
    },
  }),
  theme: defaultTheme({
    navbar: [
      { text: "首页", link: "/" },
      {
        text: "基础",
        children: [
          { text: "项目基础配置", children: getNav("basic_config") },
          { text: "CSS基础", children: getNav("css") },
          { text: "HTML基础", children: getNav("html") },
          { text: "前端基础", children: getNav("basic") },
          { text: "JavaScript", children: getNav("js") },
          { text: "TypeScript", children: getNav("ts") },
        ],
      },
      {
        text: "进阶",
        children: [
          { text: "Git版本控制", children: getNav("git") },
          { text: "前端工程化", children: getNav("工程化") },
        ],
      },
      {
        text: "前端框架",
        children: [
          { text: "Vue.js", children: getNav("views/vue") },
          { text: "React.js", children: getNav("react") },
          { text: "Angular", children: getNav("angular") },
          { text: "Electron", children: getNav("Electron") },
        ],
      },
      {
        text: "后端和工具",
        children: [
          { text: "Node.js", children: getNav("node") },
          { text: "Python", children: getNav("python") },
          { text: "前端工具", children: getNav("tools") },
          { text: "UI组件库", children: getNav("component") },
          { text: "服务器", children: getNav("server") },
          { text: "网络", children: getNav("network") },
          { text: "Java", children: getNav("Java") },
        ],
      },
      {
        text: "大模型学习",
        children: getNav("LLM"),
      },
      {
        text: "实用工具",
        children: [
          { text: "实用工具类及脚本", children: getNav("script") },
          { text: "未分类-随记", children: getNav("other") },
          { text: "笔记", children: getNav("notes") },
          { text: "英语学习", children: getNav("English") },
          { text: "鸿蒙开发", children: getNav("harmony") },
        ],
      },
      {
        text: "项目实践",
        children: [
          { text: "项目案例", children: getNav("project") },
          { text: "更多项目", children: getNav("views/project") },
          { text: "uniapp", children: getNav("views/uniapp") },
          { text: "Node.js进阶", children: getNav("views/node") },
        ],
      },
      { text: "面试题", children: getNav("views/question") },
    ],
  }),

  head: [
    ["link", { rel: "icon", href: "/favicon.ico" }],
    ["meta", { name: "viewport", content: "width=device-width, initial-scale=1.0" }],
  ],
})