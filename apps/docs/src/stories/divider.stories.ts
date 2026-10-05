import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import type { wcDivider } from '@wc-kit/core';

const meta: Meta<wcDivider & { content: string }> = {
  title: '基础组件/Divider 分隔线',
  component: 'wc-divider',
  tags: ['autodocs'],
  argTypes: {
    dashed: { control: 'boolean', description: '虚线' },
    align: {
      control: 'select',
      options: ['left', 'center', 'right'],
      description: '水平模式下文案位置',
    },
    vertical: { control: 'boolean', description: '竖向分隔线（忽略插槽内容）' },
  },
  parameters: {
    docs: {
      description: {
        component: `分隔线组件。水平模式为默认形态，可在插槽中携带文案（文案位置由 align 控制，无文案时渲染通栏直线）；设置 vertical 后渲染竖向分隔线，插槽内容会被忽略。

主要 API：\`dashed\` 虚线、\`align\` 文案位置（left / center / right，默认 center）、\`vertical\` 竖向分隔。无自定义事件。

React 用法（\`@wc-kit/react\` 包装组件）：

\`\`\`tsx
import { WcDivider } from '@wc-kit/react';

<WcDivider>或者</WcDivider>
<WcDivider dashed align="left">标题</WcDivider>
<WcDivider vertical />
\`\`\`

Vue 用法（\`@wc-kit/vue\` 为纯类型增强包，直接使用原生标签）：

\`\`\`vue
<template>
  <wc-divider>或者</wc-divider>
  <wc-divider dashed align="left">标题</wc-divider>
  <wc-divider vertical></wc-divider>
</template>
\`\`\``,
      },
    },
  },
  render: (args) => html`<wc-divider
    ?dashed=${args.dashed}
    align=${args.align}
    ?vertical=${args.vertical}
  >
    ${args.content}
  </wc-divider>`,
};

export default meta;
type Story = StoryObj<wcDivider & { content: string }>;

export const 基础用法: Story = {
  args: { content: '分隔线文案', dashed: false, align: 'center', vertical: false },
};

export const 文案位置: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:16px;">
      <wc-divider align="left">左</wc-divider>
      <wc-divider align="center">中</wc-divider>
      <wc-divider align="right">右</wc-divider>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'align 控制文案位置，默认 center；不传插槽内容时渲染通栏直线。',
      },
    },
  },
};

export const 虚线: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:16px;">
      <wc-divider dashed>虚线 + 文案</wc-divider>
      <wc-divider dashed></wc-divider>
    </div>
  `,
};

export const 竖向分隔线: Story = {
  render: () => html`
    <div style="display:flex;gap:12px;align-items:center;">
      <span>首页</span>
      <wc-divider vertical></wc-divider>
      <span>列表</span>
      <wc-divider vertical></wc-divider>
      <wc-button variant="text">详情</wc-button>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'vertical 渲染竖向分隔线，常用于操作按钮或面包屑之间。',
      },
    },
  },
};
