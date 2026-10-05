# Dialog 对话框

模态对话框。通过 open 属性或 show() / requestClose() 控制显隐；关闭统一走可取消的 wc-close 事件，
在监听器中调用 e.preventDefault() 可阻止本次关闭。打开后自带 Escape 关闭、焦点陷阱与滚动锁定。

## 主要 API

- 属性：open 是否打开；header 标题（header 插槽优先）；footer 是否展示默认页脚（默认 true）；
  closable 右上角关闭按钮（默认 true）；close-on-overlay-click 点击遮罩关闭（默认 false）；
  width 对话框宽度（纯数字按 px）
- 方法：show() 打开；requestClose(reason?) 请求关闭；confirm() / cancel() 确认 / 取消并关闭
- 事件：wc-open 打开后触发；wc-close 请求关闭（可取消，detail.reason 为 close-btn / overlay /
  escape / confirm / cancel / api）；wc-confirm / wc-cancel 点击默认确认 / 取消按钮触发
- 插槽：默认插槽为内容；header 自定义页头；footer 自定义页脚

## React（@wc-kit/react）

```tsx
import { useRef } from 'react';
import { WcDialog } from '@wc-kit/react';
import type { wcDialog } from '@wc-kit/core';

function Demo() {
  const ref = useRef<wcDialog>(null);
  return (
    <>
      <wc-button theme="primary" onClick={() => ref.current?.show()}>
        打开对话框
      </wc-button>
      <WcDialog
        ref={ref}
        header="对话框标题"
        onWcOpen={() => console.log('已打开')}
        onWcClose={(e) => console.log('关闭来源：', e.detail.reason)}
        onWcConfirm={() => console.log('确认')}
        onWcCancel={() => console.log('取消')}
      >
        对话框内容
      </WcDialog>
    </>
  );
}
```

## Vue（原生标签 + @wc-kit/vue 类型增强）

```vue
<template>
  <wc-button theme="primary" @click="dialog?.show()">打开对话框</wc-button>
  <wc-dialog
    ref="dialog"
    header="对话框标题"
    @wc-open="onOpen"
    @wc-close="onClose"
    @wc-confirm="onConfirm"
    @wc-cancel="onCancel"
  >
    对话框内容
  </wc-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { wcDialog } from '@wc-kit/core';

const dialog = ref<wcDialog>();
</script>
```

## 示例

<script setup>
import { ref } from 'vue'

const dlgBasic = ref(null)
const dlgWidth = ref(null)
const dlgFooter = ref(null)
const dlgClose = ref(null)
const dlgEvents = ref(null)
const dlgPrevent = ref(null)

function msg(type, text) {
  import('@wc-kit/core').then(({ message }) => message[type](text))
}
function onDlgClose(e) {
  msg('info', `wc-close：请求关闭（来源 ${e.detail.reason}）`)
}
function onDlgPreventClose(e) {
  // 拦截 Esc / 遮罩来源的关闭请求，只允许按钮与右上角关闭
  if (e.detail.reason === 'escape' || e.detail.reason === 'overlay') e.preventDefault()
}
</script>

### 基础用法

<div class="demo-block">
  <wc-button theme="primary" @click="dlgBasic?.show()">打开对话框</wc-button>
  <wc-dialog ref="dlgBasic" header="基础对话框">
    这里是对话框内容，支持任意内容。
  </wc-dialog>
</div>

默认配置：右上角关闭按钮 + 底部确认 / 取消页脚；点击遮罩不关闭，Esc 可关闭。

### 自定义宽度

<div class="demo-block">
  <wc-button theme="primary" @click="dlgWidth?.show()">打开对话框</wc-button>
  <wc-dialog ref="dlgWidth" header="自定义宽度" width="600">
    width="600"（纯数字按 px），也可以传入 80% 等 CSS 尺寸值。
  </wc-dialog>
</div>

width 支持预设外的任意宽度；也可用 CSS 变量 `--wc-dialog-width` 全局调整。

:::: details 查看代码
::: code-group

```html [HTML]
<wc-button theme="primary" id="dialog-1-btn0">打开对话框</wc-button>
<wc-dialog header="自定义宽度" width="600" id="dlgWidth">
  width="600"（纯数字按 px），也可以传入 80% 等 CSS 尺寸值。
</wc-dialog>

<script type="module">
  const dialog1Btn0 = document.getElementById('dialog-1-btn0');
  dialog1Btn0.addEventListener('click', () => {
    dlgWidth?.show();
  });
  const dlgWidth = document.getElementById('dlgWidth');
</script>
```

```vue [Vue]
<template>
  <wc-button theme="primary" @click="dlgWidth?.show()">打开对话框</wc-button>
  <wc-dialog ref="dlgWidth" header="自定义宽度" width="600">
    width="600"（纯数字按 px），也可以传入 80% 等 CSS 尺寸值。
  </wc-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const dlgWidth = ref();
</script>
```

```tsx [React]
import { WcButton, WcDialog } from '@wc-kit/react';

<WcButton theme="primary" onClick={() => { dlgWidth.current?.show() }}>打开对话框</WcButton>
<WcDialog ref={dlgWidth} header="自定义宽度" width={600}>
  width="600"（纯数字按 px），也可以传入 80% 等 CSS 尺寸值。
</WcDialog>

// 组件实例引用
const dlgWidth = useRef<HTMLElement | null>(null);
```

:::
::::

### 自定义页脚

<div class="demo-block">
  <wc-button theme="primary" @click="dlgFooter?.show()">打开对话框</wc-button>
  <wc-dialog ref="dlgFooter" header="自定义页脚">
    通过 footer 插槽替换默认的确认 / 取消按钮。
    <wc-button slot="footer" @click="dlgFooter?.requestClose('api')">知道了</wc-button>
  </wc-dialog>
</div>

footer 插槽会覆盖默认页脚；header 插槽同理可覆盖 header 属性。

:::: details 查看代码
::: code-group

```html [HTML]
<wc-button theme="primary" id="dialog-2-btn0">打开对话框</wc-button>
<wc-dialog header="自定义页脚" id="dlgFooter">
  通过 footer 插槽替换默认的确认 / 取消按钮。
  <wc-button slot="footer" id="dialog-2-btn1">知道了</wc-button>
</wc-dialog>

<script type="module">
  const dialog2Btn0 = document.getElementById('dialog-2-btn0');
  dialog2Btn0.addEventListener('click', () => {
    dlgFooter?.show();
  });
  const dlgFooter = document.getElementById('dlgFooter');
  const dialog2Btn1 = document.getElementById('dialog-2-btn1');
  dialog2Btn1.addEventListener('click', () => {
    dlgFooter?.requestClose('api');
  });
</script>
```

```vue [Vue]
<template>
  <wc-button theme="primary" @click="dlgFooter?.show()">打开对话框</wc-button>
  <wc-dialog ref="dlgFooter" header="自定义页脚">
    通过 footer 插槽替换默认的确认 / 取消按钮。
    <wc-button slot="footer" @click="dlgFooter?.requestClose('api')">知道了</wc-button>
  </wc-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const dlgFooter = ref();
</script>
```

```tsx [React]
import { WcButton, WcDialog } from '@wc-kit/react';

<WcButton theme="primary" onClick={() => { dlgFooter.current?.show() }}>打开对话框</WcButton>
<WcDialog ref={dlgFooter} header="自定义页脚">
  通过 footer 插槽替换默认的确认 / 取消按钮。
  <WcButton slot="footer" onClick={() => { dlgFooter.current?.requestClose('api') }}>知道了</WcButton>
</WcDialog>

// 组件实例引用
const dlgFooter = useRef<HTMLElement | null>(null);
```

:::
::::

### 关闭行为

<div class="demo-block">
  <wc-button theme="primary" @click="dlgClose?.show()">打开对话框</wc-button>
  <wc-dialog ref="dlgClose" header="遮罩与 Esc 关闭" closable="false" close-on-overlay-click>
    closable=false 隐藏右上角关闭按钮；开启 close-on-overlay-click 后点击遮罩或按 Esc 均可关闭。
  </wc-dialog>
</div>

点击遮罩默认不关闭（对话框与抽屉的默认值不同）；Esc 关闭始终可用。

:::: details 查看代码
::: code-group

```html [HTML]
<wc-button theme="primary" id="dialog-3-btn0">打开对话框</wc-button>
<wc-dialog header="遮罩与 Esc 关闭" closable="false" close-on-overlay-click id="dlgClose">
  closable=false 隐藏右上角关闭按钮；开启 close-on-overlay-click 后点击遮罩或按 Esc 均可关闭。
</wc-dialog>

<script type="module">
  const dialog3Btn0 = document.getElementById('dialog-3-btn0');
  dialog3Btn0.addEventListener('click', () => {
    dlgClose?.show();
  });
  const dlgClose = document.getElementById('dlgClose');
</script>
```

```vue [Vue]
<template>
  <wc-button theme="primary" @click="dlgClose?.show()">打开对话框</wc-button>
  <wc-dialog ref="dlgClose" header="遮罩与 Esc 关闭" closable="false" close-on-overlay-click>
    closable=false 隐藏右上角关闭按钮；开启 close-on-overlay-click 后点击遮罩或按 Esc 均可关闭。
  </wc-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const dlgClose = ref();
</script>
```

```tsx [React]
import { WcButton, WcDialog } from '@wc-kit/react';

<WcButton theme="primary" onClick={() => { dlgClose.current?.show() }}>打开对话框</WcButton>
<WcDialog ref={dlgClose} header="遮罩与 Esc 关闭" closable={false} closeOnOverlayClick>
  closable=false 隐藏右上角关闭按钮；开启 close-on-overlay-click 后点击遮罩或按 Esc 均可关闭。
</WcDialog>

// 组件实例引用
const dlgClose = useRef<HTMLElement | null>(null);
```

:::
::::

### 事件

<div class="demo-block">
  <wc-button theme="primary" @click="dlgEvents?.show()">打开对话框</wc-button>
  <wc-dialog
    ref="dlgEvents"
    header="事件演示"
    @wc-open="msg('info', 'wc-open：对话框已打开')"
    @wc-close="onDlgClose"
    @wc-confirm="msg('success', 'wc-confirm：点击了确认')"
    @wc-cancel="msg('info', 'wc-cancel：点击了取消')"
  >
    打开、关闭、确认、取消时会在顶部弹出全局提示，观察事件触发顺序。
  </wc-dialog>
</div>

wc-open 在打开后触发；wc-close 在请求关闭时触发（可取消）；wc-confirm / wc-cancel 由默认页脚按钮触发后自动请求关闭。

:::: details 查看代码
::: code-group

```html [HTML]
<wc-button theme="primary" id="dialog-4-btn0">打开对话框</wc-button>
<wc-dialog header="事件演示" id="dlgEvents">
  打开、关闭、确认、取消时会在顶部弹出全局提示，观察事件触发顺序。
</wc-dialog>

<script type="module">
  const { message } = await import('@wc-kit/core');

  const dialog4Btn0 = document.getElementById('dialog-4-btn0');
  dialog4Btn0.addEventListener('click', () => {
    dlgEvents?.show();
  });
  const dlgEvents = document.getElementById('dlgEvents');
  dlgEvents.addEventListener('wc-open', () => {
    message.info('wc-open：对话框已打开');
  });
  dlgEvents.addEventListener('wc-close', () => {
    onDlgClose();
  });
  dlgEvents.addEventListener('wc-confirm', () => {
    message.success('wc-confirm：点击了确认');
  });
  dlgEvents.addEventListener('wc-cancel', () => {
    message.info('wc-cancel：点击了取消');
  });

  function msg(type, text) {
    import('@wc-kit/core').then(({ message }) => message[type](text));
  }

  function onDlgClose(e) {
    msg('info', `wc-close：请求关闭（来源 ${e.detail.reason}）`);
  }
</script>
```

```vue [Vue]
<template>
  <wc-button theme="primary" @click="dlgEvents?.show()">打开对话框</wc-button>
  <wc-dialog
    ref="dlgEvents"
    header="事件演示"
    @wc-open="msg('info', 'wc-open：对话框已打开')"
    @wc-close="onDlgClose"
    @wc-confirm="msg('success', 'wc-confirm：点击了确认')"
    @wc-cancel="msg('info', 'wc-cancel：点击了取消')"
  >
    打开、关闭、确认、取消时会在顶部弹出全局提示，观察事件触发顺序。
  </wc-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const dlgEvents = ref();

function msg(type, text) {
  import('@wc-kit/core').then(({ message }) => message[type](text));
}

function onDlgClose(e) {
  msg('info', `wc-close：请求关闭（来源 ${e.detail.reason}）`);
}
</script>
```

```tsx [React]
import { WcButton, WcDialog } from '@wc-kit/react';
import { message } from '@wc-kit/core';

<WcButton theme="primary" onClick={() => { dlgEvents.current?.show() }}>打开对话框</WcButton>
<WcDialog ref={dlgEvents} header="事件演示" onWcOpen={() => { message.info('wc-open：对话框已打开') }} onWcClose={() => { onDlgClose }} onWcConfirm={() => { message.success('wc-confirm：点击了确认') }} onWcCancel={() => { message.info('wc-cancel：点击了取消') }}>
  打开、关闭、确认、取消时会在顶部弹出全局提示，观察事件触发顺序。
</WcDialog>

// 组件实例引用
const dlgEvents = useRef<HTMLElement | null>(null);

function msg(type, text) {
  import('@wc-kit/core').then(({ message }) => message[type](text))
}

function onDlgClose(e) {
  msg('info', `wc-close：请求关闭（来源 ${e.detail.reason}）`)
}
```

:::
::::

### 阻止关闭

<div class="demo-block">
  <wc-button theme="primary" @click="dlgPrevent?.show()">打开对话框</wc-button>
  <wc-dialog ref="dlgPrevent" header="拦截关闭" close-on-overlay-click @wc-close="onDlgPreventClose">
    按 Esc 或点击遮罩的关闭请求会被 preventDefault 拦截；确认 / 取消 / 右上角关闭按钮不受影响。
  </wc-dialog>
</div>

wc-close 是可取消事件：监听器中调用 `e.preventDefault()` 即可阻止本次关闭。

:::: details 查看代码
::: code-group

```html [HTML]
<wc-button theme="primary" id="dialog-5-btn0">打开对话框</wc-button>
<wc-dialog header="拦截关闭" close-on-overlay-click id="dlgPrevent">
  按 Esc 或点击遮罩的关闭请求会被 preventDefault 拦截；确认 / 取消 / 右上角关闭按钮不受影响。
</wc-dialog>

<script type="module">
  const dlgPrevent = document.getElementById('dlgPrevent');

  // 拦截 Esc / 遮罩来源的关闭请求，只允许按钮与右上角关闭
  function onDlgPreventClose(e) {
    if (e.detail.reason === 'escape' || e.detail.reason === 'overlay') e.preventDefault();
  }

  const dialog5Btn0 = document.getElementById('dialog-5-btn0');
  dialog5Btn0.addEventListener('click', () => {
    dlgPrevent?.show();
  });
  const dlgPrevent = document.getElementById('dlgPrevent');
  dlgPrevent.addEventListener('wc-close', () => {
    onDlgPreventClose();
  });

  function onDlgPreventClose(e) {
    // 拦截 Esc / 遮罩来源的关闭请求，只允许按钮与右上角关闭
    if (e.detail.reason === 'escape' || e.detail.reason === 'overlay') e.preventDefault();
  }
</script>
```

```vue [Vue]
<template>
  <wc-button theme="primary" @click="dlgPrevent?.show()">打开对话框</wc-button>
  <wc-dialog
    ref="dlgPrevent"
    header="拦截关闭"
    close-on-overlay-click
    @wc-close="onDlgPreventClose"
  >
    按 Esc 或点击遮罩的关闭请求会被 preventDefault 拦截；确认 / 取消 / 右上角关闭按钮不受影响。
  </wc-dialog>
</template>

<script setup lang="ts">
// 拦截 Esc / 遮罩来源的关闭请求，只允许按钮与右上角关闭
function onDlgPreventClose(e) {
  if (e.detail.reason === 'escape' || e.detail.reason === 'overlay') e.preventDefault();
}
</script>
```

```tsx [React]
import { WcButton, WcDialog } from '@wc-kit/react';

<WcButton theme="primary" onClick={() => { dlgPrevent.current?.show() }}>打开对话框</WcButton>
<WcDialog ref={dlgPrevent} header="拦截关闭" closeOnOverlayClick onWcClose={() => { onDlgPreventClose }}>
  按 Esc 或点击遮罩的关闭请求会被 preventDefault 拦截；确认 / 取消 / 右上角关闭按钮不受影响。
</WcDialog>

// 拦截 Esc / 遮罩来源的关闭请求，只允许按钮与右上角关闭
function onDlgPreventClose(e) {
  if (e.detail.reason === 'escape' || e.detail.reason === 'overlay') e.preventDefault()
}

function onDlgPreventClose(e) {
  // 拦截 Esc / 遮罩来源的关闭请求，只允许按钮与右上角关闭
  if (e.detail.reason === 'escape' || e.detail.reason === 'overlay') e.preventDefault()
}
```

:::
::::

## API

### 属性

| 属性                  | attribute                | 类型      | 默认值  | 说明                          |
| --------------------- | ------------------------ | --------- | ------- | ----------------------------- |
| `open`                | `open`                   | `boolean` | `false` | 是否打开                      |
| `header`              | `header`                 | `string`  | `''`    | 页头标题（header 插槽优先）   |
| `footer`              | `footer`                 | `boolean` | `true`  | 是否展示页脚（默认确认/取消） |
| `closable`            | `closable`               | `boolean` | `true`  | 展示右上角关闭按钮            |
| `closeOnOverlayClick` | `close-on-overlay-click` | `boolean` | `false` | 点击遮罩关闭                  |
| `width`               | `width`                  | `string`  | `''`    | 对话框宽度（纯数字按 px）     |

### 事件

| 事件         | 说明                                             |
| ------------ | ------------------------------------------------ |
| `wc-open`    | 打开后触发                                       |
| `wc-close`   | 请求关闭时触发（可取消，detail.reason 标识来源） |
| `wc-confirm` | 点击默认确认按钮触发（确认后自动请求关闭）       |
| `wc-cancel`  | 点击默认取消按钮触发（取消后自动请求关闭）       |

### 方法

| 方法                                                      | 说明                              |
| --------------------------------------------------------- | --------------------------------- |
| `show(): void`                                            | 打开对话框                        |
| `requestClose(reason: wcDialogCloseReason = 'api'): void` | 请求关闭（发出可取消的 wc-close） |
| `confirm(): void`                                         | 默认确认：派发 wc-confirm 并关闭  |
| `cancel(): void`                                          | 默认取消：派发 wc-cancel 并关闭   |

### 插槽

| 名称     | 说明                                |
| -------- | ----------------------------------- |
| （默认） | 对话框内容                          |
| `header` | 自定义页头（覆盖 header 属性）      |
| `footer` | 自定义页脚（覆盖默认确认/取消按钮） |

### CSS 变量

| 变量                | 说明                     |
| ------------------- | ------------------------ |
| `--wc-dialog-width` | 对话框宽度（默认 520px） |

### CSS Parts

`overlay` / `base` / `header` / `body` / `footer`
