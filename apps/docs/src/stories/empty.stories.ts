import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import type { wcEmpty } from '@wc/core';

const meta: Meta<wcEmpty> = {
  title: '数据展示/Empty 空状态',
  component: 'wc-empty',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: [
          '空状态组件：默认展示占位图形 + 「暂无数据」文案，均可用插槽自定义，action 插槽可放置操作按钮（如重试）。',
          '',
          '**主要 API**：无属性、无自定义事件，全部能力由插槽提供。',
          '',
          '| 插槽 | 说明 |',
          '| --- | --- |',
          '| （默认） | 描述文案（默认 i18n「暂无数据」） |',
          '| icon | 自定义占位图形 |',
          '| action | 操作区 |',
          '',
          '**React 用法**（@wc/react 包装组件）',
          '',
          '```jsx',
          "import { WcEmpty, WcButton } from '@wc/react';",
          '',
          '<WcEmpty>',
          '  <WcButton slot="action" theme="primary">重新加载</WcButton>',
          '</WcEmpty>',
          '```',
          '',
          '**Vue 用法**（原生标签，@wc/vue 为纯类型增强）',
          '',
          '```vue',
          '<wc-empty>',
          '  <wc-button slot="action" theme="primary">重新加载</wc-button>',
          '</wc-empty>',
          '```',
        ].join('\n'),
      },
    },
  },
  render: () => html`<wc-empty></wc-empty>`,
};

export default meta;
type Story = StoryObj<wcEmpty>;

export const 基础用法: Story = {};

export const 自定义文案: Story = {
  render: () => html`<wc-empty>这里还没有任何订单</wc-empty>`,
  parameters: {
    docs: {
      description: { story: '默认插槽替换「暂无数据」文案。' },
    },
  },
};

export const 自定义占位图形: Story = {
  render: () => html`
    <wc-empty>
      <span slot="icon" style="font-size:48px;" aria-hidden="true">📦</span>
      暂无包裹，去下一单吧
    </wc-empty>
  `,
  parameters: {
    docs: {
      description: { story: 'icon 插槽替换默认占位图形。' },
    },
  },
};

export const 带操作按钮: Story = {
  render: () => html`
    <wc-empty>
      <wc-button slot="action" theme="primary">重新加载</wc-button>
    </wc-empty>
  `,
  parameters: {
    docs: {
      description: { story: 'action 插槽放置操作按钮（如重试）。' },
    },
  },
};
