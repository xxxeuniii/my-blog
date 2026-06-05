---
layout: page
sidebar: false
---

<div class="category-index-page">

# 服务器安全

服务器安全是运维工作的核心内容，涵盖网络层、系统层、应用层和数据层的全方位防护。

<div class="category-info">
  <div class="info-item">
    <div class="info-label">文章数量</div>
    <div class="info-value" id="article-count"></div>
  </div>
</div>

<ul id="article-list">
  <li data-href="./服务器网络安全">
    <strong>服务器网络安全</strong>
    <br>
    <span>网络安全、系统安全、数据安全防护的全面指南</span>
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