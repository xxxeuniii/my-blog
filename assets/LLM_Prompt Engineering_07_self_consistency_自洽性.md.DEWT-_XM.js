import{_ as a,o as n,c as p,ag as e}from"./chunks/framework.-Wrcbzkw.js";const u=JSON.parse('{"title":"Self-Consistency (自洽性)","description":"","frontmatter":{},"headers":[],"relativePath":"LLM/Prompt Engineering/07_self_consistency_自洽性.md","filePath":"LLM/Prompt Engineering/07_self_consistency_自洽性.md","lastUpdated":1778838449000}'),l={name:"LLM/Prompt Engineering/07_self_consistency_自洽性.md"};function i(t,s,c,o,r,d){return n(),p("div",null,[...s[0]||(s[0]=[e(`<h1 id="self-consistency-自洽性" tabindex="-1">Self-Consistency (自洽性) <a class="header-anchor" href="#self-consistency-自洽性" aria-label="Permalink to &quot;Self-Consistency (自洽性)&quot;">​</a></h1><p>多路径推理，取最一致的答案。</p><hr><h2 id="示例一-数学计算验证" tabindex="-1">示例一：数学计算验证 <a class="header-anchor" href="#示例一-数学计算验证" aria-label="Permalink to &quot;示例一：数学计算验证&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>问题：一家商店原价200元的商品，打8折后再降价15%，最终价格是多少？</span></span>
<span class="line"><span></span></span>
<span class="line"><span>请用两种方法计算：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>方法1：先打折后降价</span></span>
<span class="line"><span>1. 原价200元</span></span>
<span class="line"><span>2. 打8折：200 × 0.8 = 160元</span></span>
<span class="line"><span>3. 再降15%：160 × (1 - 0.15) = 160 × 0.85 = 136元</span></span>
<span class="line"><span></span></span>
<span class="line"><span>方法2：计算整体折扣</span></span>
<span class="line"><span>1. 打8折 = 80%</span></span>
<span class="line"><span>2. 再降15% = 85%</span></span>
<span class="line"><span>3. 整体折扣 = 80% × 85% = 68%</span></span>
<span class="line"><span>4. 最终价格 = 200 × 0.68 = 136元</span></span>
<span class="line"><span></span></span>
<span class="line"><span>两种方法结果一致：136元</span></span>
<span class="line"><span>结论：答案可信，最终价格为136元</span></span></code></pre></div><hr><h2 id="示例二-事实核查" tabindex="-1">示例二：事实核查 <a class="header-anchor" href="#示例二-事实核查" aria-label="Permalink to &quot;示例二：事实核查&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>问题：珠穆朗玛峰的高度是？</span></span>
<span class="line"><span></span></span>
<span class="line"><span>请从多个角度验证：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>来源1：教科书 → 8848米</span></span>
<span class="line"><span>来源2：维基百科 → 8848.86米（2020年最新测量）</span></span>
<span class="line"><span>来源3：旅游网站 → 8848米</span></span>
<span class="line"><span></span></span>
<span class="line"><span>分析：</span></span>
<span class="line"><span>- 不同来源数据略有差异</span></span>
<span class="line"><span>- 原因是测量技术和标准不同</span></span>
<span class="line"><span>- 岩石高度 vs 雪顶高度</span></span>
<span class="line"><span></span></span>
<span class="line"><span>结论：珠穆朗玛峰高度约为8848米（岩石高度），最新测量为8848.86米（含雪顶）</span></span></code></pre></div><hr><h2 id="示例三-代码逻辑验证" tabindex="-1">示例三：代码逻辑验证 <a class="header-anchor" href="#示例三-代码逻辑验证" aria-label="Permalink to &quot;示例三：代码逻辑验证&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>问题：这段代码的输出是什么？</span></span>
<span class="line"><span></span></span>
<span class="line"><span>代码：</span></span>
<span class="line"><span>result = 0</span></span>
<span class="line"><span>for i in range(1, 5):</span></span>
<span class="line"><span>    result += i</span></span>
<span class="line"><span>print(result)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>验证1 - 累加计算：</span></span>
<span class="line"><span>1 + 2 + 3 + 4 = 10</span></span>
<span class="line"><span></span></span>
<span class="line"><span>验证2 - 数学公式：</span></span>
<span class="line"><span>等差数列求和：(1 + 4) × 4 / 2 = 10</span></span>
<span class="line"><span></span></span>
<span class="line"><span>验证3 - 代码执行：</span></span>
<span class="line"><span>print(0 + 1 + 2 + 3 + 4) = 10</span></span>
<span class="line"><span></span></span>
<span class="line"><span>结论：输出结果为 10，三种方式一致</span></span></code></pre></div><hr><h2 id="适用场景" tabindex="-1">适用场景 <a class="header-anchor" href="#适用场景" aria-label="Permalink to &quot;适用场景&quot;">​</a></h2><table tabindex="0"><thead><tr><th>场景</th><th>效果</th></tr></thead><tbody><tr><td>重要计算</td><td>金融、医学、 工程计算</td></tr><tr><td>事实核查</td><td>避免单一来源错误</td></tr><tr><td>代码调试</td><td>多角度验证逻辑</td></tr><tr><td>关键决策</td><td>降低错误风险</td></tr></tbody></table><h2 id="核心要点" tabindex="-1">核心要点 <a class="header-anchor" href="#核心要点" aria-label="Permalink to &quot;核心要点&quot;">​</a></h2><ul><li>同一问题用不同方法/路径解决</li><li>比较结果是否一致</li><li>一致 → 高可信度</li><li>不一致 → 需要进一步分析</li></ul><h2 id="实际应用建议" tabindex="-1">实际应用建议 <a class="header-anchor" href="#实际应用建议" aria-label="Permalink to &quot;实际应用建议&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>对于重要任务，可以这样要求：</span></span>
<span class="line"><span>&quot;请用两种不同的方法计算这个结果，</span></span>
<span class="line"><span>如果两种方法结果一致，说明答案可信；</span></span>
<span class="line"><span>如果不一致，请分析原因并给出最可能的答案&quot;</span></span></code></pre></div>`,18)])])}const b=a(l,[["render",i]]);export{u as __pageData,b as default};
