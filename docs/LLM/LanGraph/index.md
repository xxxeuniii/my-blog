---
layout: page
sidebar: false
---

<div class="category-index-page">

# LanGraph

LanGraph 框架使用指南

<div class="category-info">
  <div class="info-item">
    <div class="info-label">文章数量</div>
    <div class="info-value" id="article-count"></div>
  </div>
</div>

<ul id="article-list">
  <li>
    <strong><a href="./01_basic_graph_基础图">01. 基础图</a></strong>
    <br>
    <span>基础图结构与节点定义</span>
  </li>
  <li>
    <strong><a href="./02_conditional_branch_条件分支">02. 条件分支</a></strong>
    <br>
    <span>条件判断与路由</span>
  </li>
  <li>
    <strong><a href="./03_cycle_loop_循环">03. 循环</a></strong>
    <br>
    <span>循环执行与迭代</span>
  </li>
  <li>
    <strong><a href="./04_human_in_loop_人机交互">04. 人机交互</a></strong>
    <br>
    <span>人类在环模式</span>
  </li>
  <li>
    <strong><a href="./05_state_management_状态管理">05. 状态管理</a></strong>
    <br>
    <span>状态存储与传递</span>
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
