import{_ as a,o as n,c as i,ag as p}from"./chunks/framework.-Wrcbzkw.js";const c=JSON.parse('{"title":"动态 RAG 提示词","description":"","frontmatter":{},"headers":[],"relativePath":"LLM/Prompt Engineering/23_dynamic_rag_动态RAG提示词.md","filePath":"LLM/Prompt Engineering/23_dynamic_rag_动态RAG提示词.md","lastUpdated":1778839709000}'),l={name:"LLM/Prompt Engineering/23_dynamic_rag_动态RAG提示词.md"};function t(e,s,h,k,d,r){return n(),i("div",null,[...s[0]||(s[0]=[p(`<h1 id="动态-rag-提示词" tabindex="-1">动态 RAG 提示词 <a class="header-anchor" href="#动态-rag-提示词" aria-label="Permalink to &quot;动态 RAG 提示词&quot;">​</a></h1><p>结合向量检索自动更换Few-shot例子。</p><hr><h2 id="背景问题" tabindex="-1">背景问题 <a class="header-anchor" href="#背景问题" aria-label="Permalink to &quot;背景问题&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>静态Few-shot的问题：</span></span>
<span class="line"><span>- 例子固定，不能适配所有情况</span></span>
<span class="line"><span>- 新场景下例子可能不合适</span></span>
<span class="line"><span>- 浪费Token（不需要的例子也放进去）</span></span></code></pre></div><hr><h2 id="什么是动态rag" tabindex="-1">什么是动态RAG <a class="header-anchor" href="#什么是动态rag" aria-label="Permalink to &quot;什么是动态RAG&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Retrieval-Augmented Generation：检索增强生成</span></span>
<span class="line"><span></span></span>
<span class="line"><span>流程：</span></span>
<span class="line"><span>1. 用户问题 → 2. 向量检索 → 3. 找出最相似的例子 → 4. 动态插入Prompt → 5. 调用LLM</span></span>
<span class="line"><span></span></span>
<span class="line"><span>好处：</span></span>
<span class="line"><span>- 例子精准适配当前问题</span></span>
<span class="line"><span>- 只放最相关的1-3个例子</span></span>
<span class="line"><span>- 节省Token + 提升效果</span></span></code></pre></div><hr><h2 id="系统架构" tabindex="-1">系统架构 <a class="header-anchor" href="#系统架构" aria-label="Permalink to &quot;系统架构&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌──────────────────┐</span></span>
<span class="line"><span>│  历史问答对库    │</span></span>
<span class="line"><span>│  (1000+例子)     │</span></span>
<span class="line"><span>└────────┬─────────┘</span></span>
<span class="line"><span>         │ 向量化</span></span>
<span class="line"><span>         ▼</span></span>
<span class="line"><span>┌──────────────────┐</span></span>
<span class="line"><span>│  向量数据库      │</span></span>
<span class="line"><span>│  (Chroma/Pinecone)│</span></span>
<span class="line"><span>└────────┬─────────┘</span></span>
<span class="line"><span>         │</span></span>
<span class="line"><span>┌────────▼─────────┐    ┌──────────────────┐</span></span>
<span class="line"><span>│  用户问题       │───▶│  相似度检索      │</span></span>
<span class="line"><span>└──────────────────┘    └────────┬─────────┘</span></span>
<span class="line"><span>                                 │</span></span>
<span class="line"><span>                         ┌───────▼───────┐</span></span>
<span class="line"><span>                         │  取Top3例子   │</span></span>
<span class="line"><span>                         └───────┬───────┘</span></span>
<span class="line"><span>                                 │</span></span>
<span class="line"><span>                         ┌───────▼───────┐</span></span>
<span class="line"><span>                         │  组装Prompt   │</span></span>
<span class="line"><span>                         │  +LLM推理     │</span></span>
<span class="line"><span>                         └───────────────┘</span></span></code></pre></div><hr><h2 id="代码示例-python" tabindex="-1">代码示例（Python） <a class="header-anchor" href="#代码示例-python" aria-label="Permalink to &quot;代码示例（Python）&quot;">​</a></h2><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 1. 准备例子库</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">examples </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        &quot;question&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;如何排序Python列表？&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        &quot;answer&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;使用sorted()或list.sort()&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        &quot;code&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;sorted([3,1,2]) → [1,2,3]&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        &quot;question&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;如何读取CSV？&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        &quot;answer&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;用pandas或csv模块&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        &quot;code&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;pd.read_csv(&#39;file.csv&#39;)&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    },</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    # ... 更多例子</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 2. 向量化（用OpenAI Embeddings）</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> langchain.vectorstores </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Chroma</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> langchain.embeddings </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> OpenAIEmbeddings</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">db </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Chroma.from_documents(examples, OpenAIEmbeddings())</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 3. 动态检索+组装</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">user_question </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;如何在Python中处理JSON数据？&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 检索最相似的3个例子</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">relevant_examples </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> db.similarity_search(user_question, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">k</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">3</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 组装Prompt</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">prompt </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> f</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;&quot;&quot;你是Python编程助手，请参考以下例子回答问题：</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">relevant_examples</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">用户问题：</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">user_question</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">}</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">请提供代码示例。</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;&quot;&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 4. 调用LLM</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">response </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> llm.generate(prompt)</span></span></code></pre></div><hr><h2 id="适用场景" tabindex="-1">适用场景 <a class="header-anchor" href="#适用场景" aria-label="Permalink to &quot;适用场景&quot;">​</a></h2><table tabindex="0"><thead><tr><th>场景</th><th>效果</th></tr></thead><tbody><tr><td>代码助手</td><td>相似代码问题直接给对应例子</td></tr><tr><td>客服问答</td><td>类似历史问题复用最佳回答</td></tr><tr><td>文档问答</td><td>从知识库动态检索相关内容</td></tr><tr><td>教育辅导</td><td>根据难度匹配对应难度的例子</td></tr></tbody></table><hr><h2 id="优势对比" tabindex="-1">优势对比 <a class="header-anchor" href="#优势对比" aria-label="Permalink to &quot;优势对比&quot;">​</a></h2><table tabindex="0"><thead><tr><th>方案</th><th>优点</th><th>缺点</th></tr></thead><tbody><tr><td>静态Few-shot</td><td>简单</td><td>固定、浪费Token</td></tr><tr><td>动态RAG</td><td>精准、省Token</td><td>需要向量库、开发成本</td></tr><tr><td>Zero-shot</td><td>极简</td><td>效果差</td></tr></tbody></table><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span></span></span>
<span class="line"><span>---</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## 进阶技巧</span></span></code></pre></div><ol><li><p>例子质量筛选</p><ul><li>只保留高质量的历史问答</li><li>定期淘汰低质量例子</li></ul></li><li><p>多样性控制</p><ul><li>避免只返回很相似的例子</li><li>可以强制取不同类别的例子</li></ul></li><li><p>冷启动处理</p><ul><li>没有历史数据时，先手动准备种子例子</li><li>系统跑起来后慢慢积累</li></ul></li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span></span></span></code></pre></div>`,23)])])}const E=a(l,[["render",t]]);export{c as __pageData,E as default};
