# ECharts 使用指南

## 一、ECharts 简介

ECharts 是百度开源的一个强大的数据可视化图表库，支持多种图表类型，具有丰富的交互能力和良好的跨平台兼容性。

**主要特点：**
- 支持 20+ 种图表类型
- 丰富的交互功能（缩放、拖拽、高亮等）
- 响应式设计，自动适应容器大小
- 支持 Canvas/SVG 双渲染引擎
- 良好的移动端适配
- 支持主题定制

## 二、安装与引入

### 2.1 CDN 引入

```html
<!-- 引入 ECharts -->
<script src="https://cdn.jsdelivr.net/npm/echarts@5.5.0/dist/echarts.min.js"></script>
```

### 2.2 npm 安装

```bash
npm install echarts --save
```

**在 Vue 中使用：**
```javascript
import * as echarts from 'echarts'
```

### 2.3 按需引入

```javascript
// 只引入需要的图表类型
import * as echarts from 'echarts/core'
import { BarChart, LineChart, PieChart } from 'echarts/charts'
import { TitleComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

// 注册组件
echarts.use([
  BarChart, LineChart, PieChart,
  TitleComponent, TooltipComponent, LegendComponent,
  CanvasRenderer
])
```

## 三、基本使用

### 3.1 创建图表容器

```html
<!-- HTML -->
<div id="chart" style="width: 600px; height: 400px;"></div>
```

### 3.2 初始化图表

```javascript
// 获取 DOM 元素
const chartDom = document.getElementById('chart')

// 初始化 ECharts 实例
const chart = echarts.init(chartDom)

// 配置项
const option = {
  title: {
    text: '示例图表'
  },
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: '销量',
      type: 'bar',
      data: [120, 200, 150, 80, 250, 180, 220]
    }
  ]
}

// 设置配置项
chart.setOption(option)
```

### 3.3 响应式处理

```javascript
// 监听窗口大小变化
window.addEventListener('resize', () => {
  chart.resize()
})
```

## 四、常用图表类型

### 4.1 柱状图（Bar）

```javascript
const option = {
  xAxis: {
    type: 'category',
    data: ['A', 'B', 'C', 'D', 'E']
  },
  yAxis: {
    type: 'value'
  },
  series: [{
    type: 'bar',
    data: [10, 20, 30, 40, 50],
    itemStyle: {
      color: '#5470c6'
    }
  }]
}
```

### 4.2 折线图（Line）

```javascript
const option = {
  xAxis: {
    type: 'category',
    data: ['1月', '2月', '3月', '4月', '5月']
  },
  yAxis: {
    type: 'value'
  },
  series: [{
    type: 'line',
    data: [120, 132, 101, 134, 190],
    smooth: true,  // 平滑曲线
    lineStyle: {
      width: 3
    }
  }]
}
```

### 4.3 饼图（Pie）

```javascript
const option = {
  title: {
    text: '浏览器市场份额',
    left: 'center'
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    left: 'left'
  },
  series: [{
    type: 'pie',
    radius: ['40%', '70%'],  // 环形图
    avoidLabelOverlap: false,
    itemStyle: {
      borderRadius: 10,
      borderColor: '#fff',
      borderWidth: 2
    },
    label: {
      show: false,
      position: 'center'
    },
    emphasis: {
      label: {
        show: true,
        fontSize: 30,
        fontWeight: 'bold'
      }
    },
    labelLine: {
      show: false
    },
    data: [
      { value: 40, name: 'Chrome' },
      { value: 30, name: 'Firefox' },
      { value: 20, name: 'Safari' },
      { value: 10, name: 'Others' }
    ]
  }]
}
```

### 4.4 散点图（Scatter）

```javascript
const option = {
  xAxis: {
    type: 'value'
  },
  yAxis: {
    type: 'value'
  },
  series: [{
    type: 'scatter',
    data: [
      [10, 20], [20, 30], [30, 40], 
      [40, 50], [50, 60]
    ],
    symbolSize: function(data) {
      return Math.sqrt(data[0] * 5);
    }
  }]
}
```

### 4.5 雷达图（Radar）

```javascript
const option = {
  radar: {
    indicator: [
      { name: '语文', max: 100 },
      { name: '数学', max: 100 },
      { name: '英语', max: 100 },
      { name: '物理', max: 100 },
      { name: '化学', max: 100 }
    ]
  },
  series: [{
    type: 'radar',
    data: [
      {
        value: [80, 90, 75, 85, 95],
        name: '学生A'
      },
      {
        value: [70, 80, 85, 90, 80],
        name: '学生B'
      }
    ]
  }]
}
```

### 4.6 地图（Map）

```javascript
// 需要引入地图数据
$.get('https://cdn.jsdelivr.net/npm/echarts/map/json/china.json', function (chinaJson) {
  echarts.registerMap('china', chinaJson)
  
  const option = {
    series: [{
      type: 'map',
      map: 'china',
      data: [
        { name: '北京', value: 100 },
        { name: '上海', value: 80 },
        { name: '广州', value: 60 }
      ],
      label: {
        show: true
      }
    }]
  }
})
```

## 五、核心配置项

### 5.1 标题（Title）

```javascript
title: {
  text: '主标题',
  subtext: '副标题',
  left: 'center',      // left/right/center
  top: '10px',        // 距离顶部
  textStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333'
  }
}
```

### 5.2 提示框（Tooltip）

```javascript
tooltip: {
  trigger: 'axis',     // item/axis/none
  axisPointer: {       // 坐标轴指示器
    type: 'cross'      // line/cross/shadow/none
  },
  formatter: function(params) {
    return `${params[0].name}: ${params[0].value}`
  }
}
```

### 5.3 图例（Legend）

```javascript
legend: {
  data: ['销量', '利润'],
  orient: 'horizontal',  // horizontal/vertical
  left: 'center',
  top: 'bottom',
  textStyle: {
    color: '#666'
  }
}
```

### 5.4 坐标轴（Axis）

```javascript
xAxis: {
  type: 'category',      // category/value/time/log
  data: ['A', 'B', 'C'],
  name: 'X轴名称',
  axisLabel: {
    rotate: 30,          // 标签旋转角度
    color: '#666'
  },
  axisLine: {
    lineStyle: {
      color: '#ccc'
    }
  }
}
```

### 5.5 系列（Series）

```javascript
series: [{
  name: '数据系列',
  type: 'bar',           // bar/line/pie/scatter/radar等
  data: [10, 20, 30],
  itemStyle: {           // 图形样式
    color: '#5470c6',
    borderRadius: [4, 4, 0, 0]
  },
  emphasis: {            // 高亮样式
    itemStyle: {
      color: '#91cc75'
    }
  }
}]
```

## 六、高级功能

### 6.1 数据交互

```javascript
// 点击事件
chart.on('click', function(params) {
  console.log('点击了:', params.name, params.value)
})

// 鼠标悬停事件
chart.on('mouseover', function(params) {
  console.log('悬停:', params)
})

// 高亮指定数据
chart.dispatchAction({
  type: 'highlight',
  seriesIndex: 0,
  dataIndex: 0
})
```

### 6.2 动态更新数据

```javascript
// 更新数据
chart.setOption({
  series: [{
    data: [150, 250, 180, 220, 280]
  }]
})

// 渐入动画
chart.setOption({
  series: [{
    data: newData,
    animationDuration: 1000,
    animationEasing: 'cubicOut'
  }]
})
```

### 6.3 主题定制

```javascript
// 使用内置主题
const chart = echarts.init(dom, 'dark')

// 自定义主题
const theme = {
  color: ['#5470c6', '#91cc75', '#fac858'],
  backgroundColor: '#f5f5f5',
  title: {
    textStyle: { color: '#333' }
  }
}
const chart = echarts.init(dom, theme)
```

### 6.4 导出功能

```javascript
// 获取图片数据 URL
const url = chart.getDataURL({
  type: 'png',
  pixelRatio: 2,      // 分辨率
  backgroundColor: '#fff'
})

// 下载图片
const link = document.createElement('a')
link.download = 'chart.png'
link.href = url
link.click()
```

## 七、Vue 集成示例

### 7.1 Vue 3 组件

```vue
<template>
  <div ref="chartRef" class="chart"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import * as echarts from 'echarts'

const chartRef = ref(null)
let chart = null

const props = defineProps({
  data: {
    type: Array,
    default: () => [10, 20, 30, 40, 50]
  }
})

const initChart = () => {
  if (!chartRef.value) return
  
  chart = echarts.init(chartRef.value)
  
  const option = {
    xAxis: {
      type: 'category',
      data: ['A', 'B', 'C', 'D', 'E']
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      type: 'bar',
      data: props.data
    }]
  }
  
  chart.setOption(option)
}

const handleResize = () => {
  chart?.resize()
}

watch(() => props.data, (newData) => {
  chart?.setOption({
    series: [{ data: newData }]
  })
}, { deep: true })

onMounted(() => {
  initChart()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  chart?.dispose()
})
</script>

<style scoped>
.chart {
  width: 100%;
  height: 400px;
}
</style>
```

## 八、React 集成示例

```jsx
import { useEffect, useRef, useState } from 'react'
import * as echarts from 'echarts'

const ChartComponent = ({ data }) => {
  const chartRef = useRef(null)
  const [chart, setChart] = useState(null)

  useEffect(() => {
    if (!chartRef.current) return

    const instance = echarts.init(chartRef.current)
    setChart(instance)

    const option = {
      xAxis: { type: 'category', data: ['A', 'B', 'C'] },
      yAxis: { type: 'value' },
      series: [{ type: 'bar', data: data }]
    }

    instance.setOption(option)

    const handleResize = () => instance.resize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      instance.dispose()
    }
  }, [])

  useEffect(() => {
    if (chart) {
      chart.setOption({
        series: [{ data: data }]
      })
    }
  }, [data, chart])

  return <div ref={chartRef} style={{ width: '100%', height: '400px' }} />
}

export default ChartComponent
```

## 九、性能优化

### 9.1 大数据量优化

```javascript
// 开启渐进式渲染
const option = {
  series: [{
    type: 'line',
    data: largeData,
    progressive: true,           // 开启渐进式渲染
    progressiveThreshold: 3000, // 数据量超过此值启用
    progressiveChunk: 500       // 每帧渲染的数据量
  }]
}
```

### 9.2 避免频繁更新

```javascript
// 使用防抖
let timer = null
function updateChart(data) {
  if (timer) clearTimeout(timer)
  timer = setTimeout(() => {
    chart.setOption({ series: [{ data }] })
  }, 100)
}
```

### 9.3 销毁实例

```javascript
// 组件卸载时销毁
onUnmounted(() => {
  chart.dispose()
})
```

## 十、常见问题

### 10.1 图表不显示

- 检查容器是否有宽高
- 检查 DOM 元素是否存在
- 检查浏览器控制台是否有报错

### 10.2 异步数据不显示

```javascript
// 确保数据加载完成后再设置 option
fetch('/api/data').then(res => res.json()).then(data => {
  chart.setOption({
    series: [{ data }]
  })
})
```

### 10.3 响应式失效

```javascript
// 确保监听了 resize 事件
window.addEventListener('resize', () => chart.resize())
```

## 总结

ECharts 是一个功能强大的数据可视化库，掌握它可以轻松创建各种精美图表。核心要点：

1. **初始化**：获取 DOM → 创建实例 → 设置配置
2. **配置项**：标题、提示框、图例、坐标轴、系列
3. **交互**：事件监听、动态更新
4. **集成**：Vue/React 组件封装
5. **优化**：大数据量处理、性能优化

官方文档：[https://echarts.apache.org/](https://echarts.apache.org/)