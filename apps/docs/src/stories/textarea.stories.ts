import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import type { wcTextarea } from '@wc-kit/core';

const meta: Meta<wcTextarea> = {
  title: '表单组件/Textarea 多行输入框',
  component: 'wc-textarea',
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'text', description: '文本框的值（响应式属性，同时作为表单值提交）' },
    placeholder: { control: 'text', description: '占位提示' },
    label: { control: 'text', description: '无障碍标签（等价原生 aria-label）' },
    maxlength: { control: 'number', description: '最大输入长度，设置后显示字数统计' },
    rows: { control: 'number', description: '默认行数（autosize 关闭时生效）' },
    autosize: { control: 'boolean', description: '自动按内容调整高度' },
    readonly: { control: 'boolean', description: '只读' },
    status: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error'],
      description: '校验状态（影响边框色）',
    },
    name: { control: 'text', description: '提交到表单的字段名' },
    disabled: { control: 'boolean', description: '是否禁用' },
  },
  parameters: {
    docs: {
      description: {
        component: `
多行文本框组件。基于 ElementInternals 接入原生 form，value / name / disabled 可随表单提交与重置。

**属性**

- \`value\`：文本值，string，默认 ''
- \`placeholder\`：占位提示
- \`label\`：无障碍标签（等价原生 aria-label）
- \`maxlength\`：最大输入长度，number，设置后右下角显示字数统计
- \`rows\`：默认行数，number，默认 3（autosize 关闭时生效）
- \`autosize\`：自动按内容调整高度，布尔，默认 false
- \`readonly\` / \`disabled\`：只读 / 禁用
- \`status\`：校验状态 'default' | 'success' | 'warning' | 'error'，默认 'default'
- \`name\`：提交到表单的字段名

**事件**

- \`wc-input\`：输入时触发，detail.value
- \`wc-change\`：值变更提交时触发（失焦），detail.value

**React 用法**

\`\`\`tsx
import { WcTextarea } from '@wc-kit/react';

<WcTextarea
  placeholder="请输入个人简介"
  maxlength={200}
  autosize
  onWcChange={(e) => console.log(e.detail.value)}
/>
\`\`\`

**Vue 用法**

\`\`\`html
<!-- @wc-kit/vue 仅提供类型增强，直接使用原生标签。
     不要使用原生 v-model（它绑定 value + 原生 input 事件），
     组件派发的是 wc-input / wc-change（detail.value）。 -->
<wc-textarea
  :value="intro"
  placeholder="请输入个人简介"
  :maxlength="200"
  autosize
  @wc-input="(e) => (intro = e.detail.value)"
></wc-textarea>
\`\`\`
`,
      },
    },
  },
  render: (args) => html`<wc-textarea
    value=${args.value}
    placeholder=${args.placeholder}
    label=${args.label}
    .maxlength=${args.maxlength}
    .rows=${args.rows}
    ?autosize=${args.autosize}
    ?readonly=${args.readonly}
    status=${args.status}
    name=${args.name}
    ?disabled=${args.disabled}
  ></wc-textarea>`,
};

export default meta;
type Story = StoryObj<wcTextarea>;

export const 基础用法: Story = {
  args: {
    value: '',
    placeholder: '请输入内容',
    label: '',
    rows: 3,
    autosize: false,
    readonly: false,
    status: 'default',
    name: '',
    disabled: false,
  },
};

export const 字数统计: Story = {
  render: () => html`
    <wc-textarea
      style="width:320px"
      maxlength="100"
      placeholder="最多输入 100 个字，右下角显示字数统计"
    ></wc-textarea>
  `,
  parameters: {
    docs: {
      description: { story: '设置 maxlength 后自动在右下角显示「当前字数 / 最大字数」。' },
    },
  },
};

export const 自动高度: Story = {
  render: () => html`
    <div style="display:flex;gap:12px;align-items:flex-start;">
      <wc-textarea
        style="width:240px"
        autosize
        placeholder="autosize：随内容自动增高"
      ></wc-textarea>
      <wc-textarea style="width:240px" rows="5" placeholder="rows=5：固定 5 行"></wc-textarea>
    </div>
  `,
};

export const 状态: Story = {
  render: () => html`
    <div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;">
      <wc-textarea style="width:200px" status="success" placeholder="成功 success"></wc-textarea>
      <wc-textarea style="width:200px" status="warning" placeholder="警告 warning"></wc-textarea>
      <wc-textarea style="width:200px" status="error" placeholder="错误 error"></wc-textarea>
      <wc-textarea style="width:200px" value="只读内容" readonly></wc-textarea>
      <wc-textarea style="width:200px" value="禁用内容" disabled></wc-textarea>
    </div>
  `,
};
