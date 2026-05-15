import{_ as s,o as n,c as p,ag as e}from"./chunks/framework.-Wrcbzkw.js";const u=JSON.parse('{"title":"上下文窗口管理","description":"","frontmatter":{},"headers":[],"relativePath":"LLM/Prompt Engineering/15_context_window_上下文窗口管理.md","filePath":"LLM/Prompt Engineering/15_context_window_上下文窗口管理.md","lastUpdated":1778838236000}'),t={name:"LLM/Prompt Engineering/15_context_window_上下文窗口管理.md"};function l(i,a,o,c,d,r){return n(),p("div",null,[...a[0]||(a[0]=[e(`<h1 id="上下文窗口管理" tabindex="-1">上下文窗口管理 <a class="header-anchor" href="#上下文窗口管理" aria-label="Permalink to &quot;上下文窗口管理&quot;">​</a></h1><p>处理超长文本、避免Token限制问题。</p><hr><h2 id="问题背景" tabindex="-1">问题背景 <a class="header-anchor" href="#问题背景" aria-label="Permalink to &quot;问题背景&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>大模型有上下文窗口限制：</span></span>
<span class="line"><span>- GPT-4: 128K tokens</span></span>
<span class="line"><span>- GPT-3.5: 16K tokens</span></span>
<span class="line"><span>- Claude-3: 200K tokens</span></span>
<span class="line"><span></span></span>
<span class="line"><span>超过限制会导致：</span></span>
<span class="line"><span>- 无法处理</span></span>
<span class="line"><span>- 回答截断</span></span>
<span class="line"><span>- 成本暴增</span></span></code></pre></div><hr><h2 id="策略一-摘要压缩" tabindex="-1">策略一：摘要压缩 <a class="header-anchor" href="#策略一-摘要压缩" aria-label="Permalink to &quot;策略一：摘要压缩&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>适用于：长文档分析</span></span>
<span class="line"><span></span></span>
<span class="line"><span>原始输入（10000字）：</span></span>
<span class="line"><span>请分析这份长报告的核心观点。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>优化后：</span></span>
<span class="line"><span>请分析以下报告的核心观点（已摘要至2000字）：</span></span>
<span class="line"><span>[摘要内容]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>如果需要更详细的某部分，再单独请求。</span></span></code></pre></div><hr><h2 id="策略二-分段处理" tabindex="-1">策略二：分段处理 <a class="header-anchor" href="#策略二-分段处理" aria-label="Permalink to &quot;策略二：分段处理&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>适用于：长篇文章、多文件</span></span>
<span class="line"><span></span></span>
<span class="line"><span>第一步：分段输入</span></span>
<span class="line"><span>&quot;这是文章的第一部分（前5000字），请总结要点&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>第二步：关键信息提取</span></span>
<span class="line"><span>&quot;基于以上总结，提取关键数据和结论&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>第三步：综合分析</span></span>
<span class="line"><span>&quot;结合第一部分，总结全文核心观点&quot;</span></span></code></pre></div><hr><h2 id="策略三-渐进式qa" tabindex="-1">策略三：渐进式QA <a class="header-anchor" href="#策略三-渐进式qa" aria-label="Permalink to &quot;策略三：渐进式QA&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>适用于：长代码库分析</span></span>
<span class="line"><span></span></span>
<span class="line"><span>第一步：</span></span>
<span class="line"><span>&quot;这个文件（1000行）的主要功能是什么？&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>第二步：</span></span>
<span class="line"><span>&quot;基于你的理解，识别主要的类和函数&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>第三步：</span></span>
<span class="line"><span>&quot;详细分析 calculate() 函数的逻辑&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>第四步：</span></span>
<span class="line"><span>&quot;这段代码有什么潜在的安全问题？&quot;</span></span></code></pre></div><hr><h2 id="策略四-索引-召回" tabindex="-1">策略四：索引+召回 <a class="header-anchor" href="#策略四-索引-召回" aria-label="Permalink to &quot;策略四：索引+召回&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>适用于：大量文档处理</span></span>
<span class="line"><span></span></span>
<span class="line"><span>第一步 - 建立索引：</span></span>
<span class="line"><span>&quot;为以下10篇文档创建简短摘要索引：</span></span>
<span class="line"><span>doc1: [摘要]</span></span>
<span class="line"><span>doc2: [摘要]</span></span>
<span class="line"><span>...&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>第二步 - 定向查询：</span></span>
<span class="line"><span>&quot;关于&#39;性能优化&#39;，查看doc3和doc7的详细内容和代码示例&quot;</span></span></code></pre></div><hr><h2 id="实用技巧" tabindex="-1">实用技巧 <a class="header-anchor" href="#实用技巧" aria-label="Permalink to &quot;实用技巧&quot;">​</a></h2><table tabindex="0"><thead><tr><th>技巧</th><th>说明</th></tr></thead><tbody><tr><td>估算Token</td><td>中文约2字符=1Token，英文约4字符=1Token</td></tr><tr><td>预留空间</td><td>留20%buffer给回复</td></tr><tr><td>重要信息放前面</td><td>开头的信息权重更高</td></tr><tr><td>重要信息放末尾</td><td>结尾的信息也容易被记住</td></tr></tbody></table><h2 id="token估算" tabindex="-1">Token估算 <a class="header-anchor" href="#token估算" aria-label="Permalink to &quot;Token估算&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>1000字中文 ≈ 500-600 tokens</span></span>
<span class="line"><span>1000字英文 ≈ 250-300 tokens</span></span>
<span class="line"><span></span></span>
<span class="line"><span>代码通常比自然语言消耗更多token</span></span></code></pre></div>`,22)])])}const b=s(t,[["render",l]]);export{u as __pageData,b as default};
