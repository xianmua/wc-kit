# Slider 滑块

滑块组件（单值）。键盘导航与 a11y 由隐藏的原生 input[type=range] 提供（方向键 ±step、PageUp/Down 翻页、
Home/End 边界）。基于 ElementInternals 接入原生 form，value / name / disabled 可随表单提交与重置。

**属性**

- `value`：当前值，number，默认 0（自动按 step 取整并夹在 [min, max] 区间）
- `min`：最小值，number，默认 0
- `max`：最大值，number，默认 100
- `step`：步长，number，默认 1
- `label`：无障碍标签
- `name`：提交到表单的字段名
- `disabled`：是否禁用

**事件**

- `wc-input`：拖动过程中持续触发，detail.value
- `wc-change`：松手提交时触发，detail.value
- 原生 `input` / `change`：分别与 wc-input / wc-change 同时机伴发在宿主上（bubbles + composed），供框架双向绑定直接消费

**React 用法**

```tsx
import { WcSlider } from '@wc-kit/react';

// 受控：onInput 持续跟踪、onChange 提交（包装组件已内置事件映射）
<WcSlider value={volume} min={0} max={100} step={5} onInput={(e) => setVolume(e.target.value)} />;
```

**Vue 用法**

```html
<!-- @wc-kit/vue 仅提供类型增强，直接使用原生标签。
     vite 配置一次 isCustomElement 后可直接 v-model（详见 Input 组件页说明）。 -->
<wc-slider v-model="volume" :min="0" :max="100" :step="5"></wc-slider>
```

## 示例

### 范围与步长

<div class="demo-block">
  <div style="display:flex;flex-direction:column;gap:16px;">
    <wc-slider style="width:320px" value="20" min="0" max="50"></wc-slider>
    <wc-slider style="width:320px" value="2.5" min="0" max="10" step="0.5"></wc-slider>
    <wc-slider style="width:320px" value="70" min="50" max="100" step="10"></wc-slider>
  </div>
</div>

从上到下：0~50、0~10 步长 0.5（支持小数）、50~100 步长 10。

:::: details 查看代码
::: code-group

```html [HTML]
<div style="display:flex;flex-direction:column;gap:16px;">
  <wc-slider style="width:320px" value="20" min="0" max="50"></wc-slider>
  <wc-slider style="width:320px" value="2.5" min="0" max="10" step="0.5"></wc-slider>
  <wc-slider style="width:320px" value="70" min="50" max="100" step="10"></wc-slider>
</div>
```

```vue [Vue]
<template>
  <div style="display:flex;flex-direction:column;gap:16px;">
    <wc-slider style="width:320px" value="20" min="0" max="50"></wc-slider>
    <wc-slider style="width:320px" value="2.5" min="0" max="10" step="0.5"></wc-slider>
    <wc-slider style="width:320px" value="70" min="50" max="100" step="10"></wc-slider>
  </div>
</template>
```

```tsx [React]
import { WcSlider } from '@wc-kit/react';

<div style="display:flex;flex-direction:column;gap:16px;">
  <WcSlider style="width:320px" value={20} min={0} max={50}></WcSlider>
  <WcSlider style="width:320px" value="2.5" min={0} max={10} step="0.5"></WcSlider>
  <WcSlider style="width:320px" value={70} min={50} max={100} step={10}></WcSlider>
</div>;
```

:::
::::

### 禁用

<div class="demo-block">
  <wc-slider style="width:320px" value="40" disabled></wc-slider>
</div>

:::: details 查看代码
::: code-group

```html [HTML]
<wc-slider style="width:320px" value="40" disabled></wc-slider>
```

```vue [Vue]
<template>
  <wc-slider style="width:320px" value="40" disabled></wc-slider>
</template>
```

```tsx [React]
import { WcSlider } from '@wc-kit/react';

<WcSlider style="width:320px" value={40} disabled></WcSlider>;
```

:::
::::

## API

### 属性

| 属性    | attribute | 类型     | 默认值 | 说明       |
| ------- | --------- | -------- | ------ | ---------- |
| `min`   | `min`     | `number` | `0`    | 最小值     |
| `max`   | `max`     | `number` | `100`  | 最大值     |
| `step`  | `step`    | `number` | `1`    | 步长       |
| `label` | `label`   | `string` | `''`   | 无障碍标签 |

### 事件

| 事件          | 说明                                                            |
| ------------- | --------------------------------------------------------------- |
| `wc-input`    | 拖动过程中持续触发，detail.value                                |
| `wc-change`   | 松手提交时触发，detail.value                                    |
| 原生 `input`  | 与 `wc-input` 同时机伴发在宿主上，供框架 v-model / onInput 消费 |
| 原生 `change` | 与 `wc-change` 同时机伴发在宿主上                               |

### CSS Parts

`base` / `track` / `fill` / `thumb`
