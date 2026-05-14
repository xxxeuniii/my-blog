---
layout: page
sidebar: false
---

<div class="category-index-page">

# Python 基础

Python 编程入门到高级

<div class="category-info">
  <div class="info-item">
    <div class="info-label">文章数量</div>
    <div class="info-value" id="article-count"></div>
  </div>
</div>

<ul id="article-list">
  <li>
    <strong><a href="./01_Python简介">01. Python 简介</a></strong>
    <br>
    <span>Python 概述</span>
  </li>
  <li>
    <strong><a href="./02_第一个Python程序">02. 第一个程序</a></strong>
    <br>
    <span>Hello World</span>
  </li>
  <li>
    <strong><a href="./03_变量与数据类型">03. 变量与数据类型</a></strong>
    <br>
    <span>数据类型基础</span>
  </li>
  <li>
    <strong><a href="./04_基本运算">04. 基本运算</a></strong>
    <br>
    <span>运算符与表达式</span>
  </li>
  <li>
    <strong><a href="./05_条件语句">05. 条件语句</a></strong>
    <br>
    <span>if / else</span>
  </li>
  <li>
    <strong><a href="./06_循环结构">06. 循环结构</a></strong>
    <br>
    <span>for / while</span>
  </li>
  <li>
    <strong><a href="./07_函数定义">07. 函数定义</a></strong>
    <br>
    <span>函数与函数调用</span>
  </li>
  <li>
    <strong><a href="./08_列表操作">08. 列表操作</a></strong>
    <br>
    <span>列表基础</span>
  </li>
  <li>
    <strong><a href="./09_字典操作">09. 字典操作</a></strong>
    <br>
    <span>字典基础</span>
  </li>
  <li>
    <strong><a href="./10_异常处理">10. 异常处理</a></strong>
    <br>
    <span>错误与捕获</span>
  </li>
  <li>
    <strong><a href="./11_文件操作">11. 文件操作</a></strong>
    <br>
    <span>文件读写</span>
  </li>
  <li>
    <strong><a href="./12_模块导入">12. 模块导入</a></strong>
    <br>
    <span>模块与包</span>
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
