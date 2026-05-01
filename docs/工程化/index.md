---
layout: page
sidebar: false
---

<div class="category-index-page">

# 工程化

前端工程化与构建工具

<div class="category-info">
  <div class="info-item">
    <div class="info-label">文章数量</div>
    <div class="info-value" id="article-count"></div>
  </div>
</div>

<ul id="article-list">
  <li>
    <strong><a href="./esm.md">esm</a></strong>
    <br>
    <span>ECMAScript Modules</span>
  </li>
  <li>
    <strong><a href="./vite.md">vite</a></strong>
    <br>
    <span>Vite 构建工具</span>
  </li>
  <li>
    <strong><a href="./vite和webpack对比.md">vite和webpack对比</a></strong>
    <br>
    <span>Vite vs Webpack</span>
  </li>
  <li>
    <strong><a href="./vite的配置有哪些.md">vite的配置有哪些</a></strong>
    <br>
    <span>Vite 配置详解</span>
  </li>
  <li>
    <strong><a href="./webpack.md">webpack</a></strong>
    <br>
    <span>Webpack 打包工具</span>
  </li>
  <li>
    <strong><a href="./基本概念.md">基本概念</a></strong>
    <br>
    <span>工程化基础概念</span>
  </li>
  <li>
    <strong><a href="./模块化.md">模块化</a></strong>
    <br>
    <span>JavaScript 模块化</span>
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
