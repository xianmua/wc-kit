import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import type { wcRadio } from '@wc-kit/core';

const meta: Meta<wcRadio> = {
  title: '表单组件/Radio 单选框',
  component: 'wc-radio',
  tags: ['autodocs'],
  argTypes: {
    checked: { control: 'boolean', description: '选中状态' },
    value: { control: 'text', description: '选中时提交到表单的值' },
    label: {
      control: 'text',
      description: '无障碍标签（无默认插槽文本时使用）；基础用法中同时作为插槽文本渲染',
    },
    name: { control: 'text', description: '提交到表单的字段名（同名自动互斥分组）' },
    disabled: { control: 'boolean', description: '是否禁用' },
  },
  parameters: {
    docs: {
      description: {
        component: `
单选框组件。同名（name）的 wc-radio 在同一表单内自动互斥分组，分组行为由浏览器的 form-associated
单选机制保证。标签文本写在默认插槽。

**属性**

- \`checked\`：选中状态，布尔，默认 false
- \`value\`：选中时提交到表单的值，string，默认 ''
- \`label\`：无障碍标签（无默认插槽文本时使用）
- \`name\`：提交到表单的字段名，同名自动互斥分组
- \`disabled\`：是否禁用

**事件**

- \`wc-change\`：选中时触发，detail.value

**React 用法**

\`\`\`tsx
import { WcRadio } from '@wc-kit/react';

<WcRadio name="city" value="beijing" checked={city === 'beijing'} onWcChange={setCity}>
  北京
</WcRadio>
<WcRadio name="city" value="shanghai" checked={city === 'shanghai'} onWcChange={setCity}>
  上海
</WcRadio>
\`\`\`

**Vue 用法**

\`\`\`html
<!-- @wc-kit/vue 仅提供类型增强，直接使用原生标签。
     不要使用原生 v-model（它绑定 value + 原生 input 事件），
     组件派发的是 wc-change（detail.value）。 -->
<wc-radio name="city" value="beijing" :checked="city === 'beijing'" @wc-change="(e) => (city = e.detail.value)">
  北京
</wc-radio>
<wc-radio name="city" value="shanghai" :checked="city === 'shanghai'" @wc-change="(e) => (city = e.detail.value)">
  上海
</wc-radio>
\`\`\`
`,
      },
    },
  },
  render: (args) => html`<wc-radio
    ?checked=${args.checked}
    value=${args.value}
    label=${args.label}
    name=${args.name}
    ?disabled=${args.disabled}
  >
    ${args.label}
  </wc-radio>`,
};

export default meta;
type Story = StoryObj<wcRadio>;

export const 基础用法: Story = {
  args: {
    checked: false,
    value: 'beijing',
    label: '北京',
    name: '',
    disabled: false,
  },
};

export const 单选组: Story = {
  render: () => html`
    <div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;">
      <wc-radio name="city" value="beijing" checked>北京</wc-radio>
      <wc-radio name="city" value="shanghai">上海</wc-radio>
      <wc-radio name="city" value="guangzhou">广州</wc-radio>
    </div>
  `,
  parameters: {
    docs: {
      description: { story: '同名（name）的 wc-radio 自动互斥，选中一项即取消其他项。' },
    },
  },
};

export const 禁用: Story = {
  render: () => html`
    <div style="display:flex;gap:12px;align-items:center;">
      <wc-radio name="plan" value="free" disabled>免费版（禁用）</wc-radio>
      <wc-radio name="plan" value="pro" checked disabled>专业版（禁用选中）</wc-radio>
    </div>
  `,
};
