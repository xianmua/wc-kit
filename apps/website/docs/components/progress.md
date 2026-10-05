# Progress 进度条

进度条组件：line 线形 / circle 环形两种主题，value 取 0-100 自动夹紧；
status 语义色会同步指示条与标签（success / error 附带状态图标）。

**主要 API**

| 属性         | 类型                                          | 默认值   | 说明                             |
| ------------ | --------------------------------------------- | -------- | -------------------------------- |
| value        | number                                        | 0        | 进度值 0-100（自动夹紧）         |
| theme        | 'line' \| 'circle'                            | 'line'   | 主题                             |
| status       | 'normal' \| 'success' \| 'warning' \| 'error' | 'normal' | 状态色                           |
| show-label   | boolean                                       | true     | 是否显示标签文本                 |
| stroke-width | number                                        | 6        | 线形轨道粗细（px）               |
| label        | string                                        | ''       | 自定义标签文本（默认显示百分比） |

无自定义事件。

**React 用法**（@wc-kit/react 包装组件）

```jsx
import { WcProgress } from '@wc-kit/react';

<WcProgress value={60} theme="circle" status="success"></WcProgress>;
```

**Vue 用法**（原生标签，@wc-kit/vue 为纯类型增强）

```vue
<wc-progress :value="60" theme="circle" status="success"></wc-progress>
```

## 示例

### 线形与环形

<div class="demo-block">

<div style="display:flex;gap:24px;align-items:center;">
      <wc-progress value="30" style="width:240px;"></wc-progress>
      <wc-progress theme="circle" value="70"></wc-progress>
    </div>

</div>

:::: details 查看代码
::: code-group

```html [HTML]
<div style="display:flex;gap:24px;align-items:center;">
  <wc-progress value="30" style="width:240px;"></wc-progress>
  <wc-progress theme="circle" value="70"></wc-progress>
</div>
```

```vue [Vue]
<template>
  <div style="display:flex;gap:24px;align-items:center;">
    <wc-progress value="30" style="width:240px;"></wc-progress>
    <wc-progress theme="circle" value="70"></wc-progress>
  </div>
</template>
```

```tsx [React]
import { WcProgress } from '@wc-kit/react';

<div style="display:flex;gap:24px;align-items:center;">
  <WcProgress value={30} style="width:240px;"></WcProgress>
  <WcProgress theme="circle" value={70}></WcProgress>
</div>;
```

:::
::::

### 状态色

<div class="demo-block">

<div style="display:flex;flex-direction:column;gap:16px;">
      <div style="display:flex;gap:16px;width:360px;">
        <wc-progress value="40" style="flex:1;"></wc-progress>
        <wc-progress value="60" status="success" style="flex:1;"></wc-progress>
        <wc-progress value="80" status="warning" style="flex:1;"></wc-progress>
        <wc-progress value="100" status="error" style="flex:1;"></wc-progress>
      </div>
      <div style="display:flex;gap:16px;">
        <wc-progress theme="circle" value="40"></wc-progress>
        <wc-progress theme="circle" value="60" status="success"></wc-progress>
        <wc-progress theme="circle" value="80" status="warning"></wc-progress>
        <wc-progress theme="circle" value="100" status="error"></wc-progress>
      </div>
    </div>

</div>

:::: details 查看代码
::: code-group

```html [HTML]
<div style="display:flex;flex-direction:column;gap:16px;">
  <div style="display:flex;gap:16px;width:360px;">
    <wc-progress value="40" style="flex:1;"></wc-progress>
    <wc-progress value="60" status="success" style="flex:1;"></wc-progress>
    <wc-progress value="80" status="warning" style="flex:1;"></wc-progress>
    <wc-progress value="100" status="error" style="flex:1;"></wc-progress>
  </div>
  <div style="display:flex;gap:16px;">
    <wc-progress theme="circle" value="40"></wc-progress>
    <wc-progress theme="circle" value="60" status="success"></wc-progress>
    <wc-progress theme="circle" value="80" status="warning"></wc-progress>
    <wc-progress theme="circle" value="100" status="error"></wc-progress>
  </div>
</div>
```

```vue [Vue]
<template>
  <div style="display:flex;flex-direction:column;gap:16px;">
    <div style="display:flex;gap:16px;width:360px;">
      <wc-progress value="40" style="flex:1;"></wc-progress>
      <wc-progress value="60" status="success" style="flex:1;"></wc-progress>
      <wc-progress value="80" status="warning" style="flex:1;"></wc-progress>
      <wc-progress value="100" status="error" style="flex:1;"></wc-progress>
    </div>
    <div style="display:flex;gap:16px;">
      <wc-progress theme="circle" value="40"></wc-progress>
      <wc-progress theme="circle" value="60" status="success"></wc-progress>
      <wc-progress theme="circle" value="80" status="warning"></wc-progress>
      <wc-progress theme="circle" value="100" status="error"></wc-progress>
    </div>
  </div>
</template>
```

```tsx [React]
import { WcProgress } from '@wc-kit/react';

<div style="display:flex;flex-direction:column;gap:16px;">
  <div style="display:flex;gap:16px;width:360px;">
    <WcProgress value={40} style="flex:1;"></WcProgress>
    <WcProgress value={60} status="success" style="flex:1;"></WcProgress>
    <WcProgress value={80} status="warning" style="flex:1;"></WcProgress>
    <WcProgress value={100} status="error" style="flex:1;"></WcProgress>
  </div>
  <div style="display:flex;gap:16px;">
    <WcProgress theme="circle" value={40}></WcProgress>
    <WcProgress theme="circle" value={60} status="success"></WcProgress>
    <WcProgress theme="circle" value={80} status="warning"></WcProgress>
    <WcProgress theme="circle" value={100} status="error"></WcProgress>
  </div>
</div>;
```

:::
::::

### 自定义标签与轨道粗细

<div class="demo-block">
  <div style="display:flex;flex-direction:column;gap:16px;width:360px;">
    <wc-progress value="80" label="已加载 80%"></wc-progress>
    <wc-progress value="45" stroke-width="12"></wc-progress>
    <wc-progress value="66" show-label="false"></wc-progress>
  </div>
</div>

依次演示 label 自定义文案、stroke-width=12 加粗轨道、show-label=false 隐藏标签。

:::: details 查看代码
::: code-group

```html [HTML]
<div style="display:flex;flex-direction:column;gap:16px;width:360px;">
  <wc-progress value="80" label="已加载 80%"></wc-progress>
  <wc-progress value="45" stroke-width="12"></wc-progress>
  <wc-progress value="66" show-label="false"></wc-progress>
</div>
```

```vue [Vue]
<template>
  <div style="display:flex;flex-direction:column;gap:16px;width:360px;">
    <wc-progress value="80" label="已加载 80%"></wc-progress>
    <wc-progress value="45" stroke-width="12"></wc-progress>
    <wc-progress value="66" show-label="false"></wc-progress>
  </div>
</template>
```

```tsx [React]
import { WcProgress } from '@wc-kit/react';

<div style="display:flex;flex-direction:column;gap:16px;width:360px;">
  <WcProgress value={80} label="已加载 80%"></WcProgress>
  <WcProgress value={45} strokeWidth={12}></WcProgress>
  <WcProgress value={66} showLabel={false}></WcProgress>
</div>;
```

:::
::::

## API

### 属性

| 属性          | attribute      | 类型                                            | 默认值     | 说明                                                 |
| ------------- | -------------- | ----------------------------------------------- | ---------- | ---------------------------------------------------- |
| `value`       | `value`        | `number`                                        | `0`        | 进度值 0-100（自动夹紧）                             |
| `theme`       | `theme`        | `'line' \| 'circle'`                            | `'line'`   | 主题：line 线形 / circle 环形                        |
| `status`      | `status`       | `'normal' \| 'success' \| 'warning' \| 'error'` | `'normal'` | 状态色（normal/success/warning/error，附带状态图标） |
| `showLabel`   | `show-label`   | `boolean`                                       | `true`     | 是否显示标签文本                                     |
| `strokeWidth` | `stroke-width` | `number`                                        | `6`        | 线形轨道粗细（px）                                   |
| `label`       | `label`        | `string`                                        | `''`       | 自定义标签文本（默认显示百分比）                     |

### CSS Parts

`base` / `track` / `indicator` / `label`
