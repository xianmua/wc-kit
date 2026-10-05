# Message 全局提示

全局提示：固定在页面顶部居中、纵向堆叠的轻量反馈。推荐使用命令式 API，调用即展示、自动关闭；
也可以声明式书写 `<wc-message>` 标签。

## 主要 API

- 命令式：message.info / success / warning / error / loading / show(content, options?)；
  options 支持 theme、duration（默认 3000，0 不自动关闭）、closable（默认 false）、onClose 关闭回调；
  loading 不自动关闭；全部返回 wcMessage 实例，可手动调用 close() 提前关闭
- 声明式属性：theme 提示类型（info / success / warning / error / loading，默认 info）；
  content 内容；duration 自动关闭时长；closable 关闭按钮
- 方法：close() 关闭并从 DOM 移除；事件：wc-close 关闭时触发
- 插槽：默认插槽覆盖 content 属性；icon 插槽覆盖主题图标

## React / 任意框架（命令式与框架无关）

```tsx
import { message } from '@wc-kit/core';

message.info('普通提示');
message.success('保存成功', { duration: 5000 });
const loading = message.loading('加载中…');
loading.close();
```

需要声明式书写时，可使用 @wc-kit/react 的 WcMessage（onWcClose 接收 wc-close 事件）。

## Vue（原生标签 + @wc-kit/vue 类型增强）

```vue
<template>
  <wc-button @click="show">删除</wc-button>
</template>

<script setup lang="ts">
import { message } from '@wc-kit/core';

function show() {
  message.success('删除成功');
}
</script>
```

## 示例

<script setup>
// message 是命令式 API，与框架无关；文档站内动态 import（SSR 安全）
function msg(type, content) {
  import('@wc-kit/core').then(({ message }) => message[type](content))
}
function showLoading() {
  import('@wc-kit/core').then(({ message }) => {
    const loading = message.loading('正在加载数据…')
    setTimeout(() => loading.close(), 2000)
  })
}
function showOnClose() {
  import('@wc-kit/core').then(({ message }) => {
    message.show('关闭我试试，会触发 onClose 回调', {
      duration: 0,
      closable: true,
      onClose: () => message.success('onClose 已触发'),
    })
  })
}
function showDuration() {
  import('@wc-kit/core').then(({ message }) => message.show('5 秒后自动关闭', { duration: 5000 }))
}
function showNoDuration() {
  import('@wc-kit/core').then(({ message }) =>
    message.show('不会自动关闭，请点击右侧关闭', { duration: 0, closable: true }),
  )
}
</script>

### 基础用法

<div class="demo-block">
  <div style="display:flex;gap:12px;flex-wrap:wrap;">
    <wc-button @click="msg('info', '这是一条普通提示')">普通信息</wc-button>
    <wc-button theme="success" @click="msg('success', '保存成功')">成功</wc-button>
    <wc-button theme="warning" @click="msg('warning', '磁盘空间不足')">警告</wc-button>
    <wc-button theme="danger" @click="msg('error', '操作失败，请重试')">错误</wc-button>
    <wc-button theme="primary" @click="showLoading">加载中（2 秒后关闭）</wc-button>
  </div>
</div>

命令式 API 无需书写标签：message.info / success / warning / error / loading，提示固定在页面顶部居中堆叠，默认 3 秒自动关闭。

:::: details 查看代码
::: code-group

```html [HTML]
<wc-button id="message-1-btn0">普通信息</wc-button>
<wc-button theme="success" id="message-1-btn1">成功</wc-button>
<wc-button theme="warning" id="message-1-btn2">警告</wc-button>
<wc-button theme="danger" id="message-1-btn3">错误</wc-button>
<wc-button theme="primary" id="message-1-btn4">加载中（2 秒后关闭）</wc-button>

<script type="module">
  const { message } = await import('@wc-kit/core');

  import { message } from '@wc-kit/core';

  function msg(type, content) {
    message[type](content);
  }
  function showLoading() {
    const loading = message.loading('正在加载数据…');
    setTimeout(() => loading.close(), 2000);
  }

  const message1Btn0 = document.getElementById('message-1-btn0');
  message1Btn0.addEventListener('click', () => {
    message.info('这是一条普通提示');
  });
  const message1Btn1 = document.getElementById('message-1-btn1');
  message1Btn1.addEventListener('click', () => {
    message.success('保存成功');
  });
  const message1Btn2 = document.getElementById('message-1-btn2');
  message1Btn2.addEventListener('click', () => {
    message.warning('磁盘空间不足');
  });
  const message1Btn3 = document.getElementById('message-1-btn3');
  message1Btn3.addEventListener('click', () => {
    message.error('操作失败，请重试');
  });
  const message1Btn4 = document.getElementById('message-1-btn4');
  message1Btn4.addEventListener('click', () => {
    showLoading();
  });

  function msg(type, content) {
    import('@wc-kit/core').then(({ message }) => message[type](content));
  }

  function showLoading() {
    import('@wc-kit/core').then(({ message }) => {
      const loading = message.loading('正在加载数据…');
      setTimeout(() => loading.close(), 2000);
    });
  }
</script>
```

```vue [Vue]
<template>
  <wc-button @click="msg('info', '这是一条普通提示')">普通信息</wc-button>
  <wc-button theme="success" @click="msg('success', '保存成功')">成功</wc-button>
  <wc-button theme="warning" @click="msg('warning', '磁盘空间不足')">警告</wc-button>
  <wc-button theme="danger" @click="msg('error', '操作失败，请重试')">错误</wc-button>
  <wc-button theme="primary" @click="showLoading">加载中（2 秒后关闭）</wc-button>
</template>

<script setup lang="ts">
import { message } from '@wc-kit/core';

function msg(type, content) {
  message[type](content);
}
function showLoading() {
  const loading = message.loading('正在加载数据…');
  setTimeout(() => loading.close(), 2000);
}
</script>
```

```tsx [React]
import { WcButton } from '@wc-kit/react';
import { message } from '@wc-kit/core';

<WcButton onClick={() => { message.info('这是一条普通提示') }}>普通信息</WcButton>
<WcButton theme="success" onClick={() => { message.success('保存成功') }}>成功</WcButton>
<WcButton theme="warning" onClick={() => { message.warning('磁盘空间不足') }}>警告</WcButton>
<WcButton theme="danger" onClick={() => { message.error('操作失败，请重试') }}>错误</WcButton>
<WcButton theme="primary" onClick={() => { showLoading }}>加载中（2 秒后关闭）</WcButton>

import { message } from '@wc-kit/core'

function msg(type, content) {
  message[type](content)
}
function showLoading() {
  const loading = message.loading('正在加载数据…')
  setTimeout(() => loading.close(), 2000)
}

function msg(type, content) {
  import('@wc-kit/core').then(({ message }) => message[type](content))
}

function showLoading() {
  import('@wc-kit/core').then(({ message }) => {
    const loading = message.loading('正在加载数据…')
    setTimeout(() => loading.close(), 2000)
  })
}
```

:::
::::

### 配置项

<div class="demo-block">
  <div style="display:flex;gap:12px;flex-wrap:wrap;">
    <wc-button @click="showDuration">duration：5000</wc-button>
    <wc-button @click="showNoDuration">duration：0 + closable</wc-button>
    <wc-button @click="showOnClose">onClose：关闭回调</wc-button>
  </div>
</div>

message.show(content, options) 支持完整配置：theme / duration / closable / onClose，返回 wcMessage 实例可手动 close()。

:::: details 查看代码
::: code-group

```html [HTML]
<wc-button id="message-2-btn0">duration：5000</wc-button>
<wc-button id="message-2-btn1">duration：0 + closable</wc-button>
<wc-button id="message-2-btn2">onClose：关闭回调</wc-button>

<script type="module">
  const { message } = await import('@wc-kit/core');

  import { message } from '@wc-kit/core';

  function showDuration() {
    // duration：自动关闭时长（ms），0 表示不自动关闭
    message.show('5 秒后自动关闭', { duration: 5000 });
  }
  function showNoDuration() {
    // closable：显示关闭按钮，需手动关闭
    message.show('不会自动关闭，请点击右侧关闭', { duration: 0, closable: true });
  }
  function showOnClose() {
    // onClose：关闭时回调
    message.show('关闭我试试，会触发 onClose 回调', {
      duration: 0,
      closable: true,
      onClose: () => message.success('onClose 已触发'),
    });
  }

  const message2Btn0 = document.getElementById('message-2-btn0');
  message2Btn0.addEventListener('click', () => {
    showDuration();
  });
  const message2Btn1 = document.getElementById('message-2-btn1');
  message2Btn1.addEventListener('click', () => {
    showNoDuration();
  });
  const message2Btn2 = document.getElementById('message-2-btn2');
  message2Btn2.addEventListener('click', () => {
    showOnClose();
  });

  function showDuration() {
    import('@wc-kit/core').then(({ message }) =>
      message.show('5 秒后自动关闭', { duration: 5000 }),
    );
  }

  function showNoDuration() {
    import('@wc-kit/core').then(({ message }) =>
      message.show('不会自动关闭，请点击右侧关闭', { duration: 0, closable: true }),
    );
  }

  function showOnClose() {
    import('@wc-kit/core').then(({ message }) => {
      message.show('关闭我试试，会触发 onClose 回调', {
        duration: 0,
        closable: true,
        onClose: () => message.success('onClose 已触发'),
      });
    });
  }
</script>
```

```vue [Vue]
<template>
  <wc-button @click="showDuration">duration：5000</wc-button>
  <wc-button @click="showNoDuration">duration：0 + closable</wc-button>
  <wc-button @click="showOnClose">onClose：关闭回调</wc-button>
</template>

<script setup lang="ts">
import { message } from '@wc-kit/core';

function showDuration() {
  // duration：自动关闭时长（ms），0 表示不自动关闭
  message.show('5 秒后自动关闭', { duration: 5000 });
}
function showNoDuration() {
  // closable：显示关闭按钮，需手动关闭
  message.show('不会自动关闭，请点击右侧关闭', { duration: 0, closable: true });
}
function showOnClose() {
  // onClose：关闭时回调
  message.show('关闭我试试，会触发 onClose 回调', {
    duration: 0,
    closable: true,
    onClose: () => message.success('onClose 已触发'),
  });
}
</script>
```

```tsx [React]
import { WcButton } from '@wc-kit/react';
import { message } from '@wc-kit/core';

<WcButton onClick={() => { showDuration }}>duration：5000</WcButton>
<WcButton onClick={() => { showNoDuration }}>duration：0 + closable</WcButton>
<WcButton onClick={() => { showOnClose }}>onClose：关闭回调</WcButton>

import { message } from '@wc-kit/core'

function showDuration() {
  // duration：自动关闭时长（ms），0 表示不自动关闭
  message.show('5 秒后自动关闭', { duration: 5000 })
}
function showNoDuration() {
  // closable：显示关闭按钮，需手动关闭
  message.show('不会自动关闭，请点击右侧关闭', { duration: 0, closable: true })
}
function showOnClose() {
  // onClose：关闭时回调
  message.show('关闭我试试，会触发 onClose 回调', {
    duration: 0,
    closable: true,
    onClose: () => message.success('onClose 已触发'),
  })
}

function showDuration() {
  import('@wc-kit/core').then(({ message }) => message.show('5 秒后自动关闭', { duration: 5000 }))
}

function showNoDuration() {
  import('@wc-kit/core').then(({ message }) =>
    message.show('不会自动关闭，请点击右侧关闭', { duration: 0, closable: true }),
  )
}

function showOnClose() {
  import('@wc-kit/core').then(({ message }) => {
    message.show('关闭我试试，会触发 onClose 回调', {
      duration: 0,
      closable: true,
      onClose: () => message.success('onClose 已触发'),
    })
  })
}
```

:::
::::

### 插槽

<div class="demo-block">
  <div style="display:flex;flex-direction:column;gap:12px;align-items:flex-start;">
    <wc-message duration="0" closable>默认插槽内容，支持<b>任意 HTML</b>。</wc-message>
    <wc-message theme="warning" content="提示内容" duration="0" closable>
      <wc-icon slot="icon" name="info"></wc-icon>
    </wc-message>
  </div>
</div>

默认插槽覆盖 content 属性；icon 插槽覆盖主题图标。

:::: details 查看代码
::: code-group

```html [HTML]
<wc-message duration="0" closable>默认插槽内容，支持<b>任意 HTML</b>。</wc-message>
<wc-message theme="warning" content="提示内容" duration="0" closable>
  <wc-icon slot="icon" name="info"></wc-icon>
</wc-message>
```

```vue [Vue]
<template>
  <wc-message duration="0" closable>默认插槽内容，支持<b>任意 HTML</b>。</wc-message>
  <wc-message theme="warning" content="提示内容" duration="0" closable>
    <wc-icon slot="icon" name="info"></wc-icon>
  </wc-message>
</template>
```

```tsx [React]
import { WcIcon, WcMessage } from '@wc-kit/react';

<WcMessage duration={0} closable>默认插槽内容，支持<b>任意 HTML</b>。</WcMessage>
<WcMessage theme="warning" content="提示内容" duration={0} closable>
  <WcIcon slot="icon" name="info"></WcIcon>
</WcMessage>
```

:::
::::

## API

### 属性

| 属性       | attribute  | 类型                                                       | 默认值   | 说明                                 |
| ---------- | ---------- | ---------------------------------------------------------- | -------- | ------------------------------------ |
| `theme`    | `theme`    | `'info' \| 'success' \| 'warning' \| 'error' \| 'loading'` | `'info'` | 提示类型                             |
| `content`  | `content`  | `string`                                                   | `''`     | 提示内容                             |
| `duration` | `duration` | `number`                                                   | `3000`   | 自动关闭时长（ms），0 表示不自动关闭 |
| `closable` | `closable` | `boolean`                                                  | `false`  | 显示关闭按钮                         |

### 事件

| 事件       | 说明                              |
| ---------- | --------------------------------- |
| `wc-close` | 关闭时触发（之后组件从 DOM 移除） |

### 方法

| 方法            | 说明                                  |
| --------------- | ------------------------------------- |
| `close(): void` | 关闭：派发 wc-close 并从 DOM 移除自身 |

### 插槽

| 名称     | 说明                          |
| -------- | ----------------------------- |
| （默认） | 提示内容（覆盖 content 属性） |
| `icon`   | 覆盖主题图标                  |

### CSS Parts

`base` / `icon` / `content` / `close-button`
