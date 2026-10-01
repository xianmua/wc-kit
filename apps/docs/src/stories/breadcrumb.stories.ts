import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import type { wcBreadcrumb } from '@wc/core';

const meta: Meta<wcBreadcrumb> = {
  title: '导航组件/Breadcrumb 面包屑',
  component: 'wc-breadcrumb',
  tags: ['autodocs'],
  argTypes: {
    separator: { control: 'text', description: '分隔符文本（默认 /）' },
  },
  parameters: {
    docs: {
      description: {
        component: `面包屑组件。子条目用 light-DOM 的 <wc-breadcrumb-item> 声明，条目文本即显示内容；
最后一项自动渲染为当前页（aria-current="page"，不可点击），中间项可点击并派发 wc-select
（detail: { index, label, href }），带 href 的条目渲染为原生 <a>（点击后正常跳转），disabled 条目不可交互。

主要 API：
- wc-breadcrumb：separator（分隔符文本，默认 /）；事件 wc-select（detail: { index, label, href }）
- wc-breadcrumb-item：href（目标链接）/ disabled（禁用）

React 用法（@wc/react 包装组件）：

\`\`\`tsx
import { WcBreadcrumb, WcBreadcrumbItem } from '@wc/react';

export default function Demo() {
  return (
    <WcBreadcrumb separator="/" onWcSelect={(e) => console.log(e.detail)}>
      <WcBreadcrumbItem href="/">首页</WcBreadcrumbItem>
      <WcBreadcrumbItem href="/list">列表</WcBreadcrumbItem>
      <WcBreadcrumbItem>详情</WcBreadcrumbItem>
    </WcBreadcrumb>
  );
}
\`\`\`

Vue 用法（原生标签，@wc/vue 提供类型增强）：

\`\`\`vue
<template>
  <wc-breadcrumb separator="/" @wc-select="(e) => console.log(e.detail)">
    <wc-breadcrumb-item href="/">首页</wc-breadcrumb-item>
    <wc-breadcrumb-item href="/list">列表</wc-breadcrumb-item>
    <wc-breadcrumb-item>详情</wc-breadcrumb-item>
  </wc-breadcrumb>
</template>
\`\`\``,
      },
    },
  },
  render: (args) => html`
    <wc-breadcrumb separator=${args.separator}>
      <wc-breadcrumb-item href="/">首页</wc-breadcrumb-item>
      <wc-breadcrumb-item href="/components">组件</wc-breadcrumb-item>
      <wc-breadcrumb-item>导航组件</wc-breadcrumb-item>
    </wc-breadcrumb>
  `,
};

export default meta;
type Story = StoryObj<wcBreadcrumb>;

export const 基础用法: Story = {
  args: { separator: '/' },
  parameters: {
    docs: {
      description: {
        story:
          '带 href 的中间条目渲染为原生 <a>，点击可跳转并同时派发 wc-select；最后一项始终渲染为当前页文本。',
      },
    },
  },
};

export const 无链接条目: Story = {
  render: () => html`
    <wc-breadcrumb>
      <wc-breadcrumb-item>一级页面</wc-breadcrumb-item>
      <wc-breadcrumb-item>二级页面</wc-breadcrumb-item>
      <wc-breadcrumb-item>当前页面</wc-breadcrumb-item>
    </wc-breadcrumb>
  `,
  parameters: {
    docs: {
      description: {
        story:
          '不带 href 的中间条目渲染为可点击文本，点击派发 wc-select（detail: { index, label, href }），由业务自行处理跳转。',
      },
    },
  },
};

export const 自定义分隔符: Story = {
  render: () => html`
    <div style="display:grid;gap:16px;">
      <wc-breadcrumb separator=">">
        <wc-breadcrumb-item href="/">首页</wc-breadcrumb-item>
        <wc-breadcrumb-item href="/list">列表</wc-breadcrumb-item>
        <wc-breadcrumb-item>详情</wc-breadcrumb-item>
      </wc-breadcrumb>
      <wc-breadcrumb separator="·">
        <wc-breadcrumb-item href="/">首页</wc-breadcrumb-item>
        <wc-breadcrumb-item href="/list">列表</wc-breadcrumb-item>
        <wc-breadcrumb-item>详情</wc-breadcrumb-item>
      </wc-breadcrumb>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: '通过 separator 自定义分隔符文本，默认为 /。',
      },
    },
  },
};

export const 禁用项: Story = {
  render: () => html`
    <wc-breadcrumb>
      <wc-breadcrumb-item href="/">首页</wc-breadcrumb-item>
      <wc-breadcrumb-item href="/list" disabled>列表</wc-breadcrumb-item>
      <wc-breadcrumb-item>详情</wc-breadcrumb-item>
    </wc-breadcrumb>
  `,
  parameters: {
    docs: {
      description: {
        story: 'disabled 的中间条目不可点击；最后一项无论如何都渲染为当前页文本。',
      },
    },
  },
};
