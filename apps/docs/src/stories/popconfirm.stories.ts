import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { message, type wcPopconfirm } from '@wc/core';

/** 12 个期望弹出方向（与源码 WcPlacement 一致） */
const PLACEMENTS: Array<wcPopconfirm['placement']> = [
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

const meta: Meta<wcPopconfirm> = {
  title: '反馈组件/Popconfirm 气泡确认框',
  component: 'wc-popconfirm',
  tags: ['autodocs'],
  argTypes: {
    content: { control: 'text', description: '确认文案（content 插槽优先）' },
    placement: {
      control: 'select',
      options: PLACEMENTS,
      description: '期望弹出方向（空间不足自动翻转）',
    },
    confirmText: { control: 'text', description: '确认按钮文案（默认 i18n「确认」）' },
    cancelText: { control: 'text', description: '取消按钮文案（默认 i18n「取消」）' },
    theme: {
      control: 'select',
      options: ['primary', 'danger', 'success', 'warning', 'default'],
      description: '确认按钮主题（透传给内置 wc-button）',
    },
    icon: { control: 'text', description: '提示图标名称（内置图标名，空字符串隐藏）' },
    open: { control: 'boolean', description: '当前是否打开' },
  },
  parameters: {
    docs: {
      description: {
        component: [
          '气泡确认框：点击触发的二次确认浮层，确认 / 取消后自动关闭；点击外部或按 Esc 也会关闭（派发 wc-cancel）。',
          '定位空间不足时自动翻转方向。',
          '',
          '## 主要 API',
          '',
          '- 属性：content 确认文案；placement 期望方向（默认 top）；confirm-text / cancel-text 按钮文案',
          '  （默认 i18n「确认 / 取消」）；theme 确认按钮主题（默认 primary，透传 wc-button）；',
          '  icon 图标名（默认 warning，空字符串隐藏）；open 是否打开',
          '- 方法：show() 打开；hide() 关闭（不派发事件）；confirm() / cancel() 确认 / 取消并关闭',
          '- 事件：wc-confirm 点击确认（之后自动关闭）；wc-cancel 点击取消 / 外部点击 / Esc',
          '  （detail.reason 为 button / outside / escape，之后自动关闭）',
          '- 插槽：默认插槽为触发元素；content 插槽为富文本确认内容',
          '',
          '## React（@wc/react）',
          '',
          '```tsx',
          "import { WcPopconfirm } from '@wc/react';",
          '',
          '<WcPopconfirm',
          '  content="确定删除吗？"',
          '  confirmText="删除"',
          '  cancelText="再想想"',
          '  theme="danger"',
          '  onWcConfirm={() => console.log("已确认")}',
          '  onWcCancel={(e) => console.log("取消来源：", e.detail.reason)}',
          '>',
          '  <button>删除</button>',
          '</WcPopconfirm>',
          '```',
          '',
          '## Vue（原生标签 + @wc/vue 类型增强）',
          '',
          '```vue',
          '<template>',
          '  <wc-popconfirm',
          '    content="确定删除吗？"',
          '    confirm-text="删除"',
          '    cancel-text="再想想"',
          '    theme="danger"',
          '    @wc-confirm="onConfirm"',
          '    @wc-cancel="onCancel"',
          '  >',
          '    <wc-button theme="danger">删除</wc-button>',
          '  </wc-popconfirm>',
          '</template>',
          '```',
        ].join('\n'),
      },
    },
  },
  render: (args) => html`
    <wc-popconfirm
      content=${args.content}
      placement=${args.placement}
      confirm-text=${args.confirmText}
      cancel-text=${args.cancelText}
      theme=${args.theme}
      icon=${args.icon}
      ?open=${args.open}
    >
      <wc-button theme="danger">删除</wc-button>
    </wc-popconfirm>
  `,
};

export default meta;
type Story = StoryObj<wcPopconfirm>;

export const 基础用法: Story = {
  args: {
    content: '确定删除这条数据吗？',
    placement: 'top',
    confirmText: '',
    cancelText: '',
    theme: 'primary',
    icon: 'warning',
    open: false,
  },
};

export const 弹出位置: Story = {
  render: () => html`
    <div style="display:flex;gap:12px;flex-wrap:wrap;">
      ${PLACEMENTS.map(
        (p) => html`
          <wc-popconfirm content=${`位置：${p}`} placement=${p}>
            <wc-button variant="outline">${p}</wc-button>
          </wc-popconfirm>
        `,
      )}
    </div>
  `,
  parameters: {
    docs: {
      description: { story: '空间不足时自动翻转方向；点击外部或按 Esc 也会关闭。' },
    },
  },
};

export const 危险操作: Story = {
  render: () => html`
    <wc-popconfirm
      content="删除后数据不可恢复，确定删除吗？"
      confirm-text="删除"
      cancel-text="再想想"
      theme="danger"
      icon="error"
    >
      <wc-button theme="danger">删除数据</wc-button>
    </wc-popconfirm>
  `,
  parameters: {
    docs: {
      description: {
        story: 'theme 透传给确认按钮（如 danger 强调风险）；icon 传空字符串可隐藏图标。',
      },
    },
  },
};

export const 事件: Story = {
  render: () => html`
    <wc-popconfirm
      content="确定执行此操作吗？"
      @wc-confirm=${() => message.success('wc-confirm：用户点击了确认')}
      @wc-cancel=${(e: Event) => {
        const reason = (e as CustomEvent<{ reason: string }>).detail?.reason;
        message.info(`wc-cancel：取消来源 = ${reason}`);
      }}
    >
      <wc-button theme="danger">删除数据</wc-button>
    </wc-popconfirm>
  `,
  parameters: {
    docs: {
      description: {
        story:
          '确认 / 取消后自动关闭；点击外部或按 Esc 也会关闭并派发 wc-cancel（detail.reason 为 button / outside / escape）。',
      },
    },
  },
};

export const 内容插槽: Story = {
  render: () => html`
    <wc-popconfirm placement="bottom">
      <wc-button>删除</wc-button>
      <div slot="content">
        删除后数据不可恢复，<b>请谨慎操作</b>。这段内容来自 content 插槽，会覆盖 content 属性。
      </div>
    </wc-popconfirm>
  `,
  parameters: {
    docs: {
      description: { story: 'content 插槽适合展示富文本确认内容。' },
    },
  },
};
