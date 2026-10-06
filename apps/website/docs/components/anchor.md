# Anchor 锚点

页面内导航组件（参考 antd Anchor）：`wc-anchor` 容器 + `wc-anchor-link` 链接。滚动时自动高亮当前区块对应的链接，点击平滑滚动到目标位置；链接通过 `href`（`#id`）定位页面中带该 `id` 的元素，支持嵌套形成层级。

主要 API：容器 `direction` 方向（vertical 默认 / horizontal）、`offset` 滚动偏移、`bounds` 高亮判定边界、`container` 滚动容器选择器（默认自动向上查找最近的滚动祖先，找不到用页面）、`current` 当前高亮 href。事件：`wc-change`（高亮变化）、`wc-click`（点击链接）。

React 用法（`@wc-kit/react` 包装组件）：

```tsx
import { WcAnchor, WcAnchorLink } from '@wc-kit/react';

<WcAnchor onWcChange={(e) => console.log(e.detail.value)}>
  <WcAnchorLink href="#intro">介绍</WcAnchorLink>
  <WcAnchorLink href="#usage">基本用法</WcAnchorLink>
</WcAnchor>;
```

Vue 用法（`@wc-kit/vue` 为纯类型增强包，直接使用原生标签）：

```vue
<template>
  <wc-anchor @wc-change="(e) => console.log(e.detail.value)">
    <wc-anchor-link href="#intro">介绍</wc-anchor-link>
    <wc-anchor-link href="#usage">基本用法</wc-anchor-link>
  </wc-anchor>
</template>
```

## 示例

### 基础用法

滚动下方内容区（或点击链接），左侧锚点自动跟随高亮；`container` 显式指定滚动容器。嵌套的 `wc-anchor-link` 以缩进展示层级。

<div class="demo-block">
<div style="display:flex; gap:24px; align-items:flex-start;">
  <div id="an-box-1" style="flex:1; max-height:220px; overflow:auto; border:1px solid var(--wc-color-border); border-radius:var(--wc-radius-medium); padding:0 var(--wc-space-4);">
    <h4 id="an-1-a" style="margin:8px 0;">介绍</h4>
    <p style="height:90px; color:var(--wc-color-gray-500);">介绍内容……</p>
    <h4 id="an-1-b" style="margin:8px 0;">基本用法</h4>
    <p style="height:90px; color:var(--wc-color-gray-500);">基本用法内容……</p>
    <h4 id="an-1-c" style="margin:8px 0;">嵌套层级</h4>
    <p style="height:90px; color:var(--wc-color-gray-500);">嵌套层级内容……</p>
    <h4 id="an-1-d" style="margin:8px 0;">API</h4>
    <p style="height:90px; color:var(--wc-color-gray-500);">API 内容……</p>
  </div>
  <wc-anchor container="#an-box-1" style="flex:none; width:150px;">
    <wc-anchor-link href="#an-1-a">介绍</wc-anchor-link>
    <wc-anchor-link href="#an-1-b">基本用法</wc-anchor-link>
    <wc-anchor-link href="#an-1-c">
      嵌套层级
      <wc-anchor-link href="#an-1-d">API</wc-anchor-link>
    </wc-anchor-link>
  </wc-anchor>
</div>
</div>

:::: details 查看代码
::: code-group

```html [HTML]
<div
  id="scroll-box"
  style="height:220px; overflow:auto; border:1px solid var(--wc-color-border); padding:0 16px;"
>
  <h4 id="intro">介绍</h4>
  <p style="height:90px;">介绍内容……</p>
  <h4 id="usage">基本用法</h4>
  <p style="height:90px;">基本用法内容……</p>
  <h4 id="nest">嵌套层级</h4>
  <p style="height:90px;">嵌套层级内容……</p>
  <h4 id="api">API</h4>
  <p style="height:90px;">API 内容……</p>
</div>

<wc-anchor container="#scroll-box" style="width:150px;">
  <wc-anchor-link href="#intro">介绍</wc-anchor-link>
  <wc-anchor-link href="#usage">基本用法</wc-anchor-link>
  <wc-anchor-link href="#nest">
    嵌套层级
    <wc-anchor-link href="#api">API</wc-anchor-link>
  </wc-anchor-link>
</wc-anchor>
```

```vue [Vue]
<template>
  <div
    id="scroll-box"
    style="height:220px; overflow:auto; border:1px solid var(--wc-color-border); padding:0 16px;"
  >
    <h4 id="intro">介绍</h4>
    <p style="height:90px;">介绍内容……</p>
    <h4 id="usage">基本用法</h4>
    <p style="height:90px;">基本用法内容……</p>
    <h4 id="nest">嵌套层级</h4>
    <p style="height:90px;">嵌套层级内容……</p>
    <h4 id="api">API</h4>
    <p style="height:90px;">API 内容……</p>
  </div>

  <wc-anchor container="#scroll-box" style="width:150px;">
    <wc-anchor-link href="#intro">介绍</wc-anchor-link>
    <wc-anchor-link href="#usage">基本用法</wc-anchor-link>
    <wc-anchor-link href="#nest">
      嵌套层级
      <wc-anchor-link href="#api">API</wc-anchor-link>
    </wc-anchor-link>
  </wc-anchor>
</template>
```

```tsx [React]
import { WcAnchor, WcAnchorLink } from '@wc-kit/react';

<div
  id="scroll-box"
  style={{
    height: 220,
    overflow: 'auto',
    border: '1px solid var(--wc-color-border)',
    padding: '0 16px',
  }}
>
  <h4 id="intro">介绍</h4>
  <p style={{ height: 90 }}>介绍内容……</p>
  <h4 id="usage">基本用法</h4>
  <p style={{ height: 90 }}>基本用法内容……</p>
  <h4 id="nest">嵌套层级</h4>
  <p style={{ height: 90 }}>嵌套层级内容……</p>
  <h4 id="api">API</h4>
  <p style={{ height: 90 }}>API 内容……</p>
</div>;

<WcAnchor container="#scroll-box" style={{ width: 150 }}>
  <WcAnchorLink href="#intro">介绍</WcAnchorLink>
  <WcAnchorLink href="#usage">基本用法</WcAnchorLink>
  <WcAnchorLink href="#nest">
    嵌套层级
    <WcAnchorLink href="#api">API</WcAnchorLink>
  </WcAnchorLink>
</WcAnchor>;
```

:::
::::

### 水平模式

`direction="horizontal"` 顶部锚点导航，选中项以底部指示条标记（与 Tabs 同语言）；水平模式不展示嵌套层级。

<div class="demo-block">
<div style="display:flex; flex-direction:column; gap:12px;">
  <wc-anchor direction="horizontal" container="#an-box-2">
    <wc-anchor-link href="#an-2-a">介绍</wc-anchor-link>
    <wc-anchor-link href="#an-2-b">基本用法</wc-anchor-link>
    <wc-anchor-link href="#an-2-c">水平模式</wc-anchor-link>
    <wc-anchor-link href="#an-2-d">API</wc-anchor-link>
  </wc-anchor>
  <div id="an-box-2" style="max-height:180px; overflow:auto; border:1px solid var(--wc-color-border); border-radius:var(--wc-radius-medium); padding:0 var(--wc-space-4);">
    <h4 id="an-2-a" style="margin:8px 0;">介绍</h4>
    <p style="height:70px; color:var(--wc-color-gray-500);">介绍内容……</p>
    <h4 id="an-2-b" style="margin:8px 0;">基本用法</h4>
    <p style="height:70px; color:var(--wc-color-gray-500);">基本用法内容……</p>
    <h4 id="an-2-c" style="margin:8px 0;">水平模式</h4>
    <p style="height:70px; color:var(--wc-color-gray-500);">水平模式内容……</p>
    <h4 id="an-2-d" style="margin:8px 0;">API</h4>
    <p style="height:70px; color:var(--wc-color-gray-500);">API 内容……</p>
  </div>
</div>
</div>

:::: details 查看代码
::: code-group

```html [HTML]
<wc-anchor direction="horizontal" container="#scroll-box">
  <wc-anchor-link href="#intro">介绍</wc-anchor-link>
  <wc-anchor-link href="#usage">基本用法</wc-anchor-link>
  <wc-anchor-link href="#horizontal">水平模式</wc-anchor-link>
  <wc-anchor-link href="#api">API</wc-anchor-link>
</wc-anchor>

<div
  id="scroll-box"
  style="max-height:180px; overflow:auto; border:1px solid var(--wc-color-border); padding:0 16px;"
>
  <h4 id="intro">介绍</h4>
  <p style="height:70px;">介绍内容……</p>
  <h4 id="usage">基本用法</h4>
  <p style="height:70px;">基本用法内容……</p>
  <h4 id="horizontal">水平模式</h4>
  <p style="height:70px;">水平模式内容……</p>
  <h4 id="api">API</h4>
  <p style="height:70px;">API 内容……</p>
</div>
```

```vue [Vue]
<template>
  <wc-anchor direction="horizontal" container="#scroll-box">
    <wc-anchor-link href="#intro">介绍</wc-anchor-link>
    <wc-anchor-link href="#usage">基本用法</wc-anchor-link>
    <wc-anchor-link href="#horizontal">水平模式</wc-anchor-link>
    <wc-anchor-link href="#api">API</wc-anchor-link>
  </wc-anchor>

  <div
    id="scroll-box"
    style="max-height:180px; overflow:auto; border:1px solid var(--wc-color-border); padding:0 16px;"
  >
    <h4 id="intro">介绍</h4>
    <p style="height:70px;">介绍内容……</p>
    <h4 id="usage">基本用法</h4>
    <p style="height:70px;">基本用法内容……</p>
    <h4 id="horizontal">水平模式</h4>
    <p style="height:70px;">水平模式内容……</p>
    <h4 id="api">API</h4>
    <p style="height:70px;">API 内容……</p>
  </div>
</template>
```

```tsx [React]
import { WcAnchor, WcAnchorLink } from '@wc-kit/react';

<WcAnchor direction="horizontal" container="#scroll-box">
  <WcAnchorLink href="#intro">介绍</WcAnchorLink>
  <WcAnchorLink href="#usage">基本用法</WcAnchorLink>
  <WcAnchorLink href="#horizontal">水平模式</WcAnchorLink>
  <WcAnchorLink href="#api">API</WcAnchorLink>
</WcAnchor>;
```

:::
::::

### 事件

滚动高亮变化派发 `wc-change`（composed，可在宿主文档监听）；点击链接派发 `wc-click` 并平滑滚动到目标（同时阻止浏览器默认的 hash 跳转，不会污染路由）。

```ts
const anchor = document.querySelector('wc-anchor');
anchor.addEventListener('wc-change', (e) => {
  console.log('当前区块', (e as CustomEvent).detail.value);
});
anchor.addEventListener('wc-click', (e) => {
  console.log('点击', (e as CustomEvent).detail.href, (e as CustomEvent).detail.title);
});
```

## API

### wc-anchor

#### 属性

| 属性        | attribute   | 类型                         | 默认值       | 说明                                                      |
| ----------- | ----------- | ---------------------------- | ------------ | --------------------------------------------------------- |
| `direction` | `direction` | `'vertical' \| 'horizontal'` | `'vertical'` | 方向                                                      |
| `offset`    | `offset`    | `number`                     | `0`          | 点击滚动后目标距容器顶部的偏移（px）                      |
| `bounds`    | `bounds`    | `number`                     | `5`          | 高亮判定边界（px）：目标顶部越过 offset + bounds 即高亮   |
| `container` | `container` | `string`                     | `''`         | 滚动容器 CSS 选择器（默认自动向上查找滚动祖先，否则页面） |
| `current`   | `current`   | `string`                     | `''`         | 当前高亮的 href（`#id`）                                  |

#### 事件

| 事件        | 说明                     | detail                            |
| ----------- | ------------------------ | --------------------------------- |
| `wc-change` | 高亮锚点变化（composed） | `{ value: string }`               |
| `wc-click`  | 点击链接（composed）     | `{ href: string; title: string }` |

#### 插槽

| 名称     | 说明                               |
| -------- | ---------------------------------- |
| （默认） | `wc-anchor-link`（可嵌套形成层级） |

#### CSS Parts

`base`（容器）

#### CSS 变量

| 变量                      | 说明                            |
| ------------------------- | ------------------------------- |
| `--wc-anchor-link-height` | 链接高度（默认 32px，透传链接） |

### wc-anchor-link

#### 属性

| 属性   | attribute | 类型     | 默认值 | 说明                   |
| ------ | --------- | -------- | ------ | ---------------------- |
| `href` | `href`    | `string` | `''`   | 目标锚点（`#id` 形式） |

`selected` / `anchor-horizontal` 由 wc-anchor 同步维护，请勿手工设置。

#### 插槽

| 名称     | 说明                                              |
| -------- | ------------------------------------------------- |
| （默认） | 链接标题文本                                      |
| `sub`    | 嵌套的 `wc-anchor-link`（自动分配，无需手工声明） |

#### CSS Parts

`base`（链接根元素）

#### CSS 变量

| 变量                      | 说明                               |
| ------------------------- | ---------------------------------- |
| `--wc-anchor-link-height` | 链接高度（默认 32px）              |
| `--wc-anchor-link-radius` | 链接圆角（默认 --wc-radius-small） |
