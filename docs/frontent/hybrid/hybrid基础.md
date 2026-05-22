# Hybrid App 基础与 JSBridge

Hybrid App（混合应用）是指使用 Web 技术（HTML、CSS、JavaScript）开发，并通过 WebView 嵌入到原生应用中的移动应用。这种方式结合了 Web 开发的效率和原生应用的能力。

## 一、什么是 Hybrid App

### 定义

Hybrid App（混合应用） = 原生外壳（WebView） + H5 页面

```
┌─────────────────────────────────────────┐
│           原生 App 壳子                   │
│  ┌─────────────────────────────────┐   │
│  │         WebView 容器             │   │
│  │  ┌─────────────────────────┐   │   │
│  │  │       H5 页面            │   │   │
│  │  │  (HTML + CSS + JS)      │   │   │
│  │  └─────────────────────────┘   │   │
│  └─────────────────────────────────┘   │
└─────────────────────────────────────────┘
```

### 优缺点

| 优点 | 缺点 |
|------|------|
| 开发效率高（Web 技术栈） | 性能不如原生应用 |
| 跨平台（iOS + Android） | 依赖 WebView |
| 更新无需发版（热更新） | 部分系统能力受限 |
| 成本低 |  |

### 适用场景

- 资讯类 App（新闻、阅读）
- 企业内部工具
- 电商 App（展示 + 交易）
- 社交类 App

## 二、什么是 JSBridge

### 定义

JSBridge 是 H5 页面与原生 App 之间通信的桥梁，让 H5 可以调用原生能力。

### 为什么需要 JSBridge

H5 页面在 WebView 中运行，有很多限制：
- ❌ 无法直接访问摄像头
- ❌ 无法访问通讯录
- ❌ 无法调用系统分享
- ❌ 无法获取用户位置（需要授权）
- ❌ 无法调用私有业务接口

通过 JSBridge，原生 App 可以暴露接口给 H5 调用。

### 通信流程

```
┌──────────────┐      ┌──────────────┐      ┌──────────────┐
│   H5 页面    │ ──▶  │  JS Bridge   │ ──▶  │  原生 App    │
│              │ ◀──  │   (桥接)     │ ◀──  │              │
└──────────────┘      └──────────────┘      └──────────────┘
```

## 三、JSBridge 实现原理

### 1. Android 实现

#### 方式一：addJavascriptInterface

```java
// Android - MainActivity.java
public class MainActivity extends AppCompatActivity {
    private WebView webView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        webView = findViewById(R.id.webView);
        webView.getSettings().setJavaScriptEnabled(true);

        // 注入 JS 接口对象
        webView.addJavascriptInterface(new JSInterface(), "appBridge");

        webView.loadUrl("file:///android_asset/index.html");
    }

    // 供 H5 调用的接口类
    private class JSInterface {
        @JavascriptInterface
        public void getCamera(String callback) {
            // 调用摄像头
            String result = captureCamera();
            // 回调给 H5
            webView.post(() -> {
                webView.loadUrl("javascript:" + callback + "('" + result + "')");
            });
        }

        @JavascriptInterface
        public void getContacts(String callback) {
            // 获取通讯录
            List<Contact> contacts = fetchContacts();
            String json = new Gson().toJson(contacts);
            webView.post(() -> {
                webView.loadUrl("javascript:" + callback + "('" + json + "')");
            });
        }

        @JavascriptInterface
        public void callPrivateAI(String text, String callback) {
            // 调用私有 AI 接口
            String response = privateAIService.chat(text);
            webView.post(() -> {
                webView.loadUrl("javascript:" + callback + "('" + response + "')");
            });
        }
    }
}
```

#### H5 调用方式

```javascript
// H5 页面
window.appBridge.getCamera('handleCameraResult')

function handleCameraResult(base64) {
  console.log('摄像头结果:', base64)
}
```

### 2. iOS 实现

#### 方式一：WKScriptMessageHandler

```swift
// iOS - ViewController.swift
class ViewController: UIViewController, WKScriptMessageHandler {
    private var webView: WKWebView!

    override func viewDidLoad() {
        super.viewDidLoad()

        let config = WKWebViewConfiguration()
        config.userContentController.add(self, name: "getCamera")
        config.userContentController.add(self, name: "getContacts")
        config.userContentController.add(self, name: "callPrivateAI")

        webView = WKWebView(frame: view.bounds, configuration: config)
        view.addSubview(webView)

        webView.load(URLRequest(url: URL(string: "index.html")!))
    }

    func userContentController(_ userContentController: WKUserContentController,
                               didReceive message: WKScriptMessage) {
        switch message.name {
        case "getCamera":
            handleGetCamera(message.body as? String)
        case "getContacts":
            handleGetContacts(message.body as? String)
        case "callPrivateAI":
            handleCallPrivateAI(message.body as? String)
        default:
            break
        }
    }

    private func handleGetCamera(_ callback: String?) {
        // 调用摄像头
        let result = captureCamera()
        webView.evaluateJavaScript("\(callback ?? '')('\\(result)')", completionHandler: nil)
    }

    private func handleGetContacts(_ callback: String?) {
        // 获取通讯录
        let contacts = fetchContacts()
        let json = try? JSONEncoder().encode(contacts)
        let jsonString = String(data: json ?? Data(), encoding: .utf8)
        webView.evaluateJavaScript("\(callback ?? '')('\\(jsonString ?? '')')", completionHandler: nil)
    }

    private func handleCallPrivateAI(_ callback: String?) {
        // 调用私有 AI
        let response = privateAI.chat("hello")
        webView.evaluateJavaScript("\(callback ?? '')('\\(response)')", completionHandler: nil)
    }
}
```

#### H5 调用方式

```javascript
// H5 页面
window.webkit.messageHandlers.getCamera.postMessage('handleCameraResult')
```

### 3. H5 封装调用

为了方便使用，我们在 H5 中封装一套统一的 API：

```javascript
// jsbridge.js
const AppBridge = {
  // 获取摄像头
  getCamera() {
    return new Promise((resolve, reject) => {
      if (window.appBridge && window.appBridge.getCamera) {
        const callbackName = 'camera_' + Date.now()
        window[callbackName] = (result) => {
          resolve(result)
          delete window[callbackName]
        }
        window.appBridge.getCamera(callbackName)
      } else if (window.webkit && window.webkit.messageHandlers.getCamera) {
        const callbackName = 'camera_' + Date.now()
        window[callbackName] = (result) => {
          resolve(result)
          delete window[callbackName]
        }
        window.webkit.messageHandlers.getCamera.postMessage(callbackName)
      } else {
        reject(new Error('AppBridge 不可用'))
      }
    })
  },

  // 获取通讯录
  getContacts() {
    return new Promise((resolve, reject) => {
      const callbackName = 'contacts_' + Date.now()
      window[callbackName] = (result) => {
        resolve(JSON.parse(result))
        delete window[callbackName]
      }

      if (window.appBridge) {
        window.appBridge.getContacts(callbackName)
      } else if (window.webkit && window.webkit.messageHandlers.getContacts) {
        window.webkit.messageHandlers.getContacts.postMessage(callbackName)
      } else {
        reject(new Error('AppBridge 不可用'))
      }
    })
  },

  // 调用私有 AI 接口
  callPrivateAI(text) {
    return new Promise((resolve, reject) => {
      const callbackName = 'ai_' + Date.now()
      window[callbackName] = (result) => {
        resolve(result)
        delete window[callbackName]
      }

      if (window.appBridge) {
        window.appBridge.callPrivateAI(text, callbackName)
      } else if (window.webkit && window.webkit.messageHandlers.callPrivateAI) {
        window.webkit.messageHandlers.callPrivateAI.postMessage(JSON.stringify({ text, callback: callbackName }))
      } else {
        reject(new Error('AppBridge 不可用'))
      }
    })
  },

  // 检测是否在 App 环境中
  isInApp() {
    return !!(window.appBridge || (window.webkit && window.webkit.messageHandlers))
  }
}

// 导出
window.AppBridge = AppBridge
```

### 使用示例

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Hybrid App Demo</title>
  <script src="jsbridge.js"></script>
</head>
<body>
  <h1>Hybrid App Demo</h1>
  <button onclick="testCamera()">获取摄像头</button>
  <button onclick="testContacts()">获取通讯录</button>
  <button onclick="testAI()">调用私有 AI</button>

  <script>
    async function testCamera() {
      try {
        const result = await AppBridge.getCamera()
        console.log('摄像头结果:', result)
      } catch (e) {
        console.error('获取摄像头失败:', e)
      }
    }

    async function testContacts() {
      try {
        const contacts = await AppBridge.getContacts()
        console.log('通讯录:', contacts)
      } catch (e) {
        console.error('获取通讯录失败:', e)
      }
    }

    async function testAI() {
      try {
        const response = await AppBridge.callPrivateAI('你好')
        console.log('AI 回答:', response)
      } catch (e) {
        console.error('AI 调用失败:', e)
      }
    }

    // 检测是否在 App 中
    console.log('是否在 App 中:', AppBridge.isInApp())
  </script>
</body>
</html>
```

## 四、常见 JSBridge 接口

### 系统能力

| 接口 | 说明 |
|------|------|
| `getCamera` | 获取摄像头 |
| `getLocation` | 获取地理位置 |
| `getContacts` | 获取通讯录 |
| `getAlbum` | 获取相册 |
| `scanQRCode` | 扫描二维码 |
| `share` | 分享 |
| `pay` | 支付 |

### 业务能力

| 接口 | 说明 |
|------|------|
| `login` | 登录 |
| `getUserInfo` | 获取用户信息 |
| `callPrivateAI` | 调用私有 AI |
| `getToken` | 获取 Token |

## 五、安全注意事项

### 1. 验证来源

```javascript
// 原生端验证请求来源
@JavascriptInterface
public void callSensitive(String method, String params) {
    // 验证 WebView URL 是否来自可信域名
    String origin = webView.getUrl();
    if (!isTrustedDomain(origin)) {
        return;
    }
    // 执行敏感操作
}
```

### 2. 参数校验

```javascript
// H5 端
function callPrivateAI(text) {
  if (!text || text.length > 500) {
    throw new Error('输入参数不合法')
  }
  // 调用
}
```

### 3. 避免注入攻击

```java
// 原生端 - 防止 JS 注入
webView.setWebViewClient(new WebViewClient() {
    @Override
    public WebResourceResponse shouldInterceptRequest(WebView view, WebResourceRequest request) {
        String url = request.getUrl().toString();
        if (isMaliciousURL(url)) {
            return new WebResourceResponse(null, null, null);
        }
        return super.shouldInterceptRequest(view, request);
    }
});
```

## 六、框架推荐

| 框架 | 说明 |
|------|------|
| **Cordova** | 老牌混合开发框架 |
| **Ionic** | 基于 Angular + Cordova |
| **Capacitor** | Ionic 团队新一代框架 |
| **UniApp** | Vue 跨端框架 |
| **React Native** | Facebook 混合框架 |

## 七、总结

1. **Hybrid App** = 原生 WebView + H5 页面
2. **JSBridge** 是 H5 与原生通信的桥梁
3. **实现方式**：
   - Android: addJavascriptInterface
   - iOS: WKScriptMessageHandler
4. **H5 封装**：统一 API，Promise 化
5. **安全**：验证来源、参数校验、防注入

掌握 JSBridge，可以让你用 Web 技术开发具有原生能力的移动应用。