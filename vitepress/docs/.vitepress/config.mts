import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Eunie's Tech Blog",
  description: "记录前端技术学习之路",
  base: "/my-blog/",
  
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '基础', link: '/basic/' },
      { text: '进阶', link: '/engineering/' },
      { text: 'Vue.js', link: '/views/vue/' },
      { text: '笔记', link: '/notes/' },
    ],
    
    sidebar: {
      '/basic/': [
        {
          text: '项目基础配置',
          items: [
            { text: '配置文件', link: '/basic/config' }
          ]
        },
        {
          text: 'CSS基础',
          items: [
            { text: 'CSS入门', link: '/basic/css-intro' }
          ]
        },
        {
          text: 'HTML基础',
          items: [
            { text: 'HTML入门', link: '/basic/html-intro' }
          ]
        },
        {
          text: 'JavaScript',
          items: [
            { text: 'JS基础', link: '/basic/js-basic' }
          ]
        },
        {
          text: 'TypeScript',
          items: [
            { text: 'TS入门', link: '/basic/ts-intro' }
          ]
        }
      ],
      
      '/engineering/': [
        {
          text: 'Git版本控制',
          items: [
            { text: 'Git基础', link: '/engineering/git-basic' }
          ]
        },
        {
          text: '前端工程化',
          items: [
            { text: 'Vite配置', link: '/engineering/vite-config' }
          ]
        }
      ],
      
      '/views/vue/': [
        {
          text: 'Vue.js',
          items: [
            { text: 'Vue2和Vue3区别', link: '/views/vue/vue2-vs-vue3' },
            { text: 'Vue基础', link: '/views/vue/vue-basic' }
          ]
        }
      ],
      
      '/notes/': [
        {
          text: '学习笔记',
          items: [
            { text: 'TCP/IP图解', link: '/notes/tcpip' },
            { text: '日常笔记', link: '/notes/daily' }
          ]
        }
      ]
    },
    
    socialLinks: [
      { icon: 'github', link: 'https://github.com/xxxeuniii/my-blog' }
    ],
    
    footer: {
      message: 'Released under the MIT License.',
      copyright: `Copyright ${new Date().getFullYear()} Eunie`
    }
  }
})
