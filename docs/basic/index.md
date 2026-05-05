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
  <li>
    <strong><a href="./BOM">BOM</a></strong>
    <br>
    <span>浏览器对象模型，操作浏览器窗口和导航的 API。</span>
  </li>
  <li>
    <strong><a href="./DOM">DOM</a></strong>
    <br>
    <span>文档对象模型，操作网页元素的核心 API。</span>
  </li>
  <li>
    <strong><a href="./HTML">HTML</a></strong>
    <br>
    <span>HTML 基础与进阶，语义化标签和现代 Web 标准。</span>
  </li>
  <li>
    <strong><a href="./数据结构">数据结构</a></strong>
    <br>
    <span>前端常用数据结构与算法，提升代码质量和效率。</span>
  </li>
  <li>
    <strong><a href="./网络请求">网络请求</a></strong>
    <br>
    <span>HTTP 请求与响应处理，Fetch、Axios 等工具使用。</span>
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
