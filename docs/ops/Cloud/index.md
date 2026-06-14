---
layout: page
sidebar: false
---

<div class="category-index-page">

# 云计算

整理国内外主流云平台的产品体系、选型思路与部署实践。

<div class="category-info">
  <div class="info-item">
    <div class="info-label">文章数量</div>
    <div class="info-value" id="article-count"></div>
  </div>
</div>

<ul id="article-list">
  <li data-href="./国内云/国内云平台概览">
    <strong>国内云平台概览</strong>
    <br>
    <span>阿里云、腾讯云、华为云等国内平台的服务与选型</span>
  </li>
  <li data-href="./国外云/国外云平台概览">
    <strong>国外云平台概览</strong>
    <br>
    <span>AWS、Azure、Google Cloud 等国际平台的服务与选型</span>
  </li>
</ul>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  const list = document.getElementById('article-list')
  if (!list) return

  const items = list.querySelectorAll('li[data-href]')
  const countEl = document.getElementById('article-count')
  if (countEl) countEl.textContent = items.length

  items.forEach(item => {
    item.style.cursor = 'pointer'
    item.addEventListener('click', () => {
      const href = item.getAttribute('data-href')
      if (href) window.location.href = href
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
