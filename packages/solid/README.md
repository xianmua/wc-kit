# @wc-kit/solid

[@wc-kit/core](https://www.npmjs.com/package/@wc-kit/core) Web Components 的 SolidJS 类型定义与单点引入入口。

Solid 原生支持自定义元素，且默认把 JSX props 设为 **property**（`attr:` 前缀才是 attribute），对象数组、函数等复杂值原样传入——与 Lit 组件天然契合。本包只做两件事：

1. **副作用导入** `@wc-kit/core`，一次性注册全部自定义元素
2. **类型增强** `solid-js` 的 `JSX.IntrinsicElements`，让 `<wc-*>` 标签获得完整的属性类型检查

## 安装

```bash
pnpm add @wc-kit/solid
```

## 使用

```tsx
import { render } from 'solid-js/web';
import '@wc-kit/solid';

function App() {
  return (
    <wc-button theme="primary" onClick={() => console.log('clicked')}>
      按钮
    </wc-button>
  );
}

render(() => <App />, document.body);
```

事件监听用 `on:` 前缀（自定义事件走 addEventListener，不被 Solid 事件委托）：

```tsx
import '@wc-kit/solid';

<wc-pagination total={100} on:wc-change={(e) => console.log(e.detail.current)} />;
```

MIT License
