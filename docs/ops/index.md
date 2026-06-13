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
  <li data-href="./Linux/">
    <strong>Linux</strong>
    <br>
    <span>Linux 系统基础命令与进阶运维知识</span>
  </li>
  <li data-href="./SSH/">
    <strong>SSH与云服务器</strong>
    <br>
    <span>SSH 免登录配置、CI/CD 自动化部署</span>
  </li>
  <li data-href="./Cloud/">
    <strong>云计算</strong>
    <br>
    <span>国内云与国外云平台选型、核心服务和部署实践</span>
  </li>
  <li data-href="./Docker/">
    <strong>Docker</strong>
    <br>
    <span>Docker 容器技术入门与实践</span>
  </li>
  <li data-href="./Nginx/">
    <strong>Nginx</strong>
    <br>
    <span>Nginx Web 服务器配置与优化</span>
  </li>
  <li data-href="./Security/">
    <strong>服务器安全</strong>
    <br>
    <span>网络安全、系统安全、数据安全防护</span>
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
