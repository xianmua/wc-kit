import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import type { wcCard } from '@wc-kit/core';

const meta: Meta<wcCard & { content: string }> = {
  title: '数据展示/Card 卡片',
  component: 'wc-card',
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text', description: '卡片标题' },
    subtitle: { control: 'text', description: '副标题（title 右侧小字）' },
    bordered: { control: 'boolean', description: '显示边框' },
    hoverable: { control: 'boolean', description: '悬浮时展示阴影' },
  },
  parameters: {
    docs: {
      description: {
        component: [
          '卡片组件：header 区由 title / subtitle 属性或 header 插槽组成，actions 插槽放标题右侧操作区，',
          'footer 插槽放底部操作区（对应插槽有内容才渲染对应区域；header 插槽会覆盖 title / subtitle）。',
          '',
          '**主要 API**',
          '',
          '| 属性 | 类型 | 默认值 | 说明 |',
          '| --- | --- | --- | --- |',
          "| title | string | '' | 卡片标题 |",
          "| subtitle | string | '' | 副标题（title 右侧小字） |",
          '| bordered | boolean | true | 显示边框 |',
          '| hoverable | boolean | false | 悬浮时展示阴影 |',
          '',
          '**插槽**：默认（卡片内容）、header（自定义整个头部）、actions（头部右侧操作区）、',
          'footer（底部操作区）。无自定义事件。',
          '',
          '**React 用法**（@wc-kit/react 包装组件）',
          '',
          '```jsx',
          "import { WcCard, WcButton } from '@wc-kit/react';",
          '',
          '<WcCard title="卡片标题" subtitle="副标题" hoverable>',
          '  <p>卡片内容</p>',
          '  <WcButton slot="footer" theme="primary">操作</WcButton>',
          '</WcCard>',
          '```',
          '',
          '**Vue 用法**（原生标签，@wc-kit/vue 为纯类型增强）',
          '',
          '```vue',
          '<wc-card title="卡片标题" subtitle="副标题" hoverable>',
          '  <p>卡片内容</p>',
          '  <wc-button slot="footer" theme="primary">操作</wc-button>',
          '</wc-card>',
          '```',
        ].join('\n'),
      },
    },
  },
  render: (args) => html`<wc-card
    title=${args.title}
    subtitle=${args.subtitle}
    ?bordered=${args.bordered}
    ?hoverable=${args.hoverable}
    style="max-width: 420px;"
  >
    ${args.content}
  </wc-card>`,
};

export default meta;
type Story = StoryObj<wcCard & { content: string }>;

export const 基础用法: Story = {
  args: {
    title: '卡片标题',
    subtitle: '副标题',
    content: '这是一段卡片内容，放在默认插槽中。',
    bordered: true,
    hoverable: false,
  },
};

export const 头部操作与底部: Story = {
  render: () => html`
    <wc-card title="项目列表" subtitle="共 12 个" style="max-width: 420px;">
      <wc-button slot="actions" variant="text" size="small">更多</wc-button>
      <p style="margin:0;">卡片主体内容，支持任意元素。</p>
      <wc-button slot="footer" theme="primary">保存</wc-button>
      <wc-button slot="footer">取消</wc-button>
    </wc-card>
  `,
  parameters: {
    docs: {
      description: { story: 'actions 插槽放标题右侧操作区，footer 插槽放底部操作区。' },
    },
  },
};

export const 自定义头部: Story = {
  render: () => html`
    <wc-card style="max-width: 420px;">
      <div slot="header" style="display:flex;align-items:center;gap:12px;">
        <strong>自定义头部</strong>
        <span style="color:#999;font-size:12px;">header 插槽覆盖 title / subtitle</span>
      </div>
      <p style="margin:0;">header 插槽有内容时，整个头部由该插槽渲染。</p>
    </wc-card>
  `,
};

export const 边框与悬浮: Story = {
  render: () => html`
    <div style="display:flex;gap:16px;align-items:flex-start;">
      <wc-card .bordered=${false} title="无边框卡片" style="width:240px;">
        <p style="margin:0;">bordered 为 false 时移除边框。</p>
      </wc-card>
      <wc-card hoverable title="悬浮阴影卡片" style="width:240px;">
        <p style="margin:0;">鼠标悬浮时展示阴影（hoverable）。</p>
      </wc-card>
    </div>
  `,
};
