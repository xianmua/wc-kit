# Layout 布局

布局组件：`wc-row` 为行容器（flex 布局），`wc-col` 为列容器，配合实现 24 栅格。

wc-row 主要 API：`gutter` 栅格间距（px，列间距，wrap 换行时也作为行间距）、`justify` 水平对齐（start / center / end / space-between / space-around / space-evenly）、`align` 垂直对齐（top / middle / bottom / stretch）、`wrap` 允许换行。

wc-col 主要 API：`span` 占据列数（1~24，默认 24）、`offset` 左侧偏移列数（1~23，默认 0）。wc-col 的宿主以 display:contents 参与行布局，内容走默认插槽。无自定义事件。

React 用法（`@wc-kit/react` 包装组件）：

```tsx
import { WcCol, WcRow } from '@wc-kit/react';

<WcRow gutter={16}>
  <WcCol span={12}>col-12</WcCol>
  <WcCol span={12}>col-12</WcCol>
</WcRow>;
```

Vue 用法（`@wc-kit/vue` 为纯类型增强包，直接使用原生标签）：

```vue
<template>
  <wc-row :gutter="16">
    <wc-col :span="12">col-12</wc-col>
    <wc-col :span="12">col-12</wc-col>
  </wc-row>
</template>
```

## 示例

### 基础栅格

<div class="demo-block">
  <div style="display:flex;flex-direction:column;gap:8px;">
    <wc-row gutter="8">
      <wc-col span="24">
        <div style="background:var(--wc-color-primary);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;">span-24</div>
      </wc-col>
    </wc-row>
    <wc-row gutter="8">
      <wc-col span="12">
        <div style="background:var(--wc-color-primary);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;">span-12</div>
      </wc-col>
      <wc-col span="12">
        <div style="background:var(--wc-color-success);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;">span-12</div>
      </wc-col>
    </wc-row>
    <wc-row gutter="8">
      <wc-col span="8">
        <div style="background:var(--wc-color-primary);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;">span-8</div>
      </wc-col>
      <wc-col span="8">
        <div style="background:var(--wc-color-success);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;">span-8</div>
      </wc-col>
      <wc-col span="8">
        <div style="background:var(--wc-color-warning);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;">span-8</div>
      </wc-col>
    </wc-row>
    <wc-row gutter="8">
      <wc-col span="6">
        <div style="background:var(--wc-color-primary);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;">span-6</div>
      </wc-col>
      <wc-col span="6">
        <div style="background:var(--wc-color-success);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;">span-6</div>
      </wc-col>
      <wc-col span="6">
        <div style="background:var(--wc-color-warning);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;">span-6</div>
      </wc-col>
      <wc-col span="6">
        <div style="background:var(--wc-color-danger);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;">span-6</div>
      </wc-col>
    </wc-row>
  </div>
</div>

24 栅格系统：span 相加不超过 24 即可排成一行。

:::: details 查看代码
::: code-group

```html [HTML]
<div style="display:flex;flex-direction:column;gap:8px;">
  <wc-row gutter="8">
    <wc-col span="24">
      <div
        style="background:var(--wc-color-primary);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;"
      >
        span-24
      </div>
    </wc-col>
  </wc-row>
  <wc-row gutter="8">
    <wc-col span="12">
      <div
        style="background:var(--wc-color-primary);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;"
      >
        span-12
      </div>
    </wc-col>
    <wc-col span="12">
      <div
        style="background:var(--wc-color-success);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;"
      >
        span-12
      </div>
    </wc-col>
  </wc-row>
  <wc-row gutter="8">
    <wc-col span="8">
      <div
        style="background:var(--wc-color-primary);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;"
      >
        span-8
      </div>
    </wc-col>
    <wc-col span="8">
      <div
        style="background:var(--wc-color-success);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;"
      >
        span-8
      </div>
    </wc-col>
    <wc-col span="8">
      <div
        style="background:var(--wc-color-warning);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;"
      >
        span-8
      </div>
    </wc-col>
  </wc-row>
  <wc-row gutter="8">
    <wc-col span="6">
      <div
        style="background:var(--wc-color-primary);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;"
      >
        span-6
      </div>
    </wc-col>
    <wc-col span="6">
      <div
        style="background:var(--wc-color-success);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;"
      >
        span-6
      </div>
    </wc-col>
    <wc-col span="6">
      <div
        style="background:var(--wc-color-warning);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;"
      >
        span-6
      </div>
    </wc-col>
    <wc-col span="6">
      <div
        style="background:var(--wc-color-danger);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;"
      >
        span-6
      </div>
    </wc-col>
  </wc-row>
</div>
```

```vue [Vue]
<template>
  <div style="display:flex;flex-direction:column;gap:8px;">
    <wc-row gutter="8">
      <wc-col span="24">
        <div
          style="background:var(--wc-color-primary);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;"
        >
          span-24
        </div>
      </wc-col>
    </wc-row>
    <wc-row gutter="8">
      <wc-col span="12">
        <div
          style="background:var(--wc-color-primary);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;"
        >
          span-12
        </div>
      </wc-col>
      <wc-col span="12">
        <div
          style="background:var(--wc-color-success);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;"
        >
          span-12
        </div>
      </wc-col>
    </wc-row>
    <wc-row gutter="8">
      <wc-col span="8">
        <div
          style="background:var(--wc-color-primary);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;"
        >
          span-8
        </div>
      </wc-col>
      <wc-col span="8">
        <div
          style="background:var(--wc-color-success);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;"
        >
          span-8
        </div>
      </wc-col>
      <wc-col span="8">
        <div
          style="background:var(--wc-color-warning);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;"
        >
          span-8
        </div>
      </wc-col>
    </wc-row>
    <wc-row gutter="8">
      <wc-col span="6">
        <div
          style="background:var(--wc-color-primary);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;"
        >
          span-6
        </div>
      </wc-col>
      <wc-col span="6">
        <div
          style="background:var(--wc-color-success);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;"
        >
          span-6
        </div>
      </wc-col>
      <wc-col span="6">
        <div
          style="background:var(--wc-color-warning);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;"
        >
          span-6
        </div>
      </wc-col>
      <wc-col span="6">
        <div
          style="background:var(--wc-color-danger);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;"
        >
          span-6
        </div>
      </wc-col>
    </wc-row>
  </div>
</template>
```

```tsx [React]
import { WcCol, WcRow } from '@wc-kit/react';

<div style="display:flex;flex-direction:column;gap:8px;">
  <WcRow gutter={8}>
    <WcCol span={24}>
      <div style="background:var(--wc-color-primary);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;">
        span-24
      </div>
    </WcCol>
  </WcRow>
  <WcRow gutter={8}>
    <WcCol span={12}>
      <div style="background:var(--wc-color-primary);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;">
        span-12
      </div>
    </WcCol>
    <WcCol span={12}>
      <div style="background:var(--wc-color-success);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;">
        span-12
      </div>
    </WcCol>
  </WcRow>
  <WcRow gutter={8}>
    <WcCol span={8}>
      <div style="background:var(--wc-color-primary);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;">
        span-8
      </div>
    </WcCol>
    <WcCol span={8}>
      <div style="background:var(--wc-color-success);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;">
        span-8
      </div>
    </WcCol>
    <WcCol span={8}>
      <div style="background:var(--wc-color-warning);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;">
        span-8
      </div>
    </WcCol>
  </WcRow>
  <WcRow gutter={8}>
    <WcCol span={6}>
      <div style="background:var(--wc-color-primary);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;">
        span-6
      </div>
    </WcCol>
    <WcCol span={6}>
      <div style="background:var(--wc-color-success);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;">
        span-6
      </div>
    </WcCol>
    <WcCol span={6}>
      <div style="background:var(--wc-color-warning);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;">
        span-6
      </div>
    </WcCol>
    <WcCol span={6}>
      <div style="background:var(--wc-color-danger);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;">
        span-6
      </div>
    </WcCol>
  </WcRow>
</div>;
```

:::
::::

### 列偏移

<div class="demo-block">
  <div style="display:flex;flex-direction:column;gap:8px;">
    <wc-row gutter="8">
      <wc-col span="8">
        <div style="background:var(--wc-color-primary);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;">span-8</div>
      </wc-col>
      <wc-col span="8" offset="8">
        <div style="background:var(--wc-color-success);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;">offset-8</div>
      </wc-col>
    </wc-row>
    <wc-row gutter="8">
      <wc-col span="6" offset="6">
        <div style="background:var(--wc-color-primary);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;">offset-6</div>
      </wc-col>
      <wc-col span="6" offset="6">
        <div style="background:var(--wc-color-success);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;">offset-6</div>
      </wc-col>
    </wc-row>
  </div>
</div>

offset 让列左侧空出指定列数，span + offset 相加不超过 24。

:::: details 查看代码
::: code-group

```html [HTML]
<div style="display:flex;flex-direction:column;gap:8px;">
  <wc-row gutter="8">
    <wc-col span="8">
      <div
        style="background:var(--wc-color-primary);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;"
      >
        span-8
      </div>
    </wc-col>
    <wc-col span="8" offset="8">
      <div
        style="background:var(--wc-color-success);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;"
      >
        offset-8
      </div>
    </wc-col>
  </wc-row>
  <wc-row gutter="8">
    <wc-col span="6" offset="6">
      <div
        style="background:var(--wc-color-primary);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;"
      >
        offset-6
      </div>
    </wc-col>
    <wc-col span="6" offset="6">
      <div
        style="background:var(--wc-color-success);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;"
      >
        offset-6
      </div>
    </wc-col>
  </wc-row>
</div>
```

```vue [Vue]
<template>
  <div style="display:flex;flex-direction:column;gap:8px;">
    <wc-row gutter="8">
      <wc-col span="8">
        <div
          style="background:var(--wc-color-primary);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;"
        >
          span-8
        </div>
      </wc-col>
      <wc-col span="8" offset="8">
        <div
          style="background:var(--wc-color-success);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;"
        >
          offset-8
        </div>
      </wc-col>
    </wc-row>
    <wc-row gutter="8">
      <wc-col span="6" offset="6">
        <div
          style="background:var(--wc-color-primary);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;"
        >
          offset-6
        </div>
      </wc-col>
      <wc-col span="6" offset="6">
        <div
          style="background:var(--wc-color-success);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;"
        >
          offset-6
        </div>
      </wc-col>
    </wc-row>
  </div>
</template>
```

```tsx [React]
import { WcCol, WcRow } from '@wc-kit/react';

<div style="display:flex;flex-direction:column;gap:8px;">
  <WcRow gutter={8}>
    <WcCol span={8}>
      <div style="background:var(--wc-color-primary);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;">
        span-8
      </div>
    </WcCol>
    <WcCol span={8} offset={8}>
      <div style="background:var(--wc-color-success);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;">
        offset-8
      </div>
    </WcCol>
  </WcRow>
  <WcRow gutter={8}>
    <WcCol span={6} offset={6}>
      <div style="background:var(--wc-color-primary);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;">
        offset-6
      </div>
    </WcCol>
    <WcCol span={6} offset={6}>
      <div style="background:var(--wc-color-success);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;">
        offset-6
      </div>
    </WcCol>
  </WcRow>
</div>;
```

:::
::::

### 列间距

<div class="demo-block">
  <div style="display:flex;flex-direction:column;gap:8px;">
    <wc-row gutter="16">
      <wc-col span="6">
        <div style="background:var(--wc-color-primary);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;">gutter-16</div>
      </wc-col>
      <wc-col span="6">
        <div style="background:var(--wc-color-success);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;">gutter-16</div>
      </wc-col>
      <wc-col span="6">
        <div style="background:var(--wc-color-warning);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;">gutter-16</div>
      </wc-col>
      <wc-col span="6">
        <div style="background:var(--wc-color-danger);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;">gutter-16</div>
      </wc-col>
    </wc-row>
    <wc-row>
      <wc-col span="6">
        <div style="background:var(--wc-color-primary);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;">无间距</div>
      </wc-col>
      <wc-col span="6">
        <div style="background:var(--wc-color-success);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;">无间距</div>
      </wc-col>
      <wc-col span="6">
        <div style="background:var(--wc-color-warning);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;">无间距</div>
      </wc-col>
      <wc-col span="6">
        <div style="background:var(--wc-color-danger);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;">无间距</div>
      </wc-col>
    </wc-row>
  </div>
</div>

gutter 为列与列之间的间距（column-gap，单位 px），默认 0。

:::: details 查看代码
::: code-group

```html [HTML]
<div style="display:flex;flex-direction:column;gap:8px;">
  <wc-row gutter="16">
    <wc-col span="6">
      <div
        style="background:var(--wc-color-primary);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;"
      >
        gutter-16
      </div>
    </wc-col>
    <wc-col span="6">
      <div
        style="background:var(--wc-color-success);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;"
      >
        gutter-16
      </div>
    </wc-col>
    <wc-col span="6">
      <div
        style="background:var(--wc-color-warning);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;"
      >
        gutter-16
      </div>
    </wc-col>
    <wc-col span="6">
      <div
        style="background:var(--wc-color-danger);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;"
      >
        gutter-16
      </div>
    </wc-col>
  </wc-row>
  <wc-row>
    <wc-col span="6">
      <div
        style="background:var(--wc-color-primary);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;"
      >
        无间距
      </div>
    </wc-col>
    <wc-col span="6">
      <div
        style="background:var(--wc-color-success);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;"
      >
        无间距
      </div>
    </wc-col>
    <wc-col span="6">
      <div
        style="background:var(--wc-color-warning);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;"
      >
        无间距
      </div>
    </wc-col>
    <wc-col span="6">
      <div
        style="background:var(--wc-color-danger);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;"
      >
        无间距
      </div>
    </wc-col>
  </wc-row>
</div>
```

```vue [Vue]
<template>
  <div style="display:flex;flex-direction:column;gap:8px;">
    <wc-row gutter="16">
      <wc-col span="6">
        <div
          style="background:var(--wc-color-primary);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;"
        >
          gutter-16
        </div>
      </wc-col>
      <wc-col span="6">
        <div
          style="background:var(--wc-color-success);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;"
        >
          gutter-16
        </div>
      </wc-col>
      <wc-col span="6">
        <div
          style="background:var(--wc-color-warning);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;"
        >
          gutter-16
        </div>
      </wc-col>
      <wc-col span="6">
        <div
          style="background:var(--wc-color-danger);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;"
        >
          gutter-16
        </div>
      </wc-col>
    </wc-row>
    <wc-row>
      <wc-col span="6">
        <div
          style="background:var(--wc-color-primary);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;"
        >
          无间距
        </div>
      </wc-col>
      <wc-col span="6">
        <div
          style="background:var(--wc-color-success);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;"
        >
          无间距
        </div>
      </wc-col>
      <wc-col span="6">
        <div
          style="background:var(--wc-color-warning);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;"
        >
          无间距
        </div>
      </wc-col>
      <wc-col span="6">
        <div
          style="background:var(--wc-color-danger);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;"
        >
          无间距
        </div>
      </wc-col>
    </wc-row>
  </div>
</template>
```

```tsx [React]
import { WcCol, WcRow } from '@wc-kit/react';

<div style="display:flex;flex-direction:column;gap:8px;">
  <WcRow gutter={16}>
    <WcCol span={6}>
      <div style="background:var(--wc-color-primary);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;">
        gutter-16
      </div>
    </WcCol>
    <WcCol span={6}>
      <div style="background:var(--wc-color-success);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;">
        gutter-16
      </div>
    </WcCol>
    <WcCol span={6}>
      <div style="background:var(--wc-color-warning);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;">
        gutter-16
      </div>
    </WcCol>
    <WcCol span={6}>
      <div style="background:var(--wc-color-danger);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;">
        gutter-16
      </div>
    </WcCol>
  </WcRow>
  <WcRow>
    <WcCol span={6}>
      <div style="background:var(--wc-color-primary);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;">
        无间距
      </div>
    </WcCol>
    <WcCol span={6}>
      <div style="background:var(--wc-color-success);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;">
        无间距
      </div>
    </WcCol>
    <WcCol span={6}>
      <div style="background:var(--wc-color-warning);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;">
        无间距
      </div>
    </WcCol>
    <WcCol span={6}>
      <div style="background:var(--wc-color-danger);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;">
        无间距
      </div>
    </WcCol>
  </WcRow>
</div>;
```

:::
::::

### 对齐方式

<div class="demo-block">
  <p style="margin:0 0 8px;">justify 水平对齐：</p>
  <div style="display:flex;flex-direction:column;gap:8px;">
    <wc-row justify="center">
      <wc-col span="6">
        <div style="background:var(--wc-color-primary);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;">center</div>
      </wc-col>
    </wc-row>
    <wc-row justify="end">
      <wc-col span="6">
        <div style="background:var(--wc-color-primary);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;">end</div>
      </wc-col>
    </wc-row>
    <wc-row justify="space-between">
      <wc-col span="6">
        <div style="background:var(--wc-color-primary);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;">between</div>
      </wc-col>
      <wc-col span="6">
        <div style="background:var(--wc-color-success);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;">between</div>
      </wc-col>
    </wc-row>
  </div>
  <p style="margin:16px 0 8px;">align 垂直对齐（以 middle 为例）：</p>
  <wc-row align="middle" gutter="8">
    <wc-col span="8">
      <div style="background:var(--wc-color-primary);color:#fff;padding:32px 0;text-align:center;border-radius:4px;">高</div>
    </wc-col>
    <wc-col span="8">
      <div style="background:var(--wc-color-success);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;">middle</div>
    </wc-col>
    <wc-col span="8">
      <div style="background:var(--wc-color-warning);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;">middle</div>
    </wc-col>
  </wc-row>
</div>

justify 控制水平对齐，align 控制垂直对齐（top / middle / bottom / stretch）。

:::: details 查看代码
::: code-group

```html [HTML]
<p style="margin:0 0 8px;">justify 水平对齐：</p>
<div style="display:flex;flex-direction:column;gap:8px;">
  <wc-row justify="center">
    <wc-col span="6">
      <div
        style="background:var(--wc-color-primary);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;"
      >
        center
      </div>
    </wc-col>
  </wc-row>
  <wc-row justify="end">
    <wc-col span="6">
      <div
        style="background:var(--wc-color-primary);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;"
      >
        end
      </div>
    </wc-col>
  </wc-row>
  <wc-row justify="space-between">
    <wc-col span="6">
      <div
        style="background:var(--wc-color-primary);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;"
      >
        between
      </div>
    </wc-col>
    <wc-col span="6">
      <div
        style="background:var(--wc-color-success);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;"
      >
        between
      </div>
    </wc-col>
  </wc-row>
</div>
<p style="margin:16px 0 8px;">align 垂直对齐（以 middle 为例）：</p>
<wc-row align="middle" gutter="8">
  <wc-col span="8">
    <div
      style="background:var(--wc-color-primary);color:#fff;padding:32px 0;text-align:center;border-radius:4px;"
    >
      高
    </div>
  </wc-col>
  <wc-col span="8">
    <div
      style="background:var(--wc-color-success);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;"
    >
      middle
    </div>
  </wc-col>
  <wc-col span="8">
    <div
      style="background:var(--wc-color-warning);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;"
    >
      middle
    </div>
  </wc-col>
</wc-row>
```

```vue [Vue]
<template>
  <p style="margin:0 0 8px;">justify 水平对齐：</p>
  <div style="display:flex;flex-direction:column;gap:8px;">
    <wc-row justify="center">
      <wc-col span="6">
        <div
          style="background:var(--wc-color-primary);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;"
        >
          center
        </div>
      </wc-col>
    </wc-row>
    <wc-row justify="end">
      <wc-col span="6">
        <div
          style="background:var(--wc-color-primary);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;"
        >
          end
        </div>
      </wc-col>
    </wc-row>
    <wc-row justify="space-between">
      <wc-col span="6">
        <div
          style="background:var(--wc-color-primary);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;"
        >
          between
        </div>
      </wc-col>
      <wc-col span="6">
        <div
          style="background:var(--wc-color-success);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;"
        >
          between
        </div>
      </wc-col>
    </wc-row>
  </div>
  <p style="margin:16px 0 8px;">align 垂直对齐（以 middle 为例）：</p>
  <wc-row align="middle" gutter="8">
    <wc-col span="8">
      <div
        style="background:var(--wc-color-primary);color:#fff;padding:32px 0;text-align:center;border-radius:4px;"
      >
        高
      </div>
    </wc-col>
    <wc-col span="8">
      <div
        style="background:var(--wc-color-success);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;"
      >
        middle
      </div>
    </wc-col>
    <wc-col span="8">
      <div
        style="background:var(--wc-color-warning);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;"
      >
        middle
      </div>
    </wc-col>
  </wc-row>
</template>
```

```tsx [React]
import { WcCol, WcRow } from '@wc-kit/react';

<p style="margin:0 0 8px;">justify 水平对齐：</p>
<div style="display:flex;flex-direction:column;gap:8px;">
  <WcRow justify="center">
    <WcCol span={6}>
      <div style="background:var(--wc-color-primary);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;">center</div>
    </WcCol>
  </WcRow>
  <WcRow justify="end">
    <WcCol span={6}>
      <div style="background:var(--wc-color-primary);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;">end</div>
    </WcCol>
  </WcRow>
  <WcRow justify="space-between">
    <WcCol span={6}>
      <div style="background:var(--wc-color-primary);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;">between</div>
    </WcCol>
    <WcCol span={6}>
      <div style="background:var(--wc-color-success);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;">between</div>
    </WcCol>
  </WcRow>
</div>
<p style="margin:16px 0 8px;">align 垂直对齐（以 middle 为例）：</p>
<WcRow align="middle" gutter={8}>
  <WcCol span={8}>
    <div style="background:var(--wc-color-primary);color:#fff;padding:32px 0;text-align:center;border-radius:4px;">高</div>
  </WcCol>
  <WcCol span={8}>
    <div style="background:var(--wc-color-success);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;">middle</div>
  </WcCol>
  <WcCol span={8}>
    <div style="background:var(--wc-color-warning);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;">middle</div>
  </WcCol>
</WcRow>
```

:::
::::

### 混合布局

<div class="demo-block">
  <div style="display:flex;flex-direction:column;gap:8px;">
    <wc-row gutter="16" wrap>
      <wc-col span="16">
        <div style="background:var(--wc-color-primary);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;">span-16</div>
      </wc-col>
      <wc-col span="8">
        <div style="background:var(--wc-color-success);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;">span-8</div>
      </wc-col>
      <wc-col span="8">
        <div style="background:var(--wc-color-warning);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;">span-8</div>
      </wc-col>
      <wc-col span="8">
        <div style="background:var(--wc-color-danger);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;">span-8</div>
      </wc-col>
      <wc-col span="8" offset="8">
        <div style="background:var(--wc-color-gray-600);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;">offset-8</div>
      </wc-col>
    </wc-row>
  </div>
</div>

wrap 开启后，span + offset 总和超出 24 的列会自动换到下一行，行间距与 gutter 一致。

:::: details 查看代码
::: code-group

```html [HTML]
<div style="display:flex;flex-direction:column;gap:8px;">
  <wc-row gutter="16" wrap>
    <wc-col span="16">
      <div
        style="background:var(--wc-color-primary);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;"
      >
        span-16
      </div>
    </wc-col>
    <wc-col span="8">
      <div
        style="background:var(--wc-color-success);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;"
      >
        span-8
      </div>
    </wc-col>
    <wc-col span="8">
      <div
        style="background:var(--wc-color-warning);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;"
      >
        span-8
      </div>
    </wc-col>
    <wc-col span="8">
      <div
        style="background:var(--wc-color-danger);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;"
      >
        span-8
      </div>
    </wc-col>
    <wc-col span="8" offset="8">
      <div
        style="background:var(--wc-color-gray-600);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;"
      >
        offset-8
      </div>
    </wc-col>
  </wc-row>
</div>
```

```vue [Vue]
<template>
  <div style="display:flex;flex-direction:column;gap:8px;">
    <wc-row gutter="16" wrap>
      <wc-col span="16">
        <div
          style="background:var(--wc-color-primary);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;"
        >
          span-16
        </div>
      </wc-col>
      <wc-col span="8">
        <div
          style="background:var(--wc-color-success);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;"
        >
          span-8
        </div>
      </wc-col>
      <wc-col span="8">
        <div
          style="background:var(--wc-color-warning);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;"
        >
          span-8
        </div>
      </wc-col>
      <wc-col span="8">
        <div
          style="background:var(--wc-color-danger);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;"
        >
          span-8
        </div>
      </wc-col>
      <wc-col span="8" offset="8">
        <div
          style="background:var(--wc-color-gray-600);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;"
        >
          offset-8
        </div>
      </wc-col>
    </wc-row>
  </div>
</template>
```

```tsx [React]
import { WcCol, WcRow } from '@wc-kit/react';

<div style="display:flex;flex-direction:column;gap:8px;">
  <WcRow gutter={16} wrap>
    <WcCol span={16}>
      <div style="background:var(--wc-color-primary);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;">
        span-16
      </div>
    </WcCol>
    <WcCol span={8}>
      <div style="background:var(--wc-color-success);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;">
        span-8
      </div>
    </WcCol>
    <WcCol span={8}>
      <div style="background:var(--wc-color-warning);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;">
        span-8
      </div>
    </WcCol>
    <WcCol span={8}>
      <div style="background:var(--wc-color-danger);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;">
        span-8
      </div>
    </WcCol>
    <WcCol span={8} offset={8}>
      <div style="background:var(--wc-color-gray-600);color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;">
        offset-8
      </div>
    </WcCol>
  </WcRow>
</div>;
```

:::
::::

## API

### 属性

| 属性      | attribute | 类型                                         | 默认值    | 说明                             |
| --------- | --------- | -------------------------------------------- | --------- | -------------------------------- |
| `gutter`  | `gutter`  | `number`                                     | `0`       | 栅格间距（px），换行时也作行间距 |
| `justify` | `justify` | `wcRowJustify`                               | `'start'` | 水平对齐                         |
| `align`   | `align`   | `'top' \| 'middle' \| 'bottom' \| 'stretch'` | `'top'`   | 垂直对齐                         |
| `wrap`    | `wrap`    | `boolean`                                    | `false`   | 允许换行                         |
| `span`    | `span`    | `number`                                     | `24`      | 占据列数（1~24）                 |
| `offset`  | `offset`  | `number`                                     | `0`       | 左侧偏移列数（1~23）             |

### 插槽

| 名称     | 说明        |
| -------- | ----------- |
| （默认） | 放置 wc-col |

### CSS Parts

`base`
