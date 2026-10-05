import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import type { wcSelect } from '@wc-kit/core';

const meta: Meta<wcSelect> = {
  title: '表单组件/Select 选择器',
  component: 'wc-select',
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'text', description: '当前选中值（对应 wc-option 的 value）' },
    placeholder: { control: 'text', description: '占位提示，默认取 i18n 文案' },
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
    name: { control: 'text', description: '提交到表单的字段名' },
    disabled: { control: 'boolean', description: '是否禁用' },
  },
  parameters: {
    docs: {
      description: {
        component: `
选择器组件（单选）。选项通过默认插槽放置 \`<wc-option>\` 子元素；基于 ElementInternals 接入原生 form，
value / name / disabled 可随表单提交与重置。支持键盘导航（Enter / Space 开合与选择、↑↓ 移动高亮、Esc 关闭）。

**wc-select 属性**

- \`value\`：当前选中值，string，默认 ''
- \`placeholder\`：占位提示，默认取 i18n 文案
- \`size\`：尺寸 'small' | 'medium' | 'large'，默认 'medium'
- \`status\`：校验状态 'default' | 'success' | 'warning' | 'error'，默认 'default'
- \`clearable\`：可清除，布尔，默认 false
- \`open\`：下拉面板是否展开（内部状态，一般无需手动设置）
- \`name\` / \`disabled\`：表单字段名 / 禁用

**wc-option 属性**

- \`value\`：选项值
- \`disabled\`：禁用该选项
- 选项文本写在默认插槽（其 label 由 textContent 自动读取）；selected / active 由 wc-select 管理，无需手动设置

**事件**

- \`wc-change\`：选中值变化时触发，detail.value / detail.label
- \`wc-clear\`：点击清除按钮后触发

**React 用法**

\`\`\`tsx
import { WcSelect, WcOption } from '@wc-kit/react';

<WcSelect
  placeholder="请选择城市"
  clearable
  onWcChange={(e) => console.log(e.detail.value, e.detail.label)}
>
  <WcOption value="beijing">北京</WcOption>
  <WcOption value="shanghai">上海</WcOption>
</WcSelect>
\`\`\`

**Vue 用法**

\`\`\`html
<!-- @wc-kit/vue 仅提供类型增强，直接使用原生标签。
     不要使用原生 v-model（它绑定 value + 原生 input 事件），
     组件派发的是 wc-change（detail.value / detail.label）。 -->
<wc-select :value="city" @wc-change="(e) => (city = e.detail.value)">
  <wc-option value="beijing">北京</wc-option>
  <wc-option value="shanghai">上海</wc-option>
</wc-select>
\`\`\`
`,
      },
    },
  },
  render: (args) => html`<wc-select
    value=${args.value}
    placeholder=${args.placeholder}
    size=${args.size}
    status=${args.status}
    ?clearable=${args.clearable}
    name=${args.name}
    ?disabled=${args.disabled}
    style="max-width:320px"
  >
    <wc-option value="beijing">北京</wc-option>
    <wc-option value="shanghai">上海</wc-option>
    <wc-option value="guangzhou">广州</wc-option>
    <wc-option value="shenzhen">深圳</wc-option>
  </wc-select>`,
};

export default meta;
type Story = StoryObj<wcSelect>;

export const 基础用法: Story = {
  args: {
    value: '',
    placeholder: '请选择城市',
    size: 'medium',
    status: 'default',
    clearable: false,
    name: '',
    disabled: false,
  },
};

export const 默认选中与可清除: Story = {
  render: () => html`
    <div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;">
      <wc-select style="width:200px" value="shanghai" placeholder="默认选中">
        <wc-option value="beijing">北京</wc-option>
        <wc-option value="shanghai">上海</wc-option>
        <wc-option value="guangzhou">广州</wc-option>
      </wc-select>
      <wc-select style="width:200px" value="guangzhou" clearable placeholder="可清除">
        <wc-option value="beijing">北京</wc-option>
        <wc-option value="shanghai">上海</wc-option>
        <wc-option value="guangzhou">广州</wc-option>
      </wc-select>
    </div>
  `,
  parameters: {
    docs: {
      description: { story: '设置 value 即默认选中；clearable 时有值会显示清除按钮。' },
    },
  },
};

export const 尺寸: Story = {
  render: () => html`
    <div style="display:flex;gap:12px;align-items:center;">
      <wc-select size="small" style="width:140px" placeholder="小号 small">
        <wc-option value="a">选项 A</wc-option>
        <wc-option value="b">选项 B</wc-option>
      </wc-select>
      <wc-select size="medium" style="width:140px" placeholder="中号 medium">
        <wc-option value="a">选项 A</wc-option>
        <wc-option value="b">选项 B</wc-option>
      </wc-select>
      <wc-select size="large" style="width:140px" placeholder="大号 large">
        <wc-option value="a">选项 A</wc-option>
        <wc-option value="b">选项 B</wc-option>
      </wc-select>
    </div>
  `,
};

export const 禁用选项与禁用选择器: Story = {
  render: () => html`
    <div style="display:flex;gap:12px;align-items:center;">
      <wc-select style="width:200px" placeholder="含禁用选项">
        <wc-option value="beijing">北京</wc-option>
        <wc-option value="shanghai" disabled>上海（禁用）</wc-option>
        <wc-option value="guangzhou">广州</wc-option>
      </wc-select>
      <wc-select style="width:200px" value="beijing" disabled>
        <wc-option value="beijing">北京</wc-option>
      </wc-select>
    </div>
  `,
};

export const 校验状态: Story = {
  render: () => html`
    <div style="display:flex;gap:12px;align-items:center;">
      <wc-select status="success" style="width:160px" value="a">
        <wc-option value="a">成功 success</wc-option>
      </wc-select>
      <wc-select status="warning" style="width:160px" value="a">
        <wc-option value="a">警告 warning</wc-option>
      </wc-select>
      <wc-select status="error" style="width:160px" value="a">
        <wc-option value="a">错误 error</wc-option>
      </wc-select>
    </div>
  `,
};
