# Tag 标签

标签组件。内容走默认插槽，前置图标走 icon 插槽（可放 wc-icon 等任意元素）。设置 closable 后展示关闭按钮，点击派发 `wc-close` 事件，是否移除标签由使用方控制。

主要 API：`theme` 语义色（default / primary / success / warning / danger）、`size` 尺寸（small / medium / large）、`variant` 填充风格（dark 实底 / light 浅底 / outline 描边，默认 light）、`closable` 可关闭、`disabled` 禁用。事件：`wc-close`。

React 用法（`@wc-kit/react` 包装组件）：

```tsx
import { WcTag } from '@wc-kit/react';

<WcTag theme="success">成功</WcTag>
<WcTag
  theme="primary"
  closable
  onWcClose={() => console.log('close')}
>
  可关闭
</WcTag>
```

Vue 用法（`@wc-kit/vue` 为纯类型增强包，直接使用原生标签）：

```vue
<template>
  <wc-tag theme="success">成功</wc-tag>
  <wc-tag theme="primary" closable @wc-close="onClose">可关闭</wc-tag>
</template>
```

## 示例

<script setup>
// 点击关闭按钮后移除标签（是否移除由使用方决定）
function removeTag(e) {
  e.target.remove()
}
</script>

### 主题色

<div class="demo-block">

<div style="display:flex;gap:12px;align-items:center;">
      <wc-tag>默认</wc-tag>
      <wc-tag theme="primary">主要</wc-tag>
      <wc-tag theme="success">成功</wc-tag>
      <wc-tag theme="warning">警告</wc-tag>
      <wc-tag theme="danger">危险</wc-tag>
    </div>

</div>

:::: details 查看代码
::: code-group

```html [HTML]
<div style="display:flex;gap:12px;align-items:center;">
  <wc-tag>默认</wc-tag>
  <wc-tag theme="primary">主要</wc-tag>
  <wc-tag theme="success">成功</wc-tag>
  <wc-tag theme="warning">警告</wc-tag>
  <wc-tag theme="danger">危险</wc-tag>
</div>
```

```vue [Vue]
<template>
  <div style="display:flex;gap:12px;align-items:center;">
    <wc-tag>默认</wc-tag>
    <wc-tag theme="primary">主要</wc-tag>
    <wc-tag theme="success">成功</wc-tag>
    <wc-tag theme="warning">警告</wc-tag>
    <wc-tag theme="danger">危险</wc-tag>
  </div>
</template>
```

```tsx [React]
import { WcTag } from '@wc-kit/react';

<div style="display:flex;gap:12px;align-items:center;">
  <WcTag>默认</WcTag>
  <WcTag theme="primary">主要</WcTag>
  <WcTag theme="success">成功</WcTag>
  <WcTag theme="warning">警告</WcTag>
  <WcTag theme="danger">危险</WcTag>
</div>;
```

:::
::::

### 填充风格

<div class="demo-block">

<div style="display:flex;gap:12px;align-items:center;">
      <wc-tag theme="primary" variant="dark">dark</wc-tag>
      <wc-tag theme="primary" variant="light">light</wc-tag>
      <wc-tag theme="primary" variant="outline">outline</wc-tag>
    </div>

</div>

:::: details 查看代码
::: code-group

```html [HTML]
<div style="display:flex;gap:12px;align-items:center;">
  <wc-tag theme="primary" variant="dark">dark</wc-tag>
  <wc-tag theme="primary" variant="light">light</wc-tag>
  <wc-tag theme="primary" variant="outline">outline</wc-tag>
</div>
```

```vue [Vue]
<template>
  <div style="display:flex;gap:12px;align-items:center;">
    <wc-tag theme="primary" variant="dark">dark</wc-tag>
    <wc-tag theme="primary" variant="light">light</wc-tag>
    <wc-tag theme="primary" variant="outline">outline</wc-tag>
  </div>
</template>
```

```tsx [React]
import { WcTag } from '@wc-kit/react';

<div style="display:flex;gap:12px;align-items:center;">
  <WcTag theme="primary" variant="dark">
    dark
  </WcTag>
  <WcTag theme="primary" variant="light">
    light
  </WcTag>
  <WcTag theme="primary" variant="outline">
    outline
  </WcTag>
</div>;
```

:::
::::

### 尺寸

<div class="demo-block">

<div style="display:flex;gap:12px;align-items:center;">
      <wc-tag size="small">小号</wc-tag>
      <wc-tag size="medium">中号</wc-tag>
      <wc-tag size="large">大号</wc-tag>
    </div>

</div>

:::: details 查看代码
::: code-group

```html [HTML]
<div style="display:flex;gap:12px;align-items:center;">
  <wc-tag size="small">小号</wc-tag>
  <wc-tag size="medium">中号</wc-tag>
  <wc-tag size="large">大号</wc-tag>
</div>
```

```vue [Vue]
<template>
  <div style="display:flex;gap:12px;align-items:center;">
    <wc-tag size="small">小号</wc-tag>
    <wc-tag size="medium">中号</wc-tag>
    <wc-tag size="large">大号</wc-tag>
  </div>
</template>
```

```tsx [React]
import { WcTag } from '@wc-kit/react';

<div style="display:flex;gap:12px;align-items:center;">
  <WcTag size="small">小号</WcTag>
  <WcTag size="medium">中号</WcTag>
  <WcTag size="large">大号</WcTag>
</div>;
```

:::
::::

### 可关闭

<div class="demo-block">
  <div style="display:flex;gap:12px;align-items:center;">
    <wc-tag closable @wc-close="removeTag">标签一</wc-tag>
    <wc-tag theme="primary" closable @wc-close="removeTag">标签二</wc-tag>
    <wc-tag theme="danger" variant="outline" closable disabled>禁用关闭</wc-tag>
  </div>
</div>

点击关闭按钮派发 wc-close 事件（此演示中直接移除标签），禁用状态下点击无效。

:::: details 查看代码
::: code-group

```html [HTML]
<div style="display:flex;gap:12px;align-items:center;">
  <wc-tag closable id="tag-4-btn0">标签一</wc-tag>
  <wc-tag theme="primary" closable id="tag-4-btn1">标签二</wc-tag>
  <wc-tag theme="danger" variant="outline" closable disabled>禁用关闭</wc-tag>
</div>

<script type="module">
  // 点击关闭按钮后移除标签（是否移除由使用方决定）
  function removeTag(e) {
    e.target.remove();
  }

  const tag4Btn0 = document.getElementById('tag-4-btn0');
  tag4Btn0.addEventListener('wc-close', () => {
    removeTag();
  });
  const tag4Btn1 = document.getElementById('tag-4-btn1');
  tag4Btn1.addEventListener('wc-close', () => {
    removeTag();
  });

  function removeTag(e) {
    e.target.remove();
  }
</script>
```

```vue [Vue]
<template>
  <div style="display:flex;gap:12px;align-items:center;">
    <wc-tag closable @wc-close="removeTag">标签一</wc-tag>
    <wc-tag theme="primary" closable @wc-close="removeTag">标签二</wc-tag>
    <wc-tag theme="danger" variant="outline" closable disabled>禁用关闭</wc-tag>
  </div>
</template>

<script setup lang="ts">
// 点击关闭按钮后移除标签（是否移除由使用方决定）
function removeTag(e) {
  e.target.remove();
}
</script>
```

```tsx [React]
import { WcTag } from '@wc-kit/react';

<div style="display:flex;gap:12px;align-items:center;">
  <WcTag
    closable
    onWcClose={() => {
      removeTag;
    }}
  >
    标签一
  </WcTag>
  <WcTag
    theme="primary"
    closable
    onWcClose={() => {
      removeTag;
    }}
  >
    标签二
  </WcTag>
  <WcTag theme="danger" variant="outline" closable disabled>
    禁用关闭
  </WcTag>
</div>;

// 点击关闭按钮后移除标签（是否移除由使用方决定）
function removeTag(e) {
  e.target.remove();
}

function removeTag(e) {
  e.target.remove();
}
```

:::
::::

### 前置图标

<div class="demo-block">

<div style="display:flex;gap:12px;align-items:center;">
      <wc-tag theme="primary"><wc-icon slot="icon" name="info"></wc-icon>提示</wc-tag>
      <wc-tag theme="success"><wc-icon slot="icon" name="check"></wc-icon>已完成</wc-tag>
    </div>

</div>

:::: details 查看代码
::: code-group

```html [HTML]
<div style="display:flex;gap:12px;align-items:center;">
  <wc-tag theme="primary"><wc-icon slot="icon" name="info"></wc-icon>提示</wc-tag>
  <wc-tag theme="success"><wc-icon slot="icon" name="check"></wc-icon>已完成</wc-tag>
</div>
```

```vue [Vue]
<template>
  <div style="display:flex;gap:12px;align-items:center;">
    <wc-tag theme="primary"><wc-icon slot="icon" name="info"></wc-icon>提示</wc-tag>
    <wc-tag theme="success"><wc-icon slot="icon" name="check"></wc-icon>已完成</wc-tag>
  </div>
</template>
```

```tsx [React]
import { WcIcon, WcTag } from '@wc-kit/react';

<div style="display:flex;gap:12px;align-items:center;">
  <WcTag theme="primary">
    <WcIcon slot="icon" name="info"></WcIcon>提示
  </WcTag>
  <WcTag theme="success">
    <WcIcon slot="icon" name="check"></WcIcon>已完成
  </WcTag>
</div>;
```

:::
::::

## API

### 属性

| 属性       | attribute  | 类型                                                           | 默认值      | 说明                                            |
| ---------- | ---------- | -------------------------------------------------------------- | ----------- | ----------------------------------------------- |
| `theme`    | `theme`    | `'default' \| 'primary' \| 'success' \| 'warning' \| 'danger'` | `'default'` | 语义色                                          |
| `size`     | `size`     | `'small' \| 'medium' \| 'large'`                               | `'medium'`  | 尺寸                                            |
| `variant`  | `variant`  | `'dark' \| 'light' \| 'outline'`                               | `'light'`   | 填充风格：dark 实底 / light 浅底 / outline 描边 |
| `closable` | `closable` | `boolean`                                                      | `false`     | 可关闭                                          |
| `disabled` | `disabled` | `boolean`                                                      | `false`     | 禁用                                            |

### 事件

| 事件       | 说明               |
| ---------- | ------------------ |
| `wc-close` | 点击关闭按钮后触发 |

### 插槽

| 名称     | 说明     |
| -------- | -------- |
| （默认） | 标签内容 |
| `icon`   | 前置图标 |

### CSS Parts

`base` / `close-button`
