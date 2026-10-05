# @wc-kit/react

[@wc-kit/core](https://www.npmjs.com/package/@wc-kit/core) Web Components 的 React 适配包，基于 [@lit/react](https://lit.dev/docs/frameworks/react/) 官方方案生成包装组件。

## 安装

```bash
npm install @wc-kit/react @wc-kit/core react
```

## 用法

```tsx
import { WcButton, WcInput } from '@wc-kit/react';

export function Demo() {
  return (
    <>
      {/* 事件映射为 onWc* props */}
      <WcButton theme="primary" onClick={() => console.log('clicked')}>
        主要按钮
      </WcButton>

      {/* wc-input 事件 detail.value 携带输入值 */}
      <WcInput label="用户名" onWcInput={(e) => console.log(e.detail.value)} />
    </>
  );
}
```

## 说明

- 覆盖全部 38 个 `<wc-*>` 组件，组件名 PascalCase（`wc-button` → `WcButton`）
- 自定义事件（`wc-change` 等）映射为 `onWc*` props，回调参数类型为对应 `CustomEvent`
- 需要 React 18 或 19（peerDependencies）

## TypeScript

本包自带类型，无需额外 @types：

- **包装组件**（推荐）：属性与 `onWc*` 事件完全类型化，`ref` 推导为对应的 core 元素类
- **原生标签**：内置 `JSX.IntrinsicElements` 全局增强（兼容 React 18 / 19 类型布局），TSX 里直接写 `<wc-button>` 也有基础类型与正确的 `ref` 推导：

```tsx
// 原生标签写法同样可用（attribute 为弱类型；严格类型请用包装组件）
const ref = useRef<import('@wc-kit/core').wcDialog>(null);
return <wc-dialog ref={ref}></wc-dialog>;
```

组件 API 与交互示例见仓库 [apps/website](https://github.com/xianmua/wc-kit/tree/main/apps/website) 文档站。

## License

MIT
