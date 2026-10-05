# Switch 开关

开关组件，用于两种状态之间的切换。标签文本写在默认插槽；基于 ElementInternals 接入原生 form，
按 checkedValue / uncheckedValue 提交表单值。

**属性**

- `checked`：开启状态，布尔，默认 false
- `value`：选中状态的布尔代理（与 checked 双向同步），供框架 v-model / 受控绑定直接用
- `checkedValue`：开启时提交到表单的值，string，默认 'on'
- `uncheckedValue`：关闭时提交到表单的值，string，默认 ''（为空则不提交）
- `label`：无障碍标签（无默认插槽文本时使用）
- `name`：提交到表单的字段名
- `disabled`：是否禁用

**事件**

- `wc-change`：切换时触发，detail.checked
- 原生 `input` / `change`：切换时伴发在宿主上（bubbles + composed），配合 value 布尔代理供框架双向绑定直接消费

**React 用法**

```tsx
import { WcSwitch } from '@wc-kit/react';

// 受控：checked + onChange（原生 change 事件，包装组件已内置事件映射）
<WcSwitch checked={enabled} onChange={(e) => setEnabled(e.target.checked)} />;
```

**Vue 用法**

```html
<!-- @wc-kit/vue 仅提供类型增强，直接使用原生标签。
     vite 配置一次 isCustomElement 后可直接 v-model（绑定 value 布尔代理）。 -->
<wc-switch v-model="enabled"></wc-switch>
<wc-switch v-model="notice">消息通知</wc-switch>
```

## 示例

### 状态

<div class="demo-block">

<div style="display:flex;gap:12px;align-items:center;">
      <wc-switch></wc-switch>
      <wc-switch checked></wc-switch>
      <wc-switch disabled></wc-switch>
      <wc-switch checked disabled></wc-switch>
    </div>

</div>

<details><summary>查看代码</summary>

```html
<div style="display:flex;gap:12px;align-items:center;">
  <wc-switch></wc-switch>
  <wc-switch checked></wc-switch>
  <wc-switch disabled></wc-switch>
  <wc-switch checked disabled></wc-switch>
</div>
```

</details>

### 带标签文本

<div class="demo-block">

<div style="display:flex;gap:12px;align-items:center;">
      <wc-switch checked>消息通知</wc-switch>
      <wc-switch>夜间模式</wc-switch>
    </div>

</div>

<details><summary>查看代码</summary>

```html
<div style="display:flex;gap:12px;align-items:center;">
  <wc-switch checked>消息通知</wc-switch>
  <wc-switch>夜间模式</wc-switch>
</div>
```

</details>

### 提交值

<div class="demo-block">

<div style="display:flex;gap:12px;align-items:center;">
      <wc-switch name="notice" checked-value="1" unchecked-value="0" checked>开启/关闭</wc-switch>
    </div>

</div>

<details><summary>查看代码</summary>

```html
<div style="display:flex;gap:12px;align-items:center;">
  <wc-switch name="notice" checked-value="1" unchecked-value="0" checked>开启/关闭</wc-switch>
</div>
```

</details>

## API

### 属性

| 属性             | attribute        | 类型      | 默认值  | 说明                                                     |
| ---------------- | ---------------- | --------- | ------- | -------------------------------------------------------- |
| `checked`        | `checked`        | `boolean` | `false` | 开启状态                                                 |
| `value`          | —                | `boolean` | `false` | checked 的布尔代理（getter/setter），供框架 v-model 绑定 |
| `checkedValue`   | `checkedvalue`   | `string`  | `'on'`  | 开启时提交到表单的值                                     |
| `uncheckedValue` | `uncheckedvalue` | `string`  | `''`    | 关闭时提交到表单的值（为空则不提交）                     |
| `label`          | `label`          | `string`  | `''`    | 无障碍标签（无默认插槽文本时使用）                       |

### 事件

| 事件                    | 说明                                                                  |
| ----------------------- | --------------------------------------------------------------------- |
| `wc-change`             | 切换时触发，detail.checked                                            |
| 原生 `input` / `change` | 切换时伴发在宿主上，配合 value 布尔代理供框架 v-model / onChange 消费 |

### 插槽

| 名称     | 说明     |
| -------- | -------- |
| （默认） | 标签文本 |

### CSS Parts

`base` / `track` / `thumb` / `label`
