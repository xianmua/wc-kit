# Dropdown 下拉菜单

下拉菜单。触发元素放 `slot="trigger"`，菜单项用 `wc-dropdown-item` 作为默认子元素。事件：wc-open / wc-close（detail.reason）/ wc-select（detail.value、detail.label）。

## 示例

### 菜单项形态

<div class="demo-block">

<div style="display:flex;gap:24px;align-items:center;">
      <wc-dropdown>
        <wc-button slot="trigger">常规菜单</wc-button>
        <wc-dropdown-item value="a">常规项</wc-dropdown-item>
        <wc-dropdown-item value="b" disabled>禁用项</wc-dropdown-item>
        <wc-dropdown-item divider></wc-dropdown-item>
        <wc-dropdown-item value="c" danger>危险项</wc-dropdown-item>
      </wc-dropdown>
      <wc-dropdown placement="bottom-end">
        <wc-button slot="trigger">右对齐弹出</wc-button>
        <wc-dropdown-item value="a">菜单项一</wc-dropdown-item>
        <wc-dropdown-item value="b">菜单项二</wc-dropdown-item>
      </wc-dropdown>
    </div>

</div>

<details><summary>查看代码</summary>

```html
<div style="display:flex;gap:24px;align-items:center;">
  <wc-dropdown>
    <wc-button slot="trigger">常规菜单</wc-button>
    <wc-dropdown-item value="a">常规项</wc-dropdown-item>
    <wc-dropdown-item value="b" disabled>禁用项</wc-dropdown-item>
    <wc-dropdown-item divider></wc-dropdown-item>
    <wc-dropdown-item value="c" danger>危险项</wc-dropdown-item>
  </wc-dropdown>
  <wc-dropdown placement="bottom-end">
    <wc-button slot="trigger">右对齐弹出</wc-button>
    <wc-dropdown-item value="a">菜单项一</wc-dropdown-item>
    <wc-dropdown-item value="b">菜单项二</wc-dropdown-item>
  </wc-dropdown>
</div>
```

</details>

### 按钮触发

<div class="demo-block">

<div style="display:flex;gap:24px;align-items:center;">
      <wc-dropdown>
        <wc-button slot="trigger" theme="primary" icon-position="end"
          >主要下拉<wc-icon name="chevron-down" slot="icon"></wc-icon
        ></wc-button>
        <wc-dropdown-item value="a">菜单一</wc-dropdown-item>
        <wc-dropdown-item value="b">菜单二</wc-dropdown-item>
      </wc-dropdown>
      <wc-dropdown>
        <wc-button slot="trigger" disabled>禁用下拉</wc-button>
        <wc-dropdown-item value="a">菜单一</wc-dropdown-item>
      </wc-dropdown>
    </div>

</div>

<details><summary>查看代码</summary>

```html
<div style="display:flex;gap:24px;align-items:center;">
  <wc-dropdown>
    <wc-button slot="trigger" theme="primary" icon-position="end"
      >主要下拉<wc-icon name="chevron-down" slot="icon"></wc-icon
    ></wc-button>
    <wc-dropdown-item value="a">菜单一</wc-dropdown-item>
    <wc-dropdown-item value="b">菜单二</wc-dropdown-item>
  </wc-dropdown>
  <wc-dropdown>
    <wc-button slot="trigger" disabled>禁用下拉</wc-button>
    <wc-dropdown-item value="a">菜单一</wc-dropdown-item>
  </wc-dropdown>
</div>
```

</details>

## API

### 属性

| 属性        | attribute   | 类型          | 默认值           | 说明                             |
| ----------- | ----------- | ------------- | ---------------- | -------------------------------- |
| `placement` | `placement` | `WcPlacement` | `'bottom-start'` | 期望弹出方向（空间不足自动翻转） |
| `open`      | `open`      | `boolean`     | `false`          | 当前是否打开                     |
| `disabled`  | `disabled`  | `boolean`     | `false`          | 禁用（触发器不响应点击/键盘）    |

### 事件

| 事件        | 说明                                                    |
| ----------- | ------------------------------------------------------- |
| `wc-open`   | 菜单展开                                                |
| `wc-close`  | 菜单关闭，detail.reason: 'outside'                      | 'escape' | 'select' | 'toggle' |
| `wc-select` | 选中菜单项，detail.value / detail.label（之后自动关闭） |

### 方法

| 方法             | 说明                   |
| ---------------- | ---------------------- |
| `show(): void`   | 打开菜单               |
| `hide(): void`   | 关闭菜单（不派发事件） |
| `toggle(): void` | 切换开合               |

### 插槽

| 名称      | 说明                       |
| --------- | -------------------------- |
| `trigger` | 触发元素                   |
| （默认）  | 菜单项（wc-dropdown-item） |

### CSS 变量

| 变量                       | 说明                       |
| -------------------------- | -------------------------- |
| `--wc-dropdown-min-width`  | 面板最小宽度（默认 120px） |
| `--wc-dropdown-max-height` | 面板最大高度（默认 280px） |

### CSS Parts

`trigger` / `base`
