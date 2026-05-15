---
layout: page
sidebar: false
---

<div class="category-index-page">

# Vite

下一代前端构建工具。

<div class="category-info">
  <div class="info-item">
    <div class="info-label">文章数量</div>
    <div class="info-value" id="article-count"></div>
  </div>
</div>

<ul id="article-list">
  <li data-href="./vite.md">
    <strong>Vite 指南</strong>
    <br>
    <span>Vite 使用指南</span>
  </li>
  <li data-href="./vite的配置有哪些">
    <strong>配置有哪些</strong>
    <br>
    <span>Vite 配置详解</span>
  </li>
  <li data-href="./vite.config.js配置">
    <strong>vite.config.js配置</strong>
    <br>
    <span>vite.config.js 详细配置</span>
  </li>
  <li data-href="./vite和webpack对比">
    <strong>vite和webpack对比</strong>
    <br>
    <span>Vite vs Webpack 对比</span>
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
