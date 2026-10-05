# Breadcrumb 面包屑

面包屑组件。子条目用 light-DOM 的 `<wc-breadcrumb-item>` 声明，条目文本即显示内容；
最后一项自动渲染为当前页（aria-current="page"，不可点击），中间项可点击并派发 wc-select
（detail: { index, label, href }），带 href 的条目渲染为原生 `<a>`（点击后正常跳转），disabled 条目不可交互。

主要 API：

- wc-breadcrumb：separator（分隔符文本，默认 /）；事件 wc-select（detail: { index, label, href }）
- wc-breadcrumb-item：href（目标链接）/ disabled（禁用）

React 用法（@wc-kit/react 包装组件）：

```tsx
import { WcBreadcrumb, WcBreadcrumbItem } from '@wc-kit/react';

export default function Demo() {
  return (
    <WcBreadcrumb separator="/" onWcSelect={(e) => console.log(e.detail)}>
      <WcBreadcrumbItem href="/">首页</WcBreadcrumbItem>
      <WcBreadcrumbItem href="/list">列表</WcBreadcrumbItem>
      <WcBreadcrumbItem>详情</WcBreadcrumbItem>
    </WcBreadcrumb>
  );
}
```

Vue 用法（原生标签，@wc-kit/vue 提供类型增强）：

```vue
<template>
  <wc-breadcrumb separator="/" @wc-select="(e) => console.log(e.detail)">
    <wc-breadcrumb-item href="/">首页</wc-breadcrumb-item>
    <wc-breadcrumb-item href="/list">列表</wc-breadcrumb-item>
    <wc-breadcrumb-item>详情</wc-breadcrumb-item>
  </wc-breadcrumb>
</template>
```

## 示例

### 无链接条目

<div class="demo-block">

<wc-breadcrumb>
      <wc-breadcrumb-item>一级页面</wc-breadcrumb-item>
      <wc-breadcrumb-item>二级页面</wc-breadcrumb-item>
      <wc-breadcrumb-item>当前页面</wc-breadcrumb-item>
    </wc-breadcrumb>

</div>

<details><summary>查看代码</summary>

```html
<wc-breadcrumb>
  <wc-breadcrumb-item>一级页面</wc-breadcrumb-item>
  <wc-breadcrumb-item>二级页面</wc-breadcrumb-item>
  <wc-breadcrumb-item>当前页面</wc-breadcrumb-item>
</wc-breadcrumb>
```

</details>

### 自定义分隔符

<div class="demo-block">

<div style="display:grid;gap:16px;">
      <wc-breadcrumb separator=">">
        <wc-breadcrumb-item href="/">首页</wc-breadcrumb-item>
        <wc-breadcrumb-item href="/list">列表</wc-breadcrumb-item>
        <wc-breadcrumb-item>详情</wc-breadcrumb-item>
      </wc-breadcrumb>
      <wc-breadcrumb separator="·">
        <wc-breadcrumb-item href="/">首页</wc-breadcrumb-item>
        <wc-breadcrumb-item href="/list">列表</wc-breadcrumb-item>
        <wc-breadcrumb-item>详情</wc-breadcrumb-item>
      </wc-breadcrumb>
    </div>

</div>

<details><summary>查看代码</summary>

```html
<div style="display:grid;gap:16px;">
  <wc-breadcrumb separator=">">
    <wc-breadcrumb-item href="/">首页</wc-breadcrumb-item>
    <wc-breadcrumb-item href="/list">列表</wc-breadcrumb-item>
    <wc-breadcrumb-item>详情</wc-breadcrumb-item>
  </wc-breadcrumb>
  <wc-breadcrumb separator="·">
    <wc-breadcrumb-item href="/">首页</wc-breadcrumb-item>
    <wc-breadcrumb-item href="/list">列表</wc-breadcrumb-item>
    <wc-breadcrumb-item>详情</wc-breadcrumb-item>
  </wc-breadcrumb>
</div>
```

</details>

### 禁用项

<div class="demo-block">

<wc-breadcrumb>
      <wc-breadcrumb-item href="/">首页</wc-breadcrumb-item>
      <wc-breadcrumb-item href="/list" disabled>列表</wc-breadcrumb-item>
      <wc-breadcrumb-item>详情</wc-breadcrumb-item>
    </wc-breadcrumb>

</div>

<details><summary>查看代码</summary>

```html
<wc-breadcrumb>
  <wc-breadcrumb-item href="/">首页</wc-breadcrumb-item>
  <wc-breadcrumb-item href="/list" disabled>列表</wc-breadcrumb-item>
  <wc-breadcrumb-item>详情</wc-breadcrumb-item>
</wc-breadcrumb>
```

</details>

## API

### 属性

| 属性        | attribute   | 类型     | 默认值 | 说明       |
| ----------- | ----------- | -------- | ------ | ---------- |
| `separator` | `separator` | `string` | `'/'`  | 分隔符文本 |

### 事件

| 事件        | 说明                                               |
| ----------- | -------------------------------------------------- |
| `wc-select` | 点击中间项时派发（detail: { index, label, href }） |

### CSS Parts

`nav` / `list` / `item` / `separator` / `link` / `current`
