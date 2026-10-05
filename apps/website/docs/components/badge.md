# Badge 徽标

徽标组件：出现在右上角的数字或圆点标记，包裹内容时悬浮于其右上角，无内容时独立展示。
count 为 0 时隐藏（dot 模式恒显示），count 超过 max 显示「max+」。

**主要 API**：count（徽标数字，<= 0 隐藏，默认 0）、max（数字上限，默认 99）、
dot（圆点模式，默认 false）、theme（语义色：primary / success / warning / danger，默认 danger）。
默认插槽为被标记的内容（可空，空时独立展示）。无自定义事件。

**React 用法**（@wc-kit/react 包装组件）

```jsx
import { WcBadge } from '@wc-kit/react';

<WcBadge count={5} max={99} theme="danger">
  <span>消息</span>
</WcBadge>;
```

**Vue 用法**（原生标签，@wc-kit/vue 为纯类型增强）

```vue
<wc-badge :count="5" :max="99" theme="danger">
  <span>消息</span>
</wc-badge>
```

## 示例

### 主题色

<div class="demo-block">

<div style="display:flex;gap:12px;align-items:center;">
      <wc-badge count="8" theme="primary"><span>主要</span></wc-badge>
      <wc-badge count="8" theme="success"><span>成功</span></wc-badge>
      <wc-badge count="8" theme="warning"><span>警告</span></wc-badge>
      <wc-badge count="8" theme="danger"><span>危险</span></wc-badge>
    </div>

</div>

:::: details 查看代码
::: code-group

```html [HTML]
<div style="display:flex;gap:12px;align-items:center;">
  <wc-badge count="8" theme="primary"><span>主要</span></wc-badge>
  <wc-badge count="8" theme="success"><span>成功</span></wc-badge>
  <wc-badge count="8" theme="warning"><span>警告</span></wc-badge>
  <wc-badge count="8" theme="danger"><span>危险</span></wc-badge>
</div>
```

```vue [Vue]
<template>
  <div style="display:flex;gap:12px;align-items:center;">
    <wc-badge count="8" theme="primary"><span>主要</span></wc-badge>
    <wc-badge count="8" theme="success"><span>成功</span></wc-badge>
    <wc-badge count="8" theme="warning"><span>警告</span></wc-badge>
    <wc-badge count="8" theme="danger"><span>危险</span></wc-badge>
  </div>
</template>
```

```tsx [React]
import { WcBadge } from '@wc-kit/react';

<div style="display:flex;gap:12px;align-items:center;">
  <WcBadge count={8} theme="primary">
    <span>主要</span>
  </WcBadge>
  <WcBadge count={8} theme="success">
    <span>成功</span>
  </WcBadge>
  <WcBadge count={8} theme="warning">
    <span>警告</span>
  </WcBadge>
  <WcBadge count={8} theme="danger">
    <span>危险</span>
  </WcBadge>
</div>;
```

:::
::::

### 圆点模式

<div class="demo-block">

<div style="display:flex;gap:24px;align-items:center;">
      <wc-badge dot></wc-badge>
      <wc-badge dot theme="primary"><span>消息中心</span></wc-badge>
      <wc-badge dot theme="success"><span>在线客服</span></wc-badge>
    </div>

</div>

:::: details 查看代码
::: code-group

```html [HTML]
<div style="display:flex;gap:24px;align-items:center;">
  <wc-badge dot></wc-badge>
  <wc-badge dot theme="primary"><span>消息中心</span></wc-badge>
  <wc-badge dot theme="success"><span>在线客服</span></wc-badge>
</div>
```

```vue [Vue]
<template>
  <div style="display:flex;gap:24px;align-items:center;">
    <wc-badge dot></wc-badge>
    <wc-badge dot theme="primary"><span>消息中心</span></wc-badge>
    <wc-badge dot theme="success"><span>在线客服</span></wc-badge>
  </div>
</template>
```

```tsx [React]
import { WcBadge } from '@wc-kit/react';

<div style="display:flex;gap:24px;align-items:center;">
  <WcBadge dot></WcBadge>
  <WcBadge dot theme="primary">
    <span>消息中心</span>
  </WcBadge>
  <WcBadge dot theme="success">
    <span>在线客服</span>
  </WcBadge>
</div>;
```

:::
::::

### 数字上限

<div class="demo-block">

<div style="display:flex;gap:24px;align-items:center;">
      <wc-badge count="120"><span>默认 max=99</span></wc-badge>
      <wc-badge count="120" max="20"><span>max=20</span></wc-badge>
      <wc-badge count="99" max="99"><span>恰好 99</span></wc-badge>
    </div>

</div>

:::: details 查看代码
::: code-group

```html [HTML]
<div style="display:flex;gap:24px;align-items:center;">
  <wc-badge count="120"><span>默认 max=99</span></wc-badge>
  <wc-badge count="120" max="20"><span>max=20</span></wc-badge>
  <wc-badge count="99" max="99"><span>恰好 99</span></wc-badge>
</div>
```

```vue [Vue]
<template>
  <div style="display:flex;gap:24px;align-items:center;">
    <wc-badge count="120"><span>默认 max=99</span></wc-badge>
    <wc-badge count="120" max="20"><span>max=20</span></wc-badge>
    <wc-badge count="99" max="99"><span>恰好 99</span></wc-badge>
  </div>
</template>
```

```tsx [React]
import { WcBadge } from '@wc-kit/react';

<div style="display:flex;gap:24px;align-items:center;">
  <WcBadge count={120}>
    <span>默认 max=99</span>
  </WcBadge>
  <WcBadge count={120} max={20}>
    <span>max=20</span>
  </WcBadge>
  <WcBadge count={99} max={99}>
    <span>恰好 99</span>
  </WcBadge>
</div>;
```

:::
::::

### 独立展示与隐藏

<div class="demo-block">

<div style="display:flex;gap:24px;align-items:center;">
      <wc-badge count="8"></wc-badge>
      <wc-badge count="0"><span>count 为 0 时隐藏</span></wc-badge>
      <wc-badge count="5"><span>包裹内容时悬浮于右上角</span></wc-badge>
    </div>

</div>

:::: details 查看代码
::: code-group

```html [HTML]
<div style="display:flex;gap:24px;align-items:center;">
  <wc-badge count="8"></wc-badge>
  <wc-badge count="0"><span>count 为 0 时隐藏</span></wc-badge>
  <wc-badge count="5"><span>包裹内容时悬浮于右上角</span></wc-badge>
</div>
```

```vue [Vue]
<template>
  <div style="display:flex;gap:24px;align-items:center;">
    <wc-badge count="8"></wc-badge>
    <wc-badge count="0"><span>count 为 0 时隐藏</span></wc-badge>
    <wc-badge count="5"><span>包裹内容时悬浮于右上角</span></wc-badge>
  </div>
</template>
```

```tsx [React]
import { WcBadge } from '@wc-kit/react';

<div style="display:flex;gap:24px;align-items:center;">
  <WcBadge count={8}></WcBadge>
  <WcBadge count={0}>
    <span>count 为 0 时隐藏</span>
  </WcBadge>
  <WcBadge count={5}>
    <span>包裹内容时悬浮于右上角</span>
  </WcBadge>
</div>;
```

:::
::::

## API

### 属性

| 属性    | attribute | 类型                                              | 默认值     | 说明                           |
| ------- | --------- | ------------------------------------------------- | ---------- | ------------------------------ |
| `count` | `count`   | `number`                                          | `0`        | 徽标数字（<= 0 隐藏）          |
| `max`   | `max`     | `number`                                          | `99`       | 数字上限，超出显示「max+」     |
| `dot`   | `dot`     | `boolean`                                         | `false`    | 圆点模式（忽略 count，恒显示） |
| `theme` | `theme`   | `'primary' \| 'success' \| 'warning' \| 'danger'` | `'danger'` | 语义色                         |

### 插槽

| 名称     | 说明                               |
| -------- | ---------------------------------- |
| （默认） | 被标记的内容（可空，空时独立展示） |

### CSS Parts

`badge`
