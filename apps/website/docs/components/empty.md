# Empty 空状态

空状态组件：默认展示「空托盘」占位图标（内建 inbox）+ 「暂无数据」文案，均可用插槽自定义，action 插槽可放置操作按钮（如重试）。

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

<details><summary>查看代码</summary>

```html
<wc-empty>这里还没有任何订单</wc-empty>
```

</details>

### 自定义占位图形

<div class="demo-block">

<wc-empty>
      <span slot="icon" style="font-size:48px;" aria-hidden="true">📦</span>
      暂无包裹，去下一单吧
    </wc-empty>

</div>

<details><summary>查看代码</summary>

```html
<wc-empty>
  <span slot="icon" style="font-size:48px;" aria-hidden="true">📦</span>
  暂无包裹，去下一单吧
</wc-empty>
```

</details>

### 带操作按钮

<div class="demo-block">

<wc-empty>
      <wc-button slot="action" theme="primary">重新加载</wc-button>
    </wc-empty>

</div>

<details><summary>查看代码</summary>

```html
<wc-empty>
  <wc-button slot="action" theme="primary">重新加载</wc-button>
</wc-empty>
```

</details>

## API

### 插槽

| 名称     | 说明                                        |
| -------- | ------------------------------------------- |
| （默认） | 描述文案（默认 i18n「暂无数据」）           |
| `icon`   | 自定义占位图形（默认内建 inbox 空托盘图标） |
| `action` | 操作区                                      |

### CSS Parts

`base` / `icon` / `description` / `action`

### CSS 变量

| 变量                   | 说明                          |
| ---------------------- | ----------------------------- |
| `--wc-empty-icon-size` | 默认占位图标尺寸（默认 48px） |
