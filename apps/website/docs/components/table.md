# Table 表格

表格组件：columns + data 驱动的纯展示表格。可排序列点击循环 升序 → 降序 → 取消，并派发 wc-sort 事件
（detail: { key, order }，取消时 order 为 null）；行点击派发 wc-row-click 事件（detail: { row, index }）。

**主要 API**

| 属性     | 类型                           | 默认值   | 说明                                                                 |
| -------- | ------------------------------ | -------- | -------------------------------------------------------------------- |
| columns  | wcTableColumn[]                | []       | 列配置（key / title / width / align / sortable / ellipsis / render） |
| data     | wcTableRow[]                   | []       | 行数据（Record`<string, unknown>`）                                  |
| striped  | boolean                        | false    | 斑马纹                                                               |
| bordered | boolean                        | false    | 全边框                                                               |
| size     | 'small' \| 'medium' \| 'large' | 'medium' | 密度                                                                 |
| loading  | boolean                        | false    | 加载中（叠加遮罩）                                                   |

**插槽**：empty（空状态，默认渲染内置 wc-empty）。

**React 用法**（@wc-kit/react 包装组件，事件 props 为 onWcSort / onWcRowClick）

```jsx
import { WcTable } from '@wc-kit/react';

const columns = [
  { key: 'name', title: '姓名', sortable: true },
  { key: 'age', title: '年龄', align: 'right', width: 100 },
];
const data = [{ name: '张三', age: 18 }];

<WcTable
  columns={columns}
  data={data}
  striped
  onWcSort={(e) => console.log(e.detail)}
  onWcRowClick={(e) => console.log(e.detail)}
></WcTable>;
```

**Vue 用法**（原生标签，@wc-kit/vue 为纯类型增强，监听 @wc-sort / @wc-row-click）

```vue
<template>
  <wc-table
    :columns="columns"
    :data="data"
    striped
    @wc-sort="onSort"
    @wc-row-click="onRowClick"
  ></wc-table>
</template>
```

## 示例

<script setup>
import { onMounted, ref } from 'vue'

// columns / data 为属性型（对象数组），需 JS 赋值
const alignTable = ref(null)
const zebraTable = ref(null)
const sizeSmall = ref(null)
const sizeLarge = ref(null)
const customCell = ref(null)
const loadingTable = ref(null)
const emptyTable = ref(null)
const emptySlotTable = ref(null)

// 基础演示数据：「姓名」列可排序
const baseColumns = [
  { key: 'name', title: '姓名', sortable: true },
  { key: 'age', title: '年龄', width: 100, align: 'right' },
  { key: 'address', title: '住址' },
]
const baseData = [
  { name: '张三', age: 32, address: '北京市朝阳区' },
  { name: '李四', age: 26, address: '上海市浦东新区' },
  { name: '王五', age: 41, address: '广州市天河区' },
]

// render 自定义单元格：返回元素覆盖默认内容（也可返回 lit 模板或文本）
function renderStatus(row) {
  const tag = document.createElement('wc-tag')
  if (row.status === '在职') {
    tag.setAttribute('theme', 'success')
    tag.textContent = '在职'
  } else {
    tag.textContent = '离职'
  }
  return tag
}

onMounted(() => {
  if (alignTable.value) {
    alignTable.value.columns = [
      { key: 'name', title: '姓名', width: 120 },
      { key: 'age', title: '年龄', width: 80, align: 'right' },
      { key: 'status', title: '状态', width: 100, align: 'center' },
      { key: 'address', title: '住址', ellipsis: true },
    ]
    alignTable.value.data = [
      { name: '张三', age: 32, status: '在职', address: '广东省深圳市南山区科技园南区高新南一道 006 号' },
      { name: '李四', age: 26, status: '离职', address: '上海市浦东新区世纪大道 100 号环球金融中心' },
    ]
  }
  if (zebraTable.value) {
    zebraTable.value.columns = baseColumns
    zebraTable.value.data = baseData
  }
  if (sizeSmall.value) {
    sizeSmall.value.columns = baseColumns
    sizeSmall.value.data = baseData
  }
  if (sizeLarge.value) {
    sizeLarge.value.columns = baseColumns
    sizeLarge.value.data = baseData
  }
  if (customCell.value) {
    customCell.value.columns = [
      { key: 'name', title: '姓名' },
      { key: 'level', title: '等级', render: (row) => `P${row.level}` },
      { key: 'status', title: '状态', render: renderStatus },
    ]
    customCell.value.data = [
      { name: '张三', level: 8, status: '在职' },
      { name: '李四', level: 6, status: '离职' },
    ]
  }
  if (loadingTable.value) {
    loadingTable.value.columns = baseColumns
    loadingTable.value.data = baseData
  }
  if (emptyTable.value) emptyTable.value.columns = baseColumns
  if (emptySlotTable.value) emptySlotTable.value.columns = baseColumns
})
</script>

### 列对齐与列宽

<div class="demo-block">
  <wc-table ref="alignTable" bordered></wc-table>
</div>

列的 align 控制单元格对齐，width 控制列宽（数值 px 或任意 CSS 宽度），ellipsis 超宽省略（title 提示完整内容）。

:::: details 查看代码
::: code-group

```html [HTML]
<wc-table bordered id="table"></wc-table>

<script type="module">
  const table = document.getElementById('table');

  // columns / data 为属性型（对象数组），需 JS 赋值

  table.columns = [
    { key: 'name', title: '姓名', width: 120 },
    { key: 'age', title: '年龄', width: 80, align: 'right' },
    { key: 'status', title: '状态', width: 100, align: 'center' },
    { key: 'address', title: '住址', ellipsis: true },
  ];
  table.data = [
    {
      name: '张三',
      age: 32,
      status: '在职',
      address: '广东省深圳市南山区科技园南区高新南一道 006 号',
    },
    { name: '李四', age: 26, status: '离职', address: '上海市浦东新区世纪大道 100 号环球金融中心' },
  ];
</script>
```

```vue [Vue]
<template>
  <wc-table ref="table" bordered></wc-table>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

// columns / data 为属性型（对象数组），需 JS 赋值
const table = ref(null);

onMounted(() => {
  table.value.columns = [
    { key: 'name', title: '姓名', width: 120 },
    { key: 'age', title: '年龄', width: 80, align: 'right' },
    { key: 'status', title: '状态', width: 100, align: 'center' },
    { key: 'address', title: '住址', ellipsis: true },
  ];
  table.value.data = [
    {
      name: '张三',
      age: 32,
      status: '在职',
      address: '广东省深圳市南山区科技园南区高新南一道 006 号',
    },
    { name: '李四', age: 26, status: '离职', address: '上海市浦东新区世纪大道 100 号环球金融中心' },
  ];
});
</script>
```

```tsx [React]
import { WcTable } from '@wc-kit/react';

<WcTable ref={table} bordered></WcTable>;

// columns / data 为属性型（对象数组），需 JS 赋值
const table = useRef(null);
useEffect(() => {
  table.current.columns = [
    { key: 'name', title: '姓名', width: 120 },
    { key: 'age', title: '年龄', width: 80, align: 'right' },
    { key: 'status', title: '状态', width: 100, align: 'center' },
    { key: 'address', title: '住址', ellipsis: true },
  ];
  table.current.data = [
    {
      name: '张三',
      age: 32,
      status: '在职',
      address: '广东省深圳市南山区科技园南区高新南一道 006 号',
    },
    { name: '李四', age: 26, status: '离职', address: '上海市浦东新区世纪大道 100 号环球金融中心' },
  ];
}, []);
```

:::
::::

### 斑马纹与边框

<div class="demo-block">
  <wc-table ref="zebraTable" striped bordered></wc-table>
</div>

:::: details 查看代码
::: code-group

```html [HTML]
<wc-table striped bordered id="table"></wc-table>

<script type="module">
  const table = document.getElementById('table');

  // columns / data 为属性型（对象数组），需 JS 赋值

  table.columns = [
    { key: 'name', title: '姓名', sortable: true },
    { key: 'age', title: '年龄', width: 100, align: 'right' },
    { key: 'address', title: '住址' },
  ];
  table.data = [
    { name: '张三', age: 32, address: '北京市朝阳区' },
    { name: '李四', age: 26, address: '上海市浦东新区' },
    { name: '王五', age: 41, address: '广州市天河区' },
  ];
</script>
```

```vue [Vue]
<template>
  <wc-table ref="table" striped bordered></wc-table>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

// columns / data 为属性型（对象数组），需 JS 赋值
const table = ref(null);

onMounted(() => {
  table.value.columns = [
    { key: 'name', title: '姓名', sortable: true },
    { key: 'age', title: '年龄', width: 100, align: 'right' },
    { key: 'address', title: '住址' },
  ];
  table.value.data = [
    { name: '张三', age: 32, address: '北京市朝阳区' },
    { name: '李四', age: 26, address: '上海市浦东新区' },
    { name: '王五', age: 41, address: '广州市天河区' },
  ];
});
</script>
```

```tsx [React]
import { WcTable } from '@wc-kit/react';

<WcTable ref={table} striped bordered></WcTable>;

// columns / data 为属性型（对象数组），需 JS 赋值
const table = useRef(null);
useEffect(() => {
  table.current.columns = [
    { key: 'name', title: '姓名', sortable: true },
    { key: 'age', title: '年龄', width: 100, align: 'right' },
    { key: 'address', title: '住址' },
  ];
  table.current.data = [
    { name: '张三', age: 32, address: '北京市朝阳区' },
    { name: '李四', age: 26, address: '上海市浦东新区' },
    { name: '王五', age: 41, address: '广州市天河区' },
  ];
}, []);
```

:::
::::

### 尺寸

<div class="demo-block">
  <div style="display:flex;flex-direction:column;gap:16px;">
    <wc-table ref="sizeSmall" size="small"></wc-table>
    <wc-table ref="sizeLarge" size="large"></wc-table>
  </div>
</div>

依次为 small / large 密度（medium 为默认，见基础用法）。

:::: details 查看代码
::: code-group

```html [HTML]
<div style="display:flex;flex-direction:column;gap:16px;">
  <wc-table size="small" id="small"></wc-table>
  <wc-table size="large" id="large"></wc-table>
</div>

<script type="module">
  const small = document.getElementById('small');

  const large = document.getElementById('large');

  // columns / data 为属性型（对象数组），需 JS 赋值

  const columns = [
    { key: 'name', title: '姓名', sortable: true },
    { key: 'age', title: '年龄', width: 100, align: 'right' },
    { key: 'address', title: '住址' },
  ];
  const data = [
    { name: '张三', age: 32, address: '北京市朝阳区' },
    { name: '李四', age: 26, address: '上海市浦东新区' },
    { name: '王五', age: 41, address: '广州市天河区' },
  ];
  for (const el of [small, large]) {
    el.columns = columns;
    el.data = data;
  }
</script>
```

```vue [Vue]
<template>
  <div style="display:flex;flex-direction:column;gap:16px;">
    <wc-table ref="small" size="small"></wc-table>
    <wc-table ref="large" size="large"></wc-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

// columns / data 为属性型（对象数组），需 JS 赋值
const small = ref(null);
const large = ref(null);

onMounted(() => {
  const columns = [
    { key: 'name', title: '姓名', sortable: true },
    { key: 'age', title: '年龄', width: 100, align: 'right' },
    { key: 'address', title: '住址' },
  ];
  const data = [
    { name: '张三', age: 32, address: '北京市朝阳区' },
    { name: '李四', age: 26, address: '上海市浦东新区' },
    { name: '王五', age: 41, address: '广州市天河区' },
  ];
  for (const el of [small.value, large.value]) {
    el.columns = columns;
    el.data = data;
  }
});
</script>
```

```tsx [React]
import { WcTable } from '@wc-kit/react';

<div style="display:flex;flex-direction:column;gap:16px;">
  <WcTable ref={small} size="small"></WcTable>
  <WcTable ref={large} size="large"></WcTable>
</div>;

// columns / data 为属性型（对象数组），需 JS 赋值
const small = useRef(null);
const large = useRef(null);
useEffect(() => {
  const columns = [
    { key: 'name', title: '姓名', sortable: true },
    { key: 'age', title: '年龄', width: 100, align: 'right' },
    { key: 'address', title: '住址' },
  ];
  const data = [
    { name: '张三', age: 32, address: '北京市朝阳区' },
    { name: '李四', age: 26, address: '上海市浦东新区' },
    { name: '王五', age: 41, address: '广州市天河区' },
  ];
  for (const el of [small.current, large.current]) {
    el.columns = columns;
    el.data = data;
  }
}, []);
```

:::
::::

### 自定义单元格

<div class="demo-block">
  <wc-table ref="customCell"></wc-table>
</div>

列配置的 render(row, index) 可返回 lit 模板或文本，覆盖默认单元格内容。

:::: details 查看代码
::: code-group

```html [HTML]
<wc-table id="table"></wc-table>

<script type="module">
  const table = document.getElementById('table');

  // columns / data 为属性型（对象数组），需 JS 赋值

  table.columns = [
    { key: 'name', title: '姓名' },
    // render 返回文本
    { key: 'level', title: '等级', render: (row) => `P${row.level}` },
    // render 返回元素（也可返回 lit 模板）
    {
      key: 'status',
      title: '状态',
      render: (row) => {
        const tag = document.createElement('wc-tag');
        if (row.status === '在职') {
          tag.setAttribute('theme', 'success');
          tag.textContent = '在职';
        } else {
          tag.textContent = '离职';
        }
        return tag;
      },
    },
  ];
  table.data = [
    { name: '张三', level: 8, status: '在职' },
    { name: '李四', level: 6, status: '离职' },
  ];
</script>
```

```vue [Vue]
<template>
  <wc-table ref="table"></wc-table>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

// columns / data 为属性型（对象数组），需 JS 赋值
const table = ref(null);

onMounted(() => {
  table.value.columns = [
    { key: 'name', title: '姓名' },
    // render 返回文本
    { key: 'level', title: '等级', render: (row) => `P${row.level}` },
    // render 返回元素（也可返回 lit 模板）
    {
      key: 'status',
      title: '状态',
      render: (row) => {
        const tag = document.createElement('wc-tag');
        if (row.status === '在职') {
          tag.setAttribute('theme', 'success');
          tag.textContent = '在职';
        } else {
          tag.textContent = '离职';
        }
        return tag;
      },
    },
  ];
  table.value.data = [
    { name: '张三', level: 8, status: '在职' },
    { name: '李四', level: 6, status: '离职' },
  ];
});
</script>
```

```tsx [React]
import { WcTable } from '@wc-kit/react';

<WcTable ref={table}></WcTable>;

// columns / data 为属性型（对象数组），需 JS 赋值
const table = useRef(null);
useEffect(() => {
  table.current.columns = [
    { key: 'name', title: '姓名' },
    // render 返回文本
    { key: 'level', title: '等级', render: (row) => `P${row.level}` },
    // render 返回元素（也可返回 lit 模板）
    {
      key: 'status',
      title: '状态',
      render: (row) => {
        const tag = document.createElement('wc-tag');
        if (row.status === '在职') {
          tag.setAttribute('theme', 'success');
          tag.textContent = '在职';
        } else {
          tag.textContent = '离职';
        }
        return tag;
      },
    },
  ];
  table.current.data = [
    { name: '张三', level: 8, status: '在职' },
    { name: '李四', level: 6, status: '离职' },
  ];
}, []);
```

:::
::::

### 加载与空状态

<div class="demo-block">
  <div style="display:flex;flex-direction:column;gap:16px;">
    <wc-table ref="loadingTable" loading></wc-table>
    <wc-table ref="emptyTable" bordered></wc-table>
    <wc-table ref="emptySlotTable">
      <wc-button slot="empty">自定义空状态</wc-button>
    </wc-table>
  </div>
</div>

loading 叠加加载遮罩；data 为空时回退渲染内置 wc-empty，可用 empty 插槽覆盖。

:::: details 查看代码
::: code-group

```html [HTML]
<div style="display:flex;flex-direction:column;gap:16px;">
  <wc-table loading id="loading"></wc-table>
  <wc-table bordered id="empty"></wc-table>
  <wc-table id="emptySlot">
    <wc-button slot="empty">自定义空状态</wc-button>
  </wc-table>
</div>

<script type="module">
  const loading = document.getElementById('loading');

  const empty = document.getElementById('empty');

  const emptySlot = document.getElementById('emptySlot');

  // columns / data 为属性型（对象数组），需 JS 赋值

  const columns = [
    { key: 'name', title: '姓名', sortable: true },
    { key: 'age', title: '年龄', width: 100, align: 'right' },
    { key: 'address', title: '住址' },
  ];
  if (loading) {
    loading.columns = columns;
    loading.data = [
      { name: '张三', age: 32, address: '北京市朝阳区' },
      { name: '李四', age: 26, address: '上海市浦东新区' },
      { name: '王五', age: 41, address: '广州市天河区' },
    ];
  }
  // data 为空（默认 []）时回退空状态
  if (empty) empty.columns = columns;
  if (emptySlot) emptySlot.columns = columns;
</script>
```

```vue [Vue]
<template>
  <div style="display:flex;flex-direction:column;gap:16px;">
    <wc-table ref="loading" loading></wc-table>
    <wc-table ref="empty" bordered></wc-table>
    <wc-table ref="emptySlot">
      <wc-button slot="empty">自定义空状态</wc-button>
    </wc-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

// columns / data 为属性型（对象数组），需 JS 赋值
const loading = ref(null);
const empty = ref(null);
const emptySlot = ref(null);

onMounted(() => {
  const columns = [
    { key: 'name', title: '姓名', sortable: true },
    { key: 'age', title: '年龄', width: 100, align: 'right' },
    { key: 'address', title: '住址' },
  ];
  if (loading.value) {
    loading.value.columns = columns;
    loading.value.data = [
      { name: '张三', age: 32, address: '北京市朝阳区' },
      { name: '李四', age: 26, address: '上海市浦东新区' },
      { name: '王五', age: 41, address: '广州市天河区' },
    ];
  }
  // data 为空（默认 []）时回退空状态
  if (empty.value) empty.value.columns = columns;
  if (emptySlot.value) emptySlot.value.columns = columns;
});
</script>
```

```tsx [React]
import { WcButton, WcTable } from '@wc-kit/react';

<div style="display:flex;flex-direction:column;gap:16px;">
  <WcTable ref={loading} loading></WcTable>
  <WcTable ref={empty} bordered></WcTable>
  <WcTable ref={emptySlot}>
    <WcButton slot="empty">自定义空状态</WcButton>
  </WcTable>
</div>;

// columns / data 为属性型（对象数组），需 JS 赋值
const loading = useRef(null);
const empty = useRef(null);
const emptySlot = useRef(null);
useEffect(() => {
  const columns = [
    { key: 'name', title: '姓名', sortable: true },
    { key: 'age', title: '年龄', width: 100, align: 'right' },
    { key: 'address', title: '住址' },
  ];
  if (loading.current) {
    loading.current.columns = columns;
    loading.current.data = [
      { name: '张三', age: 32, address: '北京市朝阳区' },
      { name: '李四', age: 26, address: '上海市浦东新区' },
      { name: '王五', age: 41, address: '广州市天河区' },
    ];
  }
  // data 为空（默认 []）时回退空状态
  if (empty.current) empty.current.columns = columns;
  if (emptySlot.current) emptySlot.current.columns = columns;
}, []);
```

:::
::::

## API

### 属性

| 属性       | attribute  | 类型                             | 默认值     | 说明               |
| ---------- | ---------- | -------------------------------- | ---------- | ------------------ |
| `columns`  | `columns`  | `wcTableColumn[]`                | `[]`       | 列配置             |
| `data`     | `data`     | `wcTableRow[]`                   | `[]`       | 行数据             |
| `striped`  | `striped`  | `boolean`                        | `false`    | 斑马纹             |
| `bordered` | `bordered` | `boolean`                        | `false`    | 全边框             |
| `size`     | `size`     | `'small' \| 'medium' \| 'large'` | `'medium'` | 密度               |
| `loading`  | `loading`  | `boolean`                        | `false`    | 加载中（叠加遮罩） |

### 事件

| 事件           | 说明                                           |
| -------------- | ---------------------------------------------- |
| `wc-sort`      | 点击可排序列头后派发（detail: { key, order }） |
| `wc-row-click` | 点击数据行后派发（detail: { row, index }）     |

### 插槽

| 名称    | 说明                        |
| ------- | --------------------------- |
| `empty` | 空状态（默认渲染 wc-empty） |

### CSS Parts

`wrapper` / `table` / `head` / `body` / `sort` / `empty` / `loading`
