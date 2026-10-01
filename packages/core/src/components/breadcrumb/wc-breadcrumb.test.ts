import { expect, fixture, html } from '@open-wc/testing';
import './wc-breadcrumb.js';
import type { wcBreadcrumb } from './wc-breadcrumb.js';

describe('wc-breadcrumb', () => {
  it('从 wc-breadcrumb-item 子元素收集条目并渲染 label', async () => {
    const el = await fixture<wcBreadcrumb>(html`
      <wc-breadcrumb>
        <wc-breadcrumb-item href="/">首页</wc-breadcrumb-item>
        <wc-breadcrumb-item href="/list">列表</wc-breadcrumb-item>
        <wc-breadcrumb-item>详情</wc-breadcrumb-item>
      </wc-breadcrumb>
    `);
    const items = el.shadowRoot!.querySelectorAll('.item');
    expect(items.length).to.equal(3);
    expect(items[0]!.textContent).to.contain('首页');
    expect(items[2]!.textContent).to.contain('详情');
  });

  it('带 href 的条目渲染为 a，无 href 为 span', async () => {
    const el = await fixture<wcBreadcrumb>(html`
      <wc-breadcrumb>
        <wc-breadcrumb-item href="/a">A</wc-breadcrumb-item>
        <wc-breadcrumb-item>B</wc-breadcrumb-item>
        <wc-breadcrumb-item>当前</wc-breadcrumb-item>
      </wc-breadcrumb>
    `);
    expect(el.shadowRoot!.querySelector('a.link')!.getAttribute('href')).to.equal('/a');
    expect(el.shadowRoot!.querySelectorAll('span.link').length).to.equal(1);
  });

  it('最后一项渲染为当前页（aria-current="page"）', async () => {
    const el = await fixture<wcBreadcrumb>(html`
      <wc-breadcrumb>
        <wc-breadcrumb-item href="/a">A</wc-breadcrumb-item>
        <wc-breadcrumb-item>当前</wc-breadcrumb-item>
      </wc-breadcrumb>
    `);
    const current = el.shadowRoot!.querySelector('.current')!;
    expect(current.getAttribute('aria-current')).to.equal('page');
    expect(current.textContent).to.contain('当前');
    // 最后一项即使有 href 也不渲染为链接
    const last = await fixture<wcBreadcrumb>(html`
      <wc-breadcrumb>
        <wc-breadcrumb-item href="/a">A</wc-breadcrumb-item>
        <wc-breadcrumb-item href="/last">带链接的当前页</wc-breadcrumb-item>
      </wc-breadcrumb>
    `);
    const items = last.shadowRoot!.querySelectorAll('.item');
    expect(items[0]!.querySelector('a')).to.exist;
    expect(items[1]!.querySelector('a')).to.be.null;
  });

  it('分隔符默认 /，可用 separator 属性自定义', async () => {
    const el = await fixture<wcBreadcrumb>(html`
      <wc-breadcrumb>
        <wc-breadcrumb-item>A</wc-breadcrumb-item>
        <wc-breadcrumb-item>B</wc-breadcrumb-item>
      </wc-breadcrumb>
    `);
    const separators = el.shadowRoot!.querySelectorAll('.separator');
    expect(separators.length).to.equal(1);
    expect(separators[0]!.textContent!.trim()).to.equal('/');

    const custom = await fixture<wcBreadcrumb>(html`
      <wc-breadcrumb separator=">">
        <wc-breadcrumb-item>A</wc-breadcrumb-item>
        <wc-breadcrumb-item>B</wc-breadcrumb-item>
        <wc-breadcrumb-item>C</wc-breadcrumb-item>
      </wc-breadcrumb>
    `);
    const customSeparators = custom.shadowRoot!.querySelectorAll('.separator');
    expect(customSeparators.length).to.equal(2);
    expect(customSeparators[1]!.textContent!.trim()).to.equal('>');
  });

  it('disabled 条目置灰不可点，不派发 wc-select', async () => {
    const el = await fixture<wcBreadcrumb>(html`
      <wc-breadcrumb>
        <wc-breadcrumb-item href="/a">A</wc-breadcrumb-item>
        <wc-breadcrumb-item disabled>B</wc-breadcrumb-item>
        <wc-breadcrumb-item>当前</wc-breadcrumb-item>
      </wc-breadcrumb>
    `);
    const events: unknown[] = [];
    el.addEventListener('wc-select', (e) => events.push(e));
    const disabled = el.shadowRoot!.querySelector('.link[data-disabled]')!;
    expect(disabled.getAttribute('aria-disabled')).to.equal('true');
    (disabled as HTMLElement).click();
    expect(events).to.deep.equal([]);
  });

  it('点击中间项派发 wc-select（detail 含 index/label/href）', async () => {
    const el = await fixture<wcBreadcrumb>(html`
      <wc-breadcrumb>
        <wc-breadcrumb-item href="/a">A</wc-breadcrumb-item>
        <wc-breadcrumb-item>B</wc-breadcrumb-item>
        <wc-breadcrumb-item>当前</wc-breadcrumb-item>
      </wc-breadcrumb>
    `);
    const details: Array<{ index: number; label: string; href: string }> = [];
    el.addEventListener('wc-select', (e) => details.push((e as CustomEvent).detail));
    el.shadowRoot!.querySelector<HTMLElement>('.item a')!.click();
    expect(details).to.deep.equal([{ index: 0, label: 'A', href: '/a' }]);
    // 无 href 的中间项也可点击
    const spanLink = el.shadowRoot!.querySelector<HTMLElement>('.item span.link')!;
    spanLink.click();
    expect(details).to.deep.equal([
      { index: 0, label: 'A', href: '/a' },
      { index: 1, label: 'B', href: '' },
    ]);
  });

  it('动态新增条目自动刷新（slotchange）', async () => {
    const el = await fixture<wcBreadcrumb>(html`
      <wc-breadcrumb>
        <wc-breadcrumb-item href="/a">A</wc-breadcrumb-item>
        <wc-breadcrumb-item>末尾</wc-breadcrumb-item>
      </wc-breadcrumb>
    `);
    el.appendChild(document.createElement('wc-breadcrumb-item'));
    const added = el.querySelectorAll('wc-breadcrumb-item')[2]!;
    added.textContent = '新页面';
    el.shadowRoot!.querySelector('slot')!.dispatchEvent(new Event('slotchange'));
    await el.updateComplete;
    const items = el.shadowRoot!.querySelectorAll('.item');
    expect(items.length).to.equal(3);
    expect(items[2]!.textContent).to.contain('新页面');
    // 新增后当前页指向新的最后一项
    expect(items[1]!.querySelector('.current')).to.be.null;
    expect(items[2]!.querySelector('.current')).to.exist;
  });

  it('子条目 href/disabled 属性变化自动刷新（MutationObserver）', async () => {
    const el = await fixture<wcBreadcrumb>(html`
      <wc-breadcrumb>
        <wc-breadcrumb-item href="/old">A</wc-breadcrumb-item>
        <wc-breadcrumb-item>末尾</wc-breadcrumb-item>
      </wc-breadcrumb>
    `);
    el.querySelector('wc-breadcrumb-item')!.setAttribute('href', '/new');
    await new Promise((r) => setTimeout(r, 0));
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('a.link')!.getAttribute('href')).to.equal('/new');

    el.querySelector('wc-breadcrumb-item')!.setAttribute('disabled', '');
    await new Promise((r) => setTimeout(r, 0));
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('.link[data-disabled]')).to.exist;
  });

  it('导航语义：nav + aria-label，分隔符 aria-hidden', async () => {
    const el = await fixture<wcBreadcrumb>(html`
      <wc-breadcrumb>
        <wc-breadcrumb-item>A</wc-breadcrumb-item>
        <wc-breadcrumb-item>B</wc-breadcrumb-item>
      </wc-breadcrumb>
    `);
    const nav = el.shadowRoot!.querySelector('nav')!;
    expect(nav.getAttribute('aria-label')).to.equal('面包屑导航');
    expect(el.shadowRoot!.querySelector('ol')).to.exist;
    expect(el.shadowRoot!.querySelector('.separator')!.getAttribute('aria-hidden')).to.equal(
      'true',
    );
  });

  it('part 选择器：nav/list/item/separator/link/current', async () => {
    const el = await fixture<wcBreadcrumb>(html`
      <wc-breadcrumb>
        <wc-breadcrumb-item href="/a">A</wc-breadcrumb-item>
        <wc-breadcrumb-item>当前</wc-breadcrumb-item>
      </wc-breadcrumb>
    `);
    expect(el.shadowRoot!.querySelector('[part="nav"]')).to.exist;
    expect(el.shadowRoot!.querySelector('[part="list"]')).to.exist;
    expect(el.shadowRoot!.querySelectorAll('[part="item"]').length).to.equal(2);
    expect(el.shadowRoot!.querySelector('[part="separator"]')).to.exist;
    expect(el.shadowRoot!.querySelector('[part="link"]')).to.exist;
    expect(el.shadowRoot!.querySelector('[part="current"]')).to.exist;
  });

  it('空条目文本回退为序号', async () => {
    const el = await fixture<wcBreadcrumb>(html`
      <wc-breadcrumb>
        <wc-breadcrumb-item></wc-breadcrumb-item>
        <wc-breadcrumb-item>B</wc-breadcrumb-item>
      </wc-breadcrumb>
    `);
    expect(el.shadowRoot!.querySelector('.item span.link')!.textContent!.trim()).to.equal('1');
  });
});
