---
layout: page
sidebar: false
---

<div class="category-index-page">

# Node.js 视图

Node.js 视图与服务端开发

<div class="category-info">
  <div class="info-item">
    <div class="info-label">文章数量</div>
    <div class="info-value" id="article-count"></div>
  </div>
</div>

<ul id="article-list">
  <li>
    <strong><a href="./express1">express1</a></strong>
    <br>
    <span>Express 入门</span>
  </li>
  <li>
    <strong><a href="./express2">express2</a></strong>
    <br>
    <span>Express 进阶</span>
  </li>
  <li>
    <strong><a href="./nodejs1">nodejs1</a></strong>
    <br>
    <span>Node.js 入门</span>
  </li>
  <li>
    <strong><a href="./nodejs2">nodejs2</a></strong>
    <br>
    <span>Node.js 进阶</span>
  </li>
  <li>
    <strong><a href="./socket.io">socket.io</a></strong>
    <br>
    <span>Socket.IO 实时通信</span>
  </li>
  <li>
    <strong><a href="./sql">sql</a></strong>
    <br>
    <span>SQL 数据库</span>
  </li>
  <li>
    <strong><a href="./websocket基本使用">websocket基本使用</a></strong>
    <br>
    <span>WebSocket 基本使用</span>
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
