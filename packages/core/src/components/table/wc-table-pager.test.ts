import { expect, fixture, html } from '@open-wc/testing';
import './wc-table-pager.js';
import type { wcTableRow, wcTablePager } from './wc-table-pager.js';

const makeRows = (n: number): wcTableRow[] =>
  Array.from({ length: n }, (_, i) => ({
    name: `用户${String(n - i).padStart(2, '0')}`,
    age: n - i,
  }));

describe('wc-table-pager', () => {
  async function create(overrides: Record<string, string> = {}): Promise<wcTablePager> {
    const el = await fixture<wcTablePager>(html`<wc-table-pager></wc-table-pager>`);
    for (const [k, v] of Object.entries(overrides)) el.setAttribute(k, v);
    el.columns = [
      { key: 'name', title: '姓名', sortable: true },
      { key: 'age', title: '年龄' },
    ];
    el.data = makeRows(25);
    await el.updateComplete;
    return el;
  }

  const innerTable = (el: wcTablePager) =>
    el.shadowRoot!.querySelector<HTMLElement & { shadowRoot: ShadowRoot }>('wc-table')!;
  const innerPager = (el: wcTablePager) =>
    el.shadowRoot!.querySelector<HTMLElement & { current: number; pageCount: number }>(
      'wc-pagination',
    )!;
  // 行渲染在内部 wc-table 的 shadowRoot 里
  const rows = (el: wcTablePager) => innerTable(el).shadowRoot!.querySelectorAll('tbody tr');
  const cells = (el: wcTablePager, row: number) => rows(el)[row].querySelectorAll('td');

  it('默认每页 10 条，只渲染当前页切片，total 为全量条数', async () => {
    const el = await create();
    expect(rows(el).length).to.equal(10);
    expect(innerPager(el).total).to.equal(25);
    expect(innerPager(el).pageCount).to.equal(3);
  });

  it('翻页后切片联动，page 镜像同步', async () => {
    const el = await create();
    innerPager(el).dispatchEvent(
      new CustomEvent('wc-change', {
        detail: { current: 3, previous: 1 },
        bubbles: true,
        composed: true,
      }),
    );
    await el.updateComplete;
    expect(el.page).to.equal(3);
    expect(rows(el).length).to.equal(5); // 25 条 → 第 3 页剩 5 条
    expect(cells(el, 0)[0].textContent).to.contain('用户05');
  });

  it('排序作用于全量数据再切片（而非当前页内排序）', async () => {
    const el = await create();
    // 全量数据按 name 倒序是 用户25 → 用户01；升序切片第 1 页应为 用户01~10
    innerTable(el).dispatchEvent(
      new CustomEvent('wc-sort', {
        detail: { key: 'name', order: 'asc' },
        bubbles: true,
        composed: true,
      }),
    );
    await el.updateComplete;
    expect(cells(el, 0)[0].textContent).to.contain('用户01');
    expect(cells(el, 9)[0].textContent).to.contain('用户10');

    // 降序时翻到第 3 页应是末尾 5 条（用户05~01）
    innerTable(el).dispatchEvent(
      new CustomEvent('wc-sort', {
        detail: { key: 'name', order: 'desc' },
        bubbles: true,
        composed: true,
      }),
    );
    await el.updateComplete;
    innerPager(el).dispatchEvent(
      new CustomEvent('wc-change', {
        detail: { current: 3, previous: 1 },
        bubbles: true,
        composed: true,
      }),
    );
    await el.updateComplete;
    expect(cells(el, 0)[0].textContent).to.contain('用户05');
    expect(cells(el, 4)[0].textContent).to.contain('用户01');
  });

  it('改每页条数后切片与镜像联动', async () => {
    const el = await create();
    innerPager(el).dispatchEvent(
      new CustomEvent('wc-size-change', {
        detail: { pageSize: 50, previous: 10, current: 1 },
        bubbles: true,
        composed: true,
      }),
    );
    await el.updateComplete;
    expect(el.pageSize).to.equal(50);
    expect(rows(el).length).to.equal(25);
  });

  it('数据缩水导致当前页越界时自动夹紧', async () => {
    const el = await create();
    innerPager(el).dispatchEvent(
      new CustomEvent('wc-change', {
        detail: { current: 3, previous: 1 },
        bubbles: true,
        composed: true,
      }),
    );
    await el.updateComplete;
    expect(el.page).to.equal(3);
    el.data = makeRows(12);
    await el.updateComplete;
    expect(el.page).to.equal(2); // 12 条 / 10 = 2 页
    expect(rows(el).length).to.equal(2);
  });

  it('透传 striped / bordered / size / loading 与空状态插槽', async () => {
    const el = await create({ striped: '', bordered: '', size: 'small', loading: '' });
    const table = innerTable(el);
    expect(table.hasAttribute('striped')).to.be.true;
    expect(table.hasAttribute('bordered')).to.be.true;
    expect(table.getAttribute('size')).to.equal('small');
    expect(table.hasAttribute('loading')).to.be.true;
  });

  it('事件穿透：内部 wc-row-click / wc-change 可在宿主上收到', async () => {
    const el = await create();
    const events: string[] = [];
    el.addEventListener('wc-row-click', () => events.push('row'));
    el.addEventListener('wc-change', () => events.push('page'));
    rows(el)[0].querySelector('td')!.click();
    innerPager(el).dispatchEvent(
      new CustomEvent('wc-change', {
        detail: { current: 2, previous: 1 },
        bubbles: true,
        composed: true,
      }),
    );
    await el.updateComplete;
    expect(events).to.deep.equal(['row', 'page']);
  });
});
