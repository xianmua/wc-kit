# Segmented 分段控制器

在一组互斥选项中切换单个值（参考 antd Segmented）：浅灰轨道 + 白色滑块动画，支持尺寸、禁用（整体/单项）、等分宽度（block）。

React 用法（`@wc-kit/react` 包装组件）：

```tsx
import { WcSegmented, WcSegmentedItem } from '@wc-kit/react';

<WcSegmented value="weekly" onWcChange={(e) => console.log(e.detail.value)}>
  <WcSegmentedItem value="daily">日</WcSegmentedItem>
  <WcSegmentedItem value="weekly">周</WcSegmentedItem>
</WcSegmented>;
```

Vue 用法（`@wc-kit/vue` 为纯类型增强包，直接使用原生标签）：

```vue
<template>
  <wc-segmented value="weekly" @wc-change="onChange">
    <wc-segmented-item value="daily">日</wc-segmented-item>
    <wc-segmented-item value="weekly">周</wc-segmented-item>
  </wc-segmented>
</template>
```

## 示例

### 基础用法

`value` 指定选中项；点击切换并派发 `wc-change`；支持方向键循环切换（自动跳过禁用项）。

<div class="demo-block">
  <wc-segmented value="weekly">
    <wc-segmented-item value="daily">日</wc-segmented-item>
    <wc-segmented-item value="weekly">周</wc-segmented-item>
    <wc-segmented-item value="monthly" disabled>月</wc-segmented-item>
    <wc-segmented-item value="quarterly">季</wc-segmented-item>
    <wc-segmented-item value="yearly">年</wc-segmented-item>
  </wc-segmented>
</div>

:::: details 查看代码
::: code-group

```html [HTML]
<wc-segmented value="weekly">
  <wc-segmented-item value="daily">日</wc-segmented-item>
  <wc-segmented-item value="weekly">周</wc-segmented-item>
  <wc-segmented-item value="monthly" disabled>月</wc-segmented-item>
  <wc-segmented-item value="quarterly">季</wc-segmented-item>
  <wc-segmented-item value="yearly">年</wc-segmented-item>
</wc-segmented>
```

```vue [Vue]
<template>
  <wc-segmented value="weekly">
    <wc-segmented-item value="daily">日</wc-segmented-item>
    <wc-segmented-item value="weekly">周</wc-segmented-item>
    <wc-segmented-item value="monthly" disabled>月</wc-segmented-item>
    <wc-segmented-item value="quarterly">季</wc-segmented-item>
    <wc-segmented-item value="yearly">年</wc-segmented-item>
  </wc-segmented>
</template>
```

```tsx [React]
import { WcSegmented, WcSegmentedItem } from '@wc-kit/react';

<WcSegmented value="weekly">
  <WcSegmentedItem value="daily">日</WcSegmentedItem>
  <WcSegmentedItem value="weekly">周</WcSegmentedItem>
  <WcSegmentedItem value="monthly" disabled>
    月
  </WcSegmentedItem>
  <WcSegmentedItem value="quarterly">季</WcSegmentedItem>
  <WcSegmentedItem value="yearly">年</WcSegmentedItem>
</WcSegmented>;
```

:::
::::

### 宽度撑满

`block` 使容器占满父宽度，子项等分。

<div class="demo-block">
  <wc-segmented value="b" block style="max-width: 480px;">
    <wc-segmented-item value="a">左</wc-segmented-item>
    <wc-segmented-item value="b">中</wc-segmented-item>
    <wc-segmented-item value="c">右</wc-segmented-item>
  </wc-segmented>
</div>

:::: details 查看代码
::: code-group

```html [HTML]
<wc-segmented value="b" block style="max-width: 480px;">
  <wc-segmented-item value="a">左</wc-segmented-item>
  <wc-segmented-item value="b">中</wc-segmented-item>
  <wc-segmented-item value="c">右</wc-segmented-item>
</wc-segmented>
```

```vue [Vue]
<template>
  <wc-segmented value="b" block style="max-width: 480px">
    <wc-segmented-item value="a">左</wc-segmented-item>
    <wc-segmented-item value="b">中</wc-segmented-item>
    <wc-segmented-item value="c">右</wc-segmented-item>
  </wc-segmented>
</template>
```

```tsx [React]
import { WcSegmented, WcSegmentedItem } from '@wc-kit/react';

<WcSegmented value="b" block>
  <WcSegmentedItem value="a">左</WcSegmentedItem>
  <WcSegmentedItem value="b">中</WcSegmentedItem>
  <WcSegmentedItem value="c">右</WcSegmentedItem>
</WcSegmented>;
```

:::
::::

### 尺寸与禁用

`size` 支持 `small` / `middle`（默认）/ `large`；`disabled` 整体禁用。

<div class="demo-block">
  <div style="display: flex; flex-direction: column; gap: 12px; align-items: flex-start;">
    <wc-segmented size="small" value="map">
      <wc-segmented-item value="list">列表</wc-segmented-item>
      <wc-segmented-item value="map">地图</wc-segmented-item>
    </wc-segmented>
    <wc-segmented size="large" value="list">
      <wc-segmented-item value="list">列表</wc-segmented-item>
      <wc-segmented-item value="map">地图</wc-segmented-item>
    </wc-segmented>
    <wc-segmented value="map" disabled>
      <wc-segmented-item value="list">列表</wc-segmented-item>
      <wc-segmented-item value="map">地图</wc-segmented-item>
    </wc-segmented>
  </div>
</div>

:::: details 查看代码
::: code-group

```html [HTML]
<wc-segmented size="small" value="map">
  <wc-segmented-item value="list">列表</wc-segmented-item>
  <wc-segmented-item value="map">地图</wc-segmented-item>
</wc-segmented>
<wc-segmented size="large" value="list">
  <wc-segmented-item value="list">列表</wc-segmented-item>
  <wc-segmented-item value="map">地图</wc-segmented-item>
</wc-segmented>
<wc-segmented value="map" disabled>
  <wc-segmented-item value="list">列表</wc-segmented-item>
  <wc-segmented-item value="map">地图</wc-segmented-item>
</wc-segmented>
```

```vue [Vue]
<template>
  <wc-segmented size="small" value="map">
    <wc-segmented-item value="list">列表</wc-segmented-item>
    <wc-segmented-item value="map">地图</wc-segmented-item>
  </wc-segmented>
  <wc-segmented size="large" value="list">
    <wc-segmented-item value="list">列表</wc-segmented-item>
    <wc-segmented-item value="map">地图</wc-segmented-item>
  </wc-segmented>
  <wc-segmented value="map" disabled>
    <wc-segmented-item value="list">列表</wc-segmented-item>
    <wc-segmented-item value="map">地图</wc-segmented-item>
  </wc-segmented>
</template>
```

```tsx [React]
import { WcSegmented, WcSegmentedItem } from '@wc-kit/react';

<WcSegmented size="small" value="map">
  ...
</WcSegmented>;
<WcSegmented size="large" value="list">
  ...
</WcSegmented>;
<WcSegmented value="map" disabled>
  ...
</WcSegmented>;
```

:::
::::

## API

### wc-segmented

| 属性       | 属性名     | 类型                             | 默认值   | 说明                                        |
| ---------- | ---------- | -------------------------------- | -------- | ------------------------------------------- |
| `value`    | `value`    | `string`                         | `''`     | 当前选中的值（子项 value 优先，缺省用文案） |
| `size`     | `size`     | `'small' \| 'middle' \| 'large'` | `middle` | 尺寸                                        |
| `block`    | `block`    | `boolean`                        | `false`  | 宽度撑满父容器，子项等分                    |
| `disabled` | `disabled` | `boolean`                        | `false`  | 整体禁用                                    |

### wc-segmented-item

| 属性       | 属性名     | 类型      | 默认值  | 说明                 |
| ---------- | ---------- | --------- | ------- | -------------------- |
| `value`    | `value`    | `string`  | `''`    | 选项值（缺省用文案） |
| `disabled` | `disabled` | `boolean` | `false` | 禁用选项             |

### 事件

| 事件        | 说明             | detail      |
| ----------- | ---------------- | ----------- |
| `wc-change` | 选中值变化后触发 | `{ value }` |

### 插槽

| 名称     | 归属              | 说明                   |
| -------- | ----------------- | ---------------------- |
| （默认） | wc-segmented-item | 选项内容               |
| （默认） | wc-segmented      | wc-segmented-item 选项 |

### CSS Parts

`base` / `thumb`（wc-segmented）；`item`（wc-segmented-item）

### CSS 变量

| 变量                      | 说明                                     |
| ------------------------- | ---------------------------------------- |
| `--wc-segmented-bg`       | 轨道底色（默认 --wc-color-bg-hover）     |
| `--wc-segmented-thumb-bg` | 滑块底色（默认 --wc-color-bg-container） |
