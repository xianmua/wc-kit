# TablePager 表格分页

复合组件：[Table](/components/table) + [Pagination](/components/pagination) 的开箱即用组合，
客户端分页——传入全量 data，内部**先排序、后按页切片**展示。与手工组合两个组件相比，
它解决了排序只作用于当前页、页码夹紧等联动细节。

内部组件的事件（wc-sort / wc-row-click / wc-change / wc-size-change）均为 composed，
会自然穿透到宿主上，直接监听即可；row-click 的 index 为当前页内序号。

<script setup>
import { onMounted, ref } from 'vue'

const pagerTable = ref(null)

onMounted(() => {
  if (pagerTable.value) {
    pagerTable.value.columns = [
      { key: 'name', title: '姓名', sortable: true },
      { key: 'age', title: '年龄', width: 100, align: 'right' },
      { key: 'city', title: '城市' },
    ]
    pagerTable.value.data = Array.from({ length: 25 }, (_, i) => ({
      name: `用户${String(25 - i).padStart(2, '0')}`,
      age: 18 + ((i * 7) % 40),
      city: ['上海', '北京', '广州', '深圳', '杭州'][i % 5],
    }))
  }
})
</script>

## 示例

### 基础用法

<div class="demo-block">
  <wc-table-pager ref="pagerTable" striped show-total show-jumper show-size-changer></wc-table-pager>
</div>

25 条模拟数据：每页 10 条，共 3 页；总条数独立靠左，每页条数选择、页码与跳页输入靠右；点击「姓名」列头会全量排序后重新切片。

:::: details 查看代码
::: code-group

```html [HTML]
<wc-table-pager striped show-total show-jumper show-size-changer id="table"></wc-table-pager>

<script type="module">
  const table = document.getElementById('table');

  // columns / data 为属性型（对象数组），需 JS 赋值

  table.columns = [
    { key: 'name', title: '姓名', sortable: true },
    { key: 'age', title: '年龄', width: 100, align: 'right' },
    { key: 'city', title: '城市' },
  ];
  table.data = Array.from({ length: 25 }, (_, i) => ({
    name: `用户${String(25 - i).padStart(2, '0')}`,
    age: 18 + ((i * 7) % 40),
    city: ['上海', '北京', '广州', '深圳', '杭州'][i % 5],
  }));
</script>
```

```vue [Vue]
<template>
  <wc-table-pager ref="table" striped show-total show-jumper show-size-changer></wc-table-pager>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

// columns / data 为属性型（对象数组），需 JS 赋值
const table = ref(null);

onMounted(() => {
  table.value.columns = [
    { key: 'name', title: '姓名', sortable: true },
    { key: 'age', title: '年龄', width: 100, align: 'right' },
    { key: 'city', title: '城市' },
  ];
  table.value.data = Array.from({ length: 25 }, (_, i) => ({
    name: `用户${String(25 - i).padStart(2, '0')}`,
    age: 18 + ((i * 7) % 40),
    city: ['上海', '北京', '广州', '深圳', '杭州'][i % 5],
  }));
});
</script>
```

```tsx [React]
import { WcTablePager } from '@wc-kit/react';

<WcTablePager striped showTotal showJumper showSizeChanger ref={table}></WcTablePager>;

// columns / data 为属性型（对象数组），需 JS 赋值
const table = useRef(null);
useEffect(() => {
  table.current.columns = [
    { key: 'name', title: '姓名', sortable: true },
    { key: 'age', title: '年龄', width: 100, align: 'right' },
    { key: 'city', title: '城市' },
  ];
  table.current.data = Array.from({ length: 25 }, (_, i) => ({
    name: `用户${String(25 - i).padStart(2, '0')}`,
    age: 18 + ((i * 7) % 40),
    city: ['上海', '北京', '广州', '深圳', '杭州'][i % 5],
  }));
}, []);
```

:::
::::

## API

### 属性

| 属性                | attribute             | 类型                             | 默认值            | 说明                         |
| ------------------- | --------------------- | -------------------------------- | ----------------- | ---------------------------- |
| `columns`           | —                     | `wcTableColumn[]`                | `[]`              | 列配置（同 wc-table）        |
| `data`              | —                     | `wcTableRow[]`                   | `[]`              | **全量**行数据（内部切片）   |
| `striped`           | `striped`             | `boolean`                        | `false`           | 斑马纹                       |
| `bordered`          | `bordered`            | `boolean`                        | `false`           | 全边框                       |
| `size`              | `size`                | `'small' \| 'medium' \| 'large'` | `'medium'`        | 密度                         |
| `loading`           | `loading`             | `boolean`                        | `false`           | 加载中（叠加遮罩）           |
| `showTotal`         | `show-total`          | `boolean`                        | `false`           | 显示总条数（独立靠左，其余控件靠右） |
| `showJumper`        | `show-jumper`         | `boolean`                        | `false`           | 分页区显示跳页输入框         |
| `showSizeChanger`   | `show-size-changer`   | `boolean`                        | `false`           | 分页区显示每页条数选择器     |
| `pageSizeOptions`   | `page-size-options`   | `string`                         | `'10,20,50,100'`  | 每页条数可选项（逗号分隔）   |
| `rowKey`            | `row-key`             | `string`                         | `''`              | 行唯一键字段名（展开状态跟踪用，透传） |
| `expandRowByClick`  | `expand-row-by-click` | `boolean`                        | `false`           | 点击行即切换展开（透传）     |
| `defaultExpandedRowKeys` | —（仅 JS 属性）  | `(string \| object)[]`           | `[]`              | 初始展开行的键集合（透传，非受控） |
| `expandedRowKeys`   | —（仅 JS 属性）       | `(string \| object)[] \| null`   | `null`            | 受控展开行集合（透传；null = 非受控） |
| `columnWidth`       | —（仅 JS 属性）       | `number \| string`               | `48`              | 展开列宽（透传）             |
| `expandedRowRender` | —（仅 JS 属性）       | `(row, index) => TemplateResult \| string` | —       | 展开区渲染函数，设置后出现展开列（透传） |
| `rowExpandable`     | —（仅 JS 属性）       | `(row, index) => boolean`        | —                 | 判断行是否可展开（透传）     |

只读镜像：`page`（当前页）、`pageSize`（每页条数）、`pageCount`（总页数）。

### 事件（穿透自内部组件）

| 事件             | 说明                                        |
| ---------------- | ------------------------------------------- |
| `wc-sort`        | 列头排序后派发（detail: { key, order }）    |
| `wc-row-click`   | 点击数据行（detail: { row, index }，页内序号） |
| `wc-expand`      | 行展开/收起（detail: { row, index, expanded }） |
| `wc-expanded-rows-change` | 展开行集合变化（detail: 展开键数组）   |
| `wc-change`      | 页码变化（detail: { current, previous }）   |
| `wc-size-change` | 每页条数变化（detail: { pageSize, previous, current }） |

### 插槽

| 名称    | 说明                                    |
| ------- | --------------------------------------- |
| `empty` | 空状态（透传给内部 wc-table）           |

### CSS Parts

`base` / `table` / `pager` / `total`
