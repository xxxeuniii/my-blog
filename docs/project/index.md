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
