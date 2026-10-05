# Collapse 折叠面板

将一组内容折叠收纳在标题下，点击标题展开/收起（参考 antd Collapse）：高度动画、手风琴模式、禁用面板、自定义标题。

React 用法（`@wc-kit/react` 包装组件）：

```tsx
import { WcCollapse, WcCollapseItem } from '@wc-kit/react';

<WcCollapse accordion onWcChange={(e) => console.log(e.detail)}>
  <WcCollapseItem header="标题一" name="a" open>
    内容一
  </WcCollapseItem>
  <WcCollapseItem header="标题二" name="b">
    内容二
  </WcCollapseItem>
</WcCollapse>;
```

Vue 用法（`@wc-kit/vue` 为纯类型增强包，直接使用原生标签）：

```vue
<template>
  <wc-collapse accordion @wc-change="onChange">
    <wc-collapse-item header="标题一" name="a" open>内容一</wc-collapse-item>
    <wc-collapse-item header="标题二" name="b">内容二</wc-collapse-item>
  </wc-collapse>
</template>
```

## 示例

### 基础用法

默认第一个面板展开；`open` 属性控制展开状态（可读写）。

<div class="demo-block">
  <wc-collapse style="max-width: 480px">
    <wc-collapse-item header="标题一" name="a" open>内容一：默认展开，点击标题收起</wc-collapse-item>
    <wc-collapse-item header="标题二" name="b">内容二：点击标题展开</wc-collapse-item>
    <wc-collapse-item header="标题三" name="c">内容三</wc-collapse-item>
  </wc-collapse>
</div>

:::: details 查看代码
::: code-group

```html [HTML]
<wc-collapse>
  <wc-collapse-item header="标题一" name="a" open>内容一：默认展开，点击标题收起</wc-collapse-item>
  <wc-collapse-item header="标题二" name="b">内容二：点击标题展开</wc-collapse-item>
  <wc-collapse-item header="标题三" name="c">内容三</wc-collapse-item>
</wc-collapse>
```

```vue [Vue]
<template>
  <wc-collapse>
    <wc-collapse-item header="标题一" name="a" open>内容一</wc-collapse-item>
    <wc-collapse-item header="标题二" name="b">内容二</wc-collapse-item>
    <wc-collapse-item header="标题三" name="c">内容三</wc-collapse-item>
  </wc-collapse>
</template>
```

```tsx [React]
import { WcCollapse, WcCollapseItem } from '@wc-kit/react';

<WcCollapse>
  <WcCollapseItem header="标题一" name="a" open>
    内容一
  </WcCollapseItem>
  <WcCollapseItem header="标题二" name="b">
    内容二
  </WcCollapseItem>
  <WcCollapseItem header="标题三" name="c">
    内容三
  </WcCollapseItem>
</WcCollapse>;
```

:::
::::

### 手风琴

`accordion` 属性：同一时间最多展开一个面板，展开新的自动收起其他。

<div class="demo-block">
  <wc-collapse accordion style="max-width: 480px">
    <wc-collapse-item header="手风琴一" name="ga">同一时间只展开一个</wc-collapse-item>
    <wc-collapse-item header="手风琴二" name="gb">展开我时上面的自动收起</wc-collapse-item>
  </wc-collapse>
</div>

:::: details 查看代码
::: code-group

```html [HTML]
<wc-collapse accordion>
  <wc-collapse-item header="手风琴一" name="ga">同一时间只展开一个</wc-collapse-item>
  <wc-collapse-item header="手风琴二" name="gb">展开我时上面的自动收起</wc-collapse-item>
</wc-collapse>
```

```vue [Vue]
<template>
  <wc-collapse accordion>
    <wc-collapse-item header="手风琴一" name="ga">同一时间只展开一个</wc-collapse-item>
    <wc-collapse-item header="手风琴二" name="gb">展开我时上面的自动收起</wc-collapse-item>
  </wc-collapse>
</template>
```

```tsx [React]
import { WcCollapse, WcCollapseItem } from '@wc-kit/react';

<WcCollapse accordion>
  <WcCollapseItem header="手风琴一" name="ga">
    同一时间只展开一个
  </WcCollapseItem>
  <WcCollapseItem header="手风琴二" name="gb">
    展开我时上面的自动收起
  </WcCollapseItem>
</WcCollapse>;
```

:::
::::

### 禁用面板

<div class="demo-block">
  <wc-collapse style="max-width: 480px">
    <wc-collapse-item header="正常面板">可以展开</wc-collapse-item>
    <wc-collapse-item header="禁用面板" disabled>不可展开</wc-collapse-item>
  </wc-collapse>
</div>

:::: details 查看代码
::: code-group

```html [HTML]
<wc-collapse>
  <wc-collapse-item header="正常面板">可以展开</wc-collapse-item>
  <wc-collapse-item header="禁用面板" disabled>不可展开</wc-collapse-item>
</wc-collapse>
```

```vue [Vue]
<template>
  <wc-collapse>
    <wc-collapse-item header="正常面板">可以展开</wc-collapse-item>
    <wc-collapse-item header="禁用面板" disabled>不可展开</wc-collapse-item>
  </wc-collapse>
</template>
```

```tsx [React]
import { WcCollapse, WcCollapseItem } from '@wc-kit/react';

<WcCollapse>
  <WcCollapseItem header="正常面板">可以展开</WcCollapseItem>
  <WcCollapseItem header="禁用面板" disabled>
    不可展开
  </WcCollapseItem>
</WcCollapse>;
```

:::
::::

### 自定义标题

`header` 插槽覆盖标题文案。

<div class="demo-block">
  <wc-collapse style="max-width: 480px">
    <wc-collapse-item name="custom">
      <span slot="header" style="color: var(--wc-color-primary); font-weight: 600;">彩色加粗标题</span>
      用 header 插槽放任意内容
    </wc-collapse-item>
  </wc-collapse>
</div>

:::: details 查看代码
::: code-group

```html [HTML]
<wc-collapse>
  <wc-collapse-item name="custom">
    <span slot="header" style="color: var(--wc-color-primary); font-weight: 600;"
      >彩色加粗标题</span
    >
    用 header 插槽放任意内容
  </wc-collapse-item>
</wc-collapse>
```

```vue [Vue]
<template>
  <wc-collapse>
    <wc-collapse-item name="custom">
      <template #header>
        <span style="color: var(--wc-color-primary); font-weight: 600">彩色加粗标题</span>
      </template>
      用 header 插槽放任意内容
    </wc-collapse-item>
  </wc-collapse>
</template>
```

```tsx [React]
import { WcCollapse, WcCollapseItem } from '@wc-kit/react';

<WcCollapse>
  <WcCollapseItem
    name="custom"
    header={<span style={{ color: 'var(--wc-color-primary)' }}>彩色加粗标题</span>}
  >
    用 header 插槽放任意内容
  </WcCollapseItem>
</WcCollapse>;
```

:::
::::

## API

### wc-collapse

| 属性        | 属性名      | 类型      | 默认值  | 说明                                 |
| ----------- | ----------- | --------- | ------- | ------------------------------------ |
| `accordion` | `accordion` | `boolean` | `false` | 手风琴模式：同一时间最多展开一个面板 |

### wc-collapse-item

| 属性       | 属性名     | 类型      | 默认值  | 说明                                       |
| ---------- | ---------- | --------- | ------- | ------------------------------------------ |
| `header`   | `header`   | `string`  | `''`    | 标题文案（可用 header 插槽覆盖）           |
| `name`     | `name`     | `string`  | `''`    | 面板标识，随 wc-change 的 detail.name 抛出 |
| `open`     | `open`     | `boolean` | `false` | 是否展开（可读写，点击标题自动切换）       |
| `disabled` | `disabled` | `boolean` | `false` | 禁用面板                                   |

### 事件

| 事件        | 说明                                                                   | detail           |
| ----------- | ---------------------------------------------------------------------- | ---------------- |
| `wc-change` | 面板展开/收起后触发（bubbles + composed，可在 wc-collapse 上统一监听） | `{ name, open }` |

### 插槽（wc-collapse-item）

| 名称     | 说明                           |
| -------- | ------------------------------ |
| （默认） | 面板内容                       |
| `header` | 自定义标题（覆盖 header 属性） |

### CSS Parts（wc-collapse-item）

`item` / `header` / `content`

### CSS 变量（wc-collapse）

| 变量                   | 说明                                 |
| ---------------------- | ------------------------------------ |
| `--wc-collapse-border` | 容器边框色（默认 --wc-color-border） |
| `--wc-collapse-radius` | 容器圆角（默认 --wc-radius-medium）  |
