import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import type { wcPagination } from '@wc/core';

const meta: Meta<wcPagination> = {
  title: '导航组件/Pagination 分页',
  component: 'wc-pagination',
  tags: ['autodocs'],
  argTypes: {
    total: { control: 'number', description: '数据总条数' },
    pageSize: { control: 'number', description: '每页条数（对应 page-size 属性，默认 10）' },
    current: { control: 'number', description: '当前页（从 1 开始）' },
    foldedPageCount: {
      control: 'number',
      description: '折叠时中间窗口显示的页码数量（对应 folded-page-count 属性，默认 5）',
    },
    showTotal: { control: 'boolean', description: '显示总条数' },
    showJumper: { control: 'boolean', description: '显示跳页输入框（输入页码后按 Enter 跳转）' },
    disabled: { control: 'boolean', description: '整体禁用' },
  },
  parameters: {
    docs: {
      description: {
        component: `分页组件。由 total / page-size 推导总页数，页码过多时按 folded-page-count 折叠为
「1 … 中间窗口 … 末页」。切换页码（点击、前后翻页、跳页输入框按 Enter）后派发 wc-change
（detail: { current, previous }）；total / page-size 变化导致当前页越界时静默夹紧（不派发事件）。

主要 API：
- wc-pagination：total（总条数）/ page-size（每页条数，默认 10）/ current（当前页，1 开始）/
  folded-page-count（折叠窗口页码数，默认 5）/ show-total（显示总条数）/ show-jumper（显示跳页输入框）/
  disabled（整体禁用）；只读 pageCount（总页数）
- 事件 wc-change（detail: { current, previous }）

React 用法（@wc/react 包装组件）：

\`\`\`tsx
import { WcPagination } from '@wc/react';

export default function Demo() {
  return (
    <WcPagination
      total={200}
      onWcChange={(e) => console.log(e.detail.current, e.detail.previous)}
    ></WcPagination>
  );
}
\`\`\`

Vue 用法（原生标签，@wc/vue 提供类型增强）：

\`\`\`vue
<template>
  <wc-pagination :total="200" @wc-change="(e) => console.log(e.detail.current)"></wc-pagination>
</template>
\`\`\``,
      },
    },
  },
  render: (args) => html`<wc-pagination
    .total=${args.total}
    .pageSize=${args.pageSize}
    .current=${args.current}
    .foldedPageCount=${args.foldedPageCount}
    ?show-total=${args.showTotal}
    ?show-jumper=${args.showJumper}
    ?disabled=${args.disabled}
  ></wc-pagination>`,
};

export default meta;
type Story = StoryObj<wcPagination>;

export const 基础用法: Story = {
  args: {
    total: 100,
    pageSize: 10,
    current: 1,
    foldedPageCount: 5,
    showTotal: false,
    showJumper: false,
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          '切换页码后派发 wc-change，detail 为 { current, previous }；当前页由组件内部维护并反射到 current。',
      },
    },
  },
};

export const 总数与跳页: Story = {
  render: () => html`
    <wc-pagination
      .total=${1000}
      .current=${7}
      ?show-total=${true}
      ?show-jumper=${true}
    ></wc-pagination>
  `,
  parameters: {
    docs: {
      description: {
        story:
          'show-total 显示「共 N 条」总条数文案；show-jumper 显示跳页输入框，输入页码后按 Enter 跳转，超出有效范围的页码自动夹紧。',
      },
    },
  },
};

export const 页码折叠: Story = {
  render: () => html`
    <div style="display:grid;gap:16px;">
      <wc-pagination .total=${1000} .foldedPageCount=${3}></wc-pagination>
      <wc-pagination .total=${1000} .foldedPageCount=${5}></wc-pagination>
      <wc-pagination .total=${1000} .foldedPageCount=${7}></wc-pagination>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          '总页数 100，folded-page-count 依次为 3 / 5 / 7。总页数超过 folded-page-count + 2 时才折叠为「1 … 中间窗口 … 末页」，窗口以当前页为中心。',
      },
    },
  },
};

export const 禁用: Story = {
  render: () => html`
    <wc-pagination .total=${100} .current=${3} ?disabled=${true}></wc-pagination>
  `,
  parameters: {
    docs: {
      description: {
        story: 'disabled 整体禁用：页码、前后翻页按钮与跳页输入框均不可交互。',
      },
    },
  },
};

export const 事件处理: Story = {
  render: () => html`
    <div>
      <wc-pagination
        .total=${100}
        @wc-change=${(e: Event) => {
          const { current, previous } = (e as CustomEvent<{ current: number; previous: number }>)
            .detail;
          const tip = (e.currentTarget as HTMLElement).nextElementSibling;
          if (tip) {
            tip.textContent = `wc-change detail: { current: ${current}, previous: ${previous} }`;
          }
        }}
      ></wc-pagination>
      <p style="margin-top:8px;color:#888;">点击页码、前后翻页，这里会显示 wc-change 的 detail。</p>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          'wc-change 的 detail 为 { current, previous }；仅用户主动切换页码（含跳页输入）时触发，total / page-size 变化导致的越界夹紧不触发。',
      },
    },
  },
};
