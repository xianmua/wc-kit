import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import type { wcRow } from '@wc/core';

/** 演示用色块（帮助观察栅格占位与间距） */
const block = (text: string, bg = 'var(--wc-color-primary)') => html`<div
  style="background:${bg};color:#fff;padding:16px 0;text-align:center;border-radius:4px;font-size:14px;"
>
  ${text}
</div>`;

/** 纵向堆叠多行时的容器 */
const stack = (content: unknown) =>
  html`<div style="display:flex;flex-direction:column;gap:8px;">${content}</div>`;

const meta: Meta<wcRow> = {
  title: '基础组件/Layout 布局',
  component: 'wc-row',
  tags: ['autodocs'],
  argTypes: {
    gutter: { control: 'number', description: '列间距（px）' },
    justify: {
      control: 'select',
      options: ['start', 'center', 'end', 'space-between', 'space-around', 'space-evenly'],
      description: '水平对齐',
    },
    align: {
      control: 'select',
      options: ['top', 'middle', 'bottom', 'stretch'],
      description: '垂直对齐',
    },
    wrap: { control: 'boolean', description: '允许换行' },
  },
  parameters: {
    docs: {
      description: {
        component: `布局组件：\`wc-row\` 为行容器（flex 布局），\`wc-col\` 为列容器，配合实现 24 栅格。

wc-row 主要 API：\`gutter\` 列间距（px）、\`justify\` 水平对齐（start / center / end / space-between / space-around / space-evenly）、\`align\` 垂直对齐（top / middle / bottom / stretch）、\`wrap\` 允许换行。

wc-col 主要 API：\`span\` 占据列数（1~24，默认 24）、\`offset\` 左侧偏移列数（1~23，默认 0）。wc-col 的宿主以 display:contents 参与行布局，内容走默认插槽。无自定义事件。

React 用法（\`@wc/react\` 包装组件）：

\`\`\`tsx
import { WcCol, WcRow } from '@wc/react';

<WcRow gutter={16}>
  <WcCol span={12}>col-12</WcCol>
  <WcCol span={12}>col-12</WcCol>
</WcRow>
\`\`\`

Vue 用法（\`@wc/vue\` 为纯类型增强包，直接使用原生标签）：

\`\`\`vue
<template>
  <wc-row :gutter="16">
    <wc-col :span="12">col-12</wc-col>
    <wc-col :span="12">col-12</wc-col>
  </wc-row>
</template>
\`\`\``,
      },
    },
  },
  render: (args) => html`<wc-row
    .gutter=${args.gutter}
    justify=${args.justify}
    align=${args.align}
    ?wrap=${args.wrap}
  >
    <wc-col .span=${8}>${block('span-8')}</wc-col>
    <wc-col .span=${8}>${block('span-8', 'var(--wc-color-success)')}</wc-col>
    <wc-col .span=${8}>${block('span-8', 'var(--wc-color-warning)')}</wc-col>
  </wc-row>`,
};

export default meta;
type Story = StoryObj<wcRow>;

export const 基础用法: Story = {
  args: { gutter: 8, justify: 'start', align: 'top', wrap: false },
};

export const 基础栅格: Story = {
  render: () => html`
    ${stack(html`
      <wc-row .gutter=${8}><wc-col .span=${24}>${block('span-24')}</wc-col></wc-row>
      <wc-row .gutter=${8}>
        <wc-col .span=${12}>${block('span-12')}</wc-col>
        <wc-col .span=${12}>${block('span-12', 'var(--wc-color-success)')}</wc-col>
      </wc-row>
      <wc-row .gutter=${8}>
        <wc-col .span=${8}>${block('span-8')}</wc-col>
        <wc-col .span=${8}>${block('span-8', 'var(--wc-color-success)')}</wc-col>
        <wc-col .span=${8}>${block('span-8', 'var(--wc-color-warning)')}</wc-col>
      </wc-row>
      <wc-row .gutter=${8}>
        <wc-col .span=${6}>${block('span-6')}</wc-col>
        <wc-col .span=${6}>${block('span-6', 'var(--wc-color-success)')}</wc-col>
        <wc-col .span=${6}>${block('span-6', 'var(--wc-color-warning)')}</wc-col>
        <wc-col .span=${6}>${block('span-6', 'var(--wc-color-danger)')}</wc-col>
      </wc-row>
    `)}
  `,
  parameters: {
    docs: {
      description: {
        story: '24 栅格系统：span 相加不超过 24 即可排成一行。',
      },
    },
  },
};

export const 列偏移: Story = {
  render: () => html`
    ${stack(html`
      <wc-row .gutter=${8}>
        <wc-col .span=${8}>${block('span-8')}</wc-col>
        <wc-col .span=${8} .offset=${8}>${block('offset-8', 'var(--wc-color-success)')}</wc-col>
      </wc-row>
      <wc-row .gutter=${8}>
        <wc-col .span=${6} .offset=${6}>${block('offset-6')}</wc-col>
        <wc-col .span=${6} .offset=${6}>${block('offset-6', 'var(--wc-color-success)')}</wc-col>
      </wc-row>
    `)}
  `,
  parameters: {
    docs: {
      description: {
        story: 'offset 让列左侧空出指定列数，span + offset 相加不超过 24。',
      },
    },
  },
};

export const 列间距: Story = {
  render: () => html`
    ${stack(html`
      <wc-row .gutter=${16}>
        <wc-col .span=${6}>${block('gutter-16')}</wc-col>
        <wc-col .span=${6}>${block('gutter-16', 'var(--wc-color-success)')}</wc-col>
        <wc-col .span=${6}>${block('gutter-16', 'var(--wc-color-warning)')}</wc-col>
        <wc-col .span=${6}>${block('gutter-16', 'var(--wc-color-danger)')}</wc-col>
      </wc-row>
      <wc-row>
        <wc-col .span=${6}>${block('无间距')}</wc-col>
        <wc-col .span=${6}>${block('无间距', 'var(--wc-color-success)')}</wc-col>
        <wc-col .span=${6}>${block('无间距', 'var(--wc-color-warning)')}</wc-col>
        <wc-col .span=${6}>${block('无间距', 'var(--wc-color-danger)')}</wc-col>
      </wc-row>
    `)}
  `,
  parameters: {
    docs: {
      description: {
        story: 'gutter 为列与列之间的间距（column-gap，单位 px），默认 0。',
      },
    },
  },
};

export const 对齐方式: Story = {
  render: () => html`
    <p style="margin:0 0 8px;">justify 水平对齐：</p>
    ${stack(html`
      <wc-row justify="center"><wc-col .span=${6}>${block('center')}</wc-col></wc-row>
      <wc-row justify="end"><wc-col .span=${6}>${block('end')}</wc-col></wc-row>
      <wc-row justify="space-between">
        <wc-col .span=${6}>${block('between')}</wc-col>
        <wc-col .span=${6}>${block('between', 'var(--wc-color-success)')}</wc-col>
      </wc-row>
    `)}
    <p style="margin:16px 0 8px;">align 垂直对齐（以 middle 为例）：</p>
    <wc-row align="middle" .gutter=${8}>
      <wc-col .span=${8}>
        <div
          style="background:var(--wc-color-primary);color:#fff;padding:32px 0;text-align:center;border-radius:4px;"
        >
          高
        </div>
      </wc-col>
      <wc-col .span=${8}>${block('middle', 'var(--wc-color-success)')}</wc-col>
      <wc-col .span=${8}>${block('middle', 'var(--wc-color-warning)')}</wc-col>
    </wc-row>
  `,
  parameters: {
    docs: {
      description: {
        story: 'justify 控制水平对齐，align 控制垂直对齐（top / middle / bottom / stretch）。',
      },
    },
  },
};

export const 混合布局: Story = {
  render: () => html`
    ${stack(html`
      <wc-row .gutter=${16} wrap>
        <wc-col .span=${16}>${block('span-16')}</wc-col>
        <wc-col .span=${8}>${block('span-8', 'var(--wc-color-success)')}</wc-col>
        <wc-col .span=${8}>${block('span-8', 'var(--wc-color-warning)')}</wc-col>
        <wc-col .span=${8}>${block('span-8', 'var(--wc-color-danger)')}</wc-col>
        <wc-col .span=${8} .offset=${8}>${block('offset-8', 'var(--wc-color-gray-600)')}</wc-col>
      </wc-row>
    `)}
  `,
  parameters: {
    docs: {
      description: {
        story: 'wrap 开启后，span + offset 总和超出 24 的列会自动换到下一行。',
      },
    },
  },
};
