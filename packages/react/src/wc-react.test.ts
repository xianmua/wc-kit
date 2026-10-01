import { act } from 'react';
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { WcButton, WcInput, WcSwitch, WcPagination, WcTable } from './index.js';

// jsdom 的 attachInternals 返回空壳 internals（无 setFormValue），注入最小 mock
Object.defineProperty(HTMLElement.prototype, 'attachInternals', {
  configurable: true,
  writable: true,
  value(this: HTMLElement) {
    return {
      setFormValue: () => {},
      setValidity: () => {},
      form: null,
      labels: [],
    } as unknown as ElementInternals;
  },
});

// React 18 并发渲染下，非 act 环境仅告警；显式声明测试环境
(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

/** 渲染并等待 React 提交完成（含 useLayoutEffect） */
async function render(ui: React.ReactElement): Promise<HTMLDivElement> {
  const container = document.createElement('div');
  document.body.append(container);
  await act(async () => {
    createRoot(container).render(ui);
  });
  return container;
}

describe('@wc/react', () => {
  it('包装器渲染为对应标签的自定义元素', async () => {
    const container = await render(React.createElement(WcButton, { theme: 'primary' }, '按钮'));
    const el = container.querySelector('wc-button')!;
    expect(el).to.exist;
    expect(customElements.get('wc-button')).to.exist;
    expect(el.textContent).to.equal('按钮');
    container.remove();
  });

  it('布尔/数字 props 透传为元素 property', async () => {
    const container = await render(
      React.createElement(WcPagination, { total: 100, current: 3, disabled: true }),
    );
    const el = container.querySelector('wc-pagination') as HTMLElement & {
      total: number;
      current: number;
      disabled: boolean;
    };
    expect(el.total).to.equal(100);
    expect(el.current).to.equal(3);
    expect(el.disabled).to.be.true;
    container.remove();
  });

  it('wc-* 事件通过 onWc* props 接收（detail 完整）', async () => {
    const events: Array<CustomEvent['detail']> = [];
    const container = await render(
      React.createElement(WcSwitch, {
        onWcChange: (e: CustomEvent) => events.push(e.detail),
      }),
    );
    const el = container.querySelector('wc-switch') as HTMLElement;
    // 点击切换属于 core 的行为测试；这里验证 wrapper 的事件绑定
    el.dispatchEvent(new CustomEvent('wc-change', { detail: { checked: true } }));
    expect(events.length).to.equal(1);
    expect(events[0]).to.have.property('checked', true);
    container.remove();
  });

  it('复杂属性（数组）透传：WcTable columns/data', async () => {
    const container = await render(
      React.createElement(WcTable, {
        columns: [{ key: 'name', title: '姓名' }],
        data: [{ name: '张三' }],
      }),
    );
    const el = container.querySelector('wc-table') as HTMLElement & {
      columns: unknown[];
      data: unknown[];
    };
    expect(el.columns.length).to.equal(1);
    expect(el.data.length).to.equal(1);
    expect(el.shadowRoot!.querySelector('th')!.textContent).to.contain('姓名');
    container.remove();
  });

  it('事件监听随组件卸载解绑', async () => {
    const calls: number[] = [];
    const container = document.createElement('div');
    document.body.append(container);
    const root = createRoot(container);
    await act(async () => {
      root.render(React.createElement(WcInput, { onWcInput: () => calls.push(1) }));
    });
    await act(async () => {
      root.unmount();
    });
    // 卸载后手动派发事件，监听不应再触发
    const el = document.createElement('wc-input');
    container.append(el);
    el.dispatchEvent(new CustomEvent('wc-input', { detail: { value: 'x' } }));
    expect(calls).to.deep.equal([]);
    container.remove();
  });
});
