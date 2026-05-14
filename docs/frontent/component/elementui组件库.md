# ElementUI 组件库技巧

## 一、Table 表格技巧

### 1. 单选实现

```html
<el-table ref="tableRef" v-loading="loading" :data="tableData" @selection-change="handleSelectionChange">
  <el-table-column type="selection" width="55" align="center"/>
  <el-table-column label="名称" align="center" prop="name"/>
</el-table>
```

```javascript
data() {
  return {
    multipleSelection: []
  }
},
handleSelectionChange(val) {
  if (val.length > 1) {
    this.$refs.tableRef.clearSelection();
    this.$refs.tableRef.toggleRowSelection(val.pop());
  }
  this.multipleSelection = val;
}
```

### 2. 合并单元格

```html
<el-table :data="tableData" :span-method="objectSpanMethod">
  <el-table-column label="部门" prop="department"/>
  <el-table-column label="姓名" prop="name"/>
  <el-table-column label="岗位" prop="position"/>
</el-table>
```

```javascript
objectSpanMethod({ row, column, rowIndex, columnIndex }) {
  if (columnIndex === 0) {
    const sameDepartment = this.getSameDepartmentCount(rowIndex);
    if (sameDepartment > 0) {
      return {
        rowspan: sameDepartment,
        colspan: 1
      };
    } else {
      return {
        rowspan: 0,
        colspan: 0
      };
    }
  }
}
```

### 3. 自定义排序

```html
<el-table :data="tableData" :default-sort="{ prop: 'date', order: 'descending' }">
  <el-table-column 
    prop="date" 
    label="日期" 
    sortable="custom"
    @sort-change="handleSortChange"
  />
</el-table>
```

```javascript
handleSortChange({ prop, order }) {
  this.sortProp = prop;
  this.sortOrder = order;
  this.loadData();
}
```

### 4. 树形数据展开

```html
<el-table :data="treeData" row-key="id" default-expand-all>
  <el-table-column prop="name" label="名称"/>
  <el-table-column prop="value" label="值"/>
</el-table>
```

## 二、Form 表单技巧

### 1. 动态表单验证

```html
<el-form :model="form" :rules="rules" ref="formRef">
  <el-form-item label="邮箱" prop="email">
    <el-input v-model="form.email"/>
  </el-form-item>
</el-form>
```

```javascript
data() {
  const validateEmail = (rule, value, callback) => {
    const reg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!value) {
      callback(new Error('请输入邮箱'));
    } else if (!reg.test(value)) {
      callback(new Error('请输入正确的邮箱格式'));
    } else {
      callback();
    }
  };
  
  return {
    form: { email: '' },
    rules: {
      email: [{ validator: validateEmail, trigger: 'blur' }]
    }
  }
}
```

### 2. 表单重置

```javascript
// 重置整个表单
this.$refs.formRef.resetFields();

// 重置单个字段
this.form.field = '';
this.$refs.formRef.clearValidate('field');
```

### 3. 表单禁用

```html
<el-form :model="form" :disabled="isDisabled">
  <el-form-item label="姓名">
    <el-input v-model="form.name"/>
  </el-form-item>
</el-form>
```

## 三、Dialog 对话框技巧

### 1. 拖拽移动

```html
<el-dialog 
  title="可拖拽对话框" 
  :visible.sync="dialogVisible"
  :close-on-click-modal="false"
>
  <div class="dialog-content">内容</div>
</el-dialog>
```

```css
.el-dialog {
  cursor: move;
}
.el-dialog__header {
  cursor: move;
}
```

### 2. 自定义尺寸

```html
<el-dialog 
  title="自定义尺寸" 
  :visible.sync="dialogVisible"
  width="60%"
  top="10vh"
>
  <!-- 内容 -->
</el-dialog>
```

### 3. 弹窗层级

```html
<el-dialog 
  title="高优先级弹窗" 
  :visible.sync="dialogVisible"
  :modal-append-to-body="false"
>
  <!-- 内容 -->
</el-dialog>
```

## 四、Select 选择器技巧

### 1. 远程搜索

```html
<el-select 
  v-model="value" 
  filterable 
  remote 
  :remote-method="remoteSearch"
  placeholder="请输入关键词"
>
  <el-option 
    v-for="item in options" 
    :key="item.value" 
    :label="item.label" 
    :value="item.value"
  />
</el-select>
```

```javascript
remoteSearch(query) {
  if (query !== '') {
    // 调用接口获取数据
    this.$api.search(query).then(res => {
      this.options = res.data;
    });
  } else {
    this.options = [];
  }
}
```

### 2. 多选限制

```html
<el-select v-model="value" multiple :multiple-limit="3">
  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"/>
</el-select>
```

## 五、样式覆盖技巧

### 1. 全局样式覆盖

```scss
// 在全局样式文件中
.el-button--primary {
  background-color: #1890ff;
  border-color: #1890ff;
}
```

### 2. 局部样式覆盖

```vue
<template>
  <div class="custom-button">
    <el-button type="primary">自定义按钮</el-button>
  </div>
</template>

<style scoped>
.custom-button ::v-deep .el-button--primary {
  background-color: #52c41a;
  border-color: #52c41a;
}
</style>
```

## 六、全局配置

### 1. 按需引入

```javascript
import Vue from 'vue';
import { Button, Table, Form } from 'element-ui';

Vue.use(Button);
Vue.use(Table);
Vue.use(Form);
```

### 2. 全局配置

```javascript
import Vue from 'vue';
import ElementUI from 'element-ui';

Vue.use(ElementUI, {
  size: 'small',
  zIndex: 3000
});
```

## 七、性能优化

### 1. Table 虚拟化

```html
<el-table :data="tableData" v-loading="loading">
  <!-- 使用固定高度 -->
</el-table>
```

```css
.el-table {
  max-height: 400px;
  overflow-y: auto;
}
```

### 2. 懒加载

```html
<el-image :src="imageUrl" lazy/>
```

## 八、其他实用技巧

### 1. Message 提示

```javascript
// 成功提示
this.$message.success('操作成功');

// 错误提示
this.$message.error('操作失败');

// 自定义配置
this.$message({
  message: '提示信息',
  type: 'warning',
  duration: 5000
});
```

### 2. Loading 加载

```javascript
// 开启全屏加载
const loading = this.$loading({
  lock: true,
  text: '加载中...',
  spinner: 'el-icon-loading',
  background: 'rgba(0, 0, 0, 0.7)'
});

// 关闭加载
loading.close();
```

### 3. 日期选择器禁用日期

```html
<el-date-picker 
  v-model="date" 
  :disabled-date="disabledDate"
/>
```

```javascript
disabledDate(time) {
  // 禁用今天之前的日期
  return time.getTime() < Date.now() - 8.64e7;
}
```

### 4. 分页组件

```html
<el-pagination
  @size-change="handleSizeChange"
  @current-change="handleCurrentChange"
  :current-page="currentPage"
  :page-sizes="[10, 20, 30, 40]"
  :page-size="pageSize"
  layout="total, sizes, prev, pager, next, jumper"
  :total="total"
/>
```

```javascript
handleSizeChange(val) {
  this.pageSize = val;
  this.loadData();
},
handleCurrentChange(val) {
  this.currentPage = val;
  this.loadData();
}
```

