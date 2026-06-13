---
layout: page
sidebar: false
---

<div class="category-index-page">

# 国外云

面向全球化业务，整理国际云平台的产品体系、区域选择与部署实践。

<div class="category-info">
  <div class="info-item">
    <div class="info-label">文章数量</div>
    <div class="info-value" id="article-count"></div>
  </div>
</div>

<ul id="article-list">
  <li data-href="./国外云平台概览">
    <strong>国外云平台概览</strong>
    <br>
    <span>主流厂商、核心服务、选型维度与全球部署</span>
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

</div>
