# SplitButton 组合按钮

组合按钮：主操作 + 下拉箭头。主按钮派发 wc-main-click，箭头派发 wc-arrow-click 并展开下拉。菜单项用 wc-dropdown-item 作为默认子元素传入（自动进入下拉面板）。

## 示例

### 组合形态

<div class="demo-block">

<div style="display:flex;gap:24px;align-items:center;">
      <wc-split-button theme="primary">主要</wc-split-button>
      <wc-split-button theme="default">默认</wc-split-button>
      <wc-split-button theme="primary" type="outline">描边</wc-split-button>
      <wc-split-button theme="primary" size="small">小号</wc-split-button>
      <wc-split-button theme="primary" disabled>禁用</wc-split-button>
    </div>

</div>

<details><summary>查看代码</summary>

```html
<div style="display:flex;gap:24px;align-items:center;">
  <wc-split-button theme="primary">主要</wc-split-button>
  <wc-split-button theme="default">默认</wc-split-button>
  <wc-split-button theme="primary" type="outline">描边</wc-split-button>
  <wc-split-button theme="primary" size="small">小号</wc-split-button>
  <wc-split-button theme="primary" disabled>禁用</wc-split-button>
</div>
```

</details>

## API

### 属性

| 属性        | attribute   | 类型                                                           | 默认值         | 说明                       |
| ----------- | ----------- | -------------------------------------------------------------- | -------------- | -------------------------- |
| `theme`     | `theme`     | `'default' \| 'primary' \| 'success' \| 'warning' \| 'danger'` | `'default'`    | 按钮风格（透传两枚按钮）   |
| `type`      | `type`      | `'base' \| 'outline' \| 'dashed' \| 'text' \| 'link'`          | `'base'`       | 按钮形式（透传两枚按钮）   |
| `size`      | `size`      | `'small' \| 'medium' \| 'large'`                               | `'medium'`     | 尺寸（透传两枚按钮）       |
| `placement` | `placement` | `WcPlacement`                                                  | `'bottom-end'` | 下拉弹出方向               |
| `disabled`  | `disabled`  | `boolean`                                                      | `false`        | 禁用（透传两枚按钮与下拉） |
| `loading`   | `loading`   | `boolean`                                                      | `false`        | 加载中（透传两枚按钮）     |
| `ghost`     | `ghost`     | `boolean`                                                      | `false`        | 幽灵模式（透传两枚按钮）   |
| `gradient`  | `gradient`  | `boolean`                                                      | `false`        | 渐变底（透传两枚按钮）     |
| `ripple`    | `ripple`    | `boolean`                                                      | `false`        | 点击波纹（透传两枚按钮）   |

### 事件

| 事件             | 说明                         |
| ---------------- | ---------------------------- |
| `wc-main-click`  | 点击主按钮                   |
| `wc-arrow-click` | 点击下拉箭头（菜单随之开合） |

### 插槽

| 名称                                             | 说明       |
| ------------------------------------------------ | ---------- |
| （默认）                                         | 主按钮文案 |
| `-（wc-dropdown-item 菜单项，自动进入下拉面板）` | —          |

### CSS 变量

| 变量                       | 说明           |
| -------------------------- | -------------- |
| `--wc-split-button-radius` | 两端保留的圆角 |

### CSS Parts

`base`
