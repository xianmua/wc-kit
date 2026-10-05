# Empty 空状态

空状态组件：默认展示占位图形 + 「暂无数据」文案，均可用插槽自定义，action 插槽可放置操作按钮（如重试）。

**主要 API**：无属性、无自定义事件，全部能力由插槽提供。

| 插槽     | 说明                              |
| -------- | --------------------------------- |
| （默认） | 描述文案（默认 i18n「暂无数据」） |
| icon     | 自定义占位图形                    |
| action   | 操作区                            |

**React 用法**（@wc-kit/react 包装组件）

```jsx
import { WcEmpty, WcButton } from '@wc-kit/react';

<WcEmpty>
  <WcButton slot="action" theme="primary">
    重新加载
  </WcButton>
</WcEmpty>;
```

**Vue 用法**（原生标签，@wc-kit/vue 为纯类型增强）

```vue
<wc-empty>
  <wc-button slot="action" theme="primary">重新加载</wc-button>
</wc-empty>
```

## 示例

### 自定义文案

<div class="demo-block">

<wc-empty>这里还没有任何订单</wc-empty>

</div>

:::: details 查看代码
::: code-group

```html [HTML]
<wc-empty>这里还没有任何订单</wc-empty>
```

```vue [Vue]
<template>
  <wc-empty>这里还没有任何订单</wc-empty>
</template>
```

```tsx [React]
import { WcEmpty } from '@wc-kit/react';

<WcEmpty>这里还没有任何订单</WcEmpty>;
```

:::
::::

### 自定义占位图形

<div class="demo-block">

<wc-empty>
      <span slot="icon" style="font-size:48px;" aria-hidden="true">📦</span>
      暂无包裹，去下一单吧
    </wc-empty>

</div>

:::: details 查看代码
::: code-group

```html [HTML]
<wc-empty>
  <span slot="icon" style="font-size:48px;" aria-hidden="true">📦</span>
  暂无包裹，去下一单吧
</wc-empty>
```

```vue [Vue]
<template>
  <wc-empty>
    <span slot="icon" style="font-size:48px;" aria-hidden="true">📦</span>
    暂无包裹，去下一单吧
  </wc-empty>
</template>
```

```tsx [React]
import { WcEmpty } from '@wc-kit/react';

<WcEmpty>
  <span slot="icon" style="font-size:48px;" aria-hidden="true">
    📦
  </span>
  暂无包裹，去下一单吧
</WcEmpty>;
```

:::
::::

### 带操作按钮

<div class="demo-block">

<wc-empty>
      <wc-button slot="action" theme="primary">重新加载</wc-button>
    </wc-empty>

</div>

:::: details 查看代码
::: code-group

```html [HTML]
<wc-empty>
  <wc-button slot="action" theme="primary">重新加载</wc-button>
</wc-empty>
```

```vue [Vue]
<template>
  <wc-empty>
    <wc-button slot="action" theme="primary">重新加载</wc-button>
  </wc-empty>
</template>
```

```tsx [React]
import { WcButton, WcEmpty } from '@wc-kit/react';

<WcEmpty>
  <WcButton slot="action" theme="primary">
    重新加载
  </WcButton>
</WcEmpty>;
```

:::
::::

## API

### 插槽

| 名称     | 说明                              |
| -------- | --------------------------------- |
| （默认） | 描述文案（默认 i18n「暂无数据」） |
| `icon`   | 自定义占位图形                    |
| `action` | 操作区                            |

### CSS Parts

`base` / `icon` / `description` / `action`
