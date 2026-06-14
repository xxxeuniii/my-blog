---
layout: page
sidebar: false
---

<div class="category-index-page">

# 项目

个人项目记录与总结。每个卡片代表一个独立项目，点击后可以查看该项目的详细说明文章。

<div class="category-info">
  <div class="info-item">
    <div class="info-label">项目数量</div>
    <div class="info-value" id="article-count"></div>
  </div>
</div>

<ul id="article-list">
  <li data-href="./If-I-Held">
    <strong>If-I-Held</strong>
    <br>
    <span>计算“如果当时没有卖出”的股票复盘工具，用情绪文案和生活消费展示机会成本</span>
  </li>
  <li data-href="./cat-web">
    <strong>cat-web</strong>
    <br>
    <span>使用 React、Framer Motion 与多种鼠标交互效果实现的猫主题视觉实验网站</span>
  </li>
  <li data-href="./Textkit">
    <strong>TextKit</strong>
    <br>
    <span>本地处理的在线文本工具箱，支持正则测试、加解密、UUID、文字统计和 Token 计算</span>
  </li>
  <li data-href="./PicKit">
    <strong>PicKit</strong>
    <br>
    <span>纯前端实现的在线图片工具箱，支持压缩、裁剪、格式转换、批量处理和图片转 PDF</span>
  </li>
  <li data-href="./SEO_MCP">
    <strong>SEO MCP Server</strong>
    <br>
    <span>用于竞争对手研究、SEO 页面生成与 Schema.org 结构化数据输出的 MCP Server</span>
  </li>
  <li data-href="./D2C/">
    <strong>D2C</strong>
    <br>
    <span>基于 LangChain 多 Agent 架构的 Figma 设计稿转代码平台</span>
  </li>
</ul>
</div>

<script setup>
import { onMounted } from 'vue'
onMounted(() => {
  const list = document.getElementById('article-list')
  if (list) {
    const countEl = document.getElementById('article-count')
    if (countEl) {
      countEl.textContent = list.querySelectorAll('li').length
    }
    list.querySelectorAll('li[data-href]').forEach(li => {
      li.style.cursor = 'pointer'
      li.addEventListener('click', () => {
        const href = li.getAttribute('data-href')
        window.location.href = href
      })
    })
  }
})
</script>

<style>
#article-list li[data-href]:hover {
  background-color: var(--vp-c-brand-soft);
  transform: translateX(4px);
}
</style>
