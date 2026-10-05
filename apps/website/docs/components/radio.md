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
- 原生 `input` / `change`：选中时伴发在宿主上（bubbles + composed），供框架监听；注意 `value` 属性是表单提交值，Vue 不走文本 v-model（见下）

**React 用法**

```tsx
import { WcRadio } from '@wc-kit/react';

// 受控：onChange 直接监听原生 change 事件（包装组件已内置事件映射）
<WcRadio name="city" value="beijing" checked={city === 'beijing'} onChange={() => setCity('beijing')}>
  北京
</WcRadio>
<WcRadio name="city" value="shanghai" checked={city === 'shanghai'} onChange={() => setCity('shanghai')}>
  上海
</WcRadio>;
```

**Vue 用法**

```html
<!-- @wc-kit/vue 仅提供类型增强，直接使用原生标签。
     value 属性保留为表单提交值，选中态绑 checked： -->
<wc-radio
  name="city"
  value="beijing"
  :checked="city === 'beijing'"
  @wc-change="(e) => (city = e.detail.value)"
>
  北京
</wc-radio>

<!-- 或加 type="radio" 走 Vue 的单选通道，直接 v-model（value 即选项值）： -->
<wc-radio type="radio" name="city" v-model="city" value="beijing">北京</wc-radio>
<wc-radio type="radio" name="city" v-model="city" value="shanghai">上海</wc-radio>
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

| 事件                    | 说明                                                                 |
| ----------------------- | -------------------------------------------------------------------- |
| `wc-change`             | 选中时触发，detail.value                                             |
| 原生 `input` / `change` | 选中时伴发在宿主上，供框架监听（v-model 走 radio 通道时消费 change） |

### 插槽

| 名称     | 说明     |
| -------- | -------- |
| （默认） | 标签文本 |

### CSS Parts

`base` / `dot` / `label`
