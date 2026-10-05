# 快速上手

## 安装

```bash
pnpm add @wc-kit/core
```

## 引入

在应用入口注册组件、内置图标，并注入设计令牌与宿主 reset：

```ts
import { registerBuiltinIcons, tokensCss, resetCss, initTheme } from '@wc-kit/core';

// 注册全部组件（副作用导入）
import '@wc-kit/core';

registerBuiltinIcons();

// 设计令牌（:root 变量 + 暗色主题）与宿主页面 reset
const style = document.createElement('style');
style.textContent = tokensCss;
document.head.append(style);
const reset = document.createElement('style');
reset.textContent = resetCss;
document.head.append(reset);

// 初始化主题（支持 light / dark / auto）
initTheme();
```

## 使用

任意框架中直接书写原生标签：

```html
<wc-button type="outline">按钮</wc-button> <wc-input placeholder="请输入"></wc-input>
```

## 框架适配

| 框架  | 包              | 说明                                                 |
| ----- | --------------- | ---------------------------------------------------- |
| React | `@wc-kit/react` | 基于 @lit/react 的包装组件，事件映射为 `onWc*` props |
| Vue 3 | `@wc-kit/vue`   | 类型增强（GlobalComponents），原生标签直接使用       |

## TypeScript 支持

三个包均自带类型声明，TS 项目无需任何额外配置：

- **`@wc-kit/core`**：每个组件都注册了 `HTMLElementTagNameMap` 增强——`document.createElement('wc-button')`、`querySelector('wc-input')` 自动推导为对应的元素类，属性与方法有完整提示
- **`@wc-kit/react`**：包装组件属性/事件完全类型化；同时内置 JSX `IntrinsicElements` 增强（兼容 React 18 / 19），TSX 里直接写 `<wc-button>` 也能通过类型检查
- **`@wc-kit/vue`**：增强 vue 的 `GlobalComponents`，SFC 模板里 `<wc-button>` 标签名与属性拼写错误会在编译期报错

```ts
import '@wc-kit/core';

const el = document.createElement('wc-dialog'); // 类型：wcDialog
el.open = true; // 有完整属性提示
```

## 主题

```ts
import { setTheme, getTheme, getEffectiveTheme } from '@wc-kit/core';

setTheme('dark', { persist: true }); // 切换并持久化
getTheme(); // 用户偏好
getEffectiveTheme(); // 实际生效主题（auto 解析后）
```

切换通过 `documentElement` 上的 `data-theme` 属性驱动，并派发 `wc-theme-change` 事件。
