# Textarea 多行输入框

多行文本框组件。基于 ElementInternals 接入原生 form，value / name / disabled 可随表单提交与重置。

**属性**

- `value`：文本值，string，默认 ''
- `placeholder`：占位提示
- `label`：无障碍标签（等价原生 aria-label）
- `maxlength`：最大输入长度，number，设置后右下角显示字数统计
- `rows`：默认行数，number，默认 3（autosize 关闭时生效）
- `autosize`：自动按内容调整高度，布尔，默认 false
- `readonly` / `disabled`：只读 / 禁用
- `status`：校验状态 'default' | 'success' | 'warning' | 'error'，默认 'default'
- `name`：提交到表单的字段名

**事件**

- `wc-input`：输入时触发，detail.value
- `wc-change`：值变更提交时触发（失焦），detail.value

**React 用法**

```tsx
import { WcTextarea } from '@wc-kit/react';

<WcTextarea
  placeholder="请输入个人简介"
  maxlength={200}
  autosize
  onWcChange={(e) => console.log(e.detail.value)}
/>;
```

**Vue 用法**

```html
<!-- @wc-kit/vue 仅提供类型增强，直接使用原生标签。
     不要使用原生 v-model（它绑定 value + 原生 input 事件），
     组件派发的是 wc-input / wc-change（detail.value）。 -->
<wc-textarea
  :value="intro"
  placeholder="请输入个人简介"
  :maxlength="200"
  autosize
  @wc-input="(e) => (intro = e.detail.value)"
></wc-textarea>
```

## 示例

### 字数统计

<div class="demo-block">

<wc-textarea
      style="width:320px"
      maxlength="100"
      placeholder="最多输入 100 个字，右下角显示字数统计"
    ></wc-textarea>

</div>

:::: details 查看代码
::: code-group

```html [HTML]
<wc-textarea
  style="width:320px"
  maxlength="100"
  placeholder="最多输入 100 个字，右下角显示字数统计"
></wc-textarea>
```

```vue [Vue]
<template>
  <wc-textarea
    style="width:320px"
    maxlength="100"
    placeholder="最多输入 100 个字，右下角显示字数统计"
  ></wc-textarea>
</template>
```

```tsx [React]
import { WcTextarea } from '@wc-kit/react';

<WcTextarea
  style="width:320px"
  maxlength={100}
  placeholder="最多输入 100 个字，右下角显示字数统计"
></WcTextarea>;
```

:::
::::

### 自动高度

<div class="demo-block">

<div style="display:flex;gap:12px;align-items:flex-start;">
      <wc-textarea
        style="width:240px"
        autosize
        placeholder="autosize：随内容自动增高"
      ></wc-textarea>
      <wc-textarea style="width:240px" rows="5" placeholder="rows=5：固定 5 行"></wc-textarea>
    </div>

</div>

:::: details 查看代码
::: code-group

```html [HTML]
<div style="display:flex;gap:12px;align-items:flex-start;">
  <wc-textarea style="width:240px" autosize placeholder="autosize：随内容自动增高"></wc-textarea>
  <wc-textarea style="width:240px" rows="5" placeholder="rows=5：固定 5 行"></wc-textarea>
</div>
```

```vue [Vue]
<template>
  <div style="display:flex;gap:12px;align-items:flex-start;">
    <wc-textarea style="width:240px" autosize placeholder="autosize：随内容自动增高"></wc-textarea>
    <wc-textarea style="width:240px" rows="5" placeholder="rows=5：固定 5 行"></wc-textarea>
  </div>
</template>
```

```tsx [React]
import { WcTextarea } from '@wc-kit/react';

<div style="display:flex;gap:12px;align-items:flex-start;">
  <WcTextarea style="width:240px" autosize placeholder="autosize：随内容自动增高"></WcTextarea>
  <WcTextarea style="width:240px" rows={5} placeholder="rows=5：固定 5 行"></WcTextarea>
</div>;
```

:::
::::

### 状态

<div class="demo-block">

<div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;">
      <wc-textarea style="width:200px" status="success" placeholder="成功 success"></wc-textarea>
      <wc-textarea style="width:200px" status="warning" placeholder="警告 warning"></wc-textarea>
      <wc-textarea style="width:200px" status="error" placeholder="错误 error"></wc-textarea>
      <wc-textarea style="width:200px" value="只读内容" readonly></wc-textarea>
      <wc-textarea style="width:200px" value="禁用内容" disabled></wc-textarea>
    </div>

</div>

:::: details 查看代码
::: code-group

```html [HTML]
<div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;">
  <wc-textarea style="width:200px" status="success" placeholder="成功 success"></wc-textarea>
  <wc-textarea style="width:200px" status="warning" placeholder="警告 warning"></wc-textarea>
  <wc-textarea style="width:200px" status="error" placeholder="错误 error"></wc-textarea>
  <wc-textarea style="width:200px" value="只读内容" readonly></wc-textarea>
  <wc-textarea style="width:200px" value="禁用内容" disabled></wc-textarea>
</div>
```

```vue [Vue]
<template>
  <div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;">
    <wc-textarea style="width:200px" status="success" placeholder="成功 success"></wc-textarea>
    <wc-textarea style="width:200px" status="warning" placeholder="警告 warning"></wc-textarea>
    <wc-textarea style="width:200px" status="error" placeholder="错误 error"></wc-textarea>
    <wc-textarea style="width:200px" value="只读内容" readonly></wc-textarea>
    <wc-textarea style="width:200px" value="禁用内容" disabled></wc-textarea>
  </div>
</template>
```

```tsx [React]
import { WcTextarea } from '@wc-kit/react';

<div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;">
  <WcTextarea style="width:200px" status="success" placeholder="成功 success"></WcTextarea>
  <WcTextarea style="width:200px" status="warning" placeholder="警告 warning"></WcTextarea>
  <WcTextarea style="width:200px" status="error" placeholder="错误 error"></WcTextarea>
  <WcTextarea style="width:200px" value="只读内容" readonly></WcTextarea>
  <WcTextarea style="width:200px" value="禁用内容" disabled></WcTextarea>
</div>;
```

:::
::::

## API

### 属性

| 属性          | attribute     | 类型                                             | 默认值      | 说明                              |
| ------------- | ------------- | ------------------------------------------------ | ----------- | --------------------------------- |
| `placeholder` | `placeholder` | `string`                                         | `''`        | 占位提示                          |
| `label`       | `label`       | `string`                                         | `''`        | 无障碍标签（等价原生 aria-label） |
| `rows`        | `rows`        | `number`                                         | `3`         | 默认行数（autosize 关闭时生效）   |
| `autosize`    | `autosize`    | `boolean`                                        | `false`     | 自动按内容调整高度                |
| `readonly`    | `readonly`    | `boolean`                                        | `false`     | 只读                              |
| `status`      | `status`      | `'default' \| 'success' \| 'warning' \| 'error'` | `'default'` | 校验状态（影响边框色）            |

### 事件

| 事件        | 说明                                   |
| ----------- | -------------------------------------- |
| `wc-input`  | 输入时触发，detail.value               |
| `wc-change` | 值变更提交时触发（失焦），detail.value |

### CSS 变量

| 变量                       | 说明     |
| -------------------------- | -------- |
| `--wc-textarea-min-height` | 最小高度 |

### CSS Parts

`base` / `textarea` / `count`
