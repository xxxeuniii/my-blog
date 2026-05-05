---
layout: page
sidebar: false
---

<div class="category-index-page">

# uniapp 视图

uniapp 开发实践

<div class="category-info">
  <div class="info-item">
    <div class="info-label">文章数量</div>
    <div class="info-value" id="article-count"></div>
  </div>
</div>

<ul id="article-list">
  <li>
    <strong><a href="./request封装">request封装</a></strong>
    <br>
    <span>uniapp 请求封装</span>
  </li>
  <li>
    <strong><a href="./uniapp基础">uniapp基础</a></strong>
    <br>
    <span>uniapp 基础入门</span>
  </li>
  <li>
    <strong><a href="./uniapp支付功能">uniapp支付功能</a></strong>
    <br>
    <span>uniapp 支付功能实现</span>
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
