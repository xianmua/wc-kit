# Drawer 抽屉

抽屉：从屏幕边缘滑出的模态面板。通过 open 属性或 show() / requestClose() 控制显隐；
关闭统一走可取消的 wc-close 事件（preventDefault 可阻止关闭），
并复用 Dialog 的弹层副作用（Escape / 焦点陷阱 / 跨弹层滚动锁）。

## 主要 API

- 属性：open 是否打开；placement 弹出边缘（left / right / top / bottom，默认 right）；
  size 面板尺寸（small 300px / medium 500px / large 760px，纯数字按 px，也支持 CSS 尺寸值）；
  header 标题（header 插槽优先）；footer 默认页脚（默认 true）；closable 关闭按钮（默认 true）；
  mask-closable 点击遮罩关闭（抽屉默认开启）
- 方法：show() 打开；requestClose(reason?) 请求关闭；confirm() / cancel() 确认 / 取消并关闭
- 事件：wc-open 打开后触发；wc-close 请求关闭（可取消，detail.reason 为 close-btn / overlay /
  escape / confirm / cancel / api）；wc-confirm / wc-cancel 点击默认确认 / 取消按钮触发
- 插槽：默认插槽为内容；header 自定义页头；footer 自定义页脚

## React（@wc-kit/react）

```tsx
import { useRef } from 'react';
import { WcDrawer } from '@wc-kit/react';
import type { wcDrawer } from '@wc-kit/core';

function Demo() {
  const ref = useRef<wcDrawer>(null);
  return (
    <>
      <wc-button theme="primary" onClick={() => ref.current?.show()}>
        打开抽屉
      </wc-button>
      <WcDrawer
        ref={ref}
        placement="left"
        header="标题"
        onWcClose={(e) => console.log('关闭来源：', e.detail.reason)}
      >
        抽屉内容
      </WcDrawer>
    </>
  );
}
```

## Vue（原生标签 + @wc-kit/vue 类型增强）

```vue
<template>
  <wc-button theme="primary" @click="drawer?.show()">打开抽屉</wc-button>
  <wc-drawer ref="drawer" placement="left" header="标题" @wc-close="onClose"> 抽屉内容 </wc-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { wcDrawer } from '@wc-kit/core';

const drawer = ref<wcDrawer>();
</script>
```

## 示例

<script setup>
import { ref } from 'vue'

const dwLeft = ref(null)
const dwRight = ref(null)
const dwTop = ref(null)
const dwBottom = ref(null)
const dwS = ref(null)
const dwM = ref(null)
const dwL = ref(null)
const dwN = ref(null)
const dwFooter = ref(null)
const dwEvents = ref(null)

function msg(type, text) {
  import('@wc-kit/core').then(({ message }) => message[type](text))
}
function onDwClose(e) {
  msg('info', `wc-close：请求关闭（来源 ${e.detail.reason}）`)
}
</script>

### 弹出边缘

<div class="demo-block">
  <div style="display:flex;gap:12px;flex-wrap:wrap;">
    <wc-button @click="dwLeft?.show()">左侧滑出</wc-button>
    <wc-button @click="dwRight?.show()">右侧滑出</wc-button>
    <wc-button @click="dwTop?.show()">顶部滑出</wc-button>
    <wc-button @click="dwBottom?.show()">底部滑出</wc-button>
  </div>
  <wc-drawer ref="dwLeft" placement="left" header="左侧抽屉" size="small">从左侧滑出的抽屉。</wc-drawer>
  <wc-drawer ref="dwRight" placement="right" header="右侧抽屉" size="small">从右侧滑出的抽屉。</wc-drawer>
  <wc-drawer ref="dwTop" placement="top" header="顶部抽屉" size="small">从顶部滑出的抽屉。</wc-drawer>
  <wc-drawer ref="dwBottom" placement="bottom" header="底部抽屉" size="small">从底部滑出的抽屉。</wc-drawer>
</div>

placement 决定滑出边缘与面板的延伸方向（左右为宽、上下为高）。

:::: details 查看代码
::: code-group

```html [HTML]
<wc-button id="drawer-1-btn0">左侧滑出</wc-button>
<wc-button id="drawer-1-btn1">右侧滑出</wc-button>
<wc-button id="drawer-1-btn2">顶部滑出</wc-button>
<wc-button id="drawer-1-btn3">底部滑出</wc-button>

<wc-drawer placement="left" header="左侧抽屉" size="small" id="dwLeft"
  >从左侧滑出的抽屉。</wc-drawer
>
<wc-drawer placement="right" header="右侧抽屉" size="small" id="dwRight"
  >从右侧滑出的抽屉。</wc-drawer
>
<wc-drawer placement="top" header="顶部抽屉" size="small" id="dwTop">从顶部滑出的抽屉。</wc-drawer>
<wc-drawer placement="bottom" header="底部抽屉" size="small" id="dwBottom"
  >从底部滑出的抽屉。</wc-drawer
>

<script type="module">
  const drawer1Btn0 = document.getElementById('drawer-1-btn0');
  drawer1Btn0.addEventListener('click', () => {
    dwLeft?.show();
  });
  const drawer1Btn1 = document.getElementById('drawer-1-btn1');
  drawer1Btn1.addEventListener('click', () => {
    dwRight?.show();
  });
  const drawer1Btn2 = document.getElementById('drawer-1-btn2');
  drawer1Btn2.addEventListener('click', () => {
    dwTop?.show();
  });
  const drawer1Btn3 = document.getElementById('drawer-1-btn3');
  drawer1Btn3.addEventListener('click', () => {
    dwBottom?.show();
  });
  const dwLeft = document.getElementById('dwLeft');
  const dwRight = document.getElementById('dwRight');
  const dwTop = document.getElementById('dwTop');
  const dwBottom = document.getElementById('dwBottom');
</script>
```

```vue [Vue]
<template>
  <wc-button @click="dwLeft?.show()">左侧滑出</wc-button>
  <wc-button @click="dwRight?.show()">右侧滑出</wc-button>
  <wc-button @click="dwTop?.show()">顶部滑出</wc-button>
  <wc-button @click="dwBottom?.show()">底部滑出</wc-button>

  <wc-drawer ref="dwLeft" placement="left" header="左侧抽屉" size="small"
    >从左侧滑出的抽屉。</wc-drawer
  >
  <wc-drawer ref="dwRight" placement="right" header="右侧抽屉" size="small"
    >从右侧滑出的抽屉。</wc-drawer
  >
  <wc-drawer ref="dwTop" placement="top" header="顶部抽屉" size="small"
    >从顶部滑出的抽屉。</wc-drawer
  >
  <wc-drawer ref="dwBottom" placement="bottom" header="底部抽屉" size="small"
    >从底部滑出的抽屉。</wc-drawer
  >
</template>

<script setup lang="ts">
import { ref } from 'vue';

const dwLeft = ref();
const dwRight = ref();
const dwTop = ref();
const dwBottom = ref();
</script>
```

```tsx [React]
import { WcButton, WcDrawer } from '@wc-kit/react';

<WcButton onClick={() => { dwLeft.current?.show() }}>左侧滑出</WcButton>
<WcButton onClick={() => { dwRight.current?.show() }}>右侧滑出</WcButton>
<WcButton onClick={() => { dwTop.current?.show() }}>顶部滑出</WcButton>
<WcButton onClick={() => { dwBottom.current?.show() }}>底部滑出</WcButton>

<WcDrawer ref={dwLeft} placement="left" header="左侧抽屉" size="small">从左侧滑出的抽屉。</WcDrawer>
<WcDrawer ref={dwRight} placement="right" header="右侧抽屉" size="small">从右侧滑出的抽屉。</WcDrawer>
<WcDrawer ref={dwTop} placement="top" header="顶部抽屉" size="small">从顶部滑出的抽屉。</WcDrawer>
<WcDrawer ref={dwBottom} placement="bottom" header="底部抽屉" size="small">从底部滑出的抽屉。</WcDrawer>

// 组件实例引用
const dwLeft = useRef<HTMLElement | null>(null);
const dwRight = useRef<HTMLElement | null>(null);
const dwTop = useRef<HTMLElement | null>(null);
const dwBottom = useRef<HTMLElement | null>(null);
```

:::
::::

### 面板尺寸

<div class="demo-block">
  <div style="display:flex;gap:12px;flex-wrap:wrap;">
    <wc-button @click="dwS?.show()">small（300px）</wc-button>
    <wc-button @click="dwM?.show()">medium（500px）</wc-button>
    <wc-button @click="dwL?.show()">large（760px）</wc-button>
    <wc-button @click="dwN?.show()">纯数字 320（px）</wc-button>
  </div>
  <wc-drawer ref="dwS" header="small 抽屉" size="small">预设尺寸 small（300px）。</wc-drawer>
  <wc-drawer ref="dwM" header="medium 抽屉" size="medium">预设尺寸 medium（500px）。</wc-drawer>
  <wc-drawer ref="dwL" header="large 抽屉" size="large">预设尺寸 large（760px）。</wc-drawer>
  <wc-drawer ref="dwN" header="数字抽屉" size="320">size="320"，纯数字按 px 处理。</wc-drawer>
</div>

size 支持预设档位、纯数字（按 px）或任意 CSS 尺寸值；也可用 CSS 变量 `--wc-drawer-size`。

:::: details 查看代码
::: code-group

```html [HTML]
<wc-button id="drawer-2-btn0">small（300px）</wc-button>
<wc-button id="drawer-2-btn1">medium（500px）</wc-button>
<wc-button id="drawer-2-btn2">large（760px）</wc-button>
<wc-button id="drawer-2-btn3">纯数字 320（px）</wc-button>

<wc-drawer header="small 抽屉" size="small" id="dwS">预设尺寸 small（300px）。</wc-drawer>
<wc-drawer header="medium 抽屉" size="medium" id="dwM">预设尺寸 medium（500px）。</wc-drawer>
<wc-drawer header="large 抽屉" size="large" id="dwL">预设尺寸 large（760px）。</wc-drawer>
<wc-drawer header="数字抽屉" size="320" id="dwN">size="320"，纯数字按 px 处理。</wc-drawer>

<script type="module">
  const drawer2Btn0 = document.getElementById('drawer-2-btn0');
  drawer2Btn0.addEventListener('click', () => {
    dwS?.show();
  });
  const drawer2Btn1 = document.getElementById('drawer-2-btn1');
  drawer2Btn1.addEventListener('click', () => {
    dwM?.show();
  });
  const drawer2Btn2 = document.getElementById('drawer-2-btn2');
  drawer2Btn2.addEventListener('click', () => {
    dwL?.show();
  });
  const drawer2Btn3 = document.getElementById('drawer-2-btn3');
  drawer2Btn3.addEventListener('click', () => {
    dwN?.show();
  });
  const dwS = document.getElementById('dwS');
  const dwM = document.getElementById('dwM');
  const dwL = document.getElementById('dwL');
  const dwN = document.getElementById('dwN');
</script>
```

```vue [Vue]
<template>
  <wc-button @click="dwS?.show()">small（300px）</wc-button>
  <wc-button @click="dwM?.show()">medium（500px）</wc-button>
  <wc-button @click="dwL?.show()">large（760px）</wc-button>
  <wc-button @click="dwN?.show()">纯数字 320（px）</wc-button>

  <wc-drawer ref="dwS" header="small 抽屉" size="small">预设尺寸 small（300px）。</wc-drawer>
  <wc-drawer ref="dwM" header="medium 抽屉" size="medium">预设尺寸 medium（500px）。</wc-drawer>
  <wc-drawer ref="dwL" header="large 抽屉" size="large">预设尺寸 large（760px）。</wc-drawer>
  <wc-drawer ref="dwN" header="数字抽屉" size="320">size="320"，纯数字按 px 处理。</wc-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const dwS = ref();
const dwM = ref();
const dwL = ref();
const dwN = ref();
</script>
```

```tsx [React]
import { WcButton, WcDrawer } from '@wc-kit/react';

<WcButton onClick={() => { dwS.current?.show() }}>small（300px）</WcButton>
<WcButton onClick={() => { dwM.current?.show() }}>medium（500px）</WcButton>
<WcButton onClick={() => { dwL.current?.show() }}>large（760px）</WcButton>
<WcButton onClick={() => { dwN.current?.show() }}>纯数字 320（px）</WcButton>

<WcDrawer ref={dwS} header="small 抽屉" size="small">预设尺寸 small（300px）。</WcDrawer>
<WcDrawer ref={dwM} header="medium 抽屉" size="medium">预设尺寸 medium（500px）。</WcDrawer>
<WcDrawer ref={dwL} header="large 抽屉" size="large">预设尺寸 large（760px）。</WcDrawer>
<WcDrawer ref={dwN} header="数字抽屉" size={320}>size="320"，纯数字按 px 处理。</WcDrawer>

// 组件实例引用
const dwS = useRef<HTMLElement | null>(null);
const dwM = useRef<HTMLElement | null>(null);
const dwL = useRef<HTMLElement | null>(null);
const dwN = useRef<HTMLElement | null>(null);
```

:::
::::

### 自定义页脚

<div class="demo-block">
  <wc-button theme="primary" @click="dwFooter?.show()">打开抽屉</wc-button>
  <wc-drawer ref="dwFooter" header="自定义页脚">
    通过 footer 插槽替换默认的确认 / 取消按钮。
    <wc-button slot="footer" @click="dwFooter?.requestClose('api')">知道了</wc-button>
  </wc-drawer>
</div>

footer 插槽会覆盖默认页脚；header 插槽同理可覆盖 header 属性。

:::: details 查看代码
::: code-group

```html [HTML]
<wc-button theme="primary" id="drawer-3-btn0">打开抽屉</wc-button>
<wc-drawer header="自定义页脚" id="dwFooter">
  通过 footer 插槽替换默认的确认 / 取消按钮。
  <wc-button slot="footer" id="drawer-3-btn1">知道了</wc-button>
</wc-drawer>

<script type="module">
  const drawer3Btn0 = document.getElementById('drawer-3-btn0');
  drawer3Btn0.addEventListener('click', () => {
    dwFooter?.show();
  });
  const dwFooter = document.getElementById('dwFooter');
  const drawer3Btn1 = document.getElementById('drawer-3-btn1');
  drawer3Btn1.addEventListener('click', () => {
    dwFooter?.requestClose('api');
  });
</script>
```

```vue [Vue]
<template>
  <wc-button theme="primary" @click="dwFooter?.show()">打开抽屉</wc-button>
  <wc-drawer ref="dwFooter" header="自定义页脚">
    通过 footer 插槽替换默认的确认 / 取消按钮。
    <wc-button slot="footer" @click="dwFooter?.requestClose('api')">知道了</wc-button>
  </wc-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const dwFooter = ref();
</script>
```

```tsx [React]
import { WcButton, WcDrawer } from '@wc-kit/react';

<WcButton theme="primary" onClick={() => { dwFooter.current?.show() }}>打开抽屉</WcButton>
<WcDrawer ref={dwFooter} header="自定义页脚">
  通过 footer 插槽替换默认的确认 / 取消按钮。
  <WcButton slot="footer" onClick={() => { dwFooter.current?.requestClose('api') }}>知道了</WcButton>
</WcDrawer>

// 组件实例引用
const dwFooter = useRef<HTMLElement | null>(null);
```

:::
::::

### 事件

<div class="demo-block">
  <wc-button theme="primary" @click="dwEvents?.show()">打开抽屉</wc-button>
  <wc-drawer
    ref="dwEvents"
    header="事件演示"
    @wc-open="msg('info', 'wc-open：抽屉已打开')"
    @wc-close="onDwClose"
    @wc-confirm="msg('success', 'wc-confirm：点击了确认')"
    @wc-cancel="msg('info', 'wc-cancel：点击了取消')"
  >
    打开、关闭、确认、取消时会在顶部弹出全局提示，观察事件触发顺序。
  </wc-drawer>
</div>

wc-open 在打开后触发；wc-close 在请求关闭时触发（可取消）；wc-confirm / wc-cancel 由默认页脚按钮触发后自动请求关闭。

:::: details 查看代码
::: code-group

```html [HTML]
<wc-button theme="primary" id="drawer-4-btn0">打开抽屉</wc-button>
<wc-drawer header="事件演示" id="dwEvents">
  打开、关闭、确认、取消时会在顶部弹出全局提示，观察事件触发顺序。
</wc-drawer>

<script type="module">
  const { message } = await import('@wc-kit/core');

  const drawer4Btn0 = document.getElementById('drawer-4-btn0');
  drawer4Btn0.addEventListener('click', () => {
    dwEvents?.show();
  });
  const dwEvents = document.getElementById('dwEvents');
  dwEvents.addEventListener('wc-open', () => {
    message.info('wc-open：抽屉已打开');
  });
  dwEvents.addEventListener('wc-close', () => {
    onDwClose();
  });
  dwEvents.addEventListener('wc-confirm', () => {
    message.success('wc-confirm：点击了确认');
  });
  dwEvents.addEventListener('wc-cancel', () => {
    message.info('wc-cancel：点击了取消');
  });

  function msg(type, text) {
    import('@wc-kit/core').then(({ message }) => message[type](text));
  }

  function onDwClose(e) {
    msg('info', `wc-close：请求关闭（来源 ${e.detail.reason}）`);
  }
</script>
```

```vue [Vue]
<template>
  <wc-button theme="primary" @click="dwEvents?.show()">打开抽屉</wc-button>
  <wc-drawer
    ref="dwEvents"
    header="事件演示"
    @wc-open="msg('info', 'wc-open：抽屉已打开')"
    @wc-close="onDwClose"
    @wc-confirm="msg('success', 'wc-confirm：点击了确认')"
    @wc-cancel="msg('info', 'wc-cancel：点击了取消')"
  >
    打开、关闭、确认、取消时会在顶部弹出全局提示，观察事件触发顺序。
  </wc-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const dwEvents = ref();

function msg(type, text) {
  import('@wc-kit/core').then(({ message }) => message[type](text));
}

function onDwClose(e) {
  msg('info', `wc-close：请求关闭（来源 ${e.detail.reason}）`);
}
</script>
```

```tsx [React]
import { WcButton, WcDrawer } from '@wc-kit/react';
import { message } from '@wc-kit/core';

<WcButton theme="primary" onClick={() => { dwEvents.current?.show() }}>打开抽屉</WcButton>
<WcDrawer ref={dwEvents} header="事件演示" onWcOpen={() => { message.info('wc-open：抽屉已打开') }} onWcClose={() => { onDwClose }} onWcConfirm={() => { message.success('wc-confirm：点击了确认') }} onWcCancel={() => { message.info('wc-cancel：点击了取消') }}>
  打开、关闭、确认、取消时会在顶部弹出全局提示，观察事件触发顺序。
</WcDrawer>

// 组件实例引用
const dwEvents = useRef<HTMLElement | null>(null);

function msg(type, text) {
  import('@wc-kit/core').then(({ message }) => message[type](text))
}

function onDwClose(e) {
  msg('info', `wc-close：请求关闭（来源 ${e.detail.reason}）`)
}
```

:::
::::

## API

### 属性

| 属性           | attribute       | 类型                                     | 默认值     | 说明                                                        |
| -------------- | --------------- | ---------------------------------------- | ---------- | ----------------------------------------------------------- |
| `open`         | `open`          | `boolean`                                | `false`    | 是否打开                                                    |
| `placement`    | `placement`     | `'left' \| 'right' \| 'top' \| 'bottom'` | `'right'`  | 弹出边缘                                                    |
| `size`         | `size`          | `keyof typeof PRESET_SIZES \| string`    | `'medium'` | 面板尺寸：small / medium / large / 纯数字（px）/ CSS 尺寸值 |
| `header`       | `header`        | `string`                                 | `''`       | 页头标题（header 插槽优先）                                 |
| `footer`       | `footer`        | `boolean`                                | `true`     | 是否展示页脚（默认确认/取消）                               |
| `closable`     | `closable`      | `boolean`                                | `true`     | 展示关闭按钮                                                |
| `maskClosable` | `mask-closable` | `boolean`                                | `true`     | 点击遮罩关闭（抽屉默认开启）                                |

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
| `show(): void`                                            | 打开抽屉                          |
| `requestClose(reason: wcDrawerCloseReason = 'api'): void` | 请求关闭（发出可取消的 wc-close） |
| `confirm(): void`                                         | 默认确认：派发 wc-confirm 并关闭  |
| `cancel(): void`                                          | 默认取消：派发 wc-cancel 并关闭   |

### 插槽

| 名称     | 说明                                |
| -------- | ----------------------------------- |
| （默认） | 抽屉内容                            |
| `header` | 自定义页头（覆盖 header 属性）      |
| `footer` | 自定义页脚（覆盖默认确认/取消按钮） |

### CSS 变量

| 变量               | 说明                                 |
| ------------------ | ------------------------------------ |
| `--wc-drawer-size` | 面板尺寸（placement 决定是宽还是高） |

### CSS Parts

`overlay` / `base` / `header` / `body` / `footer`
