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
// 对象数组型属性直接模板绑定（:columns / :data），Vue 检测到同名 property 会走 property 通道

const alignColumns = [
  { key: 'name', title: '姓名', width: 120 },
  { key: 'age', title: '年龄', width: 80, align: 'right' },
  { key: 'status', title: '状态', width: 100, align: 'center' },
  { key: 'address', title: '住址', ellipsis: true },
]
const alignData = [
  { name: '张三', age: 32, status: '在职', address: '广东省深圳市南山区科技园南区高新南一道 006 号' },
  { name: '李四', age: 26, status: '离职', address: '上海市浦东新区世纪大道 100 号环球金融中心' },
]

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

const customColumns = [
  { key: 'name', title: '姓名' },
  { key: 'level', title: '等级', render: (row) => `P${row.level}` },
  { key: 'status', title: '状态', render: renderStatus },
]
const customData = [
  { name: '张三', level: 8, status: '在职' },
  { name: '李四', level: 6, status: '离职' },
]

const expandColumns = [
  { key: 'order', title: '订单号' },
  { key: 'customer', title: '客户' },
  { key: 'total', title: '金额', align: 'right' },
]
const expandData = [
  {
    order: 'SO-2026-001',
    customer: '张三',
    total: 1280,
    items: [
      { product: '机械键盘', qty: 1, price: 680 },
      { product: '无线鼠标', qty: 2, price: 300 },
    ],
  },
  {
    order: 'SO-2026-002',
    customer: '李四',
    total: 450,
    items: [{ product: '显示器支架', qty: 1, price: 450 }],
  },
]

// 展开区嵌套子表格：返回元素（也可返回 lit 模板或文本）
function expandRender(row) {
  const sub = document.createElement('wc-table')
  sub.columns = [
    { key: 'product', title: '商品' },
    { key: 'qty', title: '数量', align: 'right', width: 80 },
    { key: 'price', title: '单价', align: 'right', width: 120 },
  ]
  sub.size = 'small'
  sub.data = row.items
  return sub
}
</script>

### 列对齐与列宽

<div class="demo-block">
  <wc-table :columns="alignColumns" :data="alignData" bordered></wc-table>
</div>

列的 align 控制单元格对齐，width 控制列宽（数值 px 或任意 CSS 宽度），ellipsis 超宽省略（title 提示完整内容）。

:::: details 查看代码
::: code-group

```html [HTML]
<wc-table bordered id="table"></wc-table>

<script type="module">
  const table = document.getElementById('table');

  // attribute 只能传字符串，columns / data 是对象数组，需 JS 设 property

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
<script setup lang="ts">
// 对象数组直接绑定 :columns / :data（Vue 检测到同名 property 走 property 通道）
const columns = [
  { key: 'name', title: '姓名', width: 120 },
  { key: 'age', title: '年龄', width: 80, align: 'right' },
  { key: 'status', title: '状态', width: 100, align: 'center' },
  { key: 'address', title: '住址', ellipsis: true },
];
const data = [
  {
    name: '张三',
    age: 32,
    status: '在职',
    address: '广东省深圳市南山区科技园南区高新南一道 006 号',
  },
  { name: '李四', age: 26, status: '离职', address: '上海市浦东新区世纪大道 100 号环球金融中心' },
];
</script>

<template>
  <wc-table :columns="columns" :data="data" bordered></wc-table>
</template>
```

```tsx [React]
import { WcTable } from '@wc-kit/react';

const columns = [
  { key: 'name', title: '姓名', width: 120 },
  { key: 'age', title: '年龄', width: 80, align: 'right' },
  { key: 'status', title: '状态', width: 100, align: 'center' },
  { key: 'address', title: '住址', ellipsis: true },
];
const data = [
  {
    name: '张三',
    age: 32,
    status: '在职',
    address: '广东省深圳市南山区科技园南区高新南一道 006 号',
  },
  { name: '李四', age: 26, status: '离职', address: '上海市浦东新区世纪大道 100 号环球金融中心' },
];

<WcTable columns={columns} data={data} bordered></WcTable>;
```

:::
::::

### 斑马纹与边框

<div class="demo-block">
  <wc-table :columns="baseColumns" :data="baseData" striped bordered></wc-table>
</div>

:::: details 查看代码
::: code-group

```html [HTML]
<wc-table striped bordered id="table"></wc-table>

<script type="module">
  const table = document.getElementById('table');

  // attribute 只能传字符串，columns / data 是对象数组，需 JS 设 property

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
<script setup lang="ts">
// 对象数组直接绑定 :columns / :data（Vue 检测到同名 property 走 property 通道）
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
</script>

<template>
  <wc-table :columns="columns" :data="data" striped bordered></wc-table>
</template>
```

```tsx [React]
import { WcTable } from '@wc-kit/react';

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

<WcTable columns={columns} data={data} striped bordered></WcTable>;
```

:::
::::

### 尺寸

<div class="demo-block">
  <div style="display:flex;flex-direction:column;gap:16px;">
    <wc-table :columns="baseColumns" :data="baseData" size="small"></wc-table>
    <wc-table :columns="baseColumns" :data="baseData" size="large"></wc-table>
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

  // attribute 只能传字符串，columns / data 是对象数组，需 JS 设 property

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
<script setup lang="ts">
// 对象数组直接绑定 :columns / :data（Vue 检测到同名 property 走 property 通道）
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
</script>

<template>
  <div style="display:flex;flex-direction:column;gap:16px;">
    <wc-table :columns="columns" :data="data" size="small"></wc-table>
    <wc-table :columns="columns" :data="data" size="large"></wc-table>
  </div>
</template>
```

```tsx [React]
import { WcTable } from '@wc-kit/react';

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

<div style="display:flex;flex-direction:column;gap:16px;">
  <WcTable columns={columns} data={data} size="small"></WcTable>
  <WcTable columns={columns} data={data} size="large"></WcTable>
</div>;
```

:::
::::

### 自定义单元格

<div class="demo-block">
  <wc-table :columns="customColumns" :data="customData"></wc-table>
</div>

列配置的 render(row, index) 可返回 lit 模板或文本，覆盖默认单元格内容。

:::: details 查看代码
::: code-group

```html [HTML]
<wc-table id="table"></wc-table>

<script type="module">
  const table = document.getElementById('table');

  // attribute 只能传字符串，columns / data 是对象数组，需 JS 设 property

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
<script setup lang="tsx">
// 对象数组（含 render 函数）直接绑定 :columns / :data
const columns = [
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
const data = [
  { name: '张三', level: 8, status: '在职' },
  { name: '李四', level: 6, status: '离职' },
];
</script>

<template>
  <wc-table :columns="columns" :data="data"></wc-table>
</template>
```

```tsx [React]
import { WcTable } from '@wc-kit/react';

const columns = [
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
const data = [
  { name: '张三', level: 8, status: '在职' },
  { name: '李四', level: 6, status: '离职' },
];

<WcTable columns={columns} data={data}></WcTable>;
```

:::
::::

### 加载与空状态

<div class="demo-block">
  <div style="display:flex;flex-direction:column;gap:16px;">
    <wc-table :columns="baseColumns" :data="baseData" loading></wc-table>
    <wc-table :columns="baseColumns" bordered></wc-table>
    <wc-table :columns="baseColumns">
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

  // attribute 只能传字符串，columns / data 是对象数组，需 JS 设 property

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
<script setup lang="ts">
// 对象数组直接绑定 :columns / :data（Vue 检测到同名 property 走 property 通道）
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
</script>

<template>
  <div style="display:flex;flex-direction:column;gap:16px;">
    <wc-table :columns="columns" :data="data" loading></wc-table>
    <!-- data 为空（默认 []）时回退空状态 -->
    <wc-table :columns="columns" bordered></wc-table>
    <wc-table :columns="columns">
      <wc-button slot="empty">自定义空状态</wc-button>
    </wc-table>
  </div>
</template>
```

```tsx [React]
import { WcButton, WcTable } from '@wc-kit/react';

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

<div style="display:flex;flex-direction:column;gap:16px;">
  <WcTable columns={columns} data={data} loading></WcTable>
  {/* data 为空（默认 []）时回退空状态 */}
  <WcTable columns={columns} bordered></WcTable>
  <WcTable columns={columns}>
    <WcButton slot="empty">自定义空状态</WcButton>
  </WcTable>
</div>;
```

:::
::::

### 展开行子表格

<div class="demo-block">
  <wc-table
    :columns="expandColumns"
    :data="expandData"
    row-key="order"
    :expandedRowRender="expandRender"
  ></wc-table>
</div>

设置 `expandedRowRender(row, index)` 后首列出现展开箭头，展开区可渲染任意内容
（嵌套子表格、详情表单等），返回 lit 模板、DOM 元素或文本。`rowExpandable`
可按行禁用展开；`rowKey` 指定行唯一键字段，排序后展开状态跟随行不错位。

:::: details 查看代码
::: code-group

```html [HTML]
<wc-table id="table"></wc-table>

<script type="module">
  const table = document.getElementById('table');

  table.columns = [
    { key: 'order', title: '订单号' },
    { key: 'customer', title: '客户' },
    { key: 'total', title: '金额', align: 'right' },
  ];
  table.data = [
    {
      order: 'SO-2026-001',
      customer: '张三',
      total: 1280,
      items: [
        { product: '机械键盘', qty: 1, price: 680 },
        { product: '无线鼠标', qty: 2, price: 300 },
      ],
    },
    {
      order: 'SO-2026-002',
      customer: '李四',
      total: 450,
      items: [{ product: '显示器支架', qty: 1, price: 450 }],
    },
  ];

  // 展开区嵌套子表格：返回 DOM 元素（也可返回 lit 模板）
  table.expandedRowRender = (row) => {
    const sub = document.createElement('wc-table');
    sub.columns = [
      { key: 'product', title: '商品' },
      { key: 'qty', title: '数量', align: 'right', width: 80 },
      { key: 'price', title: '单价', align: 'right', width: 120 },
    ];
    sub.size = 'small';
    sub.data = row.items;
    return sub;
  };
</script>
```

```vue [Vue]
<script setup lang="tsx">
// 对象数组（含 render / expandedRowRender 函数）直接绑定
const columns = [
  { key: 'order', title: '订单号' },
  { key: 'customer', title: '客户' },
  { key: 'total', title: '金额', align: 'right' },
];
const data = [
  {
    order: 'SO-2026-001',
    customer: '张三',
    total: 1280,
    items: [
      { product: '机械键盘', qty: 1, price: 680 },
      { product: '无线鼠标', qty: 2, price: 300 },
    ],
  },
  {
    order: 'SO-2026-002',
    customer: '李四',
    total: 450,
    items: [{ product: '显示器支架', qty: 1, price: 450 }],
  },
];

// 展开区嵌套子表格：返回 DOM 元素（也可返回 lit 模板或文本）
function expandedRowRender(row) {
  const sub = document.createElement('wc-table');
  sub.columns = [
    { key: 'product', title: '商品' },
    { key: 'qty', title: '数量', align: 'right', width: 80 },
    { key: 'price', title: '单价', align: 'right', width: 120 },
  ];
  sub.size = 'small';
  sub.data = row.items;
  return sub;
}
</script>

<template>
  <wc-table
    :columns="columns"
    :data="data"
    row-key="order"
    :expandedRowRender="expandedRowRender"
  ></wc-table>
</template>
```

```tsx [React]
import { WcTable } from '@wc-kit/react';

const columns = [
  { key: 'order', title: '订单号' },
  { key: 'customer', title: '客户' },
  { key: 'total', title: '金额', align: 'right' },
];
const data = [
  {
    order: 'SO-2026-001',
    customer: '张三',
    total: 1280,
    items: [
      { product: '机械键盘', qty: 1, price: 680 },
      { product: '无线鼠标', qty: 2, price: 300 },
    ],
  },
  {
    order: 'SO-2026-002',
    customer: '李四',
    total: 450,
    items: [{ product: '显示器支架', qty: 1, price: 450 }],
  },
];

// 展开区嵌套子表格：返回 DOM 元素（也可返回 lit 模板）
function expandedRowRender(row) {
  const sub = document.createElement('wc-table');
  sub.columns = [
    { key: 'product', title: '商品' },
    { key: 'qty', title: '数量', align: 'right', width: 80 },
    { key: 'price', title: '单价', align: 'right', width: 120 },
  ];
  sub.size = 'small';
  sub.data = row.items;
  return sub;
}

<WcTable
  columns={columns}
  data={data}
  rowKey="order"
  expandedRowRender={expandedRowRender}
></WcTable>;
```

:::
::::

## API

### 属性

| 属性                     | attribute             | 类型                                       | 默认值     | 说明                                      |
| ------------------------ | --------------------- | ------------------------------------------ | ---------- | ----------------------------------------- |
| `columns`                | `columns`             | `wcTableColumn[]`                          | `[]`       | 列配置                                    |
| `data`                   | `data`                | `wcTableRow[]`                             | `[]`       | 行数据                                    |
| `striped`                | `striped`             | `boolean`                                  | `false`    | 斑马纹                                    |
| `bordered`               | `bordered`            | `boolean`                                  | `false`    | 全边框                                    |
| `size`                   | `size`                | `'small' \| 'medium' \| 'large'`           | `'medium'` | 密度                                      |
| `loading`                | `loading`             | `boolean`                                  | `false`    | 加载中（叠加遮罩）                        |
| `rowKey`                 | `row-key`             | `string`                                   | `''`       | 行唯一键字段名（展开状态跟踪用）          |
| `expandRowByClick`       | `expand-row-by-click` | `boolean`                                  | `false`    | 点击行即切换展开（antd expandRowByClick） |
| `defaultExpandedRowKeys` | —（仅 JS 属性）       | `(string \| object)[]`                     | `[]`       | 初始展开行的键集合（非受控）              |
| `expandedRowKeys`        | —（仅 JS 属性）       | `(string \| object)[] \| null`             | `null`     | 受控展开行集合；null = 非受控内部自管     |
| `columnWidth`            | —（仅 JS 属性）       | `number \| string`                         | `48`       | 展开列宽（antd columnWidth）              |
| `expandedRowRender`      | —（仅 JS 属性）       | `(row, index) => TemplateResult \| string` | —          | 展开区渲染函数，设置后出现展开列          |
| `rowExpandable`          | —（仅 JS 属性）       | `(row, index) => boolean`                  | —          | 判断行是否可展开（默认全部可展开）        |

### 事件

| 事件                      | 说明                                                                           |
| ------------------------- | ------------------------------------------------------------------------------ |
| `wc-sort`                 | 点击可排序列头后派发（detail: { key, order }）                                 |
| `wc-row-click`            | 点击数据行后派发（detail: { row, index }）                                     |
| `wc-expand`               | 行展开/收起后派发（detail: { row, index, expanded }）                          |
| `wc-expanded-rows-change` | 展开行集合变化后派发（detail: 展开键数组，受控模式据此回写 `expandedRowKeys`） |

### 插槽

| 名称    | 说明                        |
| ------- | --------------------------- |
| `empty` | 空状态（默认渲染 wc-empty） |

### CSS Parts

`wrapper` / `table` / `head` / `body` / `sort` / `expand` / `expanded-row` / `empty` / `loading`
