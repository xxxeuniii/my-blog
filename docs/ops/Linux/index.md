---
layout: page
sidebar: false
---

<div class="category-index-page">

# Linux

Linux 系统管理相关知识，从基础命令到进阶运维。

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
  <li data-href="./Linux进阶">
    <strong>Linux进阶</strong>
    <br>
    <span>系统监控、安全加固、脚本编写等进阶内容</span>
  </li>
  <li data-href="./Linux发行版对比">
    <strong>Linux发行版对比</strong>
    <br>
    <span>Ubuntu/Debian、CentOS/RHEL等主流发行版详解</span>
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