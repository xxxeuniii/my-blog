import{_ as n,o as a,c as p,ag as e}from"./chunks/framework.-Wrcbzkw.js";const u=JSON.parse('{"title":"组件封装","description":"","frontmatter":{},"headers":[],"relativePath":"project/组件封装.md","filePath":"project/组件封装.md","lastUpdated":1777676303000}'),i={name:"project/组件封装.md"};function l(t,s,c,r,d,o){return a(),p("div",null,[...s[0]||(s[0]=[e(`<h1 id="组件封装" tabindex="-1">组件封装 <a class="header-anchor" href="#组件封装" aria-label="Permalink to &quot;组件封装&quot;">​</a></h1><p>项目概述：技术栈-vue+electron+elementui，自研ide开发工具，可开发移动端以及pc端的小程序</p><p>难度：⭐⭐⭐⭐</p><p>繁琐程度：⭐⭐</p><p>相关知识点：</p><ul><li>封装input组件（防止重复提交及接口调用等待，输入安全-防攻击）</li><li>开发高阶插件/组件库的时候使用的通信方法【provide】【inject】</li><li>防抖和节流</li></ul><h2 id="_20230926" tabindex="-1">20230926 <a class="header-anchor" href="#_20230926" aria-label="Permalink to &quot;20230926&quot;">​</a></h2><h3 id="当浏览器的历史记录状态发生变化时-如前进、后退按钮被点击" tabindex="-1">当浏览器的历史记录状态发生变化时（如前进、后退按钮被点击） <a class="header-anchor" href="#当浏览器的历史记录状态发生变化时-如前进、后退按钮被点击" aria-label="Permalink to &quot;当浏览器的历史记录状态发生变化时（如前进、后退按钮被点击）&quot;">​</a></h3><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> mounted() {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        var _this = this;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        window.addEventListener(&quot;popstate&quot;, function () {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            try {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                _this.formatValue = &quot;&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            } catch (e) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        })</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span></code></pre></div><h3 id="常用的注释有哪些" tabindex="-1">常用的注释有哪些 <a class="header-anchor" href="#常用的注释有哪些" aria-label="Permalink to &quot;常用的注释有哪些&quot;">​</a></h3><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">@param：用于描述函数或方法的参数，包括参数的名称、类型、描述等。</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">@returns：用于描述函数或方法的返回值类型和含义。</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">@throws：用于描述函数或方法可能抛出的异常类型和描述。</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">@example：用于提供函数或方法的使用示例。</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">@description 或 @desc：用于提供函数或方法的详细描述。</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">@deprecated：用于标记已废弃的函数或方法。</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">@inheritdoc：用于继承父类或实现接口的函数或方法，继承父类或接口的注释。</span></span></code></pre></div><p><code>@param</code></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span></span></span>
<span class="line"><span>/**</span></span>
<span class="line"><span> * 计算两个数字的和</span></span>
<span class="line"><span> * @param {number} num1 - 第一个数字</span></span>
<span class="line"><span> * @param {number} num2 - 第二个数字</span></span>
<span class="line"><span> * @returns {number} - 返回两个数字的和</span></span>
<span class="line"><span> */</span></span>
<span class="line"><span>function add(num1, num2) {</span></span>
<span class="line"><span>  return num1 + num2;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><code>@returns</code></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>/**</span></span>
<span class="line"><span> * 生成一个随机数</span></span>
<span class="line"><span> * @returns {number} - 返回一个随机的整数</span></span>
<span class="line"><span> */</span></span>
<span class="line"><span>function getRandomNumber() {</span></span>
<span class="line"><span>  return Math.floor(Math.random() * 10);</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><code>@throws</code></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>/**</span></span>
<span class="line"><span> * 除法运算</span></span>
<span class="line"><span> * @param {number} dividend - 被除数</span></span>
<span class="line"><span> * @param {number} divisor - 除数</span></span>
<span class="line"><span> * @returns {number} - 返回除法运算的结果</span></span>
<span class="line"><span> * @throws {Error} - 如果除数为零，则抛出错误</span></span>
<span class="line"><span> */</span></span>
<span class="line"><span>function divide(dividend, divisor) {</span></span>
<span class="line"><span>  if (divisor === 0) {</span></span>
<span class="line"><span>    throw new Error(&#39;除数不能为零&#39;);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  return dividend / divisor;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><code>@example</code></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span></span></span>
<span class="line"><span>/**</span></span>
<span class="line"><span> * 将字符串反转</span></span>
<span class="line"><span> * @param {string} str - 输入的字符串</span></span>
<span class="line"><span> * @returns {string} - 返回反转后的字符串</span></span>
<span class="line"><span> *</span></span>
<span class="line"><span> * @example</span></span>
<span class="line"><span> *</span><span> // 示例1</span></span>
<span class="line"><span> * reverseString(&#39;Hello&#39;)</span><span> // 输出: &#39;olleH&#39;</span></span>
<span class="line"><span> *</span></span>
<span class="line"><span> * @example</span></span>
<span class="line"><span> *</span><span> // 示例2</span></span>
<span class="line"><span> * reverseString(&#39;JavaScript&#39;)</span><span> // 输出: &#39;tpircSavaJ&#39;</span></span>
<span class="line"><span> */</span></span>
<span class="line"><span>function reverseString(str) {</span></span>
<span class="line"><span>  return str.split(&#39;&#39;).reverse().join(&#39;&#39;);</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><code>@description</code> 或 <code>@desc</code></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>/**</span></span>
<span class="line"><span> * 将字符串转换为大写，并添加感叹号结尾。</span></span>
<span class="line"><span> *</span></span>
<span class="line"><span> * @param {string} str - 输入的字符串</span></span>
<span class="line"><span> * @returns {string} - 返回转换后的字符串</span></span>
<span class="line"><span> *</span></span>
<span class="line"><span> * @description 该函数将给定的字符串转换为大写，并在末尾添加一个感叹号。注意：该函数不会修改原始字符串，而是返回一个新的字符串。</span></span>
<span class="line"><span> */</span></span>
<span class="line"><span>function convertToUpperCase(str) {</span></span>
<span class="line"><span>  return str.toUpperCase() + &#39;!&#39;;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><code>@deprecated</code></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>javascriptCopy Code/**</span></span>
<span class="line"><span> * @deprecated 该函数已废弃，请使用新的 addNumbers 函数</span></span>
<span class="line"><span> */</span></span>
<span class="line"><span>function add(num1, num2) {</span></span>
<span class="line"><span>  return num1 + num2;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/**</span></span>
<span class="line"><span> * 计算两个数字的和</span></span>
<span class="line"><span> * @param {number} num1 - 第一个数字</span></span>
<span class="line"><span> * @param {number} num2 - 第二个数字</span></span>
<span class="line"><span> * @returns {number} - 返回两个数字的和</span></span>
<span class="line"><span> */</span></span>
<span class="line"><span>function addNumbers(num1, num2) {</span></span>
<span class="line"><span>  return num1 + num2;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><code>@inheritdoc</code></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>javascriptCopy Code/**</span></span>
<span class="line"><span> * 父类的构造函数</span></span>
<span class="line"><span> * @class</span></span>
<span class="line"><span> */</span></span>
<span class="line"><span>class Parent {</span></span>
<span class="line"><span>  /**</span></span>
<span class="line"><span>   * @param {string} name - 名称</span></span>
<span class="line"><span>   */</span></span>
<span class="line"><span>  constructor(name) {</span></span>
<span class="line"><span>    this.name = name;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // ...</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/**</span></span>
<span class="line"><span> * 子类继承父类并添加额外的方法</span></span>
<span class="line"><span> * @class</span></span>
<span class="line"><span> * @inheritdoc</span></span>
<span class="line"><span> */</span></span>
<span class="line"><span>class Child extends Parent {</span></span>
<span class="line"><span>  /**</span></span>
<span class="line"><span>   * @param {string} name - 名称</span></span>
<span class="line"><span>   * @param {number} age - 年龄</span></span>
<span class="line"><span>   */</span></span>
<span class="line"><span>  constructor(name, age) {</span></span>
<span class="line"><span>    super(name);</span></span>
<span class="line"><span>    this.age = age;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  /**</span></span>
<span class="line"><span>   * 输出姓名和年龄</span></span>
<span class="line"><span>   */</span></span>
<span class="line"><span>  printInfo() {</span></span>
<span class="line"><span>    console.log(\`姓名: \${this.name}, 年龄: \${this.age}\`);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="防抖节流" tabindex="-1">防抖节流 <a class="header-anchor" href="#防抖节流" aria-label="Permalink to &quot;防抖节流&quot;">​</a></h3>`,26)])])}const m=n(i,[["render",l]]);export{u as __pageData,m as default};
