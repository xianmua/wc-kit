# Radio 单选框

单选框组件。同名（name）的 wc-radio 在同一表单内自动互斥分组，分组行为由浏览器的 form-associated
单选机制保证。标签文本写在默认插槽。

**属性**

- `checked`：选中状态，布尔，默认 false
- `value`：选中时提交到表单的值，string，默认 ''
- `label`：无障碍标签（无默认插槽文本时使用）
- `name`：提交到表单的字段名，同名自动互斥分组
- `disabled`：是否禁用

**事件**

- `wc-change`：选中时触发，detail.value

**React 用法**

```tsx
import { WcRadio } from '@wc-kit/react';

<WcRadio name="city" value="beijing" checked={city === 'beijing'} onWcChange={setCity}>
  北京
</WcRadio>
<WcRadio name="city" value="shanghai" checked={city === 'shanghai'} onWcChange={setCity}>
  上海
</WcRadio>
```

**Vue 用法**

```html
<!-- @wc-kit/vue 仅提供类型增强，直接使用原生标签。
     不要使用原生 v-model（它绑定 value + 原生 input 事件），
     组件派发的是 wc-change（detail.value）。 -->
<wc-radio
  name="city"
  value="beijing"
  :checked="city === 'beijing'"
  @wc-change="(e) => (city = e.detail.value)"
>
  北京
</wc-radio>
<wc-radio
  name="city"
  value="shanghai"
  :checked="city === 'shanghai'"
  @wc-change="(e) => (city = e.detail.value)"
>
  上海
</wc-radio>
```

## 示例

### 单选组

<div class="demo-block">

<div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;">
      <wc-radio name="city" value="beijing" checked>北京</wc-radio>
      <wc-radio name="city" value="shanghai">上海</wc-radio>
      <wc-radio name="city" value="guangzhou">广州</wc-radio>
    </div>

</div>

<details><summary>查看代码</summary>

```html
<div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;">
  <wc-radio name="city" value="beijing" checked>北京</wc-radio>
  <wc-radio name="city" value="shanghai">上海</wc-radio>
  <wc-radio name="city" value="guangzhou">广州</wc-radio>
</div>
```

</details>

### 禁用

<div class="demo-block">

<div style="display:flex;gap:12px;align-items:center;">
      <wc-radio name="plan" value="free" disabled>免费版（禁用）</wc-radio>
      <wc-radio name="plan" value="pro" checked disabled>专业版（禁用选中）</wc-radio>
    </div>

</div>

<details><summary>查看代码</summary>

```html
<div style="display:flex;gap:12px;align-items:center;">
  <wc-radio name="plan" value="free" disabled>免费版（禁用）</wc-radio>
  <wc-radio name="plan" value="pro" checked disabled>专业版（禁用选中）</wc-radio>
</div>
```

</details>

## API

### 属性

| 属性      | attribute | 类型      | 默认值  | 说明                               |
| --------- | --------- | --------- | ------- | ---------------------------------- |
| `checked` | `checked` | `boolean` | `false` | 选中状态                           |
| `value`   | `value`   | `string`  | `''`    | 选中时提交到表单的值               |
| `label`   | `label`   | `string`  | `''`    | 无障碍标签（无默认插槽文本时使用） |

### 事件

| 事件        | 说明                     |
| ----------- | ------------------------ |
| `wc-change` | 选中时触发，detail.value |

### 插槽

| 名称     | 说明     |
| -------- | -------- |
| （默认） | 标签文本 |

### CSS Parts

`base` / `dot` / `label`
