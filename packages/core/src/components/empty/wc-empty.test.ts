import { expect, fixture, html } from '@open-wc/testing';
import './wc-empty.js';
import type { wcEmpty } from './wc-empty.js';

describe('wc-empty', () => {
  it('默认渲染 inbox 占位图标 + i18n「暂无数据」', async () => {
    const el = await fixture<wcEmpty>(html`<wc-empty></wc-empty>`);
    expect(el.shadowRoot!.querySelector('.icon wc-icon[name="inbox"]')).to.exist;
    expect(el.shadowRoot!.querySelector('.description')!.textContent!.trim()).to.equal('暂无数据');
  });

  it('默认插槽自定义描述文案', async () => {
    const el = await fixture<wcEmpty>(html`<wc-empty>没有找到相关结果</wc-empty>`);
    // slot fallback 文案始终留在 shadow DOM，用 assignedNodes 断言实际分发内容
    const assigned = (el.shadowRoot!.querySelector('slot:not([name])') as HTMLSlotElement)
      .assignedNodes()
      .map((n) => n.textContent)
      .join('')
      .trim();
    expect(assigned).to.equal('没有找到相关结果');
  });

  it('icon 插槽覆盖默认占位图形', async () => {
    const el = await fixture<wcEmpty>(html` <wc-empty><span slot="icon">IMG</span></wc-empty> `);
    // fallback placeholder 始终存在于 shadow DOM（memory 已知坑），
    // 用 icon 插槽的 assignedNodes 断言自定义内容生效
    const assigned = (el.shadowRoot!.querySelector('slot[name="icon"]') as HTMLSlotElement)
      .assignedNodes()
      .map((n) => n.textContent)
      .join('')
      .trim();
    expect(assigned).to.equal('IMG');
  });

  it('action 插槽渲染操作区', async () => {
    const el = await fixture<wcEmpty>(html`
      <wc-empty><button slot="action">重试</button></wc-empty>
    `);
    expect(el.shadowRoot!.querySelector('.action')!.hasAttribute('hidden')).to.be.false;
    expect(el.querySelector('[slot="action"]')!.textContent).to.equal('重试');
  });

  it('part 选择器：base/icon/description/action', async () => {
    const el = await fixture<wcEmpty>(html`<wc-empty></wc-empty>`);
    for (const part of ['base', 'icon', 'description', 'action']) {
      expect(el.shadowRoot!.querySelector(`[part="${part}"]`)).to.exist;
    }
  });
});
