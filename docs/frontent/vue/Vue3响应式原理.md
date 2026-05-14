# Vue 3 响应式原理

## 一、响应式系统核心

### 1.1 Proxy vs Object.defineProperty

Vue 3 使用 `Proxy` 替代 Vue 2 的 `Object.defineProperty`：

```javascript
// Vue 2 方式
const obj = {}
Object.defineProperty(obj, 'count', {
  get() {
    console.log('get')
    return this._count
  },
  set(val) {
    console.log('set')
    this._count = val
  }
})

// Vue 3 方式
const proxy = new Proxy(obj, {
  get(target, key, receiver) {
    track(target, key)  // 依赖收集
    return Reflect.get(target, key, receiver)
  },
  set(target, key, value, receiver) {
    const result = Reflect.set(target, key, value, receiver)
    trigger(target, key)  // 触发更新
    return result
  }
})
```

**对比表格**：

| 特性 | Object.defineProperty | Proxy |
|------|----------------------|-------|
| 监听数组 | 需要重写数组方法 | 原生支持 |
| 新增属性 | 无法监听 | 自动监听 |
| 删除属性 | 无法监听 | 自动监听 |
| 性能 | 中等 | 更好 |
| 兼容性 | IE9+ | IE不支持 |

### 1.2 响应式数据创建

```javascript
import { reactive, ref } from 'vue'

// reactive: 用于对象
const state = reactive({
  count: 0,
  name: 'Vue'
})

// ref: 用于基本类型
const count = ref(0)

// ref 内部实现原理
function ref(value) {
  const wrapper = {
    _value: value,
    get value() {
      track(wrapper, 'value')
      return this._value
    },
    set value(newVal) {
      this._value = newVal
      trigger(wrapper, 'value')
    }
  }
  return wrapper
}
```

### 1.3 shallowReactive 与 shallowRef

```javascript
import { shallowReactive, shallowRef } from 'vue'

// shallowReactive: 只监听第一层属性
const shallow = shallowReactive({
  a: 1,
  nested: { b: 2 }
})
// 修改 shallow.a 会触发更新
// 修改 shallow.nested.b 不会触发更新

// shallowRef: 只监听 .value 的替换
const shallowCount = shallowRef({ count: 0 })
// 修改 shallowCount.value = { count: 1 } 会触发更新
// 修改 shallowCount.value.count = 1 不会触发更新
```

## 二、依赖收集与触发更新

### 2.1 依赖收集流程

```javascript
// 依赖收集函数
function track(target, key) {
  if (!activeEffect) return
  
  // 获取 target 的依赖映射
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    depsMap = new Map()
    targetMap.set(target, depsMap)
  }
  
  // 获取 key 的依赖集合
  let deps = depsMap.get(key)
  if (!deps) {
    deps = new Set()
    depsMap.set(key, deps)
  }
  
  // 将当前 effect 添加到依赖集合
  if (!deps.has(activeEffect)) {
    deps.add(activeEffect)
    // effect 也记录依赖，用于清理
    activeEffect.deps.push(deps)
  }
}
```

### 2.2 触发更新流程

```javascript
// 触发更新函数
function trigger(target, key) {
  const depsMap = targetMap.get(target)
  if (!depsMap) return
  
  const effects = new Set()
  const computedEffects = new Set()
  
  // 获取所有相关的 effect
  if (key !== void 0) {
    const deps = depsMap.get(key)
    if (deps) {
      deps.forEach(effect => {
        if (effect.computed) {
          computedEffects.add(effect)
        } else {
          effects.add(effect)
        }
      })
    }
  }
  
  // 先执行 computed effect
  computedEffects.forEach(effect => effect.run())
  // 再执行普通 effect
  effects.forEach(effect => effect.run())
}
```

### 2.3 Effect 调度

```javascript
class ReactiveEffect {
  constructor(fn, scheduler) {
    this.fn = fn
    this.scheduler = scheduler
    this.deps = []
  }
  
  run() {
    // 设置为当前活跃的 effect
    activeEffect = this
    try {
      return this.fn()
    } finally {
      activeEffect = null
    }
  }
  
  stop() {
    // 清理所有依赖
    this.deps.forEach(dep => {
      dep.delete(this)
    })
    this.deps.length = 0
  }
}
```

## 三、虚拟 DOM 与 Diff 算法

### 3.1 VNode 结构

```javascript
interface VNode {
  type: string | Component | Symbol
  props: Record<string, any> | null
  children: VNode[] | null
  key: string | number | null
  el: Element | null
}
```

### 3.2 Diff 算法核心

```javascript
function patch(n1, n2, container) {
  // 如果类型不同，直接替换
  if (n1.type !== n2.type) {
    replaceVNode(n1, n2, container)
    return
  }
  
  // 如果是元素节点
  if (typeof n2.type === 'string') {
    patchElement(n1, n2, container)
  } else {
    // 如果是组件
    patchComponent(n1, n2)
  }
}

function patchElement(n1, n2, container) {
  // 更新元素
  const el = n2.el = n1.el
  const oldProps = n1.props || {}
  const newProps = n2.props || {}
  
  // 更新属性
  patchProps(el, oldProps, newProps)
  
  // 更新子节点
  patchChildren(n1.children, n2.children, el)
}

function patchChildren(oldChildren, newChildren, container) {
  // 快速路径：都只有一个子节点
  if (oldChildren.length === 1 && newChildren.length === 1) {
    patch(oldChildren[0], newChildren[0], container)
    return
  }
  
  // 双端对比
  let oldStartIdx = 0
  let oldEndIdx = oldChildren.length - 1
  let newStartIdx = 0
  let newEndIdx = newChildren.length - 1
  
  // ... 双端对比逻辑
}
```

### 3.3 Key 的重要性

```javascript
// 没有 key 的情况：顺序变化会导致所有元素都更新
<ul>
  <li>Item 1</li>
  <li>Item 2</li>
  <li>Item 3</li>
</ul>

// 有 key 的情况：Vue 可以复用已有元素
<ul>
  <li key="1">Item 1</li>
  <li key="2">Item 2</li>
  <li key="3">Item 3</li>
</ul>
```

## 四、组件化原理

### 4.1 组件实例创建

```javascript
class Component {
  constructor(options) {
    this.$options = options
    this.$data = reactive(options.data())
    this.$props = {}
    this.$el = null
    this.$emit = (event, ...args) => {
      // 触发事件
      this.$emit(event, ...args)
    }
  }
  
  mount(el) {
    this.$el = el
    // 编译模板
    const { render } = compile(this.$options.template)
    this.$options.render = render
    // 挂载
    this.update()
  }
  
  update() {
    const vnode = this.$options.render.call(this)
    // 渲染到 DOM
    patch(this._vnode, vnode, this.$el)
    this._vnode = vnode
  }
}
```

### 4.2 组件通信

```javascript
// 父传子：props
const Child = {
  props: ['message'],
  template: '<div>{{ message }}</div>'
}

// 子传父：emit
const Child = {
  methods: {
    handleClick() {
      this.$emit('custom-event', 'data')
    }
  }
}

// 跨组件：provide/inject
const Parent = {
  provide() {
    return {
      theme: 'dark'
    }
  }
}

const Child = {
  inject: ['theme'],
  template: '<div :class="theme">Content</div>'
}
```

## 五、编译原理

### 5.1 模板编译流程

```javascript
// 模板 -> AST -> 优化 -> 生成代码
const template = '<div>{{ message }}</div>'

// 1. 解析阶段：生成 AST
const ast = parse(template)
// { type: 'Element', tag: 'div', children: [...] }

// 2. 优化阶段：标记静态节点
optimize(ast)

// 3. 生成阶段：生成渲染函数
const code = generate(ast)
// "function render() { return _createElement('div', null, _toDisplayString(_ctx.message)) }"
```

### 5.2 指令编译

```javascript
// v-if / v-for / v-bind / v-on 的编译

// v-if
// <div v-if="show">Content</div>
// 编译为：show ? _createElement('div', null, 'Content') : null

// v-for
// <li v-for="item in list" :key="item.id">{{ item.name }}</li>
// 编译为：_renderList(list, (item, __key, __index) => _createElement('li', { key: item.id }, item.name))

// v-bind
// <div :class="cls"></div>
// 编译为：_createElement('div', { class: cls })

// v-on
// <button @click="handleClick">Click</button>
// 编译为：_createElement('button', { onClick: handleClick }, 'Click')
```

## 六、生命周期

### 6.1 生命周期钩子

```javascript
const App = {
  beforeCreate() {
    // 实例创建前：$data、$props 未初始化
    console.log('beforeCreate')
  },
  created() {
    // 实例创建后：$data、$props 已初始化
    console.log('created')
  },
  beforeMount() {
    // 挂载前：模板已编译，DOM 未挂载
    console.log('beforeMount')
  },
  mounted() {
    // 挂载后：DOM 已挂载到页面
    console.log('mounted')
  },
  beforeUpdate() {
    // 更新前：数据已变更，DOM 未更新
    console.log('beforeUpdate')
  },
  updated() {
    // 更新后：DOM 已更新
    console.log('updated')
  },
  beforeUnmount() {
    // 卸载前：实例仍可访问
    console.log('beforeUnmount')
  },
  unmounted() {
    // 卸载后：实例已销毁
    console.log('unmounted')
  }
}
```

### 6.2 生命周期执行顺序

```
创建阶段：
  beforeCreate → created → beforeMount → mounted

更新阶段：
  beforeUpdate → updated

销毁阶段：
  beforeUnmount → unmounted
```

## 七、Composition API 原理

### 7.1 setup 函数

```javascript
const App = {
  setup(props, context) {
    // props: 父组件传入的属性
    // context: { emit, slots, attrs }
    
    const count = ref(0)
    
    const increment = () => {
      count.value++
    }
    
    // 返回值会被注入到模板中
    return {
      count,
      increment
    }
  }
}
```

### 7.2 响应式工具函数

```javascript
import { computed, watch, watchEffect } from 'vue'

// computed: 计算属性
const doubled = computed(() => count.value * 2)

// watch: 监听特定数据源
watch(count, (newVal, oldVal) => {
  console.log(`count changed from ${oldVal} to ${newVal}`)
})

// watchEffect: 自动追踪依赖
watchEffect(() => {
  console.log(`count is: ${count.value}`)
})
```

## 八、性能优化策略

### 8.1 静态提升

```javascript
// 编译优化：静态节点只创建一次
const staticVNode = createVNode('div', null, 'Static Text')

// 渲染时直接复用
function render() {
  return createVNode('div', null, [
    staticVNode,  // 复用
    createVNode('span', null, dynamicValue)
  ])
}
```

### 8.2 缓存优化

```javascript
// 使用 memo 缓存组件
const MemoizedComponent = memo((props) => {
  // 只有 props 变化时才重新渲染
  return <ExpensiveComponent {...props} />
})

// 使用 shallowRef 减少响应式开销
const data = shallowRef({ items: [] })
```

## 总结

Vue 3 的底层原理涉及多个核心模块：

1. **响应式系统**：基于 Proxy 的依赖收集和触发更新
2. **虚拟 DOM**：高效的 Diff 算法实现
3. **组件系统**：组件实例化和生命周期管理
4. **编译系统**：模板到渲染函数的转换
5. **Composition API**：灵活的逻辑复用机制

理解这些原理可以帮助我们更好地使用 Vue，写出更高效的代码。