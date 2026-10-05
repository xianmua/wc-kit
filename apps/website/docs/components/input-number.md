# InputNumber 数字输入框

数字输入框组件。步进按钮与键盘（↑/↓）共用步进逻辑；值自动按 step 取整并夹在 [min, max] 区间。
基于 ElementInternals 接入原生 form，value / name / disabled 可随表单提交与重置。

**属性**

- `value`：当前值，number，默认 0
- `min`：最小值，number，默认 -Infinity
- `max`：最大值，number，默认 Infinity
- `step`：步长，number，默认 1
- `theme`：步进按钮布局 'row'（左右）| 'column'（右侧纵排）| 'normal'（不显示），默认 'row'
- `size`：尺寸 'small' | 'medium' | 'large'，默认 'medium'
- `placeholder`：占位提示
- `label`：无障碍标签（等价原生 aria-label）
- `readonly`：只读（步进按钮与键盘步进均不可用）
- `status`：校验状态 'default' | 'success' | 'warning' | 'error'，默认 'default'
- `name` / `disabled`：表单字段名 / 禁用

**事件**

- `wc-input`：手动输入时持续触发，detail.value 为解析结果（非法时为 NaN），detail.text 为原始文本
- `wc-change`：值提交时触发（失焦 / 回车 / 步进），detail.value

**React 用法**

```tsx
import { WcInputNumber } from '@wc-kit/react';

<WcInputNumber
  value={count}
  min={0}
  max={10}
  step={1}
  theme="column"
  onWcChange={(e) => setCount(e.detail.value)}
/>;
```

**Vue 用法**

```html
<!-- @wc-kit/vue 仅提供类型增强，直接使用原生标签。
     不要使用原生 v-model（它绑定 value + 原生 input 事件），
     组件派发的是 wc-input / wc-change（detail.value）。
     value 为 number，建议用 .prop 绑定（.value="count"）避免字符串化。 -->
<wc-input-number
  .value="count"
  :min="0"
  :max="10"
  @wc-change="(e) => (count = e.detail.value)"
></wc-input-number>
```

## 示例

### 步进按钮布局

<div class="demo-block">
  <div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;">
    <wc-input-number value="5" theme="row"></wc-input-number>
    <wc-input-number value="5" theme="column"></wc-input-number>
    <wc-input-number value="5" theme="normal"></wc-input-number>
  </div>
</div>

从左到右：row（按钮在左右两侧）/ column（按钮在右侧纵排）/ normal（无按钮）。

:::: details 查看代码
::: code-group

```html [HTML]
<div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;">
  <wc-input-number value="5" theme="row"></wc-input-number>
  <wc-input-number value="5" theme="column"></wc-input-number>
  <wc-input-number value="5" theme="normal"></wc-input-number>
</div>
```

```vue [Vue]
<template>
  <div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;">
    <wc-input-number value="5" theme="row"></wc-input-number>
    <wc-input-number value="5" theme="column"></wc-input-number>
    <wc-input-number value="5" theme="normal"></wc-input-number>
  </div>
</template>
```

```tsx [React]
import { WcInputNumber } from '@wc-kit/react';

<div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;">
  <WcInputNumber value={5} theme="row"></WcInputNumber>
  <WcInputNumber value={5} theme="column"></WcInputNumber>
  <WcInputNumber value={5} theme="normal"></WcInputNumber>
</div>;
```

:::
::::

### 范围与步长

<div class="demo-block">
  <wc-input-number
    style="max-width:200px"
    value="4"
    min="0"
    max="10"
    step="2"
    placeholder="0 ~ 10"
  ></wc-input-number>
</div>

min=0、max=10、step=2；手动输入超出范围的值会在提交时自动夹紧并按步长取整。

:::: details 查看代码
::: code-group

```html [HTML]
<wc-input-number
  style="max-width:200px"
  value="4"
  min="0"
  max="10"
  step="2"
  placeholder="0 ~ 10"
></wc-input-number>
```

```vue [Vue]
<template>
  <wc-input-number
    style="max-width:200px"
    value="4"
    min="0"
    max="10"
    step="2"
    placeholder="0 ~ 10"
  ></wc-input-number>
</template>
```

```tsx [React]
import { WcInputNumber } from '@wc-kit/react';

<WcInputNumber
  style="max-width:200px"
  value={4}
  min={0}
  max={10}
  step={2}
  placeholder="0 ~ 10"
></WcInputNumber>;
```

:::
::::

### 尺寸

<div class="demo-block">
  <div style="display:flex;gap:12px;align-items:center;">
    <wc-input-number size="small" value="1"></wc-input-number>
    <wc-input-number size="medium" value="2"></wc-input-number>
    <wc-input-number size="large" value="3"></wc-input-number>
  </div>
</div>

:::: details 查看代码
::: code-group

```html [HTML]
<div style="display:flex;gap:12px;align-items:center;">
  <wc-input-number size="small" value="1"></wc-input-number>
  <wc-input-number size="medium" value="2"></wc-input-number>
  <wc-input-number size="large" value="3"></wc-input-number>
</div>
```

```vue [Vue]
<template>
  <div style="display:flex;gap:12px;align-items:center;">
    <wc-input-number size="small" value="1"></wc-input-number>
    <wc-input-number size="medium" value="2"></wc-input-number>
    <wc-input-number size="large" value="3"></wc-input-number>
  </div>
</template>
```

```tsx [React]
import { WcInputNumber } from '@wc-kit/react';

<div style="display:flex;gap:12px;align-items:center;">
  <WcInputNumber size="small" value={1}></WcInputNumber>
  <WcInputNumber size="medium" value={2}></WcInputNumber>
  <WcInputNumber size="large" value={3}></WcInputNumber>
</div>;
```

:::
::::

### 状态

<div class="demo-block">
  <div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;">
    <wc-input-number value="1" status="success"></wc-input-number>
    <wc-input-number value="2" status="warning"></wc-input-number>
    <wc-input-number value="3" status="error"></wc-input-number>
    <wc-input-number value="4" readonly></wc-input-number>
    <wc-input-number value="5" disabled></wc-input-number>
  </div>
</div>

:::: details 查看代码
::: code-group

```html [HTML]
<div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;">
  <wc-input-number value="1" status="success"></wc-input-number>
  <wc-input-number value="2" status="warning"></wc-input-number>
  <wc-input-number value="3" status="error"></wc-input-number>
  <wc-input-number value="4" readonly></wc-input-number>
  <wc-input-number value="5" disabled></wc-input-number>
</div>
```

```vue [Vue]
<template>
  <div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;">
    <wc-input-number value="1" status="success"></wc-input-number>
    <wc-input-number value="2" status="warning"></wc-input-number>
    <wc-input-number value="3" status="error"></wc-input-number>
    <wc-input-number value="4" readonly></wc-input-number>
    <wc-input-number value="5" disabled></wc-input-number>
  </div>
</template>
```

```tsx [React]
import { WcInputNumber } from '@wc-kit/react';

<div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;">
  <WcInputNumber value={1} status="success"></WcInputNumber>
  <WcInputNumber value={2} status="warning"></WcInputNumber>
  <WcInputNumber value={3} status="error"></WcInputNumber>
  <WcInputNumber value={4} readonly></WcInputNumber>
  <WcInputNumber value={5} disabled></WcInputNumber>
</div>;
```

:::
::::

## API

### 属性

| 属性          | attribute     | 类型                                             | 默认值      | 说明                                                     |
| ------------- | ------------- | ------------------------------------------------ | ----------- | -------------------------------------------------------- |
| `min`         | `min`         | `—`                                              | `-Infinity` | 最小值                                                   |
| `max`         | `max`         | `—`                                              | `Infinity`  | 最大值                                                   |
| `step`        | `step`        | `number`                                         | `1`         | 步长                                                     |
| `theme`       | `theme`       | `'row' \| 'column' \| 'normal'`                  | `'row'`     | 步进按钮布局：row 左右 / column 右侧纵排 / normal 不显示 |
| `size`        | `size`        | `'small' \| 'medium' \| 'large'`                 | `'medium'`  | 尺寸                                                     |
| `placeholder` | `placeholder` | `string`                                         | `''`        | 占位提示                                                 |
| `label`       | `label`       | `string`                                         | `''`        | 无障碍标签（等价原生 aria-label）                        |
| `readonly`    | `readonly`    | `boolean`                                        | `false`     | 只读                                                     |
| `status`      | `status`      | `'default' \| 'success' \| 'warning' \| 'error'` | `'default'` | 校验状态（影响边框色）                                   |

### 事件

| 事件        | 说明                                                        |
| ----------- | ----------------------------------------------------------- |
| `wc-input`  | 手动输入时持续触发，detail.value 为解析结果（非法时为 NaN） |
| `wc-change` | 值提交时触发（失焦/回车/步进），detail.value                |

### 插槽

| 名称     | 说明 |
| -------- | ---- |
| （默认） | 无   |

### CSS 变量

| 变量                       | 说明 |
| -------------------------- | ---- |
| `--wc-input-number-height` | 高度 |

### CSS Parts

`base` / `input` / `increment-button` / `decrement-button`
