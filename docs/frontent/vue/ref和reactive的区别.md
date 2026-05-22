# Vue3 ref vs reactive

Vue3 中有两种定义响应式变量的方式：`ref` 和 `reactive`。

## 区别

| 特性 | ref | reactive |
|------|-----|----------|
| 定义类型 | 任意类型 | 对象/数组 |
| 获取值 | 需要 `.value` | 直接使用 |
| 本质 | 包装为响应式对象 | Proxy 代理 |

## 具体例子

```javascript
import { ref, reactive } from 'vue'

// ref - 用于基础类型
const count = ref(0)
console.log(count.value)  // 获取值：0
count.value = 1          // 修改值

// reactive - 用于对象/数组
const state = reactive({
  name: 'Tom',
  age: 20
})
console.log(state.name)   // 直接使用：Tom
state.name = 'Jerry'     // 直接修改
```

## 什么时候用

| 场景 | 用哪个 |
|------|--------|
| 数字、字符串、布尔值 | ref |
| 对象、数组 | reactive |
| 可能在模板中替换整个变量 | ref |

## 底层原理

### reactive 基于 Proxy

```javascript
// 简化版 reactive 原理
function reactive(obj) {
  return new Proxy(obj, {
    get(target, key) {
      track(target, key)  // 收集依赖
      return target[key]
    },
    set(target, key, value) {
      target[key] = value
      trigger(target, key)  // 触发更新
    }
  })
}
```

### ref 包装对象

```javascript
// ref 内部实现简化
function ref(value) {
  return {
    __v_isRef: true,
    value: value  // 值存在 value 属性里
  }
}
```

### 为什么 ref 要 .value

- ref 内部把值包装在 `{ value: xxx }` 对象里
- 要拿到真正的值，需要 `.value`
- 模板中会自动解包，所以模板里不用写 `.value`

### reactive 不需要

- reactive 直接用 Proxy 代理原对象
- 访问属性就是访问原对象属性，不需要额外获取

## 双向绑定流程

```
1. 读取数据 -> 自动收集依赖（track）
2. 修改数据 -> 自动触发重新渲染（trigger）
```

## 总结

| 方式 | 内部实现 | 访问方式 |
|------|----------|----------|
| ref | `{ value: xxx }` | `.value` |
| reactive | Proxy 代理 | 直接用 |

- **ref**：装数据的盒子，拿值要 `.value`
- **reactive**：直接给对象穿响应式马甲，直接用
