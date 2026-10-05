import { expect, fixture, html } from '@open-wc/testing';
import './wc-pagination.js';
import type { wcPagination } from './wc-pagination.js';

describe('wc-pagination', () => {
  it('默认渲染页码与前后翻页按钮', async () => {
    const el = await fixture<wcPagination>(html`<wc-pagination total="100"></wc-pagination>`);
    // 10 页 > folded(5)+2，折叠为 1 … 2-6 … 10 共 7 个页码
    const pages = el.shadowRoot!.querySelectorAll('[part="page"]');
    expect(pages.length).to.equal(7);
    expect(pages[0]!.textContent!.trim()).to.equal('1');
    expect(pages[6]!.textContent!.trim()).to.equal('10');
    expect(el.shadowRoot!.querySelector('[part="prev"]')).to.exist;
    expect(el.shadowRoot!.querySelector('[part="next"]')).to.exist;

    const noFold = await fixture<wcPagination>(html`<wc-pagination total="60"></wc-pagination>`);
    expect(noFold.shadowRoot!.querySelectorAll('[part="page"]').length).to.equal(6);
  });

  it('current 高亮为当前页（aria-current="page"）', async () => {
    const el = await fixture<wcPagination>(
      html`<wc-pagination total="100" current="3"></wc-pagination>`,
    );
    const current = el.shadowRoot!.querySelector('[part="page"][aria-current="page"]')!;
    expect(current.textContent!.trim()).to.equal('3');
    expect(el.hasAttribute('current')).to.be.true;
    expect(el.getAttribute('current')).to.equal('3');
  });

  it('点击页码更新 current 并派发 wc-change', async () => {
    const el = await fixture<wcPagination>(html`<wc-pagination total="100"></wc-pagination>`);
    const changes: Array<{ current: number; previous: number }> = [];
    el.addEventListener('wc-change', (e) => changes.push((e as CustomEvent).detail));
    el.shadowRoot!.querySelectorAll<HTMLElement>('[part="page"]')[4]!.click();
    await el.updateComplete;
    expect(el.current).to.equal(5);
    expect(changes).to.deep.equal([{ current: 5, previous: 1 }]);
  });

  it('prev/next 翻页并在边界禁用', async () => {
    const el = await fixture<wcPagination>(html`<wc-pagination total="30"></wc-pagination>`);
    expect((el.shadowRoot!.querySelector('[part="prev"]') as HTMLButtonElement).disabled).to.be
      .true;
    el.shadowRoot!.querySelector<HTMLElement>('[part="next"]')!.click();
    await el.updateComplete;
    expect(el.current).to.equal(2);
    el.shadowRoot!.querySelector<HTMLElement>('[part="next"]')!.click();
    await el.updateComplete;
    expect(el.current).to.equal(3);
    expect((el.shadowRoot!.querySelector('[part="next"]') as HTMLButtonElement).disabled).to.be
      .true;
  });

  it('页码过多时折叠为「1 … 中间窗 … 末页」', async () => {
    const el = await fixture<wcPagination>(
      html`<wc-pagination total="200" current="10"></wc-pagination>`,
    );
    const pages = Array.from(el.shadowRoot!.querySelectorAll('[part="page"]')).map((b) =>
      b.textContent!.trim(),
    );
    expect(pages).to.deep.equal(['1', '8', '9', '10', '11', '12', '20']);
    expect(el.shadowRoot!.querySelectorAll('[part="ellipsis"]').length).to.equal(2);
  });

  it('页数较少时不折叠，current 靠边时省略号单向出现', async () => {
    const noFold = await fixture<wcPagination>(html`<wc-pagination total="70"></wc-pagination>`);
    expect(noFold.shadowRoot!.querySelector('[part="ellipsis"]')).to.be.null;

    const edge = await fixture<wcPagination>(
      html`<wc-pagination total="200" current="2"></wc-pagination>`,
    );
    const edgePages = Array.from(edge.shadowRoot!.querySelectorAll('[part="page"]')).map((b) =>
      b.textContent!.trim(),
    );
    expect(edgePages).to.deep.equal(['1', '2', '3', '4', '5', '6', '20']);
    expect(edge.shadowRoot!.querySelectorAll('[part="ellipsis"]').length).to.equal(1);
  });

  it('show-total 显示总条数文案', async () => {
    const el = await fixture<wcPagination>(
      html`<wc-pagination total="123" show-total></wc-pagination>`,
    );
    expect(el.shadowRoot!.querySelector('[part="total"]')!.textContent!.trim()).to.equal(
      '共 123 条',
    );
  });

  it('show-jumper 输入页码 Enter 跳转，非法输入忽略，越界夹紧', async () => {
    const el = await fixture<wcPagination>(
      html`<wc-pagination total="100" show-jumper></wc-pagination>`,
    );
    const changes: number[] = [];
    el.addEventListener('wc-change', (e) => changes.push((e as CustomEvent).detail.current));
    const input = el.shadowRoot!.querySelector<HTMLInputElement>('[part="jumper-input"]')!;

    input.value = '5';
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    await el.updateComplete;
    expect(el.current).to.equal(5);
    expect(changes).to.deep.equal([5]);
    expect(input.value).to.equal('5');

    input.value = 'abc';
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    expect(el.current).to.equal(5);

    input.value = '999';
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    await el.updateComplete;
    expect(el.current).to.equal(10);
    expect(input.value).to.equal('10');
  });

  it('simple 极简模式：当前页/总页数，无页码按钮', async () => {
    const el = await fixture<wcPagination>(html`<wc-pagination total="50" simple></wc-pagination>`);
    expect(el.hasAttribute('simple')).to.be.true;
    expect(el.shadowRoot!.querySelector('[part="page"]')).to.be.null;
    expect(el.shadowRoot!.querySelector('[part="ellipsis"]')).to.be.null;
    const input = el.shadowRoot!.querySelector<HTMLInputElement>('[part="simple-input"]')!;
    expect(input.value).to.equal('1');
    expect(el.shadowRoot!.querySelector('[part="simple-pager"]')!.textContent!.trim()).to.contain(
      '/ 5',
    );
  });

  it('simple 输入 Enter 跳页并夹紧越界', async () => {
    const el = await fixture<wcPagination>(html`<wc-pagination total="50" simple></wc-pagination>`);
    const changes: number[] = [];
    el.addEventListener('wc-change', (e) => changes.push((e as CustomEvent).detail.current));
    const input = el.shadowRoot!.querySelector<HTMLInputElement>('[part="simple-input"]')!;

    input.value = '3';
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    await el.updateComplete;
    expect(el.current).to.equal(3);
    expect(changes).to.deep.equal([3]);

    input.value = '999';
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    await el.updateComplete;
    expect(el.current).to.equal(5);
    expect(input.value).to.equal('5');
  });

  it('simple 失焦提交；非法输入回落当前页', async () => {
    const el = await fixture<wcPagination>(html`<wc-pagination total="50" simple></wc-pagination>`);
    const input = el.shadowRoot!.querySelector<HTMLInputElement>('[part="simple-input"]')!;

    input.value = '2';
    input.dispatchEvent(new FocusEvent('blur'));
    await el.updateComplete;
    expect(el.current).to.equal(2);

    input.value = 'abc';
    input.dispatchEvent(new FocusEvent('blur'));
    expect(el.current).to.equal(2);
    expect(input.value).to.equal('2');
  });

  it('simple + prev/next 翻页同步输入框', async () => {
    const el = await fixture<wcPagination>(
      html`<wc-pagination total="50" simple current="2"></wc-pagination>`,
    );
    el.shadowRoot!.querySelector<HTMLElement>('[part="next"]')!.click();
    await el.updateComplete;
    expect(el.current).to.equal(3);
    expect(
      (el.shadowRoot!.querySelector<HTMLInputElement>('[part="simple-input"]') as HTMLInputElement)
        .value,
    ).to.equal('3');
  });

  it('disabled 整体禁用：按钮不可点且不派发 wc-change', async () => {
    const el = await fixture<wcPagination>(
      html`<wc-pagination total="100" current="2" disabled></wc-pagination>`,
    );
    const changes: unknown[] = [];
    el.addEventListener('wc-change', (e) => changes.push(e));
    const next = el.shadowRoot!.querySelector<HTMLButtonElement>('[part="next"]')!;
    expect(next.disabled).to.be.true;
    const page = el.shadowRoot!.querySelector<HTMLButtonElement>('[part="page"]')!;
    expect(page.disabled).to.be.true;
    next.click();
    page.click();
    expect(changes).to.deep.equal([]);
  });

  it('total / page-size 动态变化重算页数并夹紧越界 current', async () => {
    const el = await fixture<wcPagination>(
      html`<wc-pagination total="100" current="10"></wc-pagination>`,
    );
    el.total = 50;
    await el.updateComplete;
    expect(el.pageCount).to.equal(5);
    expect(el.current).to.equal(5);

    el.pageSize = 25;
    await el.updateComplete;
    expect(el.pageCount).to.equal(2);
    expect(el.current).to.equal(2);
  });

  it('part 选择器：nav/total/prev/page/ellipsis/next/jumper', async () => {
    const el = await fixture<wcPagination>(
      html`<wc-pagination total="200" show-total show-jumper></wc-pagination>`,
    );
    for (const part of ['nav', 'total', 'prev', 'page', 'ellipsis', 'next', 'jumper']) {
      expect(el.shadowRoot!.querySelector(`[part="${part}"]`)).to.exist;
    }
  });

  it('导航语义：nav + aria-label，页码按钮含 aria-label', async () => {
    const el = await fixture<wcPagination>(html`<wc-pagination total="30"></wc-pagination>`);
    expect(el.shadowRoot!.querySelector('nav')!.getAttribute('aria-label')).to.equal('分页导航');
    expect(
      el.shadowRoot!.querySelectorAll('[part="page"]')[1]!.getAttribute('aria-label'),
    ).to.equal('第 2 页');
    expect(el.shadowRoot!.querySelector('[part="prev"]')!.getAttribute('aria-label')).to.equal(
      '上一页',
    );
  });
});
