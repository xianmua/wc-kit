# Select 选择器

选择器组件（单选）。选项通过默认插槽放置 `<wc-option>` 子元素；基于 ElementInternals 接入原生 form，
value / name / disabled 可随表单提交与重置。支持键盘导航（Enter / Space 开合与选择、↑↓ 移动高亮、Esc 关闭）。

**wc-select 属性**

- `value`：当前选中值，string，默认 ''
- `placeholder`：占位提示，默认取 i18n 文案
- `size`：尺寸 'small' | 'medium' | 'large'，默认 'medium'
- `status`：校验状态 'default' | 'success' | 'warning' | 'error'，默认 'default'
- `clearable`：可清除，布尔，默认 false
- `open`：下拉面板是否展开（内部状态，一般无需手动设置）
- `name` / `disabled`：表单字段名 / 禁用

**wc-option 属性**

- `value`：选项值
- `disabled`：禁用该选项
- 选项文本写在默认插槽（其 label 由 textContent 自动读取）；selected / active 由 wc-select 管理，无需手动设置

**事件**

- `wc-change`：选中值变化时触发，detail.value / detail.label
- `wc-clear`：点击清除按钮后触发

**React 用法**

```tsx
import { WcSelect, WcOption } from '@wc-kit/react';

<WcSelect
  placeholder="请选择城市"
  clearable
  onWcChange={(e) => console.log(e.detail.value, e.detail.label)}
>
  <WcOption value="beijing">北京</WcOption>
  <WcOption value="shanghai">上海</WcOption>
</WcSelect>;
```

**Vue 用法**

```html
<!-- @wc-kit/vue 仅提供类型增强，直接使用原生标签。
     不要使用原生 v-model（它绑定 value + 原生 input 事件），
     组件派发的是 wc-change（detail.value / detail.label）。 -->
<wc-select :value="city" @wc-change="(e) => (city = e.detail.value)">
  <wc-option value="beijing">北京</wc-option>
  <wc-option value="shanghai">上海</wc-option>
</wc-select>
```

## 示例

### 默认选中与可清除

<div class="demo-block">

<div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;">
      <wc-select style="width:200px" value="shanghai" placeholder="默认选中">
        <wc-option value="beijing">北京</wc-option>
        <wc-option value="shanghai">上海</wc-option>
        <wc-option value="guangzhou">广州</wc-option>
      </wc-select>
      <wc-select style="width:200px" value="guangzhou" clearable placeholder="可清除">
        <wc-option value="beijing">北京</wc-option>
        <wc-option value="shanghai">上海</wc-option>
        <wc-option value="guangzhou">广州</wc-option>
      </wc-select>
    </div>

</div>

<details><summary>查看代码</summary>

```html
<div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;">
  <wc-select style="width:200px" value="shanghai" placeholder="默认选中">
    <wc-option value="beijing">北京</wc-option>
    <wc-option value="shanghai">上海</wc-option>
    <wc-option value="guangzhou">广州</wc-option>
  </wc-select>
  <wc-select style="width:200px" value="guangzhou" clearable placeholder="可清除">
    <wc-option value="beijing">北京</wc-option>
    <wc-option value="shanghai">上海</wc-option>
    <wc-option value="guangzhou">广州</wc-option>
  </wc-select>
</div>
```

</details>

### 尺寸

<div class="demo-block">

<div style="display:flex;gap:12px;align-items:center;">
      <wc-select size="small" style="width:140px" placeholder="小号 small">
        <wc-option value="a">选项 A</wc-option>
        <wc-option value="b">选项 B</wc-option>
      </wc-select>
      <wc-select size="medium" style="width:140px" placeholder="中号 medium">
        <wc-option value="a">选项 A</wc-option>
        <wc-option value="b">选项 B</wc-option>
      </wc-select>
      <wc-select size="large" style="width:140px" placeholder="大号 large">
        <wc-option value="a">选项 A</wc-option>
        <wc-option value="b">选项 B</wc-option>
      </wc-select>
    </div>

</div>

<details><summary>查看代码</summary>

```html
<div style="display:flex;gap:12px;align-items:center;">
  <wc-select size="small" style="width:140px" placeholder="小号 small">
    <wc-option value="a">选项 A</wc-option>
    <wc-option value="b">选项 B</wc-option>
  </wc-select>
  <wc-select size="medium" style="width:140px" placeholder="中号 medium">
    <wc-option value="a">选项 A</wc-option>
    <wc-option value="b">选项 B</wc-option>
  </wc-select>
  <wc-select size="large" style="width:140px" placeholder="大号 large">
    <wc-option value="a">选项 A</wc-option>
    <wc-option value="b">选项 B</wc-option>
  </wc-select>
</div>
```

</details>

### 禁用选项与禁用选择器

<div class="demo-block">

<div style="display:flex;gap:12px;align-items:center;">
      <wc-select style="width:200px" placeholder="含禁用选项">
        <wc-option value="beijing">北京</wc-option>
        <wc-option value="shanghai" disabled>上海（禁用）</wc-option>
        <wc-option value="guangzhou">广州</wc-option>
      </wc-select>
      <wc-select style="width:200px" value="beijing" disabled>
        <wc-option value="beijing">北京</wc-option>
      </wc-select>
    </div>

</div>

<details><summary>查看代码</summary>

```html
<div style="display:flex;gap:12px;align-items:center;">
  <wc-select style="width:200px" placeholder="含禁用选项">
    <wc-option value="beijing">北京</wc-option>
    <wc-option value="shanghai" disabled>上海（禁用）</wc-option>
    <wc-option value="guangzhou">广州</wc-option>
  </wc-select>
  <wc-select style="width:200px" value="beijing" disabled>
    <wc-option value="beijing">北京</wc-option>
  </wc-select>
</div>
```

</details>

### 校验状态

<div class="demo-block">

<div style="display:flex;gap:12px;align-items:center;">
      <wc-select status="success" style="width:160px" value="a">
        <wc-option value="a">成功 success</wc-option>
      </wc-select>
      <wc-select status="warning" style="width:160px" value="a">
        <wc-option value="a">警告 warning</wc-option>
      </wc-select>
      <wc-select status="error" style="width:160px" value="a">
        <wc-option value="a">错误 error</wc-option>
      </wc-select>
    </div>

</div>

<details><summary>查看代码</summary>

```html
<div style="display:flex;gap:12px;align-items:center;">
  <wc-select status="success" style="width:160px" value="a">
    <wc-option value="a">成功 success</wc-option>
  </wc-select>
  <wc-select status="warning" style="width:160px" value="a">
    <wc-option value="a">警告 warning</wc-option>
  </wc-select>
  <wc-select status="error" style="width:160px" value="a">
    <wc-option value="a">错误 error</wc-option>
  </wc-select>
</div>
```

</details>

## API

### 属性

| 属性          | attribute     | 类型                                             | 默认值      | 说明                         |
| ------------- | ------------- | ------------------------------------------------ | ----------- | ---------------------------- |
| `placeholder` | `placeholder` | `string`                                         | `''`        | 占位提示，默认取 i18n 文案   |
| `size`        | `size`        | `'small' \| 'medium' \| 'large'`                 | `'medium'`  | 尺寸                         |
| `status`      | `status`      | `'default' \| 'success' \| 'warning' \| 'error'` | `'default'` | 校验状态（影响边框色）       |
| `clearable`   | `clearable`   | `boolean`                                        | `false`     | 可清除                       |
| `open`        | `open`        | `boolean`                                        | `false`     | 下拉面板是否展开（内部状态） |

### 事件

| 事件        | 说明                                          |
| ----------- | --------------------------------------------- |
| `wc-change` | 选中值变化时触发，detail.value / detail.label |
| `wc-clear`  | 点击清除按钮后触发                            |

### 插槽

| 名称     | 说明                         |
| -------- | ---------------------------- |
| （默认） | 默认插槽，放置 `<wc-option>` |

### CSS 变量

| 变量                 | 说明       |
| -------------------- | ---------- |
| `--wc-select-height` | 触发器高度 |

### CSS Parts

`base` / `trigger` / `value` / `panel`
