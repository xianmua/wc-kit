import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import type { wcSwitch } from '@wc-kit/core';

const meta: Meta<wcSwitch> = {
  title: '表单组件/Switch 开关',
  component: 'wc-switch',
  tags: ['autodocs'],
  argTypes: {
    checked: { control: 'boolean', description: '开启状态' },
    checkedValue: { control: 'text', description: '开启时提交到表单的值' },
    uncheckedValue: { control: 'text', description: '关闭时提交到表单的值（为空则不提交）' },
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
开关组件，用于两种状态之间的切换。标签文本写在默认插槽；基于 ElementInternals 接入原生 form，
按 checkedValue / uncheckedValue 提交表单值。

**属性**

- \`checked\`：开启状态，布尔，默认 false
- \`checkedValue\`：开启时提交到表单的值，string，默认 'on'
- \`uncheckedValue\`：关闭时提交到表单的值，string，默认 ''（为空则不提交）
- \`label\`：无障碍标签（无默认插槽文本时使用）
- \`name\`：提交到表单的字段名
- \`disabled\`：是否禁用

**事件**

- \`wc-change\`：切换时触发，detail.checked

**React 用法**

\`\`\`tsx
import { WcSwitch } from '@wc-kit/react';

<WcSwitch
  checked={enabled}
  checkedValue="1"
  uncheckedValue="0"
  onWcChange={(e) => setEnabled(e.detail.checked)}
/>
\`\`\`

**Vue 用法**

\`\`\`html
<!-- @wc-kit/vue 仅提供类型增强，直接使用原生标签。
     不要使用原生 v-model（它绑定 value + 原生 input 事件），
     组件派发的是 wc-change（detail.checked）。 -->
<wc-switch
  :checked="enabled"
  checked-value="1"
  unchecked-value="0"
  @wc-change="(e) => (enabled = e.detail.checked)"
></wc-switch>
\`\`\`
`,
      },
    },
  },
  render: (args) => html`<wc-switch
    ?checked=${args.checked}
    checkedValue=${args.checkedValue}
    uncheckedValue=${args.uncheckedValue}
    label=${args.label}
    name=${args.name}
    ?disabled=${args.disabled}
  >
    ${args.label}
  </wc-switch>`,
};

export default meta;
type Story = StoryObj<wcSwitch>;

export const 基础用法: Story = {
  args: {
    checked: false,
    checkedValue: 'on',
    uncheckedValue: '',
    label: '开启通知',
    name: '',
    disabled: false,
  },
};

export const 状态: Story = {
  render: () => html`
    <div style="display:flex;gap:12px;align-items:center;">
      <wc-switch></wc-switch>
      <wc-switch checked></wc-switch>
      <wc-switch disabled></wc-switch>
      <wc-switch checked disabled></wc-switch>
    </div>
  `,
  parameters: {
    docs: { description: { story: '从左到右：关闭 / 开启 / 禁用关闭 / 禁用开启。' } },
  },
};

export const 带标签文本: Story = {
  render: () => html`
    <div style="display:flex;gap:12px;align-items:center;">
      <wc-switch checked>消息通知</wc-switch>
      <wc-switch>夜间模式</wc-switch>
    </div>
  `,
  parameters: {
    docs: {
      description: { story: '默认插槽中的文本会显示在开关右侧，同时点击文本也可切换。' },
    },
  },
};

export const 提交值: Story = {
  render: () => html`
    <div style="display:flex;gap:12px;align-items:center;">
      <wc-switch name="notice" checked-value="1" unchecked-value="0" checked>开启/关闭</wc-switch>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          '通过 checkedValue / uncheckedValue 自定义提交到表单的值；uncheckedValue 为空字符串时关闭状态不提交。',
      },
    },
  },
};
