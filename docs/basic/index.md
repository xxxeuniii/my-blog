---
layout: page
sidebar: false
---

<div class="category-index-page">

# 基础

计算机基础知识。

<div class="category-info">
  <div class="info-item">
    <div class="info-label">文章数量</div>
    <div class="info-value" id="article-count"></div>
  </div>
</div>

<ul id="article-list">
  <li data-href="./network">
    <strong>网络</strong>
    <br>
    <span>计算机网络基础</span>
  </li>
  <li data-href="./进制与位运算">
    <strong>进制与位运算</strong>
    <br>
    <span>二进制、进制转换、位运算、原码反码补码</span>
  </li>
  <li data-href="./操作系统基础">
    <strong>操作系统基础</strong>
    <br>
    <span>进程线程协程、并发并行、内存管理、Linux基础</span>
  </li>
  <li data-href="./计算机网络基础">
    <strong>计算机网络基础</strong>
    <br>
    <span>TCP/IP、HTTP/HTTPS、Cookie/Session/Token</span>
  </li>
  <li data-href="./数据结构与算法">
    <strong>数据结构与算法</strong>
    <br>
    <span>数组链表栈队列哈希表、排序二分查找递归</span>
  </li>
  <li data-href="./数据库基础">
    <strong>数据库基础</strong>
    <br>
    <span>SQL增删改查、索引、事务、锁</span>
  </li>
  <li data-href="./编程通用基础">
    <strong>编程通用基础</strong>
    <br>
    <span>面向对象、接口泛型、模块化、Git</span>
  </li>
  <li data-href="./软件工程基础">
    <strong>软件工程基础</strong>
    <br>
    <span>开发流程、敏捷开发、接口文档、单元测试</span>
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
