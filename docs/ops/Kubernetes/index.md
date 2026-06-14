---
layout: page
sidebar: false
---

<div class="category-index-page">

# Kubernetes（K8s）

Kubernetes 容器编排、应用部署、弹性扩缩容与集群运维知识。

<div class="category-info">
  <div class="info-item">
    <div class="info-label">文章数量</div>
    <div class="info-value" id="article-count"></div>
  </div>
</div>

<ul id="article-list">
  <li data-href="./Kubernetes基础">
    <strong>Kubernetes基础</strong>
    <br>
    <span>K8s 核心概念、架构、常用命令与应用部署</span>
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
