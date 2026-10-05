# Checkbox 复选框

复选框组件。标签文本写在默认插槽；基于 ElementInternals 接入原生 form，选中时按 value 提交表单值。

**属性**

- `checked`：选中状态，布尔，默认 false
- `indeterminate`：半选状态（样式上的不确定态，不改变 checked），布尔，默认 false；用户交互后自动解除
- `value`：选中时提交到表单的值，string，默认 'on'
- `label`：无障碍标签（无默认插槽文本时使用）
- `name`：提交到表单的字段名
- `disabled`：是否禁用

**事件**

- `wc-change`：选中状态变化时触发，detail.checked / detail.value

**React 用法**

```tsx
import { WcCheckbox } from '@wc-kit/react';

<WcCheckbox checked={agree} onWcChange={(e) => setAgree(e.detail.checked)}>
  我已阅读并同意用户协议
</WcCheckbox>;
```

**Vue 用法**

```html
<!-- @wc-kit/vue 仅提供类型增强，直接使用原生标签。
     不要使用原生 v-model（它绑定 value + 原生 input 事件），
     组件派发的是 wc-change（detail.checked / detail.value）。 -->
<wc-checkbox :checked="agree" @wc-change="(e) => (agree = e.detail.checked)">
  我已阅读并同意用户协议
</wc-checkbox>
```

## 示例

### 全部状态

<div class="demo-block">

<div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;">
      <wc-checkbox>未选中</wc-checkbox>
      <wc-checkbox checked>选中</wc-checkbox>
      <wc-checkbox indeterminate>半选</wc-checkbox>
      <wc-checkbox disabled>禁用未选中</wc-checkbox>
      <wc-checkbox checked disabled>禁用选中</wc-checkbox>
    </div>

</div>

:::: details 查看代码
::: code-group

```html [HTML]
<div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;">
  <wc-checkbox>未选中</wc-checkbox>
  <wc-checkbox checked>选中</wc-checkbox>
  <wc-checkbox indeterminate>半选</wc-checkbox>
  <wc-checkbox disabled>禁用未选中</wc-checkbox>
  <wc-checkbox checked disabled>禁用选中</wc-checkbox>
</div>
```

```vue [Vue]
<template>
  <div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;">
    <wc-checkbox>未选中</wc-checkbox>
    <wc-checkbox checked>选中</wc-checkbox>
    <wc-checkbox indeterminate>半选</wc-checkbox>
    <wc-checkbox disabled>禁用未选中</wc-checkbox>
    <wc-checkbox checked disabled>禁用选中</wc-checkbox>
  </div>
</template>
```

```tsx [React]
import { WcCheckbox } from '@wc-kit/react';

<div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;">
  <WcCheckbox>未选中</WcCheckbox>
  <WcCheckbox checked>选中</WcCheckbox>
  <WcCheckbox indeterminate>半选</WcCheckbox>
  <WcCheckbox disabled>禁用未选中</WcCheckbox>
  <WcCheckbox checked disabled>
    禁用选中
  </WcCheckbox>
</div>;
```

:::
::::

### 复选框组

<div class="demo-block">

<div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;">
      <wc-checkbox name="skill" value="js" checked>JavaScript</wc-checkbox>
      <wc-checkbox name="skill" value="ts">TypeScript</wc-checkbox>
      <wc-checkbox name="skill" value="css">CSS</wc-checkbox>
      <wc-checkbox name="skill" value="rust" disabled>Rust（禁用）</wc-checkbox>
    </div>

</div>

:::: details 查看代码
::: code-group

```html [HTML]
<div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;">
  <wc-checkbox name="skill" value="js" checked>JavaScript</wc-checkbox>
  <wc-checkbox name="skill" value="ts">TypeScript</wc-checkbox>
  <wc-checkbox name="skill" value="css">CSS</wc-checkbox>
  <wc-checkbox name="skill" value="rust" disabled>Rust（禁用）</wc-checkbox>
</div>
```

```vue [Vue]
<template>
  <div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;">
    <wc-checkbox name="skill" value="js" checked>JavaScript</wc-checkbox>
    <wc-checkbox name="skill" value="ts">TypeScript</wc-checkbox>
    <wc-checkbox name="skill" value="css">CSS</wc-checkbox>
    <wc-checkbox name="skill" value="rust" disabled>Rust（禁用）</wc-checkbox>
  </div>
</template>
```

```tsx [React]
import { WcCheckbox } from '@wc-kit/react';

<div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;">
  <WcCheckbox name="skill" value="js" checked>
    JavaScript
  </WcCheckbox>
  <WcCheckbox name="skill" value="ts">
    TypeScript
  </WcCheckbox>
  <WcCheckbox name="skill" value="css">
    CSS
  </WcCheckbox>
  <WcCheckbox name="skill" value="rust" disabled>
    Rust（禁用）
  </WcCheckbox>
</div>;
```

:::
::::

## API

### 属性

| 属性            | attribute       | 类型      | 默认值  | 说明                                         |
| --------------- | --------------- | --------- | ------- | -------------------------------------------- |
| `checked`       | `checked`       | `boolean` | `false` | 选中状态                                     |
| `indeterminate` | `indeterminate` | `boolean` | `false` | 半选状态（样式上的不确定态，不改变 checked） |
| `value`         | `value`         | `string`  | `'on'`  | 选中时提交到表单的值                         |
| `label`         | `label`         | `string`  | `''`    | 无障碍标签（无默认插槽文本时使用）           |

### 事件

| 事件        | 说明                                              |
| ----------- | ------------------------------------------------- |
| `wc-change` | 选中状态变化时触发，detail.checked / detail.value |

### 插槽

| 名称     | 说明     |
| -------- | -------- |
| （默认） | 标签文本 |

### CSS Parts

`base` / `box` / `label`
