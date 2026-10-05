import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import type { wcCheckbox } from '@wc-kit/core';

const meta: Meta<wcCheckbox> = {
  title: '表单组件/Checkbox 复选框',
  component: 'wc-checkbox',
  tags: ['autodocs'],
  argTypes: {
    checked: { control: 'boolean', description: '选中状态' },
    indeterminate: {
      control: 'boolean',
      description: '半选状态（样式上的不确定态，不改变 checked；用户交互后自动解除）',
    },
    value: { control: 'text', description: '选中时提交到表单的值' },
    label: {
      control: 'text',
      description: '无障碍标签（无默认插槽文本时使用）；基础用法中同时作为插槽文本渲染',
    },
    name: { control: 'text', description: '提交到表单的字段名' },
    disabled: { control: 'boolean', description: '是否禁用' },
  },
  parameters: {
    docs: {
      description: {
        component: `
复选框组件。标签文本写在默认插槽；基于 ElementInternals 接入原生 form，选中时按 value 提交表单值。

**属性**

- \`checked\`：选中状态，布尔，默认 false
- \`indeterminate\`：半选状态（样式上的不确定态，不改变 checked），布尔，默认 false；用户交互后自动解除
- \`value\`：选中时提交到表单的值，string，默认 'on'
- \`label\`：无障碍标签（无默认插槽文本时使用）
- \`name\`：提交到表单的字段名
- \`disabled\`：是否禁用

**事件**

- \`wc-change\`：选中状态变化时触发，detail.checked / detail.value

**React 用法**

\`\`\`tsx
import { WcCheckbox } from '@wc-kit/react';

<WcCheckbox
  checked={agree}
  onWcChange={(e) => setAgree(e.detail.checked)}
>
  我已阅读并同意用户协议
</WcCheckbox>
\`\`\`

**Vue 用法**

\`\`\`html
<!-- @wc-kit/vue 仅提供类型增强，直接使用原生标签。
     不要使用原生 v-model（它绑定 value + 原生 input 事件），
     组件派发的是 wc-change（detail.checked / detail.value）。 -->
<wc-checkbox :checked="agree" @wc-change="(e) => (agree = e.detail.checked)">
  我已阅读并同意用户协议
</wc-checkbox>
\`\`\`
`,
      },
    },
  },
  render: (args) => html`<wc-checkbox
    ?checked=${args.checked}
    ?indeterminate=${args.indeterminate}
    value=${args.value}
    label=${args.label}
    name=${args.name}
    ?disabled=${args.disabled}
  >
    ${args.label}
  </wc-checkbox>`,
};

export default meta;
type Story = StoryObj<wcCheckbox>;

export const 基础用法: Story = {
  args: {
    checked: false,
    indeterminate: false,
    value: 'on',
    label: '记住我',
    name: '',
    disabled: false,
  },
};

export const 全部状态: Story = {
  render: () => html`
    <div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;">
      <wc-checkbox>未选中</wc-checkbox>
      <wc-checkbox checked>选中</wc-checkbox>
      <wc-checkbox indeterminate>半选</wc-checkbox>
      <wc-checkbox disabled>禁用未选中</wc-checkbox>
      <wc-checkbox checked disabled>禁用选中</wc-checkbox>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'indeterminate 只是样式上的半选态，点击后自动解除并正常切换 checked。',
      },
    },
  },
};

export const 复选框组: Story = {
  render: () => html`
    <div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;">
      <wc-checkbox name="skill" value="js" checked>JavaScript</wc-checkbox>
      <wc-checkbox name="skill" value="ts">TypeScript</wc-checkbox>
      <wc-checkbox name="skill" value="css">CSS</wc-checkbox>
      <wc-checkbox name="skill" value="rust" disabled>Rust（禁用）</wc-checkbox>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: '同一表单内同名（name）的复选框作为一组，各自独立勾选，选中时按各自 value 提交。',
      },
    },
  },
};
