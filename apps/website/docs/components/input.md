# Input 输入框

输入框组件，用于单行文本输入。基于 ElementInternals 接入原生 form，value / name / disabled 可随表单提交与重置。

**属性**

- `value`：输入值，string，默认 ''
- `type`：原生输入类型（text / password / tel / url / search 等），默认 'text'
- `size`：尺寸 'small' | 'medium' | 'large'，默认 'medium'
- `status`：校验状态 'default' | 'success' | 'warning' | 'error'，默认 'default'
- `placeholder`：占位提示
- `label`：无障碍标签（等价原生 aria-label）
- `maxlength`：最大输入长度，number
- `readonly` / `clearable` / `disabled`：只读 / 可清除 / 禁用
- `name`：提交到表单的字段名

**插槽**

- `prefix`：前置内容（图标、文字等）
- `suffix`：后置内容（清除按钮之外的区域）

**事件**

- `wc-input`：输入时触发，detail.value
- `wc-change`：值变更提交时触发（失焦 / 回车），detail.value
- `wc-clear`：点击清除按钮后触发

**React 用法**

```tsx
import { WcInput } from '@wc-kit/react';

<WcInput placeholder="请输入用户名" clearable onWcChange={(e) => console.log(e.detail.value)} />;
```

**Vue 用法**

```html
<!-- @wc-kit/vue 仅提供类型增强，直接使用原生标签。
     不要使用原生 v-model（它绑定 value + 原生 input 事件），
     组件派发的是 wc-input / wc-change（detail.value）。 -->
<wc-input
  :value="username"
  placeholder="请输入用户名"
  clearable
  @wc-input="(e) => (username = e.detail.value)"
></wc-input>
```

## 示例

### 输入类型

<div class="demo-block">

<div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;">
      <wc-input style="width:200px" placeholder="文本（text）"></wc-input>
      <wc-input style="width:200px" type="password" placeholder="密码（password）"></wc-input>
      <wc-input style="width:200px" type="search" placeholder="搜索（search）"></wc-input>
      <wc-input style="width:200px" type="tel" placeholder="电话（tel）"></wc-input>
    </div>

</div>

<details><summary>查看代码</summary>

```html
<div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;">
  <wc-input style="width:200px" placeholder="文本（text）"></wc-input>
  <wc-input style="width:200px" type="password" placeholder="密码（password）"></wc-input>
  <wc-input style="width:200px" type="search" placeholder="搜索（search）"></wc-input>
  <wc-input style="width:200px" type="tel" placeholder="电话（tel）"></wc-input>
</div>
```

</details>

### 尺寸

<div class="demo-block">

<div style="display:flex;gap:12px;align-items:center;">
      <wc-input size="small" style="width:160px" placeholder="小号 small"></wc-input>
      <wc-input size="medium" style="width:160px" placeholder="中号 medium"></wc-input>
      <wc-input size="large" style="width:160px" placeholder="大号 large"></wc-input>
    </div>

</div>

<details><summary>查看代码</summary>

```html
<div style="display:flex;gap:12px;align-items:center;">
  <wc-input size="small" style="width:160px" placeholder="小号 small"></wc-input>
  <wc-input size="medium" style="width:160px" placeholder="中号 medium"></wc-input>
  <wc-input size="large" style="width:160px" placeholder="大号 large"></wc-input>
</div>
```

</details>

### 校验状态

<div class="demo-block">

<div style="display:flex;gap:12px;align-items:center;">
      <wc-input status="default" style="width:160px" placeholder="默认 default"></wc-input>
      <wc-input status="success" style="width:160px" placeholder="成功 success"></wc-input>
      <wc-input status="warning" style="width:160px" placeholder="警告 warning"></wc-input>
      <wc-input status="error" style="width:160px" placeholder="错误 error"></wc-input>
    </div>

</div>

<details><summary>查看代码</summary>

```html
<div style="display:flex;gap:12px;align-items:center;">
  <wc-input status="default" style="width:160px" placeholder="默认 default"></wc-input>
  <wc-input status="success" style="width:160px" placeholder="成功 success"></wc-input>
  <wc-input status="warning" style="width:160px" placeholder="警告 warning"></wc-input>
  <wc-input status="error" style="width:160px" placeholder="错误 error"></wc-input>
</div>
```

</details>

### 前缀与后缀

<div class="demo-block">

<div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;">
      <wc-input style="width:240px" placeholder="请输入搜索关键词" clearable>
        <wc-icon slot="prefix" name="search"></wc-icon>
      </wc-input>
      <wc-input style="width:240px" value="1000">
        <span slot="suffix">元</span>
      </wc-input>
    </div>

</div>

<details><summary>查看代码</summary>

```html
<div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;">
  <wc-input style="width:240px" placeholder="请输入搜索关键词" clearable>
    <wc-icon slot="prefix" name="search"></wc-icon>
  </wc-input>
  <wc-input style="width:240px" value="1000">
    <span slot="suffix">元</span>
  </wc-input>
</div>
```

</details>

### 清除与只读禁用

<div class="demo-block">

<div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;">
      <wc-input style="width:200px" value="可清除文本" clearable></wc-input>
      <wc-input style="width:200px" value="只读文本" readonly></wc-input>
      <wc-input style="width:200px" value="禁用文本" disabled></wc-input>
      <wc-input style="width:200px" maxlength="10" placeholder="最多 10 个字"></wc-input>
    </div>

</div>

<details><summary>查看代码</summary>

```html
<div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;">
  <wc-input style="width:200px" value="可清除文本" clearable></wc-input>
  <wc-input style="width:200px" value="只读文本" readonly></wc-input>
  <wc-input style="width:200px" value="禁用文本" disabled></wc-input>
  <wc-input style="width:200px" maxlength="10" placeholder="最多 10 个字"></wc-input>
</div>
```

</details>

## API

### 属性

| 属性          | attribute     | 类型                                             | 默认值      | 说明                                                  |
| ------------- | ------------- | ------------------------------------------------ | ----------- | ----------------------------------------------------- |
| `type`        | `type`        | `string`                                         | `'text'`    | 输入框类型（text/password/tel/url/search 等原生类型） |
| `size`        | `size`        | `'small' \| 'medium' \| 'large'`                 | `'medium'`  | 尺寸                                                  |
| `placeholder` | `placeholder` | `string`                                         | `''`        | 占位提示                                              |
| `label`       | `label`       | `string`                                         | `''`        | 无障碍标签（等价原生 aria-label）                     |
| `readonly`    | `readonly`    | `boolean`                                        | `false`     | 只读                                                  |
| `clearable`   | `clearable`   | `boolean`                                        | `false`     | 显示清除按钮（有值且非禁用/只读时）                   |
| `status`      | `status`      | `'default' \| 'success' \| 'warning' \| 'error'` | `'default'` | 校验状态（影响边框色）                                |

### 事件

| 事件        | 说明                                        |
| ----------- | ------------------------------------------- |
| `wc-input`  | 输入时触发，detail.value                    |
| `wc-change` | 值变更提交时触发（失焦/回车），detail.value |
| `wc-clear`  | 点击清除按钮后触发                          |

### 插槽

| 名称     | 说明                           |
| -------- | ------------------------------ |
| `prefix` | 前置内容（图标、文字等）       |
| `suffix` | 后置内容（清除按钮之外的区域） |

### CSS 变量

| 变量                | 说明       |
| ------------------- | ---------- |
| `--wc-input-height` | 输入框高度 |

### CSS Parts

`base` / `input` / `clear-button`
