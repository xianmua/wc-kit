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
<wc-button variant="outline">按钮</wc-button> <wc-input placeholder="请输入"></wc-input>
```

## 框架适配

| 框架  | 包              | 说明                                                 |
| ----- | --------------- | ---------------------------------------------------- |
| React | `@wc-kit/react` | 基于 @lit/react 的包装组件，事件映射为 `onWc*` props |
| Vue 3 | `@wc-kit/vue`   | 类型增强（GlobalComponents），原生标签直接使用       |

## 主题

```ts
import { setTheme, getTheme, getEffectiveTheme } from '@wc-kit/core';

setTheme('dark', { persist: true }); // 切换并持久化
getTheme(); // 用户偏好
getEffectiveTheme(); // 实际生效主题（auto 解析后）
```

切换通过 `documentElement` 上的 `data-theme` 属性驱动，并派发 `wc-theme-change` 事件。
