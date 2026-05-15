import{_ as s,o as n,c as p,ag as e}from"./chunks/framework.-Wrcbzkw.js";const u=JSON.parse('{"title":"评估与迭代","description":"","frontmatter":{},"headers":[],"relativePath":"LLM/Prompt Engineering/21_evaluation_iteration_评估与迭代.md","filePath":"LLM/Prompt Engineering/21_evaluation_iteration_评估与迭代.md","lastUpdated":1778838103000}'),l={name:"LLM/Prompt Engineering/21_evaluation_iteration_评估与迭代.md"};function t(i,a,c,o,r,d){return n(),p("div",null,[...a[0]||(a[0]=[e(`<h1 id="评估与迭代" tabindex="-1">评估与迭代 <a class="header-anchor" href="#评估与迭代" aria-label="Permalink to &quot;评估与迭代&quot;">​</a></h1><p>建立测试集、LLM打分、版本对比的完整流程。</p><hr><h2 id="为什么需要评估" tabindex="-1">为什么需要评估 <a class="header-anchor" href="#为什么需要评估" aria-label="Permalink to &quot;为什么需要评估&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>没有评估，就没有优化方向：</span></span>
<span class="line"><span>- 不知道哪种Prompt更好</span></span>
<span class="line"><span>- 不知道效果下降还是上升</span></span>
<span class="line"><span>- 版本混乱难以回滚</span></span></code></pre></div><hr><h2 id="第一步-建立测试集" tabindex="-1">第一步：建立测试集 <a class="header-anchor" href="#第一步-建立测试集" aria-label="Permalink to &quot;第一步：建立测试集&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>测试集构成：</span></span>
<span class="line"><span>1. 代表性问题（覆盖主要场景）</span></span>
<span class="line"><span>2. 基准答案（或质量标准）</span></span>
<span class="line"><span>3. 评分维度（明确评估标准）</span></span>
<span class="line"><span></span></span>
<span class="line"><span>示例测试集（10个问题）：</span></span>
<span class="line"><span>Q1. 情感分类：用户评论是正面/负面/中性？</span></span>
<span class="line"><span>Q2. 代码生成：写一个Python排序函数</span></span>
<span class="line"><span>Q3. 信息提取：从邮件提取会议时间地点</span></span>
<span class="line"><span>Q4. 翻译：中文→英文技术文档翻译</span></span>
<span class="line"><span>...</span></span></code></pre></div><hr><h2 id="第二步-llm自动打分" tabindex="-1">第二步：LLM自动打分 <a class="header-anchor" href="#第二步-llm自动打分" aria-label="Permalink to &quot;第二步：LLM自动打分&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>用LLM做评估器的Prompt：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>你是一个严谨的AI评估员。请从以下维度评估回答质量：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>维度：</span></span>
<span class="line"><span>1. 正确性（0-5分）：回答是否准确</span></span>
<span class="line"><span>2. 完整性（0-5分）：是否覆盖所有要点</span></span>
<span class="line"><span>3. 清晰度（0-5分）：表达是否清晰</span></span>
<span class="line"><span>4. 格式（0-5分）：是否符合要求格式</span></span>
<span class="line"><span></span></span>
<span class="line"><span>请返回JSON：</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>  &quot;total_score&quot;: 总分,</span></span>
<span class="line"><span>  &quot;dimensions&quot;: {</span></span>
<span class="line"><span>    &quot;correctness&quot;: 分数,</span></span>
<span class="line"><span>    &quot;completeness&quot;: 分数,</span></span>
<span class="line"><span>    &quot;clarity&quot;: 分数,</span></span>
<span class="line"><span>    &quot;format&quot;: 分数</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>  &quot;feedback&quot;: &quot;改进建议&quot;</span></span>
<span class="line"><span>}</span></span></code></pre></div><hr><h2 id="第三步-版本对比" tabindex="-1">第三步：版本对比 <a class="header-anchor" href="#第三步-版本对比" aria-label="Permalink to &quot;第三步：版本对比&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>建立Prompt版本管理：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>v1: 基础版，不加例子</span></span>
<span class="line"><span>v2: 加入2个Few-shot例子</span></span>
<span class="line"><span>v3: 加入COT，让模型分步思考</span></span>
<span class="line"><span>v4: 格式要求更明确</span></span>
<span class="line"><span></span></span>
<span class="line"><span>对比维度：</span></span>
<span class="line"><span>| 版本 | 平均分数 | Token消耗 | 延迟 |</span></span>
<span class="line"><span>|------|----------|----------|------|</span></span>
<span class="line"><span>| v1 | 2.3分 | 120 | 2s |</span></span>
<span class="line"><span>| v2 | 3.8分 | 250 | 2.5s |</span></span>
<span class="line"><span>| v3 | 4.5分 | 320 | 3s |</span></span>
<span class="line"><span>| v4 | 4.8分 | 350 | 3.2s |</span></span>
<span class="line"><span></span></span>
<span class="line"><span>选择：v4性价比最高，选v4</span></span></code></pre></div><hr><h2 id="第四步-迭代优化循环" tabindex="-1">第四步：迭代优化循环 <a class="header-anchor" href="#第四步-迭代优化循环" aria-label="Permalink to &quot;第四步：迭代优化循环&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>1. 观察问题 → 2. 提出假设 → 3. 修改Prompt → 4. 测试验证 → 5. 评估决策 → 回1</span></span>
<span class="line"><span></span></span>
<span class="line"><span>示例：</span></span>
<span class="line"><span>观察：复杂数学题正确率只有50%</span></span>
<span class="line"><span>假设：加入COT（一步步思考）可以改善</span></span>
<span class="line"><span>修改：在Prompt中加入&quot;请逐步思考&quot;</span></span>
<span class="line"><span>测试：用测试集重新打分</span></span>
<span class="line"><span>决策：COT让正确率提升到85%，正式采用</span></span></code></pre></div><hr><h2 id="实用工具建议" tabindex="-1">实用工具建议 <a class="header-anchor" href="#实用工具建议" aria-label="Permalink to &quot;实用工具建议&quot;">​</a></h2><table tabindex="0"><thead><tr><th>工具</th><th>用途</th></tr></thead><tbody><tr><td>LangSmith</td><td>Prompt管理+测试</td></tr><tr><td>PromptLayer</td><td>版本管理+分析</td></tr><tr><td>Helicone</td><td>监控+成本优化</td></tr><tr><td>自建简单测试脚本</td><td>Python快速实现</td></tr></tbody></table><hr><h2 id="快速评估模板" tabindex="-1">快速评估模板 <a class="header-anchor" href="#快速评估模板" aria-label="Permalink to &quot;快速评估模板&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>简易版本：直接让LLM对比两个回答哪个更好</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Prompt：</span></span>
<span class="line"><span>回答A：[旧版本输出]</span></span>
<span class="line"><span>回答B：[新版本输出]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>哪个回答更好？请说明原因并给出分数（A/B）。</span></span></code></pre></div>`,23)])])}const b=s(l,[["render",t]]);export{u as __pageData,b as default};
