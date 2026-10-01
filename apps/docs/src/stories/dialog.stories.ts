import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { message, type wcDialog } from '@wc/core';

/** 按 id 获取元素（各 story 用独立 id 避免相互干扰） */
function byId<T extends HTMLElement>(id: string): T | null {
  return document.getElementById(id) as T | null;
}

const meta: Meta<wcDialog & { label: string }> = {
  title: '反馈组件/Dialog 对话框',
  component: 'wc-dialog',
  tags: ['autodocs'],
  argTypes: {
    header: { control: 'text', description: '页头标题（header 插槽优先）' },
    open: { control: 'boolean', description: '是否打开' },
    footer: { control: 'boolean', description: '是否展示页脚（默认确认 / 取消按钮）' },
    closable: { control: 'boolean', description: '是否展示右上角关闭按钮' },
    closeOnOverlayClick: { control: 'boolean', description: '点击遮罩是否关闭' },
    width: { control: 'text', description: '对话框宽度，纯数字按 px，也可用 CSS 尺寸值' },
    label: { control: 'text', description: '对话框内容文本（示例演示用）' },
  },
  parameters: {
    docs: {
      description: {
        component: [
          '模态对话框。通过 open 属性或 show() / requestClose() 控制显隐；关闭统一走可取消的 wc-close 事件，',
          '在监听器中调用 e.preventDefault() 可阻止本次关闭。打开后自带 Escape 关闭、焦点陷阱与滚动锁定。',
          '',
          '## 主要 API',
          '',
          '- 属性：open 是否打开；header 标题（header 插槽优先）；footer 是否展示默认页脚（默认 true）；',
          '  closable 右上角关闭按钮（默认 true）；close-on-overlay-click 点击遮罩关闭（默认 false）；',
          '  width 对话框宽度（纯数字按 px）',
          '- 方法：show() 打开；requestClose(reason?) 请求关闭；confirm() / cancel() 确认 / 取消并关闭',
          '- 事件：wc-open 打开后触发；wc-close 请求关闭（可取消，detail.reason 为 close-btn / overlay /',
          '  escape / confirm / cancel / api）；wc-confirm / wc-cancel 点击默认确认 / 取消按钮触发',
          '- 插槽：默认插槽为内容；header 自定义页头；footer 自定义页脚',
          '',
          '## React（@wc/react）',
          '',
          '```tsx',
          "import { useRef } from 'react';",
          "import { WcDialog } from '@wc/react';",
          "import type { wcDialog } from '@wc/core';",
          '',
          'function Demo() {',
          '  const ref = useRef<wcDialog>(null);',
          '  return (',
          '    <>',
          '      <wc-button theme="primary" onClick={() => ref.current?.show()}>',
          '        打开对话框',
          '      </wc-button>',
          '      <WcDialog',
          '        ref={ref}',
          '        header="对话框标题"',
          '        onWcOpen={() => console.log("已打开")}',
          '        onWcClose={(e) => console.log("关闭来源：", e.detail.reason)}',
          '        onWcConfirm={() => console.log("确认")}',
          '        onWcCancel={() => console.log("取消")}',
          '      >',
          '        对话框内容',
          '      </WcDialog>',
          '    </>',
          '  );',
          '}',
          '```',
          '',
          '## Vue（原生标签 + @wc/vue 类型增强）',
          '',
          '```vue',
          '<template>',
          '  <wc-button theme="primary" @click="dialog?.show()">打开对话框</wc-button>',
          '  <wc-dialog',
          '    ref="dialog"',
          '    header="对话框标题"',
          '    @wc-open="onOpen"',
          '    @wc-close="onClose"',
          '    @wc-confirm="onConfirm"',
          '    @wc-cancel="onCancel"',
          '  >',
          '    对话框内容',
          '  </wc-dialog>',
          '</template>',
          '',
          '<script setup lang="ts">',
          "import { ref } from 'vue';",
          "import type { wcDialog } from '@wc/core';",
          '',
          'const dialog = ref<wcDialog>();',
          '</script>',
          '```',
        ].join('\n'),
      },
    },
  },
  render: (args) => html`
    <wc-button theme="primary" @click=${() => byId<wcDialog>('dialog-basic')?.show()}>
      打开对话框
    </wc-button>
    <wc-dialog
      id="dialog-basic"
      header=${args.header}
      ?open=${args.open}
      ?footer=${args.footer}
      ?closable=${args.closable}
      ?close-on-overlay-click=${args.closeOnOverlayClick}
      width=${args.width}
    >
      ${args.label}
    </wc-dialog>
  `,
};

export default meta;
type Story = StoryObj<wcDialog & { label: string }>;

export const 基础用法: Story = {
  args: {
    label: '这里是对话框内容，支持任意内容。',
    header: '基础对话框',
    open: false,
    footer: true,
    closable: true,
    closeOnOverlayClick: false,
    width: '',
  },
};

export const 自定义宽度: Story = {
  render: () => html`
    <wc-button theme="primary" @click=${() => byId<wcDialog>('dialog-width')?.show()}>
      打开对话框
    </wc-button>
    <wc-dialog id="dialog-width" header="自定义宽度" width="600">
      width="600"（纯数字按 px），也可以传入 80% 等 CSS 尺寸值。
    </wc-dialog>
  `,
  parameters: {
    docs: {
      description: {
        story: 'width 支持预设外的任意宽度；也可用 CSS 变量 --wc-dialog-width 全局调整。',
      },
    },
  },
};

export const 自定义页脚: Story = {
  render: () => html`
    <wc-button theme="primary" @click=${() => byId<wcDialog>('dialog-footer')?.show()}>
      打开对话框
    </wc-button>
    <wc-dialog id="dialog-footer" header="自定义页脚">
      通过 footer 插槽替换默认的确认 / 取消按钮。
      <wc-button slot="footer" @click=${() => byId<wcDialog>('dialog-footer')?.requestClose('api')}>
        知道了
      </wc-button>
    </wc-dialog>
  `,
  parameters: {
    docs: {
      description: { story: 'footer 插槽会覆盖默认页脚；header 插槽同理可覆盖 header 属性。' },
    },
  },
};

export const 关闭行为: Story = {
  render: () => html`
    <wc-button theme="primary" @click=${() => byId<wcDialog>('dialog-close-behavior')?.show()}>
      打开对话框
    </wc-button>
    <wc-dialog
      id="dialog-close-behavior"
      header="遮罩与 Esc 关闭"
      ?closable=${false}
      ?close-on-overlay-click=${true}
    >
      closable=false 隐藏右上角关闭按钮；开启 close-on-overlay-click 后点击遮罩或按 Esc 均可关闭。
    </wc-dialog>
  `,
  parameters: {
    docs: {
      description: { story: '点击遮罩默认不关闭（对话框与抽屉的默认值不同）；Esc 关闭始终可用。' },
    },
  },
};

export const 事件: Story = {
  render: () => html`
    <wc-button theme="primary" @click=${() => byId<wcDialog>('dialog-events')?.show()}>
      打开对话框
    </wc-button>
    <wc-dialog
      id="dialog-events"
      header="事件演示"
      @wc-open=${() => message.info('wc-open：对话框已打开')}
      @wc-close=${(e: Event) => {
        const reason = (e as CustomEvent<{ reason: string }>).detail?.reason;
        message.info(`wc-close：请求关闭（来源 ${reason}）`);
      }}
      @wc-confirm=${() => message.success('wc-confirm：点击了确认')}
      @wc-cancel=${() => message.info('wc-cancel：点击了取消')}
    >
      打开、关闭、确认、取消时会在顶部弹出全局提示，观察事件触发顺序。
    </wc-dialog>
  `,
  parameters: {
    docs: {
      description: {
        story:
          'wc-open 在打开后触发；wc-close 在请求关闭时触发（可取消）；wc-confirm / wc-cancel 由默认页脚按钮触发后自动请求关闭。',
      },
    },
  },
};

export const 阻止关闭: Story = {
  render: () => html`
    <wc-button theme="primary" @click=${() => byId<wcDialog>('dialog-prevent')?.show()}>
      打开对话框
    </wc-button>
    <wc-dialog
      id="dialog-prevent"
      header="拦截关闭"
      ?close-on-overlay-click=${true}
      @wc-close=${(e: Event) => {
        const reason = (e as CustomEvent<{ reason: string }>).detail?.reason;
        // 拦截 Esc / 遮罩来源的关闭请求，只允许按钮与右上角关闭
        if (reason === 'escape' || reason === 'overlay') e.preventDefault();
      }}
    >
      按 Esc 或点击遮罩的关闭请求会被 preventDefault 拦截；确认 / 取消 / 右上角关闭按钮不受影响。
    </wc-dialog>
  `,
  parameters: {
    docs: {
      description: {
        story: 'wc-close 是可取消事件：监听器中调用 e.preventDefault() 即可阻止本次关闭。',
      },
    },
  },
};
