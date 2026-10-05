# @wc-kit/svelte

[@wc-kit/core](https://www.npmjs.com/package/@wc-kit/core) Web Components 的 Svelte 类型定义与单点引入入口。

Svelte 4/5 原生支持自定义元素：模板中直接写 `<wc-button>`，Svelte 会检测元素实例上的同名 property 并优先设 property（对象数组、函数等复杂值原样传入）。本包只做两件事：

1. **副作用导入** `@wc-kit/core`，一次性注册全部自定义元素
2. **类型增强** `svelte/elements` 的 `SvelteHTMLElements`，让 `<wc-*>` 标签获得完整的属性类型检查

## 安装

```bash
pnpm add @wc-kit/svelte
```

## 使用

```svelte
<script lang="ts">
  import '@wc-kit/svelte';

  let name = '张三';
</script>

<wc-button theme="primary" onclick={() => console.log(name)}>按钮</wc-button>
```

事件监听用 Svelte 5 的事件属性语法（`onwc-change`）或 Svelte 4 的 `on:wc-change`：

```svelte
<script lang="ts">
  import '@wc-kit/svelte';

  const onChange = (e) => console.log(e.detail);
</script>

<wc-pagination total="100" onwc-change={onChange}></wc-pagination>
```

> Svelte 项目若开启了 svelte-check，`@wc-kit/svelte` 导入一次即可让全部 `<wc-*>` 标签获得类型提示。

MIT License
