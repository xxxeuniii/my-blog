import{_ as n,o as s,c as e,ag as p}from"./chunks/framework.-Wrcbzkw.js";const u=JSON.parse('{"title":"Generated Knowledge (生成知识)","description":"","frontmatter":{},"headers":[],"relativePath":"LLM/Prompt Engineering/18_generated_knowledge_生成知识.md","filePath":"LLM/Prompt Engineering/18_generated_knowledge_生成知识.md","lastUpdated":1778766566000}'),t={name:"LLM/Prompt Engineering/18_generated_knowledge_生成知识.md"};function l(i,a,d,o,r,c){return s(),e("div",null,[...a[0]||(a[0]=[p(`<h1 id="generated-knowledge-生成知识" tabindex="-1">Generated Knowledge (生成知识) <a class="header-anchor" href="#generated-knowledge-生成知识" aria-label="Permalink to &quot;Generated Knowledge (生成知识)&quot;">​</a></h1><p>先让模型生成相关知识，再基于知识回答问题。</p><hr><h2 id="核心思想" tabindex="-1">核心思想 <a class="header-anchor" href="#核心思想" aria-label="Permalink to &quot;核心思想&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>传统方式：</span></span>
<span class="line"><span>用户问题 → 模型直接回答</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Generated Knowledge：</span></span>
<span class="line"><span>用户问题 → 生成相关知识 → 基于知识回答</span></span></code></pre></div><hr><h2 id="示例一-事实性问题" tabindex="-1">示例一：事实性问题 <a class="header-anchor" href="#示例一-事实性问题" aria-label="Permalink to &quot;示例一：事实性问题&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>第一步 - 生成知识背景：</span></span>
<span class="line"><span>请先介绍关于&quot;人工智能在医疗领域应用&quot;的基本知识，包括：</span></span>
<span class="line"><span>- 主要应用场景</span></span>
<span class="line"><span>- 现有技术成熟度</span></span>
<span class="line"><span>- 典型案例</span></span>
<span class="line"><span></span></span>
<span class="line"><span>第二步 - 回答问题：</span></span>
<span class="line"><span>基于以上背景，请分析：AI辅助诊断影像的准确率是否已经超过人类医生？</span></span></code></pre></div><hr><h2 id="示例二-商业分析" tabindex="-1">示例二：商业分析 <a class="header-anchor" href="#示例二-商业分析" aria-label="Permalink to &quot;示例二：商业分析&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>第一步 - 生成行业知识：</span></span>
<span class="line"><span>在分析&quot;新能源汽车市场前景&quot;之前，请先总结：</span></span>
<span class="line"><span>1. 新能源汽车行业发展历程</span></span>
<span class="line"><span>2. 主要技术路线对比（锂电池、氢能源等）</span></span>
<span class="line"><span>3. 各国政策环境</span></span>
<span class="line"><span>4. 市场规模数据</span></span>
<span class="line"><span></span></span>
<span class="line"><span>第二步 - 综合分析：</span></span>
<span class="line"><span>基于以上知识，分析2025年新能源汽车渗透率预测</span></span></code></pre></div><hr><h2 id="示例三-代码相关" tabindex="-1">示例三：代码相关 <a class="header-anchor" href="#示例三-代码相关" aria-label="Permalink to &quot;示例三：代码相关&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>第一步 - 生成相关知识：</span></span>
<span class="line"><span>在解答&quot;如何设计高并发系统&quot;之前，请先列举：</span></span>
<span class="line"><span>1. 高并发系统的常见挑战</span></span>
<span class="line"><span>2. 业界主流解决方案</span></span>
<span class="line"><span>3. 各方案的优缺点</span></span>
<span class="line"><span></span></span>
<span class="line"><span>第二步 - 回答问题：</span></span>
<span class="line"><span>基于以上知识，为日活100万的APP设计后端架构</span></span></code></pre></div><hr><h2 id="适用场景" tabindex="-1">适用场景 <a class="header-anchor" href="#适用场景" aria-label="Permalink to &quot;适用场景&quot;">​</a></h2><table tabindex="0"><thead><tr><th>场景</th><th>效果</th></tr></thead><tbody><tr><td>专业领域分析</td><td>减少事实性错误</td></tr><tr><td>复杂问题</td><td>提供背景知识支撑</td></tr><tr><td>长回答任务</td><td>让回答更全面</td></tr><tr><td>技术评估</td><td>先了解技术再给出建议</td></tr></tbody></table><h2 id="核心要点" tabindex="-1">核心要点 <a class="header-anchor" href="#核心要点" aria-label="Permalink to &quot;核心要点&quot;">​</a></h2><table tabindex="0"><thead><tr><th>要点</th><th>说明</th></tr></thead><tbody><tr><td>分离生成和回答</td><td>先知识后答案</td></tr><tr><td>知识要全面</td><td>覆盖问题的各个方面</td></tr><tr><td>基于知识回答</td><td>确保答案有据可依</td></tr></tbody></table><h2 id="进阶用法" tabindex="-1">进阶用法 <a class="header-anchor" href="#进阶用法" aria-label="Permalink to &quot;进阶用法&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>一步完成（自动生成知识）：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>请在回答&quot;是否应该学习Rust&quot;这个问题时：</span></span>
<span class="line"><span>1. 先自动生成学习Rust的优势和劣势</span></span>
<span class="line"><span>2. 对比现有语言（Python、Go、C++）</span></span>
<span class="line"><span>3. 基于以上分析给出建议</span></span>
<span class="line"><span></span></span>
<span class="line"><span>格式：</span></span>
<span class="line"><span>[知识背景]</span></span>
<span class="line"><span>- Rust特点：...</span></span>
<span class="line"><span>- 与Python对比：...</span></span>
<span class="line"><span>[综合建议]</span></span></code></pre></div>`,21)])])}const g=n(t,[["render",l]]);export{u as __pageData,g as default};
