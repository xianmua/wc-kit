# Divider 分隔线

分隔线组件。水平模式为默认形态，可在插槽中携带文案（文案位置由 align 控制，无文案时渲染通栏直线）；设置 vertical 后渲染竖向分隔线，插槽内容会被忽略。

主要 API：`dashed` 虚线、`align` 文案位置（left / center / right，默认 center）、`vertical` 竖向分隔。无自定义事件。

React 用法（`@wc-kit/react` 包装组件）：

```tsx
import { WcDivider } from '@wc-kit/react';

<WcDivider>或者</WcDivider>
<WcDivider dashed align="left">标题</WcDivider>
<WcDivider vertical />
```

Vue 用法（`@wc-kit/vue` 为纯类型增强包，直接使用原生标签）：

```vue
<template>
  <wc-divider>或者</wc-divider>
  <wc-divider dashed align="left">标题</wc-divider>
  <wc-divider vertical></wc-divider>
</template>
```

## 示例

### 文案位置

<div class="demo-block">

<div style="display:flex;flex-direction:column;gap:16px;">
      <wc-divider align="left">左</wc-divider>
      <wc-divider align="center">中</wc-divider>
      <wc-divider align="right">右</wc-divider>
    </div>

</div>

<details><summary>查看代码</summary>

```html
<div style="display:flex;flex-direction:column;gap:16px;">
  <wc-divider align="left">左</wc-divider>
  <wc-divider align="center">中</wc-divider>
  <wc-divider align="right">右</wc-divider>
</div>
```

</details>

### 虚线

<div class="demo-block">

<div style="display:flex;flex-direction:column;gap:16px;">
      <wc-divider dashed>虚线 + 文案</wc-divider>
      <wc-divider dashed></wc-divider>
    </div>

</div>

<details><summary>查看代码</summary>

```html
<div style="display:flex;flex-direction:column;gap:16px;">
  <wc-divider dashed>虚线 + 文案</wc-divider>
  <wc-divider dashed></wc-divider>
</div>
```

</details>

### 竖向分隔线

<div class="demo-block">

<div style="display:flex;gap:12px;align-items:center;">
      <span>首页</span>
      <wc-divider vertical></wc-divider>
      <span>列表</span>
      <wc-divider vertical></wc-divider>
      <wc-button type="text">详情</wc-button>
    </div>

</div>

<details><summary>查看代码</summary>

```html
<div style="display:flex;gap:12px;align-items:center;">
  <span>首页</span>
  <wc-divider vertical></wc-divider>
  <span>列表</span>
  <wc-divider vertical></wc-divider>
  <wc-button type="text">详情</wc-button>
</div>
```

</details>

## API

### 属性

| 属性       | attribute  | 类型                            | 默认值     | 说明               |
| ---------- | ---------- | ------------------------------- | ---------- | ------------------ |
| `dashed`   | `dashed`   | `boolean`                       | `false`    | 虚线               |
| `align`    | `align`    | `'left' \| 'center' \| 'right'` | `'center'` | 水平模式下文案位置 |
| `vertical` | `vertical` | `boolean`                       | `false`    | 竖向分隔线         |

### 插槽

| 名称     | 说明       |
| -------- | ---------- |
| （默认） | 分隔线文案 |

### CSS Parts

`base` / `line`
