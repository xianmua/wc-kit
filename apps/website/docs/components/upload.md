<script setup>
// requestMethod 为函数型属性，模板里用 camelCase 绑定（:requestMethod），
// Vue 检测到同名 property 会走 property 通道；此处为文档演示用模拟上传

/** 模拟上传：进度步进，文件名含 "fail" 时失败 */
function simulate(file, { onProgress, onSuccess, onError }) {
  let percent = 0
  const timer = setInterval(() => {
    percent = Math.min(100, percent + 20)
    onProgress(percent)
    if (percent >= 100) {
      clearInterval(timer)
      if (file.name.includes('fail')) {
        onError('模拟上传失败')
      } else {
        onSuccess({ url: `https://example.com/${file.name}` })
      }
    }
  }, 200)
}

function showError(e) {
  import('@wc-kit/core').then(({ message }) => message.error(`上传失败：${e.detail.file.name}`))
}
function showSuccess(e) {
  import('@wc-kit/core').then(({ message }) => message.success(`上传成功：${e.detail.file.name}`))
}
function showExceed(e) {
  import('@wc-kit/core').then(({ message }) => message.warning(`最多上传 ${e.detail.max} 个文件`))
}
function showCount(e) {
  import('@wc-kit/core').then(({ message }) =>
    message.info(`当前 ${e.detail.files.length} 个文件`),
  )
}
</script>

# Upload 上传

通过点击或拖拽选择文件并上传，支持进度展示、数量限制、失败重试与自定义上传方法。

## 基础用法

多选文件，选择后自动上传，进度条内嵌展示：

<div class="demo-block">
  <wc-upload :requestMethod="simulate" multiple @wc-success="showSuccess" @wc-error="showError"></wc-upload>
</div>

:::: details 查看代码
::: code-group

```html [HTML]
<wc-upload action="/api/upload" multiple></wc-upload>

<script type="module">
  // 或使用自定义上传方法（函数型属性，需 JS 赋值；框架里用绑定/props 传入）
  const el = document.querySelector('wc-upload');
  el.requestMethod = (file, { onProgress, onSuccess, onError }) => {
    // 自行实现上传，通过回调驱动组件状态
    onProgress(50);
    onSuccess({ url: 'https://cdn.example.com/a.png' });
  };
</script>
```

```vue [Vue]
<script setup lang="ts">
// 函数型属性用 camelCase 绑定（:requestMethod，Vue 检测到同名 property 走 property 通道）
function simulate(file, { onProgress, onSuccess, onError }) {
  /* 进度步进，文件名含 "fail" 时失败 */
}

function showSuccess(e) {
  import('@wc-kit/core').then(({ message }) => message.success(`上传成功：${e.detail.file.name}`));
}
function showError(e) {
  import('@wc-kit/core').then(({ message }) => message.error(`上传失败：${e.detail.file.name}`));
}
</script>

<template>
  <wc-upload :requestMethod="simulate" multiple @wc-success="showSuccess" @wc-error="showError"></wc-upload>
</template>
```

```tsx [React]
import { WcUpload } from '@wc-kit/react';

/** 模拟上传：进度步进 */
function simulate(file, { onProgress, onSuccess, onError }) {
  let percent = 0;
  const timer = setInterval(() => {
    percent = Math.min(100, percent + 20);
    onProgress(percent);
    if (percent >= 100) {
      clearInterval(timer);
      if (file.name.includes('fail')) {
        onError('模拟上传失败');
      } else {
        onSuccess({ url: `https://example.com/${file.name}` });
      }
    }
  }, 200);
}

<WcUpload
  requestMethod={simulate}
  multiple
  onWcSuccess={(e) => console.log('上传成功', e.detail.file.name)}
  onWcError={(e) => console.log('上传失败', e.detail.file.name)}
></WcUpload>;
```

:::
::::

## 拖拽上传

设置 `draggable` 渲染大面积拖拽区域，配合 `max` 限制数量与 `tip` 插槽提示：

<div class="demo-block">
  <wc-upload :requestMethod="simulate" draggable multiple max="3" @wc-exceed="showExceed" @wc-error="showError">
    <span slot="tip">单个文件不超过 500MB，最多 3 个（文件名含 fail 模拟失败）</span>
  </wc-upload>
</div>

:::: details 查看代码
::: code-group

```html [HTML]
<wc-upload draggable multiple max="3">
  <span slot="tip">单个文件不超过 500MB</span>
</wc-upload>
```

```vue [Vue]
<script setup lang="ts">
// 函数型属性用 camelCase 绑定（:requestMethod）
function simulate(file, { onProgress, onSuccess, onError }) {
  /* 同上 */
}

function showExceed(e) {
  import('@wc-kit/core').then(({ message }) => message.warning(`最多上传 ${e.detail.max} 个文件`));
}
function showError(e) {
  import('@wc-kit/core').then(({ message }) => message.error(`上传失败：${e.detail.file.name}`));
}
</script>

<template>
  <wc-upload :requestMethod="simulate" draggable multiple max="3" @wc-exceed="showExceed" @wc-error="showError">
    <span slot="tip">单个文件不超过 500MB，最多 3 个</span>
  </wc-upload>
</template>
```

```tsx [React]
import { WcUpload } from '@wc-kit/react';

function simulate(file, { onProgress, onSuccess, onError }) {
  /* 同上 */
}

<WcUpload
  requestMethod={simulate}
  draggable
  multiple
  max={3}
  onWcExceed={(e) => console.log(`最多上传 ${e.detail.max} 个文件`)}
  onWcError={(e) => console.log('上传失败', e.detail.file.name)}
>
  <span slot="tip">单个文件不超过 500MB，最多 3 个</span>
</WcUpload>;
```

:::
::::

## 手动上传

设置 `auto-upload="false"` 后选择文件仅入列，调用 `submit()` 统一上传：

<div class="demo-block">
  <wc-upload ref="manual" auto-upload="false" :requestMethod="simulate"></wc-upload>
  <p style="margin-top: 8px">
    <wc-button size="small" type="outline" @click="manual?.submit()">开始上传</wc-button>
  </p>
</div>

:::: details 查看代码
::: code-group

```html [HTML]
<wc-upload id="manual" auto-upload="false"></wc-upload>
<wc-button id="manual-submit" size="small" type="outline">开始上传</wc-button>

<script type="module">
  const manual = document.getElementById('manual');
  document.getElementById('manual-submit').addEventListener('click', () => manual.submit());
</script>
```

```vue [Vue]
<script setup lang="ts">
import { ref } from 'vue';

// submit() 是方法调用，仍需 ref；requestMethod 用绑定
const manual = ref(null);

function simulate(file, { onProgress, onSuccess, onError }) {
  /* 同上 */
}
</script>

<template>
  <wc-upload ref="manual" auto-upload="false" :requestMethod="simulate"></wc-upload>
  <wc-button size="small" type="outline" @click="manual?.submit()">开始上传</wc-button>
</template>
```

```tsx [React]
import { WcButton, WcUpload } from '@wc-kit/react';
import { useRef } from 'react';

// submit() 是方法调用，仍需 ref
const manual = useRef(null);

function simulate(file, { onProgress, onSuccess, onError }) {
  /* 同上 */
}

<WcUpload ref={manual} autoUpload={false} requestMethod={simulate} />
<WcButton size="small" type="outline" onClick={() => manual.current?.submit()}>
  开始上传
</WcButton>
```

:::
::::

## API

### 属性

| 属性            | 类型                      | 默认值   | 说明                                                        |
| --------------- | ------------------------- | -------- | ----------------------------------------------------------- |
| `action`        | `string`                  | `''`     | 上传地址（设置后以内置 XHR POST FormData，字段名取 `name`） |
| `name`          | `string`                  | `'file'` | FormData 字段名                                             |
| `accept`        | `string`                  | `''`     | 接受的文件类型（原生 accept）                               |
| `multiple`      | `boolean`                 | `false`  | 是否支持多选                                                |
| `max`           | `number`                  | `0`      | 最大文件数量，0 表示不限制                                  |
| `draggable`     | `boolean`                 | `false`  | 拖拽上传模式：渲染大面积拖拽区域                            |
| `auto-upload`   | `boolean`                 | `true`   | 选择后自动上传；`false` 时通过 `submit()` 手动触发          |
| `disabled`      | `boolean`                 | `false`  | 是否禁用                                                    |
| `requestMethod` | `(file, options) => void` | `null`   | 自定义上传方法（函数型属性；设置后优先于 action）           |

`requestMethod` 的 `options` 回调：`onProgress(percent)` / `onSuccess(response?)` / `onError(message?)`。

### 事件

| 事件          | detail                      | 说明                                                         |
| ------------- | --------------------------- | ------------------------------------------------------------ |
| `wc-select`   | `{ files: File[] }`         | 选择/拖入文件后触发（原始 File 数组）                        |
| `wc-change`   | `{ files: wcUploadFile[] }` | 文件列表变化时触发                                           |
| `wc-progress` | `{ file, percent }`         | 上传进度变化                                                 |
| `wc-success`  | `{ file, response }`        | 单个文件上传成功                                             |
| `wc-error`    | `{ file, message }`         | 单个文件上传失败                                             |
| `wc-remove`   | `{ file, index }`           | 移除文件（**可取消**：`preventDefault()` 阻止移除）          |
| `wc-exceed`   | `{ files, max }`            | 超出 max 数量限制                                            |
| `wc-preview`  | `{ file }`                  | 点击带 url 的文件名（成功响应含 `url` 字符串字段时自动提取） |

### 方法

| 方法           | 说明                            |
| -------------- | ------------------------------- |
| `submit()`     | 手动上传全部 waiting 状态的文件 |
| `clearFiles()` | 清空文件列表并中断进行中的上传  |

> 文件列表可通过 `el.files` 读取，条目结构见 `wcUploadFile`（`uid/name/size/percent/status/url/response/raw`）。

### 插槽

| 插槽  | 说明                       |
| ----- | -------------------------- |
| `tip` | 提示说明，显示在触发区下方 |

### CSS 变量

| 变量                     | 默认值                    | 说明              |
| ------------------------ | ------------------------- | ----------------- |
| `--wc-upload-radius`     | `--wc-radius-medium`      | 触发区/拖拽区圆角 |
| `--wc-upload-dragger-bg` | `--wc-color-bg-container` | 拖拽区背景色      |

### CSS Parts

`base` / `trigger` / `dragger` / `list` / `item` / `remove-button`

## React / Vue 用法

**React**（事件 props 为 `onWcChange` / `onWcSuccess` / `onWcError` 等）：

```jsx
import { WcUpload } from '@wc-kit/react';

<WcUpload
  requestMethod={(file, { onSuccess }) => onSuccess({ url: '/a.png' })}
  multiple
  onWcError={(e) => console.log(e.detail.message)}
/>;
```

**Vue**（原生标签 + 类型增强，监听 `@wc-change` 等事件）：

```vue
<script setup lang="ts">
// 函数型属性用 camelCase 绑定（:requestMethod）
const requestMethod = (file, { onSuccess }) => onSuccess({ url: '/a.png' });
const onError = (e) => console.log(e.detail.message);
</script>

<template>
  <wc-upload :requestMethod="requestMethod" multiple @wc-error="onError"></wc-upload>
</template>
```
