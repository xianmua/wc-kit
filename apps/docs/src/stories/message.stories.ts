import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { message, type wcMessage } from '@wc/core';

const meta: Meta<wcMessage> = {
  title: '反馈组件/Message 全局提示',
  component: 'wc-message',
  tags: ['autodocs'],
  args: {
    theme: 'info',
    content: '这是一条全局提示（duration=0 不会自动关闭）',
    duration: 0,
    closable: true,
  },
  argTypes: {
    theme: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error', 'loading'],
      description: '提示类型',
    },
    content: { control: 'text', description: '提示内容（默认插槽优先）' },
    duration: { control: 'number', description: '自动关闭时长（ms），0 表示不自动关闭' },
    closable: { control: 'boolean', description: '是否显示关闭按钮' },
  },
  parameters: {
    docs: {
      description: {
        component: [
          '全局提示：固定在页面顶部居中、纵向堆叠的轻量反馈。推荐使用命令式 API，调用即展示、自动关闭；',
          '也可以声明式书写 <wc-message> 标签。',
          '',
          '## 主要 API',
          '',
          '- 命令式：message.info / success / warning / error / loading / show(content, options?)；',
          '  options 支持 theme、duration（默认 3000，0 不自动关闭）、closable（默认 false）、onClose 关闭回调；',
          '  loading 不自动关闭；全部返回 wcMessage 实例，可手动调用 close() 提前关闭',
          '- 声明式属性：theme 提示类型（info / success / warning / error / loading，默认 info）；',
          '  content 内容；duration 自动关闭时长；closable 关闭按钮',
          '- 方法：close() 关闭并从 DOM 移除；事件：wc-close 关闭时触发',
          '- 插槽：默认插槽覆盖 content 属性；icon 插槽覆盖主题图标',
          '',
          '## React / 任意框架（命令式与框架无关）',
          '',
          '```tsx',
          "import { message } from '@wc/core';",
          '',
          "message.info('普通提示');",
          "message.success('保存成功', { duration: 5000 });",
          "const loading = message.loading('加载中…');",
          'loading.close();',
          '```',
          '',
          '需要声明式书写时，可使用 @wc/react 的 WcMessage（onWcClose 接收 wc-close 事件）。',
          '',
          '## Vue（原生标签 + @wc/vue 类型增强）',
          '',
          '```vue',
          '<template>',
          '  <wc-button @click="show">删除</wc-button>',
          '</template>',
          '',
          '<script setup lang="ts">',
          "import { message } from '@wc/core';",
          '',
          'function show() {',
          "  message.success('删除成功');",
          '}',
          '</script>',
          '```',
        ].join('\n'),
      },
    },
  },
  render: (args) => html`
    <wc-message
      theme=${args.theme}
      content=${args.content}
      .duration=${args.duration}
      ?closable=${args.closable}
    ></wc-message>
  `,
};

export default meta;
type Story = StoryObj<wcMessage>;

/** loading 演示：拿到实例，2 秒后手动关闭 */
function showLoading(): void {
  const loading = message.loading('正在加载数据…');
  setTimeout(() => loading.close(), 2000);
}

/** onClose 回调演示：关闭时再次弹出提示 */
function showOnClose(): void {
  message.show('关闭我试试，会触发 onClose 回调', {
    duration: 0,
    closable: true,
    onClose: () => message.success('onClose 已触发'),
  });
}

export const 基础用法: Story = {
  render: () => html`
    <div style="display:flex;gap:12px;flex-wrap:wrap;">
      <wc-button @click=${() => message.info('这是一条普通提示')}>普通信息</wc-button>
      <wc-button theme="success" @click=${() => message.success('保存成功')}>成功</wc-button>
      <wc-button theme="warning" @click=${() => message.warning('磁盘空间不足')}>警告</wc-button>
      <wc-button theme="danger" @click=${() => message.error('操作失败，请重试')}>错误</wc-button>
      <wc-button theme="primary" @click=${showLoading}>加载中（2 秒后关闭）</wc-button>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          '命令式 API 无需书写标签：message.info / success / warning / error / loading，提示固定在页面顶部居中堆叠，默认 3 秒自动关闭。',
      },
    },
  },
};

export const 配置项: Story = {
  render: () => html`
    <div style="display:flex;gap:12px;flex-wrap:wrap;">
      <wc-button @click=${() => message.show('5 秒后自动关闭', { duration: 5000 })}>
        duration：5000
      </wc-button>
      <wc-button
        @click=${() => message.show('不会自动关闭，请点击右侧关闭', { duration: 0, closable: true })}
      >
        duration：0 + closable
      </wc-button>
      <wc-button @click=${showOnClose}>onClose：关闭回调</wc-button>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          'message.show(content, options) 支持完整配置：theme / duration / closable / onClose，返回 wcMessage 实例可手动 close()。',
      },
    },
  },
};

export const 声明式用法: Story = {
  args: {
    theme: 'success',
    content: '声明式书写的全局提示（duration=0 不自动关闭）',
    duration: 0,
    closable: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          '直接书写 <wc-message> 标签；duration 为 0 时不自动关闭，可点关闭按钮或手动调用 close()。',
      },
    },
  },
};

export const 插槽: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:12px;align-items:flex-start;">
      <wc-message .duration=${0} ?closable=${true}>
        默认插槽内容，支持<b>任意 HTML</b>。
      </wc-message>
      <wc-message theme="warning" content="提示内容" .duration=${0} ?closable=${true}>
        <wc-icon slot="icon" name="info"></wc-icon>
      </wc-message>
    </div>
  `,
  parameters: {
    docs: {
      description: { story: '默认插槽覆盖 content 属性；icon 插槽覆盖主题图标。' },
    },
  },
};
