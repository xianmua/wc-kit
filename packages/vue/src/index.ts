// 一次性注册全部自定义元素（副作用导入）
import '@wc-kit/core';

// 将 GlobalComponents 类型增强纳入模块图，确保构建时随 d.ts 一并输出并保留引用
import './global-components.js';

// 导出核心包全部内容，Vue 项目可从 '@wc-kit/vue' 单点引入
export * from '@wc-kit/core';
