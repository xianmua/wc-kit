import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import type { wcText } from '@wc/core';

const meta: Meta<wcText & { content: string }> = {
  title: '基础组件/Typography 排版',
  component: 'wc-text',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['text', 'heading'],
      description: '变体：正文 / 标题',
    },
    level: {
      control: 'number',
      description: '标题级别（仅 variant=heading 生效，1~6，默认 3）',
    },
    type: {
      control: 'select',
      options: ['default', 'secondary', 'success', 'warning', 'danger'],
      description: '语义色',
    },
    disabled: { control: 'boolean', description: '禁用态（灰字 + not-allowed 光标）' },
  },
  parameters: {
    docs: {
      description: {
        component: `排版文本组件（\`wc-text\`）。variant 为 text 时渲染正文，为 heading 时按 level（1~6）渲染对应字号，并输出 role="heading" + aria-level 保持无障碍语义。

主要 API：\`variant\` 变体（text / heading，默认 text）、\`level\` 标题级别（仅 heading 生效，1~6，默认 3）、\`type\` 语义色（default / secondary / success / warning / danger）、\`disabled\` 禁用态。内容走默认插槽，无自定义事件。

React 用法（\`@wc/react\` 包装组件）：

\`\`\`tsx
import { WcText } from '@wc/react';

<WcText>正文内容</WcText>
<WcText variant="heading" level={2}>二级标题</WcText>
<WcText type="danger">危险提示文字</WcText>
\`\`\`

Vue 用法（\`@wc/vue\` 为纯类型增强包，直接使用原生标签）：

\`\`\`vue
<template>
  <wc-text>正文内容</wc-text>
  <wc-text variant="heading" :level="2">二级标题</wc-text>
  <wc-text type="danger">危险提示文字</wc-text>
</template>
\`\`\``,
      },
    },
  },
  render: (args) => html`<wc-text
    variant=${args.variant}
    .level=${args.level}
    type=${args.type}
    ?disabled=${args.disabled}
  >
    ${args.content}
  </wc-text>`,
};

export default meta;
type Story = StoryObj<wcText & { content: string }>;

export const 基础用法: Story = {
  args: {
    content: '这是一段正文文本。',
    variant: 'text',
    level: 3,
    type: 'default',
    disabled: false,
  },
};

export const 标题: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:8px;">
      <wc-text variant="heading" .level=${1}>一级标题</wc-text>
      <wc-text variant="heading" .level=${2}>二级标题</wc-text>
      <wc-text variant="heading" .level=${3}>三级标题</wc-text>
      <wc-text variant="heading" .level=${4}>四级标题</wc-text>
      <wc-text variant="heading" .level=${5}>五级标题</wc-text>
      <wc-text variant="heading" .level=${6}>六级标题</wc-text>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'heading 按 level（1~6）渲染对应语义与字号，输出 role="heading" + aria-level。',
      },
    },
  },
};

export const 语义色: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:8px;">
      <wc-text>默认文本</wc-text>
      <wc-text type="secondary">次要文本</wc-text>
      <wc-text type="success">成功文本</wc-text>
      <wc-text type="warning">警告文本</wc-text>
      <wc-text type="danger">危险文本</wc-text>
    </div>
  `,
};

export const 禁用态: Story = {
  render: () => html`
    <div style="display:flex;gap:12px;align-items:center;">
      <wc-text disabled>禁用文本（灰字 + not-allowed 光标）</wc-text>
      <wc-text variant="heading" .level=${4} disabled>禁用标题</wc-text>
    </div>
  `,
};
