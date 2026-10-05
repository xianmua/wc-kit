# Alert 警告提示

向用户展示需要关注的静态信息（参考 antd Alert）：左侧语义色圆头竖条 + 浅色底，四种语义色 `info` / `success` / `warning` / `danger`，支持标题、前置图标与关闭按钮。

与 antd 的差异：`type` 语义色按库内约定命名为 `theme`；关闭为组件自身隐藏并派发 `wc-close`（重新打开 = 移除 `closed` 属性）。

React 用法（`@wc-kit/react` 包装组件）：

```tsx
import { WcAlert } from '@wc-kit/react';

<WcAlert theme="warning" showIcon heading="警告" closable onWcClose={() => console.log('closed')}>
  磁盘空间不足 10%
</WcAlert>;
```

Vue 用法（`@wc-kit/vue` 为纯类型增强包，直接使用原生标签）：

```vue
<template>
  <wc-alert theme="warning" show-icon heading="警告" closable @wc-close="onClose">
    磁盘空间不足 10%
  </wc-alert>
</template>
```

## 示例

### 基础用法

四种语义色，默认 info。

<div class="demo-block">
  <div style="display: flex; flex-direction: column; gap: 12px;">
    <wc-alert>默认 info 提示：一条普通信息</wc-alert>
    <wc-alert theme="success">操作已保存</wc-alert>
    <wc-alert theme="warning">磁盘空间不足 10%</wc-alert>
    <wc-alert theme="danger">网络连接失败，请重试</wc-alert>
  </div>
</div>

:::: details 查看代码
::: code-group

```html [HTML]
<wc-alert>默认 info 提示：一条普通信息</wc-alert>
<wc-alert theme="success">操作已保存</wc-alert>
<wc-alert theme="warning">磁盘空间不足 10%</wc-alert>
<wc-alert theme="danger">网络连接失败，请重试</wc-alert>
```

```vue [Vue]
<template>
  <wc-alert>默认 info 提示：一条普通信息</wc-alert>
  <wc-alert theme="success">操作已保存</wc-alert>
  <wc-alert theme="warning">磁盘空间不足 10%</wc-alert>
  <wc-alert theme="danger">网络连接失败，请重试</wc-alert>
</template>
```

```tsx [React]
import { WcAlert } from '@wc-kit/react';

<WcAlert>默认 info 提示：一条普通信息</WcAlert>;
<WcAlert theme="success">操作已保存</WcAlert>;
<WcAlert theme="warning">磁盘空间不足 10%</WcAlert>;
<WcAlert theme="danger">网络连接失败，请重试</WcAlert>;
```

:::
::::

### 标题与图标

`heading` 声明标题，`show-icon` 按语义色自动展示图标；`slot="icon"` 可自定义图标。

<div class="demo-block">
  <div style="display: flex; flex-direction: column; gap: 12px;">
    <wc-alert heading="提示" show-icon>这是一条带标题与图标的提示信息</wc-alert>
    <wc-alert theme="danger" show-icon heading="错误">操作失败，请检查网络后重试</wc-alert>
  </div>
</div>

:::: details 查看代码
::: code-group

```html [HTML]
<wc-alert heading="提示" show-icon>这是一条带标题与图标的提示信息</wc-alert>
<wc-alert theme="danger" show-icon heading="错误">操作失败，请检查网络后重试</wc-alert>
```

```vue [Vue]
<template>
  <wc-alert heading="提示" show-icon>这是一条带标题与图标的提示信息</wc-alert>
  <wc-alert theme="danger" show-icon heading="错误">操作失败，请检查网络后重试</wc-alert>
</template>
```

```tsx [React]
import { WcAlert } from '@wc-kit/react';

<WcAlert heading="提示" showIcon>
  这是一条带标题与图标的提示信息
</WcAlert>;
<WcAlert theme="danger" showIcon heading="错误">
  操作失败，请检查网络后重试
</WcAlert>;
```

:::
::::

### 可关闭

`closable` 展示关闭按钮，点击后组件隐藏并派发 `wc-close`；框架中可监听事件同步状态，重新显示 = 把 `closed` 置回 false / 移除属性。

<div class="demo-block">
  <wc-alert closable heading="可关闭">点击右上角 × 关闭我（刷新页面可还原）</wc-alert>
</div>

:::: details 查看代码
::: code-group

```html [HTML]
<wc-alert closable heading="可关闭">点击右上角 × 关闭我</wc-alert>
<script>
  document.querySelector('wc-alert').addEventListener('wc-close', () => {
    console.log('alert closed');
  });
</script>
```

```vue [Vue]
<script setup>
const onClosed = () => console.log('alert closed');
</script>

<template>
  <wc-alert closable heading="可关闭" @wc-close="onClosed">点击右上角 × 关闭我</wc-alert>
</template>
```

```tsx [React]
import { WcAlert } from '@wc-kit/react';

<WcAlert closable heading="可关闭" onWcClose={() => console.log('closed')}>
  点击右上角 × 关闭我
</WcAlert>;
```

:::
::::

## API

### wc-alert

#### 属性

| 属性       | attribute   | 类型                                           | 默认值   | 说明                             |
| ---------- | ----------- | ---------------------------------------------- | -------- | -------------------------------- |
| `theme`    | `theme`     | `'info' \| 'success' \| 'warning' \| 'danger'` | `'info'` | 语义色                           |
| `heading`  | `heading`   | `string`                                       | `''`     | 标题（正文为默认 slot）          |
| `closable` | `closable`  | `boolean`                                      | `false`  | 可关闭：展示右上角关闭按钮       |
| `showIcon` | `show-icon` | `boolean`                                      | `false`  | 展示前置图标（按语义色自动匹配） |
| `closed`   | `closed`    | `boolean`                                      | `false`  | 已关闭（移除属性可重新显示）     |

#### 事件

| 事件       | 说明                         | detail |
| ---------- | ---------------------------- | ------ |
| `wc-close` | 点击关闭按钮、组件隐藏后触发 | —      |

#### 插槽

| 名称     | 说明                             |
| -------- | -------------------------------- |
| （默认） | 正文内容                         |
| `icon`   | 自定义前置图标（配合 show-icon） |

#### CSS Parts

`base`（主体）、`title`（标题）、`content`（正文）、`icon`（前置图标）、`close-button`（关闭按钮）

#### CSS 变量

| 变量                | 说明                              |
| ------------------- | --------------------------------- |
| `--wc-alert-radius` | 圆角（默认 `--wc-radius-medium`） |
