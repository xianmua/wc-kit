import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { message, type wcDrawer } from '@wc-kit/core';

/** 按 id 获取元素（各 story 用独立 id 避免相互干扰） */
function byId<T extends HTMLElement>(id: string): T | null {
  return document.getElementById(id) as T | null;
}

const meta: Meta<wcDrawer & { label: string }> = {
  title: '反馈组件/Drawer 抽屉',
  component: 'wc-drawer',
  tags: ['autodocs'],
  argTypes: {
    header: { control: 'text', description: '页头标题（header 插槽优先）' },
    open: { control: 'boolean', description: '是否打开' },
    placement: {
      control: 'select',
      options: ['left', 'right', 'top', 'bottom'],
      description: '弹出边缘',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: '面板尺寸：small / medium / large，也支持纯数字（px）或 CSS 尺寸值',
    },
    footer: { control: 'boolean', description: '是否展示页脚（默认确认 / 取消按钮）' },
    closable: { control: 'boolean', description: '是否展示右上角关闭按钮' },
    closeOnOverlayClick: { control: 'boolean', description: '点击遮罩是否关闭（抽屉默认开启）' },
    label: { control: 'text', description: '抽屉内容文本（示例演示用）' },
  },
  parameters: {
    docs: {
      description: {
        component: [
          '抽屉：从屏幕边缘滑出的模态面板。通过 open 属性或 show() / requestClose() 控制显隐；',
          '关闭统一走可取消的 wc-close 事件（preventDefault 可阻止关闭），',
          '并复用 Dialog 的弹层副作用（Escape / 焦点陷阱 / 跨弹层滚动锁）。',
          '',
          '## 主要 API',
          '',
          '- 属性：open 是否打开；placement 弹出边缘（left / right / top / bottom，默认 right）；',
          '  size 面板尺寸（small 300px / medium 500px / large 760px，纯数字按 px，也支持 CSS 尺寸值）；',
          '  header 标题（header 插槽优先）；footer 默认页脚（默认 true）；closable 关闭按钮（默认 true）；',
          '  close-on-overlay-click 点击遮罩关闭（抽屉默认开启）',
          '- 方法：show() 打开；requestClose(reason?) 请求关闭；confirm() / cancel() 确认 / 取消并关闭',
          '- 事件：wc-open 打开后触发；wc-close 请求关闭（可取消，detail.reason 为 close-btn / overlay /',
          '  escape / confirm / cancel / api）；wc-confirm / wc-cancel 点击默认确认 / 取消按钮触发',
          '- 插槽：默认插槽为内容；header 自定义页头；footer 自定义页脚',
          '',
          '## React（@wc-kit/react）',
          '',
          '```tsx',
          "import { useRef } from 'react';",
          "import { WcDrawer } from '@wc-kit/react';",
          "import type { wcDrawer } from '@wc-kit/core';",
          '',
          'function Demo() {',
          '  const ref = useRef<wcDrawer>(null);',
          '  return (',
          '    <>',
          '      <wc-button theme="primary" onClick={() => ref.current?.show()}>',
          '        打开抽屉',
          '      </wc-button>',
          '      <WcDrawer',
          '        ref={ref}',
          '        placement="left"',
          '        header="标题"',
          '        onWcClose={(e) => console.log("关闭来源：", e.detail.reason)}',
          '      >',
          '        抽屉内容',
          '      </WcDrawer>',
          '    </>',
          '  );',
          '}',
          '```',
          '',
          '## Vue（原生标签 + @wc-kit/vue 类型增强）',
          '',
          '```vue',
          '<template>',
          '  <wc-button theme="primary" @click="drawer?.show()">打开抽屉</wc-button>',
          '  <wc-drawer ref="drawer" placement="left" header="标题" @wc-close="onClose">',
          '    抽屉内容',
          '  </wc-drawer>',
          '</template>',
          '',
          '<script setup lang="ts">',
          "import { ref } from 'vue';",
          "import type { wcDrawer } from '@wc-kit/core';",
          '',
          'const drawer = ref<wcDrawer>();',
          '</script>',
          '```',
        ].join('\n'),
      },
    },
  },
  render: (args) => html`
    <wc-button theme="primary" @click=${() => byId<wcDrawer>('drawer-basic')?.show()}>
      打开抽屉
    </wc-button>
    <wc-drawer
      id="drawer-basic"
      header=${args.header}
      placement=${args.placement}
      size=${args.size}
      ?open=${args.open}
      ?footer=${args.footer}
      ?closable=${args.closable}
      ?close-on-overlay-click=${args.closeOnOverlayClick}
    >
      ${args.label}
    </wc-drawer>
  `,
};

export default meta;
type Story = StoryObj<wcDrawer & { label: string }>;

export const 基础用法: Story = {
  args: {
    label: '这里是从右侧滑出的抽屉内容。',
    header: '基础抽屉',
    open: false,
    placement: 'right',
    size: 'medium',
    footer: true,
    closable: true,
    closeOnOverlayClick: true,
  },
};

export const 弹出边缘: Story = {
  render: () => html`
    <div style="display:flex;gap:12px;flex-wrap:wrap;">
      <wc-button @click=${() => byId<wcDrawer>('drawer-left')?.show()}>左侧滑出</wc-button>
      <wc-button @click=${() => byId<wcDrawer>('drawer-right')?.show()}>右侧滑出</wc-button>
      <wc-button @click=${() => byId<wcDrawer>('drawer-top')?.show()}>顶部滑出</wc-button>
      <wc-button @click=${() => byId<wcDrawer>('drawer-bottom')?.show()}>底部滑出</wc-button>
      <wc-drawer id="drawer-left" placement="left" header="左侧抽屉" size="small">
        从左侧滑出的抽屉。
      </wc-drawer>
      <wc-drawer id="drawer-right" placement="right" header="右侧抽屉" size="small">
        从右侧滑出的抽屉。
      </wc-drawer>
      <wc-drawer id="drawer-top" placement="top" header="顶部抽屉" size="small">
        从顶部滑出的抽屉。
      </wc-drawer>
      <wc-drawer id="drawer-bottom" placement="bottom" header="底部抽屉" size="small">
        从底部滑出的抽屉。
      </wc-drawer>
    </div>
  `,
  parameters: {
    docs: {
      description: { story: 'placement 决定滑出边缘与面板的延伸方向（左右为宽、上下为高）。' },
    },
  },
};

export const 面板尺寸: Story = {
  render: () => html`
    <div style="display:flex;gap:12px;flex-wrap:wrap;">
      <wc-button @click=${() => byId<wcDrawer>('drawer-size-s')?.show()}>small（300px）</wc-button>
      <wc-button @click=${() => byId<wcDrawer>('drawer-size-m')?.show()}>medium（500px）</wc-button>
      <wc-button @click=${() => byId<wcDrawer>('drawer-size-l')?.show()}>large（760px）</wc-button>
      <wc-button @click=${() => byId<wcDrawer>('drawer-size-n')?.show()}
        >纯数字 320（px）</wc-button
      >
      <wc-drawer id="drawer-size-s" header="small 抽屉" size="small">
        预设尺寸 small（300px）。
      </wc-drawer>
      <wc-drawer id="drawer-size-m" header="medium 抽屉" size="medium">
        预设尺寸 medium（500px）。
      </wc-drawer>
      <wc-drawer id="drawer-size-l" header="large 抽屉" size="large">
        预设尺寸 large（760px）。
      </wc-drawer>
      <wc-drawer id="drawer-size-n" header="数字抽屉" size="320">
        size="320"，纯数字按 px 处理。
      </wc-drawer>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          'size 支持预设档位、纯数字（按 px）或任意 CSS 尺寸值；也可用 CSS 变量 --wc-drawer-size。',
      },
    },
  },
};

export const 自定义页脚: Story = {
  render: () => html`
    <wc-button theme="primary" @click=${() => byId<wcDrawer>('drawer-footer')?.show()}>
      打开抽屉
    </wc-button>
    <wc-drawer id="drawer-footer" header="自定义页脚">
      通过 footer 插槽替换默认的确认 / 取消按钮。
      <wc-button slot="footer" @click=${() => byId<wcDrawer>('drawer-footer')?.requestClose('api')}>
        知道了
      </wc-button>
    </wc-drawer>
  `,
  parameters: {
    docs: {
      description: { story: 'footer 插槽会覆盖默认页脚；header 插槽同理可覆盖 header 属性。' },
    },
  },
};

export const 事件: Story = {
  render: () => html`
    <wc-button theme="primary" @click=${() => byId<wcDrawer>('drawer-events')?.show()}>
      打开抽屉
    </wc-button>
    <wc-drawer
      id="drawer-events"
      header="事件演示"
      @wc-open=${() => message.info('wc-open：抽屉已打开')}
      @wc-close=${(e: Event) => {
        const reason = (e as CustomEvent<{ reason: string }>).detail?.reason;
        message.info(`wc-close：请求关闭（来源 ${reason}）`);
      }}
      @wc-confirm=${() => message.success('wc-confirm：点击了确认')}
      @wc-cancel=${() => message.info('wc-cancel：点击了取消')}
    >
      打开、关闭、确认、取消时会在顶部弹出全局提示，观察事件触发顺序。
    </wc-drawer>
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
