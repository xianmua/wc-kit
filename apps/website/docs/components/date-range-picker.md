# DateRangePicker 日期范围选择器

范围选择器组件（antd RangePicker 对标）：两次点击选中一个日期区间，双月面板并排展示，
悬停预览区间高亮，第二击早于起点时自动交换。值为 `YYYY-MM-DD,YYYY-MM-DD` 格式字符串
（本地时区），基于 ElementInternals 接入原生 form，value / name / disabled 可随表单提交与重置。

::: tip 与 DatePicker 的关系
`<wc-date-range-picker>` 等价于 `<wc-date-picker range>`，两者行为完全一致，保留独立标签
只为兼容旧代码。新项目推荐直接用 `range` 属性，见 [DatePicker](/components/date-picker)。
:::

**属性**

- `value`：当前选中范围，string（`YYYY-MM-DD,YYYY-MM-DD`），默认 ''；非法值会被忽略
- `placeholder`：占位提示（同时覆盖起止两端），默认取 i18n 文案（开始日期 → 结束日期）
- `label`：无障碍标签
- `size`：尺寸 'small' | 'medium' | 'large'，默认 'medium'
- `status`：校验状态 'default' | 'success' | 'warning' | 'error'，默认 'default'
- `clearable`：可清除，布尔，默认 false
- `readonly`：只读（不可展开面板），布尔，默认 false
- `open`：面板是否展开（内部状态，一般无需手动设置）
- `name` / `disabled`：表单字段名 / 禁用

**事件**

- `wc-change`：范围选定（两次点击完成）或清空时触发，detail.value 为 `[start, end]` 数组（未选端为空串）
- `wc-clear`：点击清除按钮后触发

**React 用法**

```tsx
import { WcDateRangePicker } from '@wc-kit/react';

<WcDateRangePicker
  value={range}
  clearable
  onWcChange={(e) => setRange(e.detail.value)}
/>;
```

**Vue 用法**

```html
<!-- @wc-kit/vue 仅提供类型增强，直接使用原生标签。
     不要使用原生 v-model（它绑定 value + 原生 input 事件），
     组件派发的是 wc-change（detail.value 为 [start, end] 数组）。 -->
<wc-date-range-picker
  :value="range"
  clearable
  @wc-change="(e) => (range = e.detail.value)"
></wc-date-range-picker>
```

## 示例

### 基础用法

点击选择起点，面板保持展开；再点终点完成选择。默认带清除按钮示例：

<div class="demo-block">

<div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;">
      <wc-date-range-picker style="width:300px" clearable></wc-date-range-picker>
      <wc-date-range-picker
        style="width:300px"
        value="2026-10-01,2026-10-15"
        clearable
      ></wc-date-range-picker>
    </div>

</div>

:::: details 查看代码
::: code-group

```html [HTML]
<div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;">
  <wc-date-range-picker style="width:300px" clearable></wc-date-range-picker>
  <wc-date-range-picker style="width:300px" value="2026-10-01,2026-10-15" clearable></wc-date-range-picker>
</div>
```

```vue [Vue]
<template>
  <div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;">
    <wc-date-range-picker style="width:300px" clearable></wc-date-range-picker>
    <wc-date-range-picker style="width:300px" value="2026-10-01,2026-10-15" clearable></wc-date-range-picker>
  </div>
</template>
```

```tsx [React]
import { WcDateRangePicker } from '@wc-kit/react';

<div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
  <WcDateRangePicker style={{ width: 300 }} clearable></WcDateRangePicker>
  <WcDateRangePicker style={{ width: 300 }} value="2026-10-01,2026-10-15" clearable></WcDateRangePicker>
</div>;
```

:::
::::

### 只读与禁用

<div class="demo-block">

<div style="display:flex;gap:12px;align-items:center;">
      <wc-date-range-picker
        style="width:300px"
        value="2026-10-01,2026-10-15"
        readonly
      ></wc-date-range-picker>
      <wc-date-range-picker
        style="width:300px"
        value="2026-10-01,2026-10-15"
        disabled
      ></wc-date-range-picker>
      <wc-date-range-picker
        style="width:300px"
        status="error"
        placeholder="校验失败"
      ></wc-date-range-picker>
    </div>

</div>

:::: details 查看代码
::: code-group

```html [HTML]
<div style="display:flex;gap:12px;align-items:center;">
  <wc-date-range-picker style="width:300px" value="2026-10-01,2026-10-15" readonly></wc-date-range-picker>
  <wc-date-range-picker style="width:300px" value="2026-10-01,2026-10-15" disabled></wc-date-range-picker>
  <wc-date-range-picker style="width:300px" status="error" placeholder="校验失败"></wc-date-range-picker>
</div>
```

```vue [Vue]
<template>
  <div style="display:flex;gap:12px;align-items:center;">
    <wc-date-range-picker style="width:300px" value="2026-10-01,2026-10-15" readonly></wc-date-range-picker>
    <wc-date-range-picker style="width:300px" value="2026-10-01,2026-10-15" disabled></wc-date-range-picker>
    <wc-date-range-picker style="width:300px" status="error" placeholder="校验失败"></wc-date-range-picker>
  </div>
</template>
```

```tsx [React]
import { WcDateRangePicker } from '@wc-kit/react';

<div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
  <WcDateRangePicker style={{ width: 300 }} value="2026-10-01,2026-10-15" readonly></WcDateRangePicker>
  <WcDateRangePicker style={{ width: 300 }} value="2026-10-01,2026-10-15" disabled></WcDateRangePicker>
  <WcDateRangePicker style={{ width: 300 }} status="error" placeholder="校验失败"></WcDateRangePicker>
</div>;
```

:::
::::

## API

### 属性

| 属性          | attribute     | 类型                                             | 默认值      | 说明                                     |
| ------------- | ------------- | ------------------------------------------------ | ----------- | ---------------------------------------- |
| `placeholder` | `placeholder` | `string`                                         | `''`        | 占位提示，默认取 i18n 文案               |
| `label`       | `label`       | `string`                                         | `''`        | 无障碍标签                               |
| `size`        | `size`        | `'small' \| 'medium' \| 'large'`                 | `'medium'`  | 尺寸                                     |
| `status`      | `status`      | `'default' \| 'success' \| 'warning' \| 'error'` | `'default'` | 校验状态（影响边框色）                   |
| `clearable`   | `clearable`   | `boolean`                                        | `false`     | 可清除                                   |
| `readonly`    | `readonly`    | `boolean`                                        | `false`     | 只读                                     |
| `open`        | `open`        | `boolean`                                        | `false`     | 面板是否展开（内部状态）                 |

### 事件

| 事件        | 说明                                                                     |
| ----------- | ------------------------------------------------------------------------ |
| `wc-change` | 范围选定或清空时触发，detail.value 为 `[start, end]` 数组                |
| `wc-clear`  | 点击清除按钮后触发                                                       |

### CSS 变量

| 变量                                | 说明         |
| ----------------------------------- | ------------ |
| `--wc-date-range-picker-cell-size`  | 日历格尺寸   |
| `--wc-date-picker-height`           | 触发器高度   |

### CSS Parts

`base` / `trigger` / `panel`
