# Space 间距

间距容器组件：为子元素批量提供间距，基于 gap 实现，不产生额外 DOM 包裹。

主要 API：`size` 间距（small / medium / large 预设档位，或纯数字按 px、任意 CSS 尺寸值）、`direction` 排列方向（horizontal / vertical）、`align` 对齐方式（start / center / end / baseline，不设置时水平方向默认 center、竖向默认 stretch）、`wrap` 允许换行。无自定义事件。也可直接覆写 CSS 变量 `--wc-space-gap`。

React 用法（`@wc-kit/react` 包装组件）：

```tsx
import { WcButton, WcSpace } from '@wc-kit/react';

<WcSpace size="large">
  <WcButton>按钮一</WcButton>
  <WcButton>按钮二</WcButton>
</WcSpace>;
```

Vue 用法（`@wc-kit/vue` 为纯类型增强包，直接使用原生标签）：

```vue
<template>
  <wc-space size="large">
    <wc-button>按钮一</wc-button>
    <wc-button>按钮二</wc-button>
  </wc-space>
</template>
```

## 示例

### 间距大小

<div class="demo-block">

<div style="display:flex;flex-direction:column;gap:8px;">
      <div style="display:flex;align-items:center;gap:12px;">
        <span style="width:64px;color:var(--wc-color-gray-500);font-size:13px;">small</span>
        <wc-space size="small">
          <wc-button size="small">按钮一</wc-button>
          <wc-button size="small">按钮二</wc-button>
        </wc-space>
      </div>
      <div style="display:flex;align-items:center;gap:12px;">
        <span style="width:64px;color:var(--wc-color-gray-500);font-size:13px;">medium</span>
        <wc-space size="medium">
          <wc-button size="small">按钮一</wc-button>
          <wc-button size="small">按钮二</wc-button>
        </wc-space>
      </div>
      <div style="display:flex;align-items:center;gap:12px;">
        <span style="width:64px;color:var(--wc-color-gray-500);font-size:13px;">large</span>
        <wc-space size="large">
          <wc-button size="small">按钮一</wc-button>
          <wc-button size="small">按钮二</wc-button>
        </wc-space>
      </div>
      <div style="display:flex;align-items:center;gap:12px;">
        <span style="width:64px;color:var(--wc-color-gray-500);font-size:13px;">32px</span>
        <wc-space size="32">
          <wc-button size="small">按钮一</wc-button>
          <wc-button size="small">按钮二</wc-button>
        </wc-space>
      </div>
    </div>

</div>

:::: details 查看代码
::: code-group

```html [HTML]
<div style="display:flex;flex-direction:column;gap:8px;">
  <div style="display:flex;align-items:center;gap:12px;">
    <span style="width:64px;color:var(--wc-color-gray-500);font-size:13px;">small</span>
    <wc-space size="small">
      <wc-button size="small">按钮一</wc-button>
      <wc-button size="small">按钮二</wc-button>
    </wc-space>
  </div>
  <div style="display:flex;align-items:center;gap:12px;">
    <span style="width:64px;color:var(--wc-color-gray-500);font-size:13px;">medium</span>
    <wc-space size="medium">
      <wc-button size="small">按钮一</wc-button>
      <wc-button size="small">按钮二</wc-button>
    </wc-space>
  </div>
  <div style="display:flex;align-items:center;gap:12px;">
    <span style="width:64px;color:var(--wc-color-gray-500);font-size:13px;">large</span>
    <wc-space size="large">
      <wc-button size="small">按钮一</wc-button>
      <wc-button size="small">按钮二</wc-button>
    </wc-space>
  </div>
  <div style="display:flex;align-items:center;gap:12px;">
    <span style="width:64px;color:var(--wc-color-gray-500);font-size:13px;">32px</span>
    <wc-space size="32">
      <wc-button size="small">按钮一</wc-button>
      <wc-button size="small">按钮二</wc-button>
    </wc-space>
  </div>
</div>
```

```vue [Vue]
<template>
  <div style="display:flex;flex-direction:column;gap:8px;">
    <div style="display:flex;align-items:center;gap:12px;">
      <span style="width:64px;color:var(--wc-color-gray-500);font-size:13px;">small</span>
      <wc-space size="small">
        <wc-button size="small">按钮一</wc-button>
        <wc-button size="small">按钮二</wc-button>
      </wc-space>
    </div>
    <div style="display:flex;align-items:center;gap:12px;">
      <span style="width:64px;color:var(--wc-color-gray-500);font-size:13px;">medium</span>
      <wc-space size="medium">
        <wc-button size="small">按钮一</wc-button>
        <wc-button size="small">按钮二</wc-button>
      </wc-space>
    </div>
    <div style="display:flex;align-items:center;gap:12px;">
      <span style="width:64px;color:var(--wc-color-gray-500);font-size:13px;">large</span>
      <wc-space size="large">
        <wc-button size="small">按钮一</wc-button>
        <wc-button size="small">按钮二</wc-button>
      </wc-space>
    </div>
    <div style="display:flex;align-items:center;gap:12px;">
      <span style="width:64px;color:var(--wc-color-gray-500);font-size:13px;">32px</span>
      <wc-space size="32">
        <wc-button size="small">按钮一</wc-button>
        <wc-button size="small">按钮二</wc-button>
      </wc-space>
    </div>
  </div>
</template>
```

```tsx [React]
import { WcButton, WcSpace } from '@wc-kit/react';

<div style="display:flex;flex-direction:column;gap:8px;">
  <div style="display:flex;align-items:center;gap:12px;">
    <span style="width:64px;color:var(--wc-color-gray-500);font-size:13px;">small</span>
    <WcSpace size="small">
      <WcButton size="small">按钮一</WcButton>
      <WcButton size="small">按钮二</WcButton>
    </WcSpace>
  </div>
  <div style="display:flex;align-items:center;gap:12px;">
    <span style="width:64px;color:var(--wc-color-gray-500);font-size:13px;">medium</span>
    <WcSpace size="medium">
      <WcButton size="small">按钮一</WcButton>
      <WcButton size="small">按钮二</WcButton>
    </WcSpace>
  </div>
  <div style="display:flex;align-items:center;gap:12px;">
    <span style="width:64px;color:var(--wc-color-gray-500);font-size:13px;">large</span>
    <WcSpace size="large">
      <WcButton size="small">按钮一</WcButton>
      <WcButton size="small">按钮二</WcButton>
    </WcSpace>
  </div>
  <div style="display:flex;align-items:center;gap:12px;">
    <span style="width:64px;color:var(--wc-color-gray-500);font-size:13px;">32px</span>
    <WcSpace size={32}>
      <WcButton size="small">按钮一</WcButton>
      <WcButton size="small">按钮二</WcButton>
    </WcSpace>
  </div>
</div>;
```

:::
::::

### 方向

<div class="demo-block">

<div style="display:flex;gap:12px;align-items:flex-start;">
      <wc-space direction="horizontal">
        <wc-button>横向</wc-button>
        <wc-button>排列</wc-button>
      </wc-space>
      <wc-space direction="vertical">
        <wc-button>竖向</wc-button>
        <wc-button>排列</wc-button>
      </wc-space>
    </div>

</div>

:::: details 查看代码
::: code-group

```html [HTML]
<div style="display:flex;gap:12px;align-items:flex-start;">
  <wc-space direction="horizontal">
    <wc-button>横向</wc-button>
    <wc-button>排列</wc-button>
  </wc-space>
  <wc-space direction="vertical">
    <wc-button>竖向</wc-button>
    <wc-button>排列</wc-button>
  </wc-space>
</div>
```

```vue [Vue]
<template>
  <div style="display:flex;gap:12px;align-items:flex-start;">
    <wc-space direction="horizontal">
      <wc-button>横向</wc-button>
      <wc-button>排列</wc-button>
    </wc-space>
    <wc-space direction="vertical">
      <wc-button>竖向</wc-button>
      <wc-button>排列</wc-button>
    </wc-space>
  </div>
</template>
```

```tsx [React]
import { WcButton, WcSpace } from '@wc-kit/react';

<div style="display:flex;gap:12px;align-items:flex-start;">
  <WcSpace direction="horizontal">
    <WcButton>横向</WcButton>
    <WcButton>排列</WcButton>
  </WcSpace>
  <WcSpace direction="vertical">
    <WcButton>竖向</WcButton>
    <WcButton>排列</WcButton>
  </WcSpace>
</div>;
```

:::
::::

### 对齐方式

<div class="demo-block">
  <div style="display:flex;flex-direction:column;gap:8px;">
    <div style="display:flex;align-items:center;gap:12px;">
      <span style="width:64px;color:var(--wc-color-gray-500);font-size:13px;">start</span>
      <wc-space align="start" size="small" style="flex:1;">
        <wc-button size="small">按钮</wc-button>
        <div style="width:48px;height:40px;background:var(--wc-color-primary);border-radius:4px;"></div>
        <span>文本</span>
      </wc-space>
    </div>
    <div style="display:flex;align-items:center;gap:12px;">
      <span style="width:64px;color:var(--wc-color-gray-500);font-size:13px;">center</span>
      <wc-space align="center" size="small" style="flex:1;">
        <wc-button size="small">按钮</wc-button>
        <div style="width:48px;height:40px;background:var(--wc-color-primary);border-radius:4px;"></div>
        <span>文本</span>
      </wc-space>
    </div>
    <div style="display:flex;align-items:center;gap:12px;">
      <span style="width:64px;color:var(--wc-color-gray-500);font-size:13px;">end</span>
      <wc-space align="end" size="small" style="flex:1;">
        <wc-button size="small">按钮</wc-button>
        <div style="width:48px;height:40px;background:var(--wc-color-primary);border-radius:4px;"></div>
        <span>文本</span>
      </wc-space>
    </div>
    <div style="display:flex;align-items:center;gap:12px;">
      <span style="width:64px;color:var(--wc-color-gray-500);font-size:13px;">baseline</span>
      <wc-space align="baseline" size="small" style="flex:1;">
        <wc-button size="small">按钮</wc-button>
        <div style="width:48px;height:40px;background:var(--wc-color-primary);border-radius:4px;"></div>
        <span>文本</span>
      </wc-space>
    </div>
  </div>
</div>

align 不设置时：水平方向默认 center，竖向默认 stretch。

:::: details 查看代码
::: code-group

```html [HTML]
<div style="display:flex;flex-direction:column;gap:8px;">
  <div style="display:flex;align-items:center;gap:12px;">
    <span style="width:64px;color:var(--wc-color-gray-500);font-size:13px;">start</span>
    <wc-space align="start" size="small" style="flex:1;">
      <wc-button size="small">按钮</wc-button>
      <div
        style="width:48px;height:40px;background:var(--wc-color-primary);border-radius:4px;"
      ></div>
      <span>文本</span>
    </wc-space>
  </div>
  <div style="display:flex;align-items:center;gap:12px;">
    <span style="width:64px;color:var(--wc-color-gray-500);font-size:13px;">center</span>
    <wc-space align="center" size="small" style="flex:1;">
      <wc-button size="small">按钮</wc-button>
      <div
        style="width:48px;height:40px;background:var(--wc-color-primary);border-radius:4px;"
      ></div>
      <span>文本</span>
    </wc-space>
  </div>
  <div style="display:flex;align-items:center;gap:12px;">
    <span style="width:64px;color:var(--wc-color-gray-500);font-size:13px;">end</span>
    <wc-space align="end" size="small" style="flex:1;">
      <wc-button size="small">按钮</wc-button>
      <div
        style="width:48px;height:40px;background:var(--wc-color-primary);border-radius:4px;"
      ></div>
      <span>文本</span>
    </wc-space>
  </div>
  <div style="display:flex;align-items:center;gap:12px;">
    <span style="width:64px;color:var(--wc-color-gray-500);font-size:13px;">baseline</span>
    <wc-space align="baseline" size="small" style="flex:1;">
      <wc-button size="small">按钮</wc-button>
      <div
        style="width:48px;height:40px;background:var(--wc-color-primary);border-radius:4px;"
      ></div>
      <span>文本</span>
    </wc-space>
  </div>
</div>
```

```vue [Vue]
<template>
  <div style="display:flex;flex-direction:column;gap:8px;">
    <div style="display:flex;align-items:center;gap:12px;">
      <span style="width:64px;color:var(--wc-color-gray-500);font-size:13px;">start</span>
      <wc-space align="start" size="small" style="flex:1;">
        <wc-button size="small">按钮</wc-button>
        <div
          style="width:48px;height:40px;background:var(--wc-color-primary);border-radius:4px;"
        ></div>
        <span>文本</span>
      </wc-space>
    </div>
    <div style="display:flex;align-items:center;gap:12px;">
      <span style="width:64px;color:var(--wc-color-gray-500);font-size:13px;">center</span>
      <wc-space align="center" size="small" style="flex:1;">
        <wc-button size="small">按钮</wc-button>
        <div
          style="width:48px;height:40px;background:var(--wc-color-primary);border-radius:4px;"
        ></div>
        <span>文本</span>
      </wc-space>
    </div>
    <div style="display:flex;align-items:center;gap:12px;">
      <span style="width:64px;color:var(--wc-color-gray-500);font-size:13px;">end</span>
      <wc-space align="end" size="small" style="flex:1;">
        <wc-button size="small">按钮</wc-button>
        <div
          style="width:48px;height:40px;background:var(--wc-color-primary);border-radius:4px;"
        ></div>
        <span>文本</span>
      </wc-space>
    </div>
    <div style="display:flex;align-items:center;gap:12px;">
      <span style="width:64px;color:var(--wc-color-gray-500);font-size:13px;">baseline</span>
      <wc-space align="baseline" size="small" style="flex:1;">
        <wc-button size="small">按钮</wc-button>
        <div
          style="width:48px;height:40px;background:var(--wc-color-primary);border-radius:4px;"
        ></div>
        <span>文本</span>
      </wc-space>
    </div>
  </div>
</template>
```

```tsx [React]
import { WcButton, WcSpace } from '@wc-kit/react';

<div style="display:flex;flex-direction:column;gap:8px;">
  <div style="display:flex;align-items:center;gap:12px;">
    <span style="width:64px;color:var(--wc-color-gray-500);font-size:13px;">start</span>
    <WcSpace align="start" size="small" style="flex:1;">
      <WcButton size="small">按钮</WcButton>
      <div style="width:48px;height:40px;background:var(--wc-color-primary);border-radius:4px;"></div>
      <span>文本</span>
    </WcSpace>
  </div>
  <div style="display:flex;align-items:center;gap:12px;">
    <span style="width:64px;color:var(--wc-color-gray-500);font-size:13px;">center</span>
    <WcSpace align="center" size="small" style="flex:1;">
      <WcButton size="small">按钮</WcButton>
      <div style="width:48px;height:40px;background:var(--wc-color-primary);border-radius:4px;"></div>
      <span>文本</span>
    </WcSpace>
  </div>
  <div style="display:flex;align-items:center;gap:12px;">
    <span style="width:64px;color:var(--wc-color-gray-500);font-size:13px;">end</span>
    <WcSpace align="end" size="small" style="flex:1;">
      <WcButton size="small">按钮</WcButton>
      <div style="width:48px;height:40px;background:var(--wc-color-primary);border-radius:4px;"></div>
      <span>文本</span>
    </WcSpace>
  </div>
  <div style="display:flex;align-items:center;gap:12px;">
    <span style="width:64px;color:var(--wc-color-gray-500);font-size:13px;">baseline</span>
    <WcSpace align="baseline" size="small" style="flex:1;">
      <WcButton size="small">按钮</WcButton>
      <div style="width:48px;height:40px;background:var(--wc-color-primary);border-radius:4px;"></div>
      <span>文本</span>
    </WcSpace>
  </div>
</div>;
```

:::
::::

### 自动换行

<div class="demo-block">
  <wc-space wrap size="small" style="max-width:360px;">
    <wc-tag>标签 1</wc-tag>
    <wc-tag>标签 2</wc-tag>
    <wc-tag>标签 3</wc-tag>
    <wc-tag>标签 4</wc-tag>
    <wc-tag>标签 5</wc-tag>
    <wc-tag>标签 6</wc-tag>
    <wc-tag>标签 7</wc-tag>
    <wc-tag>标签 8</wc-tag>
    <wc-tag>标签 9</wc-tag>
    <wc-tag>标签 10</wc-tag>
    <wc-tag>标签 11</wc-tag>
    <wc-tag>标签 12</wc-tag>
  </wc-space>
</div>

wrap 开启后子元素超出容器宽度自动换行。

:::: details 查看代码
::: code-group

```html [HTML]
<wc-space wrap size="small" style="max-width:360px;">
  <wc-tag>标签 1</wc-tag>
  <wc-tag>标签 2</wc-tag>
  <wc-tag>标签 3</wc-tag>
  <wc-tag>标签 4</wc-tag>
  <wc-tag>标签 5</wc-tag>
  <wc-tag>标签 6</wc-tag>
  <wc-tag>标签 7</wc-tag>
  <wc-tag>标签 8</wc-tag>
  <wc-tag>标签 9</wc-tag>
  <wc-tag>标签 10</wc-tag>
  <wc-tag>标签 11</wc-tag>
  <wc-tag>标签 12</wc-tag>
</wc-space>
```

```vue [Vue]
<template>
  <wc-space wrap size="small" style="max-width:360px;">
    <wc-tag>标签 1</wc-tag>
    <wc-tag>标签 2</wc-tag>
    <wc-tag>标签 3</wc-tag>
    <wc-tag>标签 4</wc-tag>
    <wc-tag>标签 5</wc-tag>
    <wc-tag>标签 6</wc-tag>
    <wc-tag>标签 7</wc-tag>
    <wc-tag>标签 8</wc-tag>
    <wc-tag>标签 9</wc-tag>
    <wc-tag>标签 10</wc-tag>
    <wc-tag>标签 11</wc-tag>
    <wc-tag>标签 12</wc-tag>
  </wc-space>
</template>
```

```tsx [React]
import { WcSpace, WcTag } from '@wc-kit/react';

<WcSpace wrap size="small" style="max-width:360px;">
  <WcTag>标签 1</WcTag>
  <WcTag>标签 2</WcTag>
  <WcTag>标签 3</WcTag>
  <WcTag>标签 4</WcTag>
  <WcTag>标签 5</WcTag>
  <WcTag>标签 6</WcTag>
  <WcTag>标签 7</WcTag>
  <WcTag>标签 8</WcTag>
  <WcTag>标签 9</WcTag>
  <WcTag>标签 10</WcTag>
  <WcTag>标签 11</WcTag>
  <WcTag>标签 12</WcTag>
</WcSpace>;
```

:::
::::

## API

### 属性

| 属性        | attribute   | 类型                                  | 默认值         | 说明                                                    |
| ----------- | ----------- | ------------------------------------- | -------------- | ------------------------------------------------------- |
| `size`      | `size`      | `keyof typeof PRESET_SIZES \| string` | `'medium'`     | 间距：small / medium / large / 纯数字（px）/ CSS 尺寸值 |
| `direction` | `direction` | `'horizontal' \| 'vertical'`          | `'horizontal'` | 排列方向                                                |
| `wrap`      | `wrap`      | `boolean`                             | `false`        | 允许换行                                                |

### 插槽

| 名称     | 说明       |
| -------- | ---------- |
| （默认） | 任意子元素 |

### CSS 变量

| 变量             | 说明             |
| ---------------- | ---------------- |
| `--wc-space-gap` | 也可直接覆写间距 |

### CSS Parts

`base`
