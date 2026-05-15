import{_ as s,o as n,c as p,ag as e}from"./chunks/framework.-Wrcbzkw.js";const u=JSON.parse('{"title":"COT (Chain of Thought) 思维链","description":"","frontmatter":{},"headers":[],"relativePath":"LLM/Prompt Engineering/02_cot_思维链.md","filePath":"LLM/Prompt Engineering/02_cot_思维链.md","lastUpdated":1778838103000}'),l={name:"LLM/Prompt Engineering/02_cot_思维链.md"};function t(i,a,c,o,d,h){return n(),p("div",null,[...a[0]||(a[0]=[e(`<h1 id="cot-chain-of-thought-思维链" tabindex="-1">COT (Chain of Thought) 思维链 <a class="header-anchor" href="#cot-chain-of-thought-思维链" aria-label="Permalink to &quot;COT (Chain of Thought) 思维链&quot;">​</a></h1><p>让模型一步步思考，适合复杂推理问题。</p><hr><h2 id="示例一-数学应用题" tabindex="-1">示例一：数学应用题 <a class="header-anchor" href="#示例一-数学应用题" aria-label="Permalink to &quot;示例一：数学应用题&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>问题：小明有10个苹果，送给小红3个，又买了5个，现在有几个？</span></span>
<span class="line"><span></span></span>
<span class="line"><span>让我们一步步思考：</span></span>
<span class="line"><span>1. 小明开始有10个苹果</span></span>
<span class="line"><span>2. 送给小红3个：10 - 3 = 7个</span></span>
<span class="line"><span>3. 又买了5个：7 + 5 = 12个</span></span>
<span class="line"><span>答案是：12个</span></span></code></pre></div><hr><h2 id="示例二-逻辑推理" tabindex="-1">示例二：逻辑推理 <a class="header-anchor" href="#示例二-逻辑推理" aria-label="Permalink to &quot;示例二：逻辑推理&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>问题：所有人都会死，苏格拉底是人，所以？</span></span>
<span class="line"><span></span></span>
<span class="line"><span>让我们一步步推理：</span></span>
<span class="line"><span>1. 前提1：所有人都会死（大前提）</span></span>
<span class="line"><span>2. 前提2：苏格拉底是人（小前提）</span></span>
<span class="line"><span>3. 根据三段论：苏格拉底也会死</span></span>
<span class="line"><span>答案是：苏格拉底也会死</span></span></code></pre></div><hr><h2 id="示例三-代码调试" tabindex="-1">示例三：代码调试 <a class="header-anchor" href="#示例三-代码调试" aria-label="Permalink to &quot;示例三：代码调试&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>问题：以下Python代码为什么会报错？</span></span>
<span class="line"><span></span></span>
<span class="line"><span>代码：</span></span>
<span class="line"><span>numbers = [1, 2, 3, 4, 5]</span></span>
<span class="line"><span>print(numbers[10])</span></span>
<span class="line"><span></span></span>
<span class="line"><span>让我们分析：</span></span>
<span class="line"><span>1. 列表 numbers 有5个元素，索引为 0-4</span></span>
<span class="line"><span>2. 访问 numbers[10] 是在访问第11个元素</span></span>
<span class="line"><span>3. 列表中不存在这个索引</span></span>
<span class="line"><span>4. Python会抛出 IndexError</span></span>
<span class="line"><span>答案：因为索引越界，列表最大索引是4，但访问了索引10</span></span></code></pre></div><hr><h2 id="示例四-商业决策分析" tabindex="-1">示例四：商业决策分析 <a class="header-anchor" href="#示例四-商业决策分析" aria-label="Permalink to &quot;示例四：商业决策分析&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>问题：一家奶茶店月收入下降20%，分析原因</span></span>
<span class="line"><span></span></span>
<span class="line"><span>让我们一步步分析：</span></span>
<span class="line"><span>1. 收入下降的可能因素：</span></span>
<span class="line"><span>   - 客流量减少</span></span>
<span class="line"><span>   - 客单价降低</span></span>
<span class="line"><span>   - 竞争加剧</span></span>
<span class="line"><span>   - 产品问题</span></span>
<span class="line"><span>2. 逐一排查：</span></span>
<span class="line"><span>   - 上月是否有新开竞争对手？→ 是，街对面新开一家</span></span>
<span class="line"><span>   - 本月是否有负面评价？→ 是，有几条关于卫生的差评</span></span>
<span class="line"><span>   - 价格是否有变化？→ 无</span></span>
<span class="line"><span>3. 结论：主要原因是竞争加剧和个别差评影响口碑</span></span>
<span class="line"><span>建议：加强卫生管理，可考虑推出优惠活动吸引顾客</span></span></code></pre></div><hr><h2 id="适用场景" tabindex="-1">适用场景 <a class="header-anchor" href="#适用场景" aria-label="Permalink to &quot;适用场景&quot;">​</a></h2><table tabindex="0"><thead><tr><th>场景</th><th>效果</th></tr></thead><tbody><tr><td>数学计算</td><td>减少计算错误</td></tr><tr><td>逻辑推理</td><td>理清思路</td></tr><tr><td>代码调试</td><td>定位根因</td></tr><tr><td>商业分析</td><td>全面考虑因素</td></tr><tr><td>决策判断</td><td>权衡利弊</td></tr></tbody></table><h2 id="核心要点" tabindex="-1">核心要点 <a class="header-anchor" href="#核心要点" aria-label="Permalink to &quot;核心要点&quot;">​</a></h2><ul><li>要求模型&quot;一步步思考&quot;</li><li>在 prompt 中加入&quot;让我们分析&quot;或&quot;think step by step&quot;</li><li>鼓励模型展示推理过程</li><li>复杂问题可要求列出&quot;可能原因 → 逐一验证 → 结论&quot;</li></ul><h2 id="进阶技巧" tabindex="-1">进阶技巧 <a class="header-anchor" href="#进阶技巧" aria-label="Permalink to &quot;进阶技巧&quot;">​</a></h2><h3 id="_1-指定思考步骤" tabindex="-1">1. 指定思考步骤 <a class="header-anchor" href="#_1-指定思考步骤" aria-label="Permalink to &quot;1. 指定思考步骤&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>请分析这个问题，每一步都要给出理由：</span></span>
<span class="line"><span>&quot;是否应该购买电动汽车？&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>请按以下步骤分析：</span></span>
<span class="line"><span>1. 列出购买电动汽车的优点</span></span>
<span class="line"><span>2. 列出购买电动汽车的缺点</span></span>
<span class="line"><span>3. 对比分析</span></span>
<span class="line"><span>4. 根据不同人群给出建议</span></span></code></pre></div><h3 id="_2-自我验证" tabindex="-1">2. 自我验证 <a class="header-anchor" href="#_2-自我验证" aria-label="Permalink to &quot;2. 自我验证&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>问题：2673 × 482 = ?</span></span>
<span class="line"><span></span></span>
<span class="line"><span>请计算并验证：</span></span>
<span class="line"><span>1. 第一次计算</span></span>
<span class="line"><span>2. 用除法验证结果</span></span>
<span class="line"><span>3. 如果不一致，重新计算</span></span></code></pre></div><h3 id="_3-反向思考" tabindex="-1">3. 反向思考 <a class="header-anchor" href="#_3-反向思考" aria-label="Permalink to &quot;3. 反向思考&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>问题：为什么这个创业项目会失败？</span></span>
<span class="line"><span></span></span>
<span class="line"><span>让我们从多个角度分析：</span></span>
<span class="line"><span>1. 市场角度：需求是否真实存在？</span></span>
<span class="line"><span>2. 产品角度：是否真正解决了问题？</span></span>
<span class="line"><span>3. 团队角度：能力是否匹配？</span></span>
<span class="line"><span>4. 资金角度：现金流是否能支撑？</span></span>
<span class="line"><span>5. 竞争角度：护城河在哪里？</span></span></code></pre></div>`,26)])])}const b=s(l,[["render",t]]);export{u as __pageData,b as default};
