# Splitter 分隔板

可拖拽调整子面板尺寸的容器组件（参考 antd Splitter）：`wc-splitter` 容器 + `wc-splitter-panel` 面板，面板之间自动生成可拖拽的分隔条，支持百分比尺寸、min/max 约束、面板折叠与键盘微调。

主要 API：容器 `layout` 布局方向（horizontal / vertical）；面板 `size` 初始占比（百分比）、`min` / `max` 占比上下限、`collapsible` 允许折叠（相邻分隔条悬停出现折叠箭头，箭头分居分隔线两侧、各自独立点击，折叠后本侧箭头翻转为展开方向）、`resizable` 允许拖拽。事件：`wc-resize` 拖拽/折叠过程中抛出、`wc-resize-end` 调整结束抛出，`detail.sizes` 为各面板百分比数组。

React 用法（`@wc-kit/react` 包装组件）：

```tsx
import { WcSplitter, WcSplitterPanel } from '@wc-kit/react';

<WcSplitter style={{ height: 200 }}>
  <WcSplitterPanel size={40}>左侧</WcSplitterPanel>
  <WcSplitterPanel collapsible>右侧</WcSplitterPanel>
</WcSplitter>;
```

Vue 用法（`@wc-kit/vue` 为纯类型增强包，直接使用原生标签）：

```vue
<template>
  <wc-splitter style="height: 200px">
    <wc-splitter-panel :size="40">左侧</wc-splitter-panel>
    <wc-splitter-panel collapsible>右侧</wc-splitter-panel>
  </wc-splitter>
</template>
```

## 示例

### 基础用法

水平布局三面板，均可折叠（悬停分隔条，两侧各出现一枚折叠箭头，点击折叠 / 再点恢复）。

<div class="demo-block">
  <wc-splitter style="height: 160px; border: 1px solid var(--wc-color-border); border-radius: var(--wc-radius-medium); overflow: hidden;">
    <wc-splitter-panel collapsible style="--wc-splitter-panel-padding: 12px; background: var(--wc-color-gray-50);">左</wc-splitter-panel>
    <wc-splitter-panel collapsible style="--wc-splitter-panel-padding: 12px;">中</wc-splitter-panel>
    <wc-splitter-panel collapsible style="--wc-splitter-panel-padding: 12px; background: var(--wc-color-gray-50);">右</wc-splitter-panel>
  </wc-splitter>
</div>

:::: details 查看代码
::: code-group

```html [HTML]
<wc-splitter
  style="height: 160px; border: 1px solid var(--wc-color-border); border-radius: var(--wc-radius-medium); overflow: hidden"
>
  <wc-splitter-panel
    collapsible
    style="--wc-splitter-panel-padding: 12px; background: var(--wc-color-gray-50)"
  >
    左
  </wc-splitter-panel>
  <wc-splitter-panel collapsible style="--wc-splitter-panel-padding: 12px">中</wc-splitter-panel>
  <wc-splitter-panel
    collapsible
    style="--wc-splitter-panel-padding: 12px; background: var(--wc-color-gray-50)"
  >
    右
  </wc-splitter-panel>
</wc-splitter>
```

```vue [Vue]
<template>
  <wc-splitter
    style="height: 160px; border: 1px solid var(--wc-color-border); border-radius: var(--wc-radius-medium); overflow: hidden"
  >
    <wc-splitter-panel
      collapsible
      style="--wc-splitter-panel-padding: 12px; background: var(--wc-color-gray-50)"
    >
      左
    </wc-splitter-panel>
    <wc-splitter-panel collapsible style="--wc-splitter-panel-padding: 12px">中</wc-splitter-panel>
    <wc-splitter-panel
      collapsible
      style="--wc-splitter-panel-padding: 12px; background: var(--wc-color-gray-50)"
    >
      右
    </wc-splitter-panel>
  </wc-splitter>
</template>
```

```tsx [React]
import { WcSplitter, WcSplitterPanel } from '@wc-kit/react';

<WcSplitter style={{ height: 160, border: '1px solid var(--wc-color-border)', overflow: 'hidden' }}>
  <WcSplitterPanel collapsible style={{ padding: 12, background: 'var(--wc-color-gray-50)' }}>
    左
  </WcSplitterPanel>
  <WcSplitterPanel collapsible style={{ padding: 12 }}>
    中
  </WcSplitterPanel>
  <WcSplitterPanel collapsible style={{ padding: 12, background: 'var(--wc-color-gray-50)' }}>
    右
  </WcSplitterPanel>
</WcSplitter>;
```

:::
::::

### 垂直布局

`layout="vertical"` 改为上下排列，分隔条上下拖拽。

<div class="demo-block">
  <wc-splitter layout="vertical" style="height: 220px; border: 1px solid var(--wc-color-border); border-radius: var(--wc-radius-medium); overflow: hidden;">
    <wc-splitter-panel collapsible style="--wc-splitter-panel-padding: 12px; background: var(--wc-color-gray-50);">上</wc-splitter-panel>
    <wc-splitter-panel collapsible style="--wc-splitter-panel-padding: 12px;">下</wc-splitter-panel>
  </wc-splitter>
</div>

:::: details 查看代码
::: code-group

```html [HTML]
<wc-splitter
  layout="vertical"
  style="height: 220px; border: 1px solid var(--wc-color-border); border-radius: var(--wc-radius-medium); overflow: hidden"
>
  <wc-splitter-panel
    collapsible
    style="--wc-splitter-panel-padding: 12px; background: var(--wc-color-gray-50)"
  >
    上
  </wc-splitter-panel>
  <wc-splitter-panel collapsible style="--wc-splitter-panel-padding: 12px">下</wc-splitter-panel>
</wc-splitter>
```

```vue [Vue]
<template>
  <wc-splitter
    layout="vertical"
    style="height: 220px; border: 1px solid var(--wc-color-border); border-radius: var(--wc-radius-medium); overflow: hidden"
  >
    <wc-splitter-panel
      collapsible
      style="--wc-splitter-panel-padding: 12px; background: var(--wc-color-gray-50)"
    >
      上
    </wc-splitter-panel>
    <wc-splitter-panel collapsible style="--wc-splitter-panel-padding: 12px">下</wc-splitter-panel>
  </wc-splitter>
</template>
```

```tsx [React]
import { WcSplitter, WcSplitterPanel } from '@wc-kit/react';

<WcSplitter layout="vertical" style={{ height: 220, border: '1px solid var(--wc-color-border)' }}>
  <WcSplitterPanel collapsible style={{ padding: 12, background: 'var(--wc-color-gray-50)' }}>
    上
  </WcSplitterPanel>
  <WcSplitterPanel collapsible style={{ padding: 12 }}>
    下
  </WcSplitterPanel>
</WcSplitter>;
```

:::
::::

### 初始尺寸与占比约束

`size` 声明初始占比，`min` / `max` 约束拖拽范围（面板均按百分比计）。

<div class="demo-block">
  <wc-splitter style="height: 140px; border: 1px solid var(--wc-color-border); border-radius: var(--wc-radius-medium); overflow: hidden;">
    <wc-splitter-panel size="25" min="15" style="--wc-splitter-panel-padding: 12px; background: var(--wc-color-gray-50);">size 25 / min 15</wc-splitter-panel>
    <wc-splitter-panel min="30" style="--wc-splitter-panel-padding: 12px;">min 30</wc-splitter-panel>
    <wc-splitter-panel max="60" style="--wc-splitter-panel-padding: 12px; background: var(--wc-color-gray-50);">max 60</wc-splitter-panel>
  </wc-splitter>
</div>

:::: details 查看代码
::: code-group

```html [HTML]
<wc-splitter
  style="height: 140px; border: 1px solid var(--wc-color-border); border-radius: var(--wc-radius-medium); overflow: hidden"
>
  <wc-splitter-panel
    size="25"
    min="15"
    style="--wc-splitter-panel-padding: 12px; background: var(--wc-color-gray-50)"
  >
    size 25 / min 15
  </wc-splitter-panel>
  <wc-splitter-panel min="30" style="--wc-splitter-panel-padding: 12px">min 30</wc-splitter-panel>
  <wc-splitter-panel
    max="60"
    style="--wc-splitter-panel-padding: 12px; background: var(--wc-color-gray-50)"
  >
    max 60
  </wc-splitter-panel>
</wc-splitter>
```

```vue [Vue]
<template>
  <wc-splitter
    style="height: 140px; border: 1px solid var(--wc-color-border); border-radius: var(--wc-radius-medium); overflow: hidden"
  >
    <wc-splitter-panel
      size="25"
      min="15"
      style="--wc-splitter-panel-padding: 12px; background: var(--wc-color-gray-50)"
    >
      size 25 / min 15
    </wc-splitter-panel>
    <wc-splitter-panel min="30" style="--wc-splitter-panel-padding: 12px">min 30</wc-splitter-panel>
    <wc-splitter-panel
      max="60"
      style="--wc-splitter-panel-padding: 12px; background: var(--wc-color-gray-50)"
    >
      max 60
    </wc-splitter-panel>
  </wc-splitter>
</template>
```

```tsx [React]
import { WcSplitter, WcSplitterPanel } from '@wc-kit/react';

<WcSplitter style={{ height: 140, border: '1px solid var(--wc-color-border)' }}>
  <WcSplitterPanel
    size={25}
    min={15}
    style={{ padding: 12, background: 'var(--wc-color-gray-50)' }}
  >
    size 25 / min 15
  </WcSplitterPanel>
  <WcSplitterPanel min={30} style={{ padding: 12 }}>
    min 30
  </WcSplitterPanel>
  <WcSplitterPanel max={60} style={{ padding: 12, background: 'var(--wc-color-gray-50)' }}>
    max 60
  </WcSplitterPanel>
</WcSplitter>;
```

:::
::::

### 事件

拖拽 / 键盘微调 / 折叠过程中持续派发 `wc-resize`，结束时派发 `wc-resize-end`，`detail.sizes` 为各面板百分比数组；分隔条聚焦后可用方向键微调（±1%）。

```ts
const splitter = document.querySelector('wc-splitter');
splitter.addEventListener('wc-resize', (e) => {
  console.log('当前占比', (e as CustomEvent).detail.sizes); // [40.2, 59.8]
});
splitter.addEventListener('wc-resize-end', (e) => {
  console.log('最终占比', (e as CustomEvent).detail.sizes);
});
```

## API

### wc-splitter

#### 属性

| 属性     | attribute | 类型                         | 默认值         | 说明     |
| -------- | --------- | ---------------------------- | -------------- | -------- |
| `layout` | `layout`  | `'horizontal' \| 'vertical'` | `'horizontal'` | 布局方向 |

#### 事件

| 事件            | 说明                                         | detail                |
| --------------- | -------------------------------------------- | --------------------- |
| `wc-resize`     | 拖拽 / 键盘 / 折叠过程中占比变化（composed） | `{ sizes: number[] }` |
| `wc-resize-end` | 拖拽 / 键盘调整、折叠切换结束（composed）    | `{ sizes: number[] }` |

#### 插槽

| 名称     | 说明                                         |
| -------- | -------------------------------------------- |
| （默认） | `wc-splitter-panel` 面板（其他子元素不渲染） |

#### CSS Parts

`base`（容器根元素）、`pane`（面板占位）、`divider`（分隔条）

#### CSS 变量

| 变量                              | 说明                                                  |
| --------------------------------- | ----------------------------------------------------- |
| `--wc-splitter-divider-bg`        | 分隔线颜色（默认 `--wc-color-border`）                |
| `--wc-splitter-divider-hover-bg`  | 分隔线 hover / 拖拽 / 聚焦色（默认主题色）            |
| `--wc-splitter-grip-bg`           | 线中央拖拽把手颜色（默认 `--wc-color-text-disabled`） |
| `--wc-splitter-focus-ring-offset` | 分隔条聚焦环偏移（默认 -2px）                         |

### wc-splitter-panel

#### 属性

| 属性          | attribute     | 类型      | 默认值  | 说明                                             |
| ------------- | ------------- | --------- | ------- | ------------------------------------------------ |
| `size`        | `size`        | `number`  | `0`     | 初始占比（百分比，0 = 与未声明面板平分剩余空间） |
| `min`         | `min`         | `number`  | `0`     | 最小占比（百分比）                               |
| `max`         | `max`         | `number`  | `100`   | 最大占比（百分比）                               |
| `collapsible` | `collapsible` | `boolean` | `false` | 允许折叠（相邻分隔条显示折叠箭头）               |
| `resizable`   | `resizable`   | `boolean` | `true`  | 允许拖拽调整（与相邻面板共同决定分隔条是否可拖） |

#### 插槽

| 名称     | 说明     |
| -------- | -------- |
| （默认） | 面板内容 |

#### CSS Parts

`base`（面板根元素）

#### CSS 变量

| 变量                          | 说明                 |
| ----------------------------- | -------------------- |
| `--wc-splitter-panel-padding` | 面板内边距（默认 0） |
