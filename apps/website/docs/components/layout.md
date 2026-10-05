# Layout 布局

页面级整体布局骨架（antd Layout 对齐）：`wc-layout` 为容器，配合 `wc-layout-header`（头部）、`wc-layout-sider`（侧边栏）、`wc-layout-content`（内容）、`wc-layout-footer`（底部）使用。

`wc-layout` 默认纵向排列（flex-direction: column）；检测到 `wc-layout-sider` 子元素时自动横向排列，也可用 `has-sider` 属性强制。子元素为轻 DOM，flex 直接作用于各区块，支持任意嵌套。

24 栅格（行/列）请看 [Grid 栅格](/components/row)。

React 用法（`@wc-kit/react` 包装组件）：

```tsx
import { WcLayout, WcLayoutHeader, WcLayoutContent, WcLayoutFooter } from '@wc-kit/react';

<WcLayout>
  <WcLayoutHeader>Header</WcLayoutHeader>
  <WcLayoutContent>Content</WcLayoutContent>
  <WcLayoutFooter>Footer</WcLayoutFooter>
</WcLayout>;
```

Vue 用法（`@wc-kit/vue` 为纯类型增强包，直接使用原生标签）：

```vue
<template>
  <wc-layout>
    <wc-layout-header>Header</wc-layout-header>
    <wc-layout-content>Content</wc-layout-content>
    <wc-layout-footer>Footer</wc-layout-footer>
  </wc-layout>
</template>
```

## 示例

### 基础布局

经典的「上 - 中 - 下」结构。

<div class="demo-block">
  <wc-layout style="height:220px;text-align:center;">
    <wc-layout-header style="background:var(--wc-color-gray-200);">Header</wc-layout-header>
    <wc-layout-content style="background:var(--wc-color-bg-container);">Content</wc-layout-content>
    <wc-layout-footer style="background:var(--wc-color-gray-200);">Footer</wc-layout-footer>
  </wc-layout>
</div>

:::: details 查看代码
::: code-group

```html [HTML]
<wc-layout style="height:220px;text-align:center;">
  <wc-layout-header style="background:var(--wc-color-gray-200);">Header</wc-layout-header>
  <wc-layout-content style="background:var(--wc-color-bg-container);">Content</wc-layout-content>
  <wc-layout-footer style="background:var(--wc-color-gray-200);">Footer</wc-layout-footer>
</wc-layout>
```

```vue [Vue]
<template>
  <wc-layout style="height:220px;text-align:center;">
    <wc-layout-header style="background:var(--wc-color-gray-200);">Header</wc-layout-header>
    <wc-layout-content style="background:var(--wc-color-bg-container);">Content</wc-layout-content>
    <wc-layout-footer style="background:var(--wc-color-gray-200);">Footer</wc-layout-footer>
  </wc-layout>
</template>
```

```tsx [React]
import { WcLayout, WcLayoutContent, WcLayoutFooter, WcLayoutHeader } from '@wc-kit/react';

<WcLayout style={{ height: 220, textAlign: 'center' }}>
  <WcLayoutHeader style={{ background: 'var(--wc-color-gray-200)' }}>Header</WcLayoutHeader>
  <WcLayoutContent style={{ background: 'var(--wc-color-bg-container)' }}>Content</WcLayoutContent>
  <WcLayoutFooter style={{ background: 'var(--wc-color-gray-200)' }}>Footer</WcLayoutFooter>
</WcLayout>;
```

:::
::::

### 侧边布局

`wc-layout-sider` 出现时外层自动横向；内容区再嵌套一层 `wc-layout` 承载 header / content / footer。

<div class="demo-block">
  <wc-layout style="height:220px;text-align:center;">
    <wc-layout-header style="background:var(--wc-color-gray-200);">Header</wc-layout-header>
    <wc-layout>
      <wc-layout-sider style="color:#fff;">Sider</wc-layout-sider>
      <wc-layout-content style="background:var(--wc-color-bg-container);">Content</wc-layout-content>
    </wc-layout>
    <wc-layout-footer style="background:var(--wc-color-gray-200);">Footer</wc-layout-footer>
  </wc-layout>
</div>

:::: details 查看代码
::: code-group

```html [HTML]
<wc-layout style="height:220px;text-align:center;">
  <wc-layout-header style="background:var(--wc-color-gray-200);">Header</wc-layout-header>
  <wc-layout>
    <wc-layout-sider style="color:#fff;">Sider</wc-layout-sider>
    <wc-layout-content style="background:var(--wc-color-bg-container);">Content</wc-layout-content>
  </wc-layout>
  <wc-layout-footer style="background:var(--wc-color-gray-200);">Footer</wc-layout-footer>
</wc-layout>
```

```vue [Vue]
<template>
  <wc-layout style="height:220px;text-align:center;">
    <wc-layout-header style="background:var(--wc-color-gray-200);">Header</wc-layout-header>
    <wc-layout>
      <wc-layout-sider style="color:#fff;">Sider</wc-layout-sider>
      <wc-layout-content style="background:var(--wc-color-bg-container);">Content</wc-layout-content>
    </wc-layout>
    <wc-layout-footer style="background:var(--wc-color-gray-200);">Footer</wc-layout-footer>
  </wc-layout>
</template>
```

```tsx [React]
import { WcLayout, WcLayoutContent, WcLayoutFooter, WcLayoutHeader, WcLayoutSider } from '@wc-kit/react';

<WcLayout style={{ height: 220, textAlign: 'center' }}>
  <WcLayoutHeader style={{ background: 'var(--wc-color-gray-200)' }}>Header</WcLayoutHeader>
  <WcLayout>
    <WcLayoutSider style={{ color: '#fff' }}>Sider</WcLayoutSider>
    <WcLayoutContent style={{ background: 'var(--wc-color-bg-container)' }}>Content</WcLayoutContent>
  </WcLayout>
  <WcLayoutFooter style={{ background: 'var(--wc-color-gray-200)' }}>Footer</WcLayoutFooter>
</WcLayout>;
```

:::
::::

### 可折叠侧边栏

`collapsible` 开启后在底部显示触发器；`collapsed-width="0"` 折叠时完全隐藏；`breakpoint` 让视口低于断点时自动折叠（派发 `wc-collapse`）。

<div class="demo-block">
  <wc-layout style="height:220px;text-align:center;">
    <wc-layout-sider collapsible collapsed-width="0" style="color:#fff;">
      <div style="padding:12px;">菜单</div>
    </wc-layout-sider>
    <wc-layout>
      <wc-layout-header style="background:var(--wc-color-gray-200);">Header</wc-layout-header>
      <wc-layout-content style="background:var(--wc-color-bg-container);">Content</wc-layout-content>
    </wc-layout>
  </wc-layout>
</div>

:::: details 查看代码
::: code-group

```html [HTML]
<wc-layout style="height:220px;text-align:center;">
  <wc-layout-sider collapsible collapsed-width="0" style="color:#fff;">
    <div style="padding:12px;">菜单</div>
  </wc-layout-sider>
  <wc-layout>
    <wc-layout-header style="background:var(--wc-color-gray-200);">Header</wc-layout-header>
    <wc-layout-content style="background:var(--wc-color-bg-container);">Content</wc-layout-content>
  </wc-layout>
</wc-layout>
```

```vue [Vue]
<template>
  <wc-layout style="height:220px;text-align:center;">
    <wc-layout-sider collapsible :collapsed-width="0" style="color:#fff;">
      <div style="padding:12px;">菜单</div>
    </wc-layout-sider>
    <wc-layout>
      <wc-layout-header style="background:var(--wc-color-gray-200);">Header</wc-layout-header>
      <wc-layout-content style="background:var(--wc-color-bg-container);">Content</wc-layout-content>
    </wc-layout>
  </wc-layout>
</template>
```

```tsx [React]
import { WcLayout, WcLayoutContent, WcLayoutHeader, WcLayoutSider } from '@wc-kit/react';

<WcLayout style={{ height: 220, textAlign: 'center' }}>
  <WcLayoutSider collapsible collapsedWidth={0} style={{ color: '#fff' }}>
    <div style={{ padding: 12 }}>菜单</div>
  </WcLayoutSider>
  <WcLayout>
    <WcLayoutHeader style={{ background: 'var(--wc-color-gray-200)' }}>Header</WcLayoutHeader>
    <WcLayoutContent style={{ background: 'var(--wc-color-bg-container)' }}>Content</WcLayoutContent>
  </WcLayout>
</WcLayout>;
```

:::
::::

浅色主题侧边栏：`theme="light"`（默认 dark）。

## API

### wc-layout

| 属性        | attribute   | 类型      | 默认值  | 说明                                   |
| ----------- | ----------- | --------- | ------- | -------------------------------------- |
| `hasSider`  | `has-sider` | `boolean` | `false` | 强制横向排列（默认检测到 sider 时自动） |

### wc-layout-sider

| 属性             | attribute         | 类型                                                          | 默认值   | 说明                                       |
| ---------------- | ----------------- | ------------------------------------------------------------- | -------- | ------------------------------------------ |
| `collapsible`    | `collapsible`     | `boolean`                                                     | `false`  | 开启折叠能力（显示默认触发器）             |
| `collapsed`      | `collapsed`       | `boolean`                                                     | `false`  | 当前是否折叠                               |
| `breakpoint`     | `breakpoint`      | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'xxl'`               | `'lg'`   | 视口低于断点时自动折叠                     |
| `width`          | `width`           | `number`                                                      | `200`    | 展开宽度（px）                             |
| `collapsedWidth` | `collapsed-width` | `number`                                                      | `80`     | 折叠宽度（px），设为 0 时完全隐藏          |
| `theme`          | `theme`           | `'dark' \| 'light'`                                           | `'dark'` | 主题                                       |

### 事件

| 名称         | 说明                                   | detail                    |
| ------------ | -------------------------------------- | ------------------------- |
| `wc-collapse` | 折叠状态变化（触发器点击 / 断点变化） | `{ isCollapsed: boolean }` |

### 插槽

| 名称      | 说明                             |
| --------- | -------------------------------- |
| （默认）  | 各区块内容                       |
| `trigger` | 自定义折叠触发器内容（仅 sider） |

### CSS 自定义属性

| 名称                                 | 说明                                    |
| ------------------------------------ | --------------------------------------- |
| `--wc-layout-header-padding`         | 头部内边距（默认 16px 24px）            |
| `--wc-layout-header-bg`              | 头部背景                                |
| `--wc-layout-footer-padding`         | 底部内边距（默认 24px）                 |
| `--wc-layout-footer-bg`              | 底部背景                                |
| `--wc-layout-sider-width`            | 侧栏展开宽度（默认 200px）              |
| `--wc-layout-sider-collapsed-width`  | 侧栏折叠宽度（默认 80px）               |
| `--wc-layout-sider-bg`               | 侧栏背景                                |
| `--wc-layout-sider-color`            | 侧栏文字色                              |
| `--wc-layout-sider-trigger-bg`       | 折叠触发器背景                          |

### CSS Parts

`base`（layout / header / content / footer 容器）、`sider`（侧栏内容容器）、`trigger`（折叠触发器）
