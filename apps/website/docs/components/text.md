# Typography 排版

排版文本组件（`wc-text`）。type 为 text 时渲染正文，为 heading 时按 level（1~6）渲染对应字号，并输出 role="heading" + aria-level 保持无障碍语义。

主要 API：`type` 类型（text / heading，默认 text）、`level` 标题级别（仅 heading 生效，1~6，默认 3）、`theme` 语义色（default / secondary / success / warning / danger）、`disabled` 禁用态。内容走默认插槽，无自定义事件。

React 用法（`@wc-kit/react` 包装组件）：

```tsx
import { WcText } from '@wc-kit/react';

<WcText>正文内容</WcText>
<WcText type="heading" level={2}>二级标题</WcText>
<WcText theme="danger">危险提示文字</WcText>
```

Vue 用法（`@wc-kit/vue` 为纯类型增强包，直接使用原生标签）：

```vue
<template>
  <wc-text>正文内容</wc-text>
  <wc-text type="heading" :level="2">二级标题</wc-text>
  <wc-text theme="danger">危险提示文字</wc-text>
</template>
```

## 示例

### 标题

<div class="demo-block">
  <div style="display:flex;flex-direction:column;gap:8px;">
    <wc-text type="heading" level="1">一级标题</wc-text>
    <wc-text type="heading" level="2">二级标题</wc-text>
    <wc-text type="heading" level="3">三级标题</wc-text>
    <wc-text type="heading" level="4">四级标题</wc-text>
    <wc-text type="heading" level="5">五级标题</wc-text>
    <wc-text type="heading" level="6">六级标题</wc-text>
  </div>
</div>

heading 按 level（1~6）渲染对应语义与字号，输出 role="heading" + aria-level。

:::: details 查看代码
::: code-group

```html [HTML]
<div style="display:flex;flex-direction:column;gap:8px;">
  <wc-text type="heading" level="1">一级标题</wc-text>
  <wc-text type="heading" level="2">二级标题</wc-text>
  <wc-text type="heading" level="3">三级标题</wc-text>
  <wc-text type="heading" level="4">四级标题</wc-text>
  <wc-text type="heading" level="5">五级标题</wc-text>
  <wc-text type="heading" level="6">六级标题</wc-text>
</div>
```

```vue [Vue]
<template>
  <div style="display:flex;flex-direction:column;gap:8px;">
    <wc-text type="heading" level="1">一级标题</wc-text>
    <wc-text type="heading" level="2">二级标题</wc-text>
    <wc-text type="heading" level="3">三级标题</wc-text>
    <wc-text type="heading" level="4">四级标题</wc-text>
    <wc-text type="heading" level="5">五级标题</wc-text>
    <wc-text type="heading" level="6">六级标题</wc-text>
  </div>
</template>
```

```tsx [React]
import { WcText } from '@wc-kit/react';

<div style="display:flex;flex-direction:column;gap:8px;">
  <WcText type="heading" level={1}>
    一级标题
  </WcText>
  <WcText type="heading" level={2}>
    二级标题
  </WcText>
  <WcText type="heading" level={3}>
    三级标题
  </WcText>
  <WcText type="heading" level={4}>
    四级标题
  </WcText>
  <WcText type="heading" level={5}>
    五级标题
  </WcText>
  <WcText type="heading" level={6}>
    六级标题
  </WcText>
</div>;
```

:::
::::

### 语义色

<div class="demo-block">

<div style="display:flex;flex-direction:column;gap:8px;">
      <wc-text>默认文本</wc-text>
      <wc-text theme="secondary">次要文本</wc-text>
      <wc-text theme="success">成功文本</wc-text>
      <wc-text theme="warning">警告文本</wc-text>
      <wc-text theme="danger">危险文本</wc-text>
    </div>

</div>

:::: details 查看代码
::: code-group

```html [HTML]
<div style="display:flex;flex-direction:column;gap:8px;">
  <wc-text>默认文本</wc-text>
  <wc-text theme="secondary">次要文本</wc-text>
  <wc-text theme="success">成功文本</wc-text>
  <wc-text theme="warning">警告文本</wc-text>
  <wc-text theme="danger">危险文本</wc-text>
</div>
```

```vue [Vue]
<template>
  <div style="display:flex;flex-direction:column;gap:8px;">
    <wc-text>默认文本</wc-text>
    <wc-text theme="secondary">次要文本</wc-text>
    <wc-text theme="success">成功文本</wc-text>
    <wc-text theme="warning">警告文本</wc-text>
    <wc-text theme="danger">危险文本</wc-text>
  </div>
</template>
```

```tsx [React]
import { WcText } from '@wc-kit/react';

<div style="display:flex;flex-direction:column;gap:8px;">
  <WcText>默认文本</WcText>
  <WcText theme="secondary">次要文本</WcText>
  <WcText theme="success">成功文本</WcText>
  <WcText theme="warning">警告文本</WcText>
  <WcText theme="danger">危险文本</WcText>
</div>;
```

:::
::::

### 禁用态

<div class="demo-block">
  <div style="display:flex;gap:12px;align-items:center;">
    <wc-text disabled>禁用文本（灰字 + not-allowed 光标）</wc-text>
    <wc-text type="heading" level="4" disabled>禁用标题</wc-text>
  </div>
</div>

:::: details 查看代码
::: code-group

```html [HTML]
<div style="display:flex;gap:12px;align-items:center;">
  <wc-text disabled>禁用文本（灰字 + not-allowed 光标）</wc-text>
  <wc-text type="heading" level="4" disabled>禁用标题</wc-text>
</div>
```

```vue [Vue]
<template>
  <div style="display:flex;gap:12px;align-items:center;">
    <wc-text disabled>禁用文本（灰字 + not-allowed 光标）</wc-text>
    <wc-text type="heading" level="4" disabled>禁用标题</wc-text>
  </div>
</template>
```

```tsx [React]
import { WcText } from '@wc-kit/react';

<div style="display:flex;gap:12px;align-items:center;">
  <WcText disabled>禁用文本（灰字 + not-allowed 光标）</WcText>
  <WcText type="heading" level={4} disabled>
    禁用标题
  </WcText>
</div>;
```

:::
::::

## API

### 属性

| 属性       | attribute  | 类型                                                             | 默认值      | 说明                                     |
| ---------- | ---------- | ---------------------------------------------------------------- | ----------- | ---------------------------------------- |
| `type`     | `type`     | `'text' \| 'heading'`                                            | `'text'`    | 类型：正文 / 标题                        |
| `level`    | `level`    | `number`                                                         | `3`         | 标题级别（仅 heading 生效，1~6，默认 3） |
| `theme`    | `theme`    | `'default' \| 'secondary' \| 'success' \| 'warning' \| 'danger'` | `'default'` | 语义色                                   |
| `disabled` | `disabled` | `boolean`                                                        | `false`     | 禁用态（灰字 + not-allowed）             |

### 插槽

| 名称     | 说明     |
| -------- | -------- |
| （默认） | 文本内容 |

### CSS Parts

`base`
