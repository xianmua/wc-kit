# Pagination 分页

分页组件。由 total / page-size 推导总页数，页码过多时按 folded-page-count 折叠为
「1 … 中间窗口 … 末页」。切换页码（点击、前后翻页、跳页输入框按 Enter）后派发 wc-change
（detail: { current, previous }）；total / page-size 变化导致当前页越界时静默夹紧（不派发事件）。

主要 API：

- wc-pagination：total（总条数）/ page-size（每页条数，默认 10）/ current（当前页，1 开始）/
  folded-page-count（折叠窗口页码数，默认 5）/ show-total（显示总条数）/ show-jumper（显示跳页输入框）/
  show-size-changer（显示每页条数选择器）/ page-size-options（条数可选项，默认 '10,20,50,100'）/
  simple（极简模式）/ disabled（整体禁用）；只读 pageCount（总页数）
- 事件 wc-change（detail: { current, previous }）、wc-size-change（detail: { pageSize, previous, current }）

React 用法（@wc-kit/react 包装组件）：

```tsx
import { WcPagination } from '@wc-kit/react';

export default function Demo() {
  return (
    <WcPagination
      total={200}
      onWcChange={(e) => console.log(e.detail.current, e.detail.previous)}
    ></WcPagination>
  );
}
```

Vue 用法（原生标签，@wc-kit/vue 提供类型增强）：

```vue
<template>
  <wc-pagination :total="200" @wc-change="(e) => console.log(e.detail.current)"></wc-pagination>
</template>
```

## 示例

<script setup>
import { ref } from 'vue'

// 事件回调更新响应式文本，模板插值展示（不走 DOM textContent）
const changeDetail = ref('')

function onPageChange(e) {
  const { current, previous } = e.detail
  changeDetail.value = `wc-change detail: { current: ${current}, previous: ${previous} }`
}
</script>

### 总数与跳页

<div class="demo-block">
  <wc-pagination total="1000" current="7" show-total show-jumper></wc-pagination>
</div>

show-total 显示「共 N 条」总条数文案；show-jumper 显示跳页输入框，输入页码后按 Enter 跳转，超出有效范围的页码自动夹紧。

:::: details 查看代码
::: code-group

```html [HTML]
<wc-pagination total="1000" current="7" show-total show-jumper></wc-pagination>
```

```vue [Vue]
<template>
  <wc-pagination total="1000" current="7" show-total show-jumper></wc-pagination>
</template>
```

```tsx [React]
import { WcPagination } from '@wc-kit/react';

<WcPagination total={1000} current={7} showTotal showJumper></WcPagination>;
```

:::
::::

### 页码折叠

<div class="demo-block">
  <div style="display:grid;gap:16px;">
    <wc-pagination total="1000" folded-page-count="3"></wc-pagination>
    <wc-pagination total="1000" folded-page-count="5"></wc-pagination>
    <wc-pagination total="1000" folded-page-count="7"></wc-pagination>
  </div>
</div>

总页数 100，folded-page-count 依次为 3 / 5 / 7。总页数超过 folded-page-count + 2 时才折叠为「1 … 中间窗口 … 末页」，窗口以当前页为中心。

:::: details 查看代码
::: code-group

```html [HTML]
<div style="display:grid;gap:16px;">
  <wc-pagination total="1000" folded-page-count="3"></wc-pagination>
  <wc-pagination total="1000" folded-page-count="5"></wc-pagination>
  <wc-pagination total="1000" folded-page-count="7"></wc-pagination>
</div>
```

```vue [Vue]
<template>
  <div style="display:grid;gap:16px;">
    <wc-pagination total="1000" folded-page-count="3"></wc-pagination>
    <wc-pagination total="1000" folded-page-count="5"></wc-pagination>
    <wc-pagination total="1000" folded-page-count="7"></wc-pagination>
  </div>
</template>
```

```tsx [React]
import { WcPagination } from '@wc-kit/react';

<div style="display:grid;gap:16px;">
  <WcPagination total={1000} foldedPageCount={3}></WcPagination>
  <WcPagination total={1000} foldedPageCount={5}></WcPagination>
  <WcPagination total={1000} foldedPageCount={7}></WcPagination>
</div>;
```

:::
::::

### 每页条数选择

<div class="demo-block">
  <wc-pagination total="1000" show-total show-size-changer></wc-pagination>
</div>

`show-size-changer` 显示「N 条/页」选择器（位于总条数之后、翻页按钮之前，antd 同位置）；
`page-size-options` 自定义可选项（逗号分隔，默认 '10,20,50,100'，当前 pageSize 不在列表中时自动补入）。
切换后派发 wc-size-change（detail: { pageSize, previous, current }），当前页越界时自动夹紧到末页。

:::: details 查看代码
::: code-group

```html [HTML]
<wc-pagination total="1000" show-total show-size-changer></wc-pagination>
<wc-pagination total="1000" show-size-changer page-size-options="20,50,100"></wc-pagination>
```

```vue [Vue]
<template>
  <wc-pagination total="1000" show-total show-size-changer></wc-pagination>
  <wc-pagination total="1000" show-size-changer page-size-options="20,50,100"></wc-pagination>
</template>
```

```tsx [React]
import { WcPagination } from '@wc-kit/react';

<WcPagination total={1000} showTotal showSizeChanger></WcPagination>;
<WcPagination total={1000} showSizeChanger pageSizeOptions="20,50,100"></WcPagination>;
```

:::
::::

### 极简模式

<div class="demo-block">
  <wc-pagination total="50" simple show-total></wc-pagination>
</div>

`simple` 只保留前后翻页按钮 + 「当前页 / 总页数」快速跳转输入（antd simple 同款）。输入页码后按 Enter 或失焦跳转，越界自动夹紧、非法输入回落当前页；可与 show-total 组合。

:::: details 查看代码
::: code-group

```html [HTML]
<wc-pagination total="50" simple show-total></wc-pagination>
```

```vue [Vue]
<template>
  <wc-pagination total="50" simple show-total></wc-pagination>
</template>
```

```tsx [React]
import { WcPagination } from '@wc-kit/react';

<WcPagination total={50} simple showTotal></WcPagination>;
```

:::
::::

### 禁用

<div class="demo-block">
  <wc-pagination total="100" current="3" disabled></wc-pagination>
</div>

disabled 整体禁用：页码、前后翻页按钮与跳页输入框均不可交互。

:::: details 查看代码
::: code-group

```html [HTML]
<wc-pagination total="100" current="3" disabled></wc-pagination>
```

```vue [Vue]
<template>
  <wc-pagination total="100" current="3" disabled></wc-pagination>
</template>
```

```tsx [React]
import { WcPagination } from '@wc-kit/react';

<WcPagination total={100} current={3} disabled></WcPagination>;
```

:::
::::

### 事件处理

<div class="demo-block">
  <wc-pagination total="100" @wc-change="onPageChange"></wc-pagination>
  <p style="margin-top:8px;color:#888;">{{ changeDetail || '点击页码、前后翻页，这里会显示 wc-change 的 detail。' }}</p>
</div>

wc-change 的 detail 为 { current, previous }；仅用户主动切换页码（含跳页输入）时触发，total / page-size 变化导致的越界夹紧不触发。

:::: details 查看代码
::: code-group

```html [HTML]
<wc-pagination total="100" id="pagination"></wc-pagination>
<p id="changeTip" style="margin-top:8px;color:#888;">
  点击页码、前后翻页，这里会显示 wc-change 的 detail。
</p>

<script type="module">
  const changeTip = document.getElementById('changeTip');

  document.getElementById('pagination').addEventListener('wc-change', (e) => {
    const { current, previous } = e.detail;
    changeTip.textContent = `wc-change detail: { current: ${current}, previous: ${previous} }`;
  });
</script>
```

```vue [Vue]
<script setup lang="ts">
import { ref } from 'vue';

// 事件回调更新响应式文本，模板插值展示
const changeDetail = ref('');

function onPageChange(e) {
  const { current, previous } = e.detail;
  changeDetail.value = `wc-change detail: { current: ${current}, previous: ${previous} }`;
}
</script>

<template>
  <wc-pagination total="100" @wc-change="onPageChange"></wc-pagination>
  <p style="margin-top:8px;color:#888;">
    {{ changeDetail || '点击页码、前后翻页，这里会显示 wc-change 的 detail。' }}
  </p>
</template>
```

```tsx [React]
import { useState } from 'react';
import { WcPagination } from '@wc-kit/react';

function Demo() {
  // 事件回调更新 state，JSX 插值展示
  const [changeDetail, setChangeDetail] = useState('');

  return (
    <>
      <WcPagination
        total={100}
        onWcChange={(e) =>
          setChangeDetail(
            `wc-change detail: { current: ${e.detail.current}, previous: ${e.detail.previous} }`,
          )
        }
      ></WcPagination>
      <p style={{ marginTop: 8, color: '#888' }}>
        {changeDetail || '点击页码、前后翻页，这里会显示 wc-change 的 detail。'}
      </p>
    </>
  );
}
```

:::
::::

## API

### 属性

| 属性              | attribute           | 类型      | 默认值  | 说明                                               |
| ----------------- | ------------------- | --------- | ------- | -------------------------------------------------- |
| `total`           | `total`             | `number`  | `0`     | 数据总条数                                         |
| `pageSize`        | `page-size`         | `number`  | `10`    | 每页条数                                           |
| `current`         | `current`           | `number`  | `1`     | 当前页（1 开始）                                   |
| `foldedPageCount` | `folded-page-count` | `number`  | `5`     | 折叠时中间窗口显示的页码数量                       |
| `showTotal`       | `show-total`        | `boolean` | `false` | 显示总条数                                         |
| `showJumper`      | `show-jumper`       | `boolean` | `false` | 显示跳页输入框（Enter 跳转，自动夹紧到有效范围）   |
| `showSizeChanger` | `show-size-changer` | `boolean` | `false` | 显示每页条数选择器                                 |
| `pageSizeOptions` | `page-size-options` | `string`  | `'10,20,50,100'` | 每页条数可选项（逗号分隔）                |
| `simple`          | `simple`            | `boolean` | `false` | 极简模式：前后翻页按钮 + 「当前页/总页数」跳转输入 |
| `disabled`        | `disabled`          | `boolean` | `false` | 整体禁用                                           |

### 事件

| 事件             | 说明                                                     |
| ---------------- | -------------------------------------------------------- |
| `wc-change`      | 页码变化后触发（含用户点击与跳页输入）                   |
| `wc-size-change` | 每页条数变化后触发（show-size-changer，含夹紧后的 current） |

### CSS Parts

`nav` / `total` / `size-select` / `prev / next` / `page` / `ellipsis` / `jumper` / `jumper-input` / `simple-pager` / `simple-input`
