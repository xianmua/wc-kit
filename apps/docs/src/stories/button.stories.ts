import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import type { wcButton } from '@wc-kit/core';

const meta: Meta<wcButton & { label: string }> = {
  title: '基础组件/Button 按钮',
  component: 'wc-button',
  tags: ['autodocs'],
  argTypes: {
    theme: {
      control: 'select',
      options: ['default', 'primary', 'success', 'warning', 'danger'],
      description: '按钮主题色',
    },
    variant: {
      control: 'select',
      options: ['base', 'outline', 'text', 'dashed', 'link'],
      description: '按钮样式变体',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: '按钮尺寸',
    },
    block: { control: 'boolean', description: '宽度撑满父容器' },
    disabled: { control: 'boolean', description: '是否禁用' },
    loading: { control: 'boolean', description: '加载中状态（显示旋转图标并阻止点击）' },
  },
  parameters: {
    docs: {
      description: {
        component:
          '按钮组件。内容走默认插槽，前置图标走 icon 插槽；点击为原生 click 事件（无自定义事件）。',
      },
    },
  },
  render: (args) => html`<wc-button
    theme=${args.theme}
    variant=${args.variant}
    size=${args.size}
    ?block=${args.block}
    ?disabled=${args.disabled}
    ?loading=${args.loading}
  >
    ${args.label}
  </wc-button>`,
};

export default meta;
type Story = StoryObj<wcButton & { label: string }>;

export const 基础用法: Story = {
  args: { label: '按钮', theme: 'primary', variant: 'base', size: 'medium' },
};

export const 主题色: Story = {
  render: () => html`
    <div style="display:flex;gap:12px;align-items:center;">
      <wc-button>默认</wc-button>
      <wc-button theme="primary">主要</wc-button>
      <wc-button theme="success">成功</wc-button>
      <wc-button theme="warning">警告</wc-button>
      <wc-button theme="danger">危险</wc-button>
    </div>
  `,
};

export const 变体: Story = {
  render: () => html`
    <div style="display:flex;gap:12px;align-items:center;">
      <wc-button theme="primary" variant="base">base</wc-button>
      <wc-button theme="primary" variant="outline">outline</wc-button>
      <wc-button theme="primary" variant="text">text</wc-button>
      <wc-button theme="primary" variant="dashed">dashed</wc-button>
      <wc-button theme="primary" variant="link">link</wc-button>
    </div>
  `,
};

export const 尺寸: Story = {
  render: () => html`
    <div style="display:flex;gap:12px;align-items:center;">
      <wc-button size="small">小号</wc-button>
      <wc-button size="medium">中号</wc-button>
      <wc-button size="large">大号</wc-button>
    </div>
  `,
};

export const 状态: Story = {
  render: () => html`
    <div style="display:flex;gap:12px;align-items:center;">
      <wc-button theme="primary" disabled>禁用</wc-button>
      <wc-button theme="primary" loading>加载中</wc-button>
    </div>
    <div style="margin-top:12px;">
      <wc-button theme="primary" block>块级按钮（block）</wc-button>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          'block 单独一行撑满宽度；注意 block 与普通按钮不要放在同一 flex 行，否则会挤压其它按钮宽度。',
      },
    },
  },
};
