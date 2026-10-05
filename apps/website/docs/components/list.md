# List 列表

列表组件：子条目用 light-DOM 的 wc-list-item 声明，容器通过 ::slotted 统一提供分隔线 / 斑马纹 / 悬浮反馈；
无条目时回退渲染 empty 插槽（默认渲染内置 wc-empty）。

**主要 API**

| 属性      | 类型                           | 默认值   | 说明         |
| --------- | ------------------------------ | -------- | ------------ |
| size      | 'small' \| 'medium' \| 'large' | 'medium' | 条目密度     |
| striped   | boolean                        | false    | 斑马纹       |
| hoverable | boolean                        | false    | 条目悬浮高亮 |

**插槽**：默认（列表条目 wc-list-item）、empty（空状态，默认 wc-empty）。无自定义事件。

**React 用法**（@wc-kit/react 包装组件）

```jsx
import { WcList, WcListItem } from '@wc-kit/react';

<WcList striped hoverable>
  <WcListItem>条目一</WcListItem>
  <WcListItem>条目二</WcListItem>
</WcList>;
```

**Vue 用法**（原生标签，@wc-kit/vue 为纯类型增强）

```vue
<wc-list striped hoverable>
  <wc-list-item>条目一</wc-list-item>
  <wc-list-item>条目二</wc-list-item>
</wc-list>
```

## 示例

### 密度

<div class="demo-block">

<div style="display:flex;gap:24px;align-items:flex-start;">
      <div style="flex:1;">
        <p style="margin:0 0 8px;">small</p>
        <wc-list size="small">
          <wc-list-item>条目一</wc-list-item>
          <wc-list-item>条目二</wc-list-item>
        </wc-list>
      </div>
      <div style="flex:1;">
        <p style="margin:0 0 8px;">medium（默认）</p>
        <wc-list>
          <wc-list-item>条目一</wc-list-item>
          <wc-list-item>条目二</wc-list-item>
        </wc-list>
      </div>
      <div style="flex:1;">
        <p style="margin:0 0 8px;">large</p>
        <wc-list size="large">
          <wc-list-item>条目一</wc-list-item>
          <wc-list-item>条目二</wc-list-item>
        </wc-list>
      </div>
    </div>

</div>

<details><summary>查看代码</summary>

```html
<div style="display:flex;gap:24px;align-items:flex-start;">
  <div style="flex:1;">
    <p style="margin:0 0 8px;">small</p>
    <wc-list size="small">
      <wc-list-item>条目一</wc-list-item>
      <wc-list-item>条目二</wc-list-item>
    </wc-list>
  </div>
  <div style="flex:1;">
    <p style="margin:0 0 8px;">medium（默认）</p>
    <wc-list>
      <wc-list-item>条目一</wc-list-item>
      <wc-list-item>条目二</wc-list-item>
    </wc-list>
  </div>
  <div style="flex:1;">
    <p style="margin:0 0 8px;">large</p>
    <wc-list size="large">
      <wc-list-item>条目一</wc-list-item>
      <wc-list-item>条目二</wc-list-item>
    </wc-list>
  </div>
</div>
```

</details>

### 斑马纹与悬浮

<div class="demo-block">

<wc-list striped hoverable style="max-width:420px;">
      <wc-list-item>北京 <span style="float:right;color:#999;">010</span></wc-list-item>
      <wc-list-item>上海 <span style="float:right;color:#999;">021</span></wc-list-item>
      <wc-list-item>广州 <span style="float:right;color:#999;">020</span></wc-list-item>
      <wc-list-item>深圳 <span style="float:right;color:#999;">0755</span></wc-list-item>
    </wc-list>

</div>

<details><summary>查看代码</summary>

```html
<wc-list striped hoverable style="max-width:420px;">
  <wc-list-item>北京 <span style="float:right;color:#999;">010</span></wc-list-item>
  <wc-list-item>上海 <span style="float:right;color:#999;">021</span></wc-list-item>
  <wc-list-item>广州 <span style="float:right;color:#999;">020</span></wc-list-item>
  <wc-list-item>深圳 <span style="float:right;color:#999;">0755</span></wc-list-item>
</wc-list>
```

</details>

### 空状态

<div class="demo-block">

<div style="display:flex;gap:32px;align-items:flex-start;">
      <div style="flex:1;">
        <p style="margin:0 0 8px;">默认空状态（内置 wc-empty）</p>
        <wc-list></wc-list>
      </div>
      <div style="flex:1;">
        <p style="margin:0 0 8px;">自定义 empty 插槽</p>
        <wc-list>
          <wc-button slot="empty" theme="primary">去创建</wc-button>
        </wc-list>
      </div>
    </div>

</div>

<details><summary>查看代码</summary>

```html
<div style="display:flex;gap:32px;align-items:flex-start;">
  <div style="flex:1;">
    <p style="margin:0 0 8px;">默认空状态（内置 wc-empty）</p>
    <wc-list></wc-list>
  </div>
  <div style="flex:1;">
    <p style="margin:0 0 8px;">自定义 empty 插槽</p>
    <wc-list>
      <wc-button slot="empty" theme="primary">去创建</wc-button>
    </wc-list>
  </div>
</div>
```

</details>

## API

### 属性

| 属性        | attribute   | 类型                             | 默认值     | 说明         |
| ----------- | ----------- | -------------------------------- | ---------- | ------------ |
| `size`      | `size`      | `'small' \| 'medium' \| 'large'` | `'medium'` | 条目密度     |
| `striped`   | `striped`   | `boolean`                        | `false`    | 斑马纹       |
| `hoverable` | `hoverable` | `boolean`                        | `false`    | 条目悬浮高亮 |

### 插槽

| 名称     | 说明                        |
| -------- | --------------------------- |
| （默认） | 列表条目（wc-list-item）    |
| `empty`  | 空状态（默认渲染 wc-empty） |

### CSS Parts

`base` / `empty`
