---
layout: page
sidebar: false
---

<div class="category-index-page">

# 前端基础

DOM、BOM、数据结构等核心知识，前端开发的必备基础。

<div class="category-info">
  <div class="info-item">
    <div class="info-label">文章数量</div>
    <div class="info-value" id="article-count"></div>
  </div>
</div>

<ul id="article-list">
  <li data-href="./BOM">
    <strong>BOM</strong>
    <br>
    <span>浏览器对象模型，操作浏览器窗口和导航的 API。</span>
  </li>
  <li data-href="./DOM">
    <strong>DOM</strong>
    <br>
    <span>文档对象模型，操作网页元素的核心 API。</span>
  </li>
  <li data-href="./HTML">
    <strong>HTML</strong>
    <br>
    <span>HTML 基础与进阶，语义化标签和现代 Web 标准。</span>
  </li>
  <li data-href="./数据结构">
    <strong>数据结构</strong>
    <br>
    <span>前端常用数据结构与算法，提升代码质量和效率。</span>
  </li>
  <li data-href="./网络请求">
    <strong>网络请求</strong>
    <br>
    <span>HTTP 请求与响应处理，Fetch、Axios 等工具使用。</span>
  </li>
</ul>

<script setup>
import { onMounted } from 'vue'
onMounted(() => {
  const list = document.getElementById('article-list')
  if (list) {
    const items = list.querySelectorAll('li[data-href]')
    items.forEach(item => {
      item.style.cursor = 'pointer'
      item.addEventListener('click', () => {
        const href = item.getAttribute('data-href')
        if (href) {
          window.location.href = href
        }
      })
    })
    const countEl = document.getElementById('article-count')
    if (countEl) {
      countEl.textContent = items.length
    }
  }
})
</script>

</div>

<style>
#article-list li {
  padding: 1rem;
  margin-bottom: 0.5rem;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  transition: all 0.2s ease;
}

#article-list li:hover {
  border-color: #171717;
  background: #fafafa;
}
</style>
