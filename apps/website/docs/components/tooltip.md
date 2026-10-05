# Tooltip 气泡提示

文字提示：悬浮 / 聚焦触发的轻量气泡，空间不足时自动翻转方向。
content 属性或 content 插槽提供内容；trigger="manual" 时用 show() / hide() 控制。

## 主要 API

- 属性：content 提示内容；placement 期望方向（top / bottom / left / right 及 -start / -end 组合，
  默认 top）；trigger 触发方式（hover 含 focus / click / manual，默认 hover）；open 是否可见
- 方法：show() 显示；hide() 隐藏（内置 100ms 显示 / 150ms 隐藏防抖）
- 事件：wc-show 开始显示时触发；wc-hide 开始隐藏时触发
- 插槽：默认插槽为触发元素；content 插槽为富文本内容

## React（@wc-kit/react）

```tsx
import { WcButton, WcTooltip } from '@wc-kit/react';

<WcTooltip
  content="提示文字"
  placement="top"
  onWcShow={() => console.log('开始显示')}
  onWcHide={() => console.log('开始隐藏')}
>
  <WcButton>悬浮我</WcButton>
</WcTooltip>;
```

## Vue（原生标签 + @wc-kit/vue 类型增强）

```vue
<template>
  <wc-tooltip content="提示文字" placement="top" @wc-show="onShow">
    <wc-button>悬浮我</wc-button>
  </wc-tooltip>
</template>
```

## 示例

<script setup>
import { ref } from 'vue'

const tooltipManual = ref(null)

function msg(type, text) {
  import('@wc-kit/core').then(({ message }) => message[type](text))
}
</script>

### 弹出位置

<div class="demo-block">
  <div style="display:flex;gap:12px;flex-wrap:wrap;">
    <wc-tooltip content="top" placement="top">
      <wc-button variant="outline">top</wc-button>
    </wc-tooltip>
    <wc-tooltip content="top-start" placement="top-start">
      <wc-button variant="outline">top-start</wc-button>
    </wc-tooltip>
    <wc-tooltip content="top-end" placement="top-end">
      <wc-button variant="outline">top-end</wc-button>
    </wc-tooltip>
    <wc-tooltip content="bottom" placement="bottom">
      <wc-button variant="outline">bottom</wc-button>
    </wc-tooltip>
    <wc-tooltip content="bottom-start" placement="bottom-start">
      <wc-button variant="outline">bottom-start</wc-button>
    </wc-tooltip>
    <wc-tooltip content="bottom-end" placement="bottom-end">
      <wc-button variant="outline">bottom-end</wc-button>
    </wc-tooltip>
    <wc-tooltip content="left" placement="left">
      <wc-button variant="outline">left</wc-button>
    </wc-tooltip>
    <wc-tooltip content="left-start" placement="left-start">
      <wc-button variant="outline">left-start</wc-button>
    </wc-tooltip>
    <wc-tooltip content="left-end" placement="left-end">
      <wc-button variant="outline">left-end</wc-button>
    </wc-tooltip>
    <wc-tooltip content="right" placement="right">
      <wc-button variant="outline">right</wc-button>
    </wc-tooltip>
    <wc-tooltip content="right-start" placement="right-start">
      <wc-button variant="outline">right-start</wc-button>
    </wc-tooltip>
    <wc-tooltip content="right-end" placement="right-end">
      <wc-button variant="outline">right-end</wc-button>
    </wc-tooltip>
  </div>
</div>

空间不足时会在视口内自动翻转方向，箭头位置随之调整。

:::: details 查看代码
::: code-group

```html [HTML]
<div style="display:flex;gap:12px;flex-wrap:wrap;">
  <wc-tooltip content="top" placement="top">
    <wc-button variant="outline">top</wc-button>
  </wc-tooltip>
  <wc-tooltip content="top-start" placement="top-start">
    <wc-button variant="outline">top-start</wc-button>
  </wc-tooltip>
  <wc-tooltip content="top-end" placement="top-end">
    <wc-button variant="outline">top-end</wc-button>
  </wc-tooltip>
  <wc-tooltip content="bottom" placement="bottom">
    <wc-button variant="outline">bottom</wc-button>
  </wc-tooltip>
  <wc-tooltip content="bottom-start" placement="bottom-start">
    <wc-button variant="outline">bottom-start</wc-button>
  </wc-tooltip>
  <wc-tooltip content="bottom-end" placement="bottom-end">
    <wc-button variant="outline">bottom-end</wc-button>
  </wc-tooltip>
  <wc-tooltip content="left" placement="left">
    <wc-button variant="outline">left</wc-button>
  </wc-tooltip>
  <wc-tooltip content="left-start" placement="left-start">
    <wc-button variant="outline">left-start</wc-button>
  </wc-tooltip>
  <wc-tooltip content="left-end" placement="left-end">
    <wc-button variant="outline">left-end</wc-button>
  </wc-tooltip>
  <wc-tooltip content="right" placement="right">
    <wc-button variant="outline">right</wc-button>
  </wc-tooltip>
  <wc-tooltip content="right-start" placement="right-start">
    <wc-button variant="outline">right-start</wc-button>
  </wc-tooltip>
  <wc-tooltip content="right-end" placement="right-end">
    <wc-button variant="outline">right-end</wc-button>
  </wc-tooltip>
</div>
```

```vue [Vue]
<template>
  <div style="display:flex;gap:12px;flex-wrap:wrap;">
    <wc-tooltip content="top" placement="top">
      <wc-button variant="outline">top</wc-button>
    </wc-tooltip>
    <wc-tooltip content="top-start" placement="top-start">
      <wc-button variant="outline">top-start</wc-button>
    </wc-tooltip>
    <wc-tooltip content="top-end" placement="top-end">
      <wc-button variant="outline">top-end</wc-button>
    </wc-tooltip>
    <wc-tooltip content="bottom" placement="bottom">
      <wc-button variant="outline">bottom</wc-button>
    </wc-tooltip>
    <wc-tooltip content="bottom-start" placement="bottom-start">
      <wc-button variant="outline">bottom-start</wc-button>
    </wc-tooltip>
    <wc-tooltip content="bottom-end" placement="bottom-end">
      <wc-button variant="outline">bottom-end</wc-button>
    </wc-tooltip>
    <wc-tooltip content="left" placement="left">
      <wc-button variant="outline">left</wc-button>
    </wc-tooltip>
    <wc-tooltip content="left-start" placement="left-start">
      <wc-button variant="outline">left-start</wc-button>
    </wc-tooltip>
    <wc-tooltip content="left-end" placement="left-end">
      <wc-button variant="outline">left-end</wc-button>
    </wc-tooltip>
    <wc-tooltip content="right" placement="right">
      <wc-button variant="outline">right</wc-button>
    </wc-tooltip>
    <wc-tooltip content="right-start" placement="right-start">
      <wc-button variant="outline">right-start</wc-button>
    </wc-tooltip>
    <wc-tooltip content="right-end" placement="right-end">
      <wc-button variant="outline">right-end</wc-button>
    </wc-tooltip>
  </div>
</template>
```

```tsx [React]
import { WcButton, WcTooltip } from '@wc-kit/react';

<div style="display:flex;gap:12px;flex-wrap:wrap;">
  <WcTooltip content="top" placement="top">
    <WcButton variant="outline">top</WcButton>
  </WcTooltip>
  <WcTooltip content="top-start" placement="top-start">
    <WcButton variant="outline">top-start</WcButton>
  </WcTooltip>
  <WcTooltip content="top-end" placement="top-end">
    <WcButton variant="outline">top-end</WcButton>
  </WcTooltip>
  <WcTooltip content="bottom" placement="bottom">
    <WcButton variant="outline">bottom</WcButton>
  </WcTooltip>
  <WcTooltip content="bottom-start" placement="bottom-start">
    <WcButton variant="outline">bottom-start</WcButton>
  </WcTooltip>
  <WcTooltip content="bottom-end" placement="bottom-end">
    <WcButton variant="outline">bottom-end</WcButton>
  </WcTooltip>
  <WcTooltip content="left" placement="left">
    <WcButton variant="outline">left</WcButton>
  </WcTooltip>
  <WcTooltip content="left-start" placement="left-start">
    <WcButton variant="outline">left-start</WcButton>
  </WcTooltip>
  <WcTooltip content="left-end" placement="left-end">
    <WcButton variant="outline">left-end</WcButton>
  </WcTooltip>
  <WcTooltip content="right" placement="right">
    <WcButton variant="outline">right</WcButton>
  </WcTooltip>
  <WcTooltip content="right-start" placement="right-start">
    <WcButton variant="outline">right-start</WcButton>
  </WcTooltip>
  <WcTooltip content="right-end" placement="right-end">
    <WcButton variant="outline">right-end</WcButton>
  </WcTooltip>
</div>;
```

:::
::::

### 触发方式

<div class="demo-block">
  <div style="display:flex;gap:12px;flex-wrap:wrap;align-items:center;">
    <wc-tooltip trigger="click" content="点击触发，点击外部或按 Esc 关闭">
      <wc-button theme="primary" variant="outline">click 触发</wc-button>
    </wc-tooltip>
    <wc-button @click="tooltipManual?.show()">show()</wc-button>
    <wc-button @click="tooltipManual?.hide()">hide()</wc-button>
    <wc-tooltip ref="tooltipManual" trigger="manual" content="由 show() / hide() 控制显隐">
      manual 触发元素
    </wc-tooltip>
  </div>
</div>

hover 模式含键盘聚焦触发；manual 模式完全由 show() / hide() 控制（显示 / 隐藏分别有 100ms / 150ms 防抖）。

:::: details 查看代码
::: code-group

```html [HTML]
<div style="display:flex;gap:12px;flex-wrap:wrap;align-items:center;">
  <wc-tooltip trigger="click" content="点击触发，点击外部或按 Esc 关闭">
    <wc-button theme="primary" variant="outline">click 触发</wc-button>
  </wc-tooltip>
  <wc-button id="tooltip-2-btn0">show()</wc-button>
  <wc-button id="tooltip-2-btn1">hide()</wc-button>
  <wc-tooltip trigger="manual" content="由 show() / hide() 控制显隐" id="tooltipManual">
    manual 触发元素
  </wc-tooltip>
</div>

<script type="module">
  const tooltipManual = document.getElementById('tooltipManual');

  const tooltip2Btn0 = document.getElementById('tooltip-2-btn0');
  tooltip2Btn0.addEventListener('click', () => {
    tooltipManual?.show();
  });
  const tooltip2Btn1 = document.getElementById('tooltip-2-btn1');
  tooltip2Btn1.addEventListener('click', () => {
    tooltipManual?.hide();
  });
</script>
```

```vue [Vue]
<template>
  <div style="display:flex;gap:12px;flex-wrap:wrap;align-items:center;">
    <wc-tooltip trigger="click" content="点击触发，点击外部或按 Esc 关闭">
      <wc-button theme="primary" variant="outline">click 触发</wc-button>
    </wc-tooltip>
    <wc-button @click="tooltipManual?.show()">show()</wc-button>
    <wc-button @click="tooltipManual?.hide()">hide()</wc-button>
    <wc-tooltip ref="tooltipManual" trigger="manual" content="由 show() / hide() 控制显隐">
      manual 触发元素
    </wc-tooltip>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const tooltipManual = ref(null);
</script>
```

```tsx [React]
import { WcButton, WcTooltip } from '@wc-kit/react';

<div style="display:flex;gap:12px;flex-wrap:wrap;align-items:center;">
  <WcTooltip trigger="click" content="点击触发，点击外部或按 Esc 关闭">
    <WcButton theme="primary" variant="outline">
      click 触发
    </WcButton>
  </WcTooltip>
  <WcButton
    onClick={() => {
      tooltipManual.current?.show();
    }}
  >
    show()
  </WcButton>
  <WcButton
    onClick={() => {
      tooltipManual.current?.hide();
    }}
  >
    hide()
  </WcButton>
  <WcTooltip ref={tooltipManual} trigger="manual" content="由 show() / hide() 控制显隐">
    manual 触发元素
  </WcTooltip>
</div>;

const tooltipManual = useRef(null);
```

:::
::::

### 富文本内容

<div class="demo-block">

<wc-tooltip placement="bottom">
      <wc-button variant="outline">悬浮查看富文本</wc-button>
      <div slot="content">
        <b>加粗标题</b><br />
        这段内容来自 content 插槽，会覆盖 content 属性。
      </div>
    </wc-tooltip>

</div>

:::: details 查看代码
::: code-group

```html [HTML]
<wc-tooltip placement="bottom">
  <wc-button variant="outline">悬浮查看富文本</wc-button>
  <div slot="content">
    <b>加粗标题</b><br />
    这段内容来自 content 插槽，会覆盖 content 属性。
  </div>
</wc-tooltip>
```

```vue [Vue]
<template>
  <wc-tooltip placement="bottom">
    <wc-button variant="outline">悬浮查看富文本</wc-button>
    <div slot="content">
      <b>加粗标题</b><br />
      这段内容来自 content 插槽，会覆盖 content 属性。
    </div>
  </wc-tooltip>
</template>
```

```tsx [React]
import { WcButton, WcTooltip } from '@wc-kit/react';

<WcTooltip placement="bottom">
  <WcButton variant="outline">悬浮查看富文本</WcButton>
  <div slot="content">
    <b>加粗标题</b>
    <br />
    这段内容来自 content 插槽，会覆盖 content 属性。
  </div>
</WcTooltip>;
```

:::
::::

### 事件

<div class="demo-block">
  <wc-tooltip
    content="观察顶部的全局提示"
    @wc-show="msg('info', 'wc-show：开始显示')"
    @wc-hide="msg('info', 'wc-hide：开始隐藏')"
  >
    <wc-button theme="primary">悬浮我</wc-button>
  </wc-tooltip>
</div>

wc-show / wc-hide 在显示 / 隐藏开始时触发。

:::: details 查看代码
::: code-group

```html [HTML]
<wc-tooltip content="观察顶部的全局提示" id="tooltip-4-btn0">
  <wc-button theme="primary">悬浮我</wc-button>
</wc-tooltip>

<script type="module">
  const { message } = await import('@wc-kit/core');

  // message 是命令式 API；文档站内动态 import（SSR 安全）
  function msg(type, text) {
    import('@wc-kit/core').then(({ message }) => message[type](text));
  }

  const tooltip4Btn0 = document.getElementById('tooltip-4-btn0');
  tooltip4Btn0.addEventListener('wc-show', () => {
    message.info('wc-show：开始显示');
  });
  tooltip4Btn0.addEventListener('wc-hide', () => {
    message.info('wc-hide：开始隐藏');
  });

  function msg(type, text) {
    import('@wc-kit/core').then(({ message }) => message[type](text));
  }
</script>
```

```vue [Vue]
<template>
  <wc-tooltip
    content="观察顶部的全局提示"
    @wc-show="msg('info', 'wc-show：开始显示')"
    @wc-hide="msg('info', 'wc-hide：开始隐藏')"
  >
    <wc-button theme="primary">悬浮我</wc-button>
  </wc-tooltip>
</template>

<script setup lang="ts">
// message 是命令式 API；文档站内动态 import（SSR 安全）
function msg(type, text) {
  import('@wc-kit/core').then(({ message }) => message[type](text));
}
</script>
```

```tsx [React]
import { WcButton, WcTooltip } from '@wc-kit/react';
import { message } from '@wc-kit/core';

<WcTooltip
  content="观察顶部的全局提示"
  onWcShow={() => {
    message.info('wc-show：开始显示');
  }}
  onWcHide={() => {
    message.info('wc-hide：开始隐藏');
  }}
>
  <WcButton theme="primary">悬浮我</WcButton>
</WcTooltip>;

// message 是命令式 API；文档站内动态 import（SSR 安全）
function msg(type, text) {
  import('@wc-kit/core').then(({ message }) => message[type](text));
}

function msg(type, text) {
  import('@wc-kit/core').then(({ message }) => message[type](text));
}
```

:::
::::

## API

### 属性

| 属性        | attribute   | 类型                             | 默认值    | 说明                                        |
| ----------- | ----------- | -------------------------------- | --------- | ------------------------------------------- |
| `content`   | `content`   | `string`                         | `''`      | 提示内容                                    |
| `placement` | `placement` | `WcPlacement`                    | `'top'`   | 期望弹出方向（空间不足自动翻转）            |
| `trigger`   | `trigger`   | `'hover' \| 'click' \| 'manual'` | `'hover'` | 触发方式：hover（含 focus）/ click / manual |
| `open`      | `open`      | `boolean`                        | `false`   | 当前是否可见                                |

### 事件

| 事件      | 说明           |
| --------- | -------------- |
| `wc-show` | 开始显示时触发 |
| `wc-hide` | 开始隐藏时触发 |

### 方法

| 方法           | 说明                          |
| -------------- | ----------------------------- |
| `show(): void` | 显示（manual 模式或编程调用） |
| `hide(): void` | 隐藏                          |

### 插槽

| 名称      | 说明                            |
| --------- | ------------------------------- |
| （默认）  | 触发元素                        |
| `content` | 富文本内容（覆盖 content 属性） |

### CSS 变量

| 变量                     | 说明                       |
| ------------------------ | -------------------------- |
| `--wc-tooltip-max-width` | 面板最大宽度（默认 240px） |

### CSS Parts

`trigger` / `base` / `arrow`
