import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import type { wcBadge } from '@wc-kit/core';

const meta: Meta<wcBadge & { label: string }> = {
  title: '数据展示/Badge 徽标',
  component: 'wc-badge',
  tags: ['autodocs'],
  argTypes: {
    count: { control: 'number', description: '徽标数字（<= 0 隐藏）' },
    max: { control: 'number', description: '数字上限，超出显示「max+」' },
    dot: { control: 'boolean', description: '圆点模式（忽略 count，恒显示）' },
    theme: {
      control: 'select',
      options: ['primary', 'success', 'warning', 'danger'],
      description: '语义色',
    },
  },
  parameters: {
    docs: {
      description: {
        component: [
          '徽标组件：出现在右上角的数字或圆点标记，包裹内容时悬浮于其右上角，无内容时独立展示。',
          'count 为 0 时隐藏（dot 模式恒显示），count 超过 max 显示「max+」。',
          '',
          '**主要 API**：count（徽标数字，<= 0 隐藏，默认 0）、max（数字上限，默认 99）、',
          'dot（圆点模式，默认 false）、theme（语义色：primary / success / warning / danger，默认 danger）。',
          '默认插槽为被标记的内容（可空，空时独立展示）。无自定义事件。',
          '',
          '**React 用法**（@wc-kit/react 包装组件）',
          '',
          '```jsx',
          "import { WcBadge } from '@wc-kit/react';",
          '',
          '<WcBadge count={5} max={99} theme="danger">',
          '  <span>消息</span>',
          '</WcBadge>',
          '```',
          '',
          '**Vue 用法**（原生标签，@wc-kit/vue 为纯类型增强）',
          '',
          '```vue',
          '<wc-badge :count="5" :max="99" theme="danger">',
          '  <span>消息</span>',
          '</wc-badge>',
          '```',
        ].join('\n'),
      },
    },
  },
  render: (args) => html`<wc-badge
    .count=${args.count}
    .max=${args.max}
    ?dot=${args.dot}
    theme=${args.theme}
  >
    ${args.label}
  </wc-badge>`,
};

export default meta;
type Story = StoryObj<wcBadge & { label: string }>;

export const 基础用法: Story = {
  args: {
    label: '消息',
    count: 5,
    max: 99,
    dot: false,
    theme: 'danger',
  },
};

export const 主题色: Story = {
  render: () => html`
    <div style="display:flex;gap:12px;align-items:center;">
      <wc-badge count="8" theme="primary"><span>主要</span></wc-badge>
      <wc-badge count="8" theme="success"><span>成功</span></wc-badge>
      <wc-badge count="8" theme="warning"><span>警告</span></wc-badge>
      <wc-badge count="8" theme="danger"><span>危险</span></wc-badge>
    </div>
  `,
};

export const 圆点模式: Story = {
  render: () => html`
    <div style="display:flex;gap:24px;align-items:center;">
      <wc-badge dot></wc-badge>
      <wc-badge dot theme="primary"><span>消息中心</span></wc-badge>
      <wc-badge dot theme="success"><span>在线客服</span></wc-badge>
    </div>
  `,
  parameters: {
    docs: {
      description: { story: 'dot 模式忽略 count，无论是否包裹内容都恒显示。' },
    },
  },
};

export const 数字上限: Story = {
  render: () => html`
    <div style="display:flex;gap:24px;align-items:center;">
      <wc-badge count="120"><span>默认 max=99</span></wc-badge>
      <wc-badge count="120" max="20"><span>max=20</span></wc-badge>
      <wc-badge count="99" max="99"><span>恰好 99</span></wc-badge>
    </div>
  `,
  parameters: {
    docs: {
      description: { story: 'count 超过 max 时显示「max+」；恰好等于 max 时正常显示数字。' },
    },
  },
};

export const 独立展示与隐藏: Story = {
  render: () => html`
    <div style="display:flex;gap:24px;align-items:center;">
      <wc-badge count="8"></wc-badge>
      <wc-badge count="0"><span>count 为 0 时隐藏</span></wc-badge>
      <wc-badge count="5"><span>包裹内容时悬浮于右上角</span></wc-badge>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: '无默认插槽内容时徽标独立展示（第一个）；count 为 0 时徽标隐藏（dot 模式除外）。',
      },
    },
  },
};
