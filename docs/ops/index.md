---
layout: page
sidebar: false
---

<div class="category-index-page">

# 运维

运维相关技术知识。

<div class="category-info">
  <div class="info-item">
    <div class="info-label">文章数量</div>
    <div class="info-value" id="article-count"></div>
  </div>
</div>

<ul id="article-list">
  <li data-href="./Linux基础">
    <strong>Linux基础</strong>
    <br>
    <span>Linux 系统常用命令与操作</span>
  </li>
  <li data-href="./Docker基础">
    <strong>Docker基础</strong>
    <br>
    <span>Docker 容器技术入门</span>
  </li>
  <li data-href="./Nginx基础">
    <strong>Nginx基础</strong>
    <br>
    <span>Nginx Web 服务器配置</span>
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