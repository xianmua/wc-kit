# DatePicker 日期选择器

日期选择器组件，值为 YYYY-MM-DD 格式字符串（本地时区）。点击触发器展开日历面板，支持年/月切换、
「今天」快捷选择与完整的键盘导航（方向键移动高亮、Enter/Space 选择、Esc 关闭）。
基于 ElementInternals 接入原生 form，value / name / disabled 可随表单提交与重置。

**属性**

- `value`：当前选中值，string（YYYY-MM-DD），默认 ''；非法值会被忽略
- `placeholder`：占位提示，默认取 i18n 文案
- `label`：无障碍标签
- `size`：尺寸 'small' | 'medium' | 'large'，默认 'medium'
- `status`：校验状态 'default' | 'success' | 'warning' | 'error'，默认 'default'
- `clearable`：可清除，布尔，默认 false
- `readonly`：只读（不可展开面板），布尔，默认 false
- `open`：面板是否展开（内部状态，一般无需手动设置）
- `name` / `disabled`：表单字段名 / 禁用

**事件**

- `wc-change`：选中日期变化时触发，detail.value（YYYY-MM-DD）
- `wc-clear`：点击清除按钮后触发

**React 用法**

```tsx
import { WcDatePicker } from '@wc-kit/react';

<WcDatePicker
  value={date}
  clearable
  onWcChange={(e) => setDate(e.detail.value)}
/>;
```

**Vue 用法**

```html
<!-- @wc-kit/vue 仅提供类型增强，直接使用原生标签。
     不要使用原生 v-model（它绑定 value + 原生 input 事件），
     组件派发的是 wc-change（detail.value，YYYY-MM-DD）。 -->
<wc-date-picker
  :value="date"
  clearable
  @wc-change="(e) => (date = e.detail.value)"
></wc-date-picker>
```

## 示例

### 默认选中与可清除

<div class="demo-block">

<div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;">
      <wc-date-picker style="width:200px" value="2026-10-01"></wc-date-picker>
      <wc-date-picker style="width:200px" value="2026-10-01" clearable></wc-date-picker>
    </div>

</div>

:::: details 查看代码
::: code-group

```html [HTML]
<div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;">
  <wc-date-picker style="width:200px" value="2026-10-01"></wc-date-picker>
  <wc-date-picker style="width:200px" value="2026-10-01" clearable></wc-date-picker>
</div>
```

```vue [Vue]
<template>
  <div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;">
    <wc-date-picker style="width:200px" value="2026-10-01"></wc-date-picker>
    <wc-date-picker style="width:200px" value="2026-10-01" clearable></wc-date-picker>
  </div>
</template>
```

```tsx [React]
import { WcDatePicker } from '@wc-kit/react';

<div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;">
  <WcDatePicker style="width:200px" value="2026-10-01"></WcDatePicker>
  <WcDatePicker style="width:200px" value="2026-10-01" clearable></WcDatePicker>
</div>;
```

:::
::::

### 一周起始日

日历一周从**周日**开始，暂不提供配置属性。

### 尺寸

<div class="demo-block">

<div style="display:flex;gap:12px;align-items:center;">
      <wc-date-picker size="small" style="width:140px" placeholder="小号 small"></wc-date-picker>
      <wc-date-picker size="medium" style="width:140px" placeholder="中号 medium"></wc-date-picker>
      <wc-date-picker size="large" style="width:140px" placeholder="大号 large"></wc-date-picker>
    </div>

</div>

:::: details 查看代码
::: code-group

```html [HTML]
<div style="display:flex;gap:12px;align-items:center;">
  <wc-date-picker size="small" style="width:140px" placeholder="小号 small"></wc-date-picker>
  <wc-date-picker size="medium" style="width:140px" placeholder="中号 medium"></wc-date-picker>
  <wc-date-picker size="large" style="width:140px" placeholder="大号 large"></wc-date-picker>
</div>
```

```vue [Vue]
<template>
  <div style="display:flex;gap:12px;align-items:center;">
    <wc-date-picker size="small" style="width:140px" placeholder="小号 small"></wc-date-picker>
    <wc-date-picker size="medium" style="width:140px" placeholder="中号 medium"></wc-date-picker>
    <wc-date-picker size="large" style="width:140px" placeholder="大号 large"></wc-date-picker>
  </div>
</template>
```

```tsx [React]
import { WcDatePicker } from '@wc-kit/react';

<div style="display:flex;gap:12px;align-items:center;">
  <WcDatePicker size="small" style="width:140px" placeholder="小号 small"></WcDatePicker>
  <WcDatePicker size="medium" style="width:140px" placeholder="中号 medium"></WcDatePicker>
  <WcDatePicker size="large" style="width:140px" placeholder="大号 large"></WcDatePicker>
</div>;
```

:::
::::

### 只读与禁用

<div class="demo-block">

<div style="display:flex;gap:12px;align-items:center;">
      <wc-date-picker style="width:200px" value="2026-10-01" readonly></wc-date-picker>
      <wc-date-picker style="width:200px" value="2026-10-01" disabled></wc-date-picker>
      <wc-date-picker
        style="width:200px"
        status="error"
        placeholder="校验失败 error"
      ></wc-date-picker>
    </div>

</div>

:::: details 查看代码
::: code-group

```html [HTML]
<div style="display:flex;gap:12px;align-items:center;">
  <wc-date-picker style="width:200px" value="2026-10-01" readonly></wc-date-picker>
  <wc-date-picker style="width:200px" value="2026-10-01" disabled></wc-date-picker>
  <wc-date-picker style="width:200px" status="error" placeholder="校验失败 error"></wc-date-picker>
</div>
```

```vue [Vue]
<template>
  <div style="display:flex;gap:12px;align-items:center;">
    <wc-date-picker style="width:200px" value="2026-10-01" readonly></wc-date-picker>
    <wc-date-picker style="width:200px" value="2026-10-01" disabled></wc-date-picker>
    <wc-date-picker
      style="width:200px"
      status="error"
      placeholder="校验失败 error"
    ></wc-date-picker>
  </div>
</template>
```

```tsx [React]
import { WcDatePicker } from '@wc-kit/react';

<div style="display:flex;gap:12px;align-items:center;">
  <WcDatePicker style="width:200px" value="2026-10-01" readonly></WcDatePicker>
  <WcDatePicker style="width:200px" value="2026-10-01" disabled></WcDatePicker>
  <WcDatePicker style="width:200px" status="error" placeholder="校验失败 error"></WcDatePicker>
</div>;
```

:::
::::

## API

### 属性

| 属性             | attribute           | 类型                                             | 默认值      | 说明                                   |
| ---------------- | ------------------- | ------------------------------------------------ | ----------- | -------------------------------------- |
| `placeholder`    | `placeholder`       | `string`                                         | `''`        | 占位提示，默认取 i18n 文案             |
| `label`          | `label`             | `string`                                         | `''`        | 无障碍标签                             |
| `size`           | `size`              | `'small' \| 'medium' \| 'large'`                 | `'medium'`  | 尺寸                                   |
| `status`         | `status`            | `'default' \| 'success' \| 'warning' \| 'error'` | `'default'` | 校验状态（影响边框色）                 |
| `clearable`      | `clearable`         | `boolean`                                        | `false`     | 可清除                                 |
| `readonly`       | `readonly`          | `boolean`                                        | `false`     | 只读                                   |
| `open`           | `open`              | `boolean`                                        | `false`     | 面板是否展开（内部状态）               |

### 事件

| 事件        | 说明                                           |
| ----------- | ---------------------------------------------- |
| `wc-change` | 选中日期变化时触发，detail.value（YYYY-MM-DD） |
| `wc-clear`  | 点击清除按钮后触发                             |

### CSS 变量

| 变量                      | 说明       |
| ------------------------- | ---------- |
| `--wc-date-picker-height` | 触发器高度 |

### CSS Parts

`base` / `trigger` / `panel`
