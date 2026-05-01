---
layout: page
sidebar: false
---

<div class="category-index-page">

# 项目

项目开发与实战案例

<div class="category-info">
  <div class="info-item">
    <div class="info-label">文章数量</div>
    <div class="info-value" id="article-count"></div>
  </div>
</div>

<ul id="article-list">
  <li>
    <strong><a href="./uniapp.md">uniapp</a></strong>
    <br>
    <span>uniapp 开发指南</span>
  </li>
  <li>
    <strong><a href="./后台管理系统.md">后台管理系统</a></strong>
    <br>
    <span>后台管理系统开发</span>
  </li>
  <li>
    <strong><a href="./微信管理平台.md">微信管理平台</a></strong>
    <br>
    <span>微信管理平台项目</span>
  </li>
  <li>
    <strong><a href="./微应用开发.md">微应用开发</a></strong>
    <br>
    <span>微应用开发实践</span>
  </li>
  <li>
    <strong><a href="./微应用框架.md">微应用框架</a></strong>
    <br>
    <span>微应用框架使用</span>
  </li>
  <li>
    <strong><a href="./排队项目.md">排队项目</a></strong>
    <br>
    <span>排队系统项目</span>
  </li>
  <li>
    <strong><a href="./柜面poc项目.md">柜面poc项目</a></strong>
    <br>
    <span>柜面 POC 项目</span>
  </li>
  <li>
    <strong><a href="./柜面项目.md">柜面项目</a></strong>
    <br>
    <span>柜面系统项目</span>
  </li>
  <li>
    <strong><a href="./组件封装.md">组件封装</a></strong>
    <br>
    <span>组件封装技术</span>
  </li>
  <li>
    <strong><a href="./项目迁移.md">项目迁移</a></strong>
    <br>
    <span>项目迁移实践</span>
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
