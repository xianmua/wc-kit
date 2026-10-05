# wc

基于 Web Components 的跨框架 UI 组件库，一次编写，React / Vue / 原生 HTML 通用。

## 特性

- **框架无关**：标准 Custom Element + Lit 3，React/Vue/Svelte/原生均可直接使用
- **统一主题**：三层设计令牌（primitive → semantic → component），CSS 变量一键换肤，内置暗色主题
- **API 规范**：组件命名、参数、插槽、事件对齐 TDesign 风格
- **表单关联**：ElementInternals 接入原生 `<form>`，天然支持表单提交与重置
- **可访问性**：WAI-ARIA 模式 + 键盘导航全覆盖
- **国际化**：内置 zh-CN / en-US，可注册自定义语言包

## 快速开始

```bash
pnpm install
pnpm -r build     # 构建所有包
pnpm test         # 运行测试
pnpm --filter @wc-kit/core playground   # 启动组件 playground（端口 5180）
```

## 使用示例

```html
<script type="module" src="path/to/wc/index.js"></script>

<wc-button theme="primary">主要按钮</wc-button>
<wc-input placeholder="请输入"></wc-input>

<wc-form>
  <wc-form-item label="用户名" name="username" required>
    <wc-input></wc-input>
  </wc-form-item>
  <wc-button theme="primary" type="submit">提交</wc-button>
</wc-form>
```

## 目录结构

```
packages/
├── core/     # @wc-kit/core 组件库本体（Lit）
├── react/    # @wc-kit/react React 适配层
├── vue/      # @wc-kit/vue Vue 适配层
└── tokens/   # @wc-kit/tokens 设计令牌
apps/
└── docs/     # Storybook 文档站
```

## 开发计划

见 [docs/PLAN.md](docs/PLAN.md)，编码规范见 [docs/RULES.md](docs/RULES.md)。

## License

MIT
