import{_ as a,o as n,c as p,ag as t}from"./chunks/framework.-Wrcbzkw.js";const d=JSON.parse('{"title":"结构化输出（JSON格式）","description":"","frontmatter":{},"headers":[],"relativePath":"LLM/Prompt Engineering/03_json_结构化输出.md","filePath":"LLM/Prompt Engineering/03_json_结构化输出.md","lastUpdated":1778838640000}'),e={name:"LLM/Prompt Engineering/03_json_结构化输出.md"};function l(o,s,i,u,c,q){return n(),p("div",null,[...s[0]||(s[0]=[t(`<h1 id="结构化输出-json格式" tabindex="-1">结构化输出（JSON格式） <a class="header-anchor" href="#结构化输出-json格式" aria-label="Permalink to &quot;结构化输出（JSON格式）&quot;">​</a></h1><p>要求模型返回 JSON，便于程序处理。</p><hr><h2 id="示例一-简历信息提取" tabindex="-1">示例一：简历信息提取 <a class="header-anchor" href="#示例一-简历信息提取" aria-label="Permalink to &quot;示例一：简历信息提取&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>请从以下文本中提取信息，返回JSON格式：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>文本：</span></span>
<span class="line"><span>&quot;张三，男，28岁，软件工程师，本科毕业于清华大学计算机系，工作5年，曾在阿里巴巴和字节跳动任职，目前在创业公司担任技术总监，年薪100万&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>JSON格式：</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>  &quot;name&quot;: &quot;姓名&quot;,</span></span>
<span class="line"><span>  &quot;gender&quot;: &quot;性别&quot;,</span></span>
<span class="line"><span>  &quot;age&quot;: 年龄（数字）,</span></span>
<span class="line"><span>  &quot;education&quot;: {</span></span>
<span class="line"><span>    &quot;degree&quot;: &quot;学位&quot;,</span></span>
<span class="line"><span>    &quot;school&quot;: &quot;毕业院校&quot;,</span></span>
<span class="line"><span>    &quot;major&quot;: &quot;专业&quot;</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>  &quot;work_experience&quot;: [</span></span>
<span class="line"><span>    {&quot;company&quot;: &quot;公司名&quot;, &quot;position&quot;: &quot;职位&quot;, &quot;years&quot;: 工作年限}</span></span>
<span class="line"><span>  ],</span></span>
<span class="line"><span>  &quot;current&quot;: {</span></span>
<span class="line"><span>    &quot;company&quot;: &quot;当前公司&quot;,</span></span>
<span class="line"><span>    &quot;position&quot;: &quot;当前职位&quot;,</span></span>
<span class="line"><span>    &quot;annual_salary&quot;: 年薪（数字，单位万）</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div><hr><h2 id="示例二-订单解析" tabindex="-1">示例二：订单解析 <a class="header-anchor" href="#示例二-订单解析" aria-label="Permalink to &quot;示例二：订单解析&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>请将订单文本解析为JSON：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>订单：&quot;订单号A12345，客户李四，购买了2件T恤（白色，L码）和1条牛仔裤（蓝色，32码），总金额599元，使用优惠券减50元&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>JSON格式：</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>  &quot;order_id&quot;: &quot;订单号&quot;,</span></span>
<span class="line"><span>  &quot;customer&quot;: &quot;客户名&quot;,</span></span>
<span class="line"><span>  &quot;items&quot;: [</span></span>
<span class="line"><span>    {&quot;name&quot;: &quot;商品&quot;, &quot;quantity&quot;: 数量, &quot;color&quot;: &quot;颜色&quot;, &quot;size&quot;: &quot;尺码&quot;}</span></span>
<span class="line"><span>  ],</span></span>
<span class="line"><span>  &quot;original_total&quot;: 原价（数字）,</span></span>
<span class="line"><span>  &quot;discount&quot;: 优惠金额（数字）,</span></span>
<span class="line"><span>  &quot;final_total&quot;: 实付金额（数字）</span></span>
<span class="line"><span>}</span></span></code></pre></div><hr><h2 id="示例三-代码审查结果" tabindex="-1">示例三：代码审查结果 <a class="header-anchor" href="#示例三-代码审查结果" aria-label="Permalink to &quot;示例三：代码审查结果&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>请审查以下Python代码，返回JSON格式的审查报告：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>代码：</span></span>
<span class="line"><span>def calculate_average(scores):</span></span>
<span class="line"><span>    total = sum(scores)</span></span>
<span class="line"><span>    return total / len(scores)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>def get_grade(score):</span></span>
<span class="line"><span>    if score &gt;= 90:</span></span>
<span class="line"><span>        return &#39;A&#39;</span></span>
<span class="line"><span>    elif score &gt;= 80:</span></span>
<span class="line"><span>        return &#39;B&#39;</span></span>
<span class="line"><span>    elif score &gt;= 70:</span></span>
<span class="line"><span>        return &#39;C&#39;</span></span>
<span class="line"><span>    elif score &gt;= 60:</span></span>
<span class="line"><span>        return &#39;D&#39;</span></span>
<span class="line"><span>    else:</span></span>
<span class="line"><span>        return &#39;F&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>JSON格式：</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>  &quot;file&quot;: &quot;文件名&quot;,</span></span>
<span class="line"><span>  &quot;issues&quot;: [</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>      &quot;line&quot;: 行号（数字）,</span></span>
<span class="line"><span>      &quot;severity&quot;: &quot;严重程度&quot;,</span></span>
<span class="line"><span>      &quot;category&quot;: &quot;问题类别&quot;,</span></span>
<span class="line"><span>      &quot;description&quot;: &quot;问题描述&quot;,</span></span>
<span class="line"><span>      &quot;suggestion&quot;: &quot;修改建议&quot;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  ],</span></span>
<span class="line"><span>  &quot;summary&quot;: {</span></span>
<span class="line"><span>    &quot;total_issues&quot;: 问题总数（数字）,</span></span>
<span class="line"><span>    &quot;critical&quot;: 严重问题数（数字）,</span></span>
<span class="line"><span>    &quot;warning&quot;: 警告数（数字）,</span></span>
<span class="line"><span>    &quot;info&quot;: 提示数（数字）</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div><hr><h2 id="适用场景" tabindex="-1">适用场景 <a class="header-anchor" href="#适用场景" aria-label="Permalink to &quot;适用场景&quot;">​</a></h2><table tabindex="0"><thead><tr><th>场景</th><th>说明</th></tr></thead><tbody><tr><td>数据提取</td><td>从非结构化文本提取结构化数据</td></tr><tr><td>API响应</td><td>为程序提供可解析的输出</td></tr><tr><td>数据转换</td><td>将一种格式转为另一种</td></tr><tr><td>分析报告</td><td>便于后续处理和分析</td></tr></tbody></table><h2 id="核心要点" tabindex="-1">核心要点 <a class="header-anchor" href="#核心要点" aria-label="Permalink to &quot;核心要点&quot;">​</a></h2><table tabindex="0"><thead><tr><th>要点</th><th>说明</th></tr></thead><tbody><tr><td>字段命名</td><td>使用明确的英文字段名</td></tr><tr><td>类型声明</td><td>注明数据类型（字符串/数字/数组/对象）</td></tr><tr><td>嵌套结构</td><td>复杂结构要分层说明</td></tr><tr><td>示例输出</td><td>提供一个完整的JSON示例</td></tr></tbody></table><h2 id="进阶技巧" tabindex="-1">进阶技巧 <a class="header-anchor" href="#进阶技巧" aria-label="Permalink to &quot;进阶技巧&quot;">​</a></h2><h3 id="_1-使用-json-schema" tabindex="-1">1. 使用 JSON Schema <a class="header-anchor" href="#_1-使用-json-schema" aria-label="Permalink to &quot;1. 使用 JSON Schema&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>请返回符合以下Schema的JSON：</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>  &quot;type&quot;: &quot;object&quot;,</span></span>
<span class="line"><span>  &quot;properties&quot;: {</span></span>
<span class="line"><span>    &quot;name&quot;: {&quot;type&quot;: &quot;string&quot;},</span></span>
<span class="line"><span>    &quot;age&quot;: {&quot;type&quot;: &quot;integer&quot;, &quot;minimum&quot;: 0},</span></span>
<span class="line"><span>    &quot;email&quot;: {&quot;type&quot;: &quot;string&quot;, &quot;format&quot;: &quot;email&quot;}</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>  &quot;required&quot;: [&quot;name&quot;, &quot;age&quot;]</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="_2-带注释的json-schema" tabindex="-1">2. 带注释的JSON Schema <a class="header-anchor" href="#_2-带注释的json-schema" aria-label="Permalink to &quot;2. 带注释的JSON Schema&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>返回格式要求：</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>  &quot;name&quot;: &quot;string - 用户姓名&quot;,</span></span>
<span class="line"><span>  &quot;age&quot;: &quot;number - 用户年龄（0-150）&quot;,</span></span>
<span class="line"><span>  &quot;skills&quot;: [&quot;string array - 技能列表&quot;]</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="_3-typescript-类型定义风格" tabindex="-1">3. TypeScript 类型定义风格 <a class="header-anchor" href="#_3-typescript-类型定义风格" aria-label="Permalink to &quot;3. TypeScript 类型定义风格&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>用TypeScript类型返回：</span></span>
<span class="line"><span>interface User {</span></span>
<span class="line"><span>  name: string;</span></span>
<span class="line"><span>  age: number;</span></span>
<span class="line"><span>  email?: string;</span></span>
<span class="line"><span>  skills: string[];</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="_4-处理复杂嵌套" tabindex="-1">4. 处理复杂嵌套 <a class="header-anchor" href="#_4-处理复杂嵌套" aria-label="Permalink to &quot;4. 处理复杂嵌套&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>对于数组对象，明确每个元素的结构：</span></span>
<span class="line"><span>items 数组中每个元素包含：</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>  &quot;product_id&quot;: &quot;商品ID&quot;,</span></span>
<span class="line"><span>  &quot;name&quot;: &quot;商品名&quot;,</span></span>
<span class="line"><span>  &quot;price&quot;: 价格（数字）,</span></span>
<span class="line"><span>  &quot;tags&quot;: [&quot;标签列表&quot;]</span></span>
<span class="line"><span>}</span></span></code></pre></div>`,25)])])}const h=a(e,[["render",l]]);export{d as __pageData,h as default};
