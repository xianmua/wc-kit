import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import type { wcProgress } from '@wc-kit/core';

const meta: Meta<wcProgress> = {
  title: '数据展示/Progress 进度条',
  component: 'wc-progress',
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'number', description: '进度值 0-100（自动夹紧）' },
    theme: {
      control: 'select',
      options: ['line', 'circle'],
      description: '主题：line 线形 / circle 环形',
    },
    status: {
      control: 'select',
      options: ['normal', 'success', 'warning', 'error'],
      description: '状态色（success/error 附带状态图标）',
    },
    showLabel: { control: 'boolean', description: '是否显示标签文本' },
    strokeWidth: { control: 'number', description: '线形轨道粗细（px）' },
    label: { control: 'text', description: '自定义标签文本（默认显示百分比）' },
  },
  parameters: {
    docs: {
      description: {
        component: [
          '进度条组件：line 线形 / circle 环形两种主题，value 取 0-100 自动夹紧；',
          'status 语义色会同步指示条与标签（success / error 附带状态图标）。',
          '',
          '**主要 API**',
          '',
          '| 属性 | 类型 | 默认值 | 说明 |',
          '| --- | --- | --- | --- |',
          '| value | number | 0 | 进度值 0-100（自动夹紧） |',
          "| theme | 'line' \\| 'circle' | 'line' | 主题 |",
          "| status | 'normal' \\| 'success' \\| 'warning' \\| 'error' | 'normal' | 状态色 |",
          '| show-label | boolean | true | 是否显示标签文本 |',
          '| stroke-width | number | 6 | 线形轨道粗细（px） |',
          "| label | string | '' | 自定义标签文本（默认显示百分比） |",
          '',
          '无自定义事件。',
          '',
          '**React 用法**（@wc-kit/react 包装组件）',
          '',
          '```jsx',
          "import { WcProgress } from '@wc-kit/react';",
          '',
          '<WcProgress value={60} theme="circle" status="success"></WcProgress>',
          '```',
          '',
          '**Vue 用法**（原生标签，@wc-kit/vue 为纯类型增强）',
          '',
          '```vue',
          '<wc-progress :value="60" theme="circle" status="success"></wc-progress>',
          '```',
        ].join('\n'),
      },
    },
  },
  render: (args) => html`<wc-progress
    .value=${args.value}
    theme=${args.theme}
    status=${args.status}
    ?show-label=${args.showLabel}
    .strokeWidth=${args.strokeWidth}
    label=${args.label}
  ></wc-progress>`,
};

export default meta;
type Story = StoryObj<wcProgress>;

export const 基础用法: Story = {
  args: {
    value: 60,
    theme: 'line',
    status: 'normal',
    showLabel: true,
    strokeWidth: 6,
    label: '',
  },
};

export const 线形与环形: Story = {
  render: () => html`
    <div style="display:flex;gap:24px;align-items:center;">
      <wc-progress value="30" style="width:240px;"></wc-progress>
      <wc-progress theme="circle" value="70"></wc-progress>
    </div>
  `,
};

export const 状态色: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:16px;">
      <div style="display:flex;gap:16px;width:360px;">
        <wc-progress value="40" style="flex:1;"></wc-progress>
        <wc-progress value="60" status="success" style="flex:1;"></wc-progress>
        <wc-progress value="80" status="warning" style="flex:1;"></wc-progress>
        <wc-progress value="100" status="error" style="flex:1;"></wc-progress>
      </div>
      <div style="display:flex;gap:16px;">
        <wc-progress theme="circle" value="40"></wc-progress>
        <wc-progress theme="circle" value="60" status="success"></wc-progress>
        <wc-progress theme="circle" value="80" status="warning"></wc-progress>
        <wc-progress theme="circle" value="100" status="error"></wc-progress>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: '依次为 normal / success / warning / error，success 与 error 附带状态图标。',
      },
    },
  },
};

export const 自定义标签与轨道粗细: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:16px;width:360px;">
      <wc-progress value="80" label="已加载 80%"></wc-progress>
      <wc-progress value="45" stroke-width="12"></wc-progress>
      <wc-progress value="66" .showLabel=${false}></wc-progress>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: '依次演示 label 自定义文案、stroke-width=12 加粗轨道、show-label=false 隐藏标签。',
      },
    },
  },
};
