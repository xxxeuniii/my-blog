## **BOM（Browser Object Model）简介**

**BOM（浏览器对象模型）**是浏览器提供的一组API，用于与浏览器窗口和浏览器功能进行交互。与DOM不同，BOM主要关注浏览器窗口的管理、浏览器环境的控制以及浏览器外部的交互。BOM 允许 JavaScript 访问和操作浏览器窗口、历史记录、位置、屏幕、事件等。

BOM 并没有像 DOM 那样的标准化规范，它通常是指一组**浏览器提供的对象**，这些对象与浏览器的各个功能密切相关。BOM 使得前端开发者能够在 JavaScript 中访问和操作浏览器本身，而不仅仅是页面内容。

### **BOM的常见对象**

1. **window对象**
2. **document对象**
3. **navigator对象**
4. **screen对象**
5. **location对象**
6. **history对象**
7. **localStorage和sessionStorage**

### **BOM常见对象详细介绍**

#### 1. **window对象**

`window`对象是BOM的核心对象，表示浏览器的窗口。它是全局对象，意味着在浏览器中所有的JavaScript代码都可以直接访问 `window` 对象的属性和方法。

- 常用属性和方法

  - ```
    window.alert()
    ```

    ：弹出一个警告框

    ```javascript
    window.alert("Hello, World!");
    ```

  - ```
    window.confirm()
    ```

    ：弹出一个确认框，返回 

    ```
    true
    ```

     或 

    ```
    false
    ```

    ```javascript
    let result = window.confirm("Are you sure?");
    ```

  - ```
    window.prompt()
    ```

    ：弹出一个输入框，返回用户输入的值

    ```javascript
    let name = window.prompt("What is your name?");
    ```

  - ```
    window.innerWidth
    ```

     / 

    ```
    window.innerHeight
    ```

    ：获取窗口的内部宽度和高度

    ```javascript
    let width = window.innerWidth;
    let height = window.innerHeight;
    ```

  - ```
    window.open()
    ```

    ：打开一个新的浏览器窗口或标签页

    ```javascript
    let newWindow = window.open("https://www.example.com");
    ```

#### 2. **document对象**

`document`是DOM的一部分，但也可以认为是BOM的一部分。它提供了访问和操作当前页面内容的方法和属性。它本身是 `window` 对象的一个属性。

- 常用方法和属性

  - ```
    document.getElementById()
    ```

    ：获取页面中的元素

    ```javascript
    let element = document.getElementById("elementId");
    ```

  - ```
    document.querySelector()
    ```

    ：获取第一个匹配的元素

    ```javascript
    let element = document.querySelector(".className");
    ```

  - ```
    document.createElement()
    ```

    ：创建新的HTML元素

    ```javascript
    let newDiv = document.createElement("div");
    ```

#### 3. **navigator对象**

`navigator`对象提供了关于浏览器的各种信息，比如浏览器名称、版本、操作系统等。

- 常用属性

  - ```
    navigator.userAgent
    ```

    ：获取浏览器的用户代理字符串

    ```javascript
    console.log(navigator.userAgent);
    ```

  - ```
    navigator.language
    ```

    ：获取浏览器的语言设置

    ```javascript
    console.log(navigator.language);
    ```

  - ```
    navigator.platform
    ```

    ：获取浏览器所在的操作系统平台

    ```javascript
    console.log(navigator.platform);
    ```

#### 4. **screen对象**

`screen`对象提供了关于用户屏幕的信息，比如屏幕的分辨率、颜色深度等。

- 常用属性

  - ```
    screen.width
    ```

    ：屏幕的宽度（单位为像素）

    ```javascript
    console.log(screen.width);
    ```

  - ```
    screen.height
    ```

    ：屏幕的高度（单位为像素）

    ```javascript
    console.log(screen.height);
    ```

  - ```
    screen.availWidth
    ```

    ：屏幕可用的宽度，不包括任务栏

    ```javascript
    console.log(screen.availWidth);
    ```

#### 5. **location对象**

`location`对象用于获取和设置浏览器的当前URL。它可以用来访问页面的各个部分（协议、主机名、路径等），并能够进行页面的跳转。

- 常用属性

  - ```
    location.href
    ```

    ：获取或设置当前页面的URL

    ```javascript
    console.log(location.href);
    location.href = "https://www.example.com"; // 跳转到指定页面
    ```

  - ```
    location.hostname
    ```

    ：获取当前页面的主机名

    ```javascript
    console.log(location.hostname);
    ```

  - ```
    location.pathname
    ```

    ：获取当前页面的路径名

    ```javascript
    console.log(location.pathname);
    ```

  - ```
    location.reload()
    ```

    ：重新加载页面

    ```javascript
    location.reload();
    ```

#### 6. **history对象**

`history`对象用于访问浏览器的历史记录，它允许开发者控制浏览器的前进、后退和跳转。

- 常用方法

  - ```
    history.back()
    ```

    ：返回到前一个页面

    ```javascript
    history.back();
    ```

  - ```
    history.forward()
    ```

    ：前进到下一个页面

    ```javascript
    history.forward();
    ```

  - ```
    history.go()
    ```

    ：可以跳转到指定的历史记录条目

    ```javascript
    history.go(-1);  // 相当于 history.back()
    history.go(1);   // 相当于 history.forward()
    ```

#### 7. **localStorage 和 sessionStorage**

`localStorage` 和 `sessionStorage` 是Web Storage API的两种存储机制，用于在浏览器中存储数据。它们与 `cookies` 不同，不会随每个HTTP请求发送，因此可以提供更高效的存储。

- **localStorage**：在浏览器会话之间持续存在，直到用户主动删除。

  - 常用方法

    ```javascript
    localStorage.setItem("key", "value");  // 设置数据
    let value = localStorage.getItem("key");  // 获取数据
    localStorage.removeItem("key");  // 删除指定数据
    localStorage.clear();  // 清空所有数据
    ```

- **sessionStorage**：仅在当前会话中有效，浏览器窗口关闭后数据丢失。

  - 常用方法

    ```javascript
    sessionStorage.setItem("key", "value");  // 设置数据
    let value = sessionStorage.getItem("key");  // 获取数据
    sessionStorage.removeItem("key");  // 删除指定数据
    sessionStorage.clear();  // 清空所有数据
    ```

------

### **总结**

BOM是浏览器提供的一组对象，用于操作和控制浏览器环境及窗口。它提供了许多有用的API，使得JavaScript能够访问并操作浏览器的一些重要功能，如：

- `window`：访问浏览器窗口、对话框、定时器等。
- `navigator`：获取浏览器和操作系统信息。
- `screen`：获取屏幕尺寸和分辨率等信息。
- `location`：获取和修改页面的URL地址。
- `history`：控制浏览器的历史记录。
- `localStorage`和`sessionStorage`：在浏览器中存储数据。

这些BOM对象使得JavaScript可以实现一些浏览器控制功能，如页面跳转、历史记录管理、数据存储等。