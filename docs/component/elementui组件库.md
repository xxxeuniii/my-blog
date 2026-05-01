# element

## 20240327

### el-table实现单选

```html
        <el-table ref="tableRef" v-loading="loading" :data="test" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align="center"/>
          <el-table-column label="test" align="center" prop="test"/>
        </el-table>
```

```javascript
data(){
    return {
        multipleSelection:[]
    }
}  

handleSelectionChange(val) {
    // 单选
    if (val.length > 1) {
      this.$refs.tableRef.clearSelection();
      this.$refs.tableRef.toggleRowSelection(val.pop());
    }
    this.setData({
      multipleSelection: val,
    });
  },
```

