---
layout: page
sidebar: false
---

<div class="category-index-page">

# 向量数据库

存储、检索和管理向量数据的专用数据库，是 RAG 系统的核心组件。

<div class="category-info">
  <div class="info-item">
    <div class="info-label">文章数量</div>
    <div class="info-value" id="article-count"></div>
  </div>
</div>

<ul id="article-list">
  <li data-href="./01_向量数据库概览">
    <strong>01. 向量数据库概览</strong>
    <br>
    <span>什么是向量数据库，为什么需要它</span>
  </li>
  <li data-href="./02_Chroma">
    <strong>02. Chroma</strong>
    <br>
    <span>开源轻量级向量数据库</span>
  </li>
  <li data-href="./03_Pinecone">
    <strong>03. Pinecone</strong>
    <br>
    <span>托管式云向量数据库服务</span>
  </li>
  <li data-href="./04_Milvus">
    <strong>04. Milvus</strong>
    <br>
    <span>云原生向量数据库</span>
  </li>
  <li data-href="./05_Weaviate">
    <strong>05. Weaviate</strong>
    <br>
    <span>模块化向量数据库</span>
  </li>
  <li data-href="./06_Qdrant">
    <strong>06. Qdrant</strong>
    <br>
    <span> Rust 实现的向量数据库</span>
  </li>
  <li data-href="./07_其他向量数据库">
    <strong>07. 其他向量数据库</strong>
    <br>
    <span>Elasticsearch、PGVector、Redis Stack 等</span>
  </li>
  <li data-href="./08_FAISS详解">
    <strong>08. FAISS 详解</strong>
    <br>
    <span>Facebook 向量搜索利器</span>
  </li>
</ul>

<script setup>
import { onMounted } from 'vue'
onMounted(() => {
  const list = document.getElementById('article-list')
  if (list) {
    const countEl = document.getElementById('article-count')
    if (countEl) {
      countEl.textContent = list.querySelectorAll('li').length
    }
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
</div>
