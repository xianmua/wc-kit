import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { message, type wcTooltip } from '@wc-kit/core';

/** 按 id 获取元素（各 story 用独立 id 避免相互干扰） */
function byId<T extends HTMLElement>(id: string): T | null {
  return document.getElementById(id) as T | null;
}

/** 12 个期望弹出方向（与源码 WcPlacement 一致） */
const PLACEMENTS: Array<wcTooltip['placement']> = [
  'top',
  'top-start',
  'top-end',
  'bottom',
  'bottom-start',
  'bottom-end',
  'left',
  'left-start',
  'left-end',
  'right',
  'right-start',
  'right-end',
];

const meta: Meta<wcTooltip> = {
  title: '反馈组件/Tooltip 气泡提示',
  component: 'wc-tooltip',
  tags: ['autodocs'],
  argTypes: {
    content: { control: 'text', description: '提示内容（content 插槽优先）' },
    placement: {
      control: 'select',
      options: PLACEMENTS,
      description: '期望弹出方向（空间不足自动翻转）',
    },
    trigger: {
      control: 'select',
      options: ['hover', 'click', 'manual'],
      description: '触发方式：hover（含 focus）/ click / manual',
    },
    open: { control: 'boolean', description: '当前是否可见' },
  },
  parameters: {
    docs: {
      description: {
        component: [
          '文字提示：悬浮 / 聚焦触发的轻量气泡，空间不足时自动翻转方向。',
          'content 属性或 content 插槽提供内容；trigger="manual" 时用 show() / hide() 控制。',
          '',
          '## 主要 API',
          '',
          '- 属性：content 提示内容；placement 期望方向（top / bottom / left / right 及 -start / -end 组合，',
          '  默认 top）；trigger 触发方式（hover 含 focus / click / manual，默认 hover）；open 是否可见',
          '- 方法：show() 显示；hide() 隐藏（内置 100ms 显示 / 150ms 隐藏防抖）',
          '- 事件：wc-show 开始显示时触发；wc-hide 开始隐藏时触发',
          '- 插槽：默认插槽为触发元素；content 插槽为富文本内容',
          '',
          '## React（@wc-kit/react）',
          '',
          '```tsx',
          "import { WcButton, WcTooltip } from '@wc-kit/react';",
          '',
          '<WcTooltip',
          '  content="提示文字"',
          '  placement="top"',
          '  onWcShow={() => console.log("开始显示")}',
          '  onWcHide={() => console.log("开始隐藏")}',
          '>',
          '  <WcButton>悬浮我</WcButton>',
          '</WcTooltip>',
          '```',
          '',
          '## Vue（原生标签 + @wc-kit/vue 类型增强）',
          '',
          '```vue',
          '<template>',
          '  <wc-tooltip content="提示文字" placement="top" @wc-show="onShow">',
          '    <wc-button>悬浮我</wc-button>',
          '  </wc-tooltip>',
          '</template>',
          '```',
        ].join('\n'),
      },
    },
  },
  render: (args) => html`
    <wc-tooltip
      content=${args.content}
      placement=${args.placement}
      trigger=${args.trigger}
      ?open=${args.open}
    >
      <wc-button>悬浮 / 聚焦我</wc-button>
    </wc-tooltip>
  `,
};

export default meta;
type Story = StoryObj<wcTooltip>;

export const 基础用法: Story = {
  args: {
    content: '这是一段提示文字',
    placement: 'top',
    trigger: 'hover',
    open: false,
  },
};

export const 弹出位置: Story = {
  render: () => html`
    <div style="display:flex;gap:12px;flex-wrap:wrap;">
      ${PLACEMENTS.map(
        (p) => html`
          <wc-tooltip content=${p} placement=${p}>
            <wc-button variant="outline">${p}</wc-button>
          </wc-tooltip>
        `,
      )}
    </div>
  `,
  parameters: {
    docs: {
      description: { story: '空间不足时会在视口内自动翻转方向，箭头位置随之调整。' },
    },
  },
};

export const 触发方式: Story = {
  render: () => html`
    <div style="display:flex;gap:12px;flex-wrap:wrap;align-items:center;">
      <wc-tooltip trigger="click" content="点击触发，点击外部或按 Esc 关闭">
        <wc-button theme="primary" variant="outline">click 触发</wc-button>
      </wc-tooltip>
      <wc-button @click=${() => byId<wcTooltip>('tooltip-manual')?.show()}>show()</wc-button>
      <wc-button @click=${() => byId<wcTooltip>('tooltip-manual')?.hide()}>hide()</wc-button>
      <wc-tooltip id="tooltip-manual" trigger="manual" content="由 show() / hide() 控制显隐">
        manual 触发元素
      </wc-tooltip>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          'hover 模式含键盘聚焦触发；manual 模式完全由 show() / hide() 控制（显示 / 隐藏分别有 100ms / 150ms 防抖）。',
      },
    },
  },
};

export const 富文本内容: Story = {
  render: () => html`
    <wc-tooltip placement="bottom">
      <wc-button variant="outline">悬浮查看富文本</wc-button>
      <div slot="content">
        <b>加粗标题</b><br />
        这段内容来自 content 插槽，会覆盖 content 属性。
      </div>
    </wc-tooltip>
  `,
  parameters: {
    docs: {
      description: {
        story: 'content 插槽适合展示富文本；面板最大宽度可用 --wc-tooltip-max-width 调整。',
      },
    },
  },
};

export const 事件: Story = {
  render: () => html`
    <wc-tooltip
      content="观察顶部的全局提示"
      @wc-show=${() => message.info('wc-show：开始显示')}
      @wc-hide=${() => message.info('wc-hide：开始隐藏')}
    >
      <wc-button theme="primary">悬浮我</wc-button>
    </wc-tooltip>
  `,
  parameters: {
    docs: {
      description: { story: 'wc-show / wc-hide 在显示 / 隐藏开始时触发。' },
    },
  },
};
