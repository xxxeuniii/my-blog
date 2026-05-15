# BOM（Browser Object Model）

BOM 是浏览器提供的一组 API，用于与浏览器窗口和浏览器功能进行交互。与 DOM 不同，BOM 主要关注浏览器窗口的管理、浏览器环境的控制。

## BOM 核心对象

| 对象 | 作用 |
| :--- | :--- |
| window | 浏览器窗口，全局对象 |
| document | 页面文档（DOM） |
| navigator | 浏览器信息 |
| screen | 屏幕信息 |
| location | URL 信息 |
| history | 浏览历史 |

## 一、window 对象

window 是 BOM 的核心，表示浏览器窗口，是全局对象。

### 常用方法

```javascript
// 弹窗
window.alert("Hello");           // 警告框
window.confirm("确定吗？");       // 确认框，返回 true/false
window.prompt("请输入名字");      // 输入框，返回用户输入的值

// 定时器
setTimeout(() => {}, 1000);      // 延迟执行
setInterval(() => {}, 1000);      // 周期执行

// 窗口操作
window.open("url");               // 打开新窗口
window.close();                   // 关闭当前窗口
```

### 常用属性

```javascript
window.innerWidth;   // 窗口内部宽度
window.innerHeight;  // 窗口内部高度
window.outerWidth;  // 窗口外部宽度
window.outerHeight; // 窗口外部高度

window.scrollX;      // 水平滚动距离
window.scrollY;      // 垂直滚动距离
```

## 二、navigator 对象

提供浏览器和系统信息。

```javascript
// 常用属性
navigator.userAgent;    // 用户代理字符串
navigator.language;     // 浏览器语言
navigator.platform;     // 操作系统平台
navigator.onLine;       // 是否联网

// 常用方法
navigator.geolocation.getCurrentPosition(); // 获取地理位置
```

## 三、screen 对象

提供屏幕信息。

```javascript
screen.width;        // 屏幕宽度
screen.height;       // 屏幕高度
screen.availWidth;   // 可用宽度（不含任务栏）
screen.availHeight;  // 可用高度
screen.colorDepth;   // 颜色深度
```

## 四、location 对象

操作当前 URL。

```javascript
// 属性
location.href;       // 完整 URL
location.protocol;   // 协议 (http/https)
location.host;       // 主机名和端口
location.hostname;   // 主机名
location.port;       // 端口
location.pathname;   // 路径
location.search;     // 查询字符串
location.hash;       // 锚点

// 方法
location.reload();        // 重新加载
location.replace("url");  // 替换当前页面（无历史记录）
location.assign("url");   // 跳转到新页面
```

## 五、history 对象

控制浏览器历史记录。

```javascript
history.back();      // 后退
history.forward();   // 前进
history.go(n);      // 跳转（n 可为正负）

// 示例
history.go(-1);     // 后退一页
history.go(1);      // 前进一页
history.go(0);      // 刷新
```

## 六、Web Storage

本地存储，不会随请求发送到服务器。

### localStorage

持久化存储，数据不会过期。

```javascript
// 存储
localStorage.setItem("name", "Tom");
localStorage.name = "Tom";

// 读取
localStorage.getItem("name");
localStorage.name;

// 删除
localStorage.removeItem("name");
localStorage.clear();  // 清空所有
```

### sessionStorage

会话级存储，窗口关闭后清除。

```javascript
sessionStorage.setItem("key", "value");
sessionStorage.getItem("key");
sessionStorage.removeItem("key");
sessionStorage.clear();
```

### localStorage vs sessionStorage

| 特性 | localStorage | sessionStorage |
| :--- | :--- | :--- |
| 生命周期 | 永久 | 会话结束 |
| 作用域 | 同源 | 当前窗口 |
| 大小 | 约 5MB | 约 5MB |

## 七、常见应用

### 页面跳转

```javascript
location.href = "https://example.com";
location.assign("https://example.com");
```

### 获取 URL 参数

```javascript
const params = new URLSearchParams(location.search);
const id = params.get("id");
```

### 防重复提交

```javascript
sessionStorage.setItem("submitting", "true");
window.onload = () => {
  if (sessionStorage.getItem("submitting")) {
    // 已提交，禁用按钮
  }
};
