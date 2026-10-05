# @wc-kit/core

基于 [Lit 3](https://lit.dev) 的框架无关 Web Components 组件库。38 个组件、完整设计令牌体系、暗色模式与 i18n 开箱即用，可在原生 HTML / React / Vue 等任何环境中使用。

## 安装

```bash
npm install @wc-kit/core
```

## 快速上手

```html
<!-- 引入组件（副作用导入，注册全部 <wc-*> 自定义元素） -->
<script type="module">
  import '@wc-kit/core';
</script>

<!-- 设计令牌 + 全局基础样式 -->
<link rel="stylesheet" href="node_modules/@wc-kit/core/tokens.css" />
<link rel="stylesheet" href="node_modules/@wc-kit/core/reset.css" />

<wc-button theme="primary" @click="console.log('clicked')">主要按钮</wc-button>
```

ESM / 打包器环境：

```js
import '@wc-kit/core';
import '@wc-kit/core/tokens.css';
```

## 特性

- **38 个组件**：基础 / 表单 / 反馈 / 导航 / 数据展示五大类
- **设计令牌**：三层令牌体系（primitive → semantic → component），全部 `--wc-*` 前缀，仅改 CSS 变量即可换肤
- **暗色模式**：`setTheme('dark')` 或跟随系统，令牌自动切换
- **框架友好**：自定义事件全部 `wc-` 前缀 + `composed: true`；配套 [`@wc-kit/react`](https://www.npmjs.com/package/@wc-kit/react) 与 [`@wc-kit/vue`](https://www.npmjs.com/package/@wc-kit/vue) 适配包
- **i18n**：内置 zh-CN / en-US，LocalizeController 支持扩展语言包
- **图标体系**：22 个内置图标 + `registerIcon` / `registerIconLibrary` 自定义注册

## 框架适配

| 框架 | 包 | 说明 |
| ---- | -- | ---- |
| React 18/19 | [`@wc-kit/react`](https://www.npmjs.com/package/@wc-kit/react) | @lit/react 包装，事件映射为 `onWc*` props |
| Vue 3 | [`@wc-kit/vue`](https://www.npmjs.com/package/@wc-kit/vue) | GlobalComponents 模板类型检查 + v-model 适配说明 |
| 原生 HTML | 本包 | 直接使用，无需任何适配层 |

## 文档

组件文档与交互式示例：见仓库 [apps/website](https://github.com/xianmua/wui/tree/main/apps/website)。

## License

MIT
