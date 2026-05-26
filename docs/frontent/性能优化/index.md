---
layout: page
sidebar: false
---

<div class="category-index-page">

# 性能优化

前端性能优化相关知识

<div class="category-info">
  <div class="info-item">
    <div class="info-label">文章数量</div>
    <div class="info-value">6</div>
  </div>
</div>

<ul id="article-list">
  <li data-href="./加载性能优化">
    <strong>加载性能优化</strong>
    <br>
    <span>减少请求、懒加载、CDN、压缩</span>
  </li>
  <li data-href="./渲染性能优化">
    <strong>渲染性能优化</strong>
    <br>
    <span>重排重绘、虚拟列表、Web Worker</span>
  </li>
  <li data-href="./代码性能优化">
    <strong>代码性能优化</strong>
    <br>
    <span>Tree Shaking、Code Splitting、防抖节流</span>
  </li>
  <li data-href="./图片性能优化">
    <strong>图片性能优化</strong>
    <br>
    <span>WebP、懒加载、响应式图片</span>
  </li>
  <li data-href="./性能监控">
    <strong>性能监控</strong>
    <br>
    <span>Lighthouse、Web Vitals、Performance API</span>
  </li>
  <li data-href="./埋点与数据采集">
    <strong>埋点与数据采集</strong>
    <br>
    <span>埋点方案、上报方式、数据分析</span>
  </li>
</ul>

<script setup>
import { onMounted } from 'vue'
onMounted(() => {
  const list = document.getElementById('article-list')
  if (list) {
    const links = list.querySelectorAll('li')
    const countEl = document.getElementById('article-count')
    if (countEl) {
      countEl.textContent = links.length
    }
  }

  list.querySelectorAll('li[data-href]').forEach(li => {
    li.style.cursor = 'pointer'
    li.addEventListener('click', () => {
      const href = li.getAttribute('data-href')
      const target = li.getAttribute('target')
      if (target === '_blank') {
        window.open(href, '_blank')
      } else {
        window.location.href = href
      }
    })
  })
})
</script>

<style>
#article-list li[data-href]:hover {
  background-color: var(--vp-c-brand-soft);
  transform: translateX(4px);
}
</style>

</div>