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
  <li>
    <strong><a href="./network">网络</a></strong>
    <br>
    <span>计算机网络基础</span>
  </li>
  <li>
    <strong><a href="./进制与位运算">进制与位运算</a></strong>
    <br>
    <span>二进制、进制转换、位运算、原码反码补码</span>
  </li>
  <li>
    <strong><a href="./操作系统基础">操作系统基础</a></strong>
    <br>
    <span>进程线程协程、并发并行、内存管理、Linux基础</span>
  </li>
  <li>
    <strong><a href="./计算机网络基础">计算机网络基础</a></strong>
    <br>
    <span>TCP/IP、HTTP/HTTPS、Cookie/Session/Token</span>
  </li>
  <li>
    <strong><a href="./数据结构与算法">数据结构与算法</a></strong>
    <br>
    <span>数组链表栈队列哈希表、排序二分查找递归</span>
  </li>
  <li>
    <strong><a href="./数据库基础">数据库基础</a></strong>
    <br>
    <span>SQL增删改查、索引、事务、锁</span>
  </li>
  <li>
    <strong><a href="./编程通用基础">编程通用基础</a></strong>
    <br>
    <span>面向对象、接口泛型、模块化、Git</span>
  </li>
  <li>
    <strong><a href="./软件工程基础">软件工程基础</a></strong>
    <br>
    <span>开发流程、敏捷开发、接口文档、单元测试</span>
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
