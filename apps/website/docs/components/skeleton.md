# Skeleton 骨架屏

在内容加载完成前提供占位示意（参考 antd Skeleton）：`wc-skeleton` 提供「头像 + 标题 + 正文行」的经典组合，`wc-skeleton-item` 是自由拼装的自定义占位块。`animated` 开启呼吸动画（默认关闭，遵循 `prefers-reduced-motion`）。

加载态切换由使用方控制：用框架条件渲染在骨架屏与真实内容之间切换即可，组件不内置 `loading` 属性。

React 用法（`@wc-kit/react` 包装组件）：

```tsx
import { WcSkeleton, WcSkeletonItem } from '@wc-kit/react';

<WcSkeleton avatar animated rows={3} />;
<WcSkeletonItem variant="circle" animated />;
```

Vue 用法（`@wc-kit/vue` 为纯类型增强包，直接使用原生标签）：

```vue
<template>
  <wc-skeleton avatar animated :rows="3"></wc-skeleton>
  <wc-skeleton-item variant="circle" animated></wc-skeleton-item>
</template>
```

## 示例

### 基础用法

`rows` 控制正文行数（末行自动缩短），`animated` 开启呼吸动画。

<div class="demo-block">
  <wc-skeleton animated rows="3"></wc-skeleton>
</div>

:::: details 查看代码
::: code-group

```html [HTML]
<wc-skeleton animated rows="3"></wc-skeleton>
```

```vue [Vue]
<template>
  <wc-skeleton animated :rows="3"></wc-skeleton>
</template>
```

```tsx [React]
import { WcSkeleton } from '@wc-kit/react';

<WcSkeleton animated rows={3} />;
```

:::
::::

### 带头像

`avatar` 在左侧展示圆头像占位。

<div class="demo-block">
  <wc-skeleton avatar animated rows="2"></wc-skeleton>
</div>

:::: details 查看代码
::: code-group

```html [HTML]
<wc-skeleton avatar animated rows="2"></wc-skeleton>
```

```vue [Vue]
<template>
  <wc-skeleton avatar animated :rows="2"></wc-skeleton>
</template>
```

```tsx [React]
import { WcSkeleton } from '@wc-kit/react';

<WcSkeleton avatar animated rows={2} />;
```

:::
::::

### 自定义拼装（wc-skeleton-item）

`variant` 决定形状：`rect`（默认方块）/ `text`（文本行）/ `circle`（正圆），尺寸由使用方样式控制。

<div class="demo-block">
  <div style="display: flex; align-items: center; gap: 16px;">
    <wc-skeleton-item variant="circle" animated></wc-skeleton-item>
    <div style="flex: 1; display: flex; flex-direction: column; gap: 12px;">
      <wc-skeleton-item variant="text" animated></wc-skeleton-item>
      <wc-skeleton-item variant="text" animated style="width: 60%;"></wc-skeleton-item>
    </div>
  </div>
  <div style="margin-top: 16px;">
    <wc-skeleton-item variant="rect" animated style="height: 80px;"></wc-skeleton-item>
  </div>
</div>

:::: details 查看代码
::: code-group

```html [HTML]
<div style="display: flex; align-items: center; gap: 16px">
  <wc-skeleton-item variant="circle" animated></wc-skeleton-item>
  <div style="flex: 1; display: flex; flex-direction: column; gap: 12px">
    <wc-skeleton-item variant="text" animated></wc-skeleton-item>
    <wc-skeleton-item variant="text" animated style="width: 60%"></wc-skeleton-item>
  </div>
</div>
<div style="margin-top: 16px">
  <wc-skeleton-item variant="rect" animated style="height: 80px"></wc-skeleton-item>
</div>
```

```vue [Vue]
<template>
  <div style="display: flex; align-items: center; gap: 16px">
    <wc-skeleton-item variant="circle" animated></wc-skeleton-item>
    <div style="flex: 1; display: flex; flex-direction: column; gap: 12px">
      <wc-skeleton-item variant="text" animated></wc-skeleton-item>
      <wc-skeleton-item variant="text" animated style="width: 60%"></wc-skeleton-item>
    </div>
  </div>
  <div style="margin-top: 16px">
    <wc-skeleton-item variant="rect" animated style="height: 80px"></wc-skeleton-item>
  </div>
</template>
```

```tsx [React]
import { WcSkeletonItem } from '@wc-kit/react';

<div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
  <WcSkeletonItem variant="circle" animated />
  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
    <WcSkeletonItem variant="text" animated />
    <WcSkeletonItem variant="text" animated style={{ width: '60%' }} />
  </div>
</div>;
```

:::
::::

## API

### wc-skeleton

#### 属性

| 属性       | attribute  | 类型      | 默认值  | 说明                 |
| ---------- | ---------- | --------- | ------- | -------------------- |
| `avatar`   | `avatar`   | `boolean` | `false` | 展示圆头像占位       |
| `rows`     | `rows`     | `number`  | `3`     | 正文占位行数         |
| `animated` | `animated` | `boolean` | `false` | 呼吸动画（显式开启） |

#### CSS Parts

`base`（容器）、`avatar`（圆头像占位）、`line`（占位行）

#### CSS 变量

| 变量                     | 说明                                        |
| ------------------------ | ------------------------------------------- |
| `--wc-skeleton-bg`       | 占位块颜色（默认 `--wc-color-bg-disabled`） |
| `--wc-skeleton-radius`   | 占位块圆角（默认 `--wc-radius-small`）      |
| `--wc-skeleton-duration` | 呼吸动画周期（默认 1.4s）                   |

### wc-skeleton-item

#### 属性

| 属性       | attribute  | 类型                           | 默认值   | 说明                 |
| ---------- | ---------- | ------------------------------ | -------- | -------------------- |
| `variant`  | `variant`  | `'rect' \| 'text' \| 'circle'` | `'rect'` | 形状                 |
| `animated` | `animated` | `boolean`                      | `false`  | 呼吸动画（显式开启） |

#### CSS Parts

`base`（占位块）

#### CSS 变量

同 `wc-skeleton`（`--wc-skeleton-bg` / `--wc-skeleton-radius` / `--wc-skeleton-duration`）。
