import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { registerBuiltinIcons } from '@wc-kit/core';
import type { wcAvatar } from '@wc-kit/core';

// 图标头像示例依赖内置图标注册
registerBuiltinIcons();

// 内联 SVG 数据，避免演示依赖外部图片资源
const DEMO_IMG =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48">' +
      '<rect width="48" height="48" fill="#4b5563"/>' +
      '<text x="24" y="31" font-size="20" fill="#fff" text-anchor="middle">图</text></svg>',
  );

const meta: Meta<wcAvatar & { content: string }> = {
  title: '基础组件/Avatar 头像',
  component: 'wc-avatar',
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: '尺寸：三档预设之一，也接受任意 CSS 尺寸值（如 48px，纯数字按 px 处理）',
    },
    shape: {
      control: 'select',
      options: ['circle', 'round', 'square'],
      description: '形状',
    },
  },
  parameters: {
    docs: {
      description: {
        component: `头像组件。内容走默认插槽，放文字 / 图片 / 图标均可。

主要 API：\`size\` 尺寸（small / medium / large 三档预设，或任意 CSS 尺寸值如 "48px"、"3rem"，纯数字按 px 处理）、\`shape\` 形状（circle 圆形 / round 圆角矩形 / square 方形，默认 circle）。无自定义事件。自定义尺寸时也可直接覆写 CSS 变量 \`--wc-avatar-size\`。

React 用法（\`@wc-kit/react\` 包装组件）：

\`\`\`tsx
import { WcAvatar } from '@wc-kit/react';

<WcAvatar>张</WcAvatar>
<WcAvatar size={48} shape="square">图</WcAvatar>
\`\`\`

Vue 用法（\`@wc-kit/vue\` 为纯类型增强包，直接使用原生标签）：

\`\`\`vue
<template>
  <wc-avatar>张</wc-avatar>
  <wc-avatar size="48" shape="square">图</wc-avatar>
</template>
\`\`\``,
      },
    },
  },
  render: (args) => html`<wc-avatar size=${args.size} shape=${args.shape}>
    ${args.content}
  </wc-avatar>`,
};

export default meta;
type Story = StoryObj<wcAvatar & { content: string }>;

export const 基础用法: Story = {
  args: { content: '张', size: 'medium', shape: 'circle' },
};

export const 形状: Story = {
  render: () => html`
    <div style="display:flex;gap:12px;align-items:center;">
      <wc-avatar shape="circle">圆</wc-avatar>
      <wc-avatar shape="round">圆角</wc-avatar>
      <wc-avatar shape="square">方形</wc-avatar>
    </div>
  `,
};

export const 尺寸: Story = {
  render: () => html`
    <div style="display:flex;gap:12px;align-items:center;">
      <wc-avatar size="small">小</wc-avatar>
      <wc-avatar size="medium">中</wc-avatar>
      <wc-avatar size="large">大</wc-avatar>
      <!-- 预设档位之外，接受任意 CSS 尺寸（纯数字按 px 处理） -->
      <wc-avatar size="48">48px</wc-avatar>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: '预设三档之外，size 支持任意 CSS 尺寸值（如 "48px"、"3rem"），纯数字按 px 处理。',
      },
    },
  },
};

export const 内容类型: Story = {
  render: () => html`
    <div style="display:flex;gap:12px;align-items:center;">
      <wc-avatar>文</wc-avatar>
      <wc-avatar>
        <img src=${DEMO_IMG} alt="头像" style="width:100%;height:100%;object-fit:cover;" />
      </wc-avatar>
      <wc-avatar><wc-icon name="plus"></wc-icon></wc-avatar>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: '默认插槽可放文字、图片（铺满裁剪）或图标。',
      },
    },
  },
};
