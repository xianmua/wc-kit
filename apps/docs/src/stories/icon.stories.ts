import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { registerBuiltinIcons } from '@wc/core';
import type { WcIcon } from '@wc/core';

// 内置图标需注册后才能通过 name 使用（此处调用一次，应用入口同理）
registerBuiltinIcons();

/** 内置图标名清单（共 16 个） */
const BUILTIN_NAMES = [
  'arrow-left',
  'arrow-right',
  'calendar',
  'check',
  'chevron-down',
  'chevron-left',
  'chevron-right',
  'chevron-up',
  'close',
  'error',
  'info',
  'loader',
  'minus',
  'plus',
  'search',
  'warning',
];

const meta: Meta<WcIcon> = {
  title: '基础组件/Icon 图标',
  component: 'wc-icon',
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'select',
      options: BUILTIN_NAMES,
      description: '图标名（在 library 对应的图标库中查找）',
    },
    src: { control: 'text', description: '直接指定 SVG 地址，优先级高于 name' },
    library: { control: 'text', description: '图标库名称，默认走同步注册表 default' },
    label: {
      control: 'text',
      description: '无障碍描述；提供时 role=img + aria-label，否则对读屏隐藏',
    },
    spin: { control: 'boolean', description: '旋转动画（加载中）' },
    pulse: { control: 'boolean', description: '缓动旋转动画' },
  },
  parameters: {
    docs: {
      description: {
        component: `图标组件。图标来源优先级：src（SVG 地址直连）> name + library（图标库解析）。

内置 16 个图标：arrow-left / arrow-right / calendar / check / chevron-down / chevron-left / chevron-right / chevron-up / close / error / info / loader / minus / plus / search / warning。使用前需在应用入口调用一次 \`registerBuiltinIcons()\`（也可用 \`registerIcon(name, svg)\` 注册单个图标、\`registerIconLibrary(name, lib)\` 注册自定义/远程图标库）。

主要 API：\`name\` 图标名、\`src\` SVG 地址、\`library\` 图标库（默认 default）、\`label\` 无障碍描述、\`spin\` 旋转动画、\`pulse\` 缓动旋转动画。尺寸默认跟随字号（1em），可用 CSS 变量 \`--wc-icon-size\` 覆盖。

React 用法（\`@wc/react\` 包装组件）：

\`\`\`tsx
import { registerBuiltinIcons } from '@wc/core';
import { WcIcon } from '@wc/react';

// 应用入口调用一次，注册全部内置图标
registerBuiltinIcons();

<WcIcon name="search" />
<WcIcon name="loader" spin />
<WcIcon name="check" style={{ fontSize: 24 }} />
\`\`\`

Vue 用法（\`@wc/vue\` 为纯类型增强包，直接使用原生标签）：

\`\`\`vue
<script setup lang="ts">
import { registerBuiltinIcons } from '@wc/core';

registerBuiltinIcons(); // 应用入口调用一次
</script>

<template>
  <wc-icon name="search"></wc-icon>
  <wc-icon name="loader" spin></wc-icon>
</template>
\`\`\``,
      },
    },
  },
  render: (args) => html`<wc-icon
    name=${args.name}
    src=${args.src}
    library=${args.library}
    label=${args.label}
    ?spin=${args.spin}
    ?pulse=${args.pulse}
  ></wc-icon>`,
};

export default meta;
type Story = StoryObj<WcIcon>;

export const 基础用法: Story = {
  args: { name: 'search', src: '', library: 'default', label: '', spin: false, pulse: false },
};

export const 全部内置图标: Story = {
  render: () => html`
    <div style="display:flex;gap:16px;align-items:center;flex-wrap:wrap;">
      ${BUILTIN_NAMES.map(
        (name) => html`
          <div style="display:flex;flex-direction:column;align-items:center;gap:6px;width:72px;">
            <wc-icon name=${name} style="font-size:22px;"></wc-icon>
            <span style="font-size:12px;color:var(--wc-color-gray-500);">${name}</span>
          </div>
        `,
      )}
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: '内置共 16 个图标，需先调用 registerBuiltinIcons() 注册。',
      },
    },
  },
};

export const 尺寸: Story = {
  render: () => html`
    <div style="display:flex;gap:12px;align-items:center;">
      <wc-icon name="check" style="font-size:14px;"></wc-icon>
      <wc-icon name="check" style="font-size:20px;"></wc-icon>
      <wc-icon name="check" style="font-size:32px;"></wc-icon>
      <wc-icon name="check" style="font-size:48px;"></wc-icon>
      <!-- 也可用 CSS 变量 --wc-icon-size 覆盖尺寸 -->
      <wc-icon name="check" style="--wc-icon-size:40px;color:var(--wc-color-primary);"></wc-icon>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: '尺寸默认跟随字号（1em），设置 font-size 或覆写 --wc-icon-size 即可调整。',
      },
    },
  },
};

export const 动画: Story = {
  render: () => html`
    <div style="display:flex;gap:12px;align-items:center;font-size:24px;">
      <wc-icon name="loader" spin></wc-icon>
      <wc-icon name="warning" pulse></wc-icon>
      <wc-icon name="search" spin></wc-icon>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'spin 为匀速旋转（常用于加载中），pulse 为缓动旋转。',
      },
    },
  },
};
