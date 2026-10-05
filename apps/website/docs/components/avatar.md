# Avatar 头像

头像组件。内容走默认插槽，放文字 / 图片 / 图标均可。

主要 API：`size` 尺寸（small / medium / large 三档预设，或任意 CSS 尺寸值如 "48px"、"3rem"，纯数字按 px 处理）、`shape` 形状（circle 圆形 / round 圆角矩形 / square 方形，默认 circle）。无自定义事件。自定义尺寸时也可直接覆写 CSS 变量 `--wc-avatar-size`。

React 用法（`@wc-kit/react` 包装组件）：

```tsx
import { WcAvatar } from '@wc-kit/react';

<WcAvatar>张</WcAvatar>
<WcAvatar size={48} shape="square">图</WcAvatar>
```

Vue 用法（`@wc-kit/vue` 为纯类型增强包，直接使用原生标签）：

```vue
<template>
  <wc-avatar>张</wc-avatar>
  <wc-avatar size="48" shape="square">图</wc-avatar>
</template>
```

## 示例

### 形状

<div class="demo-block">

<div style="display:flex;gap:12px;align-items:center;">
      <wc-avatar shape="circle">圆</wc-avatar>
      <wc-avatar shape="round">圆角</wc-avatar>
      <wc-avatar shape="square">方形</wc-avatar>
    </div>

</div>

:::: details 查看代码
::: code-group

```html [HTML]
<div style="display:flex;gap:12px;align-items:center;">
  <wc-avatar shape="circle">圆</wc-avatar>
  <wc-avatar shape="round">圆角</wc-avatar>
  <wc-avatar shape="square">方形</wc-avatar>
</div>
```

```vue [Vue]
<template>
  <div style="display:flex;gap:12px;align-items:center;">
    <wc-avatar shape="circle">圆</wc-avatar>
    <wc-avatar shape="round">圆角</wc-avatar>
    <wc-avatar shape="square">方形</wc-avatar>
  </div>
</template>
```

```tsx [React]
import { WcAvatar } from '@wc-kit/react';

<div style="display:flex;gap:12px;align-items:center;">
  <WcAvatar shape="circle">圆</WcAvatar>
  <WcAvatar shape="round">圆角</WcAvatar>
  <WcAvatar shape="square">方形</WcAvatar>
</div>;
```

:::
::::

### 尺寸

<div class="demo-block">

<div style="display:flex;gap:12px;align-items:center;">
      <wc-avatar size="small">小</wc-avatar>
      <wc-avatar size="medium">中</wc-avatar>
      <wc-avatar size="large">大</wc-avatar>
      <!-- 预设档位之外，接受任意 CSS 尺寸（纯数字按 px 处理） -->
      <wc-avatar size="48">48px</wc-avatar>
    </div>

</div>

:::: details 查看代码
::: code-group

```html [HTML]
<div style="display:flex;gap:12px;align-items:center;">
  <wc-avatar size="small">小</wc-avatar>
  <wc-avatar size="medium">中</wc-avatar>
  <wc-avatar size="large">大</wc-avatar>
  <!-- 预设档位之外，接受任意 CSS 尺寸（纯数字按 px 处理） -->
  <wc-avatar size="48">48px</wc-avatar>
</div>
```

```vue [Vue]
<template>
  <div style="display:flex;gap:12px;align-items:center;">
    <wc-avatar size="small">小</wc-avatar>
    <wc-avatar size="medium">中</wc-avatar>
    <wc-avatar size="large">大</wc-avatar>
    <!-- 预设档位之外，接受任意 CSS 尺寸（纯数字按 px 处理） -->
    <wc-avatar size="48">48px</wc-avatar>
  </div>
</template>
```

```tsx [React]
import { WcAvatar } from '@wc-kit/react';

<div style="display:flex;gap:12px;align-items:center;">
      <WcAvatar size="small">小</WcAvatar>
      <WcAvatar size="medium">中</WcAvatar>
      <WcAvatar size="large">大</WcAvatar>
      <!-- 预设档位之外，接受任意 CSS 尺寸（纯数字按 px 处理） -->
      <WcAvatar size={48}>48px</WcAvatar>
    </div>
```

:::
::::

### 内容类型

<div class="demo-block">
  <div style="display:flex;gap:12px;align-items:center;">
    <wc-avatar>文</wc-avatar>
    <!-- 图片：内联 SVG，避免演示依赖外部图片资源 -->
    <wc-avatar>
      <img
        src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='48'%20height='48'%3E%3Crect%20width='48'%20height='48'%20fill='%234b5563'/%3E%3Ctext%20x='24'%20y='31'%20font-size='20'%20fill='%23fff'%20text-anchor='middle'%3E%E5%9B%BE%3C/text%3E%3C/svg%3E"
        alt="头像"
        style="width:100%;height:100%;object-fit:cover;"
      />
    </wc-avatar>
    <wc-avatar><wc-icon name="plus"></wc-icon></wc-avatar>
  </div>
</div>

默认插槽可放文字、图片（铺满裁剪）或图标。

:::: details 查看代码
::: code-group

```html [HTML]
<div style="display:flex;gap:12px;align-items:center;">
  <wc-avatar>文</wc-avatar>
  <!-- 图片：内联 SVG，避免演示依赖外部图片资源 -->
  <wc-avatar>
    <img
      src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='48'%20height='48'%3E%3Crect%20width='48'%20height='48'%20fill='%234b5563'/%3E%3Ctext%20x='24'%20y='31'%20font-size='20'%20fill='%23fff'%20text-anchor='middle'%3E%E5%9B%BE%3C/text%3E%3C/svg%3E"
      alt="头像"
      style="width:100%;height:100%;object-fit:cover;"
    />
  </wc-avatar>
  <wc-avatar><wc-icon name="plus"></wc-icon></wc-avatar>
</div>
```

```vue [Vue]
<template>
  <div style="display:flex;gap:12px;align-items:center;">
    <wc-avatar>文</wc-avatar>
    <!-- 图片：内联 SVG，避免演示依赖外部图片资源 -->
    <wc-avatar>
      <img
        src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='48'%20height='48'%3E%3Crect%20width='48'%20height='48'%20fill='%234b5563'/%3E%3Ctext%20x='24'%20y='31'%20font-size='20'%20fill='%23fff'%20text-anchor='middle'%3E%E5%9B%BE%3C/text%3E%3C/svg%3E"
        alt="头像"
        style="width:100%;height:100%;object-fit:cover;"
      />
    </wc-avatar>
    <wc-avatar><wc-icon name="plus"></wc-icon></wc-avatar>
  </div>
</template>
```

```tsx [React]
import { WcAvatar, WcIcon } from '@wc-kit/react';

<div style="display:flex;gap:12px;align-items:center;">
  <WcAvatar>文</WcAvatar>
  <!-- 图片：内联 SVG，避免演示依赖外部图片资源 -->
  <WcAvatar>
    <img
      src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='48'%20height='48'%3E%3Crect%20width='48'%20height='48'%20fill='%234b5563'/%3E%3Ctext%20x='24'%20y='31'%20font-size='20'%20fill='%23fff'%20text-anchor='middle'%3E%E5%9B%BE%3C/text%3E%3C/svg%3E"
      alt="头像"
      style="width:100%;height:100%;object-fit:cover;"
    />
  </WcAvatar>
  <WcAvatar><WcIcon name="plus"></WcIcon></WcAvatar>
</div>
```

:::
::::

## API

### 属性

| 属性    | attribute | 类型                              | 默认值     | 说明                                       |
| ------- | --------- | --------------------------------- | ---------- | ------------------------------------------ |
| `size`  | `size`    | `wcAvatarSize \| string`          | `'medium'` | 尺寸：预设档位或 CSS 尺寸值（纯数字按 px） |
| `shape` | `shape`   | `'circle' \| 'round' \| 'square'` | `'circle'` | 形状                                       |

### 插槽

| 名称     | 说明     |
| -------- | -------- |
| （默认） | 头像内容 |

### CSS 变量

| 变量               | 说明                           |
| ------------------ | ------------------------------ |
| `--wc-avatar-size` | 自定义尺寸时也可直接覆写此变量 |

### CSS Parts

`base`
