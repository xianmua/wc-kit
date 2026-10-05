import { expect, fixture, html } from '@open-wc/testing';
import './wc-collapse.js';
import './wc-collapse-item.js';
import type { wcCollapse } from './wc-collapse.js';
import type { wcCollapseItem } from './wc-collapse-item.js';

async function create(template: ReturnType<typeof html>) {
  const el = await fixture<wcCollapse>(html`<wc-collapse>${template}</wc-collapse>`);
  await el.updateComplete;
  return el;
}

const items = (el: wcCollapse) =>
  Array.from(el.querySelectorAll('wc-collapse-item')) as wcCollapseItem[];

const headers = (el: wcCollapse) =>
  items(el).map((it) => it.shadowRoot!.querySelector<HTMLButtonElement>('.header')!);

describe('wc-collapse', () => {
  it('渲染 header 文案 + 默认收起（0fr）', async () => {
    const el = await create(html`<wc-collapse-item header="标题一">内容一</wc-collapse-item>`);
    expect(headers(el)[0].textContent).to.contain('标题一');
    expect(el.querySelector('wc-collapse-item')!.hasAttribute('open')).to.be.false;
    // 面板内容在 light DOM（slot 分发），textContent 直读
    expect(el.querySelector('wc-collapse-item')!.textContent).to.contain('内容一');
  });

  it('初始 open 属性直接展开，aria-expanded 同步', async () => {
    const el = await create(html`<wc-collapse-item header="a" open>内容</wc-collapse-item>`);
    const item = el.querySelector('wc-collapse-item')!;
    expect(item.hasAttribute('open')).to.be.true;
    expect(item.shadowRoot!.querySelector('.header')!.getAttribute('aria-expanded')).to.equal(
      'true',
    );
  });

  it('点击标题切换展开/收起，派发 wc-change（detail: name/open）', async () => {
    const el = await create(html`<wc-collapse-item header="a" name="p1">内容</wc-collapse-item>`);
    const item = el.querySelector('wc-collapse-item')!;
    const events: Array<{ name: string; open: boolean }> = [];
    el.addEventListener('wc-change', (e) => events.push((e as CustomEvent).detail));

    headers(el)[0].click();
    await item.updateComplete;
    expect(item.hasAttribute('open')).to.be.true;
    expect(events).to.deep.equal([{ name: 'p1', open: true }]);

    headers(el)[0].click();
    await item.updateComplete;
    expect(item.hasAttribute('open')).to.be.false;
    expect(events).to.deep.equal([
      { name: 'p1', open: true },
      { name: 'p1', open: false },
    ]);
  });

  it('disabled 面板不响应点击', async () => {
    const el = await create(html`<wc-collapse-item header="a" disabled>内容</wc-collapse-item>`);
    const item = el.querySelector('wc-collapse-item')!;
    headers(el)[0].click();
    await item.updateComplete;
    expect(item.hasAttribute('open')).to.be.false;
    expect(item.shadowRoot!.querySelector('.header')!.getAttribute('aria-expanded')).to.equal(
      'false',
    );
  });

  it('header 插槽覆盖 header 属性', async () => {
    const el = await create(
      html`<wc-collapse-item header="属性标题"
        ><span slot="header">插槽标题</span>内容</wc-collapse-item
      >`,
    );
    const slot = el
      .querySelector('wc-collapse-item')!
      .shadowRoot!.querySelector<HTMLSlotElement>('slot[name="header"]')!;
    expect(
      slot
        .assignedNodes()
        .map((n) => n.textContent)
        .join(''),
    ).to.equal('插槽标题');
  });

  it('accordion 模式：展开一个自动收起其他', async () => {
    const el = await create(html`
      <wc-collapse-item header="a" name="a" open>1</wc-collapse-item>
      <wc-collapse-item header="b" name="b">2</wc-collapse-item>
      <wc-collapse-item header="c" name="c">3</wc-collapse-item>
    `);
    el.accordion = true;
    await el.updateComplete;
    const [a, b, c] = items(el);
    headers(el)[1].click();
    await Promise.all([a.updateComplete, b.updateComplete, c.updateComplete]);
    expect(a.hasAttribute('open')).to.be.false;
    expect(b.hasAttribute('open')).to.be.true;
    expect(c.hasAttribute('open')).to.be.false;
  });

  it('非 accordion 模式：多个面板可同时展开', async () => {
    const el = await create(html`
      <wc-collapse-item header="a" open>1</wc-collapse-item>
      <wc-collapse-item header="b">2</wc-collapse-item>
    `);
    const [a, b] = items(el);
    headers(el)[1].click();
    await Promise.all([a.updateComplete, b.updateComplete]);
    expect(a.hasAttribute('open')).to.be.true;
    expect(b.hasAttribute('open')).to.be.true;
  });

  it('part 选择器：item / header / content', async () => {
    const el = await create(html`<wc-collapse-item header="a">1</wc-collapse-item>`);
    const item = el.querySelector('wc-collapse-item')!;
    for (const part of ['item', 'header', 'content']) {
      expect(item.shadowRoot!.querySelector(`[part="${part}"]`)).to.exist;
    }
  });
});
