---
layout: home
---

<div class="homepage-container">
  <!-- Hero Title -->
  <header class="hero-section">
    <h1 class="hero-title">技术档案：知识图谱与索引</h1>
    <p class="hero-description">
      写代码的日常，技术笔记与思考。
    </p>
  </header>

  <!-- Statistics Overview -->
  <section class="stats-overview">
    <div class="stats-grid">
      <div class="stat-card">
        <span class="stat-number">84</span>
        <span class="stat-label">文章总数</span>
      </div>
      <div class="stat-card">
        <span class="stat-number">20</span>
        <span class="stat-label">技术分类</span>
      </div>
      <div class="stat-card">
        <span class="stat-number">10</span>
        <span class="stat-label">项目实践</span>
      </div>
    </div>
  </section>

  <!-- Technical Stack & Categories -->
  <section class="tech-categories">
    <div class="section-header">
      <h2 class="section-title">技术分类</h2>
    </div>
    <div class="category-grid">
      <div class="category-column">
        <h3 class="category-title">基础篇</h3>
        <ul class="category-list">
          <li><a href="/basic_config/">项目配置</a></li>
          <li><a href="/basic/">前端基础</a></li>
          <li><a href="/html/">HTML</a></li>
          <li><a href="/css/">CSS</a></li>
          <li><a href="/js/">JavaScript</a></li>
          <li><a href="/ts/">TypeScript</a></li>
        </ul>
      </div>
      <div class="category-column">
        <h3 class="category-title">进阶篇</h3>
        <ul class="category-list">
          <li><a href="/工程化/">工程化</a></li>
          <li><a href="/git/">Git</a></li>
          <li><a href="/tools/">工具</a></li>
          <li><a href="/network/">网络</a></li>
          <li><a href="/component/">组件库</a></li>
        </ul>
      </div>
      <div class="category-column">
        <h3 class="category-title">框架篇</h3>
        <ul class="category-list">
          <li><a href="/views/vue/">Vue.js</a></li>
          <li><a href="/react/">React</a></li>
          <li><a href="/angular/">Angular</a></li>
          <li><a href="/Electron/">Electron</a></li>
        </ul>
      </div>
      <div class="category-column">
        <h3 class="category-title">后端篇</h3>
        <ul class="category-list">
          <li><a href="/node/">Node.js</a></li>
          <li><a href="/views/node/">Node.js进阶</a></li>
          <li><a href="/python/">Python</a></li>
          <li><a href="/Java/">Java</a></li>
          <li><a href="/server/">服务器</a></li>
        </ul>
      </div>
    </div>
  </section>




</div>

<style>
.homepage-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

/* Hero Section */
.hero-section {
  margin-bottom: 5rem;
}

.archive-label {
  display: block;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: #737373;
  margin-bottom: 1.5rem;
}

.hero-title {
  font-size: 3rem;
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: -0.02em;
  color: #0c1014;
  margin-bottom: 2rem;
  font-family: 'Newsreader', serif;
}

.hero-description {
  font-size: 1.125rem;
  line-height: 1.7;
  color: #585f66;
  max-width: 700px;
}

/* Section Header */
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  border-bottom: 1px solid #e5e5e5;
  padding-bottom: 1rem;
  margin-bottom: 2.5rem;
}

.section-title {
  font-size: 2rem;
  font-weight: 500;
  color: #171717;
  font-family: 'Newsreader', serif;
}

.total-count {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #a3a3a3;
}

/* Year Archive */
.year-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 3rem;
}

@media (min-width: 768px) {
  .year-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.year-card {
  cursor: pointer;
}

.year-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  border-bottom: 1px solid #f5f5f5;
  padding-bottom: 1.5rem;
  margin-bottom: 1rem;
  transition: border-color 0.2s ease;
}

.year-card:hover .year-header {
  border-color: #171717;
}

.year-number {
  font-size: 3.5rem;
  font-weight: 600;
  color: #171717;
  font-family: 'Newsreader', serif;
}

.year-count {
  font-size: 1.25rem;
  font-style: italic;
  color: #a3a3a3;
  transition: color 0.2s ease;
  font-family: 'Newsreader', serif;
}

.year-card:hover .year-count {
  color: #171717;
}

.year-description {
  font-size: 0.875rem;
  line-height: 1.6;
  color: #737373;
}

/* Tech Categories */
.category-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 2rem;
}

@media (min-width: 768px) {
  .category-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .category-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.category-title {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #171717;
  border-bottom: 2px solid #171717;
  padding-bottom: 0.5rem;
  margin-bottom: 1.5rem;
}

.category-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.category-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
}

.category-list a {
  font-size: 1rem;
  color: #525252;
  text-decoration: none;
  transition: color 0.2s ease;
}

.category-list a:hover {
  color: #171717;
}

.category-list span {
  font-size: 0.75rem;
  color: #d4d4d4;
  font-style: italic;
}

/* Topics Cloud */
.topics-cloud {
  background-color: #fafafa;
  padding: 3rem;
  margin: 4rem 0;
}

.topics-cloud .section-title {
  text-align: center;
  margin-bottom: 2.5rem;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  align-items: baseline;
}

.tag {
  font-weight: 500;
}

.tag-sm {
  font-size: 1rem;
  color: #a3a3a3;
  font-weight: 400;
}

.tag-medium {
  font-size: 1.25rem;
  color: #737373;
}

.tag-large {
  font-size: 1.5rem;
  color: #171717;
  font-weight: 600;
}

.tag-xl {
  font-size: 2rem;
  color: #171717;
  font-weight: 600;
}

/* Statistics Overview */
.stats-overview {
  margin-bottom: 5rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: repeat(1, 1fr);
  }
}

.stat-card {
  text-align: center;
  padding: 2.5rem 1.5rem;
  border: 1px solid #e5e5e5;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
}

.stat-card:hover {
  border-color: #171717;
  transform: translateY(-2px);
}

.stat-number {
  display: block;
  font-size: 3rem;
  font-weight: 600;
  color: #171717;
  font-family: 'Newsreader', serif;
  line-height: 1;
  margin-bottom: 0.5rem;
}

.stat-label {
  display: block;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #737373;
  font-weight: 500;
}
</style>
