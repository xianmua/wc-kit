import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import type { wcTabs } from '@wc-kit/core';

const meta: Meta<wcTabs> = {
  title: '导航组件/Tabs 标签页',
  component: 'wc-tabs',
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text',
      description: '激活标签的 value（与子元素 wc-tab 的 value 匹配，缺省自动激活第一个）',
    },
  },
  parameters: {
    docs: {
      description: {
        component: `标签页组件。容器 <wc-tabs> 收集子元素 <wc-tab> 渲染标签栏与面板：wc-tab 用 label 声明
标签栏文本、value 声明唯一值（缺省按索引）、disabled 禁用。点击标签或键盘（←/→/↑/↓ 循环切换，
Home/End 跳转首尾，自动激活并跳过禁用项）切换，激活变化后派发 wc-change（detail: { value }）。
容器 value 表示当前激活项，可初始指定，缺省自动激活第一个；子元素的 active 由容器自动同步以驱动面板显隐，无需手写。

主要 API：
- wc-tabs：value（激活标签的 value）；事件 wc-change（detail: { value }）；默认插槽放 wc-tab
- wc-tab：label / value / disabled；默认插槽为面板内容

React 用法（@wc-kit/react 包装组件）：

\`\`\`tsx
import { WcTabs, WcTab } from '@wc-kit/react';

export default function Demo() {
  return (
    <WcTabs value="user" onWcChange={(e) => console.log(e.detail.value)}>
      <WcTab label="用户管理" value="user">用户管理内容</WcTab>
      <WcTab label="订单管理" value="order">订单管理内容</WcTab>
    </WcTabs>
  );
}
\`\`\`

Vue 用法（原生标签，@wc-kit/vue 提供类型增强）：

\`\`\`vue
<template>
  <wc-tabs value="user" @wc-change="(e) => console.log(e.detail.value)">
    <wc-tab label="用户管理" value="user">用户管理内容</wc-tab>
    <wc-tab label="订单管理" value="order">订单管理内容</wc-tab>
  </wc-tabs>
</template>
\`\`\``,
      },
    },
  },
  render: (args) => html`
    <wc-tabs value=${args.value}>
      <wc-tab label="用户管理" value="user">用户管理的内容区域</wc-tab>
      <wc-tab label="订单管理" value="order">订单管理的内容区域</wc-tab>
      <wc-tab label="系统设置" value="setting">系统设置的内容区域</wc-tab>
    </wc-tabs>
  `,
};

export default meta;
type Story = StoryObj<wcTabs>;

export const 基础用法: Story = {
  args: { value: 'user' },
  parameters: {
    docs: {
      description: {
        story:
          '点击标签或修改 Controls 中的 value 切换激活项；切换后派发 wc-change（detail: { value }）。',
      },
    },
  },
};

export const 受控用法: Story = {
  render: () => html`
    <wc-tabs value="pending">
      <wc-tab label="全部订单" value="all">全部订单的内容区域</wc-tab>
      <wc-tab label="待支付" value="pending">待支付的内容区域</wc-tab>
      <wc-tab label="已完成" value="done">已完成的内容区域</wc-tab>
    </wc-tabs>
  `,
  parameters: {
    docs: {
      description: {
        story:
          '通过初始 value 指定激活项；点击或键盘切换后 value 属性反射更新，可监听 wc-change 在外部同步状态。',
      },
    },
  },
};

export const 禁用项: Story = {
  render: () => html`
    <wc-tabs value="a">
      <wc-tab label="可点击" value="a">可点击的内容区域</wc-tab>
      <wc-tab label="禁用项" value="b" disabled>禁用项的内容区域</wc-tab>
      <wc-tab label="也可点击" value="c">也可点击的内容区域</wc-tab>
    </wc-tabs>
  `,
  parameters: {
    docs: {
      description: {
        story: 'disabled 的标签不可点击，键盘导航也会跳过它。',
      },
    },
  },
};

export const 键盘导航: Story = {
  render: () => html`
    <wc-tabs value="home">
      <wc-tab label="首页" value="home">首页的内容区域</wc-tab>
      <wc-tab label="发现" value="discover">发现的内容区域</wc-tab>
      <wc-tab label="我的" value="mine">我的的内容区域</wc-tab>
    </wc-tabs>
  `,
  parameters: {
    docs: {
      description: {
        story:
          '焦点在标签栏时：←/→（或 ↑/↓）循环切换并自动激活，Home/End 跳到首个/最后一个可用标签，禁用项自动跳过。',
      },
    },
  },
};
