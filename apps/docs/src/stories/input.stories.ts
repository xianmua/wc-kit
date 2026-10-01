import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import type { wcInput } from '@wc/core';

const meta: Meta<wcInput> = {
  title: '表单组件/Input 输入框',
  component: 'wc-input',
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'text', description: '输入框的值（响应式属性，同时作为表单值提交）' },
    type: { control: 'text', description: '输入框类型（text/password/tel/url/search 等原生类型）' },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: '尺寸',
    },
    placeholder: { control: 'text', description: '占位提示' },
    label: { control: 'text', description: '无障碍标签（等价原生 aria-label）' },
    maxlength: { control: 'number', description: '最大输入长度' },
    readonly: { control: 'boolean', description: '只读' },
    clearable: { control: 'boolean', description: '显示清除按钮（有值且非禁用/只读时）' },
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
输入框组件，用于单行文本输入。基于 ElementInternals 接入原生 form，value / name / disabled 可随表单提交与重置。

**属性**

- \`value\`：输入值，string，默认 ''
- \`type\`：原生输入类型（text / password / tel / url / search 等），默认 'text'
- \`size\`：尺寸 'small' | 'medium' | 'large'，默认 'medium'
- \`status\`：校验状态 'default' | 'success' | 'warning' | 'error'，默认 'default'
- \`placeholder\`：占位提示
- \`label\`：无障碍标签（等价原生 aria-label）
- \`maxlength\`：最大输入长度，number
- \`readonly\` / \`clearable\` / \`disabled\`：只读 / 可清除 / 禁用
- \`name\`：提交到表单的字段名

**插槽**

- \`prefix\`：前置内容（图标、文字等）
- \`suffix\`：后置内容（清除按钮之外的区域）

**事件**

- \`wc-input\`：输入时触发，detail.value
- \`wc-change\`：值变更提交时触发（失焦 / 回车），detail.value
- \`wc-clear\`：点击清除按钮后触发

**React 用法**

\`\`\`tsx
import { WcInput } from '@wc/react';

<WcInput
  placeholder="请输入用户名"
  clearable
  onWcChange={(e) => console.log(e.detail.value)}
/>
\`\`\`

**Vue 用法**

\`\`\`html
<!-- @wc/vue 仅提供类型增强，直接使用原生标签。
     不要使用原生 v-model（它绑定 value + 原生 input 事件），
     组件派发的是 wc-input / wc-change（detail.value）。 -->
<wc-input
  :value="username"
  placeholder="请输入用户名"
  clearable
  @wc-input="(e) => (username = e.detail.value)"
></wc-input>
\`\`\`
`,
      },
    },
  },
  render: (args) => html`<wc-input
    value=${args.value}
    type=${args.type}
    size=${args.size}
    placeholder=${args.placeholder}
    label=${args.label}
    .maxlength=${args.maxlength}
    ?readonly=${args.readonly}
    ?clearable=${args.clearable}
    status=${args.status}
    name=${args.name}
    ?disabled=${args.disabled}
  ></wc-input>`,
};

export default meta;
type Story = StoryObj<wcInput>;

export const 基础用法: Story = {
  args: {
    value: '',
    type: 'text',
    size: 'medium',
    placeholder: '请输入内容',
    label: '',
    readonly: false,
    clearable: false,
    status: 'default',
    name: '',
    disabled: false,
  },
};

export const 输入类型: Story = {
  render: () => html`
    <div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;">
      <wc-input style="width:200px" placeholder="文本（text）"></wc-input>
      <wc-input style="width:200px" type="password" placeholder="密码（password）"></wc-input>
      <wc-input style="width:200px" type="search" placeholder="搜索（search）"></wc-input>
      <wc-input style="width:200px" type="tel" placeholder="电话（tel）"></wc-input>
    </div>
  `,
  parameters: {
    docs: {
      description: { story: 'type 属性透传原生 input 的类型（text/password/tel/url/search 等）。' },
    },
  },
};

export const 尺寸: Story = {
  render: () => html`
    <div style="display:flex;gap:12px;align-items:center;">
      <wc-input size="small" style="width:160px" placeholder="小号 small"></wc-input>
      <wc-input size="medium" style="width:160px" placeholder="中号 medium"></wc-input>
      <wc-input size="large" style="width:160px" placeholder="大号 large"></wc-input>
    </div>
  `,
};

export const 校验状态: Story = {
  render: () => html`
    <div style="display:flex;gap:12px;align-items:center;">
      <wc-input status="default" style="width:160px" placeholder="默认 default"></wc-input>
      <wc-input status="success" style="width:160px" placeholder="成功 success"></wc-input>
      <wc-input status="warning" style="width:160px" placeholder="警告 warning"></wc-input>
      <wc-input status="error" style="width:160px" placeholder="错误 error"></wc-input>
    </div>
  `,
};

export const 前缀与后缀: Story = {
  render: () => html`
    <div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;">
      <wc-input style="width:240px" placeholder="请输入搜索关键词" clearable>
        <wc-icon slot="prefix" name="search"></wc-icon>
      </wc-input>
      <wc-input style="width:240px" value="1000">
        <span slot="suffix">元</span>
      </wc-input>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: '通过 prefix / suffix 插槽放置图标或文字，清除按钮显示在 suffix 之前。',
      },
    },
  },
};

export const 清除与只读禁用: Story = {
  render: () => html`
    <div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;">
      <wc-input style="width:200px" value="可清除文本" clearable></wc-input>
      <wc-input style="width:200px" value="只读文本" readonly></wc-input>
      <wc-input style="width:200px" value="禁用文本" disabled></wc-input>
      <wc-input style="width:200px" maxlength="10" placeholder="最多 10 个字"></wc-input>
    </div>
  `,
};
