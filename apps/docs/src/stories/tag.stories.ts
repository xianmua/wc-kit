import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { registerBuiltinIcons } from '@wc-kit/core';
import type { wcTag } from '@wc-kit/core';

// 可关闭标签内置的 close 图标、icon 插槽示例均依赖内置图标注册
registerBuiltinIcons();

const meta: Meta<wcTag & { label: string }> = {
  title: '基础组件/Tag 标签',
  component: 'wc-tag',
  tags: ['autodocs'],
  argTypes: {
    theme: {
      control: 'select',
      options: ['default', 'primary', 'success', 'warning', 'danger'],
      description: '语义色',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: '尺寸',
    },
    variant: {
      control: 'select',
      options: ['dark', 'light', 'outline'],
      description: '填充风格：dark 实底 / light 浅底 / outline 描边',
    },
    closable: { control: 'boolean', description: '可关闭（展示关闭按钮）' },
    disabled: { control: 'boolean', description: '禁用' },
  },
  parameters: {
    docs: {
      description: {
        component: `标签组件。内容走默认插槽，前置图标走 icon 插槽（可放 wc-icon 等任意元素）。设置 closable 后展示关闭按钮，点击派发 \`wc-close\` 事件，是否移除标签由使用方控制。

主要 API：\`theme\` 语义色（default / primary / success / warning / danger）、\`size\` 尺寸（small / medium / large）、\`variant\` 填充风格（dark 实底 / light 浅底 / outline 描边，默认 light）、\`closable\` 可关闭、\`disabled\` 禁用。事件：\`wc-close\`。

React 用法（\`@wc-kit/react\` 包装组件）：

\`\`\`tsx
import { WcTag } from '@wc-kit/react';

<WcTag theme="success">成功</WcTag>
<WcTag
  theme="primary"
  closable
  onWcClose={() => console.log('close')}
>
  可关闭
</WcTag>
\`\`\`

Vue 用法（\`@wc-kit/vue\` 为纯类型增强包，直接使用原生标签）：

\`\`\`vue
<template>
  <wc-tag theme="success">成功</wc-tag>
  <wc-tag theme="primary" closable @wc-close="onClose">可关闭</wc-tag>
</template>
\`\`\``,
      },
    },
  },
  render: (args) => html`<wc-tag
    theme=${args.theme}
    size=${args.size}
    variant=${args.variant}
    ?closable=${args.closable}
    ?disabled=${args.disabled}
  >
    ${args.label}
  </wc-tag>`,
};

export default meta;
type Story = StoryObj<wcTag & { label: string }>;

export const 基础用法: Story = {
  args: {
    label: '标签',
    theme: 'default',
    size: 'medium',
    variant: 'light',
    closable: false,
    disabled: false,
  },
};

export const 主题色: Story = {
  render: () => html`
    <div style="display:flex;gap:12px;align-items:center;">
      <wc-tag>默认</wc-tag>
      <wc-tag theme="primary">主要</wc-tag>
      <wc-tag theme="success">成功</wc-tag>
      <wc-tag theme="warning">警告</wc-tag>
      <wc-tag theme="danger">危险</wc-tag>
    </div>
  `,
};

export const 填充风格: Story = {
  render: () => html`
    <div style="display:flex;gap:12px;align-items:center;">
      <wc-tag theme="primary" variant="dark">dark</wc-tag>
      <wc-tag theme="primary" variant="light">light</wc-tag>
      <wc-tag theme="primary" variant="outline">outline</wc-tag>
    </div>
  `,
};

export const 尺寸: Story = {
  render: () => html`
    <div style="display:flex;gap:12px;align-items:center;">
      <wc-tag size="small">小号</wc-tag>
      <wc-tag size="medium">中号</wc-tag>
      <wc-tag size="large">大号</wc-tag>
    </div>
  `,
};

export const 可关闭: Story = {
  // 演示：点击关闭按钮派发 wc-close，是否移除由使用方决定
  render: () => {
    const onClose = (e: Event) => (e.target as HTMLElement).remove();
    return html`
      <div style="display:flex;gap:12px;align-items:center;">
        <wc-tag closable @wc-close=${onClose}>标签一</wc-tag>
        <wc-tag theme="primary" closable @wc-close=${onClose}>标签二</wc-tag>
        <wc-tag theme="danger" variant="outline" closable disabled>禁用关闭</wc-tag>
      </div>
    `;
  },
  parameters: {
    docs: {
      description: {
        story: '点击关闭按钮派发 wc-close 事件（此演示中直接移除标签），禁用状态下点击无效。',
      },
    },
  },
};

export const 前置图标: Story = {
  render: () => html`
    <div style="display:flex;gap:12px;align-items:center;">
      <wc-tag theme="primary"><wc-icon slot="icon" name="info"></wc-icon>提示</wc-tag>
      <wc-tag theme="success"><wc-icon slot="icon" name="check"></wc-icon>已完成</wc-tag>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'icon 插槽放前置图标（内置图标需先注册），内容走默认插槽。',
      },
    },
  },
};
