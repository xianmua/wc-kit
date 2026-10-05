# Popconfirm 气泡确认框

气泡确认框：点击触发的二次确认浮层，确认 / 取消后自动关闭；点击外部或按 Esc 也会关闭（派发 wc-cancel）。
定位空间不足时自动翻转方向。

## 主要 API

- 属性：content 确认文案；placement 期望方向（默认 top）；confirm-text / cancel-text 按钮文案
  （默认 i18n「确认 / 取消」）；theme 确认按钮主题（默认 primary，透传 wc-button）；
  icon 图标名（默认 warning，空字符串隐藏）；open 是否打开
- 方法：show() 打开；hide() 关闭（不派发事件）；confirm() / cancel() 确认 / 取消并关闭
- 事件：wc-confirm 点击确认（之后自动关闭）；wc-cancel 点击取消 / 外部点击 / Esc
  （detail.reason 为 button / outside / escape，之后自动关闭）
- 插槽：默认插槽为触发元素；content 插槽为富文本确认内容

## React（@wc-kit/react）

```tsx
import { WcPopconfirm } from '@wc-kit/react';

<WcPopconfirm
  content="确定删除吗？"
  confirmText="删除"
  cancelText="再想想"
  theme="danger"
  onWcConfirm={() => console.log('已确认')}
  onWcCancel={(e) => console.log('取消来源：', e.detail.reason)}
>
  <button>删除</button>
</WcPopconfirm>;
```

## Vue（原生标签 + @wc-kit/vue 类型增强）

```vue
<template>
  <wc-popconfirm
    content="确定删除吗？"
    confirm-text="删除"
    cancel-text="再想想"
    theme="danger"
    @wc-confirm="onConfirm"
    @wc-cancel="onCancel"
  >
    <wc-button theme="danger">删除</wc-button>
  </wc-popconfirm>
</template>
```

## 示例

<script setup>
function msg(type, text) {
  import('@wc-kit/core').then(({ message }) => message[type](text))
}
function onCancel(e) {
  msg('info', `wc-cancel：取消来源 = ${e.detail?.reason}`)
}
</script>

### 弹出位置

<div class="demo-block">
  <div style="display:flex;gap:12px;flex-wrap:wrap;">
    <wc-popconfirm content="位置：top" placement="top">
      <wc-button variant="outline">top</wc-button>
    </wc-popconfirm>
    <wc-popconfirm content="位置：top-start" placement="top-start">
      <wc-button variant="outline">top-start</wc-button>
    </wc-popconfirm>
    <wc-popconfirm content="位置：top-end" placement="top-end">
      <wc-button variant="outline">top-end</wc-button>
    </wc-popconfirm>
    <wc-popconfirm content="位置：bottom" placement="bottom">
      <wc-button variant="outline">bottom</wc-button>
    </wc-popconfirm>
    <wc-popconfirm content="位置：bottom-start" placement="bottom-start">
      <wc-button variant="outline">bottom-start</wc-button>
    </wc-popconfirm>
    <wc-popconfirm content="位置：bottom-end" placement="bottom-end">
      <wc-button variant="outline">bottom-end</wc-button>
    </wc-popconfirm>
    <wc-popconfirm content="位置：left" placement="left">
      <wc-button variant="outline">left</wc-button>
    </wc-popconfirm>
    <wc-popconfirm content="位置：left-start" placement="left-start">
      <wc-button variant="outline">left-start</wc-button>
    </wc-popconfirm>
    <wc-popconfirm content="位置：left-end" placement="left-end">
      <wc-button variant="outline">left-end</wc-button>
    </wc-popconfirm>
    <wc-popconfirm content="位置：right" placement="right">
      <wc-button variant="outline">right</wc-button>
    </wc-popconfirm>
    <wc-popconfirm content="位置：right-start" placement="right-start">
      <wc-button variant="outline">right-start</wc-button>
    </wc-popconfirm>
    <wc-popconfirm content="位置：right-end" placement="right-end">
      <wc-button variant="outline">right-end</wc-button>
    </wc-popconfirm>
  </div>
</div>

空间不足时自动翻转方向；点击外部或按 Esc 也会关闭。

:::: details 查看代码
::: code-group

```html [HTML]
<div style="display:flex;gap:12px;flex-wrap:wrap;">
  <wc-popconfirm content="位置：top" placement="top">
    <wc-button variant="outline">top</wc-button>
  </wc-popconfirm>
  <wc-popconfirm content="位置：top-start" placement="top-start">
    <wc-button variant="outline">top-start</wc-button>
  </wc-popconfirm>
  <wc-popconfirm content="位置：top-end" placement="top-end">
    <wc-button variant="outline">top-end</wc-button>
  </wc-popconfirm>
  <wc-popconfirm content="位置：bottom" placement="bottom">
    <wc-button variant="outline">bottom</wc-button>
  </wc-popconfirm>
  <wc-popconfirm content="位置：bottom-start" placement="bottom-start">
    <wc-button variant="outline">bottom-start</wc-button>
  </wc-popconfirm>
  <wc-popconfirm content="位置：bottom-end" placement="bottom-end">
    <wc-button variant="outline">bottom-end</wc-button>
  </wc-popconfirm>
  <wc-popconfirm content="位置：left" placement="left">
    <wc-button variant="outline">left</wc-button>
  </wc-popconfirm>
  <wc-popconfirm content="位置：left-start" placement="left-start">
    <wc-button variant="outline">left-start</wc-button>
  </wc-popconfirm>
  <wc-popconfirm content="位置：left-end" placement="left-end">
    <wc-button variant="outline">left-end</wc-button>
  </wc-popconfirm>
  <wc-popconfirm content="位置：right" placement="right">
    <wc-button variant="outline">right</wc-button>
  </wc-popconfirm>
  <wc-popconfirm content="位置：right-start" placement="right-start">
    <wc-button variant="outline">right-start</wc-button>
  </wc-popconfirm>
  <wc-popconfirm content="位置：right-end" placement="right-end">
    <wc-button variant="outline">right-end</wc-button>
  </wc-popconfirm>
</div>
```

```vue [Vue]
<template>
  <div style="display:flex;gap:12px;flex-wrap:wrap;">
    <wc-popconfirm content="位置：top" placement="top">
      <wc-button variant="outline">top</wc-button>
    </wc-popconfirm>
    <wc-popconfirm content="位置：top-start" placement="top-start">
      <wc-button variant="outline">top-start</wc-button>
    </wc-popconfirm>
    <wc-popconfirm content="位置：top-end" placement="top-end">
      <wc-button variant="outline">top-end</wc-button>
    </wc-popconfirm>
    <wc-popconfirm content="位置：bottom" placement="bottom">
      <wc-button variant="outline">bottom</wc-button>
    </wc-popconfirm>
    <wc-popconfirm content="位置：bottom-start" placement="bottom-start">
      <wc-button variant="outline">bottom-start</wc-button>
    </wc-popconfirm>
    <wc-popconfirm content="位置：bottom-end" placement="bottom-end">
      <wc-button variant="outline">bottom-end</wc-button>
    </wc-popconfirm>
    <wc-popconfirm content="位置：left" placement="left">
      <wc-button variant="outline">left</wc-button>
    </wc-popconfirm>
    <wc-popconfirm content="位置：left-start" placement="left-start">
      <wc-button variant="outline">left-start</wc-button>
    </wc-popconfirm>
    <wc-popconfirm content="位置：left-end" placement="left-end">
      <wc-button variant="outline">left-end</wc-button>
    </wc-popconfirm>
    <wc-popconfirm content="位置：right" placement="right">
      <wc-button variant="outline">right</wc-button>
    </wc-popconfirm>
    <wc-popconfirm content="位置：right-start" placement="right-start">
      <wc-button variant="outline">right-start</wc-button>
    </wc-popconfirm>
    <wc-popconfirm content="位置：right-end" placement="right-end">
      <wc-button variant="outline">right-end</wc-button>
    </wc-popconfirm>
  </div>
</template>
```

```tsx [React]
import { WcButton, WcPopconfirm } from '@wc-kit/react';

<div style="display:flex;gap:12px;flex-wrap:wrap;">
  <WcPopconfirm content="位置：top" placement="top">
    <WcButton variant="outline">top</WcButton>
  </WcPopconfirm>
  <WcPopconfirm content="位置：top-start" placement="top-start">
    <WcButton variant="outline">top-start</WcButton>
  </WcPopconfirm>
  <WcPopconfirm content="位置：top-end" placement="top-end">
    <WcButton variant="outline">top-end</WcButton>
  </WcPopconfirm>
  <WcPopconfirm content="位置：bottom" placement="bottom">
    <WcButton variant="outline">bottom</WcButton>
  </WcPopconfirm>
  <WcPopconfirm content="位置：bottom-start" placement="bottom-start">
    <WcButton variant="outline">bottom-start</WcButton>
  </WcPopconfirm>
  <WcPopconfirm content="位置：bottom-end" placement="bottom-end">
    <WcButton variant="outline">bottom-end</WcButton>
  </WcPopconfirm>
  <WcPopconfirm content="位置：left" placement="left">
    <WcButton variant="outline">left</WcButton>
  </WcPopconfirm>
  <WcPopconfirm content="位置：left-start" placement="left-start">
    <WcButton variant="outline">left-start</WcButton>
  </WcPopconfirm>
  <WcPopconfirm content="位置：left-end" placement="left-end">
    <WcButton variant="outline">left-end</WcButton>
  </WcPopconfirm>
  <WcPopconfirm content="位置：right" placement="right">
    <WcButton variant="outline">right</WcButton>
  </WcPopconfirm>
  <WcPopconfirm content="位置：right-start" placement="right-start">
    <WcButton variant="outline">right-start</WcButton>
  </WcPopconfirm>
  <WcPopconfirm content="位置：right-end" placement="right-end">
    <WcButton variant="outline">right-end</WcButton>
  </WcPopconfirm>
</div>;
```

:::
::::

### 危险操作

<div class="demo-block">

<wc-popconfirm
      content="删除后数据不可恢复，确定删除吗？"
      confirm-text="删除"
      cancel-text="再想想"
      theme="danger"
      icon="error"
    >
<wc-button theme="danger">删除数据</wc-button>
</wc-popconfirm>

</div>

:::: details 查看代码
::: code-group

```html [HTML]
<wc-popconfirm
  content="删除后数据不可恢复，确定删除吗？"
  confirm-text="删除"
  cancel-text="再想想"
  theme="danger"
  icon="error"
>
  <wc-button theme="danger">删除数据</wc-button>
</wc-popconfirm>
```

```vue [Vue]
<template>
  <wc-popconfirm
    content="删除后数据不可恢复，确定删除吗？"
    confirm-text="删除"
    cancel-text="再想想"
    theme="danger"
    icon="error"
  >
    <wc-button theme="danger">删除数据</wc-button>
  </wc-popconfirm>
</template>
```

```tsx [React]
import { WcButton, WcPopconfirm } from '@wc-kit/react';

<WcPopconfirm
  content="删除后数据不可恢复，确定删除吗？"
  confirmText="删除"
  cancelText="再想想"
  theme="danger"
  icon="error"
>
  <WcButton theme="danger">删除数据</WcButton>
</WcPopconfirm>;
```

:::
::::

### 事件

<div class="demo-block">
  <wc-popconfirm
    content="确定执行此操作吗？"
    @wc-confirm="msg('success', 'wc-confirm：用户点击了确认')"
    @wc-cancel="onCancel"
  >
    <wc-button theme="danger">删除数据</wc-button>
  </wc-popconfirm>
</div>

确认 / 取消后自动关闭；点击外部或按 Esc 也会关闭并派发 wc-cancel（detail.reason 为 button / outside / escape）。

:::: details 查看代码
::: code-group

```html [HTML]
<wc-popconfirm content="确定执行此操作吗？" id="popconfirm-3-btn0">
  <wc-button theme="danger">删除数据</wc-button>
</wc-popconfirm>

<script type="module">
  const { message } = await import('@wc-kit/core');

  function msg(type, text) {
    import('@wc-kit/core').then(({ message }) => message[type](text));
  }
  function onCancel(e) {
    // detail.reason 为 button / outside / escape
    msg('info', `wc-cancel：取消来源 = ${e.detail?.reason}`);
  }

  const popconfirm3Btn0 = document.getElementById('popconfirm-3-btn0');
  popconfirm3Btn0.addEventListener('wc-confirm', () => {
    message.success('wc-confirm：用户点击了确认');
  });
  popconfirm3Btn0.addEventListener('wc-cancel', () => {
    onCancel();
  });

  function msg(type, text) {
    import('@wc-kit/core').then(({ message }) => message[type](text));
  }

  function onCancel(e) {
    msg('info', `wc-cancel：取消来源 = ${e.detail?.reason}`);
  }
</script>
```

```vue [Vue]
<template>
  <wc-popconfirm
    content="确定执行此操作吗？"
    @wc-confirm="msg('success', 'wc-confirm：用户点击了确认')"
    @wc-cancel="onCancel"
  >
    <wc-button theme="danger">删除数据</wc-button>
  </wc-popconfirm>
</template>

<script setup lang="ts">
function msg(type, text) {
  import('@wc-kit/core').then(({ message }) => message[type](text));
}
function onCancel(e) {
  // detail.reason 为 button / outside / escape
  msg('info', `wc-cancel：取消来源 = ${e.detail?.reason}`);
}
</script>
```

```tsx [React]
import { WcButton, WcPopconfirm } from '@wc-kit/react';
import { message } from '@wc-kit/core';

<WcPopconfirm
  content="确定执行此操作吗？"
  onWcConfirm={() => {
    message.success('wc-confirm：用户点击了确认');
  }}
  onWcCancel={() => {
    onCancel;
  }}
>
  <WcButton theme="danger">删除数据</WcButton>
</WcPopconfirm>;

function msg(type, text) {
  import('@wc-kit/core').then(({ message }) => message[type](text));
}
function onCancel(e) {
  // detail.reason 为 button / outside / escape
  msg('info', `wc-cancel：取消来源 = ${e.detail?.reason}`);
}

function msg(type, text) {
  import('@wc-kit/core').then(({ message }) => message[type](text));
}

function onCancel(e) {
  msg('info', `wc-cancel：取消来源 = ${e.detail?.reason}`);
}
```

:::
::::

### 内容插槽

<div class="demo-block">

<wc-popconfirm placement="bottom">
      <wc-button>删除</wc-button>
      <div slot="content">
        删除后数据不可恢复，<b>请谨慎操作</b>。这段内容来自 content 插槽，会覆盖 content 属性。
      </div>
    </wc-popconfirm>

</div>

:::: details 查看代码
::: code-group

```html [HTML]
<wc-popconfirm placement="bottom">
  <wc-button>删除</wc-button>
  <div slot="content">
    删除后数据不可恢复，<b>请谨慎操作</b>。这段内容来自 content 插槽，会覆盖 content 属性。
  </div>
</wc-popconfirm>
```

```vue [Vue]
<template>
  <wc-popconfirm placement="bottom">
    <wc-button>删除</wc-button>
    <div slot="content">
      删除后数据不可恢复，<b>请谨慎操作</b>。这段内容来自 content 插槽，会覆盖 content 属性。
    </div>
  </wc-popconfirm>
</template>
```

```tsx [React]
import { WcButton, WcPopconfirm } from '@wc-kit/react';

<WcPopconfirm placement="bottom">
  <WcButton>删除</WcButton>
  <div slot="content">
    删除后数据不可恢复，<b>请谨慎操作</b>。这段内容来自 content 插槽，会覆盖 content 属性。
  </div>
</WcPopconfirm>;
```

:::
::::

## API

### 属性

| 属性          | attribute      | 类型          | 默认值      | 说明                                              |
| ------------- | -------------- | ------------- | ----------- | ------------------------------------------------- |
| `content`     | `content`      | `string`      | `''`        | 确认文案                                          |
| `placement`   | `placement`    | `WcPlacement` | `'top'`     | 期望弹出方向（空间不足自动翻转）                  |
| `confirmText` | `confirm-text` | `string`      | `''`        | 确认按钮文案（默认 i18n「确认」）                 |
| `cancelText`  | `cancel-text`  | `string`      | `''`        | 取消按钮文案（默认 i18n「取消」）                 |
| `theme`       | `theme`        | `string`      | `'primary'` | 确认按钮主题（primary/danger 等，透传 wc-button） |
| `icon`        | `icon`         | `string`      | `'warning'` | 图标名称（内置图标名，空字符串隐藏）              |
| `open`        | `open`         | `boolean`     | `false`     | 当前是否打开                                      |

### 事件

| 事件         | 说明                                      |
| ------------ | ----------------------------------------- |
| `wc-confirm` | 点击确认（之后自动关闭）                  |
| `wc-cancel`  | 点击取消 / 外部点击 / Esc（之后自动关闭） |

### 方法

| 方法                                                                 | 说明                         |
| -------------------------------------------------------------------- | ---------------------------- |
| `show(): void`                                                       | 打开气泡                     |
| `hide(): void`                                                       | 关闭气泡（不派发事件）       |
| `confirm(): void`                                                    | 确认：派发 wc-confirm 并关闭 |
| `cancel(reason: 'button' \| 'outside' \| 'escape' = 'button'): void` | 取消：派发 wc-cancel 并关闭  |

### 插槽

| 名称      | 说明                          |
| --------- | ----------------------------- |
| （默认）  | 触发元素                      |
| `content` | 确认文案（覆盖 content 属性） |

### CSS Parts

`trigger` / `base` / `icon` / `actions`
