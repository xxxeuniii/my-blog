---
layout: page
sidebar: false
---

<div class="category-index-page">

# 网络

网络协议与安全知识

<div class="category-info">
  <div class="info-item">
    <div class="info-label">文章数量</div>
    <div class="info-value" id="article-count"></div>
  </div>
</div>

<ul id="article-list">
  <li>
    <strong><a href="./SSL">SSL</a></strong>
    <br>
    <span>SSL 证书与安全通信</span>
  </li>
  <li>
    <strong><a href="./基础">基础</a></strong>
    <br>
    <span>网络基础知识</span>
  </li>
  <li>
    <strong><a href="./网络协议">网络协议</a></strong>
    <br>
    <span>网络协议详解</span>
  </li>
  <li>
    <strong><a href="./网络安全">网络安全</a></strong>
    <br>
    <span>网络安全知识</span>
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
