import{_ as s,o as n,c as p,ag as t}from"./chunks/framework.-Wrcbzkw.js";const r=JSON.parse('{"title":"Few-shot Prompting（少样本提示）","description":"","frontmatter":{},"headers":[],"relativePath":"LLM/Prompt Engineering/01_fewshot_少样本提示.md","filePath":"LLM/Prompt Engineering/01_fewshot_少样本提示.md","lastUpdated":1778838103000}'),e={name:"LLM/Prompt Engineering/01_fewshot_少样本提示.md"};function l(o,a,i,c,u,d){return n(),p("div",null,[...a[0]||(a[0]=[t(`<h1 id="few-shot-prompting-少样本提示" tabindex="-1">Few-shot Prompting（少样本提示） <a class="header-anchor" href="#few-shot-prompting-少样本提示" aria-label="Permalink to &quot;Few-shot Prompting（少样本提示）&quot;">​</a></h1><p>给模型几个例子，让它学习模式。</p><hr><h2 id="示例一-情感分类" tabindex="-1">示例一：情感分类 <a class="header-anchor" href="#示例一-情感分类" aria-label="Permalink to &quot;示例一：情感分类&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>请判断以下评论的情绪是正面、负面还是中性：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>例子1: &quot;这家餐厅的披萨太好吃了！&quot; → 正面</span></span>
<span class="line"><span>例子2: &quot;等了2小时才上菜，差评。&quot; → 负面</span></span>
<span class="line"><span>例子3: &quot;环境不错，但价格偏贵。&quot; → 中性</span></span>
<span class="line"><span></span></span>
<span class="line"><span>请判断：&quot;耳机音质一般，没有宣传的那么好&quot;</span></span></code></pre></div><hr><h2 id="示例二-文本纠错" tabindex="-1">示例二：文本纠错 <a class="header-anchor" href="#示例二-文本纠错" aria-label="Permalink to &quot;示例二：文本纠错&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>请修正以下句子中的语法错误：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>例子1: &quot;我昨天去了商店，买了一个苹果和三个面包。&quot; → &quot;我昨天去了商店，买了一个苹果和三块面包。&quot;</span></span>
<span class="line"><span>例子2: &quot;他不应该这么着急，应该慢慢来。&quot; → &quot;他不应该这么着急，应该慢慢来。&quot;（无需修改）</span></span>
<span class="line"><span></span></span>
<span class="line"><span>请修正：&quot;小明和小红是一对好朋友，他们天天一起上学和玩耍&quot;</span></span></code></pre></div><hr><h2 id="示例三-风格转换" tabindex="-1">示例三：风格转换 <a class="header-anchor" href="#示例三-风格转换" aria-label="Permalink to &quot;示例三：风格转换&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>将以下句子转换为正式商务邮件风格：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>例子1: &quot;嗨，这个方案你看下，有问题跟我说&quot; → &quot;尊敬的[姓名]，您好，现将方案发送给您，请查阅。如有任何问题，请随时与我联系。&quot;</span></span>
<span class="line"><span>例子2: &quot;赶紧把报告交了，领导催呢！&quot; → &quot;请尽快提交报告，领导已在催促。感谢您的配合。&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>请转换：&quot;兄弟，那个合同你签了没？赶紧弄完发我&quot;</span></span></code></pre></div><hr><h2 id="适用场景" tabindex="-1">适用场景 <a class="header-anchor" href="#适用场景" aria-label="Permalink to &quot;适用场景&quot;">​</a></h2><ul><li>任务明确但答案多样</li><li>需要模型理解特定格式或风格</li><li>罕见任务需要示例引导</li></ul><h2 id="核心要点" tabindex="-1">核心要点 <a class="header-anchor" href="#核心要点" aria-label="Permalink to &quot;核心要点&quot;">​</a></h2><table tabindex="0"><thead><tr><th>要点</th><th>说明</th></tr></thead><tbody><tr><td>数量</td><td>2-5 个代表性例子</td></tr><tr><td>多样性</td><td>例子要覆盖常见类型</td></tr><tr><td>一致性</td><td>格式和风格保持统一</td></tr><tr><td>顺序</td><td>简单 → 复杂 排列</td></tr></tbody></table><h2 id="进阶技巧" tabindex="-1">进阶技巧 <a class="header-anchor" href="#进阶技巧" aria-label="Permalink to &quot;进阶技巧&quot;">​</a></h2><h3 id="_1-零样本-少样本结合" tabindex="-1">1. 零样本 + 少样本结合 <a class="header-anchor" href="#_1-零样本-少样本结合" aria-label="Permalink to &quot;1. 零样本 + 少样本结合&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>请判断以下评论的情感：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&quot;这家店的服务态度太差了，等了半小时没人理&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>情感：负面</span></span>
<span class="line"><span></span></span>
<span class="line"><span>现在请判断：</span></span>
<span class="line"><span>&quot;终于收到了，质量还不错，就是发货有点慢&quot;</span></span></code></pre></div><h3 id="_2-正面、负面、中性-全覆盖" tabindex="-1">2. 正面、负面、中性 全覆盖 <a class="header-anchor" href="#_2-正面、负面、中性-全覆盖" aria-label="Permalink to &quot;2. 正面、负面、中性 全覆盖&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>请判断新闻标题的语气是正面、负面还是中性：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>正面：&quot;我国科技创新取得重大突破&quot;</span></span>
<span class="line"><span>负面：&quot;某地发生严重交通事故，致多人伤亡&quot;</span></span>
<span class="line"><span>中性：&quot;今日股市收盘点位&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>请判断：&quot;央行宣布降准0.5个百分点&quot;</span></span></code></pre></div><h3 id="_3-复杂输出格式示例" tabindex="-1">3. 复杂输出格式示例 <a class="header-anchor" href="#_3-复杂输出格式示例" aria-label="Permalink to &quot;3. 复杂输出格式示例&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>请将以下产品描述转换为指定格式：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>输入：&quot;iPhone 15 Pro Max，256GB，深空灰色，支持5G，售价9999元&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>输出格式：</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>  &quot;产品名&quot;: &quot;xxx&quot;,</span></span>
<span class="line"><span>  &quot;配置&quot;: [&quot;xxx&quot;, &quot;xxx&quot;],</span></span>
<span class="line"><span>  &quot;颜色&quot;: &quot;xxx&quot;,</span></span>
<span class="line"><span>  &quot;网络&quot;: &quot;xxx&quot;,</span></span>
<span class="line"><span>  &quot;价格&quot;: xxx</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>输入：&quot;华为Mate60，512GB，黑色，支持卫星通话，售价6999元&quot;</span></span></code></pre></div>`,23)])])}const q=s(e,[["render",l]]);export{r as __pageData,q as default};
