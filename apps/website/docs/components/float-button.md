# FloatButton 悬浮按钮

悬浮按钮：固定在视口右下角（可用 --wc-float-button-bottom/right 调整位置）。

## 示例

### 类型与形状

<div class="demo-block">

<div style="display:flex;gap:24px;align-items:center;">
      <wc-float-button style="position:static" icon="plus"></wc-float-button>
      <wc-float-button style="position:static" icon="plus" type="primary"></wc-float-button>
      <wc-float-button style="position:static" icon="check" shape="square"></wc-float-button>
      <wc-float-button
        style="position:static"
        icon="info"
        shape="square"
        text="说明"
      ></wc-float-button>
    </div>

</div>

<details><summary>查看代码</summary>

```html
<div style="display:flex;gap:24px;align-items:center;">
  <wc-float-button style="position:static" icon="plus"></wc-float-button>
  <wc-float-button style="position:static" icon="plus" type="primary"></wc-float-button>
  <wc-float-button style="position:static" icon="check" shape="square"></wc-float-button>
  <wc-float-button style="position:static" icon="info" shape="square" text="说明"></wc-float-button>
</div>
```

</details>

### 徽标与禁用

<div class="demo-block">

<div style="display:flex;gap:24px;align-items:center;">
      <wc-float-button style="position:static" icon="info" dot></wc-float-button>
      <wc-float-button style="position:static" icon="info" count="8"></wc-float-button>
      <wc-float-button style="position:static" icon="info" count="120"></wc-float-button>
      <wc-float-button style="position:static" icon="plus" disabled></wc-float-button>
    </div>

</div>

<details><summary>查看代码</summary>

```html
<div style="display:flex;gap:24px;align-items:center;">
  <wc-float-button style="position:static" icon="info" dot></wc-float-button>
  <wc-float-button style="position:static" icon="info" count="8"></wc-float-button>
  <wc-float-button style="position:static" icon="info" count="120"></wc-float-button>
  <wc-float-button style="position:static" icon="plus" disabled></wc-float-button>
</div>
```

</details>

### 链接按钮

<div class="demo-block">

<wc-float-button style="position:static" icon="search" href="https://example.com"></wc-float-button>

</div>

<details><summary>查看代码</summary>

```html
<wc-float-button style="position:static" icon="search" href="https://example.com"></wc-float-button>
```

</details>

### 组合按钮

<div class="demo-block">

<div style="position:relative;height:220px;background:var(--wc-color-bg-layout, #f5f5f5);">
      <wc-float-button-group
        trigger="click"
        style="position:absolute;right:24px;bottom:24px;"
      >
        <wc-float-button icon="search" tooltip="搜索"></wc-float-button>
        <wc-float-button icon="upload" tooltip="上传"></wc-float-button>
        <wc-float-button icon="file" tooltip="文件" type="primary"></wc-float-button>
      </wc-float-button-group>
      <wc-float-button-group shape="square" style="position:absolute;right:96px;bottom:24px;">
        <wc-float-button icon="plus"></wc-float-button>
        <wc-float-button icon="edit"></wc-float-button>
      </wc-float-button-group>
    </div>

</div>

<details><summary>查看代码</summary>

```html
<div style="position:relative;height:220px;background:var(--wc-color-bg-layout, #f5f5f5);">
  <wc-float-button-group trigger="click" style="position:absolute;right:24px;bottom:24px;">
    <wc-float-button icon="search" tooltip="搜索"></wc-float-button>
    <wc-float-button icon="upload" tooltip="上传"></wc-float-button>
    <wc-float-button icon="file" tooltip="文件" type="primary"></wc-float-button>
  </wc-float-button-group>
  <wc-float-button-group shape="square" style="position:absolute;right:96px;bottom:24px;">
    <wc-float-button icon="plus"></wc-float-button>
    <wc-float-button icon="edit"></wc-float-button>
  </wc-float-button-group>
</div>
```

</details>

### 回到顶部

<div class="demo-block">

<div>
      <p style="margin-bottom:12px;">
        滚动本页超过 400px 后，右下角出现「回到顶部」按钮，点击平滑滚回顶部。
      </p>
      <wc-float-button backtop></wc-float-button>
    </div>

</div>

<details><summary>查看代码</summary>

```html
<div>
  <p style="margin-bottom:12px;">
    滚动本页超过 400px 后，右下角出现「回到顶部」按钮，点击平滑滚回顶部。
  </p>
  <wc-float-button backtop></wc-float-button>
</div>
```

</details>

## API

### 属性

| 属性        | attribute   | 类型                     | 默认值      | 说明                                            |
| ----------- | ----------- | ------------------------ | ----------- | ----------------------------------------------- |
| `shape`     | `shape`     | `'circle' \| 'square'`   | `'circle'`  | 形状                                            |
| `type`      | `type`      | `'default' \| 'primary'` | `'default'` | 类型：default 白底 / primary 主题色底           |
| `icon`      | `icon`      | `string`                 | `''`        | 图标名称（内置图标库）                          |
| `text`      | `text`      | `string`                 | `''`        | 文字描述（square 形状下显示在图标下方）         |
| `tooltip`   | `tooltip`   | `string`                 | `''`        | 悬浮提示内容（backtop 时缺省为「回到顶部」）    |
| `href`      | `href`      | `string`                 | `''`        | 链接地址（有值渲染 `<a>`，否则渲染 `<button>`） |
| `target`    | `target`    | `string`                 | `''`        | 链接打开方式（仅 href 存在时生效）              |
| `disabled`  | `disabled`  | `boolean`                | `false`     | 禁用                                            |
| `dot`       | `dot`       | `boolean`                | `false`     | 右上角红点（忽略 count，恒显示）                |
| `count`     | `count`     | `number`                 | `0`         | 右上角徽标数字（<= 0 隐藏）                     |
| `max`       | `max`       | `number`                 | `99`        | 徽标数字上限，超出显示「max+」                  |
| `backtop`   | `backtop`   | `boolean`                | `false`     | 回到顶部预设                                    |
| `threshold` | `threshold` | `number`                 | `400`       | 回到顶部：滚动超过该距离（px）才显示            |

### 插槽

| 名称     | 说明                       |
| -------- | -------------------------- |
| `icon`   | 图标（覆盖 icon 属性）     |
| （默认） | 文字描述（覆盖 text 属性） |

### CSS 变量

| 变量                       | 说明                        |
| -------------------------- | --------------------------- |
| `--wc-float-button-bottom` | 距视口底部距离（默认 24px） |
| `--wc-float-button-right`  | 距视口右侧距离（默认 24px） |
| `--wc-float-button-size`   | 按钮尺寸（默认 40px）       |

### CSS Parts

`base` / `badge`
