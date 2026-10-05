# @wc-kit/vue

Vue 3 适配包：为 [@wc-kit/core](../core) 的 Web Components 提供 **模板类型检查**（GlobalComponents 增强）。

## 安装

```bash
pnpm add @wc-kit/vue vue
```

```ts
// main.ts —— 副作用导入注册全部自定义元素
import '@wc-kit/vue';
```

## 类型增强

引入本包后，SFC 模板中的 `<wc-*>` 标签自动获得属性类型检查（由 @wc-kit/core 元素类实例类型推导，无需手工维护）：

```vue
<template>
  <!-- label: string；clearable: boolean —— 类型正确 ✓ -->
  <wc-input :label="title" clearable @wc-change="onChange" />
  <!-- 错误属性会在 vue-tsc 下报错 ✗ -->
</template>

<script setup lang="ts">
// 全局类型生效需要 tsconfig include 覆盖到本包的类型声明，
// 或在 env.d.ts 中显式引用：
import type {} from '@wc-kit/vue/global-components';
</script>
```

## v-model 适配说明

Vue 对**自定义元素**的 `v-model` 会绑定 `value` 属性 + 监听原生 `input` 事件，
而 `wc-input` 等组件派发的是 **`wc-input` / `wc-change`** 自定义事件（`detail.value` 携带值），
因此原生 `v-model` 不生效。推荐写法：

```vue
<template>
  <!-- 方式一：value 属性 + wc-input 事件（输入过程实时同步） -->
  <wc-input :value="text" @wc-input="text = $event.detail.value" />

  <!-- 方式二：失焦/回车才提交时用 wc-change -->
  <wc-input :value="text" @wc-change="text = $event.detail.value" />
</template>
```

各组件的值事件：`wc-input` / `wc-textarea` / `wc-slider` / `wc-input-number`（`wc-input` 拖动 + `wc-change` 提交）、
`wc-select` / `wc-checkbox` / `wc-radio` / `wc-switch` / `wc-date-picker` / `wc-tabs` / `wc-pagination`（`wc-change`）。

> 如需真正的 `v-model` 语法糖，可在项目中封装一层 `defineModel` + 事件转发的薄包装组件，或等待后续版本提供官方指令。
