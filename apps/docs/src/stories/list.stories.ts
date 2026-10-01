import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import type { wcList } from '@wc/core';

const meta: Meta<wcList & { items: string[] }> = {
  title: '数据展示/List 列表',
  component: 'wc-list',
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: '条目密度',
    },
    striped: { control: 'boolean', description: '斑马纹' },
    hoverable: { control: 'boolean', description: '条目悬浮高亮' },
  },
  parameters: {
    docs: {
      description: {
        component: [
          '列表组件：子条目用 light-DOM 的 wc-list-item 声明，容器通过 ::slotted 统一提供分隔线 / 斑马纹 / 悬浮反馈；',
          '无条目时回退渲染 empty 插槽（默认渲染内置 wc-empty）。',
          '',
          '**主要 API**',
          '',
          '| 属性 | 类型 | 默认值 | 说明 |',
          '| --- | --- | --- | --- |',
          "| size | 'small' \\| 'medium' \\| 'large' | 'medium' | 条目密度 |",
          '| striped | boolean | false | 斑马纹 |',
          '| hoverable | boolean | false | 条目悬浮高亮 |',
          '',
          '**插槽**：默认（列表条目 wc-list-item）、empty（空状态，默认 wc-empty）。无自定义事件。',
          '',
          '**React 用法**（@wc/react 包装组件）',
          '',
          '```jsx',
          "import { WcList, WcListItem } from '@wc/react';",
          '',
          '<WcList striped hoverable>',
          '  <WcListItem>条目一</WcListItem>',
          '  <WcListItem>条目二</WcListItem>',
          '</WcList>',
          '```',
          '',
          '**Vue 用法**（原生标签，@wc/vue 为纯类型增强）',
          '',
          '```vue',
          '<wc-list striped hoverable>',
          '  <wc-list-item>条目一</wc-list-item>',
          '  <wc-list-item>条目二</wc-list-item>',
          '</wc-list>',
          '```',
        ].join('\n'),
      },
    },
  },
  render: (args) => html`<wc-list
    size=${args.size}
    ?striped=${args.striped}
    ?hoverable=${args.hoverable}
  >
    ${args.items.map((item) => html`<wc-list-item>${item}</wc-list-item>`)}
  </wc-list>`,
};

export default meta;
type Story = StoryObj<wcList & { items: string[] }>;

export const 基础用法: Story = {
  args: {
    items: ['条目一', '条目二', '条目三'],
    size: 'medium',
    striped: false,
    hoverable: false,
  },
};

export const 密度: Story = {
  render: () => html`
    <div style="display:flex;gap:24px;align-items:flex-start;">
      <div style="flex:1;">
        <p style="margin:0 0 8px;">small</p>
        <wc-list size="small">
          <wc-list-item>条目一</wc-list-item>
          <wc-list-item>条目二</wc-list-item>
        </wc-list>
      </div>
      <div style="flex:1;">
        <p style="margin:0 0 8px;">medium（默认）</p>
        <wc-list>
          <wc-list-item>条目一</wc-list-item>
          <wc-list-item>条目二</wc-list-item>
        </wc-list>
      </div>
      <div style="flex:1;">
        <p style="margin:0 0 8px;">large</p>
        <wc-list size="large">
          <wc-list-item>条目一</wc-list-item>
          <wc-list-item>条目二</wc-list-item>
        </wc-list>
      </div>
    </div>
  `,
};

export const 斑马纹与悬浮: Story = {
  render: () => html`
    <wc-list striped hoverable style="max-width:420px;">
      <wc-list-item>北京 <span style="float:right;color:#999;">010</span></wc-list-item>
      <wc-list-item>上海 <span style="float:right;color:#999;">021</span></wc-list-item>
      <wc-list-item>广州 <span style="float:right;color:#999;">020</span></wc-list-item>
      <wc-list-item>深圳 <span style="float:right;color:#999;">0755</span></wc-list-item>
    </wc-list>
  `,
  parameters: {
    docs: {
      description: {
        story: 'striped 开启斑马纹，hoverable 开启条目悬浮高亮；条目内可放任意元素。',
      },
    },
  },
};

export const 空状态: Story = {
  render: () => html`
    <div style="display:flex;gap:32px;align-items:flex-start;">
      <div style="flex:1;">
        <p style="margin:0 0 8px;">默认空状态（内置 wc-empty）</p>
        <wc-list></wc-list>
      </div>
      <div style="flex:1;">
        <p style="margin:0 0 8px;">自定义 empty 插槽</p>
        <wc-list>
          <wc-button slot="empty" theme="primary">去创建</wc-button>
        </wc-list>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: { story: '无条目时回退渲染内置 wc-empty，可用 empty 插槽覆盖。' },
    },
  },
};
