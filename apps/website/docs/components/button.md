# Button 按钮

按钮组件。内容走默认插槽，前置图标走 icon 插槽；点击为原生 click 事件（无自定义事件）。

## 示例

### 主题色

<div class="demo-block">

<div style="display:flex;gap:12px;align-items:center;">
      <wc-button>默认</wc-button>
      <wc-button theme="primary">主要</wc-button>
      <wc-button theme="success">成功</wc-button>
      <wc-button theme="warning">警告</wc-button>
      <wc-button theme="danger">危险</wc-button>
    </div>

</div>

<details><summary>查看代码</summary>

```html
<div style="display:flex;gap:12px;align-items:center;">
  <wc-button>默认</wc-button>
  <wc-button theme="primary">主要</wc-button>
  <wc-button theme="success">成功</wc-button>
  <wc-button theme="warning">警告</wc-button>
  <wc-button theme="danger">危险</wc-button>
</div>
```

</details>

### 变体

<div class="demo-block">

<div style="display:flex;gap:12px;align-items:center;">
      <wc-button theme="primary" type="base">base</wc-button>
      <wc-button theme="primary" type="outline">outline</wc-button>
      <wc-button theme="primary" type="text">text</wc-button>
      <wc-button theme="primary" type="dashed">dashed</wc-button>
      <wc-button theme="primary" type="link">link</wc-button>
    </div>

</div>

<details><summary>查看代码</summary>

```html
<div style="display:flex;gap:12px;align-items:center;">
  <wc-button theme="primary" type="base">base</wc-button>
  <wc-button theme="primary" type="outline">outline</wc-button>
  <wc-button theme="primary" type="text">text</wc-button>
  <wc-button theme="primary" type="dashed">dashed</wc-button>
  <wc-button theme="primary" type="link">link</wc-button>
</div>
```

</details>

### 尺寸

<div class="demo-block">

<div style="display:flex;gap:12px;align-items:center;">
      <wc-button size="small">小号</wc-button>
      <wc-button size="medium">中号</wc-button>
      <wc-button size="large">大号</wc-button>
    </div>

</div>

<details><summary>查看代码</summary>

```html
<div style="display:flex;gap:12px;align-items:center;">
  <wc-button size="small">小号</wc-button>
  <wc-button size="medium">中号</wc-button>
  <wc-button size="large">大号</wc-button>
</div>
```

</details>

### 状态

<div class="demo-block">

<div style="display:flex;gap:12px;align-items:center;">
      <wc-button theme="primary" disabled>禁用</wc-button>
      <wc-button theme="primary" loading>加载中</wc-button>
      <wc-button theme="success" loading>加载中（spinner 替换图标）</wc-button>
    </div>
    <div style="margin-top:12px;">
      <wc-button theme="primary" block>块级按钮（block）</wc-button>
    </div>

</div>

<details><summary>查看代码</summary>

```html
<div style="display:flex;gap:12px;align-items:center;">
  <wc-button theme="primary" disabled>禁用</wc-button>
  <wc-button theme="primary" loading>加载中</wc-button>
  <wc-button theme="success" loading>加载中（spinner 替换图标）</wc-button>
</div>
<div style="margin-top:12px;">
  <wc-button theme="primary" block>块级按钮（block）</wc-button>
</div>
```

</details>

### 幽灵按钮

<div class="demo-block">

<div
      style="display:flex;gap:12px;align-items:center;padding:16px;background:var(--wc-color-gray-900, #1f2329);border-radius:8px;"
    >
      <wc-button ghost theme="primary">幽灵主要</wc-button>
      <wc-button ghost type="dashed" theme="success">幽灵虚线</wc-button>
      <wc-button ghost theme="warning">幽灵警告</wc-button>
      <wc-button ghost theme="danger">幽灵危险</wc-button>
    </div>

</div>

<details><summary>查看代码</summary>

```html
<div
  style="display:flex;gap:12px;align-items:center;padding:16px;background:var(--wc-color-gray-900, #1f2329);border-radius:8px;"
>
  <wc-button ghost theme="primary">幽灵主要</wc-button>
  <wc-button ghost type="dashed" theme="success">幽灵虚线</wc-button>
  <wc-button ghost theme="warning">幽灵警告</wc-button>
  <wc-button ghost theme="danger">幽灵危险</wc-button>
</div>
```

</details>

### 渐变按钮

<div class="demo-block">

<div style="display:flex;gap:12px;align-items:center;">
      <wc-button gradient theme="primary">渐变主要</wc-button>
      <wc-button gradient theme="success">渐变成功</wc-button>
      <wc-button gradient theme="danger">渐变危险</wc-button>
    </div>

</div>

<details><summary>查看代码</summary>

```html
<div style="display:flex;gap:12px;align-items:center;">
  <wc-button gradient theme="primary">渐变主要</wc-button>
  <wc-button gradient theme="success">渐变成功</wc-button>
  <wc-button gradient theme="danger">渐变危险</wc-button>
</div>
```

</details>

### 点击波纹

<div class="demo-block">

<div style="display:flex;gap:12px;align-items:center;">
      <wc-button ripple theme="primary">实色波纹</wc-button>
      <wc-button ripple>描边波纹</wc-button>
      <wc-button ripple type="outline" theme="danger">危险描边波纹</wc-button>
    </div>

</div>

<details><summary>查看代码</summary>

```html
<div style="display:flex;gap:12px;align-items:center;">
  <wc-button ripple theme="primary">实色波纹</wc-button>
  <wc-button ripple>描边波纹</wc-button>
  <wc-button ripple type="outline" theme="danger">危险描边波纹</wc-button>
</div>
```

</details>

## API

### 属性

| 属性       | attribute  | 类型                                                           | 默认值      | 说明                                                                                  |
| ---------- | ---------- | -------------------------------------------------------------- | ----------- | ------------------------------------------------------------------------------------- |
| `theme`    | `theme`    | `'default' \| 'primary' \| 'success' \| 'warning' \| 'danger'` | `'default'` | 组件风格（语义色）                                                                    |
| `type`     | `type`     | `'base' \| 'outline' \| 'dashed' \| 'text' \| 'link'`          | `'base'`    | 按钮形式                                                                              |
| `size`     | `size`     | `'small' \| 'medium' \| 'large'`                               | `'medium'`  | 尺寸                                                                                  |
| `position` | `position` | `'start' \| 'end'`                                             | `'start'`   | 图标位置：start 左 / end 右                                                           |
| `block`    | `block`    | `boolean`                                                      | `false`     | 是否为块级元素                                                                        |
| `disabled` | `disabled` | `boolean`                                                      | `false`     | 禁用状态                                                                              |
| `loading`  | `loading`  | `boolean`                                                      | `false`     | 加载状态                                                                              |
| `ghost`    | `ghost`    | `boolean`                                                      | `false`     | 幽灵模式：透明底 + 主题色边框/文字（用于深色背景；outline/dashed 悬停改为半透明淡底） |
| `gradient` | `gradient` | `boolean`                                                      | `false`     | 渐变底：实色按钮改为主题色线性渐变（仅 base 变体且非 default 主题生效）               |
| `ripple`   | `ripple`   | `boolean`                                                      | `false`     | 点击波纹效果                                                                          |

### 插槽

| 名称     | 说明                                                    |
| -------- | ------------------------------------------------------- |
| （默认） | 按钮内容                                                |
| `icon`   | 图标（位置由 position 控制；loading 时被 spinner 替换） |

### CSS 变量

| 变量                          | 说明                                     |
| ----------------------------- | ---------------------------------------- |
| `--wc-button-height`          | 按钮高度                                 |
| `--wc-button-ghost-hover-bg`  | ghost 模式悬停淡底色                     |
| `--wc-button-ripple-color`    | 波纹颜色（默认 currentColor 45% 透明度） |
| `--wc-button-ripple-duration` | 波纹扩散时长（默认 600ms）               |

### CSS Parts

`base` / `icon` / `content`
