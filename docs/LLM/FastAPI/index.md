---
layout: page
sidebar: false
---

<div class="category-index-page">

# FastAPI

现代 Python API 开发框架。

<div class="category-info">
  <div class="info-item">
    <div class="info-label">文章数量</div>
    <div class="info-value">13</div>
  </div>
</div>

<div id="article-list">
  <li data-href="./01_FastAPI简介">
    <strong>01. 简介</strong>
    <br>
    <span>FastAPI 基础介绍</span>
  </li>
  <li data-href="./02_FastAPI安装与基本用法">
    <strong>02. 安装与基本用法</strong>
    <br>
    <span>快速上手 FastAPI</span>
  </li>
  <li data-href="./03_FastAPI路径参数">
    <strong>03. 路径参数</strong>
    <br>
    <span>URL 参数处理</span>
  </li>
  <li data-href="./04_FastAPI查询参数">
    <strong>04. 查询参数</strong>
    <br>
    <span>查询字符串处理</span>
  </li>
  <li data-href="./05_FastAPI请求体">
    <strong>05. 请求体</strong>
    <br>
    <span>数据验证与解析</span>
  </li>
  <li data-href="./06_FastAPI响应模型">
    <strong>06. 响应模型</strong>
    <br>
    <span>响应数据格式</span>
  </li>
  <li data-href="./07_FastAPI状态码">
    <strong>07. 状态码</strong>
    <br>
    <span>HTTP 状态码</span>
  </li>
  <li data-href="./08_FastAPI依赖注入">
    <strong>08. 依赖注入</strong>
    <br>
    <span>Dependency Injection</span>
  </li>
  <li data-href="./09_FastAPI认证">
    <strong>09. 认证</strong>
    <br>
    <span>安全认证机制</span>
  </li>
  <li data-href="./10_FastAPI数据库集成">
    <strong>10. 数据库集成</strong>
    <br>
    <span>数据库操作</span>
  </li>
  <li data-href="./11_FastAPI异步支持">
    <strong>11. 异步支持</strong>
    <br>
    <span>Async / Await</span>
  </li>
  <li data-href="./12_FastAPI部署">
    <strong>12. 部署</strong>
    <br>
    <span>生产环境部署</span>
  </li>
  <li data-href="./Pydantic介绍">
    <strong>Pydantic 介绍</strong>
    <br>
    <span>数据验证库</span>
  </li>
</div>

<script>
document.addEventListener('DOMContentLoaded', () => {
  const list = document.getElementById('article-list')
  if (list) {
    list.querySelectorAll('li[data-href]').forEach(li => {
      li.style.cursor = 'pointer'
      li.addEventListener('click', () => {
        const href = li.getAttribute('data-href')
        window.location.href = href
      })
    })
  }
})
</script>

<style>
#article-list li[data-href]:hover {
  background-color: var(--vp-c-brand-soft);
  transform: translateX(4px);
}
</style>
