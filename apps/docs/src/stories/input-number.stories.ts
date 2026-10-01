import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import type { wcInputNumber } from '@wc/core';

const meta: Meta<wcInputNumber> = {
  title: '表单组件/InputNumber 数字输入框',
  component: 'wc-input-number',
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'number', description: '当前值（自动按 step 取整并夹在 [min, max] 区间）' },
    min: { control: 'number', description: '最小值' },
    max: { control: 'number', description: '最大值' },
    step: { control: 'number', description: '步长' },
    theme: {
      control: 'select',
      options: ['row', 'column', 'normal'],
      description: '步进按钮布局：row 左右 / column 右侧纵排 / normal 不显示',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: '尺寸',
    },
    placeholder: { control: 'text', description: '占位提示' },
    label: { control: 'text', description: '无障碍标签（等价原生 aria-label）' },
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
数字输入框组件。步进按钮与键盘（↑/↓）共用步进逻辑；值自动按 step 取整并夹在 [min, max] 区间。
基于 ElementInternals 接入原生 form，value / name / disabled 可随表单提交与重置。

**属性**

- \`value\`：当前值，number，默认 0
- \`min\`：最小值，number，默认 -Infinity
- \`max\`：最大值，number，默认 Infinity
- \`step\`：步长，number，默认 1
- \`theme\`：步进按钮布局 'row'（左右）| 'column'（右侧纵排）| 'normal'（不显示），默认 'row'
- \`size\`：尺寸 'small' | 'medium' | 'large'，默认 'medium'
- \`placeholder\`：占位提示
- \`label\`：无障碍标签（等价原生 aria-label）
- \`readonly\`：只读（步进按钮与键盘步进均不可用）
- \`status\`：校验状态 'default' | 'success' | 'warning' | 'error'，默认 'default'
- \`name\` / \`disabled\`：表单字段名 / 禁用

**事件**

- \`wc-input\`：手动输入时持续触发，detail.value 为解析结果（非法时为 NaN），detail.text 为原始文本
- \`wc-change\`：值提交时触发（失焦 / 回车 / 步进），detail.value

**React 用法**

\`\`\`tsx
import { WcInputNumber } from '@wc/react';

<WcInputNumber
  value={count}
  min={0}
  max={10}
  step={1}
  theme="column"
  onWcChange={(e) => setCount(e.detail.value)}
/>
\`\`\`

**Vue 用法**

\`\`\`html
<!-- @wc/vue 仅提供类型增强，直接使用原生标签。
     不要使用原生 v-model（它绑定 value + 原生 input 事件），
     组件派发的是 wc-input / wc-change（detail.value）。
     value 为 number，建议用 .prop 绑定（.value="count"）避免字符串化。 -->
<wc-input-number
  .value="count"
  :min="0"
  :max="10"
  @wc-change="(e) => (count = e.detail.value)"
></wc-input-number>
\`\`\`
`,
      },
    },
  },
  render: (args) => html`<wc-input-number
    .value=${args.value}
    .min=${args.min}
    .max=${args.max}
    .step=${args.step}
    theme=${args.theme}
    size=${args.size}
    placeholder=${args.placeholder}
    label=${args.label}
    ?readonly=${args.readonly}
    status=${args.status}
    name=${args.name}
    ?disabled=${args.disabled}
  ></wc-input-number>`,
};

export default meta;
type Story = StoryObj<wcInputNumber>;

export const 基础用法: Story = {
  args: {
    value: 1,
    min: -Infinity,
    max: Infinity,
    step: 1,
    theme: 'row',
    size: 'medium',
    placeholder: '',
    label: '',
    readonly: false,
    status: 'default',
    name: '',
    disabled: false,
  },
};

export const 步进按钮布局: Story = {
  render: () => html`
    <div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;">
      <wc-input-number .value="${5}" theme="row"></wc-input-number>
      <wc-input-number .value="${5}" theme="column"></wc-input-number>
      <wc-input-number .value="${5}" theme="normal"></wc-input-number>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: '从左到右：row（按钮在左右两侧）/ column（按钮在右侧纵排）/ normal（无按钮）。',
      },
    },
  },
};

export const 范围与步长: Story = {
  render: () => html`
    <wc-input-number
      style="max-width:200px"
      .value="${4}"
      .min="${0}"
      .max="${10}"
      .step="${2}"
      placeholder="0 ~ 10"
    ></wc-input-number>
  `,
  parameters: {
    docs: {
      description: {
        story: 'min=0、max=10、step=2；手动输入超出范围的值会在提交时自动夹紧并按步长取整。',
      },
    },
  },
};

export const 尺寸: Story = {
  render: () => html`
    <div style="display:flex;gap:12px;align-items:center;">
      <wc-input-number size="small" .value="${1}"></wc-input-number>
      <wc-input-number size="medium" .value="${2}"></wc-input-number>
      <wc-input-number size="large" .value="${3}"></wc-input-number>
    </div>
  `,
};

export const 状态: Story = {
  render: () => html`
    <div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;">
      <wc-input-number .value="${1}" status="success"></wc-input-number>
      <wc-input-number .value="${2}" status="warning"></wc-input-number>
      <wc-input-number .value="${3}" status="error"></wc-input-number>
      <wc-input-number .value="${4}" readonly></wc-input-number>
      <wc-input-number .value="${5}" disabled></wc-input-number>
    </div>
  `,
};
