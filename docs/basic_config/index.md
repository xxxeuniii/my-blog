---
layout: page
sidebar: false
---

<div class="category-index-page">

# 项目配置

Vite、Webpack 等项目基础配置知识，帮助你快速搭建开发环境。

<div class="category-info">
  <div class="info-item">
    <div class="info-label">文章数量</div>
    <div class="info-value" id="article-count"></div>
  </div>
</div>

<ul id="article-list">
  <li>
    <strong><a href="./vite.config.js配置.md">vite.config.js配置</a></strong>
    <br>
    <span>Vite 构建工具的详细配置说明，从基础到进阶的完整指南。</span>
  </li>
  <li>
    <strong><a href="./vite.md">vite</a></strong>
    <br>
    <span>下一代前端构建工具，快速的开发体验和优化的生产构建。</span>
  </li>
  <li>
    <strong><a href="./vue基础.md">vue基础</a></strong>
    <br>
    <span>Vue 框架基础配置与入门，从零开始学习 Vue.js。</span>
  </li>
  <li>
    <strong><a href="./服务器基础.md">服务器基础</a></strong>
    <br>
    <span>服务器端基础与配置知识，Node.js 开发环境搭建。</span>
  </li>
</ul>

<script setup>
import { onMounted } from 'vue'
onMounted(() => {
  const list = document.getElementById('article-list')
  if (list) {
    const links = list.querySelectorAll('a')
    const countEl = document.getElementById('article-count')
    if (countEl) {
      countEl.textContent = links.length
    }
  }
})
</script>

</div>
