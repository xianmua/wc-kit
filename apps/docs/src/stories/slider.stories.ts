import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import type { wcSlider } from '@wc/core';

const meta: Meta<wcSlider> = {
  title: '表单组件/Slider 滑块',
  component: 'wc-slider',
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'number', description: '当前值（自动按 step 取整并夹在 [min, max] 区间）' },
    min: { control: 'number', description: '最小值' },
    max: { control: 'number', description: '最大值' },
    step: { control: 'number', description: '步长' },
    label: { control: 'text', description: '无障碍标签' },
    name: { control: 'text', description: '提交到表单的字段名' },
    disabled: { control: 'boolean', description: '是否禁用' },
  },
  parameters: {
    docs: {
      description: {
        component: `
滑块组件（单值）。键盘导航与 a11y 由隐藏的原生 input[type=range] 提供（方向键 ±step、PageUp/Down 翻页、
Home/End 边界）。基于 ElementInternals 接入原生 form，value / name / disabled 可随表单提交与重置。

**属性**

- \`value\`：当前值，number，默认 0（自动按 step 取整并夹在 [min, max] 区间）
- \`min\`：最小值，number，默认 0
- \`max\`：最大值，number，默认 100
- \`step\`：步长，number，默认 1
- \`label\`：无障碍标签
- \`name\`：提交到表单的字段名
- \`disabled\`：是否禁用

**事件**

- \`wc-input\`：拖动过程中持续触发，detail.value
- \`wc-change\`：松手提交时触发，detail.value

**React 用法**

\`\`\`tsx
import { WcSlider } from '@wc/react';

<WcSlider
  value={volume}
  min={0}
  max={100}
  step={5}
  onWcInput={(e) => setVolume(e.detail.value)}
  onWcChange={(e) => console.log('提交', e.detail.value)}
/>
\`\`\`

**Vue 用法**

\`\`\`html
<!-- @wc/vue 仅提供类型增强，直接使用原生标签。
     不要使用原生 v-model（它绑定 value + 原生 input 事件），
     组件派发的是 wc-input / wc-change（detail.value）。
     value 为 number，建议用 .prop 绑定（.value="volume"）避免字符串化。 -->
<wc-slider
  .value="volume"
  :min="0"
  :max="100"
  :step="5"
  @wc-input="(e) => (volume = e.detail.value)"
></wc-slider>
\`\`\`
`,
      },
    },
  },
  render: (args) => html`<wc-slider
    .value=${args.value}
    .min=${args.min}
    .max=${args.max}
    .step=${args.step}
    label=${args.label}
    name=${args.name}
    ?disabled=${args.disabled}
    style="width:320px"
  ></wc-slider>`,
};

export default meta;
type Story = StoryObj<wcSlider>;

export const 基础用法: Story = {
  args: {
    value: 30,
    min: 0,
    max: 100,
    step: 1,
    label: '',
    name: '',
    disabled: false,
  },
};

export const 范围与步长: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:16px;">
      <wc-slider style="width:320px" .value="${20}" .min="${0}" .max="${50}"></wc-slider>
      <wc-slider
        style="width:320px"
        .value="${2.5}"
        .min="${0}"
        .max="${10}"
        .step="${0.5}"
      ></wc-slider>
      <wc-slider
        style="width:320px"
        .value="${70}"
        .min="${50}"
        .max="${100}"
        .step="${10}"
      ></wc-slider>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: '从上到下：0~50、0~10 步长 0.5（支持小数）、50~100 步长 10。',
      },
    },
  },
};

export const 禁用: Story = {
  render: () => html` <wc-slider style="width:320px" .value="${40}" disabled></wc-slider> `,
};
