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

:::: details 查看代码
::: code-group

```html [HTML]
<div style="display:flex;gap:12px;align-items:center;">
  <wc-button>默认</wc-button>
  <wc-button theme="primary">主要</wc-button>
  <wc-button theme="success">成功</wc-button>
  <wc-button theme="warning">警告</wc-button>
  <wc-button theme="danger">危险</wc-button>
</div>
```

```vue [Vue]
<template>
  <div style="display:flex;gap:12px;align-items:center;">
    <wc-button>默认</wc-button>
    <wc-button theme="primary">主要</wc-button>
    <wc-button theme="success">成功</wc-button>
    <wc-button theme="warning">警告</wc-button>
    <wc-button theme="danger">危险</wc-button>
  </div>
</template>
```

```tsx [React]
import { WcButton } from '@wc-kit/react';

<div style="display:flex;gap:12px;align-items:center;">
  <WcButton>默认</WcButton>
  <WcButton theme="primary">主要</WcButton>
  <WcButton theme="success">成功</WcButton>
  <WcButton theme="warning">警告</WcButton>
  <WcButton theme="danger">危险</WcButton>
</div>;
```

:::
::::

### 变体

<div class="demo-block">

<div style="display:flex;gap:12px;align-items:center;">
      <wc-button theme="primary" variant="base">base</wc-button>
      <wc-button theme="primary" variant="outline">outline</wc-button>
      <wc-button theme="primary" variant="text">text</wc-button>
      <wc-button theme="primary" variant="dashed">dashed</wc-button>
      <wc-button theme="primary" variant="link">link</wc-button>
    </div>

</div>

:::: details 查看代码
::: code-group

```html [HTML]
<div style="display:flex;gap:12px;align-items:center;">
  <wc-button theme="primary" variant="base">base</wc-button>
  <wc-button theme="primary" variant="outline">outline</wc-button>
  <wc-button theme="primary" variant="text">text</wc-button>
  <wc-button theme="primary" variant="dashed">dashed</wc-button>
  <wc-button theme="primary" variant="link">link</wc-button>
</div>
```

```vue [Vue]
<template>
  <div style="display:flex;gap:12px;align-items:center;">
    <wc-button theme="primary" variant="base">base</wc-button>
    <wc-button theme="primary" variant="outline">outline</wc-button>
    <wc-button theme="primary" variant="text">text</wc-button>
    <wc-button theme="primary" variant="dashed">dashed</wc-button>
    <wc-button theme="primary" variant="link">link</wc-button>
  </div>
</template>
```

```tsx [React]
import { WcButton } from '@wc-kit/react';

<div style="display:flex;gap:12px;align-items:center;">
  <WcButton theme="primary" variant="base">
    base
  </WcButton>
  <WcButton theme="primary" variant="outline">
    outline
  </WcButton>
  <WcButton theme="primary" variant="text">
    text
  </WcButton>
  <WcButton theme="primary" variant="dashed">
    dashed
  </WcButton>
  <WcButton theme="primary" variant="link">
    link
  </WcButton>
</div>;
```

:::
::::

### 尺寸

<div class="demo-block">

<div style="display:flex;gap:12px;align-items:center;">
      <wc-button size="small">小号</wc-button>
      <wc-button size="medium">中号</wc-button>
      <wc-button size="large">大号</wc-button>
    </div>

</div>

:::: details 查看代码
::: code-group

```html [HTML]
<div style="display:flex;gap:12px;align-items:center;">
  <wc-button size="small">小号</wc-button>
  <wc-button size="medium">中号</wc-button>
  <wc-button size="large">大号</wc-button>
</div>
```

```vue [Vue]
<template>
  <div style="display:flex;gap:12px;align-items:center;">
    <wc-button size="small">小号</wc-button>
    <wc-button size="medium">中号</wc-button>
    <wc-button size="large">大号</wc-button>
  </div>
</template>
```

```tsx [React]
import { WcButton } from '@wc-kit/react';

<div style="display:flex;gap:12px;align-items:center;">
  <WcButton size="small">小号</WcButton>
  <WcButton size="medium">中号</WcButton>
  <WcButton size="large">大号</WcButton>
</div>;
```

:::
::::

### 状态

<div class="demo-block">

<div style="display:flex;gap:12px;align-items:center;">
      <wc-button theme="primary" disabled>禁用</wc-button>
      <wc-button theme="primary" loading>加载中</wc-button>
    </div>
    <div style="margin-top:12px;">
      <wc-button theme="primary" block>块级按钮（block）</wc-button>
    </div>

</div>

:::: details 查看代码
::: code-group

```html [HTML]
<div style="display:flex;gap:12px;align-items:center;">
  <wc-button theme="primary" disabled>禁用</wc-button>
  <wc-button theme="primary" loading>加载中</wc-button>
</div>
<div style="margin-top:12px;">
  <wc-button theme="primary" block>块级按钮（block）</wc-button>
</div>
```

```vue [Vue]
<template>
  <div style="display:flex;gap:12px;align-items:center;">
    <wc-button theme="primary" disabled>禁用</wc-button>
    <wc-button theme="primary" loading>加载中</wc-button>
  </div>
  <div style="margin-top:12px;">
    <wc-button theme="primary" block>块级按钮（block）</wc-button>
  </div>
</template>
```

```tsx [React]
import { WcButton } from '@wc-kit/react';

<div style="display:flex;gap:12px;align-items:center;">
      <WcButton theme="primary" disabled>禁用</WcButton>
      <WcButton theme="primary" loading>加载中</WcButton>
    </div>
    <div style="margin-top:12px;">
      <WcButton theme="primary" block>块级按钮（block）</WcButton>
    </div>
```

:::
::::

### 图标按钮

图标走 `icon` 插槽；位置由 `icon-position` 控制（`start` 左 / `end` 右）。只有图标没有文案时自动收为正方形。

<div class="demo-block">

<div style="display:flex;gap:12px;align-items:center;">
      <wc-button><wc-icon name="search" slot="icon"></wc-icon>搜索</wc-button>
      <wc-button icon-position="end" theme="primary"><wc-icon name="arrow-right" slot="icon"></wc-icon>下一步</wc-button>
      <wc-button theme="primary"><wc-icon name="search" slot="icon"></wc-icon></wc-button>
      <wc-button theme="danger" variant="outline"><wc-icon name="close" slot="icon"></wc-icon></wc-button>
    </div>

</div>

:::: details 查看代码
::: code-group

```html [HTML]
<div style="display:flex;gap:12px;align-items:center;">
  <wc-button><wc-icon name="search" slot="icon"></wc-icon>搜索</wc-button>
  <wc-button icon-position="end" theme="primary"
    ><wc-icon name="arrow-right" slot="icon"></wc-icon>下一步</wc-button
  >
  <wc-button theme="primary"><wc-icon name="search" slot="icon"></wc-icon></wc-button>
  <wc-button theme="danger" variant="outline"
    ><wc-icon name="close" slot="icon"></wc-icon
  ></wc-button>
</div>
```

```vue [Vue]
<template>
  <div style="display:flex;gap:12px;align-items:center;">
    <wc-button><wc-icon name="search" slot="icon"></wc-icon>搜索</wc-button>
    <wc-button icon-position="end" theme="primary"
      ><wc-icon name="arrow-right" slot="icon"></wc-icon>下一步</wc-button
    >
    <wc-button theme="primary"><wc-icon name="search" slot="icon"></wc-icon></wc-button>
    <wc-button theme="danger" variant="outline"
      ><wc-icon name="close" slot="icon"></wc-icon
    ></wc-button>
  </div>
</template>
```

```tsx [React]
import { WcButton, WcIcon } from '@wc-kit/react';

<div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
  <WcButton>
    <WcIcon slot="icon" name="search" />
    搜索
  </WcButton>
  <WcButton iconPosition="end" theme="primary">
    <WcIcon slot="icon" name="arrow-right" />
    下一步
  </WcButton>
  <WcButton theme="primary">
    <WcIcon slot="icon" name="search" />
  </WcButton>
  <WcButton theme="danger" variant="outline">
    <WcIcon slot="icon" name="close" />
  </WcButton>
</div>;
```

:::
::::

### 按钮分组

`wc-button-group` 包裹多个按钮：中间按钮去圆角、相邻边框合并，首尾保留外侧圆角。

<div class="demo-block">

<div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;">
      <wc-button-group>
        <wc-button><wc-icon name="arrow-left" slot="icon"></wc-icon>上一步</wc-button>
        <wc-button>第 2 步</wc-button>
        <wc-button icon-position="end"><wc-icon name="arrow-right" slot="icon"></wc-icon>下一步</wc-button>
      </wc-button-group>
      <wc-button-group>
        <wc-button theme="primary">新建</wc-button>
        <wc-button theme="primary"><wc-icon name="chevron-down" slot="icon"></wc-icon></wc-button>
      </wc-button-group>
    </div>

</div>

:::: details 查看代码
::: code-group

```html [HTML]
<div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;">
  <wc-button-group>
    <wc-button><wc-icon name="arrow-left" slot="icon"></wc-icon>上一步</wc-button>
    <wc-button>第 2 步</wc-button>
    <wc-button icon-position="end"
      ><wc-icon name="arrow-right" slot="icon"></wc-icon>下一步</wc-button
    >
  </wc-button-group>
  <wc-button-group>
    <wc-button theme="primary">新建</wc-button>
    <wc-button theme="primary"><wc-icon name="chevron-down" slot="icon"></wc-icon></wc-button>
  </wc-button-group>
</div>
```

```vue [Vue]
<template>
  <div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;">
    <wc-button-group>
      <wc-button><wc-icon name="arrow-left" slot="icon"></wc-icon>上一步</wc-button>
      <wc-button>第 2 步</wc-button>
      <wc-button icon-position="end"
        ><wc-icon name="arrow-right" slot="icon"></wc-icon>下一步</wc-button
      >
    </wc-button-group>
    <wc-button-group>
      <wc-button theme="primary">新建</wc-button>
      <wc-button theme="primary"><wc-icon name="chevron-down" slot="icon"></wc-icon></wc-button>
    </wc-button-group>
  </div>
</template>
```

```tsx [React]
import { WcButton, WcButtonGroup, WcIcon } from '@wc-kit/react';

<div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
  <WcButtonGroup>
    <WcButton>
      <WcIcon slot="icon" name="arrow-left" />
      上一步
    </WcButton>
    <WcButton>第 2 步</WcButton>
    <WcButton iconPosition="end">
      <WcIcon slot="icon" name="arrow-right" />
      下一步
    </WcButton>
  </WcButtonGroup>
  <WcButtonGroup>
    <WcButton theme="primary">新建</WcButton>
    <WcButton theme="primary">
      <WcIcon slot="icon" name="chevron-down" />
    </WcButton>
  </WcButtonGroup>
</div>;
```

:::
::::

## API

### 属性

| 属性           | attribute       | 类型                                                           | 默认值      | 说明               |
| -------------- | --------------- | -------------------------------------------------------------- | ----------- | ------------------ |
| `theme`        | `theme`         | `'default' \| 'primary' \| 'success' \| 'warning' \| 'danger'` | `'default'` | 组件风格（语义色） |
| `variant`      | `variant`       | `'base' \| 'outline' \| 'dashed' \| 'text' \| 'link'`          | `'base'`    | 按钮形式           |
| `size`         | `size`          | `'small' \| 'medium' \| 'large'`                               | `'medium'`  | 尺寸               |
| `iconPosition` | `icon-position` | `'start' \| 'end'`                                             | `'start'`   | 图标位置：左 / 右  |
| `block`        | `block`         | `boolean`                                                      | `false`     | 是否为块级元素     |
| `disabled`     | `disabled`      | `boolean`                                                      | `false`     | 禁用状态           |
| `loading`      | `loading`       | `boolean`                                                      | `false`     | 加载状态           |

### 插槽

| 名称     | 说明                                |
| -------- | ----------------------------------- |
| （默认） | 按钮内容                            |
| `icon`   | 图标（位置由 `icon-position` 控制） |

### CSS 变量

| 变量                 | 说明     |
| -------------------- | -------- |
| `--wc-button-height` | 按钮高度 |

#### wc-button-group

| 变量                       | 说明                   |
| -------------------------- | ---------------------- |
| `--wc-button-group-radius` | 分组首尾按钮保留的圆角 |

### CSS Parts

`base`、`icon`、`content`

#### wc-button-group

`base`
