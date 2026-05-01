---
title: 分类
---

<div class="category-page">
  <!-- Category Header -->
  <div class="category-header">
    <div class="breadcrumbs">
      <a href="/">归档</a>
      <span class="breadcrumb-arrow">›</span>
      <span class="current-category">分类</span>
    </div>
    <h1 class="category-title">工程化 / Engineering</h1>
    <p class="category-description">
      探讨规模化软件开发的 methodology、工具和系统。涵盖从构建系统到持续集成以及基础设施即代码的深度洞察。我们专注于如何通过系统化的工程手段提升软件交付的可预测性与质量。
    </p>
    <div class="category-stats">
      <div class="stat-item">
        <span class="stat-label">文章数量</span>
        <span class="stat-value">42</span>
      </div>
      <div class="stat-divider"></div>
      <div class="stat-item">
        <span class="stat-label">贡献者</span>
        <span class="stat-value">12</span>
      </div>
      <div class="stat-divider"></div>
      <div class="stat-item">
        <span class="stat-label">最后更新</span>
        <span class="stat-value">2024年10月24日</span>
      </div>
    </div>
  </div>

  <div class="category-content">
    <!-- SideNavBar -->
    <aside class="sidebar">
      <h3 class="sidebar-title">目录 / TOC</h3>
      <nav class="sidebar-nav">
        <a href="#" class="sidebar-link active">
          <span class="link-dot active"></span>
          引言
        </a>
        <a href="#" class="sidebar-link">
          <span class="link-dot"></span>
          环境配置
        </a>
        <a href="#" class="sidebar-link">
          <span class="link-dot"></span>
          架构设计
        </a>
        <a href="#" class="sidebar-link">
          <span class="link-dot"></span>
          具体实现
        </a>
        <a href="#" class="sidebar-link">
          <span class="link-dot"></span>
          总结
        </a>
      </nav>
    </aside>

    <!-- Main Content Area -->
    <main class="main-content">
      <!-- Featured Article -->
      <article class="featured-article">
        <div class="featured-badge">
          <span class="badge-primary">精选案例</span>
          <span class="badge-divider">/</span>
          <span class="badge-secondary">FEATURED</span>
        </div>
        <h2 class="featured-title">现代 Monorepo 中分布式构建系统的演进</h2>
        <p class="featured-description">
          分析从本地编译到全球缓存的分布式构建执行的演变。深度解析 Bazel、Nx 和 Turborepo 在大规模企业环境中的架构实践，以及如何平衡构建速度与一致性。
        </p>
        <div class="featured-meta">
          <span class="meta-item">
            <span class="meta-icon">📅</span>
            2024年10月12日
          </span>
          <span class="meta-item">
            <span class="meta-icon">⏱️</span>
            15 分钟阅读
          </span>
          <span class="meta-item">
            <span class="meta-icon">👤</span>
            技术编辑部
          </span>
        </div>
      </article>

      <!-- Article Grid -->
      <div class="article-grid">
        <!-- Card 1 -->
        <article class="article-card">
          <div class="card-header">
            <span class="card-category">基础设施</span>
            <span class="card-bookmark">★</span>
          </div>
          <h3 class="card-title">基于 Nix 和 Flakes 的声明式 CI/CD 流水线</h3>
          <p class="card-description">如何利用函数式包管理在异构环境中实现百分之百可复现的构建环境，解决"在我的机器上能运行"的顽疾。</p>
          <div class="card-footer">
            <span class="card-author">作者: Sarah Chen</span>
            <span class="card-date">2024年9月28日</span>
          </div>
        </article>

        <!-- Card 2 -->
        <article class="article-card">
          <div class="card-header">
            <span class="card-category">自动化</span>
            <span class="card-bookmark">★</span>
          </div>
          <h3 class="card-title">为高效率团队设计自动化质量门禁</h3>
          <p class="card-description">在不降低发布频率的前提下，整合自动化测试、安全扫描和性能剖析的闭环策略。</p>
          <div class="card-footer">
            <span class="card-author">作者: David Miller</span>
            <span class="card-date">2024年9月15日</span>
          </div>
        </article>

        <!-- Card 3 -->
        <article class="article-card">
          <div class="card-header">
            <span class="card-category">架构</span>
            <span class="card-bookmark">★</span>
          </div>
          <h3 class="card-title">平台工程在现代 SaaS 中的角色</h3>
          <p class="card-description">超越 DevOps：通过自助式基础设施构建赋能团队的内部开发平台（IDP）设计原则。</p>
          <div class="card-footer">
            <span class="card-author">作者: Elena Rossi</span>
            <span class="card-date">2024年8月22日</span>
          </div>
        </article>

        <!-- Card 4 -->
        <article class="article-card">
          <div class="card-header">
            <span class="card-category">方法论</span>
            <span class="card-bookmark">★</span>
          </div>
          <h3 class="card-title">微服务架构中的数据库 Schema 版本控制</h3>
          <p class="card-description">从容处理跨独立服务的分布式数据迁移，实现大规模系统中的零停机发布方案。</p>
          <div class="card-footer">
            <span class="card-author">作者: Marcus Wright</span>
            <span class="card-date">2024年8月5日</span>
          </div>
        </article>
      </div>

      <!-- Load More -->
      <div class="load-more">
        <button class="load-more-btn">查看全部存档</button>
      </div>
    </main>
  </div>
</div>

<style>
.category-page {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
}

/* Category Header */
.category-header {
  margin-bottom: 4rem;
  max-width: 800px;
}

.breadcrumbs {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #585f66;
}

.breadcrumbs a {
  color: #585f66;
  text-decoration: none;
  transition: color 0.2s ease;
}

.breadcrumbs a:hover {
  color: #0c1014;
}

.breadcrumb-arrow {
  color: #0c1014;
}

.current-category {
  color: #0c1014;
  font-weight: 600;
}

.category-title {
  font-size: 3rem;
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: -0.02em;
  color: #0c1014;
  margin-bottom: 2rem;
  padding-left: 1.5rem;
  border-left: 4px solid #0c1014;
  font-family: 'Newsreader', Georgia, serif;
}

.category-description {
  font-size: 1.125rem;
  line-height: 1.7;
  color: #585f66;
  max-width: 600px;
  margin-bottom: 2.5rem;
}

.category-stats {
  display: flex;
  align-items: center;
  gap: 3rem;
  padding: 2rem 0;
  border-top: 1px solid #e5e5e5;
  border-bottom: 1px solid #e5e5e5;
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.stat-label {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #a3a3a3;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 500;
  color: #0c1014;
  font-family: 'Newsreader', Georgia, serif;
}

.stat-divider {
  width: 1px;
  height: 3rem;
  background-color: #e5e5e5;
}

/* Category Content */
.category-content {
  display: flex;
  gap: 3rem;
}

/* Sidebar */
.sidebar {
  width: 16rem;
  flex-shrink: 0;
  position: sticky;
  top: 10rem;
  height: fit-content;
  padding-left: 1.5rem;
  border-left: 1px solid #e5e5e5;
}

.sidebar-title {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #a3a3a3;
  margin-bottom: 1rem;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.sidebar-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0;
  font-size: 0.875rem;
  color: #585f66;
  text-decoration: none;
  transition: color 0.2s ease;
}

.sidebar-link:hover {
  color: #0c1014;
}

.sidebar-link.active {
  color: #0c1014;
  font-weight: 600;
}

.link-dot {
  width: 0.375rem;
  height: 0.375rem;
  border-radius: 50%;
  background-color: transparent;
  transition: background-color 0.2s ease;
}

.link-dot.active {
  background-color: #0c1014;
}

.sidebar-link:hover .link-dot {
  background-color: #d4d4d4;
}

.sidebar-link.active:hover .link-dot {
  background-color: #0c1014;
}

/* Main Content */
.main-content {
  flex: 1;
}

/* Featured Article */
.featured-article {
  margin-bottom: 4rem;
  padding: 2.5rem;
  border: 1px solid #e5e5e5;
  background-color: #ffffff;
  position: relative;
  overflow: hidden;
  transition: box-shadow 0.3s ease;
}

.featured-article:hover {
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.featured-article::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background-color: #0c1014;
  transform: translateX(-100%);
  transition: transform 0.3s ease;
}

.featured-article:hover::before {
  transform: translateX(0);
}

.featured-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.badge-primary {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #0c1014;
  border: 1px solid #0c1014;
  padding: 0.25rem 0.5rem;
}

.badge-divider {
  color: #e5e5e5;
}

.badge-secondary {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #a3a3a3;
}

.featured-title {
  font-size: 2rem;
  font-weight: 500;
  line-height: 1.3;
  color: #0c1014;
  margin-bottom: 1.5rem;
  font-family: 'Newsreader', Georgia, serif;
  transition: color 0.2s ease;
}

.featured-article:hover .featured-title {
  color: #0c1014;
}

.featured-description {
  font-size: 1.125rem;
  line-height: 1.7;
  color: #585f66;
  margin-bottom: 2rem;
}

.featured-meta {
  display: flex;
  gap: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #f5f5f5;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #a3a3a3;
}

.meta-icon {
  font-size: 1rem;
}

/* Article Grid */
.article-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 2rem;
}

@media (min-width: 768px) {
  .article-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.article-card {
  padding: 2rem;
  border-bottom: 1px solid #e5e5e5;
  transition: background-color 0.2s ease;
}

.article-card:hover {
  background-color: #fafafa;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.card-category {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #585f66;
}

.card-bookmark {
  font-size: 1rem;
  color: #e5e5e5;
  cursor: pointer;
  transition: color 0.2s ease;
}

.article-card:hover .card-bookmark {
  color: #0c1014;
}

.card-title {
  font-size: 1.5rem;
  font-weight: 500;
  line-height: 1.4;
  color: #0c1014;
  margin-bottom: 1rem;
  font-family: 'Newsreader', Georgia, serif;
  transition: color 0.2s ease;
}

.article-card:hover .card-title {
  color: #0c1014;
}

.card-description {
  font-size: 0.875rem;
  line-height: 1.6;
  color: #585f66;
  margin-bottom: 1.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-author,
.card-date {
  font-size: 0.625rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: #a3a3a3;
}

/* Load More */
.load-more {
  display: flex;
  justify-content: center;
  margin-top: 5rem;
}

.load-more-btn {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: #0c1014;
  border: 1px solid #0c1014;
  padding: 1rem 2.5rem;
  background-color: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
}

.load-more-btn:hover {
  background-color: #0c1014;
  color: #ffffff;
}

/* Responsive */
@media (max-width: 1024px) {
  .category-content {
    flex-direction: column;
  }
  
  .sidebar {
    width: 100%;
    position: static;
    padding-left: 0;
    border-left: none;
    border-bottom: 1px solid #e5e5e5;
    padding-bottom: 1.5rem;
    margin-bottom: 2rem;
  }
  
  .sidebar-nav {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1rem;
  }
  
  .sidebar-link {
    padding: 0.5rem 1rem;
    background-color: #fafafa;
    border-radius: 4px;
  }
  
  .link-dot {
    display: none;
  }
}

@media (max-width: 768px) {
  .category-title {
    font-size: 2rem;
  }
  
  .category-stats {
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .stat-divider {
    width: 100%;
    height: 1px;
  }
  
  .featured-title {
    font-size: 1.5rem;
  }
  
  .featured-meta {
    flex-direction: column;
    gap: 0.75rem;
  }
}
</style>
