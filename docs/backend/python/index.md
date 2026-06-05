---
layout: page
sidebar: false
---

<div class="category-index-page">

# Python

Python 编程与应用开发

<div class="category-info">
  <div class="info-item">
    <div class="info-label">文章数量</div>
    <div class="info-value" id="article-count"></div>
  </div>
</div>

<ul id="article-list">
  <li data-href="./Python基础">
    <strong>Python 基础</strong>
    <br>
    <span>Python 基础语法、数据类型、函数与类</span>
  </li>
  <li data-href="./Python进阶">
    <strong>Python 进阶</strong>
    <br>
    <span>装饰器、生成器、异步编程、设计模式</span>
  </li>
  <li data-href="./Python装饰器详解">
    <strong>Python 装饰器详解</strong>
    <br>
    <span>深入理解装饰器，从原理到实践</span>
  </li>
  <li data-href="./Python生成器与迭代器详解">
    <strong>Python 生成器与迭代器详解</strong>
    <br>
    <span>详细讲解迭代器和生成器的使用</span>
  </li>
  <li data-href="./Python异步编程详解">
    <strong>Python 异步编程详解</strong>
    <br>
    <span>asyncio 异步编程入门到实践</span>
  </li>
  <li data-href="./Python面试考点总结">
    <strong>Python 面试考点总结</strong>
    <br>
    <span>面试常见问题与答案汇总</span>
  </li>
  <li data-href="./fastapi基础">
    <strong>FastAPI 基础</strong>
    <br>
    <span>FastAPI 快速入门与常用功能</span>
  </li>
  <li data-href="./基于flask开发的dify">
    <strong>基于flask开发的dify</strong>
    <br>
    <span>基于 Flask 开发的 Dify 应用</span>
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
