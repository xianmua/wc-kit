import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import type { wcDatePicker } from '@wc-kit/core';

const meta: Meta<wcDatePicker> = {
  title: '表单组件/DatePicker 日期选择器',
  component: 'wc-date-picker',
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'text', description: '当前选中值（YYYY-MM-DD，非法值会被忽略）' },
    placeholder: { control: 'text', description: '占位提示，默认取 i18n 文案' },
    label: { control: 'text', description: '无障碍标签' },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: '尺寸',
    },
    status: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error'],
      description: '校验状态（影响边框色）',
    },
    clearable: { control: 'boolean', description: '可清除' },
    readonly: { control: 'boolean', description: '只读（不可展开面板）' },
    firstDayOfWeek: {
      control: 'number',
      description: '一周从周几开始：0 周日（默认）~ 6 周六',
    },
    name: { control: 'text', description: '提交到表单的字段名' },
    disabled: { control: 'boolean', description: '是否禁用' },
  },
  parameters: {
    docs: {
      description: {
        component: `
日期选择器组件，值为 YYYY-MM-DD 格式字符串（本地时区）。点击触发器展开日历面板，支持年/月切换、
「今天」快捷选择与完整的键盘导航（方向键移动高亮、Enter/Space 选择、Esc 关闭）。
基于 ElementInternals 接入原生 form，value / name / disabled 可随表单提交与重置。

**属性**

- \`value\`：当前选中值，string（YYYY-MM-DD），默认 ''；非法值会被忽略
- \`placeholder\`：占位提示，默认取 i18n 文案
- \`label\`：无障碍标签
- \`size\`：尺寸 'small' | 'medium' | 'large'，默认 'medium'
- \`status\`：校验状态 'default' | 'success' | 'warning' | 'error'，默认 'default'
- \`clearable\`：可清除，布尔，默认 false
- \`readonly\`：只读（不可展开面板），布尔，默认 false
- \`firstDayOfWeek\`：一周从周几开始，number，0 周日（默认）~ 6 周六
- \`open\`：面板是否展开（内部状态，一般无需手动设置）
- \`name\` / \`disabled\`：表单字段名 / 禁用

**事件**

- \`wc-change\`：选中日期变化时触发，detail.value（YYYY-MM-DD）
- \`wc-clear\`：点击清除按钮后触发

**React 用法**

\`\`\`tsx
import { WcDatePicker } from '@wc-kit/react';

<WcDatePicker
  value={date}
  clearable
  firstDayOfWeek={1}
  onWcChange={(e) => setDate(e.detail.value)}
/>
\`\`\`

**Vue 用法**

\`\`\`html
<!-- @wc-kit/vue 仅提供类型增强，直接使用原生标签。
     不要使用原生 v-model（它绑定 value + 原生 input 事件），
     组件派发的是 wc-change（detail.value，YYYY-MM-DD）。 -->
<wc-date-picker
  :value="date"
  clearable
  :first-day-of-week="1"
  @wc-change="(e) => (date = e.detail.value)"
></wc-date-picker>
\`\`\`
`,
      },
    },
  },
  render: (args) => html`<wc-date-picker
    value=${args.value}
    placeholder=${args.placeholder}
    label=${args.label}
    size=${args.size}
    status=${args.status}
    ?clearable=${args.clearable}
    ?readonly=${args.readonly}
    .firstDayOfWeek=${args.firstDayOfWeek}
    name=${args.name}
    ?disabled=${args.disabled}
    style="max-width:320px"
  ></wc-date-picker>`,
};

export default meta;
type Story = StoryObj<wcDatePicker>;

export const 基础用法: Story = {
  args: {
    value: '',
    placeholder: '',
    label: '',
    size: 'medium',
    status: 'default',
    clearable: false,
    readonly: false,
    firstDayOfWeek: 0,
    name: '',
    disabled: false,
  },
};

export const 默认选中与可清除: Story = {
  render: () => html`
    <div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;">
      <wc-date-picker style="width:200px" value="2026-10-01"></wc-date-picker>
      <wc-date-picker style="width:200px" value="2026-10-01" clearable></wc-date-picker>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: '设置 value（YYYY-MM-DD）即默认选中；clearable 时有值会显示清除按钮。',
      },
    },
  },
};

export const 一周起始日: Story = {
  render: () => html`
    <div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;">
      <wc-date-picker style="width:200px" placeholder="周日开始（默认）"></wc-date-picker>
      <wc-date-picker
        style="width:200px"
        .firstDayOfWeek="${1}"
        placeholder="周一开始"
      ></wc-date-picker>
    </div>
  `,
  parameters: {
    docs: {
      description: { story: 'firstDayOfWeek=1 表示一周从周一开始，取值 0（周日）~ 6（周六）。' },
    },
  },
};

export const 尺寸: Story = {
  render: () => html`
    <div style="display:flex;gap:12px;align-items:center;">
      <wc-date-picker size="small" style="width:140px" placeholder="小号 small"></wc-date-picker>
      <wc-date-picker size="medium" style="width:140px" placeholder="中号 medium"></wc-date-picker>
      <wc-date-picker size="large" style="width:140px" placeholder="大号 large"></wc-date-picker>
    </div>
  `,
};

export const 只读与禁用: Story = {
  render: () => html`
    <div style="display:flex;gap:12px;align-items:center;">
      <wc-date-picker style="width:200px" value="2026-10-01" readonly></wc-date-picker>
      <wc-date-picker style="width:200px" value="2026-10-01" disabled></wc-date-picker>
      <wc-date-picker
        style="width:200px"
        status="error"
        placeholder="校验失败 error"
      ></wc-date-picker>
    </div>
  `,
  parameters: {
    docs: {
      description: { story: 'readonly 与 disabled 均不可展开面板；status 影响触发器边框色。' },
    },
  },
};
