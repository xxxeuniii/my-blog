# `window` 对象

`window` 对象是浏览器环境中的全局对象，代表当前的浏览器窗口。它提供了与浏览器交互的接口，包括浏览器的窗口操作、文档访问、存储功能、历史记录控制等。

**参考文档：**[Window - Web API | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/API/Window)

## 简介

- **全局对象**：在 JavaScript 中，所有的全局变量、函数和对象都作为 `window` 对象的属性。
- **BOM 核心**：`window` 对象是 BOM（Browser Object Model，浏览器对象模型）的核心，用于与浏览器的窗口和页面交互。
- **DOM 的入口**：通过 `window.document` 可以访问当前页面的 DOM 树，并对其进行操作。

---

## 属性介绍

`window` 对象有非常多的属性和方法，下面的表格详细列出了常见的属性：

### 常见属性

| 属性                     | 说明                                                       | 示例                                      |
| ------------------------ | ---------------------------------------------------------- | ----------------------------------------- |
| `window.document`        | 返回当前窗口中的文档（DOM 树）                             | `window.document.title`                   |
| `window.location`        | 用于获取或设置当前页面的 URL                               | `window.location.href`                    |
| `window.navigator`       | 提供关于浏览器的信息，比如用户代理、语言、平台等           | `window.navigator.userAgent`              |
| `window.history`         | 操作浏览器的历史记录                                       | `window.history.back()`                   |
| `window.screen`          | 提供关于用户屏幕的信息                                     | `window.screen.width`                     |
| `window.innerWidth`      | 返回窗口的内容区宽度（包括滚动条，但不包括工具栏）         | `window.innerWidth`                       |
| `window.innerHeight`     | 返回窗口的内容区高度（包括滚动条，但不包括工具栏）         | `window.innerHeight`                      |
| `window.outerWidth`      | 返回浏览器窗口的外部宽度                                   | `window.outerWidth`                       |
| `window.outerHeight`     | 返回浏览器窗口的外部高度                                   | `window.outerHeight`                      |
| `window.localStorage`    | 提供在用户浏览器中存储数据的方法，数据在页面刷新后仍然存在 | `window.localStorage.setItem()`           |
| `window.sessionStorage`  | 提供在浏览器会话期间存储数据的方法，页面关闭后数据丢失     | `window.sessionStorage.setItem()`         |
| `window.console`         | 提供对浏览器控制台的访问接口，允许输出调试信息             | `window.console.log()`                    |
| `window.alert()`         | 显示一个警告对话框                                         | `window.alert('警告！')`                  |
| `window.confirm()`       | 显示一个确认对话框，用户可以选择确认或取消                 | `window.confirm('你确定吗？')`            |
| `window.prompt()`        | 显示一个输入对话框，用户可以输入文本                       | `window.prompt('请输入你的名字：')`       |
| `window.open()`          | 打开一个新的浏览器窗口或标签页                             | `window.open('https://example.com')`      |
| `window.close()`         | 关闭当前窗口（需要窗口是通过 `window.open()` 打开的）      | `window.close()`                          |
| `window.setTimeout()`    | 在指定的时间后执行代码                                     | `window.setTimeout(function, 2000)`       |
| `window.setInterval()`   | 每隔指定时间重复执行代码                                   | `window.setInterval(function, 1000)`      |
| `window.clearTimeout()`  | 清除通过 `setTimeout` 设置的定时器                         | `window.clearTimeout(timerId)`            |
| `window.clearInterval()` | 清除通过 `setInterval` 设置的定时器                        | `window.clearInterval(intervalId)`        |
| `window.scrollTo()`      | 滚动窗口到指定的坐标                                       | `window.scrollTo(0, 100)`                 |
| `window.scrollBy()`      | 相对于当前滚动位置，滚动窗口                               | `window.scrollBy(0, 50)`                  |
| `window.matchMedia()`    | 检测是否符合指定的 CSS 媒体查询条件                        | `window.matchMedia('(max-width: 600px)')` |
| `window.focus()`         | 将焦点设置到当前窗口                                       | `window.focus()`                          |
| `window.blur()`          | 取消窗口的焦点                                             | `window.blur()`                           |
| `window.onload`          | 在页面加载完成时触发的事件                                 | `window.onload = function() {}`           |
| `window.onerror`         | 在页面发生错误时触发的事件                                 | `window.onerror = function() {}`          |

### 常见事件

| 事件                    | 说明                                                   | 示例                                    |
| ----------------------- | ------------------------------------------------------ | --------------------------------------- |
| `window.onload`         | 页面加载完成时触发的事件                               | `window.onload = function() {}`         |
| `window.onresize`       | 当窗口大小变化时触发的事件                             | `window.onresize = function() {}`       |
| `window.onscroll`       | 当页面滚动时触发的事件                                 | `window.onscroll = function() {}`       |
| `window.onbeforeunload` | 页面刷新或关闭之前触发的事件，用户可以取消关闭         | `window.onbeforeunload = function() {}` |
| `window.onfocus`        | 窗口获得焦点时触发的事件                               | `window.onfocus = function() {}`        |
| `window.onblur`         | 窗口失去焦点时触发的事件                               | `window.onblur = function() {}`         |
| `window.onpopstate`     | 当浏览器历史记录改变时触发（比如点击浏览器的返回按钮） | `window.onpopstate = function() {}`     |

---

## 用法

### 1. **全局变量和函数**
所有全局作用域下的变量和函数都挂载在 `window` 对象上。

```js
var myVar = "Hello";
function myFunc() {
  console.log("This is a function.");
}

console.log(window.myVar); // 输出 "Hello"
window.myFunc();           // 输出 "This is a function."
```

### 2. **浏览器窗口的尺寸**

可以使用 `window.innerWidth` 和 `window.innerHeight` 获取浏览器窗口的宽度和高度（不包括工具栏和滚动条）。

```
js复制代码console.log(window.innerWidth);   // 输出窗口的宽度
console.log(window.innerHeight);  // 输出窗口的高度
```

### 3. **控制页面滚动**

使用 `window.scrollTo()` 可以将页面滚动到指定的坐标。

```
js


复制代码
window.scrollTo(0, 500);  // 将页面滚动到纵向 500px 的位置
```

### 4. **打开新窗口或标签页**

通过 `window.open()` 可以打开一个新的窗口或标签页。

```
js


复制代码
window.open('https://www.example.com', '_blank');  // 在新标签页中打开链接
```

### 5. **定时器**

使用 `window.setTimeout()` 来延迟执行代码，使用 `window.setInterval()` 来间隔执行代码。

```
js复制代码// 2秒后执行
window.setTimeout(function() {
  console.log('2秒后执行');
}, 2000);

// 每隔1秒执行
window.setInterval(function() {
  console.log('每秒执行一次');
}, 1000);
```

### 6. **操作浏览器历史记录**

通过 `window.history` 可以访问浏览器的历史记录，并实现前进或后退。

```
js复制代码window.history.back();   // 后退到上一页
window.history.forward(); // 前进到下一页
```