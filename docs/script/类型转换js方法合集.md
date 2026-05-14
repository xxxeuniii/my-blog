# JavaScript 类型转换方法合集

## 一、字符串转换

### 1.1 转为字符串

```javascript
// 方法一：String()
String(123)        // "123"
String(null)       // "null"
String(undefined)  // "undefined"
String(true)       // "true"

// 方法二：toString()
(123).toString()   // "123"
true.toString()    // "true"
[1, 2, 3].toString() // "1,2,3"

// 方法三：拼接空字符串
123 + ""           // "123"
null + ""          // "null"
```

### 1.2 字符串转数字

```javascript
// 方法一：Number()
Number("123")      // 123
Number("12.3")     // 12.3
Number("abc")      // NaN

// 方法二：parseInt()
parseInt("123")    // 123
parseInt("123abc") // 123
parseInt("abc123") // NaN
parseInt("10", 2)  // 2 (二进制转十进制)

// 方法三：parseFloat()
parseFloat("12.34")    // 12.34
parseFloat("12.34abc") // 12.34

// 方法四：+ 运算符
+"123"             // 123
+"12.3"            // 12.3

// 方法五：~~ 双波浪线
~~"123"            // 123
~~"12.9"           // 12 (向下取整)
```

### 1.3 字符串转布尔值

```javascript
// 空字符串为 false，其余为 true
Boolean("")        // false
Boolean("hello")   // true
Boolean("false")   // true (非空字符串)
```

---

## 二、数字转换

### 2.1 数字转字符串

```javascript
// 方法一：toString()
(123).toString()   // "123"
(123).toString(2)  // "1111011" (二进制)
(123).toString(16) // "7b" (十六进制)

// 方法二：String()
String(123)        // "123"

// 方法三：模板字符串
`${123}`           // "123"
```

### 2.2 数字转布尔值

```javascript
// 0 和 NaN 为 false，其余为 true
Boolean(0)         // false
Boolean(1)         // true
Boolean(-1)        // true
Boolean(NaN)       // false
```

### 2.3 小数转整数

```javascript
// 方法一：Math.floor() - 向下取整
Math.floor(12.9)   // 12
Math.floor(-12.1)  // -13

// 方法二：Math.ceil() - 向上取整
Math.ceil(12.1)    // 13
Math.ceil(-12.9)   // -12

// 方法三：Math.round() - 四舍五入
Math.round(12.4)   // 12
Math.round(12.5)   // 13

// 方法四：parseInt()
parseInt(12.9)     // 12

// 方法五：~~ 双波浪线
~~12.9             // 12

// 方法六：| 0 位运算
12.9 | 0           // 12
```

---

## 三、布尔值转换

### 3.1 布尔值转字符串

```javascript
String(true)       // "true"
String(false)      // "false"
true.toString()    // "true"
```

### 3.2 布尔值转数字

```javascript
Number(true)       // 1
Number(false)      // 0
+true              // 1
+false             // 0
```

---

## 四、对象转换

### 4.1 对象转字符串

```javascript
// 方法一：JSON.stringify()
const obj = { name: "Tom", age: 20 }
JSON.stringify(obj) // '{"name":"Tom","age":20}'

// 方法二：toString()
({}).toString()    // "[object Object]"
[1, 2, 3].toString() // "1,2,3"

// 方法三：手动拼接
const person = { name: "Tom" }
`${person.name}`   // "Tom"
```

### 4.2 对象转数组

```javascript
// 方法一：Object.keys() - 获取键数组
const obj = { a: 1, b: 2 }
Object.keys(obj)   // ["a", "b"]

// 方法二：Object.values() - 获取值数组
Object.values(obj) // [1, 2]

// 方法三：Object.entries() - 获取键值对数组
Object.entries(obj) // [["a", 1], ["b", 2]]

// 方法四：展开运算符
[...obj]           // [] (对象不能直接展开到数组)
[...Object.values(obj)] // [1, 2]
```

### 4.3 对象转布尔值

```javascript
// 任何对象（包括空对象）都为 true
Boolean({})        // true
Boolean([])        // true
Boolean(null)      // false
```

---

## 五、数组转换

### 5.1 数组转字符串

```javascript
// 方法一：toString()
[1, 2, 3].toString() // "1,2,3"

// 方法二：join()
[1, 2, 3].join()    // "1,2,3"
[1, 2, 3].join("-") // "1-2-3"
[1, 2, 3].join("")  // "123"

// 方法三：JSON.stringify()
JSON.stringify([1, 2, 3]) // "[1,2,3]"
```

### 5.2 数组转对象

```javascript
// 方法一：Object.assign()
const arr = ["a", "b", "c"]
Object.assign({}, arr) // {0: "a", 1: "b", 2: "c"}

// 方法二：展开运算符
{...arr}            // {0: "a", 1: "b", 2: "c"}

// 方法三：reduce()
arr.reduce((acc, val, idx) => {
  acc[idx] = val
  return acc
}, {})
```

### 5.3 伪数组转数组

```javascript
// 方法一：Array.from()
const nodeList = document.querySelectorAll("div")
Array.from(nodeList) // 转为真正的数组

// 方法二：展开运算符
[...nodeList]       // 转为真正的数组

// 方法三：Array.prototype.slice.call()
Array.prototype.slice.call(nodeList)
```

---

## 六、类型检查

### 6.1 typeof

```javascript
typeof 123         // "number"
typeof "hello"     // "string"
typeof true        // "boolean"
typeof undefined   // "undefined"
typeof null        // "object" (历史遗留问题)
typeof {}          // "object"
typeof []          // "object"
typeof function(){} // "function"
```

### 6.2 instanceof

```javascript
[] instanceof Array        // true
{} instanceof Object       // true
new Date() instanceof Date // true

// 局限性：跨 iframe 失效
```

### 6.3 Object.prototype.toString

```javascript
Object.prototype.toString.call(123)        // "[object Number]"
Object.prototype.toString.call("hello")    // "[object String]"
Object.prototype.toString.call(true)       // "[object Boolean]"
Object.prototype.toString.call(null)       // "[object Null]"
Object.prototype.toString.call(undefined)  // "[object Undefined]"
Object.prototype.toString.call({})         // "[object Object]"
Object.prototype.toString.call([])         // "[object Array]"
Object.prototype.toString.call(new Date()) // "[object Date]"
Object.prototype.toString.call(/regex/)    // "[object RegExp]"
```

### 6.4 Array.isArray()

```javascript
Array.isArray([])         // true
Array.isArray({})         // false
Array.isArray(null)       // false
```

---

## 七、实用转换技巧

### 7.1 快速转布尔值

```javascript
// 使用 !! 双重取反
!!"hello"          // true
!!""               // false
!!0                // false
!!1                // true
!!null             // false
!!undefined        // false
!!{}               // true
!![]               // true
```

### 7.2 快速转数字

```javascript
// 使用 + 运算符
+"123"             // 123
+new Date()        // 时间戳
```

### 7.3 日期转换

```javascript
// 日期转时间戳
new Date().getTime()      // 毫秒时间戳
Date.now()                // 毫秒时间戳
+new Date()               // 毫秒时间戳

// 时间戳转日期
new Date(1609459200000)  // Date 对象

// 日期转字符串
new Date().toISOString()  // "2024-01-01T00:00:00.000Z"
new Date().toLocaleDateString() // "2024/1/1"
new Date().toLocaleString()     // "2024/1/1 00:00:00"
```

### 7.4 URL 参数解析

```javascript
function parseUrlParams(url) {
  const params = {}
  const urlParams = new URLSearchParams(url.split('?')[1])
  for (const [key, value] of urlParams) {
    params[key] = decodeURIComponent(value)
  }
  return params
}

// 示例
parseUrlParams("http://example.com?name=Tom&age=20")
// { name: "Tom", age: "20" }
```

### 7.5 深拷贝

```javascript
// JSON 方法（有局限性）
const deepCopy = JSON.parse(JSON.stringify(obj))

// 递归方法
function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') return obj
  if (obj instanceof Date) return new Date(obj)
  if (obj instanceof Array) return obj.map(item => deepClone(item))
  const clone = {}
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      clone[key] = deepClone(obj[key])
    }
  }
  return clone
}
```

---

## 八、常见陷阱

### 8.1 隐式转换陷阱

```javascript
// 小心隐式转换
1 + "1"            // "11" (不是 2)
[] + {}            // "[object Object]"
{} + []            // 0 (对象被解析为代码块)

// == 与 === 的区别
null == undefined  // true
null === undefined // false
"" == 0            // true
"" === 0           // false
```

### 8.2 NaN 的特殊性

```javascript
NaN === NaN        // false (NaN 不等于自身)
Number.isNaN(NaN)  // true
isNaN("abc")       // true (不推荐)
Number.isNaN("abc") // false (推荐)
```

### 8.3 数组的隐式转换

```javascript
[] == false        // true
![]               // false
[] == ![]         // true (两边都转为 false)
```

---

## 九、类型转换速查表

| 值 | String() | Number() | Boolean() |
|----|----------|----------|-----------|
| `""` | `""` | `0` | `false` |
| `"hello"` | `"hello"` | `NaN` | `true` |
| `"123"` | `"123"` | `123` | `true` |
| `0` | `"0"` | `0` | `false` |
| `1` | `"1"` | `1` | `true` |
| `-1` | `"-1"` | `-1` | `true` |
| `NaN` | `"NaN"` | `NaN` | `false` |
| `null` | `"null"` | `0` | `false` |
| `undefined` | `"undefined"` | `NaN` | `false` |
| `true` | `"true"` | `1` | `true` |
| `false` | `"false"` | `0` | `false` |
| `[]` | `""` | `0` | `true` |
| `[1,2,3]` | `"1,2,3"` | `NaN` | `true` |
| `{}` | `"[object Object]"` | `NaN` | `true` |
