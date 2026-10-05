// 一次性注册全部自定义元素（副作用导入）
import '@wc-kit/core';

// 将 SvelteHTMLElements 类型增强纳入模块图，确保构建时随 d.ts 一并输出并保留引用
import './svelte-elements.js';

// 导出核心包全部内容，Svelte 项目可从 '@wc-kit/svelte' 单点引入
export * from '@wc-kit/core';
