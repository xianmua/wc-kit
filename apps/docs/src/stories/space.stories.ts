import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import type { wcSpace } from '@wc-kit/core';

const meta: Meta<wcSpace> = {
  title: '基础组件/Space 间距',
  component: 'wc-space',
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: '间距：三档预设之一，也接受纯数字（按 px）或任意 CSS 尺寸值',
    },
    direction: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: '排列方向',
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end', 'baseline'],
      description: '对齐方式；不设置时水平方向默认 center、竖向默认 stretch',
    },
    wrap: { control: 'boolean', description: '允许换行' },
  },
  parameters: {
    docs: {
      description: {
        component: `间距容器组件：为子元素批量提供间距，基于 gap 实现，不产生额外 DOM 包裹。

主要 API：\`size\` 间距（small / medium / large 预设档位，或纯数字按 px、任意 CSS 尺寸值）、\`direction\` 排列方向（horizontal / vertical）、\`align\` 对齐方式（start / center / end / baseline，不设置时水平方向默认 center、竖向默认 stretch）、\`wrap\` 允许换行。无自定义事件。也可直接覆写 CSS 变量 \`--wc-space-gap\`。

React 用法（\`@wc-kit/react\` 包装组件）：

\`\`\`tsx
import { WcButton, WcSpace } from '@wc-kit/react';

<WcSpace size="large">
  <WcButton>按钮一</WcButton>
  <WcButton>按钮二</WcButton>
</WcSpace>
\`\`\`

Vue 用法（\`@wc-kit/vue\` 为纯类型增强包，直接使用原生标签）：

\`\`\`vue
<template>
  <wc-space size="large">
    <wc-button>按钮一</wc-button>
    <wc-button>按钮二</wc-button>
  </wc-space>
</template>
\`\`\``,
      },
    },
  },
  render: (args) => html`<wc-space
    size=${args.size}
    direction=${args.direction}
    align=${args.align}
    ?wrap=${args.wrap}
  >
    <wc-button>按钮一</wc-button>
    <wc-button>按钮二</wc-button>
    <wc-button>按钮三</wc-button>
  </wc-space>`,
};

export default meta;
type Story = StoryObj<wcSpace>;

export const 基础用法: Story = {
  args: { size: 'medium', direction: 'horizontal', align: undefined, wrap: false },
};

export const 间距大小: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:8px;">
      <div style="display:flex;align-items:center;gap:12px;">
        <span style="width:64px;color:var(--wc-color-gray-500);font-size:13px;">small</span>
        <wc-space size="small">
          <wc-button size="small">按钮一</wc-button>
          <wc-button size="small">按钮二</wc-button>
        </wc-space>
      </div>
      <div style="display:flex;align-items:center;gap:12px;">
        <span style="width:64px;color:var(--wc-color-gray-500);font-size:13px;">medium</span>
        <wc-space size="medium">
          <wc-button size="small">按钮一</wc-button>
          <wc-button size="small">按钮二</wc-button>
        </wc-space>
      </div>
      <div style="display:flex;align-items:center;gap:12px;">
        <span style="width:64px;color:var(--wc-color-gray-500);font-size:13px;">large</span>
        <wc-space size="large">
          <wc-button size="small">按钮一</wc-button>
          <wc-button size="small">按钮二</wc-button>
        </wc-space>
      </div>
      <div style="display:flex;align-items:center;gap:12px;">
        <span style="width:64px;color:var(--wc-color-gray-500);font-size:13px;">32px</span>
        <wc-space size="32">
          <wc-button size="small">按钮一</wc-button>
          <wc-button size="small">按钮二</wc-button>
        </wc-space>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'size 除三档预设外，也接受纯数字（按 px）或任意 CSS 尺寸值。',
      },
    },
  },
};

export const 方向: Story = {
  render: () => html`
    <div style="display:flex;gap:12px;align-items:flex-start;">
      <wc-space direction="horizontal">
        <wc-button>横向</wc-button>
        <wc-button>排列</wc-button>
      </wc-space>
      <wc-space direction="vertical">
        <wc-button>竖向</wc-button>
        <wc-button>排列</wc-button>
      </wc-space>
    </div>
  `,
};

export const 对齐方式: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:8px;">
      ${['start', 'center', 'end', 'baseline'].map(
        (align) => html`
          <div style="display:flex;align-items:center;gap:12px;">
            <span style="width:64px;color:var(--wc-color-gray-500);font-size:13px;">${align}</span>
            <wc-space align=${align} size="small" style="flex:1;">
              <wc-button size="small">按钮</wc-button>
              <div
                style="width:48px;height:40px;background:var(--wc-color-primary);border-radius:4px;"
              ></div>
              <span>文本</span>
            </wc-space>
          </div>
        `,
      )}
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'align 不设置时：水平方向默认 center，竖向默认 stretch。',
      },
    },
  },
};

export const 自动换行: Story = {
  render: () => html`
    <wc-space wrap size="small" style="max-width:360px;">
      ${Array.from({ length: 12 }, (_, i) => html`<wc-tag>标签 ${i + 1}</wc-tag>`)}
    </wc-space>
  `,
  parameters: {
    docs: {
      description: {
        story: 'wrap 开启后子元素超出容器宽度自动换行。',
      },
    },
  },
};
