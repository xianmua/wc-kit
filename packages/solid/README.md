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

## 双向绑定

表单组件由 core 伴发原生 `input` / `change` 事件，Solid 用 `on:input` / `on:change` 手动回写即可（`on:` 前缀直接 addEventListener，不经事件委托）：

```tsx
import { createSignal } from 'solid-js';
import '@wc-kit/solid';

const [name, setName] = createSignal('');
const [on, setOn] = createSignal(false);

<>
  {/* 值类组件：value property + on:input 实时回写 */}
  <wc-input value={name()} on:input={(e) => setName(e.currentTarget.value)} />
  <wc-textarea value={name()} on:input={(e) => setName(e.currentTarget.value)} />
  <wc-select value={name()} on:change={(e) => setName(e.currentTarget.value)}>
    <wc-option value="1">北京</wc-option>
  </wc-select>
  <wc-slider value={level()} on:input={(e) => setLevel(e.currentTarget.value)} />

  {/* 布尔组件：checked property + on:change 回写 */}
  <wc-switch checked={on()} on:change={(e) => setOn(e.currentTarget.checked)} />
  <wc-checkbox checked={on()} on:change={(e) => setOn(e.currentTarget.checked)} />
</>;
```

> `wc-switch` 也可写 `value={on()}`（value 为 checked 的布尔代理）；`wc-input-number` 的原生事件仅在值提交（失焦/回车/步进）时触发。

MIT License
