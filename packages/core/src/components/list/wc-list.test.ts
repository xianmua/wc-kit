import { expect, fixture, html } from '@open-wc/testing';
import './wc-list.js';
import type { wcList } from './wc-list.js';

describe('wc-list', () => {
  it('渲染 wc-list-item 条目，内容留在 light DOM', async () => {
    const el = await fixture<wcList>(html`
      <wc-list>
        <wc-list-item>条目一</wc-list-item>
        <wc-list-item>条目二</wc-list-item>
      </wc-list>
    `);
    expect(el.shadowRoot!.querySelector('[role="list"]')).to.exist;
    const items = el.querySelectorAll('wc-list-item');
    expect(items.length).to.equal(2);
    expect(items[0]!.textContent).to.contain('条目一');
  });

  it('无条目时回退 wc-empty 空状态', async () => {
    const el = await fixture<wcList>(html`<wc-list></wc-list>`);
    expect(el.shadowRoot!.querySelector('.list')!.hasAttribute('hidden')).to.be.true;
    expect(el.shadowRoot!.querySelector('.empty wc-empty')).to.exist;
  });

  it('empty 插槽覆盖默认空状态', async () => {
    const el = await fixture<wcList>(html`
      <wc-list><span slot="empty">自定义空态</span></wc-list>
    `);
    const assigned = (el.shadowRoot!.querySelector('slot[name="empty"]') as HTMLSlotElement)
      .assignedNodes()
      .map((n) => n.textContent)
      .join('')
      .trim();
    expect(assigned).to.equal('自定义空态');
  });

  it('动态追加条目从空态切回列表', async () => {
    const el = await fixture<wcList>(html`<wc-list></wc-list>`);
    expect(el.shadowRoot!.querySelector('.list')!.hasAttribute('hidden')).to.be.true;
    const item = document.createElement('wc-list-item');
    item.textContent = '新条目';
    el.appendChild(item);
    await el.updateComplete;
    await new Promise((r) => setTimeout(r, 0));
    expect(el.shadowRoot!.querySelector('.list')!.hasAttribute('hidden')).to.be.false;
    expect(el.shadowRoot!.querySelector('.empty')!.hasAttribute('hidden')).to.be.true;
  });

  it('size / striped / hoverable 反射为属性', async () => {
    const el = await fixture<wcList>(html`
      <wc-list size="large" striped hoverable>
        <wc-list-item>条目</wc-list-item>
      </wc-list>
    `);
    expect(el.getAttribute('size')).to.equal('large');
    expect(el.hasAttribute('striped')).to.be.true;
    expect(el.hasAttribute('hoverable')).to.be.true;
  });

  it('size 默认 medium', async () => {
    const el = await fixture<wcList>(html` <wc-list><wc-list-item>条目</wc-list-item></wc-list> `);
    expect(el.size).to.equal('medium');
  });

  it('part 选择器：base/empty', async () => {
    const el = await fixture<wcList>(html` <wc-list><wc-list-item>条目</wc-list-item></wc-list> `);
    expect(el.shadowRoot!.querySelector('[part="base"]')).to.exist;

    const empty = await fixture<wcList>(html`<wc-list></wc-list>`);
    expect(empty.shadowRoot!.querySelector('[part="empty"]')).to.exist;
  });

  it('非 wc-list-item 子元素不被计数', async () => {
    const el = await fixture<wcList>(html`
      <wc-list>
        <wc-list-item>条目一</wc-list-item>
        <div slot="empty" hidden></div>
      </wc-list>
    `);
    // div 是 empty 插槽内容，默认插槽只有 1 个条目，不触发空态
    expect(el.shadowRoot!.querySelector('.list')!.hasAttribute('hidden')).to.be.false;
  });
});
